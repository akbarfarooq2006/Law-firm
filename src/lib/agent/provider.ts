import { OpenAI } from "openai";
import {
  setDefaultOpenAIClient,
  setOpenAIAPI,
  setTracingDisabled,
} from "@openai/agents";
import { GEMINI_API_KEY, GEMINI_BASE_URL } from "@/lib/rag/config";

let configured = false;

/**
 * Point the Agents SDK at Gemini's OpenAI-compatible endpoint.
 *
 * - Chat Completions API (Gemini's compat layer has no /responses endpoint)
 * - Tracing disabled: trace uploads require an OpenAI platform key
 * - Idempotent singleton; call once before any run()
 */
export function ensureAgentProvider(): void {
  if (configured) return;

  setDefaultOpenAIClient(
    new OpenAI({
      baseURL: GEMINI_BASE_URL,
      apiKey: GEMINI_API_KEY,
    })
  );
  setOpenAIAPI("chat_completions");
  setTracingDisabled(true);

  configured = true;
}
