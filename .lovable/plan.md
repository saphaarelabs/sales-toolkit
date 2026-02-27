

# Update AI Tool Deep-Link URLs

## Problem
The current deep-link URLs are being blocked or not working reliably. Need to use the best-known URL patterns for each tool.

## Changes

### File: `src/components/prompt/AIToolIcons.tsx` (line 25-29)

Update the `baseUrl` values:

| Tool | Current | Updated |
|------|---------|---------|
| ChatGPT | `https://chatgpt.com/?q=` | `https://chat.openai.com/?q=` |
| Claude | `https://claude.ai/new?q=` | Keep as-is (this is the best known pattern) |
| Gemini | `https://gemini.google.com/app?text=` | Keep as-is (this is the documented pattern) |
| Perplexity | `https://www.perplexity.ai/?q=` | Keep as-is (this works) |

### File: `src/components/prompt/PromptDialog.tsx`

Add a small disclaimer tooltip or subtle note near the AI tool buttons: "Best effort -- some tools may require you to paste the prompt manually." This sets user expectations since these URLs are undocumented and can break.

Also add a **fallback behavior**: when a user clicks an AI tool button, automatically copy the prompt to clipboard first, then open the link. This way even if the URL doesn't pre-fill, the user just needs to paste. Show a toast: "Prompt copied! Pasting into {tool name}..."

### Technical detail
- Change ChatGPT URL from `chatgpt.com` to `chat.openai.com` which is the more commonly referenced domain for query parameters
- Add `navigator.clipboard.writeText()` call inside an `onClick` handler on each `<a>` tag so the prompt is always on clipboard as backup
- Add a small muted text below the action bar: "Prompt is auto-copied when you click any tool"

