import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Copy, Check, Plus, Trash2 } from "lucide-react";

interface Tier {
  id: number;
  name: string;
  price: string;
  period: string;
  features: string;
  highlighted: boolean;
}

const PricingTable = () => {
  const [tiers, setTiers] = useState<Tier[]>([
    { id: 1, name: "Starter", price: "29", period: "/mo", features: "5 users\n1 GB storage\nEmail support", highlighted: false },
    { id: 2, name: "Pro", price: "79", period: "/mo", features: "25 users\n10 GB storage\nPriority support\nAdvanced analytics", highlighted: true },
    { id: 3, name: "Enterprise", price: "199", period: "/mo", features: "Unlimited users\n100 GB storage\nDedicated CSM\nCustom integrations\nSLA guarantee", highlighted: false },
  ]);
  const [copied, setCopied] = useState(false);

  const update = (id: number, field: keyof Tier, value: string | boolean) => setTiers(tiers.map((t) => t.id === id ? { ...t, [field]: value } : t));
  const addTier = () => { if (tiers.length < 4) setTiers([...tiers, { id: Date.now(), name: "New Tier", price: "0", period: "/mo", features: "", highlighted: false }]); };
  const removeTier = (id: number) => { if (tiers.length > 1) setTiers(tiers.filter((t) => t.id !== id)); };

  const html = `<div style="display:flex;gap:24px;font-family:sans-serif;">\n${tiers.map((t) => {
    const feats = t.features.split("\n").filter(Boolean).map((f) => `    <li style="padding:4px 0">${f}</li>`).join("\n");
    return `  <div style="flex:1;border:${t.highlighted ? "2px solid #10b981" : "1px solid #e5e7eb"};border-radius:12px;padding:24px;${t.highlighted ? "box-shadow:0 4px 12px rgba(16,185,129,0.15);" : ""}">\n    <h3 style="font-size:18px;margin:0 0 4px">${t.name}</h3>\n    <p style="font-size:32px;font-weight:700;margin:8px 0">$${t.price}<span style="font-size:14px;font-weight:400;color:#888">${t.period}</span></p>\n    ${t.highlighted ? '<p style="background:#10b981;color:#fff;padding:4px 12px;border-radius:99px;display:inline-block;font-size:12px;margin-bottom:12px">Recommended</p>' : ""}\n    <ul style="list-style:none;padding:0;margin:16px 0">\n${feats}\n    </ul>\n  </div>`;
  }).join("\n")}\n</div>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="Pricing Table Generator" description="Build a clean pricing table and copy as HTML." accentColor="bg-proposal">
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {tiers.map((tier) => (
              <Card key={tier.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Input className="font-semibold w-40" value={tier.name} onChange={(e) => update(tier.id, "name", e.target.value)} />
                    <Button variant="ghost" size="icon" onClick={() => removeTier(tier.id)} disabled={tiers.length <= 1}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1"><Label className="text-xs">Price</Label><Input value={tier.price} onChange={(e) => update(tier.id, "price", e.target.value)} /></div>
                    <div className="w-20"><Label className="text-xs">Period</Label><Input value={tier.period} onChange={(e) => update(tier.id, "period", e.target.value)} /></div>
                  </div>
                  <div><Label className="text-xs">Features (one per line)</Label><Textarea rows={3} value={tier.features} onChange={(e) => update(tier.id, "features", e.target.value)} /></div>
                  <div className="flex items-center gap-2"><Switch checked={tier.highlighted} onCheckedChange={(v) => update(tier.id, "highlighted", v)} /><Label className="text-xs">Recommended</Label></div>
                </CardContent>
              </Card>
            ))}
            {tiers.length < 4 && <Button variant="outline" onClick={addTier}><Plus className="h-4 w-4 mr-1" /> Add Tier</Button>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Preview</h3>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <><Check className="h-4 w-4 mr-1 text-green-600" /> Copied!</> : <><Copy className="h-4 w-4 mr-1" /> Copy HTML</>}
              </Button>
            </div>
            <div className="rounded-lg border bg-card p-6" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default PricingTable;
