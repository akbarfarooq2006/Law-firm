import { createAdminClient } from "@/lib/supabase/admin";
import { chatRequestSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Persona & Guardrails ─────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are "Karachi Legal AI", the virtual legal assistant of Rizvi Law Associates (Advocates & Legal Consultants), Suite #402, Executive Towers, Block 5, Clifton, Karachi, Pakistan. The firm practices before the High Court of Sindh, City Courts Karachi, Malir Courts, Banking Courts Karachi and the Supreme Court of Pakistan (appellate).

YOUR ROLE
- Represent the firm accurately and professionally.
- Provide GENERAL legal information under Pakistani federal law and Sindh provincial law only.
- Explain common procedures step-by-step (property verification, Khula, succession certificates, bail, FBR/SRB notices, PECA complaints).
- You may explain Urdu legal terms users mention (Wakala, Kula/Khula, Iqrarnama, Fard-e-Malkiat, Intiqal, Bayana, Zamanat).

HARD LIMITS
- Never claim an attorney-client relationship exists. Always include this exact disclaimer at the END of every reply, on its own line:
"This AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation."
- Never guarantee outcomes, predict specific judgments, or quote case-law you are unsure about.
- Never draft complete legal documents in chat; describe what they contain instead.
- Do not advise on jurisdictions outside Pakistan; say it is outside your scope.
- For emergencies (arrest, violence), tell users to call the firm immediately at +92 21 3583 1234 / WhatsApp +92 300 1234567.

BOOKING INTENT
If the user expresses intent to hire, consult, or book, warmly offer booking: consultations cost Rs. 5,000 for 30 minutes, held at the Clifton chamber or virtually, Mon–Sat 9:00 AM–7:00 PM PKT. Point them to the Contact page (/contact) or WhatsApp +92 300 1234567.

STYLE
- Warm, concise, professional. Default to English; mirror basic Urdu phrases where natural.
- Use short bullet lists for document checklists and steps.
- Keep answers under ~220 words.`;

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

/* ── Demo mode (no OPENAI_API_KEY configured) ─────────────────────── */

function demoReply(prompt: string): string {
  const q = prompt.toLowerCase();
  if (/(property|plot|flat|transfer|registry|verif|title|bahria|kda|sbca)/.test(q))
    return `For property transfer in Karachi, bring these essentials:\n\n• Original registered deed (or allotment + transfer letter for leased plots)\n• Latest property tax challans\n• Seller's CNIC\n• Approved building plan (SBCA) for constructed units\n• Wakala Nama if someone is acting under power of attorney\n\nOur chamber runs a 13-point title verification (Sub-Registrar copies, fard-e-malkiat/intiqal, encumbrance & court searches) delivered as a written report in 3–5 working days.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(succession|wirasat|inherit|certificate)/.test(q))
    return `Succession certificates (for movable assets like bank accounts and shares) are issued by the District Courts Karachi/Malir under the Succession Act 1925:\n\n1. Death certificate + NADRA FRC listing all heirs\n2. Heirs' CNICs and asset details (account numbers, folios)\n3. Petition filed; public notice invites objections\n4. Uncontested matters typically conclude in 6–10 weeks\n\nImmovable property passes through inheritance mutation (intiqal), not a succession certificate.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(khula|kula|divorce|talaq|custody|maintenance|nikah)/.test(q))
    return `Family matters we regularly handle before Karachi Family Courts:\n\n• Khula — judicial dissolution at the wife's instance; uncontested decrees commonly take 2–4 months\n• Talaq procedure & registration under the Muslim Family Laws Ordinance\n• Child custody (hizanat) and visitation decided purely on the child's welfare\n• Maintenance claims and haq mehr recovery\n\nAll proceedings are confidential.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(fee|fees|cost|price|charge|location|address|timing|hour|book|appointment|consult)/.test(q))
    return `Consultation details:\n\n• Fee: Rs. 5,000 for a 30-minute confidential consultation\n• Location: Suite #402, Executive Towers, Block 5, Clifton, Karachi\n• Mode: In-office or virtual (video/phone)\n• Timings: Mon–Sat, 9:00 AM – 7:00 PM PKT\n\nBook online via our Contact page, or WhatsApp +92 300 1234567 for the fastest confirmation.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(bail|arrest|fir|police|criminal|case against)/.test(q))
    return `For criminal matters, speed matters:\n\n• Pre-arrest/post-arrest bail applications can be filed the same day where facts allow (bailable offenses often resolved within hours)\n• False FIRs can be challenged under Sections 22-A/22-B CrPC (Justice of Peace) or quashed by the Sindh High Court\n• Counsel presence during police interrogation prevents custodial excesses\n\nIf there is any risk of arrest right now, call us immediately: +92 21 3583 1234 (WhatsApp +92 300 1234567).\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(tax|fbr|srb|customs|notice|audit)/.test(q))
    return `Tax & customs desk summary:\n\n• FBR income-tax/sales-tax notices usually allow 7–15 days — a well-drafted reply within time prevents ex-parte assessment\n• SRB services-tax registrations, classifications and recovery defense\n• Customs valuation/classification disputes and adjudication\n• Appeals: Commissioner (Appeals) → ATIR → High Court reference\n\nBring the notice/receipt PDF to consultation for a fixed written fee estimate.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  if (/(cyber|hack|facebook|instagram|whatsapp|blackmail|harass|peca|defam)/.test(q))
    return `Cyber crime support under PECA 2016:\n\n• Cyber harassment/blackmail: complaint to the FIA Cybercrime Wing — we prepare an admissible evidence bundle (certified exports, hash values, affidavits)\n• Online defamation: civil damages plus criminal remedies\n• Financial fraud: tracing/freezing of proceeds\n• Content removal: platform takedown notices and PTA coordination\n\nPreserve everything — don't delete chats or block the offender until evidence is captured.\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;

  return `Assalam-o-Alaikum! I'm the Karachi Legal AI assistant for Rizvi Law Associates. I can help with general information on:\n\n• Property title verification & transfers (KDA/SBCA/Bahria)\n• Family law — Khula, custody, succession certificates\n• Criminal bail & FIR quashment\n• Tax (FBR/SRB) and customs disputes\n• Cyber crime (PECA) complaints\n• Consultation fees, location & booking\n\nWhat would you like to know?\n\nThis AI provides informational guidance only and does not constitute formal attorney-client privilege. Please book a consultation with our advocates for formal legal representation.`;
}

