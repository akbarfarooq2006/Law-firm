import { run, user, assistant, InputGuardrailTripwireTriggered } from "@openai/agents";
import { legalAssistantAgent } from "@/lib/agent";
import { ensureAgentProvider } from "@/lib/agent/provider";
import { GEMINI_API_KEY } from "@/lib/rag/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { chatRequestSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Rate limiting (best-effort, per-instance) ────────────────────── */

const WINDOW_MS = 5 * 60_000;
const MAX_REQUESTS = 30;
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  if (buckets.size > 5000) buckets.clear();
  return bucket.count > MAX_REQUESTS;
}

/* ── Demo mode (no GEMINI_API_KEY configured) ─────────────────────── */

function demoReply(prompt: string): string {
  const q = prompt.toLowerCase();
  if (/(property|plot|flat|transfer|registry|verif|title|bahria|kda|sbca)/.test(q))
    return `For property transfer in Karachi, bring these essentials:\n\n• Original registered deed (or allotment + transfer letter for leased plots)\n• Latest property tax challans\n• Seller's CNIC\n• Approved building plan (SBCA) for constructed units\n• Wakala Nama if someone is acting under power of attorney\n\nOur chamber runs a 13-point title verification (Sub-Registrar copies, fard-e-malkiat/intiqal, encumbrance & court searches) delivered as a written report in 3–5 working days.`;

  if (/(succession|wirasat|inherit|certificate)/.test(q))
    return `Succession certificates (for movable assets like bank accounts and shares) are issued by the District Courts Karachi/Malir under the Succession Act 1925:\n\n1. Death certificate + NADRA FRC listing all heirs\n2. Heirs' CNICs and asset details (account numbers, folios)\n3. Petition filed; public notice invites objections\n4. Uncontested matters typically conclude in 6–10 weeks\n\nImmovable property passes through inheritance mutation (intiqal), not a succession certificate.`;

  if (/(khula|kula|divorce|talaq|custody|maintenance|nikah)/.test(q))
    return `Family matters we regularly handle before Karachi Family Courts:\n\n• Khula — judicial dissolution at the wife's instance; uncontested decrees commonly take 2–4 months\n• Talaq procedure & registration under the Muslim Family Laws Ordinance\n• Child custody (hizanat) and visitation decided purely on the child's welfare\n• Maintenance claims and haq mehr recovery\n\nAll proceedings are confidential.`;

  if (/(fee|fees|cost|price|charge|location|address|timing|hour|book|appointment|consult)/.test(q))
    return `Consultation details:\n\n• Fee: Rs. 5,000 for a 30-minute confidential consultation\n• Location: Suite #402, Executive Towers, Block 5, Clifton, Karachi\n• Mode: In-office or virtual (video/phone)\n• Timings: Mon–Sat, 9:00 AM – 7:00 PM PKT\n\nBook online via our Contact page, or WhatsApp +92 300 1234567 for the fastest confirmation.`;

  if (/(bail|arrest|fir|police|criminal|case against)/.test(q))
    return `For criminal matters, speed matters:\n\n• Pre-arrest/post-arrest bail applications can be filed the same day where facts allow (bailable offenses often resolved within hours)\n• False FIRs can be challenged under Sections 22-A/22-B CrPC (Justice of Peace) or quashed by the Sindh High Court\n• Counsel presence during police interrogation prevents custodial excesses\n\nIf there is any risk of arrest right now, call us immediately: +92 21 3583 1234 (WhatsApp +92 300 1234567).`;

  if (/(tax|fbr|srb|customs|notice|audit)/.test(q))
    return `Tax & customs desk summary:\n\n• FBR income-tax/sales-tax notices usually allow 7–15 days — a well-drafted reply within time prevents ex-parte assessment\n• SRB services-tax registrations, classifications and recovery defense\n• Customs valuation/classification disputes and adjudication\n• Appeals: Commissioner (Appeals) → ATIR → High Court reference\n\nBring the notice/receipt PDF to consultation for a fixed written fee estimate.`;

  if (/(cyber|hack|facebook|instagram|whatsapp|blackmail|harass|peca|defam)/.test(q))
    return `Cyber crime support under PECA 2016:\n\n• Cyber harassment/blackmail: complaint to the FIA Cybercrime Wing — we prepare an admissible evidence bundle (certified exports, hash values, affidavits)\n• Online defamation: civil damages plus criminal remedies\n• Financial fraud: tracing/freezing of proceeds\n• Content removal: platform takedown notices and PTA coordination\n\nPreserve everything — don't delete chats or block the offender until evidence is captured.`;

  return `Assalam-o-Alaikum! I'm the Karachi Legal AI assistant for Rizvi Law Associates. I can help with general information on:\n\n• Property title verification & transfers (KDA/SBCA/Bahria)\n• Family law — Khula, custody, succession certificates\n• Criminal bail & FIR quashment\n• Tax (FBR/SRB) and customs disputes\n• Cyber crime (PECA) complaints\n• Consultation fees, location & booking\n\nWhat would you like to know?`;
}

async function* demoStream(reply: string): AsyncGenerator<Uint8Array> {
  const encoder = new TextEncoder();
  const chunks = reply.match(/\S+\s*/g) ?? [reply];
  for (const chunk of chunks) {
    yield encoder.encode(chunk);
    await new Promise((r) => setTimeout(r, 18));
  }
}

/* ── Live mode: Agents SDK → Gemini ───────────────────────────────── */

type TurnContext = { sessionId: string; lastUser: string };

