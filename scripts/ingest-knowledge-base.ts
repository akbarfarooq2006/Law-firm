/**
 * Knowledge-base ingestion CLI.
 *
 *   npm run ingest
 *
 * Reads every knowledge-base/*.md file, chunks it, embeds each chunk with
 * gemini-embedding-001 (dimensions pinned to EMBEDDING_DIMENSIONS = 1536,
 * matching supabase/schema-vector.sql), then replaces all rows for that
 * source inside knowledge_chunks.
 *
 * Requires env vars: GEMINI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
// MUST stay the first import: populates process.env before config modules initialize.
import "./lib/load-env";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { chunkMarkdown } from "../src/lib/rag/chunk";
import { embedBatch } from "../src/lib/rag/embed";
import { EMBEDDING_DIMENSIONS, GEMINI_EMBEDDING_MODEL } from "../src/lib/rag/config";

const KB_DIR = path.resolve(process.cwd(), "knowledge-base");
const BATCH_SIZE = 8;

async function main(): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("✗ Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  if (!process.env.GEMINI_API_KEY) {
    console.error("✗ Missing GEMINI_API_KEY.");
    process.exit(1);
  }

  let files: string[];
  try {
    files = (await readdir(KB_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    console.error(`✗ knowledge-base/ directory not found at ${KB_DIR}`);
    process.exit(1);
  }
  if (files.length === 0) {
    console.error("✗ No .md files found in knowledge-base/.");
    process.exit(1);
  }

  const admin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log(
    `Ingesting ${files.length} file(s) with ${GEMINI_EMBEDDING_MODEL} @ ${EMBEDDING_DIMENSIONS} dims…\n`
  );

  for (const file of files) {
    const markdown = await readFile(path.join(KB_DIR, file), "utf8");
    const chunks = chunkMarkdown(markdown, file);
    if (chunks.length === 0) {
      console.warn(`⚠ ${file}: no chunks produced, skipping.`);
      continue;
    }

    process.stdout.write(`${file}: ${chunks.length} chunks — embedding`);

    // Pre-delete rows for this source so re-runs are idempotent.
    const del = await admin.from("knowledge_chunks").delete().eq("source", file);
    if (del.error) throw new Error(`delete failed for ${file}: ${del.error.message}`);

    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const vectors = await embedBatch(batch.map((c) => c.content));
      const rows = batch.map((chunk, j) => ({
        source: chunk.source,
        heading: chunk.heading,
        chunk_index: chunk.chunkIndex,
        content: chunk.content,
        embedding: vectors[j],
      }));
      const ins = await admin.from("knowledge_chunks").insert(rows);
      if (ins.error) throw new Error(`insert failed for ${file}: ${ins.error.message}`);
      process.stdout.write(".");
    }

    console.log(" done ✓");
  }

  console.log("\nAll sources ingested successfully.");
}

main().catch((err) => {
  console.error("\n✗ Ingestion failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
