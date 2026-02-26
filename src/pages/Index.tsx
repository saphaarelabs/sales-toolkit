import { Link, useNavigate } from "react-router-dom";
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
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const categories = ["All", "Calculators", "Email & Outreach", "Prospecting", "Templates", "Pipeline", "LinkedIn", "Proposals", "Docs"] as const;
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
  { name: "Email Template Library", description: "75+ ready-to-use email templates across 13 categories.", icon: BookOpen, path: "/email-templates", category: "Templates" },
  { name: "AI Prompt Templates", description: "Pre-built sales prompts to paste into any AI tool.", icon: Sparkles, path: "/prompts", category: "Templates" },
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
];

const popularToolPaths = ["/email-templates", "/cold-email", "/commission", "/linkedin-headline", "/win-probability"];

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

  const suggestions = search === ""
    ? tools.filter((t) => popularToolPaths.includes(t.path))
    : tools.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())).slice(0, 5);

  const showDropdown = searchFocused && suggestions.length > 0;

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
      {/* Header */}
      <header className="border-b bg-card/50">
        <div className="container max-w-5xl py-8 md:py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight">CloserKit</h1>
              <p className="text-sm text-muted-foreground mt-1">Free sales tools — no sign-ups, no tracking</p>
            </div>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              className="w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-lg shadow-lg z-50 overflow-hidden">
                {search === "" && (
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Popular</div>
                )}
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
      </header>

      {/* Main */}
      <main className="container max-w-5xl py-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
              className="group flex items-start gap-3 rounded-lg border bg-card p-4 hover:bg-accent/30 hover:border-accent transition-all"
            >
              <div className="rounded-md bg-secondary p-2 flex-shrink-0">
                <tool.icon className="h-4 w-4 text-foreground" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium text-sm text-card-foreground group-hover:text-foreground">{tool.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{tool.description}</p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">No tools found matching "{search}"</p>
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
