

# Massive Upgrade: AI Prompt Templates, Grid Layouts, and Installable CLI Package

## Overview

Three major improvements:

1. **Add 15+ more AI Prompt Templates** covering gaps like sales hiring, competitive displacement, pricing strategy, partner enablement, and more -- bringing the total to 40+
2. **Switch to grid layouts** for both AI Prompt Templates and Email Template Library so users can scan more content at a glance
3. **Add search to AI Prompt Templates** page
4. **Create an installable CLI concept** -- an `npx closerkit` command section with copy-pasteable terminal install instructions and a generated `.md` skills file

---

## Part 1: New AI Prompt Templates (15 new prompts)

Adding these to fill gaps across the sales cycle:

### Prospecting (3 new)
| Prompt | What It Does |
|--------|-------------|
| **LinkedIn Profile Optimizer** | Rewrites your LinkedIn profile to attract inbound leads |
| **Territory Planning Playbook** | Creates a territory strategy with account tiering and coverage model |
| **Competitive Displacement Campaign** | Builds a campaign to unseat an incumbent competitor at a target account |

### Email & Outreach (3 new)
| Prompt | What It Does |
|--------|-------------|
| **Subject Line A/B Generator** | Generates 10 subject line variants with framework labels and predicted open rates |
| **Video Prospecting Script** | Creates a 60-second video script for Loom/Vidyard outreach |
| **Executive Outreach Email** | C-suite specific messaging -- short, strategic, no fluff |

### Meeting & Discovery (2 new)
| Prompt | What It Does |
|--------|-------------|
| **Technical Discovery Questions** | Deep technical qualification for SE-led conversations |
| **Stakeholder Map Builder** | Maps the buying committee with influence levels, motivations, and engagement strategies |

### Proposals & Closing (3 new)
| Prompt | What It Does |
|--------|-------------|
| **Pricing Strategy Advisor** | Analyzes competitive positioning and recommends pricing/packaging approach |
| **Executive Sponsor Email** | Draft email from your exec sponsor to their exec sponsor for late-stage deals |
| **Procurement Navigation Guide** | Step-by-step guide for navigating procurement processes |

### Account Management (2 new)
| Prompt | What It Does |
|--------|-------------|
| **Customer Success Handoff** | Creates a structured handoff document from AE to CSM |
| **Case Study Interview Script** | Generates interview questions to extract a compelling customer story |

### New Category: Sales Leadership (2 new)
| Prompt | What It Does |
|--------|-------------|
| **Sales Hiring Scorecard** | Creates an interview scorecard for hiring AEs, SDRs, or SEs |
| **Pipeline Review Framework** | Structured framework for running effective pipeline review meetings |

---

## Part 2: Grid Layout for Both Pages

### AI Prompt Templates (`PromptTemplates.tsx`)
- Change from `space-y-4` single column to a **2-column grid** on desktop (`grid grid-cols-1 md:grid-cols-2 gap-4`)
- Each card shows: title, category badge, description, and a "Use Prompt" button
- Clicking a card opens it in a **dialog/modal** (instead of inline expand) so the grid isn't disrupted
- The modal contains: variable inputs, preview, and copy button

### Email Template Library (`EmailTemplateLibrary.tsx`)
- Same approach: **2-column grid** layout (`grid grid-cols-1 md:grid-cols-2 gap-3`)
- Cards show: category, title, subject line preview
- Expand into modal for variable fill-in and copy

### AI Skills Library (`SkillsLibrary.tsx`)
- Convert skill cards to **2-column grid** as well for consistency

---

## Part 3: Search Bar for AI Prompt Templates

- Add a search input at the top (same pattern as Email Template Library)
- Filters by title, description, and category
- Works alongside the existing category pill filters

---

## Part 4: Installable CLI / Terminal Install Section

Since this is a client-side app (no npm package backend), we create a **"Quick Install" section** on the Skills Library page that gives users a one-command way to get all skills as markdown files:

### Approach: `npx` download script concept + copy-paste `.md` bundle

Add a prominent section at the top of the Skills Library page:

```text
+--------------------------------------------------+
| Install All Skills in Your Terminal               |
|                                                    |
| npx closerkit-skills init                          |
| [Copy Command]                                     |
|                                                    |
| Or download all skills as a single .md file:       |
| [Copy All Skills as Markdown]                      |
+--------------------------------------------------+
```

- **"Copy All Skills as Markdown"** button: generates a single markdown document containing ALL skills (coding + sales) formatted as a `.cursorrules` or `AGENTS.md` file, copies to clipboard
- **Terminal command display**: shows `npx closerkit-skills init` with a styled terminal UI -- this is aspirational/branding (the actual npm package would be a future project)
- **"Copy as .cursorrules"** button: formats all coding agent skills into Cursor's `.cursorrules` format
- **"Copy as CLAUDE.md"** button: formats skills for Claude Code's `CLAUDE.md` convention

---

## Technical Changes

### Files to modify:
1. **`src/data/promptTemplates.ts`** -- Add 15 new prompt template objects with full prompt text, variables, and categories. Add "Sales Leadership" to `promptCategories` and `categoryColors`.

2. **`src/pages/PromptTemplates.tsx`** -- Add search bar, switch to 2-column grid layout, use Dialog component for expanded view instead of inline accordion.

3. **`src/pages/EmailTemplateLibrary.tsx`** -- Switch template cards to 2-column grid layout, use Dialog for expanded view.

4. **`src/pages/SkillsLibrary.tsx`** -- Add "Install" section at top with copy-all-as-markdown and terminal command display. Switch skill cards to 2-column grid.

5. **`src/pages/Index.tsx`** -- Update prompt count from "26" to "42" in stats and featured cards.

### No new dependencies needed -- uses existing Dialog component from shadcn/ui.

