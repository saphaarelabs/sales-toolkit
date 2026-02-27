// CloserKit Skills Data — mirrored from src/data/skillTemplates.ts
// This file is used by the CLI to generate skill files.

const codingAgentSkills = [
  { id: "ca-1", title: "Cold Outreach System Builder", description: "Builds a complete cold email system with personalization, sequencing, and A/B testing.", compatibleTools: ["Claude Code", "Codex", "Cursor", "Antigravity"], variables: ["YOUR_PRODUCT", "ICP_DESCRIPTION", "TECH_STACK"] },
  { id: "ca-2", title: "Sales Dashboard Generator", description: "Creates pipeline dashboards with quota tracking, velocity metrics, and forecasting.", compatibleTools: ["Claude Code", "Codex", "Cursor", "Antigravity"], variables: ["QUARTERLY_QUOTA", "SALES_STAGES", "TECH_STACK"] },
  { id: "ca-3", title: "CRM Data Enrichment Script", description: "Builds scripts to enrich CRM data using APIs (Clearbit, Apollo, etc.).", compatibleTools: ["Claude Code", "Codex", "Cursor"], variables: ["CRM_PLATFORM", "ENRICHMENT_APIS", "KEY_FIELDS"] },
  { id: "ca-4", title: "Lead Scoring Model", description: "Creates a lead scoring algorithm based on ICP criteria and engagement signals.", compatibleTools: ["Claude Code", "Codex", "Cursor"], variables: ["ICP_CRITERIA", "ENGAGEMENT_SIGNALS", "SCORING_RANGE"] },
  { id: "ca-5", title: "Outbound Sequence Automator", description: "Builds multi-channel outreach sequences with timing logic.", compatibleTools: ["Claude Code", "Codex", "Cursor", "Antigravity"], variables: ["CHANNELS", "SEQUENCE_LENGTH", "YOUR_PRODUCT"] },
];

const salesAgentSkills = [
  { id: "sa-1", title: "Hyper-Personalization Agent", description: "Uses company data, job title duration, competitor news, and social presence to craft 1:1 messages.", compatibleTools: ["Clay", "ChatGPT", "Claude", "AI SDRs"], variables: ["YOUR_PRODUCT", "VALUE_PROP"] },
  { id: "sa-2", title: "ICP Research Agent", description: "Analyzes a company to determine if they match your ICP and suggests the best outreach angle.", compatibleTools: ["Clay", "ChatGPT", "Claude", "AI SDRs"], variables: ["ICP_CRITERIA", "DISQUALIFIERS"] },
  { id: "sa-3", title: "Objection Handling Agent", description: "Responds to common objections using proven frameworks (feel-felt-found, boomerang, etc.).", compatibleTools: ["ChatGPT", "Claude", "AI SDRs"], variables: ["YOUR_PRODUCT", "COMPETITORS", "PRICING"] },
  { id: "sa-4", title: "Follow-Up Strategist", description: "Decides the best follow-up approach based on engagement signals and timing.", compatibleTools: ["Clay", "ChatGPT", "Claude", "AI SDRs"], variables: ["YOUR_PRODUCT", "TYPICAL_SALES_CYCLE"] },
  { id: "sa-5", title: "Meeting Prep Agent", description: "Researches a prospect before a call and generates discovery questions, talking points, and competitive intel.", compatibleTools: ["ChatGPT", "Claude", "AI SDRs"], variables: ["YOUR_PRODUCT", "PROSPECT_COMPANY", "PROSPECT_TITLE"] },
  { id: "sa-6", title: "LinkedIn DM Writer", description: "Crafts personalized LinkedIn messages using the prospect's recent posts, job changes, and company news.", compatibleTools: ["Clay", "ChatGPT", "Claude", "AI SDRs"], variables: ["YOUR_PRODUCT", "YOUR_ROLE"] },
  { id: "sa-7", title: "Competitor Battle Card Agent", description: "Generates real-time competitive positioning based on the prospect's current stack.", compatibleTools: ["Clay", "ChatGPT", "Claude"], variables: ["YOUR_PRODUCT", "COMPETITORS", "KEY_DIFFERENTIATORS"] },
];

const allSkills = [...codingAgentSkills, ...salesAgentSkills];

function generateContent(skills, format) {
  const header = format === "cursorrules"
    ? "# .cursorrules — CloserKit Sales Skills\n\n"
    : format === "claude"
    ? "# CLAUDE.md — CloserKit Sales Skills\n\n"
    : "# CloserKit AI Skills Bundle\n\n";

  const sections = skills.map((skill) => {
    const vars = skill.variables.map(v => `[${v}]`).join(", ");
    return `## ${skill.title}\n\n${skill.description}\n\n**Compatible:** ${skill.compatibleTools.join(", ")}\n**Variables:** ${vars}\n\nUse this skill by filling in the variables above and pasting into your AI tool.\n`;
  });

  return header + sections.join("\n---\n\n");
}

function generateCursorRules() {
  return generateContent(codingAgentSkills, "cursorrules");
}

function generateClaudeMd() {
  return generateContent(allSkills, "claude");
}

function generateMarkdown() {
  return generateContent(allSkills, "markdown");
}

module.exports = { generateCursorRules, generateClaudeMd, generateMarkdown, allSkills, codingAgentSkills, salesAgentSkills };
