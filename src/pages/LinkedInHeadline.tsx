import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const LinkedInHeadline = () => {
  const [role, setRole] = useState("");
  const [valueProp, setValueProp] = useState("");
  const [audience, setAudience] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const hasData = role && valueProp;

  const headlines = hasData
    ? [
        `${role} | Helping ${audience || "teams"} ${valueProp}`,
        `${valueProp} for ${audience || "businesses"} | ${role}`,
        `${role} → I help ${audience || "companies"} ${valueProp.toLowerCase()}`,
        `Most ${audience || "companies"} struggle with ${valueProp.toLowerCase().replace(/^(help |increase |drive |boost )/i, "")}. I fix that. | ${role}`,
        `${role} | ${valueProp} | Ask me how ↓`,
        `Your next ${role.toLowerCase()}? I ${valueProp.toLowerCase()} for ${audience || "organizations"}.`,
        `${valueProp} — that's what I do as a ${role} for ${audience || "clients"}.`,
      ]
    : [];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <ToolLayout title="LinkedIn Headline Generator" description="Generate compelling LinkedIn headlines that attract your target audience." accentColor="bg-linkedin">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <Label>Your Role / Title</Label>
            <Input placeholder="Senior Account Executive" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div>
            <Label>Value Proposition</Label>
            <Input placeholder="Help companies cut sales cycles by 40%" value={valueProp} onChange={(e) => setValueProp(e.target.value)} />
          </div>
          <div>
            <Label>Target Audience</Label>
            <Input placeholder="B2B SaaS founders" value={audience} onChange={(e) => setAudience(e.target.value)} />
          </div>
        </div>

        <div className="space-y-3">
          {headlines.length > 0 ? headlines.map((h, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-start justify-between gap-3">
                <p className="text-sm flex-1">{h}</p>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => handleCopy(h, i)}>
                  {copiedIdx === i ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          )) : (
            <p className="text-sm text-muted-foreground">Enter your role and value prop to generate headlines.</p>
          )}
        </div>
      </div>
    </ToolLayout>
  );
};

export default LinkedInHeadline;
