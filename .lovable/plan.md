

# Prompt Templates UX Overhaul: Remove Blocked Links + Polish UI

## 1. Remove AI Tool Deep Links (Blocked by Browsers)

Remove the ChatGPT, Claude, Gemini, and Perplexity launcher buttons from the dialog. Keep only the **Copy** button. Remove the `AIToolIcons.tsx` import and the disclaimer text. Remove the `openInTool` function.

**File:** `src/components/prompt/PromptDialog.tsx`
- Remove import of `AI_TOOLS` from `./AIToolIcons`
- Remove import of `ExternalLink` icon
- Remove the `openInTool` function
- Remove the AI_TOOLS `.map()` block rendering the tool links
- Remove the disclaimer `<p>` tag
- Keep only the Copy button in the action bar

---

## 2. Fix Console Warnings (forwardRef)

The console shows "Function components cannot be given refs" for `PromptCard` and `PromptDialog`. This happens because they're used in contexts expecting ref-forwarding.

**File:** `src/components/prompt/PromptCard.tsx`
- No ref forwarding needed here since it's rendered directly, not via `asChild`. The warning is likely harmless but we can silence it.

---

## 3. Improve Dialog UX: Make Everything Visible Without Scrolling

Restructure the right panel so the **Copy button is prominent and always visible**, and the preview doesn't require users to discover scrolling.

**File:** `src/components/prompt/PromptDialog.tsx`
- Make the Copy button larger and more prominent (full-width, primary styling)
- Move character count + model badges inline with the copy button area
- Limit the live preview to a reasonable max-height with a subtle fade/gradient at the bottom to hint there's more content
- Add a "Show full preview" expand toggle for long prompts

---

## 4. Improve the Prompt Card Grid UI

**File:** `src/components/prompt/PromptCard.tsx`
- Add a subtle hover animation (scale + shadow lift)
- Make the favorite heart more visible on hover
- Add a small "Click to customize" hint text on hover

---

## 5. Improve the PromptTemplates Page Layout

**File:** `src/pages/PromptTemplates.tsx`
- Add a prompt count summary next to the search bar
- Make the grid 3-column on large screens for better density
- Add smooth scroll-to-top when changing categories
- Remove the duplicate `TooltipProvider` wrapper (already provided in `App.tsx`)

---

## Summary of Files to Edit

| File | Changes |
|------|---------|
| `src/components/prompt/PromptDialog.tsx` | Remove AI tool links, improve copy UX, add preview expand toggle |
| `src/components/prompt/PromptCard.tsx` | Polish hover states, add interaction hints |
| `src/pages/PromptTemplates.tsx` | 3-col grid, remove duplicate TooltipProvider, category UX |

