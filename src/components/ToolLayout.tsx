import { SidebarTrigger } from "@/components/ui/sidebar";

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
        <div className="max-w-5xl py-3 md:py-4 px-4 sm:px-6 flex items-center gap-3">
          <SidebarTrigger className="shrink-0" />
          <span className="text-sm text-muted-foreground font-display font-semibold">CloserKit</span>
        </div>
      </header>
      <main className="max-w-5xl py-6 md:py-10 px-4 sm:px-6">
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
