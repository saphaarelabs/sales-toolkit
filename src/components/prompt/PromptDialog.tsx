import { useState } from "react";
import { Copy, Check, RotateCcw, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { categoryColors, type PromptTemplate } from "@/data/promptTemplates";
import { AI_TOOLS } from "./AIToolIcons";
import { QuickFillChips, getQuickFills } from "./QuickFillChips";

interface PromptDialogProps {
  template: PromptTemplate | null;
  onClose: () => void;
  values: Record<string, string>;
  onSetValue: (key: string, value: string) => void;
  lastValues: Record<string, string>;
}

function getModelBadges(charCount: number) {
  const badges = [];
  if (charCount < 12000) {
    badges.push({ label: "Fits GPT-4", color: "bg-green-500/10 text-green-600 border-green-500/20" });
    badges.push({ label: "Fits Claude", color: "bg-green-500/10 text-green-600 border-green-500/20" });
  } else if (charCount < 30000) {
    badges.push({ label: "Fits GPT-4", color: "bg-green-500/10 text-green-600 border-green-500/20" });
    badges.push({ label: "Fits Claude", color: "bg-green-500/10 text-green-600 border-green-500/20" });
    badges.push({ label: "May be long for Gemini", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" });
  } else {
    badges.push({ label: "Long prompt", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" });
  }
  return badges;
}

export function PromptDialog({ template, onClose, values, onSetValue, lastValues }: PromptDialogProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [focusedVar, setFocusedVar] = useState<string | null>(null);

  if (!template) return null;

  const buildPrompt = () => {
    let result = template.prompt;
    template.variables.forEach((v) => {
      const val = values[v.key] || `[${v.key}]`;
      result = result.split(`[${v.key}]`).join(val);
    });
    return result;
  };

  const builtPrompt = buildPrompt();
  const charCount = builtPrompt.length;
  const modelBadges = getModelBadges(charCount);

  const copyPrompt = () => {
    navigator.clipboard.writeText(builtPrompt);
    setCopiedId(template.id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openInTool = (baseUrl: string) => {
    window.open(`${baseUrl}${encodeURIComponent(builtPrompt)}`, "_blank");
  };

  const useLastValues = () => {
    template.variables.forEach((v) => {
      if (lastValues[v.key] && !values[v.key]) {
        onSetValue(v.key, lastValues[v.key]);
      }
    });
    toast.success("Filled with your last used values!");
  };

  const hasLastValues = template.variables.some((v) => lastValues[v.key] && !values[v.key]);

  return (
    <Dialog open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Left Panel — Variables */}
          <div className="md:w-[45%] p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-border">
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="font-display">{template.title}</DialogTitle>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}>
                  {template.category}
                </span>
              </div>
              <DialogDescription>{template.description}</DialogDescription>
            </DialogHeader>

            {hasLastValues && (
              <Button variant="outline" size="sm" onClick={useLastValues} className="mt-3 gap-1.5 text-xs w-full">
                <RotateCcw className="h-3 w-3" /> Use Last Values
              </Button>
            )}

            <div className="grid gap-3 mt-4">
              {template.variables.map((v) => {
                const fills = getQuickFills(v);
                return (
                  <div key={v.key}>
                    <label className="text-sm font-medium text-foreground mb-1 block">{v.label}</label>
                    {v.type === "long" ? (
                      <Textarea
                        placeholder={v.placeholder}
                        value={values[v.key] || ""}
                        onChange={(e) => onSetValue(v.key, e.target.value)}
                        onFocus={() => setFocusedVar(v.key)}
                        onBlur={() => setTimeout(() => setFocusedVar(null), 150)}
                        rows={2}
                        className="text-sm"
                      />
                    ) : (
                      <Input
                        placeholder={v.placeholder}
                        value={values[v.key] || ""}
                        onChange={(e) => onSetValue(v.key, e.target.value)}
                        onFocus={() => setFocusedVar(v.key)}
                        onBlur={() => setTimeout(() => setFocusedVar(null), 150)}
                        className="h-9 text-sm"
                      />
                    )}
                    {focusedVar === v.key && (
                      <QuickFillChips fills={fills} onSelect={(val) => onSetValue(v.key, val)} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel — Actions + Preview */}
          <div className="md:w-[55%] flex flex-col p-6 overflow-hidden">
            {/* Sticky Action Bar */}
            <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border mb-4">
              <Button onClick={copyPrompt} size="sm" className="gap-1.5">
                {copiedId === template.id ? (
                  <><Check className="h-3.5 w-3.5" /> Copied!</>
                ) : (
                  <><Copy className="h-3.5 w-3.5" /> Copy</>
                )}
              </Button>
              {AI_TOOLS.map((tool) => (
                <Tooltip key={tool.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={`${tool.baseUrl}${encodeURIComponent(builtPrompt)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        navigator.clipboard.writeText(builtPrompt);
                        toast.success(`Prompt copied! Opening ${tool.name}...`);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 text-xs rounded-md border border-input bg-background px-3 h-8 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <tool.icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{tool.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open in {tool.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">Prompt is auto-copied when you click any tool. Some tools may require you to paste manually.</p>

            {/* Character count + model badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground">{charCount.toLocaleString()} chars</span>
              {modelBadges.map((b) => (
                <span key={b.label} className={`text-[10px] px-2 py-0.5 rounded-full border ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Live Preview */}
            <div className="flex-1 overflow-y-auto">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Live Preview</label>
              <pre className="whitespace-pre-wrap text-sm bg-muted/50 border rounded-md p-4 text-foreground leading-relaxed font-sans">
                {builtPrompt}
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
