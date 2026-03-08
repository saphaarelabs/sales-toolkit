import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CopyButton from "../CopyButton";
import type { SalesKitResult } from "../types";

export default function B2BTab({ data }: { data: SalesKitResult }) {
  const b = data.b2b;
  return (
    <div className="space-y-6">
      {/* Prospect Data */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Industries</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1">
            {b.industries.map((ind, i) => <Badge key={i} variant="secondary" className="text-xs">{ind}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Job Titles to Contact</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-1">
            {b.jobTitles.map((t, i) => <Badge key={i} variant="outline" className="text-xs">{t}</Badge>)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 text-sm">
        <div className="p-4 border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Company Size</p>
          <p className="font-medium">{b.companySize}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Estimated Leads</p>
          <p className="font-medium">{b.estimatedLeads}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">LinkedIn Filters</p>
          <p className="font-medium">{b.linkedinFilters}</p>
        </div>
      </div>

      {/* Cold Email Sequence */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Cold Email Sequence</h3>
        <div className="space-y-3">
          {b.coldEmailSequence.map((email, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm">Day {email.day}: {email.subject}</CardTitle>
                <CopyButton text={`Subject: ${email.subject}\n\n${email.body}`} />
              </CardHeader>
              <CardContent><p className="text-sm whitespace-pre-wrap">{email.body}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* LinkedIn Messages */}
      <div>
        <h3 className="text-sm font-semibold mb-3">LinkedIn Messages</h3>
        <div className="space-y-3">
          {b.linkedinMessages.map((msg, i) => (
            <Card key={i}>
              <CardHeader className="pb-2 flex-row items-center justify-between">
                <CardTitle className="text-sm">Day {msg.day}</CardTitle>
                <CopyButton text={msg.message} />
              </CardHeader>
              <CardContent><p className="text-sm whitespace-pre-wrap">{msg.message}</p></CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cold Call Script */}
      <Card>
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <CardTitle className="text-sm">Cold Call Script</CardTitle>
          <CopyButton text={`Opener: ${b.coldCallScript.opener}\n\nPitch: ${b.coldCallScript.pitch}\n\nClose: ${b.coldCallScript.close}`} />
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div><p className="text-xs font-semibold text-muted-foreground">OPENER</p><p>{b.coldCallScript.opener}</p></div>
          <div><p className="text-xs font-semibold text-muted-foreground">PITCH</p><p>{b.coldCallScript.pitch}</p></div>
          {b.coldCallScript.objections.map((o, i) => (
            <div key={i} className="pl-3 border-l-2 border-destructive/30">
              <p className="text-xs text-destructive font-medium">"{o.objection}"</p>
              <p className="text-xs mt-1">{o.response}</p>
            </div>
          ))}
          <div><p className="text-xs font-semibold text-muted-foreground">CLOSE</p><p>{b.coldCallScript.close}</p></div>
        </CardContent>
      </Card>

      {/* Directories & Contact Sources */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Directories</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">{b.directories.map((d, i) => <li key={i}>• {d}</li>)}</ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Where to Find Contacts</CardTitle></CardHeader>
          <CardContent><p className="text-sm">{b.phoneNumbers}</p></CardContent>
        </Card>
      </div>
    </div>
  );
}
