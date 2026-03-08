import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "../CopyButton";
import type { SalesKitResult } from "../types";

export default function KeywordsTab({ data }: { data: SalesKitResult }) {
  const k = data.keywords;
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Primary Keywords</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1">
            {k.primary.map((w, i) => <Badge key={i} variant="secondary" className="text-xs">{w}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Long-Tail Keywords</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1">
            {k.longTail.map((w, i) => <Badge key={i} variant="outline" className="text-xs">{w}</Badge>)}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Negative Keywords</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-1">
          {k.negative.map((w, i) => <Badge key={i} variant="destructive" className="text-[10px]">{w}</Badge>)}
        </CardContent>
      </Card>

      {/* Meta */}
      <Card>
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <CardTitle className="text-sm">SEO Meta Tags</CardTitle>
          <CopyButton text={`<title>${k.metaTitle}</title>\n<meta name="description" content="${k.metaDescription}" />`} />
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div><p className="text-xs text-muted-foreground">Title</p><p className="font-medium">{k.metaTitle}</p></div>
          <div><p className="text-xs text-muted-foreground">Description</p><p>{k.metaDescription}</p></div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Blog Title Ideas</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">{k.blogTitles.map((t, i) => <li key={i}>{i + 1}. {t}</li>)}</ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">YouTube Title Ideas</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">{k.youtubeTitles.map((t, i) => <li key={i}>{i + 1}. {t}</li>)}</ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
