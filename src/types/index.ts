import type { LucideIcon } from "lucide-react";

export interface UrduTerm {
  term: string;
  meaning: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Offering {
  title: string;
  description: string;
}

export interface PracticeArea {
  slug: string;
  title: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  overview: string[];
  offerings: Offering[];
  urduTerms?: UrduTerm[];
  venues: string[];
  faqs: FaqItem[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  author: string;
  tags: string[];
  reading_time: number | null;
  published_at: string | null;
}
