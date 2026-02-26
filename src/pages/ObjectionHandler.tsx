import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface Objection {
  title: string;
  frameworks: { name: string; script: string }[];
}

const objections: Objection[] = [
  {
    title: "\"It's too expensive\"",
    frameworks: [
      { name: "Reframe to Value", script: "I hear you — price matters. Let me ask: what's [pain point] costing you right now in time, resources, or lost deals? Most of our customers find the ROI pays for itself within [X] months." },
      { name: "Break It Down", script: "Totally fair. When you break it down, it comes to about $[X] per day. For what that unlocks — [key benefit] — most teams see it as a no-brainer." },
      { name: "Compare Alternatives", script: "What would it cost to solve this problem another way? Hiring someone, building in-house, or continuing to lose [metric]? We're usually the most efficient path." },
    ],
  },
  {
    title: "\"We're using a competitor\"",
    frameworks: [
      { name: "Acknowledge & Differentiate", script: "That's great — it means you already see the value of solving [problem]. The main thing our customers tell us is [key differentiator]. Would it be worth seeing how that compares?" },
      { name: "Future-Focused", script: "How long have you been with them? A lot of our best customers switched from [competitor] because they needed [specific capability]. Even if you're happy now, it might be worth a quick look." },
    ],
  },
  {
    title: "\"Not the right time\"",
    frameworks: [
      { name: "Urgency Reframe", script: "I understand timing is everything. Quick question — is [pain point] going to get better on its own? Most teams find that waiting costs more than acting. Happy to keep this super light." },
      { name: "Plant the Seed", script: "Totally respect that. When would be a good time to revisit this? I can send over some resources in the meantime so you're ready when the timing is right." },
    ],
  },
  {
    title: "\"I need to talk to my boss\"",
    frameworks: [
      { name: "Enable the Champion", script: "Of course — what questions do you think they'll have? I can put together a one-pager that addresses those directly so you're set for that conversation." },
      { name: "Offer a Joint Call", script: "Totally makes sense. Would it help if I joined a quick 10-minute call with you and [boss title]? That way I can answer any questions directly and save you the back-and-forth." },
    ],
  },
  {
    title: "\"Just send me some info\"",
    frameworks: [
      { name: "Qualify First", script: "Happy to! So I send you the right stuff — what's the biggest challenge you're facing with [area]? That way I can tailor it to what matters most to you." },
      { name: "Offer Specificity", script: "Sure thing. I've got a general overview and a case study from [similar company]. Which would be more relevant? And I'll follow up [day] to see if you have questions." },
    ],
  },
];

const ObjectionHandler = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <ToolLayout title="Objection Handler" description="Browse common sales objections with proven response frameworks you can customize." accentColor="bg-prospect">
      <div className="space-y-3 max-w-3xl">
        {objections.map((obj, i) => (
          <Card key={i}>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between py-4 px-5"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <CardTitle className="text-base">{obj.title}</CardTitle>
              {expanded === i ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            {expanded === i && (
              <CardContent className="px-5 pb-5 space-y-4">
                {obj.frameworks.map((fw, j) => {
                  const key = `${i}-${j}`;
                  return (
                    <div key={j} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold">{fw.name}</span>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(fw.script, key)}>
                          {copiedKey === key ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{fw.script}</p>
                    </div>
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
};

export default ObjectionHandler;
