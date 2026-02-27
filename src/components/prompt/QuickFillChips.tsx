import { QUICK_FILLS } from "@/data/promptTemplates";

const KEY_TO_QUICKFILLS: Record<string, string[]> = {
  INDUSTRY: QUICK_FILLS.industry,
  ROLE: QUICK_FILLS.role,
  PROSPECT_ROLE: QUICK_FILLS.role,
  TARGET_ROLE: QUICK_FILLS.role,
  COMPANY_TYPE: QUICK_FILLS.companySize,
  COMPANY_SIZE: QUICK_FILLS.companySize,
  DEAL_SIZE: QUICK_FILLS.dealSize,
  TIMELINE: QUICK_FILLS.timeframe,
  TIMEFRAME: QUICK_FILLS.timeframe,
  PAIN_POINT: QUICK_FILLS.painPoint,
  MAIN_CHALLENGE: QUICK_FILLS.painPoint,
  COMPETITION: QUICK_FILLS.competitor,
  COMPETITOR: QUICK_FILLS.competitor,
  CURRENT_SOLUTION: QUICK_FILLS.competitor,
};

export function getQuickFills(variable: { key: string; quickFills?: string[] }): string[] {
  return variable.quickFills || KEY_TO_QUICKFILLS[variable.key] || [];
}

interface QuickFillChipsProps {
  fills: string[];
  onSelect: (value: string) => void;
}

export function QuickFillChips({ fills, onSelect }: QuickFillChipsProps) {
  if (fills.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {fills.map((fill) => (
        <button
          key={fill}
          type="button"
          onClick={() => onSelect(fill)}
          className="px-2 py-0.5 text-[11px] rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors border border-border/50"
        >
          {fill}
        </button>
      ))}
    </div>
  );
}
