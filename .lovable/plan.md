

# Real Install Flow: Download Buttons + npm Package Source

## Part 1: Replace Fake Terminal with Real Download Buttons

**File: `src/pages/SkillsLibrary.tsx`**

Replace the `npx closerkit init` terminal block with a "Download Skills" section that has real, working download buttons:

- **Download .cursorrules** -- generates and downloads a `.cursorrules` file containing all coding agent skills
- **Download CLAUDE.md** -- generates and downloads a `CLAUDE.md` file containing all skills
- **Download closerkit-skills.md** -- generates and downloads a full markdown bundle

Each button uses `Blob` + `URL.createObjectURL` + a hidden `<a>` element to trigger a real browser file download. Keep the existing "Copy" buttons as secondary actions.

The section header changes from "Install All Skills in Your Terminal" to "Download Skills for Your Project" with a `Download` icon instead of `Terminal`.

## Part 2: Create Real npm CLI Package Source

Create the following files in a `cli/` directory at the project root. You would then publish this to npm with `cd cli && npm publish`.

**`cli/package.json`**
- Package name: `closerkit`
- `bin.closerkit` pointing to `./bin/cli.js`
- Minimal dependencies (just `fs` and `path`, built-in)

**`cli/bin/cli.js`**
- Entry point for `npx closerkit init`
- Detects project type (looks for `.cursorrules`, `CLAUDE.md`, or defaults to markdown)
- Writes the skills file to the current directory
- Prints a success message with what was created

**`cli/README.md`**
- Usage instructions for the npm package
- Documents `npx closerkit init` command

**`cli/skills.js`**
- Contains all 12 skills as a JS data structure (mirrored from `src/data/skillTemplates.ts`)
- Export functions: `generateCursorRules()`, `generateClaudeMd()`, `generateMarkdown()`

## Part 3: Update Terminal Display

Keep a terminal-style display but now show the **real** working command with a note: "Requires the closerkit npm package to be published". Also add a prominent "Or download directly" section above it pointing to the download buttons.

## Files to Create/Edit

| File | Action |
|------|--------|
| `src/pages/SkillsLibrary.tsx` | Replace fake terminal with download buttons |
| `cli/package.json` | New -- npm package manifest |
| `cli/bin/cli.js` | New -- CLI entry point |
| `cli/skills.js` | New -- skills data + generators |
| `cli/README.md` | New -- package docs |

