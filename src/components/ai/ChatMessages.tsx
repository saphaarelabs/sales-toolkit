import { Bot, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Msg, Mode } from "./types";
import { modes } from "./types";
import { useState } from "react";

interface ChatMessagesProps {
  messages: Msg[];
  mode: Mode;
  isStreaming: boolean;
  onSuggestion: (text: string) => void;
}

const ChatMessages = ({ messages, mode, isStreaming, onSuggestion }: ChatMessagesProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const currentMode = modes.find((m) => m.id === mode)!;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const showSuggestions = !isStreaming && lastAssistantIdx === 0;

  return (
    <div className="space-y-5">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
          style={{ animationDelay: "0ms" }}
        >
          {msg.role === "assistant" && (
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center flex-shrink-0 mt-1`}>
              <Bot className="h-4 w-4 text-white" />
            </div>
          )}

          <div className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
            {msg.role === "user" ? (
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 ml-auto">
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ) : (
              <div className={`border-l-2 ${currentMode.border} pl-4 py-1`}>
                <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                {!isStreaming && (
                  <button
                    onClick={() => handleCopy(msg.content, i)}
                    className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedIdx === i ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedIdx === i ? "Copied" : "Copy"}
                  </button>
                )}
              </div>
            )}
          </div>

          {msg.role === "user" && (
            <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}

      {/* Typing indicator */}
      {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
        <div className="flex gap-3 animate-fade-in">
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentMode.gradient} flex items-center justify-center flex-shrink-0`}>
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="py-3">
            <div className="shimmer-bar h-3 w-48 rounded-full" />
            <div className="shimmer-bar h-3 w-32 rounded-full mt-2" style={{ animationDelay: "150ms" }} />
          </div>
        </div>
      )}

      {/* Follow-up suggestion chips */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2 ml-10 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "backwards" }}>
          {currentMode.suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestion(s)}
              className="px-3 py-1.5 rounded-full border bg-card text-xs text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:shadow-sm transition-all duration-200"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
