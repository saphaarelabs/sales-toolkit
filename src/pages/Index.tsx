import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Types ──────────────────────────────────────────────
type Tab = "dashboard" | "advisor" | "vc" | "social";
type Msg = { role: "user" | "assistant"; content: string };

// ── Data ───────────────────────────────────────────────
const mrrData = [
  { month: "Jan", value: 12000 }, { month: "Feb", value: 18500 },
  { month: "Mar", value: 22000 }, { month: "Apr", value: 19800 },
  { month: "May", value: 31000 }, { month: "Jun", value: 38500 },
];
const leadData = [
  { month: "Jan", value: 34 }, { month: "Feb", value: 52 },
  { month: "Mar", value: 61 }, { month: "Apr", value: 44 },
  { month: "May", value: 78 }, { month: "Jun", value: 95 },
];
const funnelData = [
  { stage: "Outreach", value: 420 }, { stage: "Reply", value: 180 },
  { stage: "Demo", value: 72 }, { stage: "Proposal", value: 31 },
  { stage: "Closed", value: 14 },
];
const sourceData = [
  { name: "LinkedIn", value: 42 }, { name: "Email", value: 28 },
  { name: "Referral", value: 18 }, { name: "Inbound", value: 12 },
];
const SOURCE_COLORS = ["#00d4ff", "#7c3aed", "#f59e0b", "#10b981"];

const vcFirms = [
  { name: "Sequoia Capital", focus: "SaaS, Fintech, AI", stage: "Seed–Series C", check: "$500K–$20M", partner: "Roelof Botha", linkedin: "https://linkedin.com/company/sequoia-capital", twitter: "https://twitter.com/sequoia", website: "https://sequoiacap.com" },
  { name: "a16z", focus: "Web3, AI, Bio, Consumer", stage: "Seed–Growth", check: "$250K–$50M", partner: "Marc Andreessen", linkedin: "https://linkedin.com/company/andreessen-horowitz", twitter: "https://twitter.com/a16z", website: "https://a16z.com" },
  { name: "Y Combinator", focus: "All sectors", stage: "Pre-seed", check: "$500K", partner: "Garry Tan", linkedin: "https://linkedin.com/company/y-combinator", twitter: "https://twitter.com/ycombinator", website: "https://ycombinator.com" },
  { name: "Accel", focus: "Enterprise, SaaS, Security", stage: "Seed–Series B", check: "$1M–$15M", partner: "Sonali De Rycker", linkedin: "https://linkedin.com/company/accel-partners", twitter: "https://twitter.com/accel", website: "https://accel.com" },
  { name: "Tiger Global", focus: "Consumer, SaaS, Fintech", stage: "Series B–Growth", check: "$10M–$100M+", partner: "Scott Shleifer", linkedin: "https://linkedin.com/company/tiger-global", twitter: "https://twitter.com/tigerglobal", website: "https://tigerglobal.com" },
  { name: "Lightspeed", focus: "Enterprise, Consumer, Health", stage: "Seed–Series C", check: "$1M–$30M", partner: "Ravi Mhatre", linkedin: "https://linkedin.com/company/lightspeed-venture-partners", twitter: "https://twitter.com/lightspeedvp", website: "https://lsvp.com" },
  { name: "Bessemer Venture", focus: "Cloud, Security, Fintech", stage: "Seed–Series D", check: "$1M–$25M", partner: "Byron Deeter", linkedin: "https://linkedin.com/company/bessemer-venture-partners", twitter: "https://twitter.com/bvp", website: "https://bvp.com" },
  { name: "General Catalyst", focus: "Climate, Health, AI", stage: "Seed–Growth", check: "$500K–$40M", partner: "Hemant Taneja", linkedin: "https://linkedin.com/company/general-catalyst-partners", twitter: "https://twitter.com/gcvp", website: "https://generalcatalyst.com" },
];

