import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  accentColor?: string;
}

const ToolLayout = ({ title, description, children, accentColor = "bg-accent" }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container max-w-5xl py-4 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All tools
          </Link>
        </div>
      </header>
      <main className="container max-w-5xl py-10">
        <div className="mb-8">
          <div className={`inline-block h-1 w-10 rounded-full ${accentColor} mb-4`} />
          <h1 className="text-3xl font-bold font-display tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
};

export default ToolLayout;
