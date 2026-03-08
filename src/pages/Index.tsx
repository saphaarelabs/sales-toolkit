import { Link, useNavigate } from "react-router-dom";
import {
  Calculator, TrendingUp, Mail, ListOrdered, Target, ShieldCheck, AtSign, Percent,
  Sparkles, Trophy, BarChart3, Gauge, Zap, User, UserPlus, FileText, CalendarDays,
  DollarSign, ClipboardList, ScrollText, Swords, Search, Github, BookOpen, ArrowRight, Brain, Bot,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const categories = ["All", "Calculators", "Email & Outreach", "Prospecting", "Pipeline", "LinkedIn", "Proposals", "Docs"] as const;
type Category = (typeof categories)[number];

interface Tool {
  name: string;
  description: string;
  icon: React.ElementType;
  path: string;
  category: Category;
}

const tools: Tool[] = [
  { name: "Commission Calculator", description: "Calculate rep earnings across multi-tier commission structures.", icon: Calculator, path: "/commission", category: "Calculators" },
  { name: "ROI Calculator", description: "Generate a shareable ROI summary with payback period.", icon: TrendingUp, path: "/roi", category: "Calculators" },
  { name: "Discount Calculator", description: "Calculate discount impact on revenue and protect margins.", icon: Percent, path: "/discount", category: "Calculators" },
  { name: "Cold Email Generator", description: "Get personalized cold email variations for any scenario.", icon: Mail, path: "/cold-email", category: "Email & Outreach" },
  { name: "Follow-up Sequence Builder", description: "Build a multi-step email sequence with timing and templates.", icon: ListOrdered, path: "/sequence", category: "Email & Outreach" },
  { name: "ICP Builder", description: "Define your ideal customer profile and export it.", icon: Target, path: "/icp", category: "Prospecting" },
  { name: "Objection Handler", description: "Browse common objections with proven response frameworks.", icon: ShieldCheck, path: "/objections", category: "Prospecting" },
  { name: "Email Signature Generator", description: "Create a professional HTML email signature in seconds.", icon: AtSign, path: "/signature", category: "Docs" },
  { name: "Win Probability Calculator", description: "Estimate deal win probability with improvement tips.", icon: Trophy, path: "/win-probability", category: "Pipeline" },
  { name: "Pipeline Health Checker", description: "Assess pipeline coverage, stage balance, and risk flags.", icon: BarChart3, path: "/pipeline-health", category: "Pipeline" },
  { name: "Quota Attainment Tracker", description: "Track quota progress, run rate, and pace projection.", icon: Gauge, path: "/quota-tracker", category: "Pipeline" },
  { name: "Sales Velocity Calculator", description: "Calculate revenue per day and model improvements.", icon: Zap, path: "/sales-velocity", category: "Pipeline" },
  { name: "LinkedIn Headline Generator", description: "Generate compelling LinkedIn headlines for your audience.", icon: User, path: "/linkedin-headline", category: "LinkedIn" },
  { name: "Connection Request Writer", description: "Personalized LinkedIn requests under 300 characters.", icon: UserPlus, path: "/connection-request", category: "LinkedIn" },
  { name: "LinkedIn Post Generator", description: "Generate formatted posts with hooks, body, and CTA.", icon: FileText, path: "/linkedin-post", category: "LinkedIn" },
  { name: "Social Selling Sequence", description: "Build a multi-touch social selling plan with timed actions.", icon: CalendarDays, path: "/social-sequence", category: "LinkedIn" },
  { name: "Pricing Table Generator", description: "Build a clean pricing table and copy as HTML.", icon: DollarSign, path: "/pricing-table", category: "Proposals" },
  { name: "Proposal Outline Builder", description: "Generate a structured proposal outline.", icon: ClipboardList, path: "/proposal-outline", category: "Proposals" },
  { name: "SOW Generator", description: "Generate a formatted Statement of Work document.", icon: ScrollText, path: "/sow-generator", category: "Proposals" },
  { name: "Battle Card Creator", description: "Build competitive battle cards with talk tracks.", icon: Swords, path: "/battle-card", category: "Proposals" },
  { name: "AI Skills Library", description: "Copy-paste AI skills for coding agents and sales agents.", icon: Brain, path: "/skills", category: "Docs" },
  { name: "AI Sales Assistant", description: "AI-powered sales coach, email writer, deal analyzer, and prospect researcher.", icon: Bot, path: "/ai", category: "Prospecting" },
];

const featuredTools = [
  {
    name: "AI Sales Assistant",
    description: "Your AI-powered closing machine. Sales coach, cold email writer, deal analyzer, and prospect researcher — all in one chat interface.",
    icon: Bot,
    path: "/ai",
    stats: ["4 AI modes", "Real-time streaming", "Powered by Gemini"],
    gradient: "from-violet-500/15 to-purple-500/5",
  },
  {
    name: "Email Template Library",
    description: "The largest free collection of sales email templates. Cold outreach, follow-ups, breakups, referrals, expert frameworks — all with fill-in-the-blank personalization.",
    icon: BookOpen,
    path: "/email-templates",
    stats: ["165+ templates", "14 categories", "Expert frameworks"],
    gradient: "from-primary/10 to-primary/5",
  },
  {
    name: "AI Prompt Templates",
    description: "Pre-built prompts for ChatGPT, Claude, and any AI tool. Research prospects, draft proposals, handle objections — paste and go.",
    icon: Sparkles,
    path: "/prompts",
    stats: ["200+ prompts", "20 phases", "Sales-optimized"],
    gradient: "from-accent/20 to-accent/5",
  },
  {
    name: "AI Skills Library",
    description: "Turn any AI into your sales co-pilot. Copy-paste skills for Claude Code, Codex, Clay, and more.",
    icon: Brain,
    path: "/skills",
    stats: ["12 skills", "Coding & Sales agents", "Works with Clay"],
    gradient: "from-primary/15 to-accent/10",
  },
];

const Index = () => {
  const [active, setActive] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = tools.filter((t) => {
    const matchesCategory = active === "All" || t.category === active;
    const matchesSearch = search === "" || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allSearchable = [...featuredTools.map(f => ({ ...f, category: "Templates" as Category })), ...tools];
  const suggestions = search === ""
    ? []
    : allSearchable.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())).slice(0, 5);

  const showDropdown = searchFocused && search !== "" && suggestions.length > 0;

  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? tools.length : tools.filter((t) => t.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="border-b bg-card/50">
        <div className="container max-w-5xl py-8 md:py-14 px-4 sm:px-6">
          <div className="flex flex-col gap-5 md:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display tracking-tight">CloserKit</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1.5 md:mt-2 max-w-xl">
                The free sales toolkit. Templates, calculators, and AI prompts — zero sign-ups, zero tracking.
              </p>
            </div>

            {/* GitHub + Stats */}
            <a
              href="https://github.com/saphaarelabs/sales-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-secondary/50 hover:bg-secondary text-sm font-medium text-foreground transition-colors w-fit"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
              <ArrowRight className="h-3 w-3 opacity-60" />
            </a>

            <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl md:text-2xl font-bold font-display text-foreground">165+</span>
                <span className="text-muted-foreground text-xs md:text-sm">Email Templates</span>
              </div>
              <div className="w-px h-6 md:h-8 bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl md:text-2xl font-bold font-display text-foreground">22</span>
                <span className="text-muted-foreground text-xs md:text-sm">Sales Tools</span>
              </div>
              <div className="w-px h-6 md:h-8 bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 md:gap-2">
                <span className="text-xl md:text-2xl font-bold font-display text-foreground">12</span>
                <span className="text-muted-foreground text-xs md:text-sm">AI Skills</span>
              </div>
            </div>

            {/* Search */}
            <div ref={searchRef} className="relative max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search all tools and templates…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map((tool) => (
                    <button
                      key={tool.path}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-accent/50 transition-colors"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        navigate(tool.path);
                      }}
                    >
                      <tool.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{tool.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground ml-auto flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-6 md:py-8 px-4 sm:px-6 space-y-8 md:space-y-10">
        {/* Featured Section */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">Most Popular</h2>
          <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
            {featuredTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className={`group relative rounded-xl border bg-gradient-to-br ${tool.gradient} p-4 md:p-6 hover:shadow-md transition-all hover:border-primary/30`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5 md:p-3 flex-shrink-0">
                    <tool.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm md:text-base text-card-foreground group-hover:text-foreground flex items-center gap-2">
                      {tool.name}
                      <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2 md:line-clamp-none">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mt-2 md:mt-3">
                      {tool.stats.map((stat) => (
                        <span key={stat} className="inline-flex items-center px-1.5 md:px-2 py-0.5 rounded-md bg-background/80 text-[10px] md:text-xs font-medium text-foreground border">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Tools */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 md:mb-4">All Tools</h2>
          {/* Category Pills - horizontal scroll on mobile */}
          <div className="flex gap-2 mb-5 md:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  active === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat} <span className="opacity-60">({categoryCounts[cat]})</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group flex items-start gap-3 rounded-lg border bg-card p-3.5 md:p-4 hover:bg-accent/30 hover:border-accent transition-all active:scale-[0.98]"
              >
                <div className="rounded-md bg-secondary p-2 flex-shrink-0">
                  <tool.icon className="h-4 w-4 text-foreground" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-sm text-card-foreground group-hover:text-foreground">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{tool.description}</p>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-12">No tools found matching "{search}"</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container max-w-5xl py-4 md:py-6 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">CloserKit</span>
          <div className="flex items-center gap-4">
            <a href="https://github.com/saphaarelabs/sales-toolkit" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
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
