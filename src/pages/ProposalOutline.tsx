import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Download } from "lucide-react";

const ProposalOutline = () => {
  const [client, setClient] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [timeline, setTimeline] = useState("");
  const [pricing, setPricing] = useState("");
  const [copied, setCopied] = useState(false);

  const hasData = client || problem;

  const doc = `PROPOSAL FOR ${(client || "[Client Name]").toUpperCase()}
${"=".repeat(40)}

Prepared by: [Your Company]
Date: ${new Date().toLocaleDateString()}

---

1. EXECUTIVE SUMMARY
We propose to partner with ${client || "[Client Name]"} to address the following challenge:
${problem || "[Describe the core problem]"}

2. PROPOSED SOLUTION
${solution || "[Describe your solution and approach]"}

3. TIMELINE & MILESTONES
${timeline || "[Outline key phases and dates]"}

4. INVESTMENT
${pricing || "[Pricing details]"}

5. WHY US
- Proven track record in this space
- Dedicated support team
- Measurable ROI within 90 days

6. NEXT STEPS
- Review this proposal
- Schedule a follow-up call
- Sign agreement and kick off

---
Confidential — Prepared for ${client || "[Client Name]"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(doc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([doc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `proposal-${(client || "draft").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="Proposal Outline Builder" description="Generate a structured proposal outline. Copy or download as text." accentColor="bg-proposal">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div><Label>Client Name</Label><Input placeholder="Acme Corp" value={client} onChange={(e) => setClient(e.target.value)} /></div>
          <div><Label>Problem / Challenge</Label><Textarea placeholder="Describe the client's core problem..." rows={3} value={problem} onChange={(e) => setProblem(e.target.value)} /></div>
          <div><Label>Proposed Solution</Label><Textarea placeholder="How you'll solve it..." rows={3} value={solution} onChange={(e) => setSolution(e.target.value)} /></div>
          <div><Label>Timeline</Label><Input placeholder="6 weeks, 3 phases" value={timeline} onChange={(e) => setTimeline(e.target.value)} /></div>
          <div><Label>Pricing</Label><Input placeholder="$45,000 one-time + $2,000/mo" value={pricing} onChange={(e) => setPricing(e.target.value)} /></div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Proposal Preview</CardTitle>
            {hasData && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <><Check className="h-4 w-4 mr-1 text-green-600" /> Copied!</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}><Download className="h-4 w-4 mr-1" /> Download</Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {hasData ? (
              <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{doc}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">Fill in the fields to generate your proposal outline.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ProposalOutline;
