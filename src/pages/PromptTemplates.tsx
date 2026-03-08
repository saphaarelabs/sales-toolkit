import { useState, useEffect, useRef } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Search } from "lucide-react";
import {
  templates,
  phaseCategories,
  macroStages,
  categoryColors,
  type PromptTemplate,
  type PromptCategory,
  type MacroStage,
} from "@/data/promptTemplates";
import { PromptCard } from "@/components/prompt/PromptCard";
import { PromptDialog } from "@/components/prompt/PromptDialog";

const FAVORITES_KEY = "closerkit-prompt-favorites";
const LAST_VALUES_KEY = "closerkit-prompt-last-values";

type FilterMode = "All" | "Favorites" | MacroStage;

const PromptTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [activeFilter, setActiveFilter] = useState<FilterMode>("All");
  const [activePhase, setActivePhase] = useState<PromptCategory | null>(null);
  const [search, setSearch] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

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

  const [lastValues, setLastValues] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(LAST_VALUES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  });

  const setValue = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({ ...prev, [templateId]: { ...prev[templateId], [key]: value } }));
    const updated = { ...lastValues, [key]: value };
    setLastValues(updated);
    localStorage.setItem(LAST_VALUES_KEY, JSON.stringify(updated));
  };

  const handleFilterChange = (filter: FilterMode) => {
    setActiveFilter(filter);
    setActivePhase(null);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeMacro = macroStages.find((s) => s.label === activeFilter);
  const phaseOptions: PromptCategory[] = activeMacro ? activeMacro.categories : [];

  const filtered = templates.filter((t) => {
    if (activeFilter === "Favorites") return favorites.has(t.id);
    const matchesMacro = activeFilter === "All" || (activeMacro && activeMacro.categories.includes(t.category));
    const matchesPhase = !activePhase || t.category === activePhase;
    const matchesSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    return matchesMacro && matchesPhase && matchesSearch;
  });

  const macroFilters: FilterMode[] = ["All", ...macroStages.map((s) => s.label as MacroStage), ...(favorites.size > 0 ? ["Favorites" as const] : [])];

  return (
    <ToolLayout
      title="The Sales AI Bible"
      description={`${templates.length} battle-tested AI prompts across the complete 20-phase sales cycle. The only prompt library salespeople need.`}
      accentColor="bg-prospect"
    >
      {/* Search */}
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

      {/* Macro Tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
        {macroFilters.map((filter) => {
          const macro = macroStages.find((s) => s.label === filter);
          const count = filter === "All"
            ? templates.length
            : filter === "Favorites"
            ? favorites.size
            : templates.filter((t) => macro!.categories.includes(t.category)).length;
          return (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Phase Pills (when macro selected) */}
      {phaseOptions.length > 0 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
          <button
            onClick={() => setActivePhase(null)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 border ${
              !activePhase ? "bg-accent text-accent-foreground border-accent" : "bg-background text-muted-foreground border-border hover:border-accent"
            }`}
          >
            All {activeMacro?.label}
          </button>
          {phaseOptions.map((phase) => {
            const count = templates.filter((t) => t.category === phase).length;
            const idx = phaseCategories.indexOf(phase) + 1;
            return (
              <button
                key={phase}
                onClick={() => setActivePhase(phase)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 border ${
                  activePhase === phase
                    ? `${categoryColors[phase] || "bg-accent text-accent-foreground border-accent"}`
                    : "bg-background text-muted-foreground border-border hover:border-accent"
                }`}
              >
                {idx}. {phase} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      )}

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
            {activeFilter === "Favorites"
              ? "No favorites yet — click the heart icon on any prompt to bookmark it."
              : `No prompts found matching "${search}"`}
          </p>
        )}
      </div>

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
