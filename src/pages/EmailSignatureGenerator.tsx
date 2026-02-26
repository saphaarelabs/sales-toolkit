import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

const EmailSignatureGenerator = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [copied, setCopied] = useState(false);

  const hasData = name || title || company;

  const html = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a2e;">
  <tr>
    <td style="padding-right:16px;border-right:2px solid #2a9d8f;">
      <strong style="font-size:16px;color:#1a1a2e;">${name || "Your Name"}</strong><br/>
      <span style="color:#555;font-size:13px;">${title || "Title"}${company ? ` · ${company}` : ""}</span><br/>
      ${phone ? `<span style="font-size:12px;color:#777;">📞 ${phone}</span><br/>` : ""}
      ${email ? `<a href="mailto:${email}" style="font-size:12px;color:#2a9d8f;text-decoration:none;">✉ ${email}</a><br/>` : ""}
      ${website ? `<a href="${website}" style="font-size:12px;color:#2a9d8f;text-decoration:none;">🌐 ${website}</a><br/>` : ""}
    </td>
  </tr>
  ${linkedin || twitter ? `<tr><td style="padding-top:8px;">
    ${linkedin ? `<a href="${linkedin}" style="font-size:12px;color:#2a9d8f;text-decoration:none;margin-right:12px;">LinkedIn</a>` : ""}
    ${twitter ? `<a href="${twitter}" style="font-size:12px;color:#2a9d8f;text-decoration:none;">Twitter</a>` : ""}
  </td></tr>` : ""}
</table>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout title="Email Signature Generator" description="Create a professional HTML email signature and copy it to any email client." accentColor="bg-docs">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Jane Smith" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Title</Label>
            <Input placeholder="Account Executive" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Company</Label>
            <Input placeholder="Acme Corp" value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input placeholder="+1 (555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Email</Label>
            <Input placeholder="jane@acme.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Website</Label>
            <Input placeholder="https://acme.com" value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input placeholder="https://linkedin.com/in/janesmith" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>Twitter URL</Label>
            <Input placeholder="https://twitter.com/janesmith" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="mt-1.5" />
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Preview</CardTitle>
              {hasData && (
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied HTML" : "Copy HTML"}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-background" dangerouslySetInnerHTML={{ __html: html }} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
};

export default EmailSignatureGenerator;
