import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  type: "short" | "long";
}

interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  variables: PromptVariable[];
}

const templates: PromptTemplate[] = [
  {
    id: "competitor-research",
    title: "Competitor Research & White Space Finder",
    description: "Deep competitor analysis with positioning gaps and market white space — better than hiring a researcher.",
    category: "Prospecting",
    prompt: `Analyze these competitors in [INDUSTRY]: [COMPETITORS]

For each:
1. What's their actual positioning? (not what they say — what customers believe)
2. Pricing model + who they're optimized for
3. Biggest weakness based on public reviews (G2, Reddit, Twitter)
4. What customer segment are they ignoring?

Then: Map all competitors on a 2x2 matrix. You pick the two axes that reveal the biggest gap in the market.

Tell me where the white space is and what positioning would let me win it.`,
    variables: [
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. CRM software, B2B SaaS", type: "short" },
      { key: "COMPETITORS", label: "Competitors (5-7)", placeholder: "e.g. Salesforce, HubSpot, Pipedrive, Close, Freshsales", type: "long" },
    ],
  },
  {
    id: "discovery-questions",
    title: "Discovery Call Question Generator",
    description: "Generate tailored discovery questions based on the prospect's role, industry, and pain points.",
    category: "Prospecting",
    prompt: `I'm preparing for a discovery call with a [ROLE] at a [COMPANY_TYPE] company in the [INDUSTRY] industry. They currently use [CURRENT_SOLUTION] and their main challenge is [PAIN_POINT].

Generate 15 discovery questions organized into these categories:
1. Situation questions (understand their current state)
2. Problem questions (uncover pain depth)
3. Implication questions (quantify the cost of inaction)
4. Need-payoff questions (help them see the value of change)

Make the questions conversational, not interrogative. Include follow-up prompts for each question.`,
    variables: [
      { key: "ROLE", label: "Prospect's Role", placeholder: "e.g. VP of Sales, CTO", type: "short" },
      { key: "COMPANY_TYPE", label: "Company Type", placeholder: "e.g. mid-market, enterprise, startup", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech, healthcare", type: "short" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. spreadsheets, Competitor X", type: "short" },
      { key: "PAIN_POINT", label: "Main Pain Point", placeholder: "e.g. slow pipeline velocity, low conversion rates", type: "short" },
    ],
  },
  {
    id: "proposal-draft",
    title: "Proposal / Executive Summary Writer",
    description: "Generate a polished executive summary for your proposal based on discovery call notes.",
    category: "Docs",
    prompt: `Based on the following discovery call notes, write a professional executive summary for a proposal.

Company: [COMPANY_NAME]
Contact: [CONTACT_NAME], [CONTACT_ROLE]
Industry: [INDUSTRY]

Discovery notes:
[DISCOVERY_NOTES]

Our solution: [YOUR_SOLUTION]
Pricing: [PRICING]

Write the executive summary with these sections:
1. Current Situation & Challenges
2. Desired Outcomes
3. Recommended Solution
4. Expected ROI / Business Impact
5. Investment & Next Steps

Tone: professional but not stiff. Make it about THEM, not us.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CONTACT_NAME", label: "Contact Name", placeholder: "e.g. Sarah Johnson", type: "short" },
      { key: "CONTACT_ROLE", label: "Contact Role", placeholder: "e.g. VP of Operations", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. manufacturing", type: "short" },
      { key: "DISCOVERY_NOTES", label: "Discovery Call Notes", placeholder: "Paste your notes from the call...", type: "long" },
      { key: "YOUR_SOLUTION", label: "Your Solution (brief)", placeholder: "e.g. AI-powered inventory management platform", type: "short" },
      { key: "PRICING", label: "Pricing", placeholder: "e.g. $2,500/mo for team plan", type: "short" },
    ],
  },
  {
    id: "linkedin-outreach",
    title: "LinkedIn Outreach Messages",
    description: "Generate 3 personalized LinkedIn connection/message variations for a target prospect.",
    category: "Email & Outreach",
    prompt: `Write 3 LinkedIn outreach message variations for the following prospect:

Name: [PROSPECT_NAME]
Role: [PROSPECT_ROLE]
Company: [PROSPECT_COMPANY]
Something notable about them: [NOTABLE_THING]
What I sell: [YOUR_PRODUCT]
Why it's relevant to them: [RELEVANCE]

For each variation, use a different approach:
1. The "mutual interest" angle — lead with something you genuinely have in common
2. The "insight" angle — share a relevant data point or observation about their industry
3. The "direct" angle — be upfront about why you're reaching out, but make it about them

Rules:
- Under 300 characters for connection requests, under 500 for InMails
- No cringe, no fake flattery, no "I noticed you're a leader in…"
- Sound like a real human, not a sales bot`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. Head of Revenue", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "NOTABLE_THING", label: "Something Notable", placeholder: "e.g. recently posted about scaling SDR teams", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "RELEVANCE", label: "Why It's Relevant", placeholder: "e.g. they're hiring 20 SDRs and need onboarding automation", type: "long" },
    ],
  },
  {
    id: "deal-review",
    title: "Deal Strategy Advisor",
    description: "Get an AI analysis of your deal with recommendations on how to move it forward.",
    category: "Prospecting",
    prompt: `Act as a seasoned sales strategist. Review this deal and give me actionable advice.

Deal details:
- Company: [COMPANY]
- Deal size: [DEAL_SIZE]
- Stage: [STAGE]
- Champion: [CHAMPION]
- Economic buyer: [BUYER]
- Timeline: [TIMELINE]
- Competition: [COMPETITION]
- Main objection/blocker: [BLOCKER]

Additional context:
[CONTEXT]

Analyze:
1. Deal health score (1-10) with reasoning
2. Top 3 risks and how to mitigate each
3. What information am I missing? (questions I should ask)
4. Suggested next 3 actions in priority order
5. If this deal is at risk, what's my recovery play?

Be direct and specific. No generic advice.`,
    variables: [
      { key: "COMPANY", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $85K ARR", type: "short" },
      { key: "STAGE", label: "Stage", placeholder: "e.g. Proposal sent, awaiting legal review", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, Director of Ops — strong internal advocate", type: "short" },
      { key: "BUYER", label: "Economic Buyer", placeholder: "e.g. CFO — haven't met yet", type: "short" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. Q1 decision, budget allocated", type: "short" },
      { key: "COMPETITION", label: "Competition", placeholder: "e.g. evaluating us vs. Competitor X", type: "short" },
      { key: "BLOCKER", label: "Main Blocker", placeholder: "e.g. legal team slow, CFO wants more ROI data", type: "short" },
      { key: "CONTEXT", label: "Additional Context", placeholder: "Any other relevant details about the deal...", type: "long" },
    ],
  },
  {
    id: "breakup-email",
    title: "Breakup Email Sequence",
    description: "Create a 3-part breakup email sequence for prospects who've gone silent.",
    category: "Email & Outreach",
    prompt: `Write a 3-part breakup email sequence for a prospect who has gone silent.

Context:
- Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
- What we discussed: [DISCUSSION_SUMMARY]
- Last contact: [LAST_CONTACT]
- How many follow-ups already sent: [FOLLOWUP_COUNT]

Write 3 emails:
1. Email 1 (Day 1): The "gentle nudge" — assume positive intent, offer value
2. Email 2 (Day 4): The "pattern interrupt" — try a completely different angle or format
3. Email 3 (Day 7): The "permission to close" — give them an easy out

Rules:
- Short (under 100 words each)
- No guilt-tripping or passive-aggressive tone
- Each email should work standalone
- Include subject lines`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Jordan", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. TechCo", type: "short" },
      { key: "DISCUSSION_SUMMARY", label: "What You Discussed", placeholder: "e.g. demo of our analytics platform, they liked the reporting features", type: "long" },
      { key: "LAST_CONTACT", label: "Last Contact", placeholder: "e.g. 2 weeks ago, after demo", type: "short" },
      { key: "FOLLOWUP_COUNT", label: "Follow-ups Already Sent", placeholder: "e.g. 2", type: "short" },
    ],
  },
];

const categoryColors: Record<string, string> = {
  Prospecting: "bg-prospect/10 text-prospect border-prospect/20",
  "Email & Outreach": "bg-email/10 text-email border-email/20",
  Docs: "bg-docs/10 text-docs border-docs/20",
};

const PromptTemplates = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(expandedId === id ? null : id);

  const setValue = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
  };

  const buildPrompt = (template: PromptTemplate) => {
    let result = template.prompt;
    template.variables.forEach((v) => {
      const val = values[template.id]?.[v.key] || `[${v.key}]`;
      result = result.split(`[${v.key}]`).join(val);
    });
    return result;
  };

  const copyPrompt = (template: PromptTemplate) => {
    navigator.clipboard.writeText(buildPrompt(template));
    setCopiedId(template.id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allFilled = (template: PromptTemplate) =>
    template.variables.every((v) => values[template.id]?.[v.key]?.trim());

  return (
    <ToolLayout
      title="AI Prompt Templates"
      description="Pre-built sales prompts you can customize and copy into Claude, ChatGPT, or any AI tool."
      accentColor="bg-prospect"
    >
      <div className="space-y-4">
        {templates.map((template) => {
          const isOpen = expandedId === template.id;
          return (
            <div
              key={template.id}
              className="rounded-lg border bg-card overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => toggle(template.id)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <Sparkles className="h-5 w-5 text-prospect mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-display font-semibold text-card-foreground">
                      {template.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[template.category] || ""}`}
                    >
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                )}
              </button>

              {/* Expanded */}
              {isOpen && (
                <div className="border-t px-5 pb-5">
                  {/* Variables */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-5">
                    {template.variables.map((v) => (
                      <div
                        key={v.key}
                        className={v.type === "long" ? "sm:col-span-2" : ""}
                      >
                        <label className="text-sm font-medium text-foreground mb-1.5 block">
                          {v.label}
                        </label>
                        {v.type === "long" ? (
                          <Textarea
                            placeholder={v.placeholder}
                            value={values[template.id]?.[v.key] || ""}
                            onChange={(e) =>
                              setValue(template.id, v.key, e.target.value)
                            }
                            rows={3}
                          />
                        ) : (
                          <Input
                            placeholder={v.placeholder}
                            value={values[template.id]?.[v.key] || ""}
                            onChange={(e) =>
                              setValue(template.id, v.key, e.target.value)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="mt-5">
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Preview
                    </label>
                    <pre className="whitespace-pre-wrap text-sm bg-muted/50 border rounded-md p-4 text-foreground leading-relaxed max-h-64 overflow-y-auto font-sans">
                      {buildPrompt(template)}
                    </pre>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-3">
                    <Button onClick={() => copyPrompt(template)} className="gap-2">
                      {copiedId === template.id ? (
                        <>
                          <Check className="h-4 w-4" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" /> Copy Prompt
                        </>
                      )}
                    </Button>
                    {!allFilled(template) && (
                      <p className="text-xs text-muted-foreground self-center">
                        Tip: Fill in all fields for a ready-to-use prompt
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
};

export default PromptTemplates;
