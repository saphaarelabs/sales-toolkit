#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { generateCursorRules, generateClaudeMd, generateMarkdown } = require("../skills");

const args = process.argv.slice(2);
const command = args[0];

if (command !== "init") {
  console.log(`
  closerkit — AI Sales Skills for Your Project

  Usage:
    npx closerkit init              Auto-detect and install skills
    npx closerkit init --format <f> Force a specific format

  Formats:
    cursorrules    Write to .cursorrules
    claude         Write to CLAUDE.md
    markdown       Write to closerkit-skills.md
  `);
  process.exit(0);
}

// Parse --format flag
const formatIdx = args.indexOf("--format");
let format = null;
if (formatIdx !== -1 && args[formatIdx + 1]) {
  format = args[formatIdx + 1];
}

const cwd = process.cwd();

// Auto-detect if no format specified
if (!format) {
  if (fs.existsSync(path.join(cwd, ".cursorrules"))) {
    format = "cursorrules";
  } else if (fs.existsSync(path.join(cwd, "CLAUDE.md"))) {
    format = "claude";
  } else {
    format = "markdown";
  }
}

let content, filename;

switch (format) {
  case "cursorrules":
    content = generateCursorRules();
    filename = ".cursorrules";
    break;
  case "claude":
    content = generateClaudeMd();
    filename = "CLAUDE.md";
    break;
  case "markdown":
  default:
    content = generateMarkdown();
    filename = "closerkit-skills.md";
    break;
}

const filepath = path.join(cwd, filename);

// If file exists, append; otherwise create
if (fs.existsSync(filepath)) {
  const existing = fs.readFileSync(filepath, "utf-8");
  if (existing.includes("CloserKit")) {
    console.log(`\n  ⚠ ${filename} already contains CloserKit skills. Skipping.\n`);
    process.exit(0);
  }
  fs.appendFileSync(filepath, "\n\n" + content);
  console.log(`\n  ✅ Appended CloserKit skills to ${filename}\n`);
} else {
  fs.writeFileSync(filepath, content);
  console.log(`\n  ✅ Created ${filename} with 12 CloserKit AI sales skills\n`);
}

console.log(`  📁 ${filepath}`);
console.log(`  🤖 Skills: 5 coding agent + 7 sales agent`);
console.log(`  🔧 Compatible with: Cursor, Claude Code, Codex, ChatGPT, Clay & more\n`);
