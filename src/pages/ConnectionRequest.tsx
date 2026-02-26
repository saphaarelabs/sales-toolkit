import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";

type Scenario = "mutual" | "event" | "content" | "cold";

const scenarioLabels: Record<Scenario, string> = {
  mutual: "Mutual Connection",
  event: "Event Attendee",
  content: "Content Engagement",
  cold: "Cold Outreach",
};

const ConnectionRequest = () => {
  const [scenario, setScenario] = useState<Scenario>("mutual");
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [yourName, setYourName] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const n = name || "there";
  const d = detail || "your work";
  const me = yourName || "me";

  const templates: Record<Scenario, string[]> = {
    mutual: [
      `Hi ${n}, I see we both know ${d}. Would love to connect and share notes on the industry. — ${me}`,
      `${n} — noticed we have ${d} in common. Always great to expand the network with like-minded folks!`,
      `Hey ${n}! ${d} suggested I reach out. I'd love to connect and learn more about what you're working on.`,
    ],
    event: [
      `Hi ${n}, I attended ${d} and your session really stood out. Would love to stay connected! — ${me}`,
      `${n} — great meeting you at ${d}. Let's keep the conversation going!`,
      `Hey ${n}, I was also at ${d}. Loved the discussions there — would be great to connect here too.`,
    ],
    content: [
      `Hi ${n}, your post about ${d} really resonated with me. Would love to connect and follow your insights!`,
      `${n} — been following your content on ${d}. Great perspective. Let's connect! — ${me}`,
      `Hey ${n}, your take on ${d} was spot on. I'd love to exchange ideas — let's connect!`,
    ],
    cold: [
      `Hi ${n}, I work in ${d} and think there might be some overlap in what we do. Happy to connect! — ${me}`,
      `${n} — I noticed your background in ${d}. I'm in a similar space and would love to exchange insights.`,
      `Hey ${n}, reaching out because ${d} is a space I'm passionate about too. Would love to connect!`,
    ],
  };

  const messages = templates[scenario];
  const charLimits = messages.map((m) => m.length <= 300);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <ToolLayout title="Connection Request Writer" description="Generate personalized LinkedIn connection requests under 300 characters." accentColor="bg-linkedin">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Scenario</Label>
            <Select value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.keys(scenarioLabels) as Scenario[]).map((s) => (
                  <SelectItem key={s} value={s}>{scenarioLabels[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Their Name</Label>
            <Input placeholder="Sarah" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>{scenario === "mutual" ? "Mutual Connection Name" : scenario === "event" ? "Event Name" : scenario === "content" ? "Topic / Post Theme" : "Industry / Overlap"}</Label>
            <Input placeholder={scenario === "mutual" ? "John Smith" : scenario === "event" ? "SaaStr 2025" : scenario === "content" ? "AI in sales" : "B2B SaaS"} value={detail} onChange={(e) => setDetail(e.target.value)} />
          </div>
          <div>
            <Label>Your Name</Label>
            <Input placeholder="Alex" value={yourName} onChange={(e) => setYourName(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          {messages.map((msg, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm flex-1">{msg}</p>
                  <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleCopy(msg, i)}>
                    {copiedIdx === i ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className={`text-xs ${charLimits[i] ? "text-muted-foreground" : "text-destructive"}`}>
                  {msg.length}/300 chars {charLimits[i] ? "✓" : "— over limit"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default ConnectionRequest;
