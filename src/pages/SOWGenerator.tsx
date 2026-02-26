import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Download } from "lucide-react";

const SOWGenerator = () => {
  const [projectName, setProjectName] = useState("");
  const [client, setClient] = useState("");
  const [scope, setScope] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [timeline, setTimeline] = useState("");
  const [assumptions, setAssumptions] = useState("");
  const [terms, setTerms] = useState("");
  const [copied, setCopied] = useState(false);

  const hasData = projectName || scope;

  const doc = `STATEMENT OF WORK
${"=".repeat(40)}

Project: ${projectName || "[Project Name]"}
Client: ${client || "[Client Name]"}
Date: ${new Date().toLocaleDateString()}
Version: 1.0

---

1. PROJECT SCOPE
${scope || "[Define what is included and excluded]"}

2. DELIVERABLES
${deliverables || "[List all deliverables with acceptance criteria]"}

3. TIMELINE & MILESTONES
${timeline || "[Phase breakdown with dates]"}

4. ASSUMPTIONS
${assumptions || "[List key assumptions and dependencies]"}

5. TERMS & CONDITIONS
${terms || "[Payment terms, change request process, warranties]"}

6. APPROVALS

Client Signature: ________________________  Date: ________
Provider Signature: ______________________  Date: ________

---
This SOW is subject to the terms of the Master Services Agreement between the parties.`;

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
    a.download = `sow-${(projectName || "draft").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="SOW Generator" description="Generate a formatted Statement of Work document." accentColor="bg-proposal">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div><Label>Project Name</Label><Input placeholder="Website Redesign" value={projectName} onChange={(e) => setProjectName(e.target.value)} /></div>
          <div><Label>Client Name</Label><Input placeholder="Acme Corp" value={client} onChange={(e) => setClient(e.target.value)} /></div>
          <div><Label>Scope</Label><Textarea rows={3} placeholder="Design and develop a new marketing website..." value={scope} onChange={(e) => setScope(e.target.value)} /></div>
          <div><Label>Deliverables</Label><Textarea rows={3} placeholder="Homepage design\nResponsive templates\nCMS integration" value={deliverables} onChange={(e) => setDeliverables(e.target.value)} /></div>
          <div><Label>Timeline</Label><Textarea rows={2} placeholder="Phase 1: Discovery (2 weeks)\nPhase 2: Design (3 weeks)" value={timeline} onChange={(e) => setTimeline(e.target.value)} /></div>
          <div><Label>Assumptions</Label><Textarea rows={2} placeholder="Client provides content by Week 2\nMax 2 revision rounds" value={assumptions} onChange={(e) => setAssumptions(e.target.value)} /></div>
          <div><Label>Terms</Label><Textarea rows={2} placeholder="50% upfront, 50% on delivery\nNet 30 payment terms" value={terms} onChange={(e) => setTerms(e.target.value)} /></div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>SOW Preview</CardTitle>
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
              <p className="text-sm text-muted-foreground">Fill in the fields to generate your Statement of Work.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default SOWGenerator;
