import { useState } from "react";
import { Copy, Check, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
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
import { categoryColors, type PromptTemplate } from "@/data/promptTemplates";
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
  const [expanded, setExpanded] = useState(false);

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

  const useLastValues = () => {
    template.variables.forEach((v) => {
      if (lastValues[v.key] && !values[v.key]) {
        onSetValue(v.key, lastValues[v.key]);
      }
    });
    toast.success("Filled with your last used values!");
  };

  const hasLastValues = template.variables.some((v) => lastValues[v.key] && !values[v.key]);
  const isLongPrompt = builtPrompt.length > 600;

  return (
    <Dialog open={!!template} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] sm:max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] sm:max-h-[90vh]">
          {/* Left Panel — Variables */}
          <div className="md:w-[45%] p-4 md:p-6 overflow-y-auto border-b md:border-b-0 md:border-r border-border max-h-[45vh] md:max-h-none">
            <DialogHeader>
            <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="font-display text-base md:text-lg">{template.title}</DialogTitle>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}>
                  {template.category}
                </span>
              </div>
              <DialogDescription className="text-xs md:text-sm">{template.description}</DialogDescription>
              {template.optimizedFor && template.optimizedFor.length > 0 && (
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-muted-foreground">Optimized for:</span>
                  {template.optimizedFor.map((tool) => (
                    <span key={tool} className="text-[10px] px-1.5 py-0.5 rounded-full border bg-muted/50 text-muted-foreground">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
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
                    <label className="text-xs md:text-sm font-medium text-foreground mb-1 block">{v.label}</label>
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

          {/* Right Panel — Copy + Preview */}
          <div className="md:w-[55%] flex flex-col p-4 md:p-6 overflow-hidden">
            {/* Copy Button — Prominent */}
            <Button
              onClick={copyPrompt}
              size="lg"
              className="w-full gap-2 mb-3 md:mb-4 text-sm md:text-base font-semibold shadow-sm"
            >
              {copiedId === template.id ? (
                <><Check className="h-4 w-4" /> Copied!</>
              ) : (
                <><Copy className="h-4 w-4" /> Copy Prompt</>
              )}
            </Button>

            {/* Character count + model badges */}
            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
              <span className="text-[11px] md:text-xs text-muted-foreground">{charCount.toLocaleString()} chars</span>
              {modelBadges.map((b) => (
                <span key={b.label} className={`text-[10px] px-1.5 md:px-2 py-0.5 rounded-full border ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>

            {/* Live Preview */}
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <label className="text-xs md:text-sm font-medium text-foreground mb-1.5 block">Live Preview</label>
              <div className="relative flex-1 min-h-0">
                <pre
                  className={`whitespace-pre-wrap text-xs md:text-sm bg-muted/50 border rounded-md p-3 md:p-4 text-foreground leading-relaxed font-sans overflow-y-auto ${
                    !expanded && isLongPrompt ? "max-h-[180px] md:max-h-[280px]" : "max-h-[40vh] md:max-h-[50vh]"
                  }`}
                >
                  {builtPrompt}
                </pre>
                {isLongPrompt && !expanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 md:h-16 bg-gradient-to-t from-background/90 to-transparent rounded-b-md pointer-events-none" />
                )}
              </div>
              {isLongPrompt && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="mt-1 gap-1 text-xs text-muted-foreground self-center"
                >
                  {expanded ? <><ChevronUp className="h-3 w-3" /> Show less</> : <><ChevronDown className="h-3 w-3" /> Show full preview</>}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
