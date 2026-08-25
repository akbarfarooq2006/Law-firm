import { createAdminClient } from "@/lib/supabase/admin";
import { embedText } from "./embed";

export type KnowledgeHit = {
  source: string;
  heading: string;
  content: string;
  similarity: number;
};

/**
 * Semantic search over the ingested knowledge base via the
 * match_knowledge_base RPC (cosine similarity, pgvector).
 * Returns [] when Supabase isn't configured or nothing matches —
 * the agent decides how to answer without results.
 */
export async function searchKnowledgeBase(query: string): Promise<KnowledgeHit[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  let embedding: number[];
  try {
    embedding = await embedText(trimmed);
  } catch (err) {
    console.warn("[rag] query embedding failed:", err);
    return [];
  }

  const admin = createAdminClient();
  if (!admin) {
    console.warn("[rag] Supabase admin client unavailable — knowledge base disabled.");
    return [];
  }

  const { data, error } = await admin.rpc("match_knowledge_base", {
    query_embedding: embedding,
    match_count: 4,
    min_similarity: 0.3,
  });

  if (error) {
    console.warn("[rag] match_knowledge_base failed:", error.message);
    return [];
  }

  return (data ?? []).map(
    (row: { source: string; heading: string; content: string; similarity: number }) => ({
      source: row.source,
      heading: row.heading,
      content: row.content,
      similarity: row.similarity,
    })
  );
}
