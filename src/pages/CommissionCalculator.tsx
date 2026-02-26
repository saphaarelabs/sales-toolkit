import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Tier {
  id: number;
  upTo: string;
  rate: string;
}

const CommissionCalculator = () => {
  const [dealSize, setDealSize] = useState("");
  const [tiers, setTiers] = useState<Tier[]>([
    { id: 1, upTo: "50000", rate: "5" },
    { id: 2, upTo: "", rate: "8" },
  ]);

  const addTier = () => {
    setTiers([...tiers, { id: Date.now(), upTo: "", rate: "" }]);
  };

  const removeTier = (id: number) => {
    if (tiers.length > 1) setTiers(tiers.filter((t) => t.id !== id));
  };

  const updateTier = (id: number, field: "upTo" | "rate", value: string) => {
    setTiers(tiers.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const deal = parseFloat(dealSize) || 0;

  const breakdown = (() => {
    let remaining = deal;
    let prevCap = 0;
    const rows: { range: string; amount: number; rate: number; commission: number }[] = [];

    for (let i = 0; i < tiers.length; i++) {
      const rate = parseFloat(tiers[i].rate) || 0;
      const cap = tiers[i].upTo ? parseFloat(tiers[i].upTo) : Infinity;
      const tierAmount = Math.min(remaining, Math.max(0, cap - prevCap));
      if (tierAmount <= 0) break;
      const commission = tierAmount * (rate / 100);
      rows.push({
        range: cap === Infinity ? `$${prevCap.toLocaleString()}+` : `$${prevCap.toLocaleString()} – $${cap.toLocaleString()}`,
        amount: tierAmount,
        rate,
        commission,
      });
      remaining -= tierAmount;
      prevCap = cap;
      if (remaining <= 0) break;
    }
    return rows;
  })();

  const totalCommission = breakdown.reduce((s, r) => s + r.commission, 0);

  return (
    <ToolLayout title="Commission Calculator" description="Calculate rep earnings across multi-tier commission structures." accentColor="bg-calc">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label>Deal Size ($)</Label>
            <Input type="number" placeholder="100000" value={dealSize} onChange={(e) => setDealSize(e.target.value)} className="mt-1.5" />
          </div>
          <div className="space-y-3">
            <Label>Commission Tiers</Label>
            {tiers.map((tier, i) => (
              <div key={tier.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  {i === 0 && <span className="text-xs text-muted-foreground">Up to ($)</span>}
                  <Input placeholder={i === tiers.length - 1 ? "∞ (remainder)" : "50000"} value={tier.upTo} onChange={(e) => updateTier(tier.id, "upTo", e.target.value)} />
                </div>
                <div className="w-24">
                  {i === 0 && <span className="text-xs text-muted-foreground">Rate %</span>}
                  <Input type="number" placeholder="5" value={tier.rate} onChange={(e) => updateTier(tier.id, "rate", e.target.value)} />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeTier(tier.id)} disabled={tiers.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addTier}>
              <Plus className="h-4 w-4 mr-1" /> Add Tier
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earnings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {deal > 0 && breakdown.length > 0 ? (
              <div className="space-y-4">
                {breakdown.map((row, i) => (
                  <div key={i} className="flex justify-between text-sm border-b pb-2">
                    <div>
                      <p className="font-medium">{row.range}</p>
                      <p className="text-muted-foreground">${row.amount.toLocaleString()} × {row.rate}%</p>
                    </div>
                    <span className="font-semibold">${row.commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 text-base font-bold">
                  <span>Total Commission</span>
                  <span className="text-calc">${totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter a deal size to see your commission breakdown.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default CommissionCalculator;
