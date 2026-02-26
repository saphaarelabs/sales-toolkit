import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Download } from "lucide-react";

const industries = ["SaaS", "E-commerce", "Healthcare", "Finance", "Education", "Manufacturing", "Professional Services", "Other"];
const companySizes = ["1-10", "11-50", "51-200", "201-1000", "1000+"];

const ICPBuilder = () => {
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [painPoints, setPainPoints] = useState("");
  const [titles, setTitles] = useState("");
  const [geography, setGeography] = useState("");
  const [copied, setCopied] = useState(false);

  const hasData = industry || companySize || painPoints || titles;

  const doc = `IDEAL CUSTOMER PROFILE
${"═".repeat(40)}

Industry: ${industry || "—"}
Company Size: ${companySize || "—"} employees
Budget Range: ${budgetMin || budgetMax ? `$${budgetMin || "?"} – $${budgetMax || "?"}` : "—"}
Geography: ${geography || "—"}

Pain Points:
${painPoints ? painPoints.split("\n").map((p) => `  • ${p.trim()}`).filter(l => l.trim() !== "•").join("\n") : "  —"}

Decision-Maker Titles:
${titles ? titles.split("\n").map((t) => `  • ${t.trim()}`).filter(l => l.trim() !== "•").join("\n") : "  —"}
`;

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
    a.download = "ideal-customer-profile.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="ICP Builder" description="Define your ideal customer profile and export it as a formatted document." accentColor="bg-prospect">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <Label>Industry</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select industry" /></SelectTrigger>
              <SelectContent>
                {industries.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Company Size</Label>
            <Select value={companySize} onValueChange={setCompanySize}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select size" /></SelectTrigger>
              <SelectContent>
                {companySizes.map((s) => <SelectItem key={s} value={s}>{s} employees</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Budget Min ($)</Label>
              <Input type="number" placeholder="10000" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label>Budget Max ($)</Label>
              <Input type="number" placeholder="50000" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label>Geography</Label>
            <Input placeholder="North America, Europe" value={geography} onChange={(e) => setGeography(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Pain Points (one per line)</Label>
            <Textarea placeholder="Slow onboarding process&#10;High customer churn&#10;Manual data entry" value={painPoints} onChange={(e) => setPainPoints(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Decision-Maker Titles (one per line)</Label>
            <Textarea placeholder="VP of Sales&#10;Head of Revenue&#10;CRO" value={titles} onChange={(e) => setTitles(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">ICP Document</CardTitle>
            {hasData && (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {hasData ? (
              <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed text-card-foreground">{doc}</pre>
            ) : (
              <p className="text-sm text-muted-foreground">Fill in the form to generate your ICP document.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default ICPBuilder;
