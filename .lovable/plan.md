

# CloserKit Redesign — Value-First Homepage + New Expert Frameworks

## Overview

Restructure the entire homepage to lead with the most valuable content and add 15+ new expert email frameworks from the uploaded files. The goal: a salesperson lands on this page and immediately sees massive value.

---

## 1. New Templates: "Expert Frameworks" Category

Add a new category to the Email Template Library with templates from top sales experts:

| Template | Source | Emails |
|---|---|---|
| Ask Before Pitch | Will Allred | 1 |
| Insight Validation Framework | Leslie Venetz | 1 (framework) |
| PWJ Pattern Interrupt | Patrick William Joyce | 1 |
| Pain Point + Case Study Sequence | Alan Ruchtein | 2 |
| Follow-Up: Meme, Bullet Points, Reference | Eric Nowoslawski | 3 |
| Lead Magnet Approach | Alan Ruchtein | 2 (template + example) |
| Selling Software to Sales | Christian Krause | 1 + example |
| Trigger > Quick Pitch > Calculation > CTA | Thibaut Souyris | 1 + example |
| Trigger > Agitation > Social Proof > CTA | Alan Ruchtein | 1 |
| Feedback Only | Jed Mahrle | 2 |

Total: ~15 new templates, bringing the library to 165+.

Each template will include the expert's name as attribution in the title or description.

---

## 2. Homepage Redesign — Value-First Layout

The current homepage is a flat grid of tool cards. The new layout puts the best stuff front and center:

```text
+--------------------------------------------------+
|  CloserKit                          [Search bar]  |
|  The free sales toolkit. 165+ templates,          |
|  22 tools, zero sign-ups.                         |
+--------------------------------------------------+
|                                                    |
|  -- FEATURED (big hero cards) --                   |
|  [Email Template Library]  [AI Prompt Templates]   |
|   165+ templates            6 AI-ready prompts     |
|   13 categories             Paste into ChatGPT     |
|                                                    |
+--------------------------------------------------+
|                                                    |
|  -- ALL TOOLS --                                   |
|  [Category pills: All | Calculators | ...]         |
|  [Grid of remaining tool cards]                    |
|                                                    |
+--------------------------------------------------+
|  Footer: CloserKit · Free & open-source · GitHub   |
+--------------------------------------------------+
```

Key differences from current design:
- **Stats banner** in the header: "165+ email templates, 22 tools, 6 AI prompts"
- **Two featured cards** at top — Email Template Library and AI Prompt Templates — displayed as large, eye-catching cards with stats and descriptions (not mixed into the grid)
- **Remaining tools** appear in the grid below with category filters
- Search bar stays in header but gets a cleaner, more prominent placement

---

## 3. Technical Changes

### Files to modify:

**`src/data/externalTemplates.ts`** — Add a new `expertFrameworkTemplates` array with ~15 templates from the uploaded files, each with proper `{{variable}}` placeholders and attribution to the original author.

**`src/pages/EmailTemplateLibrary.tsx`** — Import and merge the new `expertFrameworkTemplates`. Update the template count in the description.

**`src/pages/Index.tsx`** — Full redesign:
- Add a stats row in the header (template count, tool count, prompt count)
- Add a "Featured" section with two large cards for Email Template Library and AI Prompt Templates
- Move the remaining 20 tools into the grid below
- Update tool count and description for the email template library entry
- Clean up spacing, typography, and card styles for a premium feel

### No new files needed. No new routes. No new dependencies.

---

## 4. UX Details

- Featured cards will have a subtle gradient background and larger text to draw attention
- Stats in the header will use bold numbers with labels (e.g., "165+ Templates" / "22 Tools")
- Category pills get slightly more spacing and a cleaner active state
- Tool cards in the grid remain compact but with better hover states
- Mobile: featured cards stack vertically, search remains full-width

