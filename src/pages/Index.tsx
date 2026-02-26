import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  Mail,
  ListOrdered,
  Target,
  ShieldCheck,
  AtSign,
  Percent,
  Sparkles,
  Trophy,
  BarChart3,
  Gauge,
  Zap,
  User,
  UserPlus,
  FileText,
  CalendarDays,
  DollarSign,
  ClipboardList,
  ScrollText,
  Swords,
  Search,
  Github,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const categories = ["All", "Calculators", "Email & Outreach", "Prospecting", "Docs", "Pipeline", "LinkedIn", "Proposals"] as const;
type Category = (typeof categories)[number];

interface Tool {
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  category: Category;
  color: string;
  borderColor: string;
}

const tools: Tool[] = [
  { name: "Commission Calculator", description: "Calculate rep earnings across multi-tier commission structures.", icon: Calculator, path: "/commission", category: "Calculators", color: "text-calc", borderColor: "border-calc" },
  { name: "ROI Calculator", description: "Generate a shareable ROI summary with payback period for proposals.", icon: TrendingUp, path: "/roi", category: "Calculators", color: "text-calc", borderColor: "border-calc" },
  { name: "Discount Calculator", description: "Calculate discount impact on revenue and protect your margins.", icon: Percent, path: "/discount", category: "Calculators", color: "text-calc", borderColor: "border-calc" },
  { name: "Cold Email Generator", description: "Get 2-3 personalized cold email variations for any scenario.", icon: Mail, path: "/cold-email", category: "Email & Outreach", color: "text-email", borderColor: "border-email" },
  { name: "Follow-up Sequence Builder", description: "Build a multi-step email sequence with timing and templates.", icon: ListOrdered, path: "/sequence", category: "Email & Outreach", color: "text-email", borderColor: "border-email" },
  { name: "ICP Builder", description: "Define your ideal customer profile and export it as a document.", icon: Target, path: "/icp", category: "Prospecting", color: "text-prospect", borderColor: "border-prospect" },
  { name: "Objection Handler", description: "Browse common objections with proven response frameworks.", icon: ShieldCheck, path: "/objections", category: "Prospecting", color: "text-prospect", borderColor: "border-prospect" },
  { name: "AI Prompt Templates", description: "Pre-built sales prompts to customize and paste into any AI tool.", icon: Sparkles, path: "/prompts", category: "Prospecting", color: "text-prospect", borderColor: "border-prospect" },
  { name: "Email Signature Generator", description: "Create a professional HTML email signature in seconds.", icon: AtSign, path: "/signature", category: "Docs", color: "text-docs", borderColor: "border-docs" },
  { name: "Win Probability Calculator", description: "Estimate deal win probability with recommendations to improve odds.", icon: Trophy, path: "/win-probability", category: "Pipeline", color: "text-pipeline", borderColor: "border-pipeline" },
  { name: "Pipeline Health Checker", description: "Assess pipeline coverage, stage balance, and risk flags.", icon: BarChart3, path: "/pipeline-health", category: "Pipeline", color: "text-pipeline", borderColor: "border-pipeline" },
  { name: "Quota Attainment Tracker", description: "Track quota progress, run rate, and pace projection.", icon: Gauge, path: "/quota-tracker", category: "Pipeline", color: "text-pipeline", borderColor: "border-pipeline" },
  { name: "Sales Velocity Calculator", description: "Calculate revenue per day and see the impact of improving each lever.", icon: Zap, path: "/sales-velocity", category: "Pipeline", color: "text-pipeline", borderColor: "border-pipeline" },
  { name: "LinkedIn Headline Generator", description: "Generate compelling LinkedIn headlines that attract your target audience.", icon: User, path: "/linkedin-headline", category: "LinkedIn", color: "text-linkedin", borderColor: "border-linkedin" },
  { name: "Connection Request Writer", description: "Personalized LinkedIn connection requests under 300 characters.", icon: UserPlus, path: "/connection-request", category: "LinkedIn", color: "text-linkedin", borderColor: "border-linkedin" },
  { name: "LinkedIn Post Generator", description: "Generate formatted posts with hooks, body, and CTA.", icon: FileText, path: "/linkedin-post", category: "LinkedIn", color: "text-linkedin", borderColor: "border-linkedin" },
  { name: "Social Selling Sequence", description: "Build a multi-touch social selling plan with timed actions.", icon: CalendarDays, path: "/social-sequence", category: "LinkedIn", color: "text-linkedin", borderColor: "border-linkedin" },
  { name: "Pricing Table Generator", description: "Build a clean pricing table and copy as HTML.", icon: DollarSign, path: "/pricing-table", category: "Proposals", color: "text-proposal", borderColor: "border-proposal" },
  { name: "Proposal Outline Builder", description: "Generate a structured proposal outline. Copy or download.", icon: ClipboardList, path: "/proposal-outline", category: "Proposals", color: "text-proposal", borderColor: "border-proposal" },
  { name: "SOW Generator", description: "Generate a formatted Statement of Work document.", icon: ScrollText, path: "/sow-generator", category: "Proposals", color: "text-proposal", borderColor: "border-proposal" },
  { name: "Battle Card Creator", description: "Build competitive battle cards with talk tracks.", icon: Swords, path: "/battle-card", category: "Proposals", color: "text-proposal", borderColor: "border-proposal" },
];

const Index = () => {
  const [active, setActive] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const filtered = tools.filter((t) => {
    const matchesCategory = active === "All" || t.category === active;
    const matchesSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b">
        <div className="container max-w-5xl py-16 md:py-24">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-3">
            Open-source · 100% client-side · No data stored
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.1]">
            Free Sales Tools to<br />Close More Deals
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-lg">
            A collection of fast, privacy-first tools built for modern sales reps. No sign-ups, no tracking — just results.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-card text-sm font-medium hover:bg-secondary transition-colors"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Tools */}
      <main className="container max-w-5xl py-10">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`group relative rounded-lg border-l-4 ${tool.borderColor} bg-card p-5 shadow-sm hover:shadow-md transition-shadow`}
            >
              <tool.icon className={`h-5 w-5 ${tool.color} mb-3`} />
              <h3 className="font-display font-semibold text-card-foreground">{tool.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-8">No tools found matching "{search}"</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container max-w-5xl py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">CloserKit</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <span>Free &amp; open-source</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
