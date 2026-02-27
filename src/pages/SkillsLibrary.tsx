import { useState } from "react";
import { Copy, Check, Bot, Code2, Terminal, FileText, Download } from "lucide-react";
import ToolLayout from "@/components/ToolLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { codingAgentSkills, salesAgentSkills, allSkills, type Skill } from "@/data/skillTemplates";
import { useToast } from "@/hooks/use-toast";
import SkillCard from "@/components/skills/SkillCard";
import DownloadSection from "@/components/skills/DownloadSection";

const SkillsLibrary = () => {
  return (
    <ToolLayout
      title="AI Skills Library"
      description="Copy-paste skills that turn any AI into your sales co-pilot. Works with Claude, ChatGPT, Clay, Codex, and more."
      accentColor="bg-primary"
    >
      <DownloadSection />

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
