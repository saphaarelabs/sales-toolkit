import type { PromptTemplate } from "../promptTemplates";

// ═══════════════════════════════════════════
// PHASE 1: Market Research & ICP
// PHASE 2: Lead Generation
// PHASE 3: Account Research
// ═══════════════════════════════════════════

export const findPrompts: PromptTemplate[] = [
  // ── Phase 1: Market Research & ICP ──
  {
    id: "competitor-research",
    title: "Competitor Research & White Space Finder",
    description: "Deep competitor analysis with positioning gaps and market white space.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
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
    id: "icp-refinement",
    title: "ICP Refinement & Scoring",
    description: "Analyze your closed-won deals to identify patterns and sharpen your ICP definition.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a revenue operations analyst specializing in ICP development. Analyze my recent closed-won deals and help me refine my Ideal Customer Profile.

My product: [YOUR_PRODUCT]
Current ICP definition: [CURRENT_ICP]

Here are my last 5-10 closed-won deals:
[CLOSED_WON_DEALS]

Here are my last 3-5 closed-lost deals:
[CLOSED_LOST_DEALS]

Analyze and produce:

1. **Pattern Analysis** — What do the wins have in common?
2. **Anti-Pattern Analysis** — What do the losses have in common? What should I STOP pursuing?
3. **Refined ICP Scorecard** — Create a scoring rubric (1-10) with weighted criteria
4. **Disqualification Criteria** — Hard "no" signals that mean I should walk away early
5. **Prospecting Priorities** — Rank order of where I should focus my pipeline building efforts

Use specific data from my deals — no generic ICP advice.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI-powered CRM", type: "short" },
      { key: "CURRENT_ICP", label: "Current ICP Definition", placeholder: "e.g. Mid-market SaaS companies, 50-500 employees, using Salesforce", type: "long" },
      { key: "CLOSED_WON_DEALS", label: "Closed-Won Deals (5-10)", placeholder: "Deal 1: Company, size, industry, champion title, deal size, why they bought\nDeal 2: ...", type: "long" },
      { key: "CLOSED_LOST_DEALS", label: "Closed-Lost Deals (3-5)", placeholder: "Deal 1: Company, size, industry, why we lost\nDeal 2: ...", type: "long" },
    ],
  },
  {
    id: "trigger-events",
    title: "Trigger Event Spotter",
    description: "Find recent trigger events for a company and craft timely outreach angles.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["ChatGPT", "Gemini"],
    prompt: `Act as an elite SDR who specializes in trigger-based selling. I need you to identify trigger events for [COMPANY_NAME] and turn each into an outreach angle.

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
What I sell: [YOUR_PRODUCT]
Target buyer: [TARGET_ROLE]

Search for and analyze these trigger event categories:

1. **Leadership Changes** — New hires in relevant departments
2. **Funding & Financial Events** — Funding rounds, revenue milestones, cost-cutting
3. **Hiring Signals** — Job postings indicating growth or tech gaps
4. **Product & Strategy Shifts** — New launches, expansions, pivots
5. **Competitive Moves** — Competitor changes creating urgency
6. **Regulatory & Industry Changes** — New compliance requirements

For EACH trigger event found:
- **The Event**: What happened and when
- **Why It Matters**: Connection to what I sell
- **Outreach Angle**: A specific opening line
- **Urgency Level**: High / Medium / Low
- **Best Channel**: Email, LinkedIn, phone, or multi-touch

Rank the triggers by urgency. Give me the single best outreach message to send TODAY.`,
    variables: [
      { key: "COMPANY_NAME", label: "Target Company", placeholder: "e.g. Datadog", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud monitoring, DevOps", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. sales intelligence platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Buyer Role", placeholder: "e.g. VP of Sales, Head of Revenue Operations", type: "short" },
    ],
  },
  {
    id: "territory-planning",
    title: "Territory Planning Playbook",
    description: "Create a territory strategy with account tiering, coverage model, and quarterly execution plan.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a sales strategy consultant. Build a comprehensive territory plan.

Territory: [TERRITORY]
Total addressable accounts: [TOTAL_ACCOUNTS]
Product: [YOUR_PRODUCT]
ICP: [ICP]
Quarterly quota: [QUOTA]
Average deal size: [AVG_DEAL]
Win rate: [WIN_RATE]
Current pipeline: [CURRENT_PIPELINE]

Build:
1. **Account Tiering** — Tier 1-4 with criteria, count, time allocation, touch frequency
2. **Coverage Model** — Hours per week by activity, accounts per tier
3. **Pipeline Math** — Backward from quota: deals, opps, activities needed
4. **90-Day Execution Plan** — Month-by-month focus, activities, target outcomes
5. **Account Prioritization Score** — Weighted formula (ICP fit, signals, revenue potential)
6. **Weekly Review Cadence** — What to track each Friday`,
    variables: [
      { key: "TERRITORY", label: "Territory", placeholder: "e.g. West Coast Enterprise, EMEA Mid-Market", type: "short" },
      { key: "TOTAL_ACCOUNTS", label: "Total Addressable Accounts", placeholder: "e.g. 500 accounts", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data analytics platform", type: "short" },
      { key: "ICP", label: "Your ICP", placeholder: "e.g. Series B+ SaaS, 200-2000 employees", type: "long" },
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
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a competitive sales strategist. Build a displacement campaign to unseat [COMPETITOR] at [TARGET_COMPANY].

Context:
- Target: [TARGET_COMPANY]
- Incumbent: [COMPETITOR]
- Tenure: [TENURE]
- Known pains: [KNOWN_PAINS]
- Your product: [YOUR_PRODUCT]
- Your advantages: [YOUR_ADVANTAGES]
- Renewal date: [RENEWAL_DATE]

Build:
1. **Competitive Intelligence** — What to research, questions that expose weaknesses
2. **Displacement Messaging** — 3 angles: Cost of Status Quo, Easy Switch, Future-Proof
3. **Multi-Touch Campaign** — 8 touches over 6 weeks with channels and content
4. **Champion Development** — Find and cultivate internal advocates
5. **Proof Points** — Switch stories, migration data, ROI comparison
6. **Objection Playbook** — "Invested too much to switch", "Switching costs too high", etc.

Never trash-talk the competitor. Position the switch as a strategic upgrade.`,
    variables: [
      { key: "TARGET_COMPANY", label: "Target Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "COMPETITOR", label: "Incumbent Competitor", placeholder: "e.g. Salesforce", type: "short" },
      { key: "TENURE", label: "How Long They've Used Them", placeholder: "e.g. 3 years", type: "short" },
      { key: "KNOWN_PAINS", label: "Known Pain Points", placeholder: "e.g. too complex, expensive, poor support", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. modern CRM built for mid-market", type: "short" },
      { key: "YOUR_ADVANTAGES", label: "Your Key Advantages", placeholder: "e.g. 10x faster setup, half the price, AI-native", type: "long" },
      { key: "RENEWAL_DATE", label: "Their Renewal Date", placeholder: "e.g. September 2025, unknown", type: "short" },
    ],
  },
  {
    id: "tam-sam-som",
    title: "TAM/SAM/SOM Calculator",
    description: "Calculate your total, serviceable, and obtainable market with bottoms-up and top-down approaches.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a strategy consultant. Help me calculate TAM, SAM, and SOM for my product.

Product: [YOUR_PRODUCT]
Price point: [PRICE_POINT]
Target segment: [TARGET_SEGMENT]
Geography: [GEOGRAPHY]
Current customers: [CURRENT_CUSTOMERS]
Known competitors: [COMPETITORS]

Calculate using BOTH approaches:

**Top-Down:**
1. Total Addressable Market (TAM) — Every possible buyer globally
2. Serviceable Addressable Market (SAM) — Buyers you can realistically reach
3. Serviceable Obtainable Market (SOM) — What you can capture in 12-24 months

**Bottom-Up:**
1. Number of target companies by segment
2. Average deal size per segment
3. Realistic penetration rate
4. Revenue projections (Year 1, 2, 3)

Also provide:
- Market growth rate and trends
- Segment attractiveness ranking
- Where to focus first for fastest revenue
- Show your math — investors want to see the calculation`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI sales coaching platform", type: "short" },
      { key: "PRICE_POINT", label: "Price Point", placeholder: "e.g. $500/user/month", type: "short" },
      { key: "TARGET_SEGMENT", label: "Target Segment", placeholder: "e.g. B2B SaaS companies with 50-500 employees", type: "long" },
      { key: "GEOGRAPHY", label: "Geography", placeholder: "e.g. North America initially, then EMEA", type: "short" },
      { key: "CURRENT_CUSTOMERS", label: "Current Customers", placeholder: "e.g. 45 customers, $2M ARR", type: "short" },
      { key: "COMPETITORS", label: "Known Competitors", placeholder: "e.g. Gong, Chorus, Clari", type: "short" },
    ],
  },
  {
    id: "buyer-persona-builder",
    title: "Buyer Persona Builder",
    description: "Create detailed buyer personas with pain points, objections, preferred channels, and messaging angles.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a buyer psychology expert. Build detailed buyer personas for my product.

Product: [YOUR_PRODUCT]
Industry: [INDUSTRY]
Primary buyer titles: [BUYER_TITLES]
Company size sweet spot: [COMPANY_SIZE]

For each persona, create:

1. **Demographics** — Title, reporting structure, team size, budget authority, tenure
2. **Day in the Life** — What their typical day looks like, what stresses them
3. **Goals & KPIs** — What they're measured on, what gets them promoted
4. **Pain Points** — Top 5 frustrations your product addresses
5. **Information Diet** — Where they learn (podcasts, LinkedIn, events, analysts)
6. **Buying Behavior** — How they evaluate, who they involve, timeline expectations
7. **Objections** — Top 3 objections and root cause behind each
8. **Messaging Matrix** — For each pain point, the message that resonates
9. **Trigger Events** — What makes them actively look for a solution
10. **Anti-Persona** — Who looks like this persona but will NEVER buy

Create 3 distinct personas that represent your main buyer types.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. marketing automation platform", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "BUYER_TITLES", label: "Primary Buyer Titles", placeholder: "e.g. VP Marketing, Director of Demand Gen, CMO", type: "long" },
      { key: "COMPANY_SIZE", label: "Company Size Sweet Spot", placeholder: "e.g. 200-2000 employees, $20M-$200M revenue", type: "short" },
    ],
  },
  {
    id: "market-entry-analysis",
    title: "New Market Entry Analysis",
    description: "Evaluate a new market vertical or geography for expansion with go-to-market recommendations.",
    category: "Market Research & ICP",
    phase: 1,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a GTM strategist. Analyze whether we should enter [NEW_MARKET] and build an entry plan.

Current state:
- Product: [YOUR_PRODUCT]
- Current market: [CURRENT_MARKET]
- Current ARR: [CURRENT_ARR]
- New market to evaluate: [NEW_MARKET]
- Why we're considering it: [WHY_CONSIDERING]

Analyze:
1. **Market Attractiveness** — Size, growth rate, competition, barriers to entry
2. **Product-Market Fit Assessment** — What works as-is, what needs adaptation
3. **Competitive Landscape** — Who's already there, where are the gaps
4. **Buyer Differences** — How buying behavior differs from current market
5. **Go-to-Market Plan** — First 6 months: positioning, channels, early targets
6. **Resource Requirements** — Team, budget, timeline to first revenue
7. **Risk Analysis** — What could go wrong and mitigation strategies
8. **Go/No-Go Recommendation** with scoring rubric`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. HR analytics platform", type: "short" },
      { key: "CURRENT_MARKET", label: "Current Market", placeholder: "e.g. mid-market tech companies in NA", type: "short" },
      { key: "CURRENT_ARR", label: "Current ARR", placeholder: "e.g. $5M ARR", type: "short" },
      { key: "NEW_MARKET", label: "New Market to Evaluate", placeholder: "e.g. Healthcare, EMEA enterprise", type: "short" },
      { key: "WHY_CONSIDERING", label: "Why Considering This Market", placeholder: "e.g. inbound interest from 3 healthcare companies", type: "long" },
    ],
  },

  // ── Phase 2: Lead Generation ──
  {
    id: "lead-list-builder",
    title: "Lead List Criteria Builder",
    description: "Define precise lead list criteria for Sales Navigator, Apollo, or ZoomInfo based on your ICP.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a lead generation specialist. Help me build precise search criteria for prospecting tools.

Product: [YOUR_PRODUCT]
ICP: [ICP]
Average deal size: [AVG_DEAL]
Tools I use: [TOOLS]

Create search criteria for:

1. **LinkedIn Sales Navigator** — Boolean search strings, filters, and saved search setup
2. **Apollo/ZoomInfo** — Company and contact filters, intent signals
3. **Google Search** — Advanced search operators to find target companies

For each tool, provide:
- Exact filter settings and Boolean strings
- Expected list size estimate
- Quality indicators to watch for
- How to segment the list into priority tiers
- Enrichment strategy (what data to append)

Also create:
- **Exclusion Criteria** — Companies/contacts to filter OUT
- **Signal-Based Lists** — How to build lists around trigger events
- **Look-Alike Lists** — How to find companies similar to best customers
- **Weekly Prospecting Workflow** — How many new leads to add daily`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "ICP", label: "Your ICP", placeholder: "e.g. B2B SaaS, 100-1000 employees, VP Sales or CRO", type: "long" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $40K ARR", type: "short" },
      { key: "TOOLS", label: "Tools You Use", placeholder: "e.g. LinkedIn Sales Nav, Apollo, Outreach", type: "short" },
    ],
  },
  {
    id: "intent-signal-playbook",
    title: "Intent Signal Playbook",
    description: "Build workflows for acting on buying intent signals from G2, Bombora, website visits, and more.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a demand gen expert. Build an intent signal playbook that turns buying signals into pipeline.

Product: [YOUR_PRODUCT]
Intent tools available: [INTENT_TOOLS]
Current monthly inbound leads: [INBOUND_VOLUME]
Sales team size: [TEAM_SIZE]

Create a playbook for each signal type:

1. **Website Intent** — Page visits, pricing page, demo request abandonment
2. **Third-Party Intent** — Bombora, G2 research, TrustRadius comparisons
3. **Social Intent** — LinkedIn engagement, relevant content interaction
4. **Hiring Intent** — Job postings indicating need for your solution
5. **Competitive Intent** — Researching or reviewing your competitors
6. **Technology Intent** — Installing/removing complementary or competing tech

For EACH signal:
- Signal definition and where to find it
- Urgency level (hot/warm/cool)
- Speed-to-lead target (how fast to respond)
- Outreach template (personalized to the signal)
- Routing rules (who handles what)
- SLA and follow-up cadence

Include a **Signal Scoring Matrix** to prioritize when multiple signals fire.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. cybersecurity platform", type: "short" },
      { key: "INTENT_TOOLS", label: "Intent Tools Available", placeholder: "e.g. Bombora, 6sense, G2 Buyer Intent, website analytics", type: "long" },
      { key: "INBOUND_VOLUME", label: "Monthly Inbound Leads", placeholder: "e.g. 200 MQLs/month", type: "short" },
      { key: "TEAM_SIZE", label: "Sales Team Size", placeholder: "e.g. 5 SDRs, 8 AEs", type: "short" },
    ],
  },
  {
    id: "referral-engine",
    title: "Referral Engine Builder",
    description: "Design a systematic referral program that generates warm intros from customers and partners.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a growth strategist. Design a referral engine for my sales team.

Product: [YOUR_PRODUCT]
Current customers: [CUSTOMER_COUNT]
NPS or satisfaction score: [NPS]
Average deal size: [AVG_DEAL]
Current referral rate: [REFERRAL_RATE]

Build:
1. **Customer Referral Program** — Structure, incentives, timing of asks
2. **Partner Referral Program** — Types of partners, commission structure, enablement
3. **Internal Champion Referral** — How to ask champions who change companies
4. **Referral Ask Sequences** — Email templates for each referral type
5. **Tracking & Attribution** — How to measure and report on referral pipeline
6. **Referral Playbook for Reps** — When to ask, how to ask, follow-up process
7. **Referral Nurture** — How to keep referrers engaged over time

Include specific email/message templates for each scenario.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. project management tool", type: "short" },
      { key: "CUSTOMER_COUNT", label: "Current Customer Count", placeholder: "e.g. 200 customers", type: "short" },
      { key: "NPS", label: "NPS or Satisfaction", placeholder: "e.g. NPS 45, 4.5/5 on G2", type: "short" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $30K ARR", type: "short" },
      { key: "REFERRAL_RATE", label: "Current Referral Rate", placeholder: "e.g. 5% of new deals from referrals", type: "short" },
    ],
  },
  {
    id: "content-led-pipeline",
    title: "Content-Led Pipeline Strategy",
    description: "Create a content strategy that generates inbound pipeline through educational and thought leadership content.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a content strategist for B2B sales. Create a content-led pipeline generation plan.

Product: [YOUR_PRODUCT]
Target buyer: [TARGET_BUYER]
Top 3 pain points: [PAIN_POINTS]
Current content assets: [CURRENT_CONTENT]
Distribution channels: [CHANNELS]

Build:
1. **Content Pillars** — 4-5 topic clusters that map to buyer journey stages
2. **Content Calendar** — 30-day plan with formats, topics, and distribution
3. **Lead Magnet Ideas** — 5 high-value gated assets that attract your ICP
4. **LinkedIn Content Plan** — 12 post ideas with hooks and frameworks
5. **Sales-Assisted Content** — Content reps can share in deals to accelerate
6. **Measurement Framework** — Content to pipeline attribution model
7. **Repurposing Strategy** — Turn 1 piece into 10 across channels`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales enablement platform", type: "short" },
      { key: "TARGET_BUYER", label: "Target Buyer", placeholder: "e.g. VP Sales at mid-market SaaS", type: "short" },
      { key: "PAIN_POINTS", label: "Top 3 Pain Points", placeholder: "1. Reps waste time creating decks\n2. No content analytics\n3. Inconsistent messaging", type: "long" },
      { key: "CURRENT_CONTENT", label: "Current Content Assets", placeholder: "e.g. blog, 2 case studies, product docs", type: "short" },
      { key: "CHANNELS", label: "Distribution Channels", placeholder: "e.g. LinkedIn, email newsletter, webinars", type: "short" },
    ],
  },
  {
    id: "outbound-sequence-math",
    title: "Outbound Sequence Math",
    description: "Calculate exact activity targets and sequence design based on your conversion metrics.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a sales operations analyst. Calculate my outbound activity requirements and design optimal sequences.

Targets:
- Monthly pipeline target: [PIPELINE_TARGET]
- Average deal size: [AVG_DEAL]
- Current conversion rates: [CONVERSION_RATES]
- Available selling hours per day: [SELLING_HOURS]

Calculate:
1. **Activity Math** — Exact daily/weekly numbers for emails, calls, LinkedIn touches
2. **Sequence Design** — Optimal number of steps, spacing, channel mix
3. **A/B Testing Plan** — What to test first for biggest impact
4. **Capacity Analysis** — Can you hit targets with current resources?
5. **Optimization Priorities** — Which conversion rate improvement has biggest ROI
6. **Tool Stack Recommendations** — What to automate vs. keep manual

Show all math with formulas. Include sensitivity analysis: what happens if reply rates improve by 1%?`,
    variables: [
      { key: "PIPELINE_TARGET", label: "Monthly Pipeline Target", placeholder: "e.g. $300K new pipeline/month", type: "short" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $50K ARR", type: "short" },
      { key: "CONVERSION_RATES", label: "Current Conversion Rates", placeholder: "e.g. 2% email reply rate, 15% reply-to-meeting, 30% meeting-to-opp", type: "long" },
      { key: "SELLING_HOURS", label: "Selling Hours/Day", placeholder: "e.g. 4 hours of pure prospecting time", type: "short" },
    ],
  },
  {
    id: "event-pipeline-plan",
    title: "Event Pipeline Generator",
    description: "Maximize pipeline from conferences, webinars, and events with pre/during/post playbooks.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as an event marketing strategist. Build a pipeline generation plan for [EVENT_NAME].

Event: [EVENT_NAME]
Type: [EVENT_TYPE]
Expected attendees: [ATTENDEE_COUNT]
Your product: [YOUR_PRODUCT]
Target accounts attending: [TARGET_ACCOUNTS]
Budget: [BUDGET]

Create:
1. **Pre-Event (4 weeks before)** — Outreach to target attendees, meeting scheduling, social promotion
2. **During Event** — Booth strategy, session networking, real-time social selling
3. **Post-Event (48-hour blitz)** — Follow-up sequences by lead type (hot/warm/cool)
4. **Pipeline Targets** — Expected meetings, opps, and pipeline from this event
5. **ROI Calculation** — Cost per meeting, cost per opp, projected revenue
6. **Templates** — Pre-event outreach, booth conversation starters, follow-up emails`,
    variables: [
      { key: "EVENT_NAME", label: "Event Name", placeholder: "e.g. SaaStr Annual 2025", type: "short" },
      { key: "EVENT_TYPE", label: "Event Type", placeholder: "e.g. conference with booth, webinar, roundtable dinner", type: "short" },
      { key: "ATTENDEE_COUNT", label: "Expected Attendees", placeholder: "e.g. 15,000", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "TARGET_ACCOUNTS", label: "Target Accounts Attending", placeholder: "e.g. 25 target accounts confirmed", type: "short" },
      { key: "BUDGET", label: "Event Budget", placeholder: "e.g. $30K all-in", type: "short" },
    ],
  },
  {
    id: "warm-intro-mapper",
    title: "Warm Introduction Mapper",
    description: "Map your network to find the shortest path to warm intros at target accounts.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a networking strategist. Help me find warm introduction paths to my target accounts.

Target accounts: [TARGET_ACCOUNTS]
My LinkedIn connections: [CONNECTION_COUNT]
Key relationships: [KEY_RELATIONSHIPS]
Product: [YOUR_PRODUCT]
Target role: [TARGET_ROLE]

For each target account:
1. **Shortest Path Analysis** — Most likely connection paths (investors, board, alumni, customers)
2. **Introduction Request Templates** — For each path type (customer, investor, mutual connection)
3. **LinkedIn Strategy** — Who to connect with first, engagement before ask
4. **Alternative Angles** — If no direct path: event networking, content engagement, community
5. **Warm-Up Cadence** — How to build relationship before asking for intro

Include prioritization: which warm paths convert best and which to pursue first.`,
    variables: [
      { key: "TARGET_ACCOUNTS", label: "Target Accounts (5-10)", placeholder: "1. Stripe\n2. Notion\n3. Figma\n4. Datadog\n5. Snowflake", type: "long" },
      { key: "CONNECTION_COUNT", label: "LinkedIn Connections", placeholder: "e.g. 2,500", type: "short" },
      { key: "KEY_RELATIONSHIPS", label: "Key Relationships", placeholder: "e.g. 5 VC contacts, 30 customers, former colleagues at Google", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data integration platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. VP of Engineering", type: "short" },
    ],
  },
  {
    id: "icp-signal-scoring",
    title: "ICP Signal Scoring Model",
    description: "Build a lead scoring model combining firmographic, technographic, and behavioral signals.",
    category: "Lead Generation",
    phase: 2,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a revenue operations expert. Build a lead scoring model for my sales team.

Product: [YOUR_PRODUCT]
ICP: [ICP]
CRM: [CRM]
Data sources: [DATA_SOURCES]

Create a comprehensive scoring model:

1. **Firmographic Scoring** (0-30 points)
   - Company size, industry, revenue, growth stage, geography

2. **Technographic Scoring** (0-20 points)
   - Current tech stack, competing tools, complementary tools

3. **Behavioral Scoring** (0-30 points)
   - Website visits, content downloads, email engagement, demo requests

4. **Intent Scoring** (0-20 points)
   - Third-party intent data, G2 research, competitive research

5. **Threshold Definitions**
   - Hot (>80): Route to AE immediately
   - Warm (50-79): SDR outreach within 24 hours
   - Cool (25-49): Nurture sequence
   - Cold (<25): Marketing automation only

6. **Implementation Guide** — How to set this up in [CRM]
7. **Review Cadence** — How often to recalibrate scoring weights`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. customer success platform", type: "short" },
      { key: "ICP", label: "Your ICP", placeholder: "e.g. B2B SaaS, 100-2000 employees, Series B+", type: "long" },
      { key: "CRM", label: "Your CRM", placeholder: "e.g. Salesforce, HubSpot", type: "short" },
      { key: "DATA_SOURCES", label: "Available Data Sources", placeholder: "e.g. Clearbit, Bombora, Google Analytics, LinkedIn", type: "short" },
    ],
  },

  // ── Phase 3: Account Research ──
  {
    id: "account-research",
    title: "Account Research Brief",
    description: "Deep-dive a target account: org chart, tech stack, recent news, strategic priorities, and best entry point.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["Claude", "ChatGPT", "Gemini"],
    prompt: `Act as a senior account research analyst. I need a comprehensive research brief on [COMPANY_NAME].

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
What I sell: [YOUR_PRODUCT]
My ICP: [ICP_DESCRIPTION]

Produce:
1. **Company Overview** — Revenue, headcount, HQ, markets, funding
2. **Leadership & Org Structure** — Key execs relevant to my sale, reporting for [TARGET_DEPARTMENT]
3. **Technology Stack** — Known tools (job postings, integrations, case studies)
4. **Strategic Priorities** — Public investments (earnings, press, job themes)
5. **Recent Trigger Events** — Leadership changes, funding, launches, partnerships (last 6 months)
6. **Pain Point Hypothesis** — Problems they're MOST LIKELY experiencing
7. **Recommended Entry Point** — Who to contact, what angle, what proof points
8. **Personalization Hooks** — 3 specific things for outreach

Be specific to THIS company. No generic observations.`,
    variables: [
      { key: "COMPANY_NAME", label: "Target Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech, payments", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "ICP_DESCRIPTION", label: "Your ICP", placeholder: "e.g. B2B SaaS companies with 200-2000 employees, $20M+ ARR", type: "long" },
      { key: "TARGET_DEPARTMENT", label: "Target Department", placeholder: "e.g. Sales, Engineering, Marketing", type: "short" },
    ],
  },
  {
    id: "10k-analysis",
    title: "10-K/Annual Report Analyzer",
    description: "Extract sales-relevant insights from public company filings for enterprise prospecting.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a financial analyst helping a sales team. Analyze [COMPANY_NAME]'s most recent annual report/10-K for sales intelligence.

Company: [COMPANY_NAME]
What I sell: [YOUR_PRODUCT]
Target buyer: [TARGET_BUYER]

Extract and analyze:

1. **Revenue & Growth** — Revenue trends, growth rate, segment breakdown
2. **Strategic Priorities** — What the CEO letter and MD&A emphasize
3. **Risk Factors** — Risks mentioned that my product could mitigate
4. **Technology Investments** — Planned technology spending and initiatives
5. **Competitive Pressures** — How they describe their competitive landscape
6. **Operational Challenges** — Efficiency problems or scaling issues mentioned
7. **M&A Activity** — Acquisitions that signal need for integration/consolidation

For each finding:
- Direct quote from the filing
- Why it matters for my sales approach
- Specific outreach angle it enables

Give me the TOP 3 insights I should lead my outreach with.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Salesforce, ServiceNow", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. data governance platform", type: "short" },
      { key: "TARGET_BUYER", label: "Target Buyer", placeholder: "e.g. CTO, VP of Data Engineering", type: "short" },
    ],
  },
  {
    id: "job-posting-analyzer",
    title: "Job Posting Intelligence",
    description: "Analyze a company's job postings to uncover tech stack, priorities, pain points, and outreach angles.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["ChatGPT", "Claude", "Gemini"],
    prompt: `Act as a sales intelligence analyst. Analyze job postings from [COMPANY_NAME] for prospecting intelligence.

Company: [COMPANY_NAME]
Job postings to analyze: [JOB_POSTINGS]
What I sell: [YOUR_PRODUCT]

Extract:
1. **Technology Stack** — Tools, platforms, and languages mentioned
2. **Team Growth** — Which teams are hiring aggressively (signals budget + priority)
3. **Pain Points** — Problems described in job descriptions that relate to my product
4. **Strategic Initiatives** — New capabilities they're building (why these roles?)
5. **Budget Indicators** — Seniority of hires suggests budget size
6. **Competitive Intelligence** — Competitor tools mentioned in requirements
7. **Outreach Angles** — 3 messages tailored to insights from these postings
8. **Who to Contact** — Hiring managers as entry points

Prioritize the insights by actionability for my outreach.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Notion", type: "short" },
      { key: "JOB_POSTINGS", label: "Job Postings (paste URLs or descriptions)", placeholder: "Paste 3-5 relevant job postings or their key requirements...", type: "long" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. developer productivity platform", type: "short" },
    ],
  },
  {
    id: "linkedin-company-intel",
    title: "LinkedIn Company Intelligence",
    description: "Extract actionable sales insights from a company's LinkedIn presence, posts, and employee activity.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["ChatGPT", "Gemini"],
    prompt: `Act as a social selling researcher. Analyze [COMPANY_NAME]'s LinkedIn presence for sales intelligence.

Company: [COMPANY_NAME]
What I sell: [YOUR_PRODUCT]
Target contacts: [TARGET_CONTACTS]

Analyze:
1. **Company Page Activity** — Recent posts, announcements, content themes
2. **Employee Growth** — Hiring trends by department
3. **Key Person Activity** — What are target contacts posting/engaging with?
4. **Content Themes** — What topics are they publicly investing in?
5. **Engagement Opportunities** — Posts to comment on, conversations to join
6. **Connection Mapping** — Mutual connections, shared groups, alumni overlap
7. **Personalized Approach** — For each target contact, a specific LinkedIn engagement plan
8. **Timing** — Best time to reach out based on their posting patterns

Give me a 2-week engagement plan before making the direct ask.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Figma", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. design system management platform", type: "short" },
      { key: "TARGET_CONTACTS", label: "Target Contacts", placeholder: "e.g. Head of Design, VP Product, CTO", type: "long" },
    ],
  },
  {
    id: "tech-stack-mapper",
    title: "Tech Stack Mapper",
    description: "Map a prospect's technology ecosystem to find integration hooks and displacement opportunities.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a solutions architect doing pre-sales research. Map [COMPANY_NAME]'s technology stack.

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
What I sell: [YOUR_PRODUCT]
Key integrations my product offers: [INTEGRATIONS]

Research and map:
1. **Known Stack** — Tools identified from job postings, case studies, BuiltWith, etc.
2. **Inferred Stack** — Likely tools based on company size, industry, and tech maturity
3. **Integration Hooks** — Where my product plugs into their existing tools
4. **Displacement Targets** — Tools they use that my product could replace
5. **Complementary Tools** — Tools that make my product more valuable
6. **Technical Complexity** — How hard is implementation given their stack?
7. **Technical Champion** — Who manages these tools and would evaluate mine?
8. **Outreach Message** — Tech-specific angle referencing their stack`,
    variables: [
      { key: "COMPANY_NAME", label: "Company Name", placeholder: "e.g. Datadog", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud monitoring", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. observability platform", type: "short" },
      { key: "INTEGRATIONS", label: "Your Key Integrations", placeholder: "e.g. Salesforce, Slack, Snowflake, AWS", type: "long" },
    ],
  },
  {
    id: "exec-profile-builder",
    title: "Executive Profile Builder",
    description: "Build a detailed profile on a target executive for personalized outreach and meeting prep.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["ChatGPT", "Claude", "Gemini"],
    prompt: `Act as an executive researcher. Build a comprehensive profile on [EXEC_NAME] for sales outreach.

Executive: [EXEC_NAME], [EXEC_TITLE] at [COMPANY_NAME]
What I sell: [YOUR_PRODUCT]
Meeting context: [CONTEXT]

Research and compile:
1. **Career History** — Key roles, companies, tenure, promotions
2. **Public Statements** — Quotes from interviews, podcasts, conference talks, LinkedIn posts
3. **Strategic Priorities** — What they've publicly said about their goals
4. **Communication Style** — Formal/casual, data-driven/story-driven, quick/deliberate
5. **Network** — Board seats, advisories, frequent collaborators
6. **Personal Interests** — Alma mater, causes, hobbies (for rapport)
7. **What They Care About** — Their KPIs, what gets them promoted, career trajectory
8. **Approach Recommendation** — How to reach them, what angle, what NOT to say
9. **Personalization Hooks** — 5 specific references for outreach/meeting

Make this actionable — something I can use in the next 30 minutes.`,
    variables: [
      { key: "EXEC_NAME", label: "Executive Name", placeholder: "e.g. Sarah Johnson", type: "short" },
      { key: "EXEC_TITLE", label: "Executive Title", placeholder: "e.g. CRO, VP Sales", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "CONTEXT", label: "Meeting Context", placeholder: "e.g. cold outreach, referred by investor, met at conference", type: "short" },
    ],
  },
  {
    id: "pre-call-prep",
    title: "Pre-Call Research Brief",
    description: "Quick 10-minute research brief before any sales call — company context, talking points, and landmines to avoid.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["ChatGPT", "Gemini"],
    prompt: `Act as a sales research assistant. I have a call in 10 minutes with [CONTACT_NAME] at [COMPANY_NAME]. Give me a quick prep brief.

Contact: [CONTACT_NAME], [CONTACT_ROLE]
Company: [COMPANY_NAME]
Call type: [CALL_TYPE]
What I sell: [YOUR_PRODUCT]
What I know so far: [KNOWN_INFO]

Give me a 1-page prep brief:

1. **Company Quick Facts** — Size, revenue, industry, recent news (30 seconds to scan)
2. **Contact Quick Facts** — Background, tenure, likely priorities
3. **3 Talking Points** — Specific, relevant things to bring up
4. **3 Questions to Ask** — Based on what I should learn from this call
5. **2 Personalization Hooks** — References that show I did my homework
6. **1 Landmine to Avoid** — Something NOT to say based on context
7. **Desired Outcome** — What success looks like for this specific call

Keep it scannable — bullet points only, no paragraphs.`,
    variables: [
      { key: "CONTACT_NAME", label: "Contact Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "CONTACT_ROLE", label: "Contact Role", placeholder: "e.g. VP of Engineering", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Notion", type: "short" },
      { key: "CALL_TYPE", label: "Call Type", placeholder: "e.g. discovery, demo, follow-up, negotiation", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. API management platform", type: "short" },
      { key: "KNOWN_INFO", label: "What You Know", placeholder: "e.g. they downloaded our whitepaper, currently using Kong, 50-person eng team", type: "long" },
    ],
  },
  {
    id: "industry-trends-brief",
    title: "Industry Trends Brief",
    description: "Generate an industry trends briefing you can share with prospects to position yourself as a thought leader.",
    category: "Account Research",
    phase: 3,
    optimizedFor: ["Claude", "ChatGPT", "Gemini"],
    prompt: `Act as an industry analyst. Create a trends briefing for [INDUSTRY] that I can share with prospects to build credibility.

Industry: [INDUSTRY]
My product: [YOUR_PRODUCT]
Target audience: [TARGET_AUDIENCE]
Time period: [TIME_PERIOD]

Create:
1. **Executive Summary** — 3 key trends in 3 sentences
2. **Trend Deep-Dives** (5 trends):
   - What's happening and why
   - Impact on companies in this space
   - Winners and losers
   - How it connects to what I sell (subtle, not salesy)
3. **Data Points** — 10 compelling stats with sources
4. **Predictions** — 3 bold predictions for the next 12 months
5. **Discussion Questions** — 5 questions to ask prospects that demonstrate expertise
6. **LinkedIn Post** — A post summarizing the key finding (for thought leadership)

Make this genuinely valuable — something they'd save and share even without buying from me.`,
    variables: [
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS, healthcare IT, fintech", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales analytics platform", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. VPs of Sales at mid-market companies", type: "short" },
      { key: "TIME_PERIOD", label: "Time Period", placeholder: "e.g. Q1 2025, 2025 outlook", type: "short" },
    ],
  },
];
