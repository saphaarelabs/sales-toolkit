import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Sparkles, Search } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  templates,
  promptCategories,
  categoryColors,
  type PromptTemplate,
  type PromptCategory,
} from "@/data/promptTemplates";

const PromptTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PromptCategory>("All");
  const [search, setSearch] = useState("");

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

  const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search prompts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="text-left rounded-lg border bg-card p-5 hover:bg-accent/30 hover:border-accent transition-all group"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-prospect mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-display font-semibold text-card-foreground group-hover:text-foreground text-sm">
                    {template.title}
                  </h3>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}
                  >
                    {template.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {template.description}
                </p>
              </div>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No prompts found matching "{search}"
          </p>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        {selectedTemplate && (
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap">
                <DialogTitle className="font-display">{selectedTemplate.title}</DialogTitle>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[selectedTemplate.category] || ""}`}
                >
                  {selectedTemplate.category}
                </span>
              </div>
              <DialogDescription>{selectedTemplate.description}</DialogDescription>
            </DialogHeader>

            {/* Variables */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {selectedTemplate.variables.map((v) => (
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
                      value={values[selectedTemplate.id]?.[v.key] || ""}
                      onChange={(e) =>
                        setValue(selectedTemplate.id, v.key, e.target.value)
                      }
                      rows={3}
                    />
                  ) : (
                    <Input
                      placeholder={v.placeholder}
                      value={values[selectedTemplate.id]?.[v.key] || ""}
                      onChange={(e) =>
                        setValue(selectedTemplate.id, v.key, e.target.value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Preview
              </label>
              <pre className="whitespace-pre-wrap text-sm bg-muted/50 border rounded-md p-4 text-foreground leading-relaxed max-h-64 overflow-y-auto font-sans">
                {buildPrompt(selectedTemplate)}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button onClick={() => copyPrompt(selectedTemplate)} className="gap-2">
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Prompt
                  </>
                )}
              </Button>
              {!allFilled(selectedTemplate) && (
                <p className="text-xs text-muted-foreground self-center">
                  Tip: Fill in all fields for a ready-to-use prompt
                </p>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </ToolLayout>
  );
};

export default PromptTemplates;
