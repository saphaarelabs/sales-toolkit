import { Sparkles, Mail, TrendingUp, Search } from "lucide-react";
import type { Mode } from "./types";
import { modes } from "./types";

const iconMap = { Sparkles, Mail, TrendingUp, Search };

interface ModeCardsProps {
  onSelect: (mode: Mode, prompt: string) => void;
}

const ModeCards = ({ onSelect }: ModeCardsProps) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
    <div className="text-center mb-10 animate-fade-in">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-4">
        <Sparkles className="h-3 w-3" />
        AI-Powered Sales Intelligence
      </div>
      <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
        What can I help you close?
      </h1>
      <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm">
        Choose a mode to get started, or just start typing below.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      {modes.map((m, i) => {
        const Icon = iconMap[m.icon as keyof typeof iconMap];
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id, m.placeholder)}
            className="group relative text-left p-5 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "backwards" }}
          >
            {/* Gradient accent on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{m.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
              <p className="text-[11px] text-muted-foreground/50 mt-3 line-clamp-2 italic">
                "{m.placeholder.slice(0, 80)}…"
              </p>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export default ModeCards;