const GUARDRAIL_REFUSAL =
  "I'm the Karachi Legal AI assistant for Rizvi Law Associates, so I can only help with legal-information questions about Pakistani law and this firm's services — fees, practice areas, procedures and booking. If you have a question like that, just ask! You can also reach us at +92 21 3583 1234.";

/** Convert agent stream events into the plain-text delta wire format. */

function refusalStream(ctx: TurnContext): Response {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of demoStream(GUARDRAIL_REFUSAL)) {
        controller.enqueue(chunk);
      }
      controller.close();
      void logTurn(ctx.sessionId, ctx.lastUser, GUARDRAIL_REFUSAL);
    },
  });

  return new Response(stream, { headers: responseHeaders() });
}

/** Returns null when Gemini isn't configured or the run fails (→ demo fallback). */
async function liveChat(
  history: Array<{ role: "user" | "assistant"; content: string }>,
  ctx: TurnContext
): Promise<Response | null> {
  if (!GEMINI_API_KEY || history.length === 0) return null;

  // Lazily point the SDK at Gemini's endpoint (module-level init would
  // run at build time, where no credentials exist).
  ensureAgentProvider();

  const input = history.map((m) =>
    m.role === "user" ? user(m.content) : assistant(m.content)
  );

  try {
    const result = await run(legalAssistantAgent, input, { stream: true });
    const encoder = new TextEncoder();
    let full = "";

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of result) {
            if (event.type !== "raw_model_stream_event") continue;
            const data = event.data as { type?: string; delta?: unknown };
            const delta =
              data?.type === "output_text_delta" && typeof data.delta === "string"
                ? data.delta
                : "";
            if (delta) {
              full += delta;
              controller.enqueue(encoder.encode(delta));
            }
          }
          controller.close();
        } catch (err) {
          // Input guardrails can throw mid-stream (after the response has
          // started). Nothing streamed yet → emit the refusal inline.
          if (err instanceof InputGuardrailTripwireTriggered && !full) {
            console.warn(
              "[chat] Guardrail tripwire:",
              JSON.stringify(err.result?.output?.outputInfo ?? {})
            );
            full = GUARDRAIL_REFUSAL;
            controller.enqueue(encoder.encode(GUARDRAIL_REFUSAL));
          } else {
            console.error("[chat] Stream error:", err);
            // Mid-stream upstream failure (quota, overload, network) after
            // 200 headers are already sent — degrade to the keyword demo
            // answer instead of leaving the user with silence.
            if (!full) {
              full = demoReply(ctx.lastUser);
              controller.enqueue(encoder.encode(full));
            }
          }
          controller.close();
        } finally {
          void logTurn(ctx.sessionId, ctx.lastUser, full);
        }
      },
    });

    return new Response(stream, { headers: responseHeaders() });
  } catch (err) {
    if (err instanceof InputGuardrailTripwireTriggered) {
      console.warn(
        "[chat] Guardrail tripwire:",
        JSON.stringify(err.result?.output?.outputInfo ?? {})
      );
      return refusalStream(ctx);
    }
    console.error("[chat] Agent run failed:", err);
    return null;
  }
}

/** Remove empty/whitespace messages BEFORE validation — a failed stream can
 * leave an empty assistant bubble in client history, which would otherwise
 * fail Zod's min(1) and poison every later request with permanent 400s. */
function stripEmptyMessages(body: unknown): unknown {
  if (!body || typeof body !== "object") return body;
  const { messages } = body as { messages?: unknown };
  if (!Array.isArray(messages)) return body;
  return {
    ...(body as Record<string, unknown>),
    messages: messages.filter(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof (m as { content?: unknown }).content === "string" &&
        ((m as { content: string }).content).trim().length > 0
    ),
  };
}

/* ── Route ─────────────────────────────────────────────────────────── */

export async function POST(req: Request): Promise<Response> {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      {
        error:
          "You're sending messages too quickly. Please wait a few minutes, or call +92 21 3583 1234.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    console.warn("[chat] invalid JSON body");
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(stripEmptyMessages(body));
  if (!parsed.success) {
    console.warn(
      "[chat] invalid request shape:",
      parsed.error.issues
        .slice(0, 3)
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ")
    );
    return Response.json({ error: "Invalid request shape." }, { status: 400 });
  }

  const sessionId = parsed.data.session_id ?? crypto.randomUUID();
  const history = parsed.data.messages.slice(-12);
  const lastUser =
    [...history].reverse().find((m) => m.role === "user")?.content ?? "";
  const ctx: TurnContext = { sessionId, lastUser };

  const liveResponse = await liveChat(history, ctx);
  if (liveResponse) return liveResponse;

  /* Demo fallback — still streams */
  const reply = demoReply(lastUser);
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of demoStream(reply)) {
        controller.enqueue(chunk);
      }
      controller.close();
      void logTurn(sessionId, lastUser, reply);
    },
  });

  return new Response(stream, {
    headers: responseHeaders(),
  });
}

function responseHeaders(): HeadersInit {
  return {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store, no-transform",
    "X-Accel-Buffering": "no",
  };
}

/* ── Analytics logging (best effort, service-role) ─────────────────── */

async function logTurn(sessionId: string, user: string, assistant: string) {
  try {
    const admin = createAdminClient();
    if (!admin || !user.trim()) return;
    await admin.from("chat_logs").insert([
      { session_id: sessionId, role: "user", message: user.slice(0, 8000) },
      ...(assistant.trim()
        ? [
            {
              session_id: sessionId,
              role: "assistant" as const,
              message: assistant.slice(0, 8000),
            },
          ]
        : []),
    ]);
  } catch (err) {
    console.warn("[chat] chat_logs insert failed:", err);
  }
}
