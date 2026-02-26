import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Download } from "lucide-react";

const BattleCard = () => {
  const [yourProduct, setYourProduct] = useState("");
  const [competitor, setCompetitor] = useState("");
  const [yourStrengths, setYourStrengths] = useState("");
  const [yourWeaknesses, setYourWeaknesses] = useState("");
  const [compStrengths, setCompStrengths] = useState("");
  const [compWeaknesses, setCompWeaknesses] = useState("");
  const [pricingYou, setPricingYou] = useState("");
  const [pricingComp, setPricingComp] = useState("");
  const [talkTracks, setTalkTracks] = useState("");
  const [copied, setCopied] = useState(false);

  const hasData = yourProduct || competitor;

  const doc = `BATTLE CARD: ${(yourProduct || "[Your Product]").toUpperCase()} vs ${(competitor || "[Competitor]").toUpperCase()}
${"=".repeat(50)}

📊 QUICK COMPARISON
${"─".repeat(50)}
                    ${yourProduct || "Us"}           ${competitor || "Them"}
Pricing:           ${pricingYou || "N/A"}            ${pricingComp || "N/A"}

✅ OUR STRENGTHS
${(yourStrengths || "• [List strengths]").split("\n").map((s) => s.startsWith("•") ? s : `• ${s}`).join("\n")}

⚠️ OUR WEAKNESSES (internal only)
${(yourWeaknesses || "• [List weaknesses]").split("\n").map((s) => s.startsWith("•") ? s : `• ${s}`).join("\n")}

🔍 COMPETITOR STRENGTHS
${(compStrengths || "• [List their strengths]").split("\n").map((s) => s.startsWith("•") ? s : `• ${s}`).join("\n")}

🎯 COMPETITOR WEAKNESSES (where we win)
${(compWeaknesses || "• [List their weaknesses]").split("\n").map((s) => s.startsWith("•") ? s : `• ${s}`).join("\n")}

💬 TALK TRACKS
${talkTracks || "When they say: \"[Competitor] is cheaper\"\nYou say: \"Let me show you the total cost of ownership...\"\n\nWhen they say: \"We're already using [Competitor]\"\nYou say: \"Many of our best customers switched from [Competitor] because...\""}

---
Internal use only — Do not share with prospects`;

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
    a.download = `battle-card-${(competitor || "competitor").toLowerCase().replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title="Battle Card Creator" description="Build a competitive battle card with strengths, weaknesses, and talk tracks." accentColor="bg-proposal">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Your Product</Label><Input placeholder="CloserKit" value={yourProduct} onChange={(e) => setYourProduct(e.target.value)} /></div>
            <div><Label>Competitor</Label><Input placeholder="SalesForce" value={competitor} onChange={(e) => setCompetitor(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Your Pricing</Label><Input placeholder="$79/mo" value={pricingYou} onChange={(e) => setPricingYou(e.target.value)} /></div>
            <div><Label>Their Pricing</Label><Input placeholder="$150/mo" value={pricingComp} onChange={(e) => setPricingComp(e.target.value)} /></div>
          </div>
          <div><Label>Our Strengths</Label><Textarea rows={3} placeholder="Faster onboarding\nBetter support\nModern UI" value={yourStrengths} onChange={(e) => setYourStrengths(e.target.value)} /></div>
          <div><Label>Our Weaknesses (internal)</Label><Textarea rows={2} placeholder="Fewer integrations\nSmaller brand recognition" value={yourWeaknesses} onChange={(e) => setYourWeaknesses(e.target.value)} /></div>
          <div><Label>Competitor Strengths</Label><Textarea rows={2} placeholder="Brand recognition\nLarge ecosystem" value={compStrengths} onChange={(e) => setCompStrengths(e.target.value)} /></div>
          <div><Label>Competitor Weaknesses</Label><Textarea rows={2} placeholder="Slow support\nComplex setup\nExpensive add-ons" value={compWeaknesses} onChange={(e) => setCompWeaknesses(e.target.value)} /></div>
          <div><Label>Talk Tracks</Label><Textarea rows={4} placeholder={'When they say: "It\'s too expensive"\nYou say: "Let me show you the ROI..."'} value={talkTracks} onChange={(e) => setTalkTracks(e.target.value)} /></div>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Battle Card</CardTitle>
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
              <p className="text-sm text-muted-foreground">Enter your product and competitor to generate a battle card.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default BattleCard;
