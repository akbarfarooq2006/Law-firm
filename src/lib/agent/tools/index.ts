import type { Tool } from "@openai/agents";
import { searchKnowledgeBaseTool } from "./search-knowledge-base";

/**
 * Registry of tools available to the chat agent.
 * Add future tools here (e.g. book_consultation) — no other changes needed.
 */
export const agentTools: Tool[] = [searchKnowledgeBaseTool];
