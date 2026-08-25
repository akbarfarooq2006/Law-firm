import {
  EMBEDDING_DIMENSIONS,
  GEMINI_API_KEY,
  GEMINI_BASE_URL,
  GEMINI_EMBEDDING_MODEL,
} from "./config";

/**
 * Embed text via the Gemini OpenAI-compatible /embeddings endpoint.
 * gemini-embedding-001 defaults to 3072 dims — we explicitly request
 * EMBEDDING_DIMENSIONS (1536) on EVERY call; the requested value must
 * match `vector(1536)` in supabase/schema-vector.sql exactly.
 */

type EmbeddingsResponse = {
  data?: Array<{ embedding?: number[] }>;
};

export async function embedText(input: string): Promise<number[]> {
  const batches = await embedBatch([input]);
  return batches[0];
}

export async function embedBatch(inputs: string[]): Promise<number[][]> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured.");
  if (inputs.length === 0) return [];

  // The compat endpoint accepts one input per request reliably; batch sequentially.
  const out: number[][] = [];
  for (const text of inputs) {
    const res = await fetch(`${GEMINI_BASE_URL}embeddings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        model: GEMINI_EMBEDDING_MODEL,
        input: text,
        dimensions: EMBEDDING_DIMENSIONS,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `Embedding request failed (${res.status}): ${detail.slice(0, 300)}`
      );
    }

    const json = (await res.json()) as EmbeddingsResponse;
    const vector = json.data?.[0]?.embedding;
    if (!Array.isArray(vector)) {
      throw new Error("Embedding response contained no vector.");
    }
    if (vector.length !== EMBEDDING_DIMENSIONS) {
      throw new Error(
        `Embedding dimension mismatch: got ${vector.length}, expected ${EMBEDDING_DIMENSIONS}. ` +
          "Check GEMINI_EMBEDDING_DIMENSIONS against supabase/schema-vector.sql."
      );
    }
    out.push(vector);
  }

  return out;
}
