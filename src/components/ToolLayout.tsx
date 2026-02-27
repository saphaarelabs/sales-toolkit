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
      <header className="border-b sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container max-w-5xl py-3 md:py-4 px-4 sm:px-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">All tools</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
      </header>
      <main className="container max-w-5xl py-6 md:py-10 px-4 sm:px-6">
        <div className="mb-6 md:mb-8">
          <div className={`inline-block h-1 w-10 rounded-full ${accentColor} mb-3 md:mb-4`} />
          <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight">{title}</h1>
          <p className="mt-1.5 md:mt-2 text-sm md:text-base text-muted-foreground max-w-xl">{description}</p>
        </div>
        {children}
      </main>
    </div>
  );
};

export default ToolLayout;
