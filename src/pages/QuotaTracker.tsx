import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const QuotaTracker = () => {
  const [quota, setQuota] = useState("");
  const [closed, setClosed] = useState("");
  const [period, setPeriod] = useState("quarter");
  const [elapsed, setElapsed] = useState("");

  const q = parseFloat(quota) || 0;
  const c = parseFloat(closed) || 0;
  const totalDays = period === "quarter" ? 90 : period === "month" ? 30 : 365;
  const e = Math.min(parseFloat(elapsed) || 0, totalDays);
  const remaining = totalDays - e;

  const attainment = q > 0 ? (c / q) * 100 : 0;
  const gap = q - c;
  const runRate = e > 0 ? c / e : 0;
  const projected = runRate * totalDays;
  const requiredRate = remaining > 0 ? gap / remaining : 0;
  const onTrack = projected >= q;
  const hasData = q > 0;

  return (
    <ToolLayout title="Quota Attainment Tracker" description="Track quota progress, run rate, and pace projection." accentColor="bg-pipeline">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Period</Label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Quota ($)</Label>
            <Input type="number" placeholder="250000" value={quota} onChange={(e) => setQuota(e.target.value)} />
          </div>
          <div>
            <Label>Closed Revenue ($)</Label>
            <Input type="number" placeholder="85000" value={closed} onChange={(e) => setClosed(e.target.value)} />
          </div>
          <div>
            <Label>Days Elapsed</Label>
            <Input type="number" placeholder={String(Math.round(totalDays / 2))} value={elapsed} onChange={(e) => setElapsed(e.target.value)} />
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Attainment</CardTitle></CardHeader>
          <CardContent>
            {hasData ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className={`text-2xl font-bold ${attainment >= 100 ? "text-green-600" : attainment >= 70 ? "text-yellow-600" : "text-destructive"}`}>{attainment.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(attainment, 100)} className="h-4" />
                </div>

                <div className="rounded-md bg-muted p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Quota</span><span className="font-medium">${q.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Closed</span><span className="font-medium">${c.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span>Gap</span><span className="font-medium">${Math.max(gap, 0).toLocaleString()}</span></div>
                </div>

                {e > 0 && (
                  <div className="rounded-md bg-muted p-4 space-y-2 text-sm">
                    <div className="flex justify-between"><span>Current Run Rate</span><span className="font-medium">${runRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day</span></div>
                    <div className="flex justify-between"><span>Required Run Rate</span><span className="font-medium">${requiredRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}/day</span></div>
                    <div className="flex justify-between"><span>Projected Total</span><span className={`font-bold ${onTrack ? "text-green-600" : "text-destructive"}`}>${projected.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
                    <div className="flex justify-between"><span>Pace</span><span className={`font-bold ${onTrack ? "text-green-600" : "text-destructive"}`}>{onTrack ? "✓ On Track" : "✗ Behind"}</span></div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Enter your quota to track attainment.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default QuotaTracker;
