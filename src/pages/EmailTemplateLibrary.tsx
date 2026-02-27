import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Copy, Check, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { EmailTemplate, TemplateVariable } from "@/data/emailTemplateTypes";
import { hunterTemplates, saleshandyTemplates, lemlistTemplates, klentyTemplates, expertFrameworkTemplates, linkedinDmTemplates, personalizationTemplates } from "@/data/externalTemplates";

const commonVars: TemplateVariable[] = [
  { key: "FirstName", label: "First Name", placeholder: "John" },
  { key: "Company", label: "Company", placeholder: "Acme Inc" },
  { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
];

// Combine all templates into one array for filtering and display
const allTemplates: EmailTemplate[] = [
  ...hunterTemplates,
  ...saleshandyTemplates,
  ...lemlistTemplates,
  ...klentyTemplates,
  ...expertFrameworkTemplates,
  ...linkedinDmTemplates,
  ...personalizationTemplates,
];

// Extract unique categories from all templates
const categories = [
  "All",
  ...Array.from(new Set(allTemplates.map((t) => t.category))).sort(),
];

const categoryColors: Record<string, string> = {
  "Cold Email": "border-blue-500 text-blue-500",
  "Follow-up": "border-green-500 text-green-500",
  "LinkedIn": "border-purple-500 text-purple-500",
  "Personalization": "border-pink-500 text-pink-500",
  "Sales Enablement": "border-yellow-500 text-yellow-500",
  "All": "border-gray-300 text-gray-700",
};

const EmailTemplateLibrary = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const setValue = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
  };

  const buildEmail = (template: EmailTemplate) => {
    let result = template.body;
    // Replace variables in the template body with user input or placeholders
    template.variables.forEach((v) => {
      const val = values[template.id]?.[v.key] || v.placeholder || `[${v.key}]`;
      result = result.split(`{{${v.key}}}`).join(val);
    });
    return result;
  };

  const copyEmail = (template: EmailTemplate) => {
    navigator.clipboard.writeText(buildEmail(template));
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allFilled = (template: EmailTemplate) =>
    template.variables.every((v) => values[template.id]?.[v.key]?.trim());

  const filtered = allTemplates.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ToolLayout
      title="Email Template Library"
      description="Browse and customize proven email templates for sales outreach, follow-ups, LinkedIn, and more."
      accentColor="bg-primary"
    >
      {/* Search Bar */}
      <div className="relative max-w-sm mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search templates…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="text-left rounded-lg border bg-card p-5 hover:bg-accent/30 hover:border-accent transition-all group"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-card-foreground text-sm group-hover:text-foreground">
                  {template.title}
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}
                >
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{template.subject}</p>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            No templates found matching "{search}"
          </p>
        )}
      </div>

      {/* Dialog for Selected Template */}
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
              <DialogDescription>Subject: {selectedTemplate.subject}</DialogDescription>
            </DialogHeader>

            {/* Variables */}
            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              {selectedTemplate.variables.map((v) => (
                <div key={v.key}>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">{v.label}</label>
                  <input
                    type="text"
                    placeholder={v.placeholder}
                    value={values[selectedTemplate.id]?.[v.key] || ""}
                    onChange={(e) => setValue(selectedTemplate.id, v.key, e.target.value)}
                    className="w-full h-9 px-3 rounded-md border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="mt-2">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Preview</label>
              <pre className="whitespace-pre-wrap text-sm bg-muted/50 border rounded-md p-4 text-foreground leading-relaxed max-h-64 overflow-y-auto font-sans">
                {buildEmail(selectedTemplate)}
              </pre>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <Button onClick={() => copyEmail(selectedTemplate)} className="gap-2">
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="h-4 w-4" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy Email
                  </>
                )}
              </Button>
              {!allFilled(selectedTemplate) && (
                <p className="text-xs text-muted-foreground self-center">
                  Tip: Fill in all fields for a ready-to-use email
                </p>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </ToolLayout>
  );
};

export default EmailTemplateLibrary;
