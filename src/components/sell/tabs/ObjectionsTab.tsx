import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "../CopyButton";
import type { SalesKitResult } from "../types";

export default function ObjectionsTab({ data }: { data: SalesKitResult }) {
  return (
    <div className="space-y-4">
      {data.objections.map((obj, i) => (
        <Card key={i}>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm">"{obj.objection}"</CardTitle>
            <CopyButton text={`Objection: ${obj.objection}\n\nPsychology: ${obj.psychology}\n\nSoft: ${obj.softResponse}\n\nAssertive: ${obj.assertiveResponse}\n\nClose: ${obj.closingLine}`} />
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="p-2 rounded bg-secondary/50 text-xs">
              <span className="font-semibold">Psychology:</span> {obj.psychology}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 rounded border border-blue-500/20 bg-blue-500/5">
                <p className="text-xs font-semibold text-blue-600 mb-1">Soft Response</p>
                <p className="text-xs">{obj.softResponse}</p>
              </div>
              <div className="p-3 rounded border border-orange-500/20 bg-orange-500/5">
                <p className="text-xs font-semibold text-orange-600 mb-1">Assertive Response</p>
                <p className="text-xs">{obj.assertiveResponse}</p>
              </div>
            </div>
            <p className="text-xs"><strong>Closing line:</strong> {obj.closingLine}</p>
          </CardContent>
        </Card>
      ))}

      <div className="pt-4 border-t">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          🖨️ Print as Cheat Sheet
        </button>
      </div>
    </div>
  );
}
