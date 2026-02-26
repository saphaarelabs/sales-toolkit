import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp, Bot, Code2 } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { codingAgentSkills, salesAgentSkills, type Skill } from "@/data/skillTemplates";
import { useToast } from "@/hooks/use-toast";

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [expanded, setExpanded] = useState(false);
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

  const allFilled = skill.variables.every((v) => values[v.key]?.trim());

  return (
    <Card className="overflow-hidden">
      <div
        className="flex items-start gap-4 p-5 cursor-pointer hover:bg-accent/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{skill.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skill.compatibleTools.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-[10px] px-1.5 py-0">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy Skill"}
          </Button>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </div>

      {expanded && (
        <CardContent className="border-t pt-5 space-y-4">
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
            <Button onClick={handleCopy} className="gap-1.5" disabled={false}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : allFilled ? "Copy Customized Skill" : "Copy Skill (with defaults)"}
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const SkillsLibrary = () => {
  return (
    <ToolLayout
      title="AI Skills Library"
      description="Copy-paste skills that turn any AI into your sales co-pilot. Works with Claude, ChatGPT, Clay, Codex, and more."
      accentColor="bg-primary"
    >
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
          {codingAgentSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </TabsContent>

        <TabsContent value="sales" className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Paste these into Clay, ChatGPT, Claude, or any AI SDR platform to get a specialized sales agent.
          </p>
          {salesAgentSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
};

export default SkillsLibrary;
