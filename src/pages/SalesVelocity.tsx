import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesVelocity = () => {
  const [opportunities, setOpportunities] = useState("");
  const [avgDeal, setAvgDeal] = useState("");
  const [winRate, setWinRate] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const opps = parseFloat(opportunities) || 0;
  const deal = parseFloat(avgDeal) || 0;
  const wr = parseFloat(winRate) || 0;
  const cycle = parseFloat(cycleLength) || 0;

  const velocity = cycle > 0 ? (opps * deal * (wr / 100)) / cycle : 0;
  const hasData = opps > 0 && deal > 0 && wr > 0 && cycle > 0;

  const improvements = [
    { label: "10% more opportunities", velocity: cycle > 0 ? (opps * 1.1 * deal * (wr / 100)) / cycle : 0 },
    { label: "10% larger deals", velocity: cycle > 0 ? (opps * deal * 1.1 * (wr / 100)) / cycle : 0 },
    { label: "10% better win rate", velocity: cycle > 0 ? (opps * deal * (Math.min(wr * 1.1, 100) / 100)) / cycle : 0 },
    { label: "10% shorter cycle", velocity: cycle * 0.9 > 0 ? (opps * deal * (wr / 100)) / (cycle * 0.9) : 0 },
  ];

  return (
    <ToolLayout title="Sales Velocity Calculator" description="Calculate revenue per day and see the impact of improving each lever." accentColor="bg-pipeline">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label># of Opportunities</Label>
            <Input type="number" placeholder="40" value={opportunities} onChange={(e) => setOpportunities(e.target.value)} />
          </div>
          <div>
            <Label>Average Deal Size ($)</Label>
            <Input type="number" placeholder="25000" value={avgDeal} onChange={(e) => setAvgDeal(e.target.value)} />
          </div>
          <div>
            <Label>Win Rate (%)</Label>
            <Input type="number" placeholder="25" value={winRate} onChange={(e) => setWinRate(e.target.value)} />
          </div>
          <div>
            <Label>Sales Cycle Length (days)</Label>
            <Input type="number" placeholder="60" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} />
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Velocity Analysis</CardTitle></CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-6">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">Revenue Per Day</p>
                  <p className="text-3xl font-bold text-pipeline">${velocity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p className="text-sm text-muted-foreground mt-1">${(velocity * 30).toLocaleString(undefined, { maximumFractionDigits: 0 })}/month</p>
                </div>

                <div className="rounded-md bg-muted p-4 text-sm space-y-1">
                  <p className="font-medium mb-2">Formula</p>
                  <p className="text-muted-foreground">(Opps × Avg Deal × Win Rate) ÷ Cycle Length</p>
                  <p className="text-muted-foreground">({opps} × ${deal.toLocaleString()} × {wr}%) ÷ {cycle} days</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3">What-If: Improve Each Lever by 10%</h4>
                  <div className="space-y-2">
                    {improvements.map((imp) => {
                      const gain = imp.velocity - velocity;
                      const pctGain = velocity > 0 ? (gain / velocity) * 100 : 0;
                      return (
                        <div key={imp.label} className="flex items-center justify-between text-sm rounded-md bg-muted p-3">
                          <span>{imp.label}</span>
                          <div className="text-right">
                            <span className="font-medium">${imp.velocity.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day</span>
                            <span className="text-green-600 ml-2 text-xs">+{pctGain.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Fill in all four fields to calculate your sales velocity.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default SalesVelocity;
