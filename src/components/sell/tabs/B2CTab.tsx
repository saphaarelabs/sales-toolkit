import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "../CopyButton";
import type { SalesKitResult } from "../types";

export default function B2CTab({ data }: { data: SalesKitResult }) {
  const c = data.b2c;
  return (
    <div className="space-y-6">
      {/* Platforms */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Digital Platforms</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.platforms.map((p, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm">{p.name}</CardTitle>
                <CopyButton text={p.adCopy} />
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div><p className="text-xs text-muted-foreground">Ad Copy</p><p>{p.adCopy}</p></div>
                <div><p className="text-xs text-muted-foreground">Targeting</p><p>{p.targetingSettings}</p></div>
                <div className="flex gap-4 text-xs">
                  <span><strong>Best time:</strong> {p.bestPostingTime}</span>
                  <span><strong>Contact:</strong> {p.contactMethod}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Email Templates */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Email Templates</h3>
        <div className="space-y-3">
          {c.emailTemplates.map((tpl, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm">{tpl.type}: {tpl.subject}</CardTitle>
                <CopyButton text={`Subject: ${tpl.subject}\n\n${tpl.body}`} />
              </CardHeader>
              <CardContent><p className="text-sm whitespace-pre-wrap">{tpl.body}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Marketplaces */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Marketplace Listings</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.marketplaces.map((m, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm">{m.platform}</CardTitle>
                <CopyButton text={`${m.title}\n\n${m.description}`} />
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-medium">{m.title}</p>
                <p>{m.description}</p>
                <div className="flex flex-wrap gap-1">
                  {m.tags.map((tag, j) => <Badge key={j} variant="secondary" className="text-[10px]">{tag}</Badge>)}
                </div>
                <p className="text-xs text-muted-foreground">💡 {m.pricingTip}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Offline Channels */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Offline Channels</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.offlineChannels.map((ch, i) => (
            <Card key={i}>
              <CardHeader className="pb-2"><CardTitle className="text-sm">{ch.channel}</CardTitle></CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><strong>Location:</strong> {ch.location}</p>
                <p><strong>Script:</strong> {ch.script}</p>
                <p className="text-xs text-muted-foreground">{ch.contactInfo}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* WhatsApp & Cold Contact */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm">WhatsApp Broadcast</CardTitle>
            <CopyButton text={c.whatsappBroadcast} />
          </CardHeader>
          <CardContent><p className="text-sm whitespace-pre-wrap">{c.whatsappBroadcast}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Where to Find Buyers</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">{c.coldContactPlaces.map((p, i) => <li key={i}>• {p}</li>)}</ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
