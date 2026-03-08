import { useState, useRef, useEffect, useCallback } from "react";
import { Bot, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import type { Mode, Msg } from "@/components/ai/types";
import { modes } from "@/components/ai/types";
import { streamChat } from "@/components/ai/streamChat";
import ModeCards from "@/components/ai/ModeCards";
import ChatMessages from "@/components/ai/ChatMessages";
import ChatInput from "@/components/ai/ChatInput";

const AIAssistant = () => {
  const [mode, setMode] = useState<Mode>("coach");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentMode = modes.find((m) => m.id === mode)!;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: [...messages, userMsg],
      mode,
      onDelta: upsert,
      onDone: () => setIsStreaming(false),
      onError: (err) => {
        setIsStreaming(false);
        toast({ title: "AI Error", description: err, variant: "destructive" });
      },
    });
  }, [input, isStreaming, messages, mode, toast]);

  const handleModeSelect = (selectedMode: Mode, prompt: string) => {
    setMode(selectedMode);
    send(prompt);
  };

  const reset = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header with gradient accent */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="shrink-0" />
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center transition-all duration-300`}>
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-display font-bold leading-tight">AI Sales Assistant</h1>
                <p className="text-[10px] text-muted-foreground leading-tight">{currentMode.label} mode</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5 h-8">
              <RotateCcw className="h-3 w-3" />
              New Chat
            </Button>
          )}
        </div>
        {/* Mode gradient line */}
        <div className={`h-[2px] bg-gradient-to-r ${currentMode.gradient} opacity-60 transition-all duration-500`} />
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl px-4 py-6">
          {messages.length === 0 ? (
            <ModeCards onSelect={handleModeSelect} />
          ) : (
            <ChatMessages
              messages={messages}
              mode={mode}
              isStreaming={isStreaming}
              onSuggestion={send}
            />
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        mode={mode}
        setMode={setMode}
        isStreaming={isStreaming}
        onSend={() => send()}
      />
    </div>
  );
};

export default AIAssistant;
