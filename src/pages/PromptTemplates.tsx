import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Search } from "lucide-react";
import {
  templates,
  promptCategories,
  type PromptTemplate,
  type PromptCategory,
} from "@/data/promptTemplates";
import { PromptCard } from "@/components/prompt/PromptCard";
import { PromptDialog } from "@/components/prompt/PromptDialog";

const FAVORITES_KEY = "closerkit-prompt-favorites";
const LAST_VALUES_KEY = "closerkit-prompt-last-values";

const PromptTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "Favorites">("All");
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  // Favorites
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Last values
  const [lastValues, setLastValues] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(LAST_VALUES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const setValue = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
    const updated = { ...lastValues, [key]: value };
    setLastValues(updated);
    localStorage.setItem(LAST_VALUES_KEY, JSON.stringify(updated));
  };

  // Scroll to top on category change
  const handleCategoryChange = (cat: PromptCategory | "Favorites") => {
    setActiveCategory(cat);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Filtering
  const filtered = templates.filter((t) => {
    if (activeCategory === "Favorites") return favorites.has(t.id);
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

  const allCategories: (PromptCategory | "Favorites")[] = [
    ...promptCategories,
    ...(favorites.size > 0 ? ["Favorites" as const] : []),
  ];

  return (
    <ToolLayout
      title="AI Prompt Templates"
      description={`${templates.length} battle-tested prompts across the entire sales cycle. Customize and copy directly into your favorite AI tool.`}
      accentColor="bg-prospect"
    >
      {/* Search + Count */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search prompts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline">
          {filtered.length} prompt{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Category Pills - horizontal scroll on mobile */}
      <div className="flex gap-2 mb-5 md:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {cat}{" "}
            <span className="opacity-60">
              ({cat === "Favorites" ? favorites.size : categoryCounts[cat] ?? 0})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {filtered.map((template) => (
          <PromptCard
            key={template.id}
            template={template}
            isFavorite={favorites.has(template.id)}
            onToggleFavorite={toggleFavorite}
            onClick={() => setSelectedTemplate(template)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-12">
            {activeCategory === "Favorites"
              ? "No favorites yet — click the heart icon on any prompt to bookmark it."
              : `No prompts found matching "${search}"`}
          </p>
        )}
      </div>

      {/* Dialog */}
      <PromptDialog
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        values={selectedTemplate ? values[selectedTemplate.id] || {} : {}}
        onSetValue={(key, value) => selectedTemplate && setValue(selectedTemplate.id, key, value)}
        lastValues={lastValues}
      />
    </ToolLayout>
  );
};

export default PromptTemplates;
