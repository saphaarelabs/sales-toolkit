# closerkit

Install CloserKit AI sales skills into your project. Works with Cursor, Claude Code, Codex, and more.

## Usage

```bash
npx closerkit init
```

This detects your project setup and writes the appropriate file:

| File detected     | Output           |
|-------------------|------------------|
| `.cursorrules`    | Appends skills to `.cursorrules` |
| `CLAUDE.md`       | Appends skills to `CLAUDE.md` |
| Neither           | Creates `closerkit-skills.md` |

## Options

```bash
npx closerkit init --format cursorrules   # Force .cursorrules output
npx closerkit init --format claude        # Force CLAUDE.md output
npx closerkit init --format markdown      # Force markdown output
```

## What's included

12 AI skills across two categories:

**Coding Agent Skills (5):** Cold Outreach System Builder, Sales Dashboard Generator, CRM Data Enrichment Script, Lead Scoring Model, Outbound Sequence Automator

**Sales Agent Skills (7):** Hyper-Personalization Agent, ICP Research Agent, Objection Handling Agent, Follow-Up Strategist, Meeting Prep Agent, LinkedIn DM Writer, Competitor Battle Card Agent

## License

MIT
