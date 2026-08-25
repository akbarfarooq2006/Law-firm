/**
 * Shared RAG configuration.
 * SINGLE SOURCE OF TRUTH for embedding dimensions — must match
 * `embedding vector(1536)` in supabase/schema-vector.sql exactly,
 * otherwise inserts fail on dimension mismatch.
 */
export const EMBEDDING_DIMENSIONS = Number(process.env.GEMINI_EMBEDDING_DIMENSIONS ?? 1536);

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
export const GEMINI_BASE_URL =
  process.env.GEMINI_BASE_URL ?? "https://generativelanguage.googleapis.com/v1beta/openai/";
export const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";
export const GEMINI_GUARDRAIL_MODEL =
  process.env.GEMINI_GUARDRAIL_MODEL ?? "gemini-3.5-flash-lite";
export const GEMINI_EMBEDDING_MODEL =
  process.env.GEMINI_EMBEDDING_MODEL ?? "gemini-embedding-001";

/** Gemini thinking level for routine answers ("low" keeps tool-use quality while capping hidden-token burn). */
export const GEMINI_REASONING_EFFORT = process.env.GEMINI_REASONING_EFFORT ?? "low";
