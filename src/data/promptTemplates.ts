export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  type: "short" | "long";
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  prompt: string;
  variables: PromptVariable[];
}

export const promptCategories = [
  "All",
  "Prospecting",
  "Email & Outreach",
  "Meeting & Discovery",
  "Proposals & Closing",
  "Account Management",
  "Sales Leadership",
] as const;

export type PromptCategory = (typeof promptCategories)[number];

export const categoryColors: Record<string, string> = {
  Prospecting: "bg-linkedin/10 text-linkedin border-linkedin/20",
  "Email & Outreach": "bg-docs/10 text-docs border-docs/20",
  "Meeting & Discovery": "bg-email/10 text-email border-email/20",
  "Proposals & Closing": "bg-prospect/10 text-prospect border-prospect/20",
  "Account Management": "bg-closing/10 text-closing border-closing/20",
  "Sales Leadership": "bg-primary/10 text-primary border-primary/20",
};

export const templates: PromptTemplate[] = [
  // ═══════════════════════════════════════════
  // PROSPECTING
  // ═══════════════════════════════════════════
  {
    id: "competitor-research",
    title: "Competitor Research & White Space Finder",
    description: "Deep competitor analysis with positioning gaps and market white space — better than hiring a researcher.",
    category: "Prospecting",
    prompt: `Analyze these competitors in [INDUSTRY]: [COMPETITORS]

For each:
1. What's their actual positioning? (not what they say — what customers believe)
2. Pricing model + who they're optimized for
3. Biggest weakness based on public reviews (G2, Reddit, Twitter)
4. What customer segment are they ignoring?

Then: Map all competitors on a 2x2 matrix. You pick the two axes that reveal the biggest gap in the market.

Tell me where the white space is and what positioning would let me win it.`,
    variables: [
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. CRM software, B2B SaaS", type: "short" },
      { key: "COMPETITORS", label: "Competitors (5-7)", placeholder: "e.g. Salesforce, HubSpot, Pipedrive, Close, Freshsales", type: "long" },
    ],
  },
  {
    id: "discovery-questions",
    title: "Discovery Call Question Generator",
    description: "Generate tailored discovery questions using SPIN methodology for any prospect.",
    category: "Prospecting",
    prompt: `I'm preparing for a discovery call with a [ROLE] at a [COMPANY_TYPE] company in the [INDUSTRY] industry. They currently use [CURRENT_SOLUTION] and their main challenge is [PAIN_POINT].

Generate 15 discovery questions organized into these categories:
1. Situation questions (understand their current state)
2. Problem questions (uncover pain depth)
3. Implication questions (quantify the cost of inaction)
4. Need-payoff questions (help them see the value of change)

Make the questions conversational, not interrogative. Include follow-up prompts for each question.`,
    variables: [
      { key: "ROLE", label: "Prospect's Role", placeholder: "e.g. VP of Sales, CTO", type: "short" },
      { key: "COMPANY_TYPE", label: "Company Type", placeholder: "e.g. mid-market, enterprise, startup", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech, healthcare", type: "short" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. spreadsheets, Competitor X", type: "short" },
      { key: "PAIN_POINT", label: "Main Pain Point", placeholder: "e.g. slow pipeline velocity, low conversion rates", type: "short" },
    ],
  },
  {
    id: "deal-review",
    title: "Deal Strategy Advisor",
    description: "Get an AI analysis of your deal with MEDDIC-based recommendations on how to move it forward.",
    category: "Prospecting",
    prompt: `Act as a seasoned sales strategist with 20 years of enterprise deal experience. Review this deal using the MEDDIC framework and give me actionable advice.

Deal details:
- Company: [COMPANY]
- Deal size: [DEAL_SIZE]
- Stage: [STAGE]
- Champion: [CHAMPION]
- Economic buyer: [BUYER]
- Timeline: [TIMELINE]
- Competition: [COMPETITION]
- Main objection/blocker: [BLOCKER]

Additional context:
[CONTEXT]

Analyze:
1. Deal health score (1-10) with reasoning against each MEDDIC element
2. Top 3 risks and how to mitigate each
3. What information am I missing? (questions I should ask)
4. Suggested next 3 actions in priority order
5. If this deal is at risk, what's my recovery play?

Be direct and specific. No generic advice — everything must reference THIS deal.`,
    variables: [
      { key: "COMPANY", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $85K ARR", type: "short" },
      { key: "STAGE", label: "Stage", placeholder: "e.g. Proposal sent, awaiting legal review", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, Director of Ops — strong internal advocate", type: "short" },
      { key: "BUYER", label: "Economic Buyer", placeholder: "e.g. CFO — haven't met yet", type: "short" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. Q1 decision, budget allocated", type: "short" },
      { key: "COMPETITION", label: "Competition", placeholder: "e.g. evaluating us vs. Competitor X", type: "short" },
      { key: "BLOCKER", label: "Main Blocker", placeholder: "e.g. legal team slow, CFO wants more ROI data", type: "short" },
      { key: "CONTEXT", label: "Additional Context", placeholder: "Any other relevant details about the deal...", type: "long" },
    ],
  },
  {
    id: "account-research",
    title: "Account Research Brief",
    description: "Deep-dive a target account: org chart, tech stack, recent news, strategic priorities, and best entry point.",
    category: "Prospecting",
    prompt: `Act as a senior account research analyst at a top consulting firm. I need a comprehensive research brief on [COMPANY_NAME] to prepare for outbound prospecting.

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
What I sell: [YOUR_PRODUCT]
My ICP: [ICP_DESCRIPTION]

Produce a detailed research brief covering:

1. **Company Overview** — Revenue range, employee count, HQ, key markets, recent funding/IPO status
2. **Leadership & Org Structure** — Key executives relevant to my sale, likely reporting structure for [TARGET_DEPARTMENT]
3. **Technology Stack** — Known tools they use (check job postings patterns, integrations pages, case studies)
4. **Strategic Priorities** — What are they publicly investing in? (earnings calls, press releases, job postings themes)
5. **Recent Trigger Events** — Any leadership changes, funding rounds, product launches, partnerships, or acquisitions in the last 6 months
6. **Pain Point Hypothesis** — Based on their size, industry, and growth stage, what problems are they MOST LIKELY experiencing that my product solves?
7. **Recommended Entry Point** — Who should I contact first, what angle should I lead with, and what proof points would resonate?
8. **Personalization Hooks** — 3 specific things I can reference in my outreach to show I've done my homework

Be specific to THIS company. No generic industry observations.`,
    variables: [
      { key: "COMPANY_NAME", label: "Target Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech, payments", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "ICP_DESCRIPTION", label: "Your ICP", placeholder: "e.g. B2B SaaS companies with 200-2000 employees, $20M+ ARR", type: "long" },
      { key: "TARGET_DEPARTMENT", label: "Target Department", placeholder: "e.g. Sales, Engineering, Marketing", type: "short" },
    ],
  },
  {
    id: "icp-refinement",
    title: "ICP Refinement & Scoring",
    description: "Analyze your closed-won deals to identify patterns and sharpen your ICP definition.",
    category: "Prospecting",
    prompt: `Act as a revenue operations analyst specializing in ICP development. Analyze my recent closed-won deals and help me refine my Ideal Customer Profile.

My product: [YOUR_PRODUCT]
Current ICP definition: [CURRENT_ICP]

Here are my last 5-10 closed-won deals:
[CLOSED_WON_DEALS]

Here are my last 3-5 closed-lost deals:
[CLOSED_LOST_DEALS]

Analyze and produce:

1. **Pattern Analysis** — What do the wins have in common? (company size, industry, trigger event, champion title, sales cycle length, deal size)
2. **Anti-Pattern Analysis** — What do the losses have in common? What should I STOP pursuing?
3. **Refined ICP Scorecard** — Create a scoring rubric (1-10) with weighted criteria:
   - Company firmographics (size, industry, growth stage)
   - Technographics (current stack, integration needs)
   - Situational triggers (what's happening that makes them buy NOW)
   - Champion profile (title, seniority, department)
   - Budget indicators
4. **Disqualification Criteria** — Hard "no" signals that mean I should walk away early
5. **Prospecting Priorities** — Rank order of where I should focus my pipeline building efforts

Use specific data from my deals — no generic ICP advice.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI-powered CRM", type: "short" },
      { key: "CURRENT_ICP", label: "Current ICP Definition", placeholder: "e.g. Mid-market SaaS companies, 50-500 employees, using Salesforce", type: "long" },
      { key: "CLOSED_WON_DEALS", label: "Closed-Won Deals (5-10)", placeholder: "Deal 1: Company, size, industry, champion title, deal size, sales cycle length, why they bought\nDeal 2: ...", type: "long" },
      { key: "CLOSED_LOST_DEALS", label: "Closed-Lost Deals (3-5)", placeholder: "Deal 1: Company, size, industry, why we lost\nDeal 2: ...", type: "long" },
    ],
  },
  {
    id: "trigger-events",
    title: "Trigger Event Spotter",
    description: "Find recent trigger events for a company and craft timely outreach angles.",
    category: "Prospecting",
    prompt: `Act as an elite SDR who specializes in trigger-based selling. I need you to identify trigger events for [COMPANY_NAME] and turn each into an outreach angle.

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
What I sell: [YOUR_PRODUCT]
Target buyer: [TARGET_ROLE]

Search for and analyze these trigger event categories:

1. **Leadership Changes** — New C-suite, VP, or director hires in relevant departments. New leaders = new priorities = budget for new tools.
2. **Funding & Financial Events** — Recent funding rounds, IPO filings, revenue milestones, or cost-cutting announcements.
3. **Hiring Signals** — Job postings that indicate growth, new initiatives, or technology gaps.
4. **Product & Strategy Shifts** — New product launches, market expansions, pivots, or partnerships.
5. **Competitive Moves** — Competitor changes that create urgency or dissatisfaction.
6. **Regulatory & Industry Changes** — New compliance requirements or industry shifts affecting them.

For EACH trigger event found:
- **The Event**: What happened and when
- **Why It Matters**: How this connects to what I sell
- **Outreach Angle**: A specific opening line I can use
- **Urgency Level**: High / Medium / Low
- **Best Channel**: Email, LinkedIn, phone, or multi-touch

Rank the triggers by urgency and relevance. Give me the single best outreach message to send TODAY.`,
    variables: [
      { key: "COMPANY_NAME", label: "Target Company", placeholder: "e.g. Datadog", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud monitoring, DevOps", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. sales intelligence platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Buyer Role", placeholder: "e.g. VP of Sales, Head of Revenue Operations", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // EMAIL & OUTREACH
  // ═══════════════════════════════════════════
  {
    id: "linkedin-outreach",
    title: "LinkedIn Outreach Messages",
    description: "Generate 3 personalized LinkedIn connection/message variations for a target prospect.",
    category: "Email & Outreach",
    prompt: `Write 3 LinkedIn outreach message variations for the following prospect:

Name: [PROSPECT_NAME]
Role: [PROSPECT_ROLE]
Company: [PROSPECT_COMPANY]
Something notable about them: [NOTABLE_THING]
What I sell: [YOUR_PRODUCT]
Why it's relevant to them: [RELEVANCE]

For each variation, use a different approach:
1. The "mutual interest" angle — lead with something you genuinely have in common
2. The "insight" angle — share a relevant data point or observation about their industry
3. The "direct" angle — be upfront about why you're reaching out, but make it about them

Rules:
- Under 300 characters for connection requests, under 500 for InMails
- No cringe, no fake flattery, no "I noticed you're a leader in…"
- Sound like a real human, not a sales bot`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. Head of Revenue", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "NOTABLE_THING", label: "Something Notable", placeholder: "e.g. recently posted about scaling SDR teams", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "RELEVANCE", label: "Why It's Relevant", placeholder: "e.g. they're hiring 20 SDRs and need onboarding automation", type: "long" },
    ],
  },
  {
    id: "breakup-email",
    title: "Breakup Email Sequence",
    description: "Create a 3-part breakup email sequence for prospects who've gone silent.",
    category: "Email & Outreach",
    prompt: `Write a 3-part breakup email sequence for a prospect who has gone silent.

Context:
- Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
- What we discussed: [DISCUSSION_SUMMARY]
- Last contact: [LAST_CONTACT]
- How many follow-ups already sent: [FOLLOWUP_COUNT]

Write 3 emails:
1. Email 1 (Day 1): The "gentle nudge" — assume positive intent, offer value
2. Email 2 (Day 4): The "pattern interrupt" — try a completely different angle or format
3. Email 3 (Day 7): The "permission to close" — give them an easy out

Rules:
- Short (under 100 words each)
- No guilt-tripping or passive-aggressive tone
- Each email should work standalone
- Include subject lines`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Jordan", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. TechCo", type: "short" },
      { key: "DISCUSSION_SUMMARY", label: "What You Discussed", placeholder: "e.g. demo of our analytics platform, they liked the reporting features", type: "long" },
      { key: "LAST_CONTACT", label: "Last Contact", placeholder: "e.g. 2 weeks ago, after demo", type: "short" },
      { key: "FOLLOWUP_COUNT", label: "Follow-ups Already Sent", placeholder: "e.g. 2", type: "short" },
    ],
  },
  {
    id: "cold-email-scratch",
    title: "Cold Email from Scratch",
    description: "Generate 3 cold email variations using PAS, BAB, and AIDA frameworks.",
    category: "Email & Outreach",
    prompt: `Act as a world-class cold email copywriter who has written campaigns with 40%+ open rates and 8%+ reply rates. Generate 3 cold email variations for the following scenario:

My product: [YOUR_PRODUCT]
What it does: [PRODUCT_DESCRIPTION]
Target prospect: [PROSPECT_ROLE] at [PROSPECT_COMPANY]
Industry: [INDUSTRY]
Key pain point I solve: [PAIN_POINT]
Social proof: [SOCIAL_PROOF]

Write 3 variations, each using a different proven framework:

**Email 1: Problem-Agitate-Solve (PAS)**
- Open with the problem they're experiencing
- Agitate: make them feel the cost of not solving it
- Solve: introduce your solution as the answer

**Email 2: Before-After-Bridge (BAB)**
- Before: describe their current frustrating reality
- After: paint the picture of life with the problem solved
- Bridge: your product is the bridge between the two

**Email 3: AIDA (Attention-Interest-Desire-Action)**
- Attention: hook with a surprising stat or insight
- Interest: connect it to their specific situation
- Desire: show what's possible with proof
- Action: clear, low-friction CTA

Rules for ALL emails:
- Subject lines under 6 words (no clickbait)
- Body under 90 words
- One clear CTA (not "let me know if you're interested")
- No buzzwords (revolutionary, cutting-edge, game-changing)
- Sound like a human, not a marketing department
- Personalization that shows research, not just mail merge`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. Gong", type: "short" },
      { key: "PRODUCT_DESCRIPTION", label: "What It Does", placeholder: "e.g. AI that analyzes sales calls to find winning patterns", type: "long" },
      { key: "PROSPECT_ROLE", label: "Target Role", placeholder: "e.g. VP of Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Target Company", placeholder: "e.g. mid-market SaaS companies", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "PAIN_POINT", label: "Key Pain Point", placeholder: "e.g. reps losing deals because they talk too much and don't listen", type: "long" },
      { key: "SOCIAL_PROOF", label: "Social Proof", placeholder: "e.g. used by 3,000+ sales teams including LinkedIn and Shopify", type: "short" },
    ],
  },
  {
    id: "reengagement-campaign",
    title: "Re-engagement Campaign",
    description: "Craft a sequence for dead leads or closed-lost deals that resurfaces value without desperation.",
    category: "Email & Outreach",
    prompt: `Act as a senior demand gen strategist. Create a 4-email re-engagement sequence for contacts who have gone cold or deals that were closed-lost.

Context:
- My product: [YOUR_PRODUCT]
- Original reason they engaged: [ORIGINAL_INTEREST]
- Why they went cold/lost: [REASON_LOST]
- Time since last contact: [TIME_ELAPSED]
- Any changes since then: [WHATS_NEW]

Create a 4-email sequence spaced over 3 weeks:

**Email 1 (Day 1): The "No Ask" Value Drop**
- Share something genuinely useful (insight, data, resource) with zero sales pitch
- Acknowledge time has passed without being awkward about it

**Email 2 (Day 5): The "What's Changed" Update**
- Lead with what's new on YOUR side (new features, new customers in their space, new data)
- Subtly address why they originally said no

**Email 3 (Day 12): The "Social Proof" Nudge**
- Share a customer story from a similar company
- Focus on results and outcomes, not features

**Email 4 (Day 21): The "Door is Open" Close**
- Lightweight, warm, human
- Make it easy to re-engage or officially opt out

Rules:
- Never reference that they "ghosted" or "went silent"
- No fake urgency or manufactured scarcity
- Each email under 80 words
- Different subject line approach each time
- Every email provides standalone value even if they don't reply`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. marketing automation platform", type: "short" },
      { key: "ORIGINAL_INTEREST", label: "Original Interest", placeholder: "e.g. they wanted to automate their email nurture sequences", type: "long" },
      { key: "REASON_LOST", label: "Why They Went Cold", placeholder: "e.g. lost to competitor on price, budget freeze, champion left", type: "short" },
      { key: "TIME_ELAPSED", label: "Time Since Last Contact", placeholder: "e.g. 4 months", type: "short" },
      { key: "WHATS_NEW", label: "What's Changed Since Then", placeholder: "e.g. launched AI features, dropped pricing 20%, won their competitor as a customer", type: "long" },
    ],
  },
  {
    id: "referral-request",
    title: "Referral Request Email",
    description: "Generate warm referral ask emails for champions, customers, and mutual connections.",
    category: "Email & Outreach",
    prompt: `Act as a sales communication expert. Generate 3 referral request emails tailored to different relationships.

My product: [YOUR_PRODUCT]
My name: [YOUR_NAME]
Target company/role I want an intro to: [TARGET_INTRO]

Write 3 referral request emails:

**Email 1: Asking a Happy Customer**
- Recipient: [CUSTOMER_NAME] at [CUSTOMER_COMPANY]
- They've been a customer for [CUSTOMER_TENURE] and love [WHAT_THEY_LOVE]
- Ask for an intro to someone specific, not a vague "know anyone?"

**Email 2: Asking a Champion (Deal in Progress)**
- Asking your internal champion to forward something to the economic buyer or another stakeholder
- Make it easy: include the exact email they can forward

**Email 3: Asking a Mutual Connection**
- Leveraging a shared connection on LinkedIn
- Explain WHY you're reaching out and what's in it for the person being referred

Rules:
- Make the ask specific (name, company, role)
- Reduce friction: offer to draft the intro email for them
- Show gratitude without being sycophantic
- Include the "what's in it for them" angle
- Under 100 words each`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales coaching platform", type: "short" },
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "TARGET_INTRO", label: "Who You Want an Intro To", placeholder: "e.g. VP Sales at Series B+ SaaS companies", type: "short" },
      { key: "CUSTOMER_NAME", label: "Happy Customer Name", placeholder: "e.g. Mike", type: "short" },
      { key: "CUSTOMER_COMPANY", label: "Customer Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CUSTOMER_TENURE", label: "Customer Tenure", placeholder: "e.g. 8 months", type: "short" },
      { key: "WHAT_THEY_LOVE", label: "What They Love About Your Product", placeholder: "e.g. the call recording analytics saved their team 10 hrs/week", type: "long" },
    ],
  },
  {
    id: "event-followup",
    title: "Event / Webinar Follow-Up",
    description: "Personalized follow-ups referencing specific event content, booth visits, or webinar attendance.",
    category: "Email & Outreach",
    prompt: `Act as an event marketing strategist. Generate personalized follow-up emails for different event scenarios.

Event: [EVENT_NAME]
My product: [YOUR_PRODUCT]
My company: [YOUR_COMPANY]

Write follow-ups for 3 scenarios:

**Scenario 1: Booth/In-Person Conversation**
- Prospect: [PROSPECT_NAME], [PROSPECT_ROLE]
- What you discussed: [CONVERSATION_NOTES]
- Write a same-day follow-up that references the specific conversation

**Scenario 2: Webinar Attendee (No Direct Interaction)**
- They attended but didn't ask questions or interact
- Reference a specific insight from the presentation: [KEY_INSIGHT]
- Offer the recording + an additional resource

**Scenario 3: Speaker/Panel Connection**
- They were a speaker or panelist at the event
- Reference something specific they said: [SPEAKER_QUOTE]
- Position your outreach as peer-to-peer, not vendor-to-prospect

Rules:
- Send within 24 hours of the event
- Reference specific details (not "great event!")
- Each email under 100 words
- CTA should be low-commitment (not "book a demo")
- Include subject lines that stand out in a flooded post-event inbox`,
    variables: [
      { key: "EVENT_NAME", label: "Event Name", placeholder: "e.g. SaaStr Annual 2024", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "YOUR_COMPANY", label: "Your Company", placeholder: "e.g. CloserKit", type: "short" },
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Dana", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. CRO", type: "short" },
      { key: "CONVERSATION_NOTES", label: "Conversation Notes", placeholder: "e.g. discussed their challenge with rep ramp time, interested in AI coaching", type: "long" },
      { key: "KEY_INSIGHT", label: "Key Webinar Insight", placeholder: "e.g. the stat about 73% of deals stalling at the proposal stage", type: "short" },
      { key: "SPEAKER_QUOTE", label: "Speaker Quote/Point", placeholder: "e.g. their point about 'selling to the CFO, not the CTO'", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // MEETING & DISCOVERY
  // ═══════════════════════════════════════════
  {
    id: "meeting-agenda",
    title: "Meeting Agenda Builder",
    description: "Create a structured meeting agenda with time allocations, discovery questions, and next-step proposals.",
    category: "Meeting & Discovery",
    prompt: `Act as a senior sales enablement consultant. Build a structured meeting agenda for a [MEETING_TYPE] with [PROSPECT_ROLE] at [PROSPECT_COMPANY].

Meeting context:
- Meeting type: [MEETING_TYPE]
- Duration: [DURATION]
- Attendees from their side: [THEIR_ATTENDEES]
- Attendees from our side: [OUR_ATTENDEES]
- What we know so far: [KNOWN_CONTEXT]
- Key objective for this meeting: [OBJECTIVE]

Create a detailed agenda with:

1. **Time-Boxed Sections** — Every section gets a specific time allocation that adds up to [DURATION]
2. **Opening (2-3 min)** — Rapport-building question + agenda confirmation
3. **Discovery/Discussion Sections** — 3-4 sections with:
   - Topic and objective
   - 2-3 specific questions to ask
   - What to listen for
   - Transition to next section
4. **Value Demonstration** — How to connect their answers to your solution (without pitching)
5. **Next Steps (3-5 min)** — Specific next step proposals with dates, not vague "we'll follow up"
6. **Pre-Meeting Prep Checklist** — What to research before the call

Also include:
- 3 things that could derail this meeting and how to recover
- The ONE question you absolutely must get answered
- A post-meeting email template to send within 1 hour`,
    variables: [
      { key: "MEETING_TYPE", label: "Meeting Type", placeholder: "e.g. Discovery call, Demo, Proposal review", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP of Engineering", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. Notion", type: "short" },
      { key: "DURATION", label: "Meeting Duration", placeholder: "e.g. 30 minutes, 45 minutes", type: "short" },
      { key: "THEIR_ATTENDEES", label: "Their Attendees", placeholder: "e.g. VP Eng + 2 senior engineers", type: "short" },
      { key: "OUR_ATTENDEES", label: "Our Attendees", placeholder: "e.g. AE + SE", type: "short" },
      { key: "KNOWN_CONTEXT", label: "What You Know So Far", placeholder: "e.g. they're evaluating tools to replace internal solution, 50-person eng team", type: "long" },
      { key: "OBJECTIVE", label: "Key Meeting Objective", placeholder: "e.g. qualify budget and timeline, get access to economic buyer", type: "short" },
    ],
  },
  {
    id: "demo-script",
    title: "Demo Script Generator",
    description: "Build a tailored demo flow with talk tracks and objection responses at each stage.",
    category: "Meeting & Discovery",
    prompt: `Act as a sales engineer who has delivered 1,000+ demos. Build a tailored demo script for [PROSPECT_COMPANY].

Demo context:
- Prospect: [PROSPECT_ROLE] at [PROSPECT_COMPANY]
- Industry: [INDUSTRY]
- Their top 3 pain points: [PAIN_POINTS]
- Current solution: [CURRENT_SOLUTION]
- What impressed them so far: [IMPRESSED_BY]
- Demo duration: [DURATION]

Create a demo script with:

1. **Opening Hook (2 min)** — Start with THEIR problem, not your product. Reference something specific from discovery.

2. **"Day in the Life" Scenario** — Walk through their actual workflow, showing how it improves with your product. Use their terminology, their metrics, their use case.

3. **3 Key Moments** — For each pain point, create a "wow moment":
   - Setup: "You mentioned that [pain point]..."
   - Show: The specific feature/workflow that solves it
   - Impact: "This means [quantified improvement]..."
   - Proof: Customer example in their industry

4. **Objection Responses** — For each section, anticipate the top objection and prepare a response:
   - "What about [competitor]?" 
   - "How long does implementation take?"
   - "Can it integrate with [tool]?"

5. **Close & Next Steps** — Specific proposal for next step based on buying signals during demo

6. **Do's and Don'ts:**
   - Don't show features they didn't ask about
   - Don't say "as you can see" (they can see)
   - Do pause after wow moments for reactions
   - Do ask "how does that compare to how you do it today?" after each section`,
    variables: [
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. Head of Sales Ops", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. Figma", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. design software", type: "short" },
      { key: "PAIN_POINTS", label: "Top 3 Pain Points", placeholder: "1. Manual reporting taking 5 hrs/week\n2. No visibility into pipeline health\n3. Reps gaming forecast numbers", type: "long" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. Salesforce reports + spreadsheets", type: "short" },
      { key: "IMPRESSED_BY", label: "What Impressed Them", placeholder: "e.g. AI forecasting capabilities from the website", type: "short" },
      { key: "DURATION", label: "Demo Duration", placeholder: "e.g. 30 minutes", type: "short" },
    ],
  },
  {
    id: "post-meeting-summary",
    title: "Post-Meeting Summary & Next Steps",
    description: "Turn raw call notes into a polished recap email with action items and stakeholder assignments.",
    category: "Meeting & Discovery",
    prompt: `Act as a senior account executive who is known for impeccable follow-up. Turn my raw meeting notes into a polished post-meeting summary email.

Meeting details:
- Company: [COMPANY_NAME]
- Attendees: [ATTENDEES]
- Meeting type: [MEETING_TYPE]
- Date: [MEETING_DATE]

Raw notes from the meeting:
[RAW_NOTES]

Create a professional follow-up email with:

1. **Subject Line** — Specific and action-oriented (not "Great meeting today")

2. **Opening** — 1 sentence thanking them + referencing a specific moment from the call that shows you were listening

3. **Key Takeaways** (3-5 bullets) — Summarize what THEY said, not what you pitched. Use their exact words where possible.

4. **Agreed Action Items** — Table format:
   | Action Item | Owner | Due Date |
   
5. **Next Steps** — Specific next meeting/milestone with proposed date

6. **Attachments/Resources** — List anything you promised to send

7. **Open Questions** — Any items that need follow-up or clarification

Rules:
- Send within 2 hours of the meeting
- Under 300 words total
- Tone: professional but warm, not corporate-speak
- Make them feel heard, not sold to
- Bold the most important action items`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ATTENDEES", label: "Attendees", placeholder: "e.g. Sarah (VP Sales), Mike (CTO), us: Jordan (AE) + Taylor (SE)", type: "long" },
      { key: "MEETING_TYPE", label: "Meeting Type", placeholder: "e.g. Discovery call, Technical deep-dive", type: "short" },
      { key: "MEETING_DATE", label: "Meeting Date", placeholder: "e.g. March 15, 2025", type: "short" },
      { key: "RAW_NOTES", label: "Raw Meeting Notes", placeholder: "Paste your raw notes, bullet points, or transcript highlights...", type: "long" },
    ],
  },
  {
    id: "multi-thread",
    title: "Multi-Thread Strategy",
    description: "Generate personalized outreach for every stakeholder in a deal — champion, buyer, evaluator, blocker.",
    category: "Meeting & Discovery",
    prompt: `Act as an enterprise sales strategist specializing in complex, multi-stakeholder deals. Help me multi-thread into [COMPANY_NAME].

Deal context:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- Current champion: [CHAMPION_INFO]
- Product: [YOUR_PRODUCT]
- Key business problem: [BUSINESS_PROBLEM]

Known and suspected stakeholders:
[STAKEHOLDER_LIST]

For each stakeholder persona, create:

1. **Champion (Your Internal Advocate)**
   - How to arm them for internal meetings
   - Draft email they can forward to their boss
   - Talking points for when they sell internally
   - How to keep them engaged without being needy

2. **Economic Buyer (Controls Budget)**
   - What they care about (ROI, risk, strategic alignment)
   - Outreach message that speaks their language
   - The 3 numbers they need to see
   - How to get a meeting without going around your champion

3. **Technical Evaluator (Validates the Solution)**
   - Technical proof points and architecture questions to preempt
   - Outreach angle: peer-to-peer, not sales-to-tech
   - Resources to share (docs, sandbox, case studies)

4. **Potential Blocker (Procurement, Legal, Skeptic)**
   - Why they might block and how to neutralize
   - Outreach message that acknowledges their concerns
   - How to turn them from blocker to neutral/supporter

5. **Multi-Thread Action Plan** — Week-by-week plan for engaging all stakeholders without stepping on toes.

Be specific to THIS deal. No generic stakeholder advice.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $150K ARR", type: "short" },
      { key: "CHAMPION_INFO", label: "Champion Info", placeholder: "e.g. Sarah, Director of RevOps, strong advocate but doesn't control budget", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "BUSINESS_PROBLEM", label: "Business Problem", placeholder: "e.g. forecast accuracy is below 60%, losing deals to competitors in late stages", type: "long" },
      { key: "STAKEHOLDER_LIST", label: "Known/Suspected Stakeholders", placeholder: "1. Sarah - Dir RevOps (champion)\n2. Unknown CFO\n3. IT team (security review)\n4. Current vendor relationship owner", type: "long" },
    ],
  },

  // ═══════════════════════════════════════════
  // PROPOSALS & CLOSING
  // ═══════════════════════════════════════════
  {
    id: "proposal-draft",
    title: "Proposal / Executive Summary Writer",
    description: "Generate a polished executive summary for your proposal based on discovery call notes.",
    category: "Proposals & Closing",
    prompt: `Based on the following discovery call notes, write a professional executive summary for a proposal.

Company: [COMPANY_NAME]
Contact: [CONTACT_NAME], [CONTACT_ROLE]
Industry: [INDUSTRY]

Discovery notes:
[DISCOVERY_NOTES]

Our solution: [YOUR_SOLUTION]
Pricing: [PRICING]

Write the executive summary with these sections:
1. Current Situation & Challenges
2. Desired Outcomes
3. Recommended Solution
4. Expected ROI / Business Impact
5. Investment & Next Steps

Tone: professional but not stiff. Make it about THEM, not us. Every section should reference specific things they told you in discovery.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CONTACT_NAME", label: "Contact Name", placeholder: "e.g. Sarah Johnson", type: "short" },
      { key: "CONTACT_ROLE", label: "Contact Role", placeholder: "e.g. VP of Operations", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. manufacturing", type: "short" },
      { key: "DISCOVERY_NOTES", label: "Discovery Call Notes", placeholder: "Paste your notes from the call...", type: "long" },
      { key: "YOUR_SOLUTION", label: "Your Solution (brief)", placeholder: "e.g. AI-powered inventory management platform", type: "short" },
      { key: "PRICING", label: "Pricing", placeholder: "e.g. $2,500/mo for team plan", type: "short" },
    ],
  },
  {
    id: "mutual-action-plan",
    title: "Mutual Action Plan Generator",
    description: "Create a shared close plan with milestones, owners, dates, and risk flags for enterprise deals.",
    category: "Proposals & Closing",
    prompt: `Act as an enterprise sales closing specialist. Create a Mutual Action Plan (MAP) for a complex deal.

Deal context:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- Target close date: [CLOSE_DATE]
- Champion: [CHAMPION]
- Economic buyer: [ECON_BUYER]
- Current stage: [CURRENT_STAGE]
- Known requirements: [REQUIREMENTS]

Create a comprehensive Mutual Action Plan with:

1. **Shared Objective Statement** — 2 sentences framing this as a partnership, not a sales process

2. **Milestone Timeline** (work backwards from close date):
   | Milestone | Owner | Target Date | Status | Dependencies |
   Include: Technical validation, security review, legal/procurement, executive sponsor meeting, business case approval, contract execution

3. **Success Criteria** — What does "yes" look like for each stakeholder?

4. **Risk Register**:
   | Risk | Likelihood | Impact | Mitigation |
   Include at least 5 risks (budget freeze, champion leaves, competitor swoops, legal delays, scope creep)

5. **Communication Plan** — Cadence for check-ins, who talks to whom, escalation path

6. **Go-Live Plan** — Post-signature: implementation timeline, training, first value milestone

Make this something I can share directly with the prospect. Professional, collaborative tone — this is THEIR plan as much as ours.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $200K ARR", type: "short" },
      { key: "CLOSE_DATE", label: "Target Close Date", placeholder: "e.g. March 31, 2025", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP of Sales", type: "short" },
      { key: "ECON_BUYER", label: "Economic Buyer", placeholder: "e.g. CFO, Mike Thompson", type: "short" },
      { key: "CURRENT_STAGE", label: "Current Stage", placeholder: "e.g. post-demo, entering technical validation", type: "short" },
      { key: "REQUIREMENTS", label: "Known Requirements", placeholder: "e.g. SSO required, SOC2 compliance, Salesforce integration, 3 department rollout", type: "long" },
    ],
  },
  {
    id: "business-case",
    title: "Business Case Builder",
    description: "Generate a CFO-ready business case with ROI analysis, cost of inaction, and risk mitigation.",
    category: "Proposals & Closing",
    prompt: `Act as a management consultant at McKinsey. Build a CFO-ready business case for purchasing [YOUR_PRODUCT].

Context:
- Prospect company: [COMPANY_NAME]
- Industry: [INDUSTRY]
- Company size: [COMPANY_SIZE]
- Current solution: [CURRENT_SOLUTION]
- Key pain points: [PAIN_POINTS]
- Your product: [YOUR_PRODUCT]
- Your pricing: [PRICING]
- Implementation timeline: [IMPL_TIMELINE]

Build a business case document with:

1. **Executive Summary** (3 sentences max) — Problem, solution, expected outcome

2. **Current State Analysis**
   - Quantified cost of current approach (time, money, opportunity cost)
   - Hidden costs they're probably not tracking
   - Risk of maintaining status quo

3. **Cost of Inaction (12-month projection)**
   - Revenue at risk
   - Productivity losses
   - Competitive disadvantage
   - Employee turnover impact

4. **Proposed Investment**
   - Total cost (license + implementation + training)
   - Payment structure options

5. **Expected Returns**
   - Conservative, moderate, and aggressive scenarios
   - Time to first value
   - 12-month and 36-month ROI projections
   - Payback period calculation

6. **Risk Mitigation**
   - Implementation risks and mitigation plans
   - Rollback plan if it doesn't work
   - Vendor stability and support

7. **Recommendation & Next Steps**

Include actual formulas and show your math. CFOs want to see the calculation, not just the conclusion.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. e-commerce", type: "short" },
      { key: "COMPANY_SIZE", label: "Company Size", placeholder: "e.g. 500 employees, $80M revenue", type: "short" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. manual processes + spreadsheets", type: "short" },
      { key: "PAIN_POINTS", label: "Key Pain Points", placeholder: "e.g. 30% forecast miss rate, 5 hrs/week on manual reporting, no pipeline visibility", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "PRICING", label: "Your Pricing", placeholder: "e.g. $50K/year for team of 30", type: "short" },
      { key: "IMPL_TIMELINE", label: "Implementation Timeline", placeholder: "e.g. 4-week setup, full rollout in 8 weeks", type: "short" },
    ],
  },
  {
    id: "negotiation-prep",
    title: "Negotiation Prep & Concession Strategy",
    description: "Generate a negotiation playbook with BATNA, concession ladder, and walk-away triggers.",
    category: "Proposals & Closing",
    prompt: `Act as a negotiation coach who has trained 500+ enterprise sales teams. Help me prepare for a pricing negotiation.

Deal context:
- Company: [COMPANY_NAME]
- Deal size (list price): [LIST_PRICE]
- Floor price (walk-away): [FLOOR_PRICE]
- Prospect's likely budget: [THEIR_BUDGET]
- Competition: [COMPETITION]
- Leverage we have: [OUR_LEVERAGE]
- Leverage they have: [THEIR_LEVERAGE]
- Decision timeline: [TIMELINE]

Build a negotiation playbook:

1. **Pre-Negotiation Analysis**
   - Their likely opening position and reasoning
   - Our BATNA (Best Alternative to Negotiated Agreement)
   - Their BATNA
   - ZOPA (Zone of Possible Agreement)

2. **Concession Ladder** (from smallest to largest):
   | Concession | Cost to Us | Value to Them | When to Use |
   Include 8-10 concessions mixing: payment terms, implementation support, contract length, feature access, training, SLA guarantees

3. **Non-Monetary Trades** — Things that cost us nothing but have high perceived value:
   - Case study participation
   - Advisory board seat
   - Early access to new features
   - Executive sponsor access

4. **Objection Responses**:
   - "Your competitor is 30% cheaper" →
   - "We need a bigger discount for multi-year" →
   - "Our procurement requires 3 bids" →
   - "We need to reduce scope to hit budget" →

5. **Walk-Away Triggers** — Specific signals that mean this deal isn't worth closing

6. **Closing Techniques** — 3 closing approaches for this specific deal

Never discount without getting something in return. Every concession should be traded, not given.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "LIST_PRICE", label: "List Price", placeholder: "e.g. $120K ARR", type: "short" },
      { key: "FLOOR_PRICE", label: "Walk-Away Price", placeholder: "e.g. $90K ARR", type: "short" },
      { key: "THEIR_BUDGET", label: "Their Likely Budget", placeholder: "e.g. $80-100K based on their team size", type: "short" },
      { key: "COMPETITION", label: "Competition", placeholder: "e.g. evaluating us vs. Gong and Chorus", type: "short" },
      { key: "OUR_LEVERAGE", label: "Our Leverage", placeholder: "e.g. champion loves us, technical validation complete, competitor can't do X", type: "long" },
      { key: "THEIR_LEVERAGE", label: "Their Leverage", placeholder: "e.g. end of our quarter, they can wait, multiple alternatives", type: "long" },
      { key: "TIMELINE", label: "Decision Timeline", placeholder: "e.g. need to close by March 31", type: "short" },
    ],
  },
  {
    id: "champion-enablement",
    title: "Champion Enablement Kit",
    description: "Create internal selling materials your champion can use: one-pager, exec email draft, FAQ for skeptics.",
    category: "Proposals & Closing",
    prompt: `Act as a sales enablement leader. Create a Champion Enablement Kit — a set of materials my internal champion can use to sell on my behalf inside their organization.

Context:
- Champion: [CHAMPION_NAME], [CHAMPION_ROLE]
- Company: [COMPANY_NAME]
- Our product: [YOUR_PRODUCT]
- Key problem we solve: [KEY_PROBLEM]
- ROI/results: [ROI_DATA]
- Who else needs to approve: [APPROVERS]

Create these 4 deliverables:

**1. Internal One-Pager** (for the champion to share)
- Problem statement (in THEIR language, not ours)
- Proposed solution (3 bullets max)
- Expected impact (with numbers)
- Investment required
- Recommended next step
- Format: clean, no vendor logos, looks like an internal doc

**2. Executive Email Draft** (champion → their boss)
- Subject line
- 4-paragraph email the champion can send to the economic buyer
- Frames it as the champion's recommendation, not a vendor pitch
- Includes the business case in 2 sentences

**3. FAQ for Skeptics**
- 8-10 likely questions from procurement, legal, IT, or skeptical executives
- Concise answers the champion can give verbally in meetings
- Include: security, implementation time, competitor comparison, ROI proof, integration, contract terms

**4. Internal Presentation Talking Points**
- 5 slides worth of talking points for when the champion presents to the buying committee
- Each slide: headline, 3 bullets, one proof point

Make everything sound like it came from the champion, not from us. No salesy language.`,
    variables: [
      { key: "CHAMPION_NAME", label: "Champion Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "CHAMPION_ROLE", label: "Champion Role", placeholder: "e.g. Director of Sales Operations", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI-powered revenue forecasting", type: "short" },
      { key: "KEY_PROBLEM", label: "Key Problem You Solve", placeholder: "e.g. forecast accuracy is 55%, causing missed targets and bad board reports", type: "long" },
      { key: "ROI_DATA", label: "ROI / Results Data", placeholder: "e.g. customers see 35% improvement in forecast accuracy within 90 days", type: "long" },
      { key: "APPROVERS", label: "Who Else Needs to Approve", placeholder: "e.g. CFO (budget), CTO (security), VP Sales (adoption)", type: "long" },
    ],
  },
  {
    id: "contract-redline",
    title: "Contract Redline Response",
    description: "Generate professional responses to common legal and procurement pushback.",
    category: "Proposals & Closing",
    prompt: `Act as a sales leader who has negotiated 200+ enterprise contracts. Help me respond to legal/procurement redline requests.

Deal context:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- Their legal/procurement concern areas: [CONCERN_AREAS]
- Our flexibility: [OUR_FLEXIBILITY]

Generate professional responses for these common redline requests:

1. **Liability Cap** — They want to cap liability at the contract value
2. **Indemnification** — They want broad indemnification
3. **Data Processing Agreement** — They need a DPA or data residency requirements
4. **Termination for Convenience** — They want to exit anytime with 30-day notice
5. **SLA & Uptime Guarantees** — They want 99.99% uptime with financial penalties
6. **IP Ownership** — They want to own customizations or integrations
7. **Auto-Renewal Removal** — They want to remove auto-renewal clauses
8. **Payment Terms** — They want Net 60 or Net 90 instead of Net 30
9. **Most Favored Nation** — They want a guarantee they're getting the best price
10. **Audit Rights** — They want the right to audit your systems

For EACH redline:
- **Their Position**: What they're asking for and why
- **Our Recommended Response**: Professional language that protects our position
- **Compromise Position**: A middle ground if they push back
- **Walk-Away Signal**: When this request becomes a deal-breaker

Keep responses firm but collaborative. The goal is to close the deal, not win an argument.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $150K ARR", type: "short" },
      { key: "CONCERN_AREAS", label: "Their Main Concerns", placeholder: "e.g. data security, liability, payment terms, termination rights", type: "long" },
      { key: "OUR_FLEXIBILITY", label: "Where We Can Flex", placeholder: "e.g. flexible on payment terms, can offer enhanced SLA, won't budge on liability cap below 2x", type: "long" },
    ],
  },
  {
    id: "closed-lost-winback",
    title: "Closed-Lost Win-Back",
    description: "Analyze why a deal was lost and generate a re-engagement strategy timed to their renewal cycle.",
    category: "Proposals & Closing",
    prompt: `Act as a win-back strategist. Analyze this closed-lost deal and create a re-engagement plan.

Lost deal details:
- Company: [COMPANY_NAME]
- Original deal size: [DEAL_SIZE]
- Lost date: [LOST_DATE]
- Reason lost: [REASON_LOST]
- Who they chose instead: [COMPETITOR_CHOSEN]
- Champion status: [CHAMPION_STATUS]
- Their contract/renewal date (if known): [RENEWAL_DATE]

Produce:

1. **Loss Analysis**
   - Root cause diagnosis (was it really the stated reason?)
   - What we could have done differently
   - Buying signals we missed

2. **Win-Back Timing Strategy**
   - Optimal re-engagement window based on their renewal cycle
   - Trigger events to monitor (leadership changes, competitor issues, growth signals)
   - Drip touchpoint calendar (months 1-12 post-loss)

3. **Re-Engagement Sequence** (5 touches over 3 months):
   - Touch 1: Value-add with zero pitch (relevant content, data, or insight)
   - Touch 2: "What's changed" update highlighting improvements since they evaluated
   - Touch 3: Competitive intelligence (if their chosen vendor has issues)
   - Touch 4: Customer proof from their industry/segment
   - Touch 5: Direct re-engagement ask with specific business angle

4. **Messaging Adjustments**
   - What to say differently this time
   - Objections to preempt based on why they left
   - New proof points or capabilities to highlight

5. **Disqualification Criteria** — When to stop pursuing and move on

Never sound desperate or bitter about the loss. Position every touchpoint as genuinely helpful.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Original Deal Size", placeholder: "e.g. $80K ARR", type: "short" },
      { key: "LOST_DATE", label: "When You Lost", placeholder: "e.g. October 2024", type: "short" },
      { key: "REASON_LOST", label: "Stated Reason Lost", placeholder: "e.g. went with competitor on price, budget cut, chose to build in-house", type: "long" },
      { key: "COMPETITOR_CHOSEN", label: "Who They Chose", placeholder: "e.g. Competitor X, built in-house, did nothing", type: "short" },
      { key: "CHAMPION_STATUS", label: "Champion Status", placeholder: "e.g. still there and friendly, left the company, went cold", type: "short" },
      { key: "RENEWAL_DATE", label: "Their Renewal/Contract End Date", placeholder: "e.g. September 2025, unknown", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // ACCOUNT MANAGEMENT
  // ═══════════════════════════════════════════
  {
    id: "qbr-prep",
    title: "QBR Prep & Presentation",
    description: "Generate a Quarterly Business Review with usage analysis, ROI recap, and expansion opportunities.",
    category: "Account Management",
    prompt: `Act as a customer success strategist. Build a comprehensive QBR (Quarterly Business Review) preparation package.

Account details:
- Company: [COMPANY_NAME]
- Account size: [ACCOUNT_SIZE]
- Customer since: [CUSTOMER_SINCE]
- Primary contact: [PRIMARY_CONTACT]
- Executive sponsor: [EXEC_SPONSOR]
- Key use cases: [USE_CASES]
- Usage/adoption data: [USAGE_DATA]
- Any issues this quarter: [ISSUES]
- Renewal date: [RENEWAL_DATE]

Build a QBR package with:

1. **Executive Summary Slide**
   - Partnership health score (green/yellow/red) with reasoning
   - Top 3 wins this quarter
   - One area of concern (be honest)

2. **Value Delivered** (the most important section)
   - ROI analysis based on their usage data
   - Before vs. after metrics
   - Time saved, revenue generated, or costs reduced
   - Comparison to initial business case projections

3. **Adoption & Usage Analysis**
   - Key metrics vs. benchmarks for their segment
   - Feature utilization heat map (what they use vs. what they don't)
   - Power users vs. low adopters
   - Recommendations to increase adoption

4. **Roadmap Preview**
   - 2-3 upcoming features relevant to their use cases
   - How these features address feedback they've given

5. **Strategic Recommendations**
   - Expansion opportunities (new teams, use cases, features)
   - Risk areas to address before renewal
   - Success plan for next quarter with specific goals

6. **Discussion Questions** — 5 questions to spark strategic conversation (not status updates)

Make this feel like a strategic partnership review, not a vendor check-in.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ACCOUNT_SIZE", label: "Account Size", placeholder: "e.g. $120K ARR, 50 seats", type: "short" },
      { key: "CUSTOMER_SINCE", label: "Customer Since", placeholder: "e.g. January 2024", type: "short" },
      { key: "PRIMARY_CONTACT", label: "Primary Contact", placeholder: "e.g. Sarah, Director of Ops", type: "short" },
      { key: "EXEC_SPONSOR", label: "Executive Sponsor", placeholder: "e.g. VP of Sales, Mike", type: "short" },
      { key: "USE_CASES", label: "Key Use Cases", placeholder: "e.g. pipeline management, forecasting, rep coaching", type: "long" },
      { key: "USAGE_DATA", label: "Usage/Adoption Data", placeholder: "e.g. 85% daily active users, 120 reports generated/month, 3 integrations active", type: "long" },
      { key: "ISSUES", label: "Issues This Quarter", placeholder: "e.g. one outage in Feb, feature request for custom fields delayed, 2 users churned", type: "long" },
      { key: "RENEWAL_DATE", label: "Renewal Date", placeholder: "e.g. December 2025", type: "short" },
    ],
  },
  {
    id: "expansion-upsell",
    title: "Expansion / Upsell Pitch",
    description: "Craft an upsell or cross-sell pitch based on current usage, new use cases, and stakeholder mapping.",
    category: "Account Management",
    prompt: `Act as an account expansion strategist. Help me build an upsell/cross-sell pitch for an existing customer.

Account context:
- Company: [COMPANY_NAME]
- Current plan: [CURRENT_PLAN]
- Current ARR: [CURRENT_ARR]
- Target expansion ARR: [TARGET_ARR]
- Usage patterns: [USAGE_PATTERNS]
- Teams currently using: [CURRENT_TEAMS]
- Teams NOT using yet: [POTENTIAL_TEAMS]
- Champion: [CHAMPION]
- Expansion opportunity: [EXPANSION_OPP]

Create an expansion strategy:

1. **Expansion Opportunity Analysis**
   - Which expansion path has the highest probability? (new seats, new tier, new product, new department)
   - Evidence from their usage that supports the expansion
   - Timing signals (why now?)

2. **Value Story for Each Stakeholder**
   - Current champion: How expansion makes THEM look good
   - New department head: What problem does it solve for THEIR team?
   - Economic buyer: ROI of expansion vs. cost

3. **Outreach Sequence**
   - Email to champion floating the expansion idea
   - Internal deck the champion can use to pitch to new department
   - Email to new department head (warm intro from champion)
   - Executive justification email for budget approval

4. **Pricing & Packaging Strategy**
   - How to bundle for maximum perceived value
   - Anchor price and negotiation range
   - Multi-year incentive if applicable
   - "Pilot" option to reduce risk perception

5. **Objection Playbook**
   - "We're happy with what we have" →
   - "Budget is tight" →
   - "The other team has different needs" →
   - "We need to see more ROI first" →

Be specific to THIS account. Use their usage data as evidence.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CURRENT_PLAN", label: "Current Plan", placeholder: "e.g. Professional tier, 30 seats", type: "short" },
      { key: "CURRENT_ARR", label: "Current ARR", placeholder: "e.g. $45K", type: "short" },
      { key: "TARGET_ARR", label: "Target Expansion ARR", placeholder: "e.g. $90K", type: "short" },
      { key: "USAGE_PATTERNS", label: "Usage Patterns", placeholder: "e.g. maxing out API limits, 95% seat utilization, requesting enterprise features", type: "long" },
      { key: "CURRENT_TEAMS", label: "Teams Currently Using", placeholder: "e.g. Sales (30 reps)", type: "short" },
      { key: "POTENTIAL_TEAMS", label: "Teams Not Using Yet", placeholder: "e.g. Customer Success (20 people), Marketing (15 people)", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP Sales — loves the product", type: "short" },
      { key: "EXPANSION_OPP", label: "Expansion Opportunity", placeholder: "e.g. CS team wants to use for QBRs, Marketing wants lead scoring", type: "long" },
    ],
  },
  {
    id: "churn-risk",
    title: "Churn Risk Analysis",
    description: "Analyze account health signals and generate a save strategy with re-engagement talk tracks.",
    category: "Account Management",
    prompt: `Act as a customer retention specialist. Analyze this at-risk account and create a save strategy.

Account details:
- Company: [COMPANY_NAME]
- Account size: [ACCOUNT_SIZE]
- Customer since: [CUSTOMER_SINCE]
- Renewal date: [RENEWAL_DATE]
- Primary contact: [PRIMARY_CONTACT]
- Executive sponsor: [EXEC_SPONSOR]

Risk signals:
[RISK_SIGNALS]

Usage trends:
[USAGE_TRENDS]

Recent interactions:
[RECENT_INTERACTIONS]

Produce:

1. **Churn Risk Assessment**
   - Risk score (1-10) with detailed reasoning
   - Primary churn driver (value gap, relationship gap, competitive threat, budget)
   - Estimated probability of renewal at current trajectory
   - Revenue at risk (including downstream referrals and expansion)

2. **Root Cause Analysis**
   - Is this a product problem, a people problem, or a process problem?
   - What did we miss and when?
   - Was there a specific inflection point where things went wrong?

3. **30-60-90 Day Save Plan**
   | Timeframe | Action | Owner | Expected Outcome |
   - Week 1-2: Immediate triage (executive involvement, escalation)
   - Month 1: Value re-establishment (quick wins, training, optimization)
   - Month 2: Relationship rebuilding (executive alignment, roadmap preview)
   - Month 3: Renewal positioning (new success metrics, case study creation)

4. **Talk Tracks for Critical Conversations**
   - "We noticed your usage has declined..." → 
   - "I understand you're evaluating alternatives..." →
   - "What would need to change for you to renew?" →
   - "Here's what we've improved since you raised concerns..." →

5. **Escalation Criteria** — When to involve executives, when to offer concessions, when to let them go

Be honest in the assessment. A false save attempt wastes everyone's time.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ACCOUNT_SIZE", label: "Account Size", placeholder: "e.g. $80K ARR, 40 seats", type: "short" },
      { key: "CUSTOMER_SINCE", label: "Customer Since", placeholder: "e.g. March 2023", type: "short" },
      { key: "RENEWAL_DATE", label: "Renewal Date", placeholder: "e.g. June 2025", type: "short" },
      { key: "PRIMARY_CONTACT", label: "Primary Contact", placeholder: "e.g. Jordan, Sales Ops Manager", type: "short" },
      { key: "EXEC_SPONSOR", label: "Executive Sponsor", placeholder: "e.g. VP Sales (disengaged since Q3)", type: "short" },
      { key: "RISK_SIGNALS", label: "Risk Signals", placeholder: "e.g. usage dropped 40%, champion left, missed last 2 check-ins, asked about data export", type: "long" },
      { key: "USAGE_TRENDS", label: "Usage Trends", placeholder: "e.g. DAU went from 35 to 18, report generation down 60%, stopped using new features", type: "long" },
      { key: "RECENT_INTERACTIONS", label: "Recent Interactions", placeholder: "e.g. last QBR was tense, they raised concerns about missing features, support tickets up 3x", type: "long" },
    ],
  },

  // ═══════════════════════════════════════════
  // SALES LEADERSHIP (NEW CATEGORY)
  // ═══════════════════════════════════════════
  {
    id: "sales-hiring-scorecard",
    title: "Sales Hiring Scorecard",
    description: "Create a structured interview scorecard for hiring AEs, SDRs, or Sales Engineers.",
    category: "Sales Leadership",
    prompt: `Act as a VP of Sales who has built 5+ sales teams from scratch. Create a comprehensive hiring scorecard for a [ROLE_TITLE] position.

Company context:
- Company: [COMPANY_NAME]
- What you sell: [YOUR_PRODUCT]
- Sales motion: [SALES_MOTION]
- Average deal size: [DEAL_SIZE]
- Team size: [TEAM_SIZE]

Build a complete hiring scorecard:

1. **Role Profile**
   - Must-have vs. nice-to-have qualifications
   - Red flags that predict failure in this role
   - Ideal candidate profile (experience, traits, background)

2. **Interview Scorecard** — Rate each category 1-5:

   **Skill Assessment Areas:**
   | Category | Weight | What to Evaluate | Sample Questions |
   Include: Discovery skills, objection handling, closing ability, pipeline management, technical aptitude, coachability, work ethic, cultural fit

3. **Role-Play Scenarios** (3 scenarios):
   - Cold call simulation
   - Discovery call simulation  
   - Objection handling under pressure
   - Scoring criteria for each

4. **Behavioral Interview Questions** (10 questions):
   - Past performance indicators
   - Problem-solving approach
   - Resilience and grit signals
   - Team collaboration style

5. **Reference Check Script** — 5 questions for back-channel references

6. **Compensation Benchmarking**
   - Suggested OTE range based on market
   - Base/variable split recommendation
   - Ramp period and quota expectations

Make this a document the hiring manager can print and use in every interview round.`,
    variables: [
      { key: "ROLE_TITLE", label: "Role Title", placeholder: "e.g. Account Executive, SDR, Sales Engineer", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. AI-powered CRM", type: "short" },
      { key: "SALES_MOTION", label: "Sales Motion", placeholder: "e.g. enterprise outbound, product-led growth, channel", type: "short" },
      { key: "DEAL_SIZE", label: "Average Deal Size", placeholder: "e.g. $50K ARR", type: "short" },
      { key: "TEAM_SIZE", label: "Current Team Size", placeholder: "e.g. 8 AEs, 4 SDRs", type: "short" },
    ],
  },
  {
    id: "pipeline-review-framework",
    title: "Pipeline Review Framework",
    description: "Structured framework for running effective pipeline review meetings with your sales team.",
    category: "Sales Leadership",
    prompt: `Act as a CRO who runs the most effective pipeline reviews in SaaS. Create a structured pipeline review framework for my team.

Team context:
- Team size: [TEAM_SIZE]
- Average deal cycle: [DEAL_CYCLE]
- Quota per rep: [QUOTA]
- Current pipeline coverage: [COVERAGE]
- CRM: [CRM]

Build a comprehensive pipeline review framework:

1. **Pre-Review Prep** (what reps must prepare):
   - Pipeline snapshot: deals by stage, total value, weighted value
   - Commit list vs. best-case list
   - Stuck deals (>2x average stage duration)
   - New pipeline added this week
   - Deals that moved backward or slipped

2. **Review Structure** (45-minute format):
   | Time | Section | Focus |
   - 0-5 min: Top-of-funnel health check
   - 5-20 min: Commit deals deep-dive (only deals rep is committing to close this period)
   - 20-30 min: At-risk deals and recovery plans
   - 30-40 min: Best-case deals — what needs to happen to convert
   - 40-45 min: Action items and accountability

3. **Questions Framework** — For each deal reviewed:
   - "What has changed since last review?"
   - "What is the next concrete step and when?"
   - "Who is the economic buyer and have we met them?"
   - "What's the compelling event / why now?"
   - "If you had to bet your own money, would you bet this closes?"

4. **Red Flag Checklist**:
   - ⚠️ Single-threaded (only one contact)
   - ⚠️ No next step scheduled
   - ⚠️ Haven't met the economic buyer
   - ⚠️ Prospect is "evaluating" with no timeline
   - ⚠️ Deal size changed without explanation
   - ⚠️ Rep can't articulate the compelling event

5. **Coaching Moments** — How to turn reviews into coaching:
   - When to coach vs. when to direct
   - How to ask questions that make reps think
   - Building accountability without micromanaging

6. **Post-Review Actions Template**:
   - Deals to escalate
   - Deals to kill
   - Deals that need executive involvement
   - Pipeline generation targets for next week

Make this practical — something a frontline manager can use starting tomorrow.`,
    variables: [
      { key: "TEAM_SIZE", label: "Team Size", placeholder: "e.g. 8 AEs", type: "short" },
      { key: "DEAL_CYCLE", label: "Average Deal Cycle", placeholder: "e.g. 45 days", type: "short" },
      { key: "QUOTA", label: "Quota per Rep", placeholder: "e.g. $500K/quarter", type: "short" },
      { key: "COVERAGE", label: "Current Pipeline Coverage", placeholder: "e.g. 2.8x", type: "short" },
      { key: "CRM", label: "CRM", placeholder: "e.g. Salesforce, HubSpot", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // MORE PROSPECTING
  // ═══════════════════════════════════════════
  {
    id: "linkedin-profile-optimizer",
    title: "LinkedIn Profile Optimizer",
    description: "Rewrite your LinkedIn profile to attract inbound leads and position you as a trusted advisor.",
    category: "Prospecting",
    prompt: `Act as a personal branding consultant who specializes in LinkedIn for B2B sales professionals. Rewrite my LinkedIn profile to attract inbound leads.

Current profile info:
- Name: [YOUR_NAME]
- Current role: [YOUR_ROLE]
- Company: [YOUR_COMPANY]
- What you sell: [YOUR_PRODUCT]
- Target buyer: [TARGET_BUYER]
- Key results you've helped customers achieve: [KEY_RESULTS]
- Your unique angle/expertise: [UNIQUE_ANGLE]

Rewrite these sections:

1. **Headline** (220 chars max) — 3 variations:
   - Formula: [Who you help] + [How you help them] + [Proof/credibility]
   - No job titles like "AE at Company" — that says nothing
   - Example: "Helping B2B sales teams 3x reply rates | Ex-Gong, trained 500+ reps"

2. **About Section** (2,600 chars max):
   - Hook: First 2 lines must stop the scroll (this is what shows before "see more")
   - Problem: What keeps your buyers up at night
   - Solution: How you help (NOT a product pitch — your expertise)
   - Proof: 2-3 specific results with numbers
   - CTA: One clear next step
   - Written in first person, conversational tone

3. **Featured Section** — 3 content ideas to pin:
   - A value-add post that showcases expertise
   - A case study or customer win
   - A lead magnet or free resource

4. **Experience Section** — Rewrite current role:
   - Lead with impact, not responsibilities
   - Include metrics and customer outcomes
   - Make it readable (bullets, not paragraphs)

5. **Banner Image Concept** — Describe what the banner should communicate

Rules: No buzzwords (passionate, driven, results-oriented). No "I help companies leverage synergies." Sound human.`,
    variables: [
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "YOUR_ROLE", label: "Current Role", placeholder: "e.g. Senior AE", type: "short" },
      { key: "YOUR_COMPANY", label: "Company", placeholder: "e.g. Gong", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "TARGET_BUYER", label: "Target Buyer", placeholder: "e.g. VP Sales at mid-market SaaS companies", type: "short" },
      { key: "KEY_RESULTS", label: "Key Results", placeholder: "e.g. helped 50+ teams improve forecast accuracy by 35%", type: "long" },
      { key: "UNIQUE_ANGLE", label: "Your Unique Angle", placeholder: "e.g. former engineer turned sales leader, specialize in technical sales", type: "long" },
    ],
  },
  {
    id: "territory-planning",
    title: "Territory Planning Playbook",
    description: "Create a territory strategy with account tiering, coverage model, and quarterly execution plan.",
    category: "Prospecting",
    prompt: `Act as a sales strategy consultant specializing in territory design. Build a comprehensive territory plan.

Territory context:
- Region/Territory: [TERRITORY]
- Total addressable accounts: [TOTAL_ACCOUNTS]
- Your product: [YOUR_PRODUCT]
- Your ICP: [ICP]
- Quarterly quota: [QUOTA]
- Average deal size: [AVG_DEAL]
- Win rate: [WIN_RATE]
- Current pipeline: [CURRENT_PIPELINE]

Build a territory plan:

1. **Account Tiering** — Segment all accounts into tiers:
   | Tier | Criteria | # Accounts | Time Allocation | Touch Frequency |
   - Tier 1 (Must-Win): Perfect ICP fit, high revenue potential, active signals
   - Tier 2 (Should-Win): Good fit, moderate potential
   - Tier 3 (Could-Win): Decent fit, worth pursuing opportunistically
   - Tier 4 (Nurture): Not ready now, worth monitoring

2. **Coverage Model** — How to allocate your time:
   - Hours per week by activity (prospecting, meetings, follow-up, admin)
   - Accounts per tier to actively work
   - Touch cadence by tier

3. **Pipeline Math** — Work backward from quota:
   - Deals needed to hit quota (quota ÷ avg deal)
   - Opportunities needed (deals ÷ win rate)
   - Activities needed (opps ÷ conversion rates)
   - Daily/weekly activity targets

4. **90-Day Execution Plan**:
   | Week | Focus | Key Activities | Target Outcomes |
   - Month 1: Pipeline foundation (research, outreach, fill the funnel)
   - Month 2: Acceleration (demos, proposals, multi-threading)
   - Month 3: Closing (negotiation, procurement, close deals)

5. **Account Prioritization Score** — Weighted formula:
   - ICP fit (30%)
   - Engagement signals (25%)
   - Revenue potential (25%)
   - Competitive landscape (10%)
   - Relationship strength (10%)

6. **Weekly Review Cadence** — What to track each Friday:
   - Pipeline created vs. target
   - Conversion rates by stage
   - Activity completion rates
   - Accounts to add/remove from active list`,
    variables: [
      { key: "TERRITORY", label: "Territory", placeholder: "e.g. West Coast Enterprise, EMEA Mid-Market", type: "short" },
      { key: "TOTAL_ACCOUNTS", label: "Total Addressable Accounts", placeholder: "e.g. 500 accounts", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data analytics platform", type: "short" },
      { key: "ICP", label: "Your ICP", placeholder: "e.g. Series B+ SaaS, 200-2000 employees, using Snowflake", type: "long" },
      { key: "QUOTA", label: "Quarterly Quota", placeholder: "e.g. $400K", type: "short" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $60K ARR", type: "short" },
      { key: "WIN_RATE", label: "Win Rate", placeholder: "e.g. 25%", type: "short" },
      { key: "CURRENT_PIPELINE", label: "Current Pipeline", placeholder: "e.g. $800K weighted, 15 open opps", type: "short" },
    ],
  },
  {
    id: "competitive-displacement",
    title: "Competitive Displacement Campaign",
    description: "Build a campaign to unseat an incumbent competitor at a target account.",
    category: "Prospecting",
    prompt: `Act as a competitive sales strategist. Build a displacement campaign to unseat [COMPETITOR] at [TARGET_COMPANY].

Context:
- Target company: [TARGET_COMPANY]
- Incumbent competitor: [COMPETITOR]
- How long they've used them: [TENURE]
- Known pain points with incumbent: [KNOWN_PAINS]
- Your product: [YOUR_PRODUCT]
- Your key advantages: [YOUR_ADVANTAGES]
- Their contract renewal date (if known): [RENEWAL_DATE]

Build a displacement strategy:

1. **Competitive Intelligence Gathering**
   - What to research about their current usage
   - Questions to ask that expose incumbent weaknesses
   - How to find internal dissatisfaction (G2 reviews, ex-employee LinkedIn, support forums)

2. **Displacement Messaging** — 3 angles:
   - The "Cost of Status Quo" angle: What are they losing by staying?
   - The "Switching is Easier Than You Think" angle: Address migration fears
   - The "Future-Proof" angle: Where is the market going that the incumbent can't follow?

3. **Multi-Touch Campaign** (8 touches over 6 weeks):
   | Touch | Channel | Message Angle | Content/Asset |
   - Mix of email, LinkedIn, content sharing, and direct outreach
   - Each touch builds on the previous without being repetitive

4. **Champion Development** — How to find and cultivate an internal champion:
   - Who is most likely frustrated with the current solution?
   - How to arm them to advocate internally
   - What materials to provide

5. **Proof Points Package**:
   - 2-3 customer stories of companies who switched FROM the competitor
   - Migration timeline and effort data
   - ROI comparison (their solution vs. yours)

6. **Objection Playbook** for displacement-specific objections:
   - "We've invested too much to switch" →
   - "The switching costs are too high" →
   - "Our team is used to [Competitor]" →
   - "We're locked in until [date]" →

Never trash-talk the competitor. Position the switch as a strategic upgrade, not an escape.`,
    variables: [
      { key: "TARGET_COMPANY", label: "Target Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "COMPETITOR", label: "Incumbent Competitor", placeholder: "e.g. Salesforce", type: "short" },
      { key: "TENURE", label: "How Long They've Used Them", placeholder: "e.g. 3 years", type: "short" },
      { key: "KNOWN_PAINS", label: "Known Pain Points", placeholder: "e.g. too complex, expensive, poor support, slow implementation", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. modern CRM built for mid-market", type: "short" },
      { key: "YOUR_ADVANTAGES", label: "Your Key Advantages", placeholder: "e.g. 10x faster setup, half the price, AI-native", type: "long" },
      { key: "RENEWAL_DATE", label: "Their Renewal Date", placeholder: "e.g. September 2025, unknown", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // MORE EMAIL & OUTREACH
  // ═══════════════════════════════════════════
  {
    id: "subject-line-generator",
    title: "Subject Line A/B Generator",
    description: "Generate 10 subject line variants with framework labels and predicted open rate ranges.",
    category: "Email & Outreach",
    prompt: `Act as an email deliverability expert who has analyzed 10M+ cold emails. Generate 10 subject line variants for the following campaign:

Campaign context:
- Product: [YOUR_PRODUCT]
- Target audience: [TARGET_AUDIENCE]
- Email goal: [EMAIL_GOAL]
- Key value prop: [VALUE_PROP]
- Industry: [INDUSTRY]

Generate 10 subject lines using different proven frameworks:

| # | Subject Line | Framework | Predicted Open Rate | Why It Works |

**Frameworks to use:**
1. **Curiosity Gap** — Creates an information gap they need to close
2. **Personalized** — Uses their name, company, or specific detail
3. **Question** — Asks something they want to answer
4. **Number/Data** — Leads with a specific stat or number
5. **Social Proof** — References a peer company or result
6. **Pain Point** — Names their specific problem
7. **Timely/Trigger** — References a recent event
8. **Short & Mysterious** — 2-3 words that demand a click
9. **Value-First** — Leads with what they'll get
10. **Pattern Interrupt** — Something unexpected

Rules:
- All subject lines under 6 words (mobile-friendly)
- No ALL CAPS, no exclamation marks, no emoji
- No spam trigger words (free, guaranteed, limited time)
- Each should work standalone without preview text
- Test in pairs: similar framework, different angle

Also provide:
- **Best 3 for cold outreach** (never emailed before)
- **Best 3 for warm follow-up** (existing relationship)
- **Preview text recommendations** for top 3 subject lines`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. VP Sales at SaaS companies with 50-200 reps", type: "short" },
      { key: "EMAIL_GOAL", label: "Email Goal", placeholder: "e.g. book a discovery call, share a case study", type: "short" },
      { key: "VALUE_PROP", label: "Key Value Prop", placeholder: "e.g. reduce ramp time for new hires by 40%", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
    ],
  },
  {
    id: "video-prospecting-script",
    title: "Video Prospecting Script",
    description: "Create a 60-second video script for Loom/Vidyard personalized outreach.",
    category: "Email & Outreach",
    prompt: `Act as a video prospecting coach who has trained SDRs to book 3x more meetings with video. Create a 60-second video script.

Context:
- Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
- Your product: [YOUR_PRODUCT]
- Why you're reaching out: [OUTREACH_REASON]
- Something specific about them: [PERSONALIZATION]

Create a video script with:

1. **The Hook (0-5 seconds):**
   - Say their name and company within 3 seconds
   - Show their website/LinkedIn on screen (builds trust)
   - "Hey [Name], I recorded this specifically for you..."

2. **The Problem (5-20 seconds):**
   - Reference something specific about their situation
   - Connect it to a problem you solve
   - Use "I noticed..." or "I saw that..." NOT "I think you might..."

3. **The Value (20-40 seconds):**
   - ONE specific result (not a feature dump)
   - Customer proof: "We helped [similar company] achieve [result]"
   - Show, don't tell: briefly screen-share relevant proof

4. **The CTA (40-60 seconds):**
   - One clear ask (not "let me know if you're interested")
   - Make it low-commitment: "15 minutes to see if this is relevant"
   - End with a friendly, human sign-off

**Video Production Tips:**
- Thumbnail: Show their website on screen (increases click rate 3x)
- Length: 45-60 seconds MAX (completion rate drops 50% after 60s)
- Energy: Enthusiastic but not manic
- Background: Clean, professional (or branded virtual background)
- No scripts visible — use bullet points on a sticky note near camera

**Companion Email:**
Write the short email that accompanies the video (3 lines max + video thumbnail).`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP of Marketing", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. HubSpot", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. personalized video platform", type: "short" },
      { key: "OUTREACH_REASON", label: "Why You're Reaching Out", placeholder: "e.g. they're hiring SDRs and could use video to stand out", type: "long" },
      { key: "PERSONALIZATION", label: "Personalization Detail", placeholder: "e.g. they recently posted about improving outbound response rates", type: "long" },
    ],
  },
  {
    id: "executive-outreach",
    title: "Executive Outreach Email",
    description: "C-suite specific messaging — short, strategic, no fluff. Built for VP+ audiences.",
    category: "Email & Outreach",
    prompt: `Act as a sales leader who exclusively sells to C-suite executives. Craft executive-level outreach for [EXEC_TITLE] at [COMPANY_NAME].

Context:
- Executive: [EXEC_NAME], [EXEC_TITLE] at [COMPANY_NAME]
- Company size: [COMPANY_SIZE]
- Industry: [INDUSTRY]
- Your product: [YOUR_PRODUCT]
- Strategic relevance: [STRATEGIC_RELEVANCE]
- Mutual connection or warm angle: [WARM_ANGLE]

Write 3 executive outreach variations:

**Version 1: The Strategic Insight**
- Lead with a board-level insight about their industry
- Connect it to a decision they likely need to make
- Offer a peer conversation, not a demo
- Under 60 words

**Version 2: The Peer Introduction**
- Leverage a mutual connection or shared experience
- Position as executive-to-executive dialogue
- Reference their company's strategic direction
- Under 50 words

**Version 3: The Data Point**
- Lead with one compelling, specific data point
- Make it relevant to their P&L or board metrics
- Propose a 15-minute briefing, not a sales call
- Under 50 words

**Executive Communication Rules:**
- Never use "I'd love to" or "I was hoping to"
- No product features — only business outcomes
- Respect their time: every word must earn its place
- CTA: peer conversation, briefing, or strategic discussion — never "demo"
- Subject line: 3-4 words max, sounds like it came from a board member
- No "as a fellow [title]" — it's transparent and cringe

**Also include:**
- Best send time for executives (research-backed)
- LinkedIn approach if email doesn't work
- How to leverage their EA as an ally`,
    variables: [
      { key: "EXEC_NAME", label: "Executive Name", placeholder: "e.g. Jennifer Walsh", type: "short" },
      { key: "EXEC_TITLE", label: "Executive Title", placeholder: "e.g. CRO, VP Sales, CMO", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "COMPANY_SIZE", label: "Company Size", placeholder: "e.g. 3,000 employees, $1B+ revenue", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud data platform", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "STRATEGIC_RELEVANCE", label: "Strategic Relevance", placeholder: "e.g. they just missed earnings forecast, likely reviewing sales effectiveness", type: "long" },
      { key: "WARM_ANGLE", label: "Warm Angle (if any)", placeholder: "e.g. mutual connection through Board member, same alma mater, spoke at same conference", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // MORE MEETING & DISCOVERY
  // ═══════════════════════════════════════════
  {
    id: "technical-discovery",
    title: "Technical Discovery Questions",
    description: "Deep technical qualification questions for SE-led conversations with engineering buyers.",
    category: "Meeting & Discovery",
    prompt: `Act as a senior Sales Engineer who has run 500+ technical discovery calls. Generate deep technical qualification questions for a call with [PROSPECT_ROLE] at [PROSPECT_COMPANY].

Context:
- Prospect: [PROSPECT_ROLE] at [PROSPECT_COMPANY]
- Their tech stack (known): [TECH_STACK]
- Your product: [YOUR_PRODUCT]
- Technical differentiators: [TECH_DIFFERENTIATORS]
- Integration requirements: [INTEGRATIONS]

Generate technical discovery questions organized by category:

**1. Current Architecture (5 questions)**
- How their current solution is architected
- What they've built in-house vs. bought
- Pain points with current technical approach
- Scale and performance requirements

**2. Integration & Data Flow (4 questions)**
- How data moves between systems
- API usage and limitations
- Data quality and governance concerns
- Real-time vs. batch processing needs

**3. Security & Compliance (3 questions)**
- Authentication and authorization requirements
- Data residency and privacy regulations
- Audit and compliance needs
- SSO and identity provider setup

**4. Evaluation Criteria (4 questions)**
- Technical must-haves vs. nice-to-haves
- Proof of concept expectations
- Performance benchmarks they need to see
- Who else needs to validate technically

**5. Implementation & Migration (3 questions)**
- Migration complexity from current solution
- Timeline expectations and resource availability
- Training and adoption concerns

For EACH question provide:
- The question itself
- Why you're asking (what it reveals)
- Follow-up question based on likely answer
- Red flag answer vs. green flag answer

End with a **Technical Qualification Scorecard** template to fill during the call.`,
    variables: [
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. CTO, VP Engineering, Head of Platform", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "TECH_STACK", label: "Their Tech Stack", placeholder: "e.g. AWS, React, PostgreSQL, Salesforce", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data integration platform", type: "short" },
      { key: "TECH_DIFFERENTIATORS", label: "Technical Differentiators", placeholder: "e.g. real-time sync, no-code connectors, SOC2 compliant", type: "long" },
      { key: "INTEGRATIONS", label: "Key Integrations", placeholder: "e.g. Salesforce, Snowflake, HubSpot, custom APIs", type: "short" },
    ],
  },
  {
    id: "stakeholder-map",
    title: "Stakeholder Map Builder",
    description: "Map the buying committee with influence levels, motivations, and engagement strategies.",
    category: "Meeting & Discovery",
    prompt: `Act as an enterprise deal strategist. Help me map and plan engagement for the buying committee at [COMPANY_NAME].

Deal context:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- What we sell: [YOUR_PRODUCT]
- Current stage: [CURRENT_STAGE]
- Known stakeholders: [KNOWN_STAKEHOLDERS]

Build a comprehensive stakeholder map:

1. **Buying Committee Matrix**:
   | Name | Title | Role in Decision | Influence Level | Stance | Priority |
   Roles: Champion, Economic Buyer, Technical Evaluator, End User, Coach, Blocker, Legal/Procurement

2. **For Each Stakeholder**:
   - **What they care about**: Their KPIs, career goals, and personal wins
   - **How they evaluate**: Data-driven? Relationship-driven? Consensus-builder?
   - **Key message**: The ONE thing to say that resonates with THEM
   - **Risk**: What could make them block the deal
   - **Engagement plan**: Specific next action to take with them

3. **Influence Map** — Describe the power dynamics:
   - Who influences whom?
   - Who has veto power?
   - Where are the alliances and tensions?
   - Who is the "real" decision maker (not always the most senior)?

4. **Gap Analysis**:
   - Stakeholders we haven't identified yet (who's missing?)
   - Stakeholders we haven't met (how to get access)
   - Relationships that need strengthening

5. **Multi-Thread Engagement Plan**:
   | Week | Stakeholder | Action | Channel | Goal |
   - Plan for the next 4 weeks
   - Ensure no single point of failure

6. **Deal Risk Score**: Based on stakeholder coverage, score the deal risk 1-10.

Be specific to THIS deal — no generic stakeholder theory.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $200K ARR", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales enablement platform", type: "short" },
      { key: "CURRENT_STAGE", label: "Current Stage", placeholder: "e.g. post-demo, entering evaluation", type: "short" },
      { key: "KNOWN_STAKEHOLDERS", label: "Known Stakeholders", placeholder: "1. Sarah - VP Sales (champion, strong advocate)\n2. Mike - CFO (met once, cautious)\n3. IT team - haven't met yet\n4. Procurement - unknown", type: "long" },
    ],
  },

  // ═══════════════════════════════════════════
  // MORE PROPOSALS & CLOSING
  // ═══════════════════════════════════════════
  {
    id: "pricing-strategy",
    title: "Pricing Strategy Advisor",
    description: "Analyze competitive positioning and recommend pricing, packaging, and discounting approach.",
    category: "Proposals & Closing",
    prompt: `Act as a SaaS pricing consultant from Simon-Kucher. Analyze my pricing strategy and recommend improvements.

Context:
- Product: [YOUR_PRODUCT]
- Current pricing: [CURRENT_PRICING]
- Target market: [TARGET_MARKET]
- Competitors and their pricing: [COMPETITOR_PRICING]
- Average deal size: [AVG_DEAL]
- Win rate: [WIN_RATE]
- Most common pricing objection: [PRICING_OBJECTION]

Analyze and recommend:

1. **Pricing Model Assessment**:
   - Is your current model aligned with how customers get value?
   - Per-seat vs. usage-based vs. flat-rate — which fits best?
   - Are you leaving money on the table?

2. **Competitive Price Positioning**:
   - Where you sit vs. competitors (premium, mid-market, value)
   - Is your positioning intentional or accidental?
   - Price-to-value perception analysis

3. **Packaging Recommendations**:
   - Good-Better-Best tier structure
   - What features to gate at each tier
   - How to design packages that drive upgrades
   - Which tier to lead with in sales conversations

4. **Discounting Framework**:
   | Scenario | Max Discount | What to Get in Return |
   - Annual vs. monthly pricing strategy
   - Volume discount tiers
   - When to offer pilot pricing vs. full price
   - How to handle "your competitor is cheaper"

5. **Price Increase Strategy** (for existing customers):
   - How to communicate increases
   - Grandfather vs. phase-in approach
   - Talk tracks for renewal conversations with increases

6. **Metrics to Track**:
   - Price realization rate
   - Discount frequency and depth
   - Win rate by price point
   - Revenue per customer trends`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. project management platform", type: "short" },
      { key: "CURRENT_PRICING", label: "Current Pricing", placeholder: "e.g. $29/user/mo Starter, $79/user/mo Pro, $149/user/mo Enterprise", type: "long" },
      { key: "TARGET_MARKET", label: "Target Market", placeholder: "e.g. mid-market SaaS, 50-500 employees", type: "short" },
      { key: "COMPETITOR_PRICING", label: "Competitor Pricing", placeholder: "e.g. Monday.com: $12-24/user, Asana: $13-30/user, ClickUp: $7-19/user", type: "long" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $35K ARR", type: "short" },
      { key: "WIN_RATE", label: "Win Rate", placeholder: "e.g. 28%", type: "short" },
      { key: "PRICING_OBJECTION", label: "Top Pricing Objection", placeholder: "e.g. 'too expensive compared to alternatives'", type: "short" },
    ],
  },
  {
    id: "executive-sponsor-email",
    title: "Executive Sponsor Email",
    description: "Draft an email from your exec sponsor to their exec for late-stage enterprise deals.",
    category: "Proposals & Closing",
    prompt: `Act as a VP of Sales who regularly writes executive-to-executive emails to accelerate late-stage deals. Draft an email from MY executive to THEIR executive.

Deal context:
- Our company: [YOUR_COMPANY]
- Our executive: [OUR_EXEC_NAME], [OUR_EXEC_TITLE]
- Their company: [THEIR_COMPANY]
- Their executive: [THEIR_EXEC_NAME], [THEIR_EXEC_TITLE]
- Deal status: [DEAL_STATUS]
- Why executive involvement is needed: [WHY_EXEC]
- Key value delivered so far: [VALUE_SO_FAR]

Draft 2 email variations:

**Version 1: The Strategic Partnership Angle**
- Frame this as a strategic partnership, not a vendor transaction
- Reference industry trends or mutual goals
- Propose an executive alignment call
- Tone: peer-to-peer, strategic, forward-looking

**Version 2: The Momentum & Commitment Angle**
- Reference the positive progress so far
- Acknowledge the team's work on both sides
- Propose clearing any remaining blockers at the exec level
- Tone: collaborative, action-oriented

**For both versions:**
- Subject line: 4-5 words max, sounds personal
- Length: under 100 words (executives don't read long emails)
- CTA: specific (not "let's connect sometime")
- Written as if OUR executive wrote it personally (not ghostwritten by sales)
- No product pitching — this is a relationship-building email

**Also provide:**
- Best time to send this email
- Follow-up plan if no response in 48 hours
- How to brief your executive before they send it
- What NOT to do (common mistakes in exec-to-exec outreach)`,
    variables: [
      { key: "YOUR_COMPANY", label: "Your Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "OUR_EXEC_NAME", label: "Our Executive Name", placeholder: "e.g. David Chen", type: "short" },
      { key: "OUR_EXEC_TITLE", label: "Our Executive Title", placeholder: "e.g. CEO, CRO, VP Sales", type: "short" },
      { key: "THEIR_COMPANY", label: "Their Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "THEIR_EXEC_NAME", label: "Their Executive Name", placeholder: "e.g. Sarah Williams", type: "short" },
      { key: "THEIR_EXEC_TITLE", label: "Their Executive Title", placeholder: "e.g. CRO, VP of Sales", type: "short" },
      { key: "DEAL_STATUS", label: "Deal Status", placeholder: "e.g. proposal sent, stuck in procurement for 3 weeks", type: "long" },
      { key: "WHY_EXEC", label: "Why Executive Involvement", placeholder: "e.g. deal stalled in legal, need CRO to push internally", type: "long" },
      { key: "VALUE_SO_FAR", label: "Value Delivered So Far", placeholder: "e.g. successful POC, champion is bought in, technical validation passed", type: "long" },
    ],
  },
  {
    id: "procurement-guide",
    title: "Procurement Navigation Guide",
    description: "Step-by-step guide for navigating enterprise procurement processes and getting contracts signed.",
    category: "Proposals & Closing",
    prompt: `Act as a sales operations leader who has navigated 500+ enterprise procurement processes. Create a procurement navigation guide for this deal.

Deal context:
- Company: [COMPANY_NAME]
- Company size: [COMPANY_SIZE]
- Deal size: [DEAL_SIZE]
- Known procurement requirements: [KNOWN_REQUIREMENTS]
- Timeline pressure: [TIMELINE]
- Procurement contact (if known): [PROCUREMENT_CONTACT]

Build a procurement navigation guide:

1. **Procurement Process Map** — Typical enterprise procurement stages:
   | Stage | What Happens | Our Role | Timeline | Risk |
   - Vendor registration / approved vendor list
   - Security questionnaire / InfoSec review
   - Legal redlines and contract review
   - Procurement / purchasing approval
   - Budget sign-off / PO creation
   - Contract execution

2. **Pre-Procurement Checklist** — Get these ready BEFORE procurement starts:
   - [ ] Security questionnaires (SOC2, GDPR, HIPAA)
   - [ ] Insurance certificates
   - [ ] Standard MSA and order form
   - [ ] Data Processing Agreement
   - [ ] Implementation plan and SLA
   - [ ] Reference customers in their industry
   - [ ] Competitive pricing documentation

3. **Accelerating Procurement** — Tactics to speed up the process:
   - How to run security and legal review in PARALLEL, not sequential
   - When and how to involve your legal team
   - How to pre-fill their security questionnaire
   - Building a relationship with procurement (they're not the enemy)

4. **Common Procurement Blockers & Solutions**:
   - "We need 3 competitive bids" → How to handle
   - "Legal needs 4 weeks for review" → How to compress
   - "Budget needs to be re-approved" → How to navigate
   - "We need board approval above $X" → How to prepare
   - "This needs to go through our vendor management system" → How to comply quickly

5. **Communication Templates**:
   - Email to procurement introducing yourself
   - Status update email to champion during procurement
   - Escalation email when procurement is stalled
   - Thank-you email after contract signature

6. **Timeline Management**:
   - Realistic timeline estimate for this deal size
   - Weekly check-in cadence with procurement
   - Escalation triggers (when to involve executives)`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "COMPANY_SIZE", label: "Company Size", placeholder: "e.g. 5,000 employees, Fortune 500", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $250K ARR", type: "short" },
      { key: "KNOWN_REQUIREMENTS", label: "Known Requirements", placeholder: "e.g. SOC2 required, need DPA, MSA redlines expected, 3-bid requirement", type: "long" },
      { key: "TIMELINE", label: "Timeline Pressure", placeholder: "e.g. need to close by end of quarter, their budget expires March 31", type: "short" },
      { key: "PROCUREMENT_CONTACT", label: "Procurement Contact", placeholder: "e.g. Lisa in Procurement, haven't met yet", type: "short" },
    ],
  },

  // ═══════════════════════════════════════════
  // MORE ACCOUNT MANAGEMENT
  // ═══════════════════════════════════════════
  {
    id: "customer-success-handoff",
    title: "Customer Success Handoff",
    description: "Create a structured handoff document from AE to CSM with full deal context and customer expectations.",
    category: "Account Management",
    prompt: `Act as a revenue operations leader. Create a comprehensive AE-to-CSM handoff document for a newly closed deal.

Deal details:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- Closed date: [CLOSED_DATE]
- Sales cycle length: [CYCLE_LENGTH]
- Champion: [CHAMPION]
- Executive sponsor: [EXEC_SPONSOR]
- Primary use case: [USE_CASE]

Build a handoff document:

1. **Account Overview**:
   - Company background and industry
   - Why they bought (the REAL reason, not the surface reason)
   - What they were using before and why they switched
   - Decision-making process and key stakeholders

2. **Stakeholder Map** (for CS team):
   | Name | Title | Role | Relationship Strength | Key Concerns |
   - Who loves us, who's neutral, who's a risk
   - Communication preferences for each

3. **Expectations Set During Sales**:
   - ⚠️ Specific promises made (be honest — CS needs to know)
   - Timeline commitments
   - Feature requests or customizations discussed
   - ROI targets quoted
   - SLA or support level expectations

4. **Implementation Priorities**:
   - Phase 1 (Quick Wins): What to deliver in first 30 days
   - Phase 2 (Core Value): Full rollout plan
   - Phase 3 (Expansion): Future opportunities discussed

5. **Risk Factors**:
   - Known concerns or hesitations during the sales process
   - Competitive alternatives they considered (in case of buyer's remorse)
   - Internal politics or blockers CS should know about
   - Technical limitations acknowledged during eval

6. **Success Metrics** — What does "success" look like for this customer?
   - Metrics they'll measure
   - Timeline for expected results
   - First QBR date and expectations

7. **Expansion Opportunities**:
   - Additional teams or departments discussed
   - Upsell products or tiers mentioned
   - Timing for expansion conversation

This should be the single document CS needs to never start from scratch with a customer.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $80K ARR", type: "short" },
      { key: "CLOSED_DATE", label: "Closed Date", placeholder: "e.g. March 15, 2025", type: "short" },
      { key: "CYCLE_LENGTH", label: "Sales Cycle Length", placeholder: "e.g. 62 days", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP of Ops — strong advocate", type: "short" },
      { key: "EXEC_SPONSOR", label: "Executive Sponsor", placeholder: "e.g. CFO, met twice during eval", type: "short" },
      { key: "USE_CASE", label: "Primary Use Case", placeholder: "e.g. automate pipeline reporting, replace spreadsheet forecasting", type: "long" },
    ],
  },
  {
    id: "case-study-interview",
    title: "Case Study Interview Script",
    description: "Generate interview questions to extract a compelling customer story with quotable soundbites.",
    category: "Account Management",
    prompt: `Act as a content marketing strategist who has produced 100+ B2B case studies. Generate an interview script for a customer case study.

Customer context:
- Customer: [CUSTOMER_COMPANY]
- Contact: [CONTACT_NAME], [CONTACT_ROLE]
- Product they use: [YOUR_PRODUCT]
- How long they've been a customer: [TENURE]
- Key results: [KEY_RESULTS]
- Use case: [USE_CASE]

Create a case study interview script:

1. **Pre-Interview Prep**:
   - Research checklist (usage data, support history, growth metrics)
   - Email template to schedule the interview
   - What to share with them in advance (so they can prep numbers)
   - Recording permission language

2. **Interview Questions** (30-minute format):

   **Opening / Warm-Up (3 min):**
   - Tell me about your role and what your team is responsible for
   - What does a typical day look like?

   **Before State (7 min):**
   - What was the situation before [product]? Walk me through the process.
   - What was the biggest frustration or pain point?
   - How was this impacting your team or business?
   - Can you put a number on it? (time wasted, revenue lost, etc.)

   **Decision Process (5 min):**
   - What made you start looking for a solution?
   - What else did you evaluate? Why did you choose us?
   - Was there anything that almost stopped the deal?

   **Implementation (5 min):**
   - What was the onboarding experience like?
   - How long before you saw first results?
   - Any surprises (good or bad)?

   **Results / After State (7 min):**
   - What specific results have you seen? (push for numbers)
   - What's the impact on your team day-to-day?
   - What would happen if you had to go back to the old way?
   - How has this changed your role or career?

   **Quotable Moments (3 min):**
   - If you had to describe [product] to a peer, what would you say?
   - What's the one thing you'd tell someone who's on the fence?

3. **Case Study Outline** — Structure for the final piece:
   - Headline formula: "[Company] achieves [result] with [product]"
   - Sections: Challenge → Solution → Results → What's Next
   - Pull-quote placement recommendations

4. **Follow-Up Process**:
   - Thank-you email template
   - Draft review process with customer
   - Approval and publication timeline`,
    variables: [
      { key: "CUSTOMER_COMPANY", label: "Customer Company", placeholder: "e.g. Notion", type: "short" },
      { key: "CONTACT_NAME", label: "Contact Name", placeholder: "e.g. Sarah Chen", type: "short" },
      { key: "CONTACT_ROLE", label: "Contact Role", placeholder: "e.g. Head of Sales Operations", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "TENURE", label: "Customer Tenure", placeholder: "e.g. 14 months", type: "short" },
      { key: "KEY_RESULTS", label: "Key Results", placeholder: "e.g. 35% increase in forecast accuracy, 10 hrs/week saved on reporting", type: "long" },
      { key: "USE_CASE", label: "Primary Use Case", placeholder: "e.g. pipeline management and revenue forecasting for 40-person sales team", type: "long" },
    ],
  },
];
