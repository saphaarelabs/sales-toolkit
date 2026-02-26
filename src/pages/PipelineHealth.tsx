import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stageNames = ["Prospecting", "Demo", "Proposal", "Negotiation", "Closed Won"] as const;
const benchmarks = [100, 60, 40, 25, 15]; // typical conversion rates %

const PipelineHealth = () => {
  const [quota, setQuota] = useState("");
  const [stages, setStages] = useState<Record<string, string>>({
    Prospecting: "", Demo: "", Proposal: "", Negotiation: "", "Closed Won": "",
  });

  const update = (name: string, val: string) => setStages((p) => ({ ...p, [name]: val }));

  const counts = stageNames.map((s) => parseFloat(stages[s]) || 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const q = parseFloat(quota) || 0;
  const coverage = q > 0 ? (total / q) : 0;
  const hasData = total > 0;

  const flags: string[] = [];
  if (coverage > 0 && coverage < 3) flags.push("Pipeline coverage below 3x — high risk of missing quota");
  if (counts[0] > 0 && counts[0] / total > 0.6) flags.push("Too top-heavy — most deals are in early stage");
  if (counts[0] === 0 && total > 0) flags.push("No prospecting deals — pipeline will dry up next quarter");
  if (counts[3] > counts[2] && counts[3] > 0) flags.push("More deals in negotiation than proposal — possible bottleneck");
  if (flags.length === 0 && hasData) flags.push("Pipeline looks balanced — keep building top of funnel");

  return (
    <ToolLayout title="Pipeline Health Checker" description="Assess pipeline coverage, stage balance, and risk flags." accentColor="bg-pipeline">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Quarterly Quota ($)</Label>
            <Input type="number" placeholder="500000" value={quota} onChange={(e) => setQuota(e.target.value)} />
          </div>
          <p className="text-sm font-medium text-muted-foreground pt-2">Deal values by stage ($)</p>
          {stageNames.map((name) => (
            <div key={name}>
              <Label>{name}</Label>
              <Input type="number" placeholder="0" value={stages[name]} onChange={(e) => update(name, e.target.value)} />
            </div>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>Health Report</CardTitle></CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Total Pipeline</span><span className="font-medium">${total.toLocaleString()}</span></div>
                  {q > 0 && <div className="flex justify-between"><span>Coverage Ratio</span><span className={`font-bold ${coverage >= 3 ? "text-green-600" : "text-destructive"}`}>{coverage.toFixed(1)}x</span></div>}
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Stage Breakdown</h4>
                  <div className="space-y-2">
                    {stageNames.map((name, i) => {
                      const pct = total > 0 ? (counts[i] / total) * 100 : 0;
                      return (
                        <div key={name} className="flex items-center gap-3 text-sm">
                          <span className="w-28 truncate">{name}</span>
                          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-pipeline rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-12 text-right text-muted-foreground">{pct.toFixed(0)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Risk Flags</h4>
                  <ul className="space-y-1.5">
                    {flags.map((f, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-pipeline">⚠</span>{f}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter deal values to see your pipeline health report.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default PipelineHealth;
