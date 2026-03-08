import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "../CopyButton";
import type { SalesKitResult, PitchType } from "../types";

function PitchCard({ title, pitch }: { title: string; pitch: PitchType }) {
  const full = `Hook: ${pitch.hook}\nProblem: ${pitch.problem}\nSolution: ${pitch.solution}\nProof: ${pitch.proof}\nCTA: ${pitch.cta}`;
  return (
    <Card>
      <CardHeader className="pb-2 flex-row items-center justify-between">
        <CardTitle className="text-sm">{title}</CardTitle>
        <CopyButton text={full} />
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {(["hook", "problem", "solution", "proof", "cta"] as const).map((key) => (
          <div key={key}>
            <span className="text-xs font-semibold text-muted-foreground uppercase">{key}</span>
            <p>{pitch[key]}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function PitchTab({ data }: { data: SalesKitResult }) {
  const smsLen = data.pitches.sms.length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <PitchCard title="🧡 Emotional" pitch={data.pitches.emotional} />
        <PitchCard title="🧠 Logical" pitch={data.pitches.logical} />
        <PitchCard title="⏰ Urgency" pitch={data.pitches.urgency} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm">SMS Template</CardTitle>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${smsLen > 160 ? "text-destructive" : "text-muted-foreground"}`}>{smsLen}/160</span>
              <CopyButton text={data.pitches.sms} />
            </div>
          </CardHeader>
          <CardContent><p className="text-sm">{data.pitches.sms}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between">
            <CardTitle className="text-sm">WhatsApp Message</CardTitle>
            <CopyButton text={data.pitches.whatsapp} />
          </CardHeader>
          <CardContent><p className="text-sm whitespace-pre-wrap">{data.pitches.whatsapp}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
