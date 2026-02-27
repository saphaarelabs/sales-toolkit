import { Sparkles, Heart } from "lucide-react";
import { categoryColors, type PromptTemplate } from "@/data/promptTemplates";

interface PromptCardProps {
  template: PromptTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

function getComplexityLabel(count: number) {
  if (count <= 2) return { text: `${count} vars · ~30s`, color: "text-green-600 bg-green-500/10 border-green-500/20" };
  if (count <= 4) return { text: `${count} vars · ~1 min`, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" };
  return { text: `${count} vars · ~2 min`, color: "text-orange-600 bg-orange-500/10 border-orange-500/20" };
}

export function PromptCard({ template, isFavorite, onToggleFavorite, onClick }: PromptCardProps) {
  const complexity = getComplexityLabel(template.variables.length);

  return (
    <div
      className="relative text-left rounded-lg border bg-card p-5 hover:bg-accent/30 hover:border-accent transition-all group cursor-pointer"
      onClick={onClick}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(template.id); }}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-accent transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <Sparkles className="h-5 w-5 text-prospect mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-display font-semibold text-card-foreground group-hover:text-foreground text-sm">
              {template.title}
            </h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}>
              {template.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{template.description}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${complexity.color}`}>
            {complexity.text}
          </span>
        </div>
      </div>
    </div>
  );
}
