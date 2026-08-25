import { Agent } from "@openai/agents";
import { GEMINI_MODEL, GEMINI_REASONING_EFFORT } from "@/lib/rag/config";
import { AGENT_INSTRUCTIONS } from "./instructions";
import { agentTools } from "./tools";
import { scopeGuardrail } from "./guardrails/scope-guardrail";

export const legalAssistantAgent = new Agent({
  name: "Karachi Legal AI",
  instructions: AGENT_INSTRUCTIONS,
  model: GEMINI_MODEL,
  tools: [...agentTools],
  inputGuardrails: [scopeGuardrail],
  modelSettings: {
    temperature: 0.3,
    maxTokens: 250,
    // Cap Gemini's hidden thinking tokens for routine FAQ-style answers.
    // Raise only if a future feature genuinely needs deeper reasoning.
    reasoning: { effort: GEMINI_REASONING_EFFORT as "minimal" | "low" | "medium" | "high" },
  },
});