async function* demoStream(reply: string): AsyncGenerator<Uint8Array> {
  const encoder = new TextEncoder();
  const chunks = reply.match(/\S+\s*/g) ?? [reply];
  for (const chunk of chunks) {
    yield encoder.encode(chunk);
    await new Promise((r) => setTimeout(r, 18));
  }
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
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request shape." },
      { status: 400 }
    );
  }

  const sessionId = parsed.data.session_id ?? crypto.randomUUID();
  const history = parsed.data.messages.slice(-12);
  const lastUser =
    [...history].reverse().find((m) => m.role === "user")?.content ?? "";

  /* Live LLM mode */
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    const baseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";
    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    try {
      const upstream = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          stream: true,
          temperature: 0.3,
          max_tokens: 600,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
          ],
        }),
      });

      if (upstream.ok && upstream.body) {
        return streamOpenAi(upstream.body, { sessionId, lastUser });
      }
      console.error("[chat] Upstream error:", upstream.status);
    } catch (err) {
      console.error("[chat] Upstream fetch failed:", err);
    }
  }

  /* Demo fallback — still streams */
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const chunk of demoStream(demoReply(lastUser))) {
        controller.enqueue(chunk);
      }
      controller.close();
      void logTurn(sessionId, lastUser, demoReply(lastUser));
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

/** Convert OpenAI SSE frames into a plain-text delta stream. */
function streamOpenAi(
  upstreamBody: ReadableStream<Uint8Array>,
  ctx: { sessionId: string; lastUser: string }
): Response {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstreamBody.getReader();
      let buffer = "";
      let full = "";

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string | null } }>;
              };
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                full += delta;
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore partial/malformed frame
            }
          }
        }
        controller.close();
      } catch (err) {
        console.error("[chat] Stream error:", err);
        controller.close();
      } finally {
        void logTurn(ctx.sessionId, ctx.lastUser, full);
      }
    },
  });

  return new Response(stream, { headers: responseHeaders() });
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
