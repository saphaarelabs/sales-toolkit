

# Make AI Prompt Templates the Best Sales Resource on the Internet

## Overview

Expand the AI Prompt Templates from **6 prompts to 25+**, reorganized into clear categories covering the entire sales cycle. Add a category filter system, and include new Proposal/Closing prompts as requested.

---

## New Prompt Categories and Templates

### Prospecting (existing + new)
| # | Prompt | Status |
|---|--------|--------|
| 1 | Competitor Research & White Space Finder | Exists |
| 2 | Discovery Call Question Generator | Exists |
| 3 | Deal Strategy Advisor | Exists |
| 4 | **Account Research Brief** — Deep-dive a target account: org chart, tech stack, recent news, strategic priorities, best entry point | NEW |
| 5 | **ICP Refinement & Scoring** — Analyze your closed-won deals to identify patterns and refine your ICP definition | NEW |
| 6 | **Trigger Event Spotter** — Given a company, find recent trigger events (hiring, funding, product launches, leadership changes) and craft timely outreach angles | NEW |

### Email & Outreach (existing + new)
| # | Prompt | Status |
|---|--------|--------|
| 7 | LinkedIn Outreach Messages | Exists |
| 8 | Breakup Email Sequence | Exists |
| 9 | **Cold Email from Scratch** — Given product + ICP + prospect info, generate 3 cold email variations using different frameworks (problem-agitate-solve, before-after-bridge, AIDA) | NEW |
| 10 | **Re-engagement Campaign** — Craft a sequence for dead leads/closed-lost deals that resurfaces value without desperation | NEW |
| 11 | **Referral Request Email** — Generate warm referral ask emails for champions, existing customers, and mutual connections | NEW |
| 12 | **Event/Webinar Follow-Up** — Personalized follow-ups referencing specific event content, booth conversations, or webinar attendance | NEW |

### Meeting & Discovery (NEW category)
| # | Prompt | Status |
|---|--------|--------|
| 13 | **Meeting Agenda Builder** — Create a structured agenda with time allocations, discovery questions, and next-step proposals | NEW |
| 14 | **Demo Script Generator** — Build a tailored demo flow based on prospect's pain points, with talk tracks and objection responses at each stage | NEW |
| 15 | **Post-Meeting Summary & Next Steps** — Turn raw call notes into a polished recap email with action items, timeline, and stakeholder assignments | NEW |
| 16 | **Multi-Thread Strategy** — Identify all stakeholders needed for a deal and generate personalized outreach for each persona (champion, economic buyer, technical evaluator, blocker) | NEW |

### Proposals & Closing (NEW category - user requested)
| # | Prompt | Status |
|---|--------|--------|
| 17 | Proposal / Executive Summary Writer | Exists (moved here) |
| 18 | **Mutual Action Plan Generator** — Create a shared close plan with milestones, owners, dates, and risk flags for complex enterprise deals | NEW |
| 19 | **Business Case Builder** — Generate a CFO-ready business case with ROI analysis, cost of inaction, implementation timeline, and risk mitigation | NEW |
| 20 | **Negotiation Prep & Concession Strategy** — Analyze the deal and generate a negotiation playbook: BATNA, concession ladder, non-monetary trades, and walk-away triggers | NEW |
| 21 | **Champion Enablement Kit** — Create internal selling materials your champion can use: one-pager, executive email draft, FAQ for skeptics, and ROI summary | NEW |
| 22 | **Contract Redline Response** — Given common legal/procurement pushback, generate professional responses that protect your position while keeping the deal moving | NEW |
| 23 | **Closed-Lost Win-Back** — Analyze why a deal was lost and generate a re-engagement strategy timed to their renewal/contract end date | NEW |

### Account Management (NEW category)
| # | Prompt | Status |
|---|--------|--------|
| 24 | **QBR Prep & Presentation** — Generate a Quarterly Business Review structure with usage data analysis, ROI recap, expansion opportunities, and risk assessment | NEW |
| 25 | **Expansion/Upsell Pitch** — Craft an upsell or cross-sell pitch based on current usage, new use cases, and stakeholder mapping | NEW |
| 26 | **Churn Risk Analysis** — Analyze account health signals and generate a save strategy with re-engagement talk tracks | NEW |

---

## UI Improvements

### Category Tabs
Add a horizontal tab/pill filter at the top of the page:
- **All** | **Prospecting** | **Email & Outreach** | **Meeting & Discovery** | **Proposals & Closing** | **Account Management**
- Same pill-style filter used on the homepage

### Better Category Badges
Each category gets a distinct color:
- Prospecting: blue
- Email & Outreach: green  
- Meeting & Discovery: amber
- Proposals & Closing: purple
- Account Management: rose

### Prompt Count in Page Description
Update subtitle: "26 battle-tested prompts across the entire sales cycle..."

---

## Technical Changes

### File: `src/pages/PromptTemplates.tsx`
- Add 20 new prompt objects to the `templates` array, each with comprehensive prompt text (150-400 words), relevant variables, and proper categorization
- Add category filter state and filtering logic (same pattern as Index.tsx category pills)
- Update `categoryColors` with new categories
- Update page description to reflect new count
- Reorganize existing prompts: move "Proposal Writer" to "Proposals & Closing" category

### File: `src/pages/Index.tsx`
- Update the AI Prompt Templates featured card stats from "6 AI prompts" to "26 AI prompts"

### No new files or dependencies needed.

---

## Prompt Quality Standards

Every new prompt will follow these principles to be genuinely world-class:

1. **Specific role framing** — "Act as a [specific expert]" not generic "Help me with..."
2. **Structured output** — Every prompt specifies exact output format (sections, tables, bullet structures)
3. **Anti-generic guardrails** — Instructions like "Never give generic advice", "Be specific to THIS company", "No filler language"
4. **Actionable output** — Every prompt produces something the rep can immediately use (an email, a document, a strategy)
5. **Expert methodology** — Each prompt embeds proven sales frameworks (MEDDIC, SPIN, Challenger, etc.) rather than asking AI to wing it
6. **Variable-driven personalization** — All prompts use fill-in variables so output is customized, not cookie-cutter

