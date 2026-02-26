

# Homepage Simplification + Email Template Library

## What's Changing

### 1. Homepage Redesign — Simpler, Search-First
The current homepage has a large hero section with a GitHub button taking prime space. We'll redesign it to be search-first and ultra-clean:

- **Compact header**: CloserKit logo on the left, minimal tagline, search bar prominently centered at the top
- **Remove GitHub button** from hero — move it to a small icon in the footer only
- **Search with suggestions**: As you type, show matching tools in a dropdown. When the search is empty, show popular/suggested tools
- **Category pills** stay but move directly below the search bar
- **Tighter card grid** with cleaner card design — icon + name + short description, no heavy borders
- **Tool count badge** on each category pill (e.g., "Email & Outreach (4)")

### 2. New Tool: Email Template Library
A single new tool page at `/email-templates` that organizes ALL uploaded templates into a browsable, searchable library with 9 categories:

| Category | Templates | Source File |
|---|---|---|
| Cold Outreach | 7 templates (new prospect, warm leads, follow-up, new market, events, referrals, decision-makers) | outreach_templates |
| Follow-Up Emails | 5 templates (after contact, proposal, meeting, event, webinar) | follow_up_email_templates |
| Pitching | 6 templates (initial pitch, follow-up pitch, proposal, new idea, meeting request, custom solution) | pitching_templates |
| Value Propositions | 7 templates (new service, product launch, promo, USP, case studies, insights, partnership) | value_proposition_templates |
| Response Handling | 2 templates (asking for details, price question + referral redirect) | response |
| Objection Handling | 7 templates (not interested, already using service, send info, pricing, scheduling, no budget, contact later) | objection_handling |
| Unique Scenarios | 7 templates (hiring outreach, re-engage old leads, webinar invite, holiday greetings, referral ask, reminders, company news) | unique_scenarios |
| Offer-Specific | 11 templates (paid ads, SaaS, pay-per-call, retainer, email marketing, funnels, social media, lead gen, SEO, web design, content marketing, consulting) | specific_offer_templates |
| Nurturing Sequences | 1 five-email sequence example | 10_email_sequences |

**How it works:**
- Category tabs at the top to filter
- Each template shows as a card with title, subject line preview, and an "expand" button
- Expanded view shows the full email with `{{placeholders}}` highlighted
- Users fill in placeholder values (FirstName, Company, etc.) in a simple form
- Live preview updates as they type
- One-click copy button
- All templates use the `{{variable}}` placeholder format from the uploaded files

### 3. Update Homepage Categories
Add "Templates" as a new category on the homepage. The Email Template Library tool card goes here alongside the existing AI Prompt Templates (moved from Prospecting).

Updated categories: All | Calculators | Email & Outreach | Prospecting | Templates | Pipeline | LinkedIn | Proposals | Docs

---

## Technical Details

### Files to Create
- `src/pages/EmailTemplateLibrary.tsx` — New page component with all 50+ email templates organized by category, with variable replacement and copy-to-clipboard

### Files to Modify
- `src/pages/Index.tsx` — Redesigned homepage: compact hero, search-first layout with suggestion dropdown, updated categories, cleaner cards
- `src/App.tsx` — Add `/email-templates` route
- `src/components/ToolLayout.tsx` — Minor cleanup if needed

### Template Data Structure
Each template will follow this pattern:
```text
{
  id: string
  title: string
  subject: string
  body: string (with {{placeholders}})
  category: string
  variables: { key: string, label: string, placeholder: string }[]
}
```

### Search Suggestions
When the search input is focused and empty, show a small dropdown with 4-5 suggested/popular tools. When typing, show filtered matches in the same dropdown (max 5 results) with direct links. Clicking a suggestion navigates to that tool.

