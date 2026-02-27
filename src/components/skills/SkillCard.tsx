import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type Skill } from "@/data/skillTemplates";
import { useToast } from "@/hooks/use-toast";

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [selected, setSelected] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const buildPrompt = () => {
    let result = skill.prompt;
    skill.variables.forEach((v) => {
      const val = values[v.key] || v.placeholder;
      result = result.split(`{{${v.key}}}`).join(val);
    });
    return result;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildPrompt());
    setCopied(true);
    toast({ title: "Skill copied!", description: "Paste it into your AI tool." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setSelected(true)}
        className="text-left rounded-lg border bg-card p-5 hover:bg-accent/30 hover:border-accent transition-all group"
      >
        <h3 className="font-semibold text-sm">{skill.title}</h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skill.compatibleTools.map((tool) => (
            <Badge key={tool} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tool}
            </Badge>
          ))}
        </div>
      </button>

      <Dialog open={selected} onOpenChange={(open) => !open && setSelected(false)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{skill.title}</DialogTitle>
            <DialogDescription>{skill.description}</DialogDescription>
          </DialogHeader>

          {skill.variables.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Customize Variables
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {skill.variables.map((v) => (
                  <div key={v.key}>
                    <label className="text-xs font-medium text-foreground mb-1 block">{v.label}</label>
                    <Input
                      placeholder={v.placeholder}
                      value={values[v.key] || ""}
                      onChange={(e) => setValues((prev) => ({ ...prev, [v.key]: e.target.value }))}
                      className="text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Preview
            </h4>
            <pre className="text-xs leading-relaxed whitespace-pre-wrap bg-muted/50 border rounded-lg p-4 max-h-80 overflow-y-auto font-mono text-foreground">
              {buildPrompt()}
            </pre>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCopy} className="gap-1.5">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Skill"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SkillCard;
