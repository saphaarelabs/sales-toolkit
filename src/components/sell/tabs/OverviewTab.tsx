import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CopyButton from "../CopyButton";
import type { SalesKitResult } from "../types";

export default function OverviewTab({ data }: { data: SalesKitResult }) {
  const readAloud = () => {
    const utterance = new SpeechSynthesisUtterance(data.hook);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Hook */}
      <div className="p-6 rounded-xl border-2 border-[hsl(43,60%,55%)]/30 bg-[hsl(43,60%,55%)]/5">
        <p className="text-xl md:text-2xl font-bold font-display text-[hsl(43,60%,45%)]">"{data.hook}"</p>
        <div className="flex gap-2 mt-3">
          <CopyButton text={data.hook} />
          <Button variant="ghost" size="sm" onClick={readAloud} className="h-7 px-2 text-xs gap-1">
            <Volume2 className="h-3 w-3" /> Read Aloud
          </Button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{data.category}</Badge>
        <Badge variant="outline">{data.marketType}</Badge>
      </div>

      {/* USPs */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Unique Selling Points</h3>
        <ul className="space-y-2">
          {data.usp.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-[hsl(43,60%,55%)] font-bold mt-0.5">✦</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