const socialChannels = [
  { name: "LinkedIn", color: "#0077b5", desc: "Best for B2B outreach & VC connections", url: "https://linkedin.com" },
  { name: "Twitter / X", color: "#1da1f2", desc: "Thought leadership & founder community", url: "https://twitter.com" },
  { name: "AngelList", color: "#333", desc: "Investor discovery & deal flow", url: "https://angel.co" },
  { name: "Crunchbase", color: "#0288d1", desc: "Research investors & track funding", url: "https://crunchbase.com" },
  { name: "Product Hunt", color: "#da552f", desc: "B2C launch & early traction proof", url: "https://producthunt.com" },
  { name: "Indie Hackers", color: "#6200ea", desc: "Bootstrap community & revenue sharing", url: "https://indiehackers.com" },
];

const playbookTips = [
  "LinkedIn: Connect with VC partners → comment on their posts for 2 weeks → then DM with a warm intro",
  "Twitter/X: Post your founder journey weekly → tag relevant VCs → build in public",
  "AngelList: Keep profile updated with latest metrics — VCs browse actively",
  "Crunchbase: Research your target VC's last 5 deals — mention one in your cold email",
  "Product Hunt: Launch for social proof — use your rank screenshot in your pitch deck",
];

const quickPrompts = [
  "Write a cold email to a Series A VC",
  "Create a 30-second elevator pitch",
  "Handle: come back with more traction",
  "Give me a B2B sales objection script",
  "What ARR do I need to raise Series A?",
];

// ── Styles ─────────────────────────────────────────────
const BG = "#080810";
const CARD = "#0d0d1a";
const BORDER = "#13131f";
const ACCENT = "#00d4ff";

const syne = "'Syne', sans-serif";
const mono = "'IBM Plex Mono', monospace";

// ── Custom Tooltip ─────────────────────────────────────
const DarkTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", color: "#fff", fontFamily: mono, fontSize: 12 }}>
      <p style={{ color: "#888", marginBottom: 4 }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || ACCENT }}>{p.name}: {typeof p.value === "number" && p.value >= 1000 ? `$${(p.value / 1000).toFixed(1)}K` : p.value}</p>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "8px 12px", color: "#fff", fontFamily: mono, fontSize: 12 }}>
      <p>{payload[0].name}: {payload[0].value}%</p>
    </div>
  );
};

