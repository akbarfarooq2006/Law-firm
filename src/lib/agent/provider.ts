import { OpenAI } from "openai";
import {
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setTracingDisabled,
} from "@openai/agents";
import { GEMINI_API_KEY, GEMINI_BASE_URL } from "@/lib/rag/config";

/**
 * Gemini 3.x models attach an encrypted `thought_signature` to function
 * calls and REQUIRE it back on the follow-up tool-result request. The
 * OpenAI-compat layer returns it in a non-standard `extra_content` field
 * that @openai/agents strips, so the follow-up request fails with 400
 * "Function call is missing a thought_signature".
 *
 * Fix: intercept outgoing /chat/completions bodies and stamp assistant
 * tool-call messages with Google's documented escape hatch
 * (`skip_thought_signature_validator`). Slight reasoning-continuity cost,
 * officially supported, keeps any Gemini 3.x model usable.
 */
const THOUGHT_SIGNATURE_BYPASS = "skip_thought_signature_validator";

type ChatCompletionRequestBody = {
  messages?: Array<{
    role?: string;
    tool_calls?: unknown[];
    extra_content?: {
      google?: { thought_signature?: string };
    };
  }>;
};

function injectThoughtSignatureBypass(body: string): string | null {
  try {
    const parsed = JSON.parse(body) as ChatCompletionRequestBody;
    let mutated = false;

    for (const message of parsed.messages ?? []) {
      if (
        message?.role !== "assistant" ||
        !Array.isArray(message.tool_calls) ||
        message.tool_calls.length === 0
      ) {
        continue;
      }
      message.extra_content ??= {};
      message.extra_content.google ??= {};
      if (!message.extra_content.google.thought_signature) {
        message.extra_content.google.thought_signature = THOUGHT_SIGNATURE_BYPASS;
        mutated = true;
      }
    }

    return mutated ? JSON.stringify(parsed) : null;
  } catch {
    return null;
  }
}

function patchedFetch(url: string | URL | Request, init?: RequestInit): Promise<Response> {
  const target = typeof url === "string" ? url : url instanceof Request ? url.url : String(url);
  const rawBody = init?.body;
  const isChatCompletions =
    target.includes("/chat/completions") &&
    (init?.method ?? (url instanceof Request ? url.method : "GET")).toUpperCase() ===
      "POST" &&
    typeof rawBody === "string";

  if (!isChatCompletions || typeof rawBody !== "string") {
    return fetch(url as string | URL, init);
  }

  const rewrittenBody = injectThoughtSignatureBypass(rawBody);
  if (!rewrittenBody) {
    return fetch(url as string | URL, init);
  }

  return fetch(url as string | URL, { ...init, body: rewrittenBody });
}

let configured = false;

/**
 * Point the Agents SDK at Gemini's OpenAI-compatible endpoint.
 *
 * - Chat Completions API (Gemini's compat layer has no /responses endpoint)
 * - Tracing disabled: trace uploads require an OpenAI platform key
 * - Custom fetch stamps required thought-signature bypasses onto tool calls
 * - Idempotent singleton; call once before any run()
 */
export function ensureAgentProvider(): void {
  if (configured) return;

  setDefaultOpenAIClient(
    new OpenAI({
      baseURL: GEMINI_BASE_URL,
      apiKey: GEMINI_API_KEY,
      fetch: patchedFetch,
      maxRetries: 2,
      timeout: 60_000,
    })
  );
  setOpenAIAPI("chat_completions");
  setTracingDisabled(true);

  configured = true;
}
