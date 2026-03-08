import { useRef, useEffect } from "react";
import { Send, Sparkles, Mail, TrendingUp, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Mode } from "./types";
import { modes } from "./types";

const iconMap = { Sparkles, Mail, TrendingUp, Search };

interface ChatInputProps {
  input: string;
  setInput: (v: string) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  isStreaming: boolean;
  onSend: () => void;
}

const ChatInput = ({ input, setInput, mode, setMode, isStreaming, onSend }: ChatInputProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentMode = modes.find((m) => m.id === mode)!;
  const ModeIcon = iconMap[currentMode.icon as keyof typeof iconMap];

  useEffect(() => {
    inputRef.current?.focus();
  }, [mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const autoResize = (e: React.FormEvent) => {
    const t = e.target as HTMLTextAreaElement;
    t.style.height = "auto";
    t.style.height = Math.min(t.scrollHeight, 140) + "px";
  };

  return (
    <div className="border-t bg-card/80 backdrop-blur-sm">
      <div className="container max-w-3xl px-4 py-3">
        <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/30 transition-shadow">
          {/* Mode selector dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r ${currentMode.gradient} text-white text-[11px] font-medium shrink-0 hover:opacity-90 transition-opacity`}>
                <ModeIcon className="h-3 w-3" />
                <span className="hidden sm:inline">{currentMode.label}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {modes.map((m) => {
                const Icon = iconMap[m.icon as keyof typeof iconMap];
                return (
                  <DropdownMenuItem
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className="gap-2"
                  >
                    <div className={`w-5 h-5 rounded bg-gradient-to-br ${m.gradient} flex items-center justify-center`}>
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">{m.label}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Textarea */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={autoResize}
            placeholder={`Message ${currentMode.label}…`}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none min-h-[36px] max-h-[140px] py-1.5 px-1"
            style={{ height: "auto", overflow: "hidden" }}
          />

          {/* Send button */}
          <Button
            onClick={onSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className={`rounded-xl h-9 w-9 shrink-0 bg-gradient-to-r ${currentMode.gradient} hover:opacity-90 border-0 transition-opacity`}
          >
            <Send className="h-4 w-4 text-white" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
          AI can make mistakes · Verify important info
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