// ── MAIN COMPONENT ─────────────────────────────────────
const Index = () => {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [vcSearch, setVcSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // ── AI Streaming ───────────────────────────────
  const sendMessage = useCallback(async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isStreaming) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: msg };
    const allMessages = [...messages, userMsg];
    setMessages([...allMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/apex-advisor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantText += delta;
              const finalText = assistantText;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: finalText };
                return copy;
              });
            }
          } catch { /* partial json, ignore */ }
        }
      }
    } catch (e: any) {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: `❌ Error: ${e.message}` };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [input, messages, isStreaming]);

  const filteredVCs = vcFirms.filter(v =>
    v.name.toLowerCase().includes(vcSearch.toLowerCase()) ||
    v.focus.toLowerCase().includes(vcSearch.toLowerCase())
  );

  // ── Sidebar nav items ───────────────────────────
  const navItems: { id: Tab; label: string; icon: string }[] = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "advisor", label: "AI Advisor", icon: "🤖" },
    { id: "vc", label: "VC Directory", icon: "🏦" },
    { id: "social", label: "Social Channels", icon: "📡" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: BG, color: "#fff", fontFamily: syne, overflow: "hidden" }}>
      {/* ── SIDEBAR ─────────────────────────────── */}
      <aside style={{ width: 224, minWidth: 224, background: CARD, borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", padding: "24px 16px" }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 24, color: ACCENT }}>⬡</span>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>APEX</span>
          </div>
          <p style={{ fontSize: 11, color: "#555", marginTop: 4, fontFamily: mono, letterSpacing: "0.08em", textTransform: "uppercase" }}>Founder Sales OS</p>
        </div>

        {/* Nav */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {navItems.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                borderRadius: 8, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500,
                fontFamily: syne, textAlign: "left", width: "100%",
                background: tab === n.id ? `${ACCENT}15` : "transparent",
                color: tab === n.id ? ACCENT : "#888",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (tab !== n.id) (e.target as HTMLElement).style.background = "#ffffff08"; }}
              onMouseLeave={e => { if (tab !== n.id) (e.target as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ fontSize: 16 }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Live Metrics */}
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "MRR", value: "$38.5K" },
            { label: "Close Rate", value: "3.3%" },
            { label: "Pipeline", value: "$2.1M" },
          ].map(m => (
            <div key={m.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#555", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: mono, color: ACCENT }}>{m.value}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────── */}
      <main ref={tab === "advisor" ? scrollRef : undefined} style={{ flex: 1, overflow: "auto", padding: 32 }}>
        {/* ════ DASHBOARD ════ */}
        {tab === "dashboard" && (
          <div style={{ maxWidth: 1100 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Dashboard</h1>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Monthly Recurring Revenue", value: "$38,500", change: "+24%", up: true },
                { label: "Leads This Month", value: "95", change: "+22%", up: true },
                { label: "Pipeline Value", value: "$2.1M", change: "+8%", up: true },
                { label: "Avg Deal Size", value: "$27.5K", change: "-3%", up: false },
              ].map(k => (
                <div key={k.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                  <p style={{ fontSize: 11, color: "#666", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>{k.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 700, fontFamily: mono }}>{k.value}</p>
                  <p style={{ fontSize: 13, fontFamily: mono, color: k.up ? "#10b981" : "#ef4444", marginTop: 4 }}>{k.change}</p>
                </div>
              ))}
            </div>

            {/* Charts 2x2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* MRR Growth */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "#666", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>MRR Growth</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={mrrData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                    <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                    <Tooltip content={<DarkTooltip />} />
                    <Line type="monotone" dataKey="value" stroke={ACCENT} strokeWidth={2.5} dot={{ fill: ACCENT, r: 4 }} name="MRR" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Lead Volume */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "#666", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Lead Volume</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={leadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
                    <XAxis dataKey="month" tick={{ fill: "#555", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#555", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} />
                    <Tooltip content={<DarkTooltip />} />
                    <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Sales Funnel */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "#666", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Sales Funnel</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={funnelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#555", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="stage" tick={{ fill: "#888", fontSize: 11, fontFamily: mono }} axisLine={false} tickLine={false} width={70} />
                    <Tooltip content={<DarkTooltip />} />
                    <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} name="Deals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Lead Sources Donut */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 11, color: "#666", fontFamily: mono, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Lead Sources</p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ResponsiveContainer width="60%" height={220}>
                    <PieChart>
                      <Pie data={sourceData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                        {sourceData.map((_, i) => <Cell key={i} fill={SOURCE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {sourceData.map((s, i) => (
                      <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontFamily: mono }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: SOURCE_COLORS[i], flexShrink: 0 }} />
                        <span style={{ color: "#aaa" }}>{s.name}</span>
                        <span style={{ marginLeft: "auto", fontWeight: 600 }}>{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════ AI ADVISOR ════ */}
        {tab === "advisor" && (
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 64px)" }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>AI Advisor</h1>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 16 }}>
              {messages.length === 0 && (
                <div style={{ textAlign: "center", marginTop: 60 }}>
                  <p style={{ fontSize: 40, marginBottom: 8 }}>🤖</p>
                  <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>Ask APEX anything about sales, fundraising, or growth.</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                    {quickPrompts.map(p => (
                      <button
                        key={p}
                        onClick={() => sendMessage(p)}
                        style={{
                          background: `${ACCENT}10`, border: `1px solid ${ACCENT}30`, borderRadius: 20,
                          padding: "8px 16px", color: ACCENT, fontSize: 13, fontFamily: syne,
                          cursor: "pointer", transition: "all 0.15s",
                        }}
                        onMouseEnter={e => (e.target as HTMLElement).style.background = `${ACCENT}20`}
                        onMouseLeave={e => (e.target as HTMLElement).style.background = `${ACCENT}10`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    animation: "fadeUp 0.3s ease-out",
                  }}
                >
                  <div style={{
                    maxWidth: "80%", borderRadius: 12,
                    padding: "12px 16px", fontSize: 14, lineHeight: 1.6,
                    ...(m.role === "user"
                      ? { background: "#0066cc", color: "#fff" }
                      : { background: CARD, border: `1px solid ${BORDER}`, color: "#ddd" }),
                  }}>
                    {m.role === "assistant" && (
                      <span style={{ fontSize: 10, fontFamily: mono, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>APEX</span>
                    )}
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm prose-invert max-w-none" style={{ fontFamily: syne }}>
                        <ReactMarkdown>{m.content || "..."}</ReactMarkdown>
                      </div>
                    ) : m.content}
                  </div>
                </div>
              ))}

              {isStreaming && messages[messages.length - 1]?.content === "" && (
                <div style={{ display: "flex", gap: 6, padding: "12px 0" }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 8, height: 8, borderRadius: "50%", background: ACCENT,
                      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${BORDER}` }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Ask APEX anything..."
                style={{
                  flex: 1, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 10,
                  padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: syne,
                  outline: "none",
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isStreaming || !input.trim()}
                style={{
                  background: ACCENT, color: "#000", fontWeight: 700, fontSize: 14,
                  padding: "0 24px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: syne, opacity: isStreaming || !input.trim() ? 0.4 : 1,
                  transition: "opacity 0.15s",
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* ════ VC DIRECTORY ════ */}
        {tab === "vc" && (
          <div style={{ maxWidth: 1100 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>VC Directory</h1>
            <input
              value={vcSearch}
              onChange={e => setVcSearch(e.target.value)}
              placeholder="Search by firm name or focus area..."
              style={{
                width: "100%", maxWidth: 400, background: CARD, border: `1px solid ${BORDER}`,
                borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: 14,
                fontFamily: syne, outline: "none", marginBottom: 24,
              }}
            />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {filteredVCs.map(vc => (
                <div key={vc.name} style={{
                  background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20,
                  transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = ACCENT + "40"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{vc.name}</h3>
                      <p style={{ fontSize: 12, color: "#888", fontFamily: mono }}>{vc.partner}</p>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[
                        { href: vc.linkedin, label: "in" },
                        { href: vc.twitter, label: "𝕏" },
                        { href: vc.website, label: "🌐" },
                      ].map(link => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: 28, height: 28, borderRadius: 6, display: "flex",
                            alignItems: "center", justifyContent: "center", fontSize: 12,
                            background: "#ffffff08", border: `1px solid ${BORDER}`,
                            color: "#aaa", textDecoration: "none", transition: "all 0.15s",
                          }}
                          onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = ACCENT; (e.target as HTMLElement).style.color = ACCENT; }}
                          onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = BORDER; (e.target as HTMLElement).style.color = "#aaa"; }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#bbb", marginBottom: 10 }}>{vc.focus}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontFamily: mono, padding: "4px 10px", borderRadius: 6, background: `${ACCENT}10`, color: ACCENT, border: `1px solid ${ACCENT}25` }}>{vc.stage}</span>
                    <span style={{ fontSize: 11, fontFamily: mono, padding: "4px 10px", borderRadius: 6, background: "#7c3aed15", color: "#a78bfa", border: "1px solid #7c3aed25" }}>{vc.check}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ SOCIAL CHANNELS ════ */}
        {tab === "social" && (
          <div style={{ maxWidth: 1100 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Social Channels</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
              {socialChannels.map(ch => (
                <a
                  key={ch.name}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20,
                    textDecoration: "none", color: "#fff", transition: "all 0.15s", display: "block",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = ch.color + "60"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: ch.color }} />
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{ch.name}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{ch.desc}</p>
                </a>
              ))}
            </div>

            {/* Playbook */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: ACCENT }}>Founder Outreach Playbook</h2>
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                {playbookTips.map((tip, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
                    <span style={{ fontFamily: mono, fontWeight: 700, color: ACCENT, minWidth: 24, fontSize: 14 }}>{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* ── GLOBAL STYLES ─────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.1); }
        }
        * { box-sizing: border-box; margin: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
        input::placeholder { color: #444; }
        input:focus { border-color: ${ACCENT}40 !important; }
      `}</style>
    </div>
  );
};

export default Index;
