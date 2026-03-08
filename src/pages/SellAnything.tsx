import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import InputSection from "@/components/sell/InputSection";
import ResultsDashboard from "@/components/sell/ResultsDashboard";
import type { SalesKitResult, OfferingType, MarketTarget } from "@/components/sell/types";

const loadingStages = [
  "Analyzing your offering…",
  "Researching target market…",
  "Building sales pitches…",
  "Finding prospect channels…",
  "Generating outreach sequences…",
  "Compiling sales kit…",
];

export default function SellAnything() {
  const [result, setResult] = useState<SalesKitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (description: string, offeringType: OfferingType, marketTarget: MarketTarget) => {
    setLoading(true);
    setResult(null);
    setStage(0);

    // Cycle through loading stages
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % loadingStages.length);
    }, 4000);

    try {
      const { data, error } = await supabase.functions.invoke("sell-anything", {
        body: { description, offeringType, marketTarget },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data as SalesKitResult);
    } catch (e: any) {
      toast({
        title: "Generation failed",
        description: e.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50">
        <div className="max-w-4xl px-4 sm:px-6 py-6">
          <SidebarTrigger className="mb-3" />
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[hsl(43,60%,55%)]/15 p-2.5">
              <Sparkles className="h-5 w-5 text-[hsl(43,60%,45%)]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-display">SellAnything AI</h1>
              <p className="text-sm text-muted-foreground">Describe what you sell → get a complete sales kit</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl px-4 sm:px-6 py-6 space-y-6">
        <InputSection onSubmit={handleSubmit} loading={loading} />

        {loading && (
          <div className="flex flex-col items-center py-16 gap-4">
            <div className="h-2 w-64 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-[hsl(43,60%,55%)] animate-pulse rounded-full" style={{ width: "60%" }} />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">{loadingStages[stage]}</p>
          </div>
        )}

        {result && <ResultsDashboard data={result} />}
      </main>
    </div>
  );
}
