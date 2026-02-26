import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Copy, Check } from "lucide-react";

interface Step {
  id: number;
  day: string;
  subject: string;
  body: string;
}

const defaultSteps: Step[] = [
  { id: 1, day: "1", subject: "Introduction", body: "Hi [Name],\n\nI came across [Company] and thought our solution could help with [pain point].\n\nWould you be open to a quick 15-minute chat this week?\n\nBest,\n[Your Name]" },
  { id: 2, day: "3", subject: "Quick follow-up", body: "Hi [Name],\n\nJust following up on my previous note. I know [pain point] can be a challenge — happy to share how we've helped similar teams.\n\nLet me know if you have 15 minutes.\n\n[Your Name]" },
  { id: 3, day: "7", subject: "One more thought", body: "[Name],\n\nI wanted to share a quick case study about how [similar company] solved [pain point] using our platform.\n\nWorth a look?\n\n[Your Name]" },
  { id: 4, day: "14", subject: "Last check-in", body: "Hi [Name],\n\nI don't want to keep bothering you. If [pain point] isn't a priority right now, no worries.\n\nIf it is, I'd love to help. Just reply and we'll set something up.\n\n[Your Name]" },
];

const SequenceBuilder = () => {
  const [steps, setSteps] = useState<Step[]>(defaultSteps);
  const [copied, setCopied] = useState(false);

  const addStep = () => {
    const lastDay = parseInt(steps[steps.length - 1]?.day || "0") || 0;
    setSteps([...steps, { id: Date.now(), day: String(lastDay + 7), subject: "", body: "" }]);
  };

  const removeStep = (id: number) => {
    if (steps.length > 1) setSteps(steps.filter((s) => s.id !== id));
  };

  const update = (id: number, field: keyof Step, value: string) => {
    setSteps(steps.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const fullSequence = steps.map((s, i) => `--- Step ${i + 1} (Day ${s.day}) ---\nSubject: ${s.subject}\n\n${s.body}`).join("\n\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(fullSequence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="Follow-up Sequence Builder" description="Build a multi-step email sequence with timing and editable templates." accentColor="bg-email">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
          {copied ? "Copied!" : "Export Sequence"}
        </Button>
      </div>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <Card key={step.id}>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-5">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium bg-secondary text-secondary-foreground rounded-full px-2.5 py-0.5">Step {i + 1}</span>
                <div className="flex items-center gap-1.5">
                  <Label className="text-xs text-muted-foreground">Day</Label>
                  <Input className="w-16 h-7 text-xs" value={step.day} onChange={(e) => update(step.id, "day", e.target.value)} />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeStep(step.id)} disabled={steps.length <= 1}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </CardHeader>
            <CardContent className="px-5 pb-5 space-y-3">
              <div>
                <Label className="text-xs">Subject Line</Label>
                <Input value={step.subject} onChange={(e) => update(step.id, "subject", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs">Email Body</Label>
                <Textarea value={step.body} onChange={(e) => update(step.id, "body", e.target.value)} className="mt-1 min-h-[120px]" />
              </div>
            </CardContent>
          </Card>
        ))}
        <Button variant="outline" onClick={addStep}>
          <Plus className="h-4 w-4 mr-1" /> Add Step
        </Button>
      </div>
    </ToolLayout>
  );
};

export default SequenceBuilder;
