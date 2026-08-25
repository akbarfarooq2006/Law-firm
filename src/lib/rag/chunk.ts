/**
 * Markdown chunker for the knowledge base.
 * Splits on headings first, then hard-splits oversized sections with
 * a small character overlap so context isn't lost at boundaries.
 */

const TARGET_CHUNK_CHARS = 1000;
const OVERLAP_CHARS = 150;
const MIN_CHUNK_CHARS = 40;

type Section = { heading: string; body: string };

function splitSections(markdown: string): Section[] {
  const lines = markdown.split(/\r?\n/);
  const sections: Section[] = [];
  let heading = "";
  let buffer: string[] = [];

  const flush = () => {
    const body = buffer.join("\n").trim();
    if (body.length > 0) sections.push({ heading: heading.trim(), body });
    buffer = [];
  };

  for (const line of lines) {
    if (/^#{1,6}\s+/.test(line)) {
      flush();
      heading = line.replace(/^#{1,6}\s+/, "").trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections.length > 0 ? sections : [{ heading: "", body: markdown.trim() }];
}

/** Hard-split long text into overlapping windows, preferring paragraph breaks. */
function splitBody(body: string): string[] {
  if (body.length <= TARGET_CHUNK_CHARS) return [body];

  const paragraphs = body.split(/\n\s*\n/);
  const chunks: string[] = [];
  let current = "";

  const pushCurrent = () => {
    if (current.trim().length >= MIN_CHUNK_CHARS) chunks.push(current.trim());
    current = "";
  };

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).length > TARGET_CHUNK_CHARS && current) {
      pushCurrent();
    }
    // A single paragraph larger than the target gets windowed with overlap.
    if (paragraph.length > TARGET_CHUNK_CHARS) {
      let start = 0;
      while (start < paragraph.length) {
        const end = Math.min(start + TARGET_CHUNK_CHARS, paragraph.length);
        const piece = paragraph.slice(start, end).trim();
        if (piece) {
          if (current) pushCurrent();
          chunks.push(piece);
        }
        if (end === paragraph.length) break;
        start = end - OVERLAP_CHARS;
      }
      continue;
    }
    current = current ? `${current}\n\n${paragraph}` : paragraph;
  }
  pushCurrent();

  return chunks.filter((c) => c.length >= MIN_CHUNK_CHARS);
}

export type KnowledgeChunk = {
  source: string;
  heading: string;
  chunkIndex: number;
  content: string;
};

export function chunkMarkdown(markdown: string, source: string): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  let index = 0;

  for (const section of splitSections(markdown)) {
    for (const piece of splitBody(section.body)) {
      chunks.push({
        source,
        heading: section.heading,
        chunkIndex: index++,
        content: section.heading
          ? `# ${section.heading}\n\n${piece}`
          : piece,
      });
    }
  }

  return chunks;
}
