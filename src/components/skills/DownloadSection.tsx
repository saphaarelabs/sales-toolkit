import { useState } from "react";
import { Copy, Check, Bot, Code2, Terminal, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { codingAgentSkills, allSkills, type Skill } from "@/data/skillTemplates";
import { useToast } from "@/hooks/use-toast";

const generateMarkdown = (skills: Skill[], format: "markdown" | "cursorrules" | "claude") => {
  const header = format === "cursorrules"
    ? "# .cursorrules — CloserKit Sales Skills\n\n"
    : format === "claude"
    ? "# CLAUDE.md — CloserKit Sales Skills\n\n"
    : "# CloserKit AI Skills Bundle\n\n";

  const sections = skills.map((skill) => {
    let prompt = skill.prompt;
    skill.variables.forEach((v) => {
      prompt = prompt.split(`{{${v.key}}}`).join(`[${v.label}]`);
    });
    return `## ${skill.title}\n\n${skill.description}\n\n**Compatible:** ${skill.compatibleTools.join(", ")}\n\n\`\`\`\n${prompt}\n\`\`\`\n`;
  });

  return header + sections.join("\n---\n\n");
};

const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const DownloadSection = () => {
  const [cmdCopied, setCmdCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCmdCopied(label);
    toast({ title: `${label} copied!`, description: "Paste it into your project." });
    setTimeout(() => setCmdCopied(null), 2000);
  };

  const handleDownload = (format: "cursorrules" | "claude" | "markdown") => {
    const config = {
      cursorrules: { skills: codingAgentSkills, filename: ".cursorrules", label: ".cursorrules" },
      claude: { skills: allSkills, filename: "CLAUDE.md", label: "CLAUDE.md" },
      markdown: { skills: allSkills, filename: "closerkit-skills.md", label: "Skills Bundle" },
    }[format];

    const content = generateMarkdown(config.skills, format);
    downloadFile(content, config.filename);
    toast({ title: `${config.label} downloaded!`, description: "Add it to your project root." });
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden mb-8">
      <div className="bg-muted/50 px-6 py-4 border-b">
        <div className="flex items-center gap-3">
          <Download className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-display font-semibold text-sm">Download Skills for Your Project</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Get all skills as a single file — works with Cursor, Claude Code, and more.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-5">
        {/* Download buttons */}
        <div className="flex flex-wrap gap-3">
          <Button className="gap-2 text-sm" onClick={() => handleDownload("cursorrules")}>
            <Download className="h-4 w-4" />
            Download .cursorrules
          </Button>
          <Button className="gap-2 text-sm" onClick={() => handleDownload("claude")}>
            <Download className="h-4 w-4" />
            Download CLAUDE.md
          </Button>
          <Button variant="outline" className="gap-2 text-sm" onClick={() => handleDownload("markdown")}>
            <Download className="h-4 w-4" />
            Download closerkit-skills.md
          </Button>
        </div>

        {/* Copy buttons (secondary) */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => copyToClipboard(generateMarkdown(allSkills, "markdown"), "All Skills (Markdown)")}
          >
            {cmdCopied === "All Skills (Markdown)" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {cmdCopied === "All Skills (Markdown)" ? "Copied!" : "Copy All as Markdown"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => copyToClipboard(generateMarkdown(codingAgentSkills, "cursorrules"), ".cursorrules")}
          >
            {cmdCopied === ".cursorrules" ? <Check className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
            {cmdCopied === ".cursorrules" ? "Copied!" : "Copy .cursorrules"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs"
            onClick={() => copyToClipboard(generateMarkdown(allSkills, "claude"), "CLAUDE.md")}
          >
            {cmdCopied === "CLAUDE.md" ? <Check className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
            {cmdCopied === "CLAUDE.md" ? "Copied!" : "Copy CLAUDE.md"}
          </Button>
        </div>

        {/* Terminal command (real, with note) */}
        <div className="border-t pt-4 space-y-2">
          <p className="text-xs text-muted-foreground">
            Or install via CLI <span className="text-muted-foreground/60">(requires publishing the closerkit npm package first)</span>
          </p>
          <div className="rounded-lg bg-[hsl(var(--foreground)/0.05)] border p-3 font-mono text-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground">$</span>{" "}
                <span className="text-foreground">npx closerkit init</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5 text-xs h-7"
                onClick={() => copyToClipboard("npx closerkit init", "Command")}
              >
                {cmdCopied === "Command" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
