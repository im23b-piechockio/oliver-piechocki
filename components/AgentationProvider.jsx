"use client";

// Agentation, visual feedback toolbar for AI coding agents.
// Click elements on the page, annotate them, and copy structured output
// (CSS selectors, positions, context) to hand to an agent.
// Rendered in development only (see app/layout.js).
import { Agentation } from "agentation";

export function AgentationProvider() {
  return <Agentation />;
}
