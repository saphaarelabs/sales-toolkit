import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, RefreshCw } from "lucide-react";

type Scenario = "intro" | "breakup" | "referral" | "follow-up";

const templates: Record<Scenario, { label: string; emails: ((p: { name: string; company: string; pain: string; product: string }) => string)[] }> = {
  intro: {
    label: "Cold Intro",
    emails: [
      (p) => `Subject: Quick question about ${p.company}\n\nHi ${p.name},\n\nI noticed ${p.company} is scaling fast — congrats. A lot of teams in your space run into ${p.pain} around this stage.\n\nWe built ${p.product} specifically for that. Would it make sense to chat for 15 minutes this week?\n\nBest,\n[Your Name]`,
      (p) => `Subject: ${p.pain} at ${p.company}?\n\nHi ${p.name},\n\n${p.pain} is the #1 thing I hear from teams like ${p.company}. ${p.product} helps solve that without the usual headaches.\n\nWorth a quick call?\n\n[Your Name]`,
      (p) => `Subject: Idea for ${p.company}\n\n${p.name} — saw your recent post about growth at ${p.company}. Teams in similar situations have used ${p.product} to tackle ${p.pain} and seen results fast.\n\nHappy to share how. 15 min this week?\n\n[Your Name]`,
    ],
  },
  breakup: {
    label: "Breakup Email",
    emails: [
      (p) => `Subject: Should I close your file?\n\nHi ${p.name},\n\nI've reached out a few times and haven't heard back — totally understand you're busy at ${p.company}.\n\nIf ${p.pain} isn't a priority right now, no worries at all. Just let me know and I'll stop reaching out.\n\nOtherwise, I'd love to show you how ${p.product} can help.\n\n[Your Name]`,
      (p) => `Subject: One last try\n\n${p.name},\n\nI don't want to be that person who keeps emailing. If now's not the time to address ${p.pain} at ${p.company}, just say the word.\n\nBut if it is — ${p.product} might be exactly what you need.\n\n[Your Name]`,
    ],
  },
  referral: {
    label: "Referral Ask",
    emails: [
      (p) => `Subject: Who handles ${p.pain} at ${p.company}?\n\nHi ${p.name},\n\nI'm not sure if you're the right person to talk to about ${p.pain}. If not, could you point me to the right contact at ${p.company}?\n\nWe help teams like yours with ${p.product} and I'd love to connect with the right person.\n\nThanks!\n[Your Name]`,
    ],
  },
  "follow-up": {
    label: "Follow-up",
    emails: [
      (p) => `Subject: Re: ${p.product} for ${p.company}\n\nHi ${p.name},\n\nJust bumping this up in your inbox. I know ${p.pain} can be a real time sink — ${p.product} is designed to fix that fast.\n\nAny interest in a quick chat?\n\n[Your Name]`,
      (p) => `Subject: Still thinking about it?\n\n${p.name}, just circling back on my last note. Happy to answer any questions about how ${p.product} handles ${p.pain} for teams like ${p.company}.\n\nLet me know!\n[Your Name]`,
    ],
  },
};

const ColdEmailGenerator = () => {
  const [scenario, setScenario] = useState<Scenario>("intro");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [pain, setPain] = useState("");
  const [product, setProduct] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const prospect = { name: name || "[Name]", company: company || "[Company]", pain: pain || "[pain point]", product: product || "[Your Product]" };
  const emails = templates[scenario].emails.map((fn) => fn(prospect));

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <ToolLayout title="Cold Email Generator" description="Pick a scenario, fill in details, and get ready-to-send email variations." accentColor="bg-email">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div>
            <Label>Scenario</Label>
            <Select value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {(Object.entries(templates) as [Scenario, typeof templates.intro][]).map(([key, val]) => (
                  <SelectItem key={key} value={key}>{val.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Prospect Name</Label>
            <Input placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Company</Label>
            <Input placeholder="Acme Corp" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Pain Point</Label>
            <Input placeholder="slow onboarding" value={pain} onChange={(e) => setPain(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Your Product</Label>
            <Input placeholder="CloserKit" value={product} onChange={(e) => setProduct(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <div className="space-y-4">
          {emails.map((email, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between py-3 px-5">
                <CardTitle className="text-sm font-medium">Variation {i + 1}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(email, i)}>
                  {copiedIdx === i ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedIdx === i ? "Copied" : "Copy"}
                </Button>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <pre className="whitespace-pre-wrap text-sm font-sans text-card-foreground leading-relaxed">{email}</pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
};

export default ColdEmailGenerator;
