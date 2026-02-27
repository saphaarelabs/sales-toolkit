import { useState } from "react";
import { Copy, Check, Bot, Code2, Terminal, FileText, ChevronDown, ChevronUp } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { codingAgentSkills, salesAgentSkills, allSkills, type Skill } from "@/data/skillTemplates";
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

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [selected, setSelected] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const buildPrompt = () => {
    let result = skill.prompt;
    skill.variables.forEach((v) => {
      const val = values[v.key] || v.placeholder;
      result = result.split(`{{${v.key}}}`).join(val);
    });
    return result;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPrompt());
    setCopied(true);
    toast({ title: "Skill copied!", description: "Paste it into your AI tool." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setSelected(true)}
        className="text-left rounded-lg border bg-card p-5 hover:bg-accent/30 hover:border-accent transition-all group"
      >
        <h3 className="font-semibold text-sm">{skill.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skill.compatibleTools.map((tool) => (
            <Badge key={tool} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tool}
            </Badge>
          ))}
        </div>
      </button>

      <Dialog open={selected} onOpenChange={(open) => !open && setSelected(false)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{skill.title}</DialogTitle>
            <DialogDescription>{skill.description}</DialogDescription>
          </DialogHeader>

          {skill.variables.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customize Variables
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {skill.variables.map((v) => (
                  <div key={v.key}>
                    <label className="text-xs font-medium text-foreground mb-1 block">{v.label}</label>
                    <Input
                      placeholder={v.placeholder}
                      value={values[v.key] || ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [v.key]: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preview
            </h4>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap bg-muted/50 border rounded-lg p-4 max-h-80 overflow-y-auto font-mono text-foreground">
              {buildPrompt()}
            </pre>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCopy} className="gap-1.5">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Skill"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SkillsLibrary = () => {
  const [cmdCopied, setCmdCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCmdCopied(label);
    toast({ title: `${label} copied!`, description: "Paste it into your project." });
    setTimeout(() => setCmdCopied(null), 2000);
  };

  return (
    <ToolLayout
      title="AI Skills Library"
      description="Copy-paste skills that turn any AI into your sales co-pilot. Works with Claude, ChatGPT, Clay, Codex, and more."
      accentColor="bg-primary"
    >
      {/* CLI Install Section */}
      <div className="rounded-xl border bg-card overflow-hidden mb-8">
        <div className="bg-muted/50 px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-display font-semibold text-sm">Install All Skills in Your Terminal</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Get all skills as a single file in your project — works with Cursor, Claude Code, and more.</p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {/* Terminal command */}
          <div className="rounded-lg bg-[hsl(var(--foreground)/0.05)] border p-4 font-mono text-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-muted-foreground">$</span>{" "}
                <span className="text-foreground">npx closerkit init</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => copyToClipboard("npx closerkit init", "Command")}
              >
                {cmdCopied === "Command" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {cmdCopied === "Command" ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>

          {/* Export buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="gap-2 text-sm"
              onClick={() => copyToClipboard(generateMarkdown(allSkills, "markdown"), "All Skills (Markdown)")}
            >
              <FileText className="h-4 w-4" />
              {cmdCopied === "All Skills (Markdown)" ? "Copied!" : "Copy All as Markdown"}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-sm"
              onClick={() => copyToClipboard(generateMarkdown(codingAgentSkills, "cursorrules"), ".cursorrules")}
            >
              <Code2 className="h-4 w-4" />
              {cmdCopied === ".cursorrules" ? "Copied!" : "Copy as .cursorrules"}
            </Button>
            <Button
              variant="outline"
              className="gap-2 text-sm"
              onClick={() => copyToClipboard(generateMarkdown(allSkills, "claude"), "CLAUDE.md")}
            >
              <Bot className="h-4 w-4" />
              {cmdCopied === "CLAUDE.md" ? "Copied!" : "Copy as CLAUDE.md"}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="coding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="coding" className="gap-2">
            <Code2 className="h-4 w-4" />
            For Coding Agents
          </TabsTrigger>
          <TabsTrigger value="sales" className="gap-2">
            <Bot className="h-4 w-4" />
            For Sales Agents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="coding" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Paste these into Claude Code, Codex, Cursor, or Antigravity to instantly build sales tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {codingAgentSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Paste these into Clay, ChatGPT, Claude, or any AI SDR platform to get a specialized sales agent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {salesAgentSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default SkillsLibrary;
