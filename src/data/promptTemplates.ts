import { findPrompts } from "./prompts/findPrompts";
import { engagePrompts } from "./prompts/engagePrompts";
import { sellPrompts } from "./prompts/sellPrompts";
import { growPrompts } from "./prompts/growPrompts";

export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  type: "short" | "long";
  quickFills?: string[];
}

export const QUICK_FILLS = {
  industry: ["SaaS", "FinTech", "Healthcare", "Manufacturing", "Retail", "EdTech", "Cybersecurity"],
  role: ["VP of Sales", "CTO", "Head of Marketing", "CEO", "Director of Ops", "CFO", "CRO"],
  companySize: ["1-50", "51-200", "201-1000", "1001-5000", "5000+"],
  dealSize: ["$10K", "$25K", "$50K", "$100K", "$250K+"],
  timeframe: ["30 days", "60 days", "90 days", "This quarter", "This year"],
  painPoint: ["Cost reduction", "Revenue growth", "Efficiency", "Compliance", "Scalability"],
  competitor: ["Incumbent vendor", "Open-source alternative", "In-house solution", "Status quo"],
};

export type AITool = "Claude" | "ChatGPT" | "Cursor" | "Gemini";

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  phase: number;
  optimizedFor: AITool[];
  prompt: string;
  variables: PromptVariable[];
}

export const phaseCategories = [
  "Market Research & ICP",
  "Lead Generation",
  "Account Research",
  "Cold Outreach",
  "Follow-Up & Nurture",
  "Social Selling",
  "Discovery & Qualification",
  "Demo & Presentation",
  "Multi-Threading",
  "Objection Handling",
  "Proposals & Business Case",
  "Negotiation & Pricing",
  "Closing & Contracts",
  "Onboarding & Handoff",
  "Account Management",
  "Renewal & Retention",
  "Upsell & Cross-Sell",
  "Sales Leadership",
  "RevOps & Forecasting",
  "Personal Branding",
] as const;

export type PromptCategory = (typeof phaseCategories)[number];

export type MacroStage = "Find" | "Engage" | "Sell" | "Grow";

export interface MacroStageConfig {
  label: MacroStage;
  description: string;
  phases: number[];
  categories: PromptCategory[];
}

export const macroStages: MacroStageConfig[] = [
  {
    label: "Find",
    description: "Research, lead gen & account intel",
    phases: [1, 2, 3],
    categories: ["Market Research & ICP", "Lead Generation", "Account Research"],
  },
  {
    label: "Engage",
    description: "Outreach, follow-up & social selling",
    phases: [4, 5, 6],
    categories: ["Cold Outreach", "Follow-Up & Nurture", "Social Selling"],
  },
  {
    label: "Sell",
    description: "Discovery through closing",
    phases: [7, 8, 9, 10, 11, 12, 13],
    categories: ["Discovery & Qualification", "Demo & Presentation", "Multi-Threading", "Objection Handling", "Proposals & Business Case", "Negotiation & Pricing", "Closing & Contracts"],
  },
  {
    label: "Grow",
    description: "Post-sale, expansion & leadership",
    phases: [14, 15, 16, 17, 18, 19, 20],
    categories: ["Onboarding & Handoff", "Account Management", "Renewal & Retention", "Upsell & Cross-Sell", "Sales Leadership", "RevOps & Forecasting", "Personal Branding"],
  },
];

export const categoryColors: Record<string, string> = {
  "Market Research & ICP": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Lead Generation": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  "Account Research": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  "Cold Outreach": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "Follow-Up & Nurture": "bg-teal-500/10 text-teal-600 border-teal-500/20",
  "Social Selling": "bg-green-500/10 text-green-600 border-green-500/20",
  "Discovery & Qualification": "bg-amber-500/10 text-amber-600 border-amber-500/20",
  "Demo & Presentation": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "Multi-Threading": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  "Objection Handling": "bg-red-500/10 text-red-600 border-red-500/20",
  "Proposals & Business Case": "bg-rose-500/10 text-rose-600 border-rose-500/20",
  "Negotiation & Pricing": "bg-pink-500/10 text-pink-600 border-pink-500/20",
  "Closing & Contracts": "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20",
  "Onboarding & Handoff": "bg-violet-500/10 text-violet-600 border-violet-500/20",
  "Account Management": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Renewal & Retention": "bg-sky-500/10 text-sky-600 border-sky-500/20",
  "Upsell & Cross-Sell": "bg-lime-500/10 text-lime-600 border-lime-500/20",
  "Sales Leadership": "bg-slate-500/10 text-slate-600 border-slate-500/20",
  "RevOps & Forecasting": "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
  "Personal Branding": "bg-stone-500/10 text-stone-600 border-stone-500/20",
};

// Legacy exports for backward compatibility
export const promptCategories = ["All", ...phaseCategories] as const;

export const templates: PromptTemplate[] = [
  ...findPrompts,
  ...engagePrompts,
  ...sellPrompts,
  ...growPrompts,
];
