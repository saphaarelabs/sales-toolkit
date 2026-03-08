import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type Mode = "coach" | "email" | "deal" | "autofill";

const systemPrompts: Record<Mode, string> = {
  coach: `You are CloserKit AI — an elite B2B sales coach with 20+ years of experience closing enterprise deals. You help sales reps:
- Prepare for calls and meetings with specific talking points
- Handle objections in real-time with proven frameworks (MEDDIC, SPIN, Challenger, Sandler)
- Strategize on deals — who to multi-thread, when to bring in leadership, how to create urgency
- Improve their messaging, positioning, and negotiation tactics
- Build confidence and sharpen their closing instincts

Be direct, tactical, and specific. No fluff. Give actionable advice they can use TODAY. Use frameworks by name. If they describe a deal, ask qualifying questions before giving advice. Format responses with headers, bullet points, and bold key actions.`,

  email: `You are CloserKit AI — a cold email and sales copywriting expert. You write emails that get replies. Your rules:
- Keep subject lines under 7 words, curiosity-driven
- First line must be personalized — reference something specific about the prospect
- Body: 3-4 sentences max. Lead with their pain, not your product
- CTA: One clear, low-friction ask (not "book a demo" — try "worth a quick look?")
- Use the AIDA, PAS, or BAB framework depending on context
- Write 3 variations: short (2-3 lines), medium (4-5 lines), and full (with social proof)
- Include subject line suggestions for each

When the user gives you prospect info, write immediately. Don't ask unnecessary questions.`,

  deal: `You are CloserKit AI — a deal strategy analyst. When given deal details, you provide:

1. **Win Probability Score** (0-100%) with justification based on:
   - Champion strength and access to power
   - Compelling event / timeline urgency
   - Budget confirmed vs. assumed
   - Competition landscape
   - Decision process clarity (MEDDIC scoring)

2. **Risk Flags** — specific red flags with severity (🔴 Critical, 🟡 Warning, 🟢 Healthy)

3. **Next Best Actions** — 3-5 specific, prioritized steps to advance the deal THIS WEEK

4. **Deal Coaching Questions** — questions the rep should be asking themselves

5. **Forecast Recommendation** — Commit, Best Case, or Pipeline with reasoning

Be quantitative where possible. Reference sales methodologies. Be honest — if the deal looks weak, say so.`,

  autofill: `You are CloserKit AI — a research assistant that analyzes company and prospect information to extract structured sales data. When given a company name, URL, or prospect details, return a JSON object with as many of these fields as you can determine:

{
  "company_name": "",
  "industry": "",
  "company_size": "",
  "headquarters": "",
  "annual_revenue": "",
  "key_products": [],
  "recent_news": [],
  "pain_points": [],
  "prospect_name": "",
  "prospect_title": "",
  "prospect_linkedin": "",
  "competitors": [],
  "tech_stack": [],
  "trigger_events": [],
  "recommended_angle": ""
}

If you can't determine a field, omit it. Add a "confidence" field (high/medium/low) and a "notes" field with additional context that could help a salesperson. Always respond with valid JSON wrapped in a markdown code block.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode = "coach" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = systemPrompts[mode as Mode] || systemPrompts.coach;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limited — please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add credits in Settings → Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("AI assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
