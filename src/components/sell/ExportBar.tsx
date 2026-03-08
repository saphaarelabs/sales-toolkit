import { Download, FileText, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import CopyButton from "./CopyButton";
import type { SalesKitResult } from "./types";

function downloadText(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ExportBar({ data }: { data: SalesKitResult }) {
  const fullText = JSON.stringify(data, null, 2);

  const exportEmails = () => {
    let txt = "EMAIL TEMPLATES\n\n";
    if (data.b2b?.coldEmailSequence) {
      txt += "--- B2B Cold Emails ---\n\n";
      data.b2b.coldEmailSequence.forEach((e) => {
        txt += `Day ${e.day}\nSubject: ${e.subject}\n\n${e.body}\n\n---\n\n`;
      });
    }
    if (data.b2c?.emailTemplates) {
      txt += "--- B2C Email Templates ---\n\n";
      data.b2c.emailTemplates.forEach((e) => {
        txt += `[${e.type}]\nSubject: ${e.subject}\n\n${e.body}\n\n---\n\n`;
      });
    }
    downloadText(txt, "email-templates.txt");
  };

  const exportCSV = () => {
    const rows = [["Industry", "Job Title", "Company Size", "LinkedIn Filters"]];
    data.b2b?.industries.forEach((ind) => {
      data.b2b?.jobTitles.forEach((jt) => {
        rows.push([ind, jt, data.b2b?.companySize || "", data.b2b?.linkedinFilters || ""]);
      });
    });
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    downloadText(csv, "b2b-prospects.csv");
  };

  return (
    <div className="flex flex-wrap gap-2 p-3 rounded-lg border bg-secondary/30">
      <CopyButton text={fullText} label="Copy All" />
      <Button variant="outline" size="sm" onClick={() => window.print()} className="h-7 text-xs gap-1">
        <Download className="h-3 w-3" /> PDF (Print)
      </Button>
      {(data.marketType === "B2B" || data.marketType === "Both") && (
        <Button variant="outline" size="sm" onClick={exportCSV} className="h-7 text-xs gap-1">
          <Table className="h-3 w-3" /> B2B CSV
        </Button>
      )}
      <Button variant="outline" size="sm" onClick={exportEmails} className="h-7 text-xs gap-1">
        <FileText className="h-3 w-3" /> Emails .txt
      </Button>
    </div>
  );
}
