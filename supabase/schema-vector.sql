-- ══════════════════════════════════════════════════════════════════════
--  RIZVI LAW ASSOCIATES — VECTOR SEARCH SCHEMA (RAG knowledge base)
--  Run this in: Supabase Dashboard → SQL Editor → New query → paste → Run
--
--  ⚠ DIMENSION SYNC: `embedding vector(1536)` below MUST equal
--    EMBEDDING_DIMENSIONS in src/lib/rag/config.ts (default 1536).
--    A mismatch makes every insert fail with a dimension error.
-- ══════════════════════════════════════════════════════════════════════

create extension if not exists vector;

-- ─────────────────────────────────────────────────────────
--  KNOWLEDGE CHUNKS — embedded chunks of knowledge-base/*.md
--  Written ONLY by scripts/ingest-knowledge-base.ts via the
--  service-role key. No public policies on purpose.
-- ─────────────────────────────────────────────────────────

create table public.knowledge_chunks (
  id           uuid primary key default gen_random_uuid(),
  source       text not null,                -- file name, e.g. "firm-knowledge.md"
  heading      text not null default '',     -- nearest markdown heading
  chunk_index  int  not null default 0,      -- position within the source file
  content      text not null check (char_length(content) between 1 and 8000),
  embedding    vector(1536) not null,        -- keep in sync with EMBEDDING_DIMENSIONS
  created_at   timestamptz not null default now(),

  unique (source, chunk_index)
);

create index knowledge_chunks_source_idx on public.knowledge_chunks (source);
create index knowledge_chunks_embedding_idx
  on public.knowledge_chunks using hnsw (embedding vector_cosine_ops);

alter table public.knowledge_chunks enable row level security;

-- Deliberately NO policies: anon/authenticated get nothing; only the
-- service-role key (which bypasses RLS) reads/writes this table.

-- ─────────────────────────────────────────────────────────
--  MATCH FUNCTION — cosine similarity search used by the
--  search_knowledge_base agent tool.
-- ─────────────────────────────────────────────────────────

create or replace function public.match_knowledge_base(
  query_embedding vector(1536),   -- keep in sync with EMBEDDING_DIMENSIONS
  match_count    int default 4,
  min_similarity float default 0.30
)
returns table (
  id          uuid,
  source      text,
  heading     text,
  chunk_index int,
  content     text,
  similarity  float
)
language sql stable
as $$
  select
    kc.id,
    kc.source,
    kc.heading,
    kc.chunk_index,
    kc.content,
    1 - (kc.embedding <=> query_embedding) as similarity
  from public.knowledge_chunks kc
  where 1 - (kc.embedding <=> query_embedding) >= min_similarity
  order by kc.embedding <=> query_embedding
  limit match_count;
$$;

revoke execute on function public.match_knowledge_base(vector, int, float) from anon, authenticated;

-- ════════════════════════════════════════════════════════
--  POST-RUN:
--  npm run ingest   → chunks + embeds knowledge-base/*.md into this table
-- ════════════════════════════════════════════════════════
