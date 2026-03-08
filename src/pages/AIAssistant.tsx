import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Mail, TrendingUp, Search, RotateCcw, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";

type Mode = "coach" | "email" | "deal" | "autofill";
type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-sales-assistant`;

const modes: { id: Mode; label: string; icon: React.ElementType; description: string; placeholder: string; color: string }[] = [
  {
    id: "coach",
    label: "Sales Coach",
    icon: Sparkles,
    description: "Get tactical advice on deals, calls, and strategy",
    placeholder: "I have a discovery call tomorrow with a VP of Engineering at a Series B SaaS company. They're using a competitor but their contract renews in 60 days. How should I approach this?",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "email",
    label: "Email Writer",
    icon: Mail,
    description: "Generate cold emails that actually get replies",
    placeholder: "Write a cold email to Sarah Chen, CTO at Acme Corp (200 employees, fintech). They just raised Series B and are scaling their engineering team. I sell developer productivity tools.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "deal",
    label: "Deal Analyzer",
    icon: TrendingUp,
    description: "Get win probability, risk flags, and next steps",
    placeholder: "Deal: $85K ACV with a mid-market healthcare company. Champion is the Director of IT. We've done 2 demos. They said budget is approved but I haven't spoken to the CFO. Competition is their current vendor. Timeline is 'this quarter'.",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "autofill",
    label: "Prospect Research",
    icon: Search,
    description: "Analyze a company and get structured sales intel",
    placeholder: "Research Stripe for me. I'm selling a compliance automation tool.",
    color: "from-purple-500 to-violet-600",
  },
];

async function streamChat({
  messages,
  mode,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  mode: Mode;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, mode }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({ error: "Request failed" }));
      onError(data.error || `Error ${resp.status}`);
      return;
    }

    if (!resp.body) { onError("No response body"); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buf.indexOf("\n")) !== -1) {
        let line = buf.slice(0, idx);
        buf = buf.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buf = line + "\n" + buf;
          break;
        }
      }
    }
    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Connection failed");
  }
}

const AIAssistant = () => {
  const [mode, setMode] = useState<Mode>("coach");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const currentMode = modes.find((m) => m.id === mode)!;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const send = async (text?: string) => {
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
  };

  const reset = () => {
    setMessages([]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top bar */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="text-sm font-display font-semibold text-muted-foreground hover:text-foreground transition-colors">
              CloserKit
            </a>
            <span className="text-muted-foreground/40">/</span>
            <h1 className="text-sm font-semibold font-display flex items-center gap-1.5">
              <Bot className="h-4 w-4 text-primary" />
              AI Assistant
            </h1>
          </div>
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs gap-1.5">
              <RotateCcw className="h-3 w-3" />
              New Chat
            </Button>
          )}
        </div>
      </header>

      {/* Mode selector - compact pills */}
      <div className="border-b bg-card/40">
        <div className="container max-w-4xl px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); if (messages.length === 0) inputRef.current?.focus(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                mode === m.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <m.icon className="h-3 w-3" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl px-4 py-6">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentMode.color} flex items-center justify-center shadow-lg`}>
                <currentMode.icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold">{currentMode.label}</h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">{currentMode.description}</p>
              </div>

              {/* Quick start suggestions */}
              <div className="w-full max-w-lg space-y-2">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Try this</p>
                <button
                  onClick={() => send(currentMode.placeholder)}
                  className="w-full text-left p-3 rounded-lg border bg-card hover:bg-accent/20 hover:border-accent transition-all text-sm text-muted-foreground leading-relaxed"
                >
                  "{currentMode.placeholder.slice(0, 120)}…"
                </button>
              </div>
            </div>
          ) : (
            /* Chat messages */
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "assistant" && (
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentMode.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                          : "bg-card border rounded-bl-md"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "assistant" && !isStreaming && (
                      <button
                        onClick={() => handleCopy(msg.content, i)}
                        className="flex items-center gap-1 mt-1 ml-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copiedIdx === i ? "Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentMode.color} flex items-center justify-center flex-shrink-0`}>
                    <Bot className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <div className="bg-card border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t bg-card/80 backdrop-blur-sm">
        <div className="container max-w-4xl px-4 py-3">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${currentMode.label}…`}
              rows={1}
              className="flex-1 resize-none rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[44px] max-h-[120px]"
              style={{ height: "auto", overflow: "hidden" }}
              onInput={(e) => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 120) + "px";
              }}
            />
            <Button
              onClick={() => send()}
              disabled={!input.trim() || isStreaming}
              size="icon"
              className="rounded-xl h-[44px] w-[44px] shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/60 text-center mt-2">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
