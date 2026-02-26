

# CloserKit Expansion — 12 New Tools

Adding 12 new tools across 3 categories, bringing the total to 21 tools (9 existing + 12 new).

---

## New Category Colors
- **Pipeline & Forecasting** — Orange accent
- **LinkedIn & Social Selling** — Blue accent  
- **Proposal & Pricing** — Emerald accent

---

## Pipeline & Forecasting (4 tools)

### 1. Win Probability Calculator (`/win-probability`)
Input deal size, stage, champion status, competitor presence, and timeline. Outputs a weighted win probability score with recommendations to improve odds.

### 2. Pipeline Health Checker (`/pipeline-health`)
Enter deals across stages (prospecting, demo, proposal, negotiation, closed). See pipeline coverage ratio, stage conversion benchmarks, and risk flags like "too top-heavy" or "not enough early-stage."

### 3. Quota Attainment Tracker (`/quota-tracker`)
Input annual/quarterly quota and closed deals. Shows attainment %, required run rate, and pace projection. Visual progress bar with on-track/behind indicators.

### 4. Sales Velocity Calculator (`/sales-velocity`)
Input number of opportunities, average deal size, win rate, and sales cycle length. Calculates sales velocity (revenue per day) and shows what happens when you improve each lever by 10-20%.

---

## LinkedIn & Social Selling (4 tools)

### 5. LinkedIn Headline Generator (`/linkedin-headline`)
Input role, value prop, and target audience. Generates 5+ headline variations (authority-based, results-based, curiosity-based). Copy any with one click.

### 6. Connection Request Writer (`/connection-request`)
Pick a scenario (mutual connection, event attendee, content engagement, cold outreach). Fill in details, get 3 personalized request messages under the 300-char limit.

### 7. LinkedIn Post Generator (`/linkedin-post`)
Select a post type (story, insight, contrarian take, carousel outline). Input your topic and key points. Generates formatted posts with hooks, body, and CTA.

### 8. Social Selling Sequence Planner (`/social-sequence`)
Build a multi-touch social selling plan: Day 1 like post, Day 3 comment, Day 5 connect, Day 7 DM. Editable steps with suggested actions. Export the plan.

---

## Proposal & Pricing (4 tools)

### 9. Pricing Table Generator (`/pricing-table`)
Input up to 4 tiers with feature lists, pricing, and a highlighted "recommended" tier. Live preview of a clean pricing table. Copy as HTML.

### 10. Proposal Outline Builder (`/proposal-outline`)
Input client name, problem, solution, timeline, and pricing. Generates a structured proposal outline with sections. Copy or download as text.

### 11. SOW Generator (`/sow-generator`)
Fill in project scope, deliverables, timeline, assumptions, and terms. Generates a formatted Statement of Work document. Download as text file.

### 12. Battle Card Creator (`/battle-card`)
Input your product vs. a competitor. Fill in strengths, weaknesses, pricing comparison, and talk tracks. Generates a one-page battle card you can copy or download.

---

## Technical Approach

- **12 new page components** in `src/pages/`, each following the existing `ToolLayout` pattern (form left, output right, copy/export actions)
- **Update `src/pages/Index.tsx`** — add all 12 tools to the tools array with new category filters ("Pipeline", "LinkedIn", "Proposals")
- **Update `src/App.tsx`** — add 12 new routes
- **Update `tailwind.config.ts` and `src/index.css`** — add 3 new category color tokens (pipeline-orange, linkedin-blue, proposal-emerald)
- All tools remain 100% client-side with no external dependencies

