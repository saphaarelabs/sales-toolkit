import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const ROICalculator = () => {
  const [currentCost, setCurrentCost] = useState("");
  const [projectedSavings, setProjectedSavings] = useState("");
  const [implementationCost, setImplementationCost] = useState("");
  const [copied, setCopied] = useState(false);

  const cost = parseFloat(currentCost) || 0;
  const savings = parseFloat(projectedSavings) || 0;
  const impl = parseFloat(implementationCost) || 0;

  const annualBenefit = savings;
  const netBenefit = annualBenefit - impl;
  const roi = impl > 0 ? (netBenefit / impl) * 100 : 0;
  const paybackMonths = annualBenefit > 0 ? (impl / annualBenefit) * 12 : 0;
  const hasData = cost > 0 || savings > 0 || impl > 0;

  const summary = `ROI Summary
───────────────
Current Annual Cost: $${cost.toLocaleString()}
Projected Annual Savings: $${savings.toLocaleString()}
Implementation Cost: $${impl.toLocaleString()}

Net Benefit (Year 1): $${netBenefit.toLocaleString()}
ROI: ${roi.toFixed(1)}%
Payback Period: ${paybackMonths.toFixed(1)} months`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="ROI Calculator" description="Generate a shareable ROI summary with payback period for proposals." accentColor="bg-calc">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label>Current Annual Cost ($)</Label>
            <Input type="number" placeholder="120000" value={currentCost} onChange={(e) => setCurrentCost(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Projected Annual Savings ($)</Label>
            <Input type="number" placeholder="40000" value={projectedSavings} onChange={(e) => setProjectedSavings(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Implementation Cost ($)</Label>
            <Input type="number" placeholder="25000" value={implementationCost} onChange={(e) => setImplementationCost(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">ROI Summary</CardTitle>
            {hasData && (
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Current Annual Cost</span><span>${cost.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Projected Annual Savings</span><span>${savings.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Implementation Cost</span><span>${impl.toLocaleString()}</span></div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between font-semibold"><span>Net Benefit (Year 1)</span><span>${netBenefit.toLocaleString()}</span></div>
                  <div className="flex justify-between font-bold text-base"><span>ROI</span><span className="text-calc">{roi.toFixed(1)}%</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Payback Period</span><span>{paybackMonths.toFixed(1)} months</span></div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter values to see your ROI summary.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ROICalculator;
