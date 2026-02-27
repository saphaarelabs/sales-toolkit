

# AI Prompt Templates UX Overhaul

## Overview

Redesign the prompt template dialog for a seamless, no-scroll experience with one-click AI tool launchers and 5 innovative UX features.

---

## Problem 1: Dialog requires scrolling to see preview/copy

### Solution: Split-panel dialog layout

Restructure the dialog into a **two-column layout** on desktop:
- **Left column**: Variable inputs (compact, stacked)
- **Right column**: Live preview + action buttons (always visible)

On mobile, stack vertically but put **action buttons at the top** (sticky) so copy/launch is always visible.

The preview section gets a **max-height with scroll** while the action bar stays pinned. This means users never need to scroll to find the copy button.

---

## Problem 2: No way to open prompts directly in AI tools

### Solution: "Open in..." buttons with deep links

Add 4 icon buttons next to the Copy button that open the built prompt directly in each AI tool's web interface:

| Tool | Icon | Deep Link |
|------|------|-----------|
| ChatGPT | OpenAI logo SVG | `https://chatgpt.com/?q={encodedPrompt}` |
| Claude | Claude logo SVG | `https://claude.ai/new?q={encodedPrompt}` |
| Gemini | Gemini logo SVG | `https://gemini.google.com/app?text={encodedPrompt}` |
| Perplexity | Perplexity logo SVG | `https://www.perplexity.ai/?q={encodedPrompt}` |

Each button URL-encodes the fully built prompt and opens in a new tab. Simple SVG icons for each brand, with tooltips showing the tool name.

---

## 5 Innovative UX Features

### Feature 1: Quick-Fill Suggestions
When a variable input is focused, show **smart placeholder chips** below it that users can click to auto-fill. For example, for "Industry" show chips like "SaaS", "FinTech", "Healthcare", "Manufacturing". This makes filling variables a one-click action instead of typing.

### Feature 2: Prompt Difficulty/Time Badge
Each card in the grid shows a small badge indicating complexity: "2 variables -- 30 sec" or "5 variables -- 2 min". This sets expectations and encourages users to try simpler prompts first.

### Feature 3: "Use Last Values" Button
A small button in the dialog that auto-fills variables with the last values the user entered across any template. Sales reps typically sell the same product to similar prospects -- this saves massive re-typing.

### Feature 4: Favorite/Bookmark Prompts
A heart/star icon on each card to bookmark favorites. Stored in localStorage. A "Favorites" filter pill appears in the category bar when any prompts are bookmarked, giving quick access to most-used prompts.

### Feature 5: Prompt Character Count + AI Model Compatibility
Show a live character/token count in the preview section with color-coded badges: "Fits GPT-4" (green), "Fits Claude" (green), "May be long for some models" (amber). This helps users know if their prompt will work before they paste it.

---

## Technical Changes

### File: `src/pages/PromptTemplates.tsx`
- Redesign `DialogContent` to use a two-column flex layout (`flex flex-col md:flex-row`)
- Left panel: variables with quick-fill chips
- Right panel: sticky action bar (Open in ChatGPT/Claude/Gemini/Perplexity + Copy) + scrollable preview
- Add favorites state backed by localStorage
- Add "Favorites" category pill (conditional)
- Add "Use Last Values" button
- Add character count + model compatibility badges
- Add complexity badge to grid cards

### File: `src/data/promptTemplates.ts`
- Add `quickFills` optional field to `PromptVariable` interface for suggested values
- Add quick-fill data to common variable types (industry, role, company size, etc.)

### No new dependencies needed.

