

# "Describe & Sell" — SellAnything AI Feature

## Overview
A new `/generate` page with an input form, a dedicated edge function that returns structured JSON via tool calling, and a 7-tab results dashboard with per-section copy + export options.

## Architecture

```text
User Input → Edge Function (tool calling, structured JSON) → Parse → 7-Tab Dashboard
```

## New Files

| File | Purpose |
|------|---------|
| `src/pages/SellAnything.tsx` | Main page: input form + results dashboard container |
| `src/components/sell/InputSection.tsx` | Textarea, toggle rows (Product/Service/Both, B2C/B2B/Both), gold button, 6 example chips |
| `src/components/sell/ResultsDashboard.tsx` | 7-tab layout rendering parsed JSON |
| `src/components/sell/tabs/OverviewTab.tsx` | Hook, category, USPs, read-aloud button |
| `src/components/sell/tabs/AudienceTab.tsx` | Persona cards with pain points / buying triggers |
| `src/components/sell/tabs/PitchTab.tsx` | Emotional/Logical/Urgency pitches, SMS, WhatsApp |
| `src/components/sell/tabs/B2BTab.tsx` | Prospect data, cold email sequence, LinkedIn messages, cold call script |
| `src/components/sell/tabs/B2CTab.tsx` | Digital platforms, email templates, marketplaces, offline channels |
| `src/components/sell/tabs/KeywordsTab.tsx` | Keywords tables, meta tags, blog/YouTube titles |
| `src/components/sell/tabs/ObjectionsTab.tsx` | Objection cards, custom objection input |
| `src/components/sell/ExportBar.tsx` | Copy, PDF download, CSV export, .txt export buttons |
| `src/components/sell/types.ts` | TypeScript interfaces for the structured JSON response |
| `supabase/functions/sell-anything/index.ts` | Edge function using Lovable AI with tool calling to return structured JSON |

## Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Add `/generate` route |
| `src/components/AppSidebar.tsx` | Add "SellAnything AI" to AI-Powered group |
| `src/pages/Index.tsx` | Add hero card for SellAnything AI |

## Edge Function Design

Uses **tool calling** (not streaming) to get structured JSON back from `google/gemini-2.5-flash`. The system prompt is the sales strategist prompt from the spec. A single tool `generate_sales_kit` is defined with the full JSON schema matching all the fields specified (hook, category, audience, pitches, b2b, b2c, keywords, objections). The function parses the tool call result and returns clean JSON.

Non-streaming because we need complete structured output. A loading state with progress indicators will be shown (~15-30s generation time).

## Input Section
- Large textarea with the specified placeholder
- Toggle group row 1: Product / Service / Both
- Toggle group row 2: B2C / B2B / Both — Auto Detect  
- Gold gradient "Analyze & Generate Full Sales Kit" button
- 6 example chips: "Old movie CDs", "Legal consulting", "Handmade candles", "SaaS software", "Real estate", "Online coaching"

## Results Dashboard (7 Tabs)
Each tab renders the corresponding section of the JSON response. Every text block gets a copy button. Tabs conditionally show/hide B2B and B2C based on the `marketType` field.

## Export Options
- Per-section copy buttons throughout
- "Download Full Sales Kit as PDF" using browser print-to-PDF
- "Download B2B Prospect List as CSV" (generates CSV from b2b data)
- "Download Email Templates as .txt"

## Visual Design
- Gold accent (`#D4A843`) for the generate button and result highlights
- Loading state: animated progress bar with stage labels ("Analyzing market...", "Building pitches...", "Finding prospects...")
- Tab badges showing content count per section

