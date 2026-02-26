import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

interface Step {
  id: number;
  day: string;
  action: string;
  detail: string;
}

const actions = ["Like their post", "Comment on post", "Send connection request", "Send DM", "Share their content", "Engage in group", "Send voice note"];

const defaultSteps: Step[] = [
  { id: 1, day: "1", action: "Like their post", detail: "Find their most recent post and give it a genuine like" },
  { id: 2, day: "3", action: "Comment on post", detail: "Leave a thoughtful comment adding value to their content" },
  { id: 3, day: "5", action: "Send connection request", detail: "Reference their content in a personalized request" },
  { id: 4, day: "7", action: "Send DM", detail: "Send a short, value-first message — no pitch" },
  { id: 5, day: "14", action: "Share their content", detail: "Repost with your own commentary to build rapport" },
];

const SocialSequence = () => {
  const [steps, setSteps] = useState<Step[]>(defaultSteps);
  const [copied, setCopied] = useState(false);

  const addStep = () => {
    const maxDay = Math.max(...steps.map((s) => parseInt(s.day) || 0));
    setSteps([...steps, { id: Date.now(), day: String(maxDay + 7), action: "Like their post", detail: "" }]);
  };

  const removeStep = (id: number) => { if (steps.length > 1) setSteps(steps.filter((s) => s.id !== id)); };
  const update = (id: number, field: keyof Step, value: string) => setSteps(steps.map((s) => s.id === id ? { ...s, [field]: value } : s));

  const plan = steps.map((s) => `Day ${s.day}: ${s.action}\n  → ${s.detail}`).join("\n\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(`Social Selling Sequence\n${"=".repeat(30)}\n\n${plan}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="Social Selling Sequence Planner" description="Build a multi-touch social selling plan with timed actions." accentColor="bg-linkedin">
      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id}>
            <CardContent className="p-4">
              <div className="grid grid-cols-[80px_1fr_1fr_auto] gap-3 items-start">
                <div>
                  <Label className="text-xs">Day</Label>
                  <Input type="number" value={step.day} onChange={(e) => update(step.id, "day", e.target.value)} />
                </div>
                <div>
                  <Label className="text-xs">Action</Label>
                  <Select value={step.action} onValueChange={(v) => update(step.id, "action", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{actions.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Detail</Label>
                  <Input value={step.detail} onChange={(e) => update(step.id, "detail", e.target.value)} placeholder="What specifically to do" />
                </div>
                <Button variant="ghost" size="icon" className="mt-5" onClick={() => removeStep(step.id)} disabled={steps.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3">
          <Button variant="outline" onClick={addStep}><Plus className="h-4 w-4 mr-1" /> Add Step</Button>
          <Button onClick={handleCopy}>
            {copied ? <><Check className="h-4 w-4 mr-1" /> Copied!</> : <><Copy className="h-4 w-4 mr-1" /> Export Sequence</>}
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
};

export default SocialSequence;
