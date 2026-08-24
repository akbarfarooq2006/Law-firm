import { createServerSupabase } from "./server";
import { SEED_ARTICLES } from "./articles-seed";
import type { Article } from "@/types";

export const isSupabaseConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) =>
      new Date(b.published_at ?? 0).getTime() -
      new Date(a.published_at ?? 0).getTime()
  );
}

/** Fetch published articles from Supabase; fall back to bundled seeds. */
export async function getPublishedArticles(): Promise<{
  articles: Article[];
  source: "supabase" | "seed";
}> {
  const supabase = await createServerSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, excerpt, content_md, author, tags, reading_time, published_at")
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(24);

    if (!error && data && data.length > 0) {
      return { articles: data as Article[], source: "supabase" };
    }
    if (error) console.warn("[insights] Supabase fetch failed:", error.message);
  }
  return { articles: sortArticles(SEED_ARTICLES), source: "seed" };
}

export async function getArticleBySlug(
  slug: string
): Promise<{ article: Article | null; source: "supabase" | "seed" }> {
  const supabase = await createServerSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, excerpt, content_md, author, tags, reading_time, published_at")
      .eq("slug", slug)
      .not("published_at", "is", null)
      .lte("published_at", new Date().toISOString())
      .maybeSingle();

    if (!error && data) return { article: data as Article, source: "supabase" };
    if (error && error.code !== "PGRST116")
      console.warn("[insights] Supabase fetch failed:", error.message);
  }
  const article =
    SEED_ARTICLES.find((a) => a.slug === slug) ?? null;
  return { article, source: "seed" };
}
