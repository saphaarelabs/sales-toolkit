import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DiscountCalculator = () => {
  const [dealValue, setDealValue] = useState("");
  const [discountPct, setDiscountPct] = useState("");
  const [marginPct, setMarginPct] = useState("");

  const deal = parseFloat(dealValue) || 0;
  const discount = parseFloat(discountPct) || 0;
  const margin = parseFloat(marginPct) || 0;

  const discountAmount = deal * (discount / 100);
  const discountedDeal = deal - discountAmount;
  const originalProfit = deal * (margin / 100);
  const newProfit = discountedDeal * (margin / 100);
  const profitLoss = originalProfit - newProfit;
  const effectiveMargin = discountedDeal > 0 ? ((discountedDeal * (margin / 100)) / discountedDeal) * 100 : 0;
  const sustainable = margin > discount;
  const hasData = deal > 0;

  return (
    <ToolLayout title="Discount Calculator" description="See the real impact of discounts on your revenue and margins." accentColor="bg-calc">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label>Deal Value ($)</Label>
            <Input type="number" placeholder="100000" value={dealValue} onChange={(e) => setDealValue(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Proposed Discount (%)</Label>
            <Input type="number" placeholder="15" value={discountPct} onChange={(e) => setDiscountPct(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Margin (%)</Label>
            <Input type="number" placeholder="40" value={marginPct} onChange={(e) => setMarginPct(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Original Deal</span><span>${deal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Discount Amount</span><span className="text-destructive">-${discountAmount.toLocaleString()}</span></div>
                <div className="flex justify-between font-semibold"><span>Discounted Deal</span><span>${discountedDeal.toLocaleString()}</span></div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">Original Profit</span><span>${originalProfit.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">New Profit</span><span>${newProfit.toLocaleString()}</span></div>
                  <div className="flex justify-between text-destructive"><span>Profit Lost</span><span>-${profitLoss.toLocaleString()}</span></div>
                  <div className="flex justify-between font-semibold"><span>Effective Margin</span><span>{effectiveMargin.toFixed(1)}%</span></div>
                </div>
                <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${sustainable ? "bg-secondary text-secondary-foreground" : "bg-destructive/10 text-destructive"}`}>
                  {sustainable
                    ? "✓ This discount is sustainable — your margin still covers costs."
                    : "⚠ Warning: This discount exceeds your margin. Consider negotiating a smaller concession."}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter a deal value to see the discount impact.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default DiscountCalculator;
