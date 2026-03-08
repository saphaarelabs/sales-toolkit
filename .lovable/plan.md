

# The Sales AI Bible: 20-Phase Prompt Templates Expansion

## Vision
Transform the current 41 prompts / 6 categories into **200+ prompts across 20 phases** covering the entire B2B sales lifecycle — making this THE definitive resource salespeople bookmark and return to daily.

## Current State
- 41 prompts across 6 categories: Prospecting (7), Email & Outreach (6), Meeting & Discovery (4), Proposals & Closing (5+), Account Management, Sales Leadership
- Flat category pills UI — works fine for 6, but 20 categories need a different navigation approach

## The 20 Phases

```text
PHASE                          NEW PROMPTS   EXISTING (reused)
─────────────────────────────────────────────────────────────
 1. Market Research & ICP         8           3 (competitor-research, icp-refinement, trigger-events)
 2. Lead Generation & Lists       8           0
 3. Account Research              8           1 (account-research)
 4. First Touch & Cold Outreach  10           3 (cold-email-scratch, linkedin-outreach, breakup-email)
 5. Follow-Up & Nurture           8           2 (reengagement-campaign, referral-request)
 6. Social Selling & LinkedIn     8           0
 7. Discovery & Qualification    10           2 (discovery-questions, deal-review)
 8. Demo & Presentation           8           1 (demo-script)
 9. Multi-Threading & Champions   8           2 (multi-thread, champion-enablement)
10. Objection Handling             8           0
11. Proposal & Business Case     10           3 (proposal-draft, business-case, mutual-action-plan)
12. Negotiation & Pricing         8           1 (negotiation-prep)
13. Closing & Contracts           8           0
14. Onboarding & Handoff          8           0
15. Account Management & Growth  10           ~5 (existing AM prompts)
16. Renewal & Retention           8           0
17. Upsell & Cross-Sell           8           0
18. Sales Leadership & Coaching  10           ~5 (existing leadership prompts)
19. RevOps & Forecasting          8           0
20. Personal Branding & Thought Leadership  8  0
─────────────────────────────────────────────────────────────
TOTAL                          ~170 new      ~28 reused = ~200 prompts
```

## UI Changes

### Navigation Overhaul
The current horizontal pill bar won't work for 20 categories. New approach:

1. **Phase groups** — Group the 20 phases into 4 macro stages displayed as tabs:
   - **Find** (Phases 1-3): Research, lead gen, account intel
   - **Engage** (Phases 4-6): Outreach, follow-up, social selling
   - **Sell** (Phases 7-13): Discovery through closing
   - **Grow** (Phases 14-20): Post-sale, expansion, leadership

2. Within each tab, show phase pills (5 each) — much more manageable than 20 flat pills.

3. Keep "All" and "Favorites" as top-level filters alongside the 4 macro tabs.

4. Update the hero description: *"200+ battle-tested AI prompts across the complete 20-phase sales cycle. The only prompt library salespeople need."*

### AI Tool Optimization Badges
Add a new field to each template: `optimizedFor: string[]` (e.g., `["Claude", "ChatGPT", "Cursor"]`). Display these as small badges on each card so users know which AI tool will give the best results.

## File Changes

| File | Action | Details |
|------|--------|---------|
| `src/data/promptTemplates.ts` | Major expansion | Add ~170 new templates, update categories to 20 phases, add `optimizedFor` field |
| `src/pages/PromptTemplates.tsx` | Refactor navigation | Replace flat pills with grouped tabs + phase pills |
| `src/components/prompt/PromptCard.tsx` | Add AI tool badges | Show "Optimized for Claude / GPT / Cursor" on each card |
| `src/components/prompt/PromptDialog.tsx` | Show optimization badges | Display which AI tools the prompt is tuned for |
| `src/data/promptTemplates.ts` (types) | Update interfaces | Add `phase: number`, `optimizedFor: string[]`, update `PromptCategory` type |

## Implementation Approach

Due to the massive size (~170 new prompts), this will be split across multiple steps:
1. Update types, categories, UI navigation (tabs + phase groups)
2. Add prompts for Phases 1-7 (research through discovery)
3. Add prompts for Phases 8-13 (demo through closing)
4. Add prompts for Phases 14-20 (post-sale, leadership, RevOps)
5. Add `optimizedFor` badges to cards and dialog

Each prompt will be written as a genuine, production-quality sales prompt with real frameworks (MEDDIC, SPIN, Challenger, BANT, etc.) — not filler content.

