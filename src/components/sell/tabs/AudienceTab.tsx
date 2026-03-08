import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SalesKitResult } from "../types";

export default function AudienceTab({ data }: { data: SalesKitResult }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data.audience.map((persona, i) => (
        <Card key={i}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{persona.personaName}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {persona.ageRange} · {persona.gender} · {persona.incomeLevel} · {persona.location}
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Pain Points</p>
              <div className="flex flex-wrap gap-1">
                {persona.painPoints.map((p, j) => (
                  <Badge key={j} variant="destructive" className="text-[10px]">{p}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">Buying Triggers</p>
              <div className="flex flex-wrap gap-1">
                {persona.buyingTriggers.map((t, j) => (
                  <Badge key={j} className="bg-green-500/10 text-green-700 border-green-500/20 text-[10px]">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="text-xs space-y-1 pt-2 border-t">
              <p><strong>Best time:</strong> {persona.bestTimeToReach}</p>
              <p><strong>How to target:</strong> {persona.howToTargetThem}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
