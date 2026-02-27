import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  templates,
  promptCategories,
  categoryColors,
  type PromptTemplate,
  type PromptCategory,
} from "@/data/promptTemplates";

const PromptTemplates = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PromptCategory>("All");

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  const setValue = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
  };

  const buildPrompt = (template: PromptTemplate) => {
    let result = template.prompt;
    template.variables.forEach((v) => {
      const val = values[template.id]?.[v.key] || `[${v.key}]`;
      result = result.split(`[${v.key}]`).join(val);
    });
    return result;
  };

  const copyPrompt = (template: PromptTemplate) => {
    navigator.clipboard.writeText(buildPrompt(template));
    setCopiedId(template.id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allFilled = (template: PromptTemplate) =>
    template.variables.every((v) => values[template.id]?.[v.key]?.trim());

  const filtered = activeCategory === "All"
    ? templates
    : templates.filter((t) => t.category === activeCategory);

  const categoryCounts = promptCategories.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? templates.length : templates.filter((t) => t.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <ToolLayout
      title="AI Prompt Templates"
      description={`${templates.length} battle-tested prompts across the entire sales cycle. Customize, copy, and paste into ChatGPT, Claude, or any AI tool.`}
      accentColor="bg-prospect"
    >
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {promptCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat} <span className="opacity-60">({categoryCounts[cat]})</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((template) => {
          const isOpen = expandedId === template.id;
          return (
            <div
              key={template.id}
              className="rounded-lg border bg-card overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(template.id)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <Sparkles className="h-5 w-5 text-prospect mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-semibold text-card-foreground">
                      {template.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}
                    >
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                )}
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="border-t px-5 pb-5">
                  {/* Variables */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-5">
                    {template.variables.map((v) => (
                      <div
                        key={v.key}
                        className={v.type === "long" ? "sm:col-span-2" : ""}
                      >
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          {v.label}
                        </label>
                        {v.type === "long" ? (
                          <Textarea
                            placeholder={v.placeholder}
                            value={values[template.id]?.[v.key] || ""}
                            onChange={(e) =>
                              setValue(template.id, v.key, e.target.value)
                            }
                            rows={3}
                          />
                        ) : (
                          <Input
                            placeholder={v.placeholder}
                            value={values[template.id]?.[v.key] || ""}
                            onChange={(e) =>
                              setValue(template.id, v.key, e.target.value)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="mt-5">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Preview
                    </label>
                    <pre className="whitespace-pre-wrap text-sm bg-muted/50 border rounded-md p-4 text-foreground leading-relaxed max-h-64 overflow-y-auto font-sans">
                      {buildPrompt(template)}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <Button onClick={() => copyPrompt(template)} className="gap-2">
                      {copiedId === template.id ? (
                        <>
                          <Check className="h-4 w-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy Prompt
                        </>
                      )}
                    </Button>
                    {!allFilled(template) && (
                      <p className="text-xs text-muted-foreground self-center">
                        Tip: Fill in all fields for a ready-to-use prompt
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
};

export default PromptTemplates;
