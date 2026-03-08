export type Mode = "coach" | "email" | "deal" | "autofill";
export type Msg = { role: "user" | "assistant"; content: string };

export const modes: {
  id: Mode;
  label: string;
  icon: string;
  description: string;
  placeholder: string;
  gradient: string;
  border: string;
  suggestions: string[];
}[] = [
  {
    id: "coach",
    label: "Sales Coach",
    icon: "Sparkles",
    description: "Tactical advice on deals, calls & strategy",
    placeholder: "I have a discovery call tomorrow with a VP of Engineering at a Series B SaaS company. They're using a competitor but their contract renews in 60 days. How should I approach this?",
    gradient: "from-amber-500 to-orange-600",
    border: "border-amber-500/40",
    suggestions: ["Give me a call script", "What questions should I ask?", "How do I handle price objections?"],
  },
  {
    id: "email",
    label: "Email Writer",
    icon: "Mail",
    description: "Cold emails that actually get replies",
    placeholder: "Write a cold email to Sarah Chen, CTO at Acme Corp (200 employees, fintech). They just raised Series B and are scaling their engineering team. I sell developer productivity tools.",
    gradient: "from-blue-500 to-cyan-600",
    border: "border-blue-500/40",
    suggestions: ["Make it shorter", "Add a P.S. line", "More casual tone"],
  },
  {
    id: "deal",
    label: "Deal Analyzer",
    icon: "TrendingUp",
    description: "Win probability, risk flags & next steps",
    placeholder: "Deal: $85K ACV with a mid-market healthcare company. Champion is the Director of IT. We've done 2 demos. They said budget is approved but I haven't spoken to the CFO. Competition is their current vendor. Timeline is 'this quarter'.",
    gradient: "from-emerald-500 to-green-600",
    border: "border-emerald-500/40",
    suggestions: ["What are the red flags?", "Draft a follow-up plan", "How do I multi-thread?"],
  },
  {
    id: "autofill",
    label: "Prospect Research",
    icon: "Search",
    description: "Company analysis & structured sales intel",
    placeholder: "Research Stripe for me. I'm selling a compliance automation tool.",
    gradient: "from-purple-500 to-violet-600",
    border: "border-purple-500/40",
    suggestions: ["Find their pain points", "Who should I target?", "Draft an outreach plan"],
  },
];
