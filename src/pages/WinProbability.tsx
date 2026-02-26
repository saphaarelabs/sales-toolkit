import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const stages = [
  { value: "prospecting", label: "Prospecting", weight: 10 },
  { value: "discovery", label: "Discovery", weight: 25 },
  { value: "demo", label: "Demo / Evaluation", weight: 40 },
  { value: "proposal", label: "Proposal Sent", weight: 60 },
  { value: "negotiation", label: "Negotiation", weight: 80 },
];

const WinProbability = () => {
  const [dealSize, setDealSize] = useState("");
  const [stage, setStage] = useState("");
  const [hasChampion, setHasChampion] = useState("");
  const [competitorCount, setCompetitorCount] = useState("");
  const [daysToClose, setDaysToClose] = useState("");

  const stageObj = stages.find((s) => s.value === stage);
  const base = stageObj?.weight ?? 0;

  let score = base;
  if (hasChampion === "yes") score += 15;
  if (hasChampion === "no") score -= 10;
  if (competitorCount === "0") score += 10;
  else if (competitorCount === "1") score += 0;
  else if (competitorCount === "2") score -= 5;
  else if (competitorCount === "3+") score -= 15;
  const days = parseFloat(daysToClose) || 0;
  if (days > 0 && days <= 30) score += 10;
  else if (days > 90) score -= 10;

  score = Math.max(0, Math.min(100, score));
  const deal = parseFloat(dealSize) || 0;
  const weightedValue = deal * (score / 100);
  const hasData = stage !== "";

  const recommendations: string[] = [];
  if (hasChampion !== "yes") recommendations.push("Identify and activate an internal champion");
  if (competitorCount === "3+" || competitorCount === "2") recommendations.push("Differentiate aggressively — create a battle card");
  if (days > 90) recommendations.push("Compress timeline with urgency triggers or time-limited offers");
  if (base <= 25) recommendations.push("Advance deal stage — book a demo or discovery call");
  if (recommendations.length === 0) recommendations.push("Deal looks strong — maintain momentum and multi-thread");

  return (
    <ToolLayout title="Win Probability Calculator" description="Estimate your deal's win probability and get recommendations to improve odds." accentColor="bg-pipeline">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Deal Size ($)</Label>
            <Input type="number" placeholder="50000" value={dealSize} onChange={(e) => setDealSize(e.target.value)} />
          </div>
          <div>
            <Label>Deal Stage</Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger><SelectValue placeholder="Select stage" /></SelectTrigger>
              <SelectContent>{stages.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Internal Champion?</Label>
            <Select value={hasChampion} onValueChange={setHasChampion}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes — identified & engaged</SelectItem>
                <SelectItem value="maybe">Maybe — not confirmed</SelectItem>
                <SelectItem value="no">No champion</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Competitors in Deal</Label>
            <Select value={competitorCount} onValueChange={setCompetitorCount}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0">None</SelectItem>
                <SelectItem value="1">1 competitor</SelectItem>
                <SelectItem value="2">2 competitors</SelectItem>
                <SelectItem value="3+">3+ competitors</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Days to Expected Close</Label>
            <Input type="number" placeholder="45" value={daysToClose} onChange={(e) => setDaysToClose(e.target.value)} />
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Win Analysis</CardTitle></CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Win Probability</span>
                    <span className={`text-lg font-bold ${score >= 60 ? "text-green-600" : score >= 35 ? "text-yellow-600" : "text-destructive"}`}>{score}%</span>
                  </div>
                  <Progress value={score} className="h-3" />
                </div>
                {deal > 0 && (
                  <div className="rounded-md bg-muted p-4 text-sm space-y-1">
                    <div className="flex justify-between"><span>Deal Size</span><span className="font-medium">${deal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Weighted Value</span><span className="font-medium">${weightedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Recommendations</h4>
                  <ul className="space-y-1.5">
                    {recommendations.map((r, i) => <li key={i} className="text-sm text-muted-foreground flex gap-2"><span className="text-pipeline">→</span>{r}</li>)}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a deal stage to see your win analysis.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default WinProbability;
