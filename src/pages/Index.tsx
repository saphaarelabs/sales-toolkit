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
} from "lucide-react";
import { useState } from "react";

const categories = ["All", "Calculators", "Email & Outreach", "Prospecting", "Docs"] as const;
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
  {
    name: "Commission Calculator",
    description: "Calculate rep earnings across multi-tier commission structures.",
    icon: Calculator,
    path: "/commission",
    category: "Calculators",
    color: "text-calc",
    borderColor: "border-calc",
  },
  {
    name: "ROI Calculator",
    description: "Generate a shareable ROI summary with payback period for proposals.",
    icon: TrendingUp,
    path: "/roi",
    category: "Calculators",
    color: "text-calc",
    borderColor: "border-calc",
  },
  {
    name: "Cold Email Generator",
    description: "Get 2-3 personalized cold email variations for any scenario.",
    icon: Mail,
    path: "/cold-email",
    category: "Email & Outreach",
    color: "text-email",
    borderColor: "border-email",
  },
  {
    name: "Follow-up Sequence Builder",
    description: "Build a multi-step email sequence with timing and templates.",
    icon: ListOrdered,
    path: "/sequence",
    category: "Email & Outreach",
    color: "text-email",
    borderColor: "border-email",
  },
  {
    name: "ICP Builder",
    description: "Define your ideal customer profile and export it as a document.",
    icon: Target,
    path: "/icp",
    category: "Prospecting",
    color: "text-prospect",
    borderColor: "border-prospect",
  },
  {
    name: "Objection Handler",
    description: "Browse common objections with proven response frameworks.",
    icon: ShieldCheck,
    path: "/objections",
    category: "Prospecting",
    color: "text-prospect",
    borderColor: "border-prospect",
  },
  {
    name: "Email Signature Generator",
    description: "Create a professional HTML email signature in seconds.",
    icon: AtSign,
    path: "/signature",
    category: "Docs",
    color: "text-docs",
    borderColor: "border-docs",
  },
  {
    name: "Discount Calculator",
    description: "Calculate discount impact on revenue and protect your margins.",
    icon: Percent,
    path: "/discount",
    category: "Calculators",
    color: "text-calc",
    borderColor: "border-calc",
  },
  {
    name: "AI Prompt Templates",
    description: "Pre-built sales prompts to customize and paste into any AI tool.",
    icon: Sparkles,
    path: "/prompts",
    category: "Prospecting",
    color: "text-prospect",
    borderColor: "border-prospect",
  },
];

const Index = () => {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? tools : tools.filter((t) => t.category === active);

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
        </div>
      </header>

      {/* Tools */}
      <main className="container max-w-5xl py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container max-w-5xl py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">CloserKit</span>
          <span>Free &amp; open-source</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
