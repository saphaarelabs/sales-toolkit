

# New Feature: AI Skills Library

## What We're Building

A new **"AI Skills"** page — a library of ready-to-copy system prompts ("skills") that salespeople can paste into AI tools to instantly get a specialized sales assistant. Two flavors:

1. **AI Coding Agent Skills** — For Claude Code, Codex, Antigravity, Cursor, etc. These are `.md`-style skill files that turn a coding agent into a sales tool builder.
2. **AI Sales Agent Skills** — For Clay, AI SDR platforms, and general-purpose agents. These are system prompts that turn an AI into a specialized outbound sales agent.

Each skill is a long, detailed system prompt that users copy with one click and paste into their tool.

---

## Skills to Include

### AI Coding Agent Skills (paste into Claude Code / Codex)
| Skill | What It Does |
|---|---|
| Cold Outreach System Builder | Builds a complete cold email system with personalization, sequencing, and A/B testing |
| Sales Dashboard Generator | Creates pipeline dashboards with quota tracking, velocity metrics, and forecasting |
| CRM Data Enrichment Script | Builds scripts to enrich CRM data using APIs (Clearbit, Apollo, etc.) |
| Lead Scoring Model | Creates a lead scoring algorithm based on ICP criteria and engagement signals |
| Outbound Sequence Automator | Builds multi-channel outreach sequences with timing logic |

### AI Sales Agent Skills (paste into Clay / AI SDRs)
| Skill | What It Does |
|---|---|
| Hyper-Personalization Agent | Uses company data, job title duration, competitor news, and social presence to craft 1:1 messages |
| ICP Research Agent | Analyzes a company to determine if they match your ICP and suggests the best angle |
| Objection Handling Agent | Responds to common objections using proven frameworks (feel-felt-found, boomerang, etc.) |
| Follow-Up Strategist | Decides the best follow-up approach based on engagement signals and timing |
| Meeting Prep Agent | Researches a prospect before a call and generates discovery questions, talking points, and competitive intel |
| LinkedIn DM Writer | Crafts personalized LinkedIn messages using the prospect's recent posts, job changes, and company news |
| Competitor Battle Card Agent | Generates real-time competitive positioning based on the prospect's current stack |

---

## Page Design

```text
+--------------------------------------------------+
|  AI Skills Library                                |
|  Copy-paste skills that turn any AI into your     |
|  sales co-pilot. Works with Claude, ChatGPT,      |
|  Clay, Codex, and more.                           |
+--------------------------------------------------+
|                                                    |
|  [Tab: For Coding Agents] [Tab: For Sales Agents] |
|                                                    |
|  +----------------------------------------------+ |
|  | Cold Outreach System Builder                  | |
|  | Turn Claude Code into a cold email machine    | |
|  | [Copy Skill]                [Preview v]       | |
|  +----------------------------------------------+ |
|  | ...more skills...                             | |
|  +----------------------------------------------+ |
+--------------------------------------------------+
```

Each skill card:
- Title + short description
- "Works with:" badges (e.g., Claude Code, Codex, Clay)
- Expandable preview showing the full skill text
- One-click copy button
- Variables section (e.g., `{{YOUR_PRODUCT}}`, `{{ICP_DESCRIPTION}}`) that users fill in before copying

---

## Technical Plan

### 1. Create `src/data/skillTemplates.ts`
- Define `Skill` interface: `id`, `title`, `description`, `category` ("Coding Agents" | "Sales Agents"), `compatibleTools` (string array), `skill` (the full system prompt text), `variables` (same pattern as email templates)
- Export `codingAgentSkills` and `salesAgentSkills` arrays with ~12 total skills

### 2. Create `src/pages/SkillsLibrary.tsx`
- New page using the existing `ToolLayout` component
- Tab-based UI (Coding Agents / Sales Agents) using Radix Tabs
- Each skill rendered as an expandable card (same accordion pattern as `PromptTemplates.tsx`)
- Variable fill-in fields, live preview, and copy button
- "Works with" badges showing compatible tools

### 3. Update `src/App.tsx`
- Add route: `/skills` pointing to `SkillsLibrary`

### 4. Update `src/pages/Index.tsx`
- Add "AI Skills Library" as a third featured card on the homepage
- Update stats banner to include skill count
- Add to the tools grid as well

---

## Skill Content Details

Each skill will be a comprehensive system prompt (200-500 words) containing:
- Role definition ("You are a...")
- Specific instructions for the task
- Output format requirements
- Examples where helpful
- Variable placeholders for customization (product, ICP, industry, etc.)

For example, the **Hyper-Personalization Agent** skill for Clay would include instructions on how to use website keywords, online ratings, company mission summaries, job title duration, competitor mentions, and social presence analysis — pulling directly from the personalization frameworks already in the template library.

