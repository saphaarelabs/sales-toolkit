import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { OfferingType, MarketTarget } from "./types";

const exampleChips = [
  "Old movie CDs",
  "Legal consulting",
  "Handmade candles",
  "SaaS software",
  "Real estate",
  "Online coaching",
];

interface Props {
  onSubmit: (description: string, offeringType: OfferingType, marketTarget: MarketTarget) => void;
  loading: boolean;
}

export default function InputSection({ onSubmit, loading }: Props) {
  const [description, setDescription] = useState("");
  const [offeringType, setOfferingType] = useState<OfferingType>("product");
  const [marketTarget, setMarketTarget] = useState<MarketTarget>("both");

  return (
    <div className="space-y-6">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={"Describe what you're selling in plain English...\n\nExample: I am selling old CDs of movies and songs"}
        className="min-h-[140px] text-base resize-none border-2 focus-visible:ring-[hsl(43,60%,55%)] focus-visible:border-[hsl(43,60%,55%)]"
      />

      {/* Example chips */}
      <div className="flex flex-wrap gap-2">
        {exampleChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setDescription(chip)}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Toggle rows */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">What are you selling?</label>
          <ToggleGroup
            type="single"
            value={offeringType}
            onValueChange={(v) => v && setOfferingType(v as OfferingType)}
            className="justify-start"
          >
            <ToggleGroupItem value="product" className="text-xs">Product</ToggleGroupItem>
            <ToggleGroupItem value="service" className="text-xs">Service</ToggleGroupItem>
            <ToggleGroupItem value="both" className="text-xs">Both</ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Who are you selling to?</label>
          <ToggleGroup
            type="single"
            value={marketTarget}
            onValueChange={(v) => v && setMarketTarget(v as MarketTarget)}
            className="justify-start"
          >
            <ToggleGroupItem value="b2c" className="text-xs">B2C</ToggleGroupItem>
            <ToggleGroupItem value="b2b" className="text-xs">B2B</ToggleGroupItem>
            <ToggleGroupItem value="both" className="text-xs">Both — Auto Detect</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <Button
        onClick={() => onSubmit(description, offeringType, marketTarget)}
        disabled={!description.trim() || loading}
        className="w-full h-12 text-base font-semibold bg-[hsl(43,60%,55%)] hover:bg-[hsl(43,60%,48%)] text-[hsl(43,10%,10%)]"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating Sales Kit…
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Analyze &amp; Generate Full Sales Kit
          </>
        )}
      </Button>
    </div>
  );
}
