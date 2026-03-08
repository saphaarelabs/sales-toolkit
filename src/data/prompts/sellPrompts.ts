import type { PromptTemplate } from "../promptTemplates";

export const sellPrompts: PromptTemplate[] = [
  // ── Phase 7: Discovery & Qualification ──
  {
    id: "discovery-questions",
    title: "Discovery Call Question Generator",
    description: "Generate tailored discovery questions using SPIN methodology for any prospect.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `I'm preparing for a discovery call with a [ROLE] at a [COMPANY_TYPE] company in [INDUSTRY]. They use [CURRENT_SOLUTION] and their challenge is [PAIN_POINT].

Generate 15 discovery questions in SPIN categories:
1. Situation questions (current state)
2. Problem questions (uncover pain depth)
3. Implication questions (cost of inaction)
4. Need-payoff questions (value of change)

Make questions conversational, not interrogative. Include follow-up prompts.`,
    variables: [
      { key: "ROLE", label: "Prospect's Role", placeholder: "e.g. VP of Sales", type: "short" },
      { key: "COMPANY_TYPE", label: "Company Type", placeholder: "e.g. mid-market, enterprise", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech", type: "short" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. spreadsheets, Competitor X", type: "short" },
      { key: "PAIN_POINT", label: "Main Pain Point", placeholder: "e.g. slow pipeline velocity", type: "short" },
    ],
  },
  {
    id: "deal-review",
    title: "Deal Strategy Advisor",
    description: "Get an AI analysis of your deal with MEDDIC-based recommendations.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a seasoned sales strategist. Review this deal using MEDDIC.

- Company: [COMPANY]
- Deal size: [DEAL_SIZE]
- Stage: [STAGE]
- Champion: [CHAMPION]
- Economic buyer: [BUYER]
- Timeline: [TIMELINE]
- Competition: [COMPETITION]
- Main blocker: [BLOCKER]
- Context: [CONTEXT]

Analyze:
1. Deal health score (1-10) against each MEDDIC element
2. Top 3 risks and mitigations
3. Missing information and questions to ask
4. Next 3 actions in priority order
5. Recovery play if deal is at risk

Be direct and specific to THIS deal.`,
    variables: [
      { key: "COMPANY", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $85K ARR", type: "short" },
      { key: "STAGE", label: "Stage", placeholder: "e.g. Proposal sent", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, Director of Ops", type: "short" },
      { key: "BUYER", label: "Economic Buyer", placeholder: "e.g. CFO — haven't met yet", type: "short" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. Q1 decision", type: "short" },
      { key: "COMPETITION", label: "Competition", placeholder: "e.g. us vs. Competitor X", type: "short" },
      { key: "BLOCKER", label: "Main Blocker", placeholder: "e.g. legal team slow", type: "short" },
      { key: "CONTEXT", label: "Additional Context", placeholder: "Any other details...", type: "long" },
    ],
  },
  {
    id: "meeting-agenda",
    title: "Meeting Agenda Builder",
    description: "Create a structured meeting agenda with time allocations, questions, and next-step proposals.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Build a structured meeting agenda for a [MEETING_TYPE] with [PROSPECT_ROLE] at [PROSPECT_COMPANY].

Duration: [DURATION]
Their attendees: [THEIR_ATTENDEES]
Our attendees: [OUR_ATTENDEES]
Known context: [KNOWN_CONTEXT]
Key objective: [OBJECTIVE]

Create:
1. **Time-Boxed Sections** adding up to [DURATION]
2. **Opening** — Rapport question + agenda confirmation
3. **Discovery Sections** — 3-4 topics with questions, what to listen for, transitions
4. **Value Demo** — Connect answers to solution (without pitching)
5. **Next Steps** — Specific proposals with dates
6. **Pre-Meeting Prep Checklist**

Also: 3 potential derailers and recovery plays, the ONE must-ask question, post-meeting email template.`,
    variables: [
      { key: "MEETING_TYPE", label: "Meeting Type", placeholder: "e.g. Discovery call, Demo", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP of Engineering", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Company", placeholder: "e.g. Notion", type: "short" },
      { key: "DURATION", label: "Duration", placeholder: "e.g. 30 minutes", type: "short" },
      { key: "THEIR_ATTENDEES", label: "Their Attendees", placeholder: "e.g. VP Eng + 2 engineers", type: "short" },
      { key: "OUR_ATTENDEES", label: "Our Attendees", placeholder: "e.g. AE + SE", type: "short" },
      { key: "KNOWN_CONTEXT", label: "Known Context", placeholder: "e.g. evaluating tools to replace internal solution", type: "long" },
      { key: "OBJECTIVE", label: "Meeting Objective", placeholder: "e.g. qualify budget and timeline", type: "short" },
    ],
  },
  {
    id: "post-meeting-summary",
    title: "Post-Meeting Summary & Next Steps",
    description: "Turn raw call notes into a polished recap email with action items.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT", "Gemini"],
    prompt: `Turn my raw meeting notes into a polished follow-up email.

Company: [COMPANY_NAME]
Attendees: [ATTENDEES]
Meeting type: [MEETING_TYPE]
Date: [MEETING_DATE]
Raw notes: [RAW_NOTES]

Create:
1. **Subject Line** — Specific and action-oriented
2. **Opening** — Thank + specific moment reference
3. **Key Takeaways** (3-5 bullets) — What THEY said, their exact words
4. **Action Items** — Table: Action | Owner | Due Date
5. **Next Steps** — Specific meeting/milestone with date
6. **Open Questions** — Items needing follow-up

Under 300 words. Professional but warm. Make them feel heard.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ATTENDEES", label: "Attendees", placeholder: "e.g. Sarah (VP Sales), Mike (CTO), us: Jordan + Taylor", type: "long" },
      { key: "MEETING_TYPE", label: "Meeting Type", placeholder: "e.g. Discovery call", type: "short" },
      { key: "MEETING_DATE", label: "Date", placeholder: "e.g. March 15, 2025", type: "short" },
      { key: "RAW_NOTES", label: "Raw Notes", placeholder: "Paste your raw notes...", type: "long" },
    ],
  },
  {
    id: "technical-discovery",
    title: "Technical Discovery Questions",
    description: "Deep technical qualification questions for SE-led conversations with engineering buyers.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT", "Cursor"],
    prompt: `Generate deep technical discovery questions for a call with [PROSPECT_ROLE] at [PROSPECT_COMPANY].

Tech stack: [TECH_STACK]
Product: [YOUR_PRODUCT]
Differentiators: [TECH_DIFFERENTIATORS]
Integrations: [INTEGRATIONS]

Questions by category:
1. **Current Architecture** (5 questions)
2. **Integration & Data Flow** (4 questions)
3. **Security & Compliance** (3 questions)
4. **Evaluation Criteria** (4 questions)
5. **Implementation & Migration** (3 questions)

For EACH: the question, why you're asking, follow-up, red flag vs. green flag answer.

End with a **Technical Qualification Scorecard** template.`,
    variables: [
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. CTO, VP Engineering", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Company", placeholder: "e.g. Stripe", type: "short" },
      { key: "TECH_STACK", label: "Their Tech Stack", placeholder: "e.g. AWS, React, PostgreSQL", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data integration platform", type: "short" },
      { key: "TECH_DIFFERENTIATORS", label: "Differentiators", placeholder: "e.g. real-time sync, no-code connectors", type: "long" },
      { key: "INTEGRATIONS", label: "Key Integrations", placeholder: "e.g. Salesforce, Snowflake", type: "short" },
    ],
  },
  {
    id: "stakeholder-map",
    title: "Stakeholder Map Builder",
    description: "Map the buying committee with influence levels, motivations, and engagement strategies.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me map the buying committee at [COMPANY_NAME].

Deal size: [DEAL_SIZE]
Product: [YOUR_PRODUCT]
Stage: [CURRENT_STAGE]
Known stakeholders: [KNOWN_STAKEHOLDERS]

Build:
1. **Buying Committee Matrix**: Name | Title | Role | Influence | Stance | Priority
2. **Per-Stakeholder**: What they care about, evaluation style, key message, risk, engagement plan
3. **Influence Map**: Power dynamics, veto power, alliances
4. **Gap Analysis**: Missing stakeholders, unmet contacts, weak relationships
5. **4-Week Engagement Plan**: Week | Stakeholder | Action | Channel | Goal
6. **Deal Risk Score** (1-10) based on stakeholder coverage`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $200K ARR", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales enablement platform", type: "short" },
      { key: "CURRENT_STAGE", label: "Stage", placeholder: "e.g. post-demo, entering evaluation", type: "short" },
      { key: "KNOWN_STAKEHOLDERS", label: "Known Stakeholders", placeholder: "1. Sarah - VP Sales (champion)\n2. Mike - CFO (cautious)\n3. IT - haven't met", type: "long" },
    ],
  },
  {
    id: "qualification-scorecard",
    title: "Deal Qualification Scorecard",
    description: "Score a deal against MEDDIC, BANT, or SPICED frameworks with go/no-go recommendation.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a sales qualification expert. Score this deal using [FRAMEWORK].

Deal details:
- Company: [COMPANY_NAME]
- Deal size: [DEAL_SIZE]
- Stage: [STAGE]
- Discovery notes: [DISCOVERY_NOTES]
- Timeline: [TIMELINE]
- Budget: [BUDGET_INFO]

Score against [FRAMEWORK] criteria (1-5 each):
- Provide the scoring rubric
- Score each element with evidence
- Calculate overall qualification score
- Give a clear GO / CONDITIONAL GO / NO-GO recommendation
- List the TOP 3 questions to ask that would change the score
- Suggest the single most important next action

Be brutally honest. Weak pipeline costs more than an honest "no-go."`,
    variables: [
      { key: "FRAMEWORK", label: "Framework", placeholder: "e.g. MEDDIC, BANT, SPICED", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $75K ARR", type: "short" },
      { key: "STAGE", label: "Stage", placeholder: "e.g. post-discovery, pre-demo", type: "short" },
      { key: "DISCOVERY_NOTES", label: "Discovery Notes", placeholder: "Paste notes from discovery calls...", type: "long" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. looking to decide in 60 days", type: "short" },
      { key: "BUDGET_INFO", label: "Budget Info", placeholder: "e.g. $50-100K allocated, needs CFO approval above $75K", type: "short" },
    ],
  },
  {
    id: "challenger-talk-track",
    title: "Challenger Sale Talk Track",
    description: "Build a Challenger-style teaching conversation that reframes how your prospect thinks about their problem.",
    category: "Discovery & Qualification",
    phase: 7,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a Challenger Sale talk track for [TARGET_ROLE] in [INDUSTRY].

Product: [YOUR_PRODUCT]
Common belief to challenge: [COMMON_BELIEF]
Your reframe: [YOUR_REFRAME]
Supporting data: [DATA]

Create a 4-part Challenger conversation:
1. **Warmer** — Build credibility with a relevant insight about their industry
2. **Reframe** — Challenge their current thinking with unexpected data
3. **Rational Drowning** — Show the cost of their current approach with numbers
4. **Emotional Impact** — Make it personal (their career, their team, their reputation)
5. **New Way** — Present a new framework for thinking about the problem
6. **Your Solution** — How your product enables the new way (last, not first)

Include exact talk tracks and transition phrases for each step.`,
    variables: [
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. conversation intelligence", type: "short" },
      { key: "COMMON_BELIEF", label: "Common Belief to Challenge", placeholder: "e.g. 'more calls = more pipeline'", type: "long" },
      { key: "YOUR_REFRAME", label: "Your Reframe", placeholder: "e.g. 'call quality matters 5x more than quantity'", type: "long" },
      { key: "DATA", label: "Supporting Data", placeholder: "e.g. top 20% of reps make 30% fewer calls but close 2.5x more", type: "long" },
    ],
  },

  // ── Phase 8: Demo & Presentation ──
  {
    id: "demo-script",
    title: "Demo Script Generator",
    description: "Build a tailored demo flow with talk tracks and objection responses.",
    category: "Demo & Presentation",
    phase: 8,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a tailored demo script for [PROSPECT_COMPANY].

Prospect: [PROSPECT_ROLE] at [PROSPECT_COMPANY]
Industry: [INDUSTRY]
Pain points: [PAIN_POINTS]
Current solution: [CURRENT_SOLUTION]
Impressed by: [IMPRESSED_BY]
Duration: [DURATION]

Create:
1. **Opening Hook (2 min)** — Start with THEIR problem
2. **"Day in the Life" Scenario** — Their workflow, their terminology
3. **3 Wow Moments** — For each pain point: setup, show, impact, proof
4. **Objection Responses** — Anticipated objections per section
5. **Close & Next Steps** — Based on buying signals
6. **Do's/Don'ts** — Don't show unrequested features, DO pause for reactions`,
    variables: [
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. Head of Sales Ops", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Company", placeholder: "e.g. Figma", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. design software", type: "short" },
      { key: "PAIN_POINTS", label: "Top 3 Pain Points", placeholder: "1. Manual reporting\n2. No pipeline visibility\n3. Gaming forecasts", type: "long" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. Salesforce reports + spreadsheets", type: "short" },
      { key: "IMPRESSED_BY", label: "What Impressed Them", placeholder: "e.g. AI forecasting from website", type: "short" },
      { key: "DURATION", label: "Duration", placeholder: "e.g. 30 minutes", type: "short" },
    ],
  },
  {
    id: "demo-environment-prep",
    title: "Demo Environment Setup",
    description: "Configure your demo environment with industry-specific data, scenarios, and storylines.",
    category: "Demo & Presentation",
    phase: 8,
    optimizedFor: ["Claude", "Cursor"],
    prompt: `Help me set up a demo environment tailored to [PROSPECT_COMPANY].

Product: [YOUR_PRODUCT]
Prospect industry: [INDUSTRY]
Prospect company size: [COMPANY_SIZE]
Key use cases to show: [USE_CASES]
Prospect's terminology: [TERMINOLOGY]

Create:
1. **Demo Data Setup** — Realistic data that mirrors their world:
   - Company names, contact names, deal sizes, pipeline stages
   - Industry-specific metrics and KPIs
   - Scenario walkthrough with believable numbers

2. **Story Arc** — A narrative that ties demo sections together:
   - "Meet [persona], they're dealing with [problem]..."
   - 3 acts: Problem → Discovery → Resolution

3. **Backup Scenarios** — If they want to see something different
4. **Technical Prep Checklist** — Everything to verify before going live
5. **"Leave Behind" Data Points** — Stats to share post-demo`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. CRM platform", type: "short" },
      { key: "INDUSTRY", label: "Prospect Industry", placeholder: "e.g. healthcare", type: "short" },
      { key: "COMPANY_SIZE", label: "Company Size", placeholder: "e.g. 500 employees, $80M revenue", type: "short" },
      { key: "USE_CASES", label: "Key Use Cases", placeholder: "e.g. pipeline tracking, forecasting, rep coaching", type: "long" },
      { key: "TERMINOLOGY", label: "Their Terminology", placeholder: "e.g. they say 'patients' not 'customers', 'providers' not 'reps'", type: "long" },
    ],
  },
  {
    id: "executive-presentation",
    title: "Executive Presentation Builder",
    description: "Build a C-suite presentation deck outline focused on business outcomes, not features.",
    category: "Demo & Presentation",
    phase: 8,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a C-suite presentation for [EXEC_TITLE] at [COMPANY_NAME].

Context:
- Executive: [EXEC_TITLE] at [COMPANY_NAME]
- Industry: [INDUSTRY]
- Product: [YOUR_PRODUCT]
- Business problem: [BUSINESS_PROBLEM]
- ROI data: [ROI_DATA]
- Meeting duration: [DURATION]

Create a slide-by-slide outline:
1. **Slide 1: Their Strategic Challenge** (not your product)
2. **Slide 2: Market Context** — What leading companies are doing differently
3. **Slide 3: The Cost of Status Quo** — Quantified impact
4. **Slide 4: The Vision** — What "great" looks like for their organization
5. **Slide 5: How We Get There** — Your approach (not features)
6. **Slide 6: Proof** — 2-3 peer companies with results
7. **Slide 7: Investment & ROI** — Show the math
8. **Slide 8: Next Steps** — Specific, time-bound

For each slide: headline, 3 bullet points, speaker notes, and one data point.
Rules: No feature lists, no product screenshots, no jargon. Business language only.`,
    variables: [
      { key: "EXEC_TITLE", label: "Executive Title", placeholder: "e.g. CRO, CFO, CEO", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud data", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue operations platform", type: "short" },
      { key: "BUSINESS_PROBLEM", label: "Business Problem", placeholder: "e.g. 40% forecast miss rate, $5M pipeline leak per quarter", type: "long" },
      { key: "ROI_DATA", label: "ROI Data", placeholder: "e.g. customers see 35% improvement in 90 days", type: "long" },
      { key: "DURATION", label: "Meeting Duration", placeholder: "e.g. 20 minutes", type: "short" },
    ],
  },
  {
    id: "poc-design",
    title: "POC / Pilot Design",
    description: "Design a proof-of-concept that's scoped to demonstrate value and drive a purchasing decision.",
    category: "Demo & Presentation",
    phase: 8,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Design a POC/pilot for [COMPANY_NAME] that drives a purchase decision.

Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Use case: [USE_CASE]
Success criteria they care about: [SUCCESS_CRITERIA]
Timeline: [TIMELINE]
Participants: [PARTICIPANTS]

Create:
1. **POC Scope Document** — What's in and out of scope (prevent scope creep)
2. **Success Metrics** — Measurable outcomes that prove value
3. **Timeline** — Week-by-week milestones
4. **Resource Requirements** — From both sides
5. **Risk Mitigation** — What could go wrong and how to prevent it
6. **Decision Framework** — Clear go/no-go criteria at the end
7. **Transition Plan** — How POC converts to full deployment
8. **Anti-Free-Trial Guardrails** — How to prevent "endless POC" without commitment`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI analytics platform", type: "short" },
      { key: "USE_CASE", label: "POC Use Case", placeholder: "e.g. pipeline forecasting for sales team of 30", type: "long" },
      { key: "SUCCESS_CRITERIA", label: "Success Criteria", placeholder: "e.g. 90% forecast accuracy, 5hrs/week time saved", type: "long" },
      { key: "TIMELINE", label: "POC Timeline", placeholder: "e.g. 30 days", type: "short" },
      { key: "PARTICIPANTS", label: "Participants", placeholder: "e.g. 10 sales reps, 2 managers, 1 ops person", type: "short" },
    ],
  },
  {
    id: "roi-presentation",
    title: "ROI Presentation Builder",
    description: "Build a visual ROI presentation with before/after metrics, payback period, and conservative projections.",
    category: "Demo & Presentation",
    phase: 8,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build an ROI presentation for [COMPANY_NAME].

Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Current costs/metrics: [CURRENT_METRICS]
Expected improvements: [IMPROVEMENTS]
Your pricing: [PRICING]
Implementation time: [IMPL_TIME]

Create:
1. **Current State Costs** — Quantify the cost of doing nothing
2. **Before/After Comparison** — Visual table format
3. **ROI Calculation** — Show the math with conservative/moderate/aggressive scenarios
4. **Payback Period** — When the investment pays for itself
5. **3-Year Projection** — Compounding value over time
6. **Hidden Benefits** — Things hard to quantify but real (morale, retention, speed)
7. **Risk-Adjusted Returns** — Account for adoption delays and ramp time

All numbers must use their specific data. No generic "industry averages."`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales automation platform", type: "short" },
      { key: "CURRENT_METRICS", label: "Current Metrics", placeholder: "e.g. 5 hrs/week reporting, 55% forecast accuracy, 90-day sales cycle", type: "long" },
      { key: "IMPROVEMENTS", label: "Expected Improvements", placeholder: "e.g. 80% less reporting time, 85% accuracy, 20% shorter cycle", type: "long" },
      { key: "PRICING", label: "Your Pricing", placeholder: "e.g. $60K/year", type: "short" },
      { key: "IMPL_TIME", label: "Implementation Time", placeholder: "e.g. 4 weeks to value", type: "short" },
    ],
  },

  // ── Phase 9: Multi-Threading ──
  {
    id: "multi-thread",
    title: "Multi-Thread Strategy",
    description: "Generate personalized outreach for every stakeholder — champion, buyer, evaluator, blocker.",
    category: "Multi-Threading",
    phase: 9,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me multi-thread into [COMPANY_NAME].

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Champion: [CHAMPION_INFO]
Product: [YOUR_PRODUCT]
Business problem: [BUSINESS_PROBLEM]
Stakeholders: [STAKEHOLDER_LIST]

For each persona:
1. **Champion** — How to arm them, draft forward email, talking points, keep engaged
2. **Economic Buyer** — What they care about, outreach message, 3 key numbers
3. **Technical Evaluator** — Proof points, peer-to-peer outreach, resources to share
4. **Potential Blocker** — Why they might block, how to neutralize, outreach message
5. **Multi-Thread Action Plan** — Week-by-week engagement plan

Be specific to THIS deal.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $150K ARR", type: "short" },
      { key: "CHAMPION_INFO", label: "Champion Info", placeholder: "e.g. Sarah, Director RevOps, strong advocate", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "BUSINESS_PROBLEM", label: "Business Problem", placeholder: "e.g. forecast accuracy below 60%", type: "long" },
      { key: "STAKEHOLDER_LIST", label: "Known Stakeholders", placeholder: "1. Sarah - Dir RevOps (champion)\n2. Unknown CFO\n3. IT team", type: "long" },
    ],
  },
  {
    id: "champion-enablement",
    title: "Champion Enablement Kit",
    description: "Create internal selling materials your champion can use: one-pager, exec email, FAQ.",
    category: "Multi-Threading",
    phase: 9,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a Champion Enablement Kit for [CHAMPION_NAME] at [COMPANY_NAME].

Champion: [CHAMPION_NAME], [CHAMPION_ROLE]
Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Problem: [KEY_PROBLEM]
ROI: [ROI_DATA]
Approvers: [APPROVERS]

Create 4 deliverables:
1. **Internal One-Pager** — Problem, solution, impact, investment (no vendor logos)
2. **Executive Email Draft** — Champion → boss, frames as THEIR recommendation
3. **FAQ for Skeptics** — 8-10 likely questions with concise answers
4. **Presentation Talking Points** — 5 slides of talking points with proof

Everything should sound like it came from the champion, not from us.`,
    variables: [
      { key: "CHAMPION_NAME", label: "Champion Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "CHAMPION_ROLE", label: "Champion Role", placeholder: "e.g. Director of Sales Operations", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. AI-powered forecasting", type: "short" },
      { key: "KEY_PROBLEM", label: "Key Problem", placeholder: "e.g. forecast accuracy is 55%", type: "long" },
      { key: "ROI_DATA", label: "ROI Data", placeholder: "e.g. 35% improvement in 90 days", type: "long" },
      { key: "APPROVERS", label: "Who Needs to Approve", placeholder: "e.g. CFO, CTO, VP Sales", type: "long" },
    ],
  },
  {
    id: "buying-committee-email",
    title: "Buying Committee Email Set",
    description: "Write personalized emails for each member of the buying committee based on their role and concerns.",
    category: "Multi-Threading",
    phase: 9,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write personalized emails for each buying committee member at [COMPANY_NAME].

Product: [YOUR_PRODUCT]
Deal context: [DEAL_CONTEXT]

Committee members:
[COMMITTEE_MEMBERS]

For EACH member write:
1. **Subject line** tailored to their role
2. **Email body** (under 80 words) focused on what THEY care about
3. **CTA** appropriate to their role in the decision
4. **Tone** matching their communication style

Also provide:
- Sending sequence (who to email first, second, third)
- How to coordinate with your champion on timing
- What NOT to say to each persona`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. security platform", type: "short" },
      { key: "DEAL_CONTEXT", label: "Deal Context", placeholder: "e.g. post-demo, champion is bought in, need CFO and IT approval", type: "long" },
      { key: "COMMITTEE_MEMBERS", label: "Committee Members", placeholder: "1. Sarah, VP Sales (champion)\n2. Mike, CFO (budget approver)\n3. Lisa, IT Director (security review)\n4. Tom, Sales Ops (end user)", type: "long" },
    ],
  },

  // ── Phase 10: Objection Handling ──
  {
    id: "objection-playbook",
    title: "Objection Response Playbook",
    description: "Build a comprehensive objection handling guide with responses for the top 15 sales objections.",
    category: "Objection Handling",
    phase: 10,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a complete objection handling playbook for my sales team.

Product: [YOUR_PRODUCT]
Average deal size: [AVG_DEAL]
Top competitors: [COMPETITORS]
Common objections: [COMMON_OBJECTIONS]

For each of these 15 objections, provide:
| Objection | Root Cause | Response Framework | Example Response | Follow-Up Question |

Objections to cover:
1. "It's too expensive"
2. "We're happy with what we have"
3. "We don't have budget"
4. "Now's not a good time"
5. "Send me more information"
6. "I need to talk to my team"
7. "[Competitor] is cheaper/better"
8. "We tried something like this before"
9. "We can build this in-house"
10. "We're in a contract with someone else"
11. "I'm not the right person"
12. "How is this different from X?"
13. "We need to see more ROI proof"
14. "This is too complex to implement"
15. "We're going through changes right now"

Use the "Acknowledge, Question, Reframe" framework for each.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales analytics platform", type: "short" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $50K ARR", type: "short" },
      { key: "COMPETITORS", label: "Top Competitors", placeholder: "e.g. Gong, Chorus, Clari", type: "short" },
      { key: "COMMON_OBJECTIONS", label: "Your Most Common Objections", placeholder: "e.g. price, implementation time, integration concerns", type: "long" },
    ],
  },
  {
    id: "competitive-objection-handler",
    title: "Competitive Objection Handler",
    description: "Handle 'why not [competitor]?' objections with fact-based differentiation and trap-setting questions.",
    category: "Objection Handling",
    phase: 10,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me handle competitive objections against [COMPETITOR].

My product: [YOUR_PRODUCT]
Competitor: [COMPETITOR]
Their strengths: [THEIR_STRENGTHS]
Their weaknesses: [THEIR_WEAKNESSES]
Our strengths: [OUR_STRENGTHS]
Common comparison points: [COMPARISON_POINTS]

Create:
1. **Head-to-Head Comparison** — Honest feature/capability matrix
2. **"Trap" Questions** — Questions to ask that expose competitor weaknesses
3. **Response Scripts** for each scenario:
   - "We're looking at [Competitor] too"
   - "[Competitor] is cheaper"
   - "[Competitor] can do everything you do"
   - "We already use [Competitor]"
   - "[Competitor] was recommended by [analyst/consultant]"

4. **Landmines to Set** — Things to highlight that make the competitor look weak later
5. **Never Say** — Things that make you look petty or desperate
6. **Win Story** — A customer who evaluated both and chose you (template)

Never trash-talk. Let the facts speak.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. CRM platform", type: "short" },
      { key: "COMPETITOR", label: "Competitor", placeholder: "e.g. Salesforce", type: "short" },
      { key: "THEIR_STRENGTHS", label: "Their Strengths", placeholder: "e.g. brand recognition, ecosystem, enterprise features", type: "long" },
      { key: "THEIR_WEAKNESSES", label: "Their Weaknesses", placeholder: "e.g. complexity, cost, implementation time", type: "long" },
      { key: "OUR_STRENGTHS", label: "Our Strengths", placeholder: "e.g. ease of use, faster implementation, modern UX", type: "long" },
      { key: "COMPARISON_POINTS", label: "Common Comparison Points", placeholder: "e.g. pricing, ease of use, integrations, reporting", type: "long" },
    ],
  },
  {
    id: "price-objection-tactics",
    title: "Price Objection Tactics",
    description: "10 strategies for handling 'it's too expensive' without discounting, with scripts and frameworks.",
    category: "Objection Handling",
    phase: 10,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Give me 10 strategies for handling price objections without discounting.

Product: [YOUR_PRODUCT]
Pricing: [PRICING]
Average deal size: [AVG_DEAL]
Common price objections: [PRICE_OBJECTIONS]
Value metrics: [VALUE_METRICS]

For each strategy:
1. **Name**: Short memorable name
2. **When to use**: Specific scenario
3. **Script**: Exact words to say
4. **Psychology**: Why it works
5. **Follow-up**: Next question to ask

Strategies should include:
- The "compared to what?" reframe
- The "cost of inaction" calculation
- The "break it down per user per day" approach
- The "what would you cut?" prioritization
- The "if money weren't an issue" question
- Plus 5 more creative approaches

Also: When IS discounting the right move, and how to discount strategically.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. analytics platform", type: "short" },
      { key: "PRICING", label: "Your Pricing", placeholder: "e.g. $50/user/month", type: "short" },
      { key: "AVG_DEAL", label: "Average Deal Size", placeholder: "e.g. $60K ARR", type: "short" },
      { key: "PRICE_OBJECTIONS", label: "Price Objections You Hear", placeholder: "e.g. 'too expensive', 'competitor is 40% less', 'over budget'", type: "long" },
      { key: "VALUE_METRICS", label: "Key Value Metrics", placeholder: "e.g. saves 10 hrs/week, increases close rate 25%", type: "long" },
    ],
  },
  {
    id: "status-quo-objection",
    title: "Status Quo Objection Breaker",
    description: "Overcome 'we're fine with what we have' by quantifying the cost of inaction.",
    category: "Objection Handling",
    phase: 10,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me overcome the "we're happy with what we have" objection.

Their current solution: [CURRENT_SOLUTION]
Product: [YOUR_PRODUCT]
Industry: [INDUSTRY]
Known inefficiencies: [INEFFICIENCIES]
Industry benchmarks: [BENCHMARKS]

Create:
1. **Cost of Status Quo Calculator** — Walk me through calculating the real cost:
   - Time costs (hours wasted × hourly rate × team size)
   - Opportunity costs (deals lost, revenue missed)
   - Risk costs (compliance, security, scalability)
   - Hidden costs (training, maintenance, workarounds)

2. **Questions That Create Doubt** — 5 questions that make them reconsider:
   - Each designed to reveal a hidden pain they've normalized

3. **"Day in the Life" Comparison** — Their current workflow vs. with your solution

4. **Social Proof Angles** — Companies who said the same thing and changed:
   - Template for sharing competitor adoption stories

5. **Timing Triggers** — When status quo becomes untenable (events to watch for)`,
    variables: [
      { key: "CURRENT_SOLUTION", label: "Their Current Solution", placeholder: "e.g. spreadsheets, legacy CRM, manual processes", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. automated revenue platform", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "INEFFICIENCIES", label: "Known Inefficiencies", placeholder: "e.g. 5 hrs/week manual reporting, no real-time data", type: "long" },
      { key: "BENCHMARKS", label: "Industry Benchmarks", placeholder: "e.g. top performers automate 80% of reporting", type: "long" },
    ],
  },

  // ── Phase 11: Proposals & Business Case ──
  {
    id: "proposal-draft",
    title: "Proposal / Executive Summary Writer",
    description: "Generate a polished executive summary for your proposal based on discovery notes.",
    category: "Proposals & Business Case",
    phase: 11,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Write a professional executive summary for a proposal.

Company: [COMPANY_NAME]
Contact: [CONTACT_NAME], [CONTACT_ROLE]
Industry: [INDUSTRY]
Discovery notes: [DISCOVERY_NOTES]
Solution: [YOUR_SOLUTION]
Pricing: [PRICING]

Sections:
1. Current Situation & Challenges
2. Desired Outcomes
3. Recommended Solution
4. Expected ROI / Business Impact
5. Investment & Next Steps

Make it about THEM, not us. Reference specific discovery insights.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CONTACT_NAME", label: "Contact Name", placeholder: "e.g. Sarah Johnson", type: "short" },
      { key: "CONTACT_ROLE", label: "Contact Role", placeholder: "e.g. VP of Operations", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. manufacturing", type: "short" },
      { key: "DISCOVERY_NOTES", label: "Discovery Notes", placeholder: "Paste your notes...", type: "long" },
      { key: "YOUR_SOLUTION", label: "Your Solution", placeholder: "e.g. AI-powered inventory management", type: "short" },
      { key: "PRICING", label: "Pricing", placeholder: "e.g. $2,500/mo for team plan", type: "short" },
    ],
  },
  {
    id: "mutual-action-plan",
    title: "Mutual Action Plan Generator",
    description: "Create a shared close plan with milestones, owners, and risk flags.",
    category: "Proposals & Business Case",
    phase: 11,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a Mutual Action Plan for a complex deal.

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Close date: [CLOSE_DATE]
Champion: [CHAMPION]
Buyer: [ECON_BUYER]
Stage: [CURRENT_STAGE]
Requirements: [REQUIREMENTS]

Create:
1. **Shared Objective** — 2 sentences, partnership framing
2. **Milestone Timeline** (backward from close): Milestone | Owner | Date | Status | Dependencies
3. **Success Criteria** per stakeholder
4. **Risk Register**: Risk | Likelihood | Impact | Mitigation (5+ risks)
5. **Communication Plan** — Cadence, who talks to whom, escalation
6. **Go-Live Plan** — Post-signature implementation

Something I can share directly with the prospect.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $200K ARR", type: "short" },
      { key: "CLOSE_DATE", label: "Close Date", placeholder: "e.g. March 31, 2025", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP Sales", type: "short" },
      { key: "ECON_BUYER", label: "Economic Buyer", placeholder: "e.g. CFO, Mike", type: "short" },
      { key: "CURRENT_STAGE", label: "Stage", placeholder: "e.g. post-demo, entering validation", type: "short" },
      { key: "REQUIREMENTS", label: "Requirements", placeholder: "e.g. SSO, SOC2, Salesforce integration", type: "long" },
    ],
  },
  {
    id: "business-case",
    title: "Business Case Builder",
    description: "Generate a CFO-ready business case with ROI analysis and cost of inaction.",
    category: "Proposals & Business Case",
    phase: 11,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a CFO-ready business case for purchasing [YOUR_PRODUCT].

Company: [COMPANY_NAME]
Industry: [INDUSTRY]
Size: [COMPANY_SIZE]
Current solution: [CURRENT_SOLUTION]
Pain points: [PAIN_POINTS]
Product: [YOUR_PRODUCT]
Pricing: [PRICING]
Implementation: [IMPL_TIMELINE]

Build:
1. **Executive Summary** (3 sentences)
2. **Current State Analysis** — Quantified costs, hidden costs, risk
3. **Cost of Inaction** (12-month) — Revenue at risk, productivity losses
4. **Proposed Investment** — Total cost breakdown
5. **Expected Returns** — Conservative/moderate/aggressive scenarios, payback period
6. **Risk Mitigation** — Implementation risks, rollback plan
7. **Recommendation & Next Steps**

Show your math. CFOs want calculations, not conclusions.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. e-commerce", type: "short" },
      { key: "COMPANY_SIZE", label: "Size", placeholder: "e.g. 500 employees, $80M revenue", type: "short" },
      { key: "CURRENT_SOLUTION", label: "Current Solution", placeholder: "e.g. manual + spreadsheets", type: "short" },
      { key: "PAIN_POINTS", label: "Pain Points", placeholder: "e.g. 30% forecast miss rate, 5 hrs/week reporting", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence", type: "short" },
      { key: "PRICING", label: "Pricing", placeholder: "e.g. $50K/year for team of 30", type: "short" },
      { key: "IMPL_TIMELINE", label: "Implementation", placeholder: "e.g. 4-week setup, 8-week rollout", type: "short" },
    ],
  },

  // ── Phase 12: Negotiation & Pricing ──
  {
    id: "negotiation-prep",
    title: "Negotiation Prep & Concession Strategy",
    description: "Generate a negotiation playbook with BATNA, concession ladder, and walk-away triggers.",
    category: "Negotiation & Pricing",
    phase: 12,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me prepare for a pricing negotiation.

Company: [COMPANY_NAME]
List price: [LIST_PRICE]
Floor price: [FLOOR_PRICE]
Their budget: [THEIR_BUDGET]
Competition: [COMPETITION]
Our leverage: [OUR_LEVERAGE]
Their leverage: [THEIR_LEVERAGE]
Timeline: [TIMELINE]

Build:
1. **Pre-Negotiation Analysis** — Their opening position, our BATNA, their BATNA, ZOPA
2. **Concession Ladder** (8-10): Concession | Cost to Us | Value to Them | When to Use
3. **Non-Monetary Trades** — Free but high-value items
4. **Objection Responses** — "30% cheaper elsewhere", "bigger discount for multi-year", "3 bids required", "reduce scope"
5. **Walk-Away Triggers**
6. **3 Closing Techniques** for this deal

Every concession should be traded, not given.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "LIST_PRICE", label: "List Price", placeholder: "e.g. $120K ARR", type: "short" },
      { key: "FLOOR_PRICE", label: "Walk-Away Price", placeholder: "e.g. $90K ARR", type: "short" },
      { key: "THEIR_BUDGET", label: "Their Budget", placeholder: "e.g. $80-100K", type: "short" },
      { key: "COMPETITION", label: "Competition", placeholder: "e.g. Gong and Chorus", type: "short" },
      { key: "OUR_LEVERAGE", label: "Our Leverage", placeholder: "e.g. champion loves us, tech validation done", type: "long" },
      { key: "THEIR_LEVERAGE", label: "Their Leverage", placeholder: "e.g. end of our quarter, multiple alternatives", type: "long" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. close by March 31", type: "short" },
    ],
  },
  {
    id: "pricing-strategy",
    title: "Pricing Strategy Advisor",
    description: "Analyze competitive positioning and recommend pricing, packaging, and discounting approach.",
    category: "Negotiation & Pricing",
    phase: 12,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Analyze my pricing strategy and recommend improvements.

Product: [YOUR_PRODUCT]
Current pricing: [CURRENT_PRICING]
Target market: [TARGET_MARKET]
Competitors: [COMPETITOR_PRICING]
Avg deal: [AVG_DEAL]
Win rate: [WIN_RATE]
Top objection: [PRICING_OBJECTION]

Analyze:
1. **Model Assessment** — Aligned with value delivery? Right metric?
2. **Competitive Positioning** — Premium, mid, or value?
3. **Packaging** — Good-Better-Best structure, feature gating
4. **Discounting Framework**: Scenario | Max Discount | What to Get in Return
5. **Price Increase Strategy** for existing customers
6. **Metrics to Track** — Price realization, discount frequency, win rate by price`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. project management", type: "short" },
      { key: "CURRENT_PRICING", label: "Current Pricing", placeholder: "e.g. $29/user Starter, $79/user Pro", type: "long" },
      { key: "TARGET_MARKET", label: "Target Market", placeholder: "e.g. mid-market SaaS", type: "short" },
      { key: "COMPETITOR_PRICING", label: "Competitor Pricing", placeholder: "e.g. Monday: $12-24, Asana: $13-30", type: "long" },
      { key: "AVG_DEAL", label: "Average Deal", placeholder: "e.g. $35K ARR", type: "short" },
      { key: "WIN_RATE", label: "Win Rate", placeholder: "e.g. 28%", type: "short" },
      { key: "PRICING_OBJECTION", label: "Top Pricing Objection", placeholder: "e.g. too expensive vs alternatives", type: "short" },
    ],
  },

  // ── Phase 13: Closing & Contracts ──
  {
    id: "contract-redline",
    title: "Contract Redline Response",
    description: "Generate professional responses to common legal and procurement pushback.",
    category: "Closing & Contracts",
    phase: 13,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Help me respond to legal/procurement redlines.

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Concerns: [CONCERN_AREAS]
Our flexibility: [OUR_FLEXIBILITY]

Respond to these 10 common redlines:
1. Liability Cap
2. Indemnification
3. DPA / Data Residency
4. Termination for Convenience
5. SLA & Uptime Guarantees
6. IP Ownership
7. Auto-Renewal Removal
8. Payment Terms (Net 60/90)
9. Most Favored Nation
10. Audit Rights

For EACH:
- Their Position
- Our Response (protect our position)
- Compromise Position
- Walk-Away Signal

Firm but collaborative. Goal: close the deal, not win an argument.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $150K ARR", type: "short" },
      { key: "CONCERN_AREAS", label: "Main Concerns", placeholder: "e.g. data security, liability, payment terms", type: "long" },
      { key: "OUR_FLEXIBILITY", label: "Where We Can Flex", placeholder: "e.g. flexible on payment terms, won't budge on liability below 2x", type: "long" },
    ],
  },
  {
    id: "executive-sponsor-email",
    title: "Executive Sponsor Email",
    description: "Draft exec-to-exec emails to accelerate late-stage deals.",
    category: "Closing & Contracts",
    phase: 13,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Draft an exec-to-exec email to accelerate this deal.

Our company: [YOUR_COMPANY]
Our exec: [OUR_EXEC_NAME], [OUR_EXEC_TITLE]
Their company: [THEIR_COMPANY]
Their exec: [THEIR_EXEC_NAME], [THEIR_EXEC_TITLE]
Deal status: [DEAL_STATUS]
Why exec involvement: [WHY_EXEC]
Value so far: [VALUE_SO_FAR]

2 versions:
1. **Strategic Partnership** — Industry trends, mutual goals, alignment call
2. **Momentum & Commitment** — Progress so far, clear remaining blockers

Rules:
- Subject: 4-5 words, sounds personal
- Under 100 words
- Written as if OUR exec wrote it personally
- No product pitching

Also: best send time, 48-hour follow-up plan, exec briefing guide.`,
    variables: [
      { key: "YOUR_COMPANY", label: "Your Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "OUR_EXEC_NAME", label: "Our Exec Name", placeholder: "e.g. David Chen", type: "short" },
      { key: "OUR_EXEC_TITLE", label: "Our Exec Title", placeholder: "e.g. CEO, CRO", type: "short" },
      { key: "THEIR_COMPANY", label: "Their Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "THEIR_EXEC_NAME", label: "Their Exec Name", placeholder: "e.g. Sarah Williams", type: "short" },
      { key: "THEIR_EXEC_TITLE", label: "Their Exec Title", placeholder: "e.g. CRO", type: "short" },
      { key: "DEAL_STATUS", label: "Deal Status", placeholder: "e.g. stuck in procurement 3 weeks", type: "long" },
      { key: "WHY_EXEC", label: "Why Exec Involvement", placeholder: "e.g. need CRO to push internally", type: "long" },
      { key: "VALUE_SO_FAR", label: "Value So Far", placeholder: "e.g. successful POC, champion bought in", type: "long" },
    ],
  },
  {
    id: "procurement-guide",
    title: "Procurement Navigation Guide",
    description: "Navigate enterprise procurement processes and get contracts signed faster.",
    category: "Closing & Contracts",
    phase: 13,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a procurement navigation guide for this deal.

Company: [COMPANY_NAME]
Size: [COMPANY_SIZE]
Deal size: [DEAL_SIZE]
Known requirements: [KNOWN_REQUIREMENTS]
Timeline: [TIMELINE]
Procurement contact: [PROCUREMENT_CONTACT]

Build:
1. **Process Map**: Stage | What Happens | Our Role | Timeline | Risk
2. **Pre-Procurement Checklist** — SOC2, DPA, MSA, insurance, references
3. **Acceleration Tactics** — Run security + legal in parallel, pre-fill questionnaires
4. **Common Blockers & Solutions** — "Need 3 bids", "Legal needs 4 weeks", "Board approval"
5. **Communication Templates** — Intro to procurement, status updates, escalation
6. **Timeline Management** — Realistic estimate, weekly check-ins, escalation triggers`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "COMPANY_SIZE", label: "Size", placeholder: "e.g. 5,000 employees", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $250K ARR", type: "short" },
      { key: "KNOWN_REQUIREMENTS", label: "Requirements", placeholder: "e.g. SOC2, DPA, 3-bid requirement", type: "long" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. need to close by end of quarter", type: "short" },
      { key: "PROCUREMENT_CONTACT", label: "Procurement Contact", placeholder: "e.g. Lisa, haven't met yet", type: "short" },
    ],
  },
  {
    id: "deal-closing-tactics",
    title: "Deal Closing Tactics",
    description: "10 proven closing techniques with scripts, timing, and when to use each approach.",
    category: "Closing & Contracts",
    phase: 13,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Give me 10 closing techniques for this specific deal.

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Stage: [STAGE]
Blocker: [BLOCKER]
Champion strength: [CHAMPION_STRENGTH]
Timeline: [TIMELINE]
Product: [YOUR_PRODUCT]

For each technique:
1. **Name** and when to use it
2. **Script** — Exact words
3. **Psychology** — Why it works
4. **Risk** — When NOT to use it
5. **Follow-up** — What to do next

Include:
- The Assumptive Close
- The Puppy Dog Close
- The "1-10" Close
- The Summary Close
- The Ben Franklin Close
- The Scarcity Close (ethical version)
- The Takeaway Close
- The "If I Could, Would You" Close
- The Columbo Close
- The Timeline Close

End with: Which 2-3 techniques are best for THIS specific deal and why.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $100K ARR", type: "short" },
      { key: "STAGE", label: "Stage", placeholder: "e.g. proposal reviewed, awaiting final decision", type: "short" },
      { key: "BLOCKER", label: "Current Blocker", placeholder: "e.g. CFO wants more ROI proof", type: "long" },
      { key: "CHAMPION_STRENGTH", label: "Champion Strength", placeholder: "e.g. strong internal advocate, has exec ear", type: "short" },
      { key: "TIMELINE", label: "Timeline", placeholder: "e.g. Q1 close target", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. data platform", type: "short" },
    ],
  },
  {
    id: "end-of-quarter-push",
    title: "End-of-Quarter Close Push",
    description: "Create urgency and accelerate deals for end-of-quarter push without being sleazy.",
    category: "Closing & Contracts",
    phase: 13,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Help me create ethical urgency for end-of-quarter deal acceleration.

Open deals: [OPEN_DEALS]
Days left in quarter: [DAYS_LEFT]
Quarter target: [TARGET]
Current closed: [CURRENT_CLOSED]
Product: [YOUR_PRODUCT]

Create:
1. **Deal Triage** — Categorize deals: Close this week / This month / Push to next Q / Kill
2. **Urgency Messages** (NOT sleazy) — Based on genuine value, not fake deadlines:
   - "Implementation advantage" angle
   - "Price lock" angle (if real)
   - "Resource availability" angle
   - "Competitive timing" angle

3. **Acceleration Tactics by Blocker**:
   - Stuck in legal → speed up how?
   - Waiting on budget approval → unstick how?
   - Champion went quiet → re-engage how?
   - "We need more time" → compress how?

4. **Executive Escalation Template** — When to pull in your VP
5. **Daily Action Plan** for the last 2 weeks`,
    variables: [
      { key: "OPEN_DEALS", label: "Open Deals", placeholder: "e.g. 5 deals worth $450K combined", type: "long" },
      { key: "DAYS_LEFT", label: "Days Left", placeholder: "e.g. 14 days", type: "short" },
      { key: "TARGET", label: "Quarter Target", placeholder: "e.g. $500K", type: "short" },
      { key: "CURRENT_CLOSED", label: "Current Closed", placeholder: "e.g. $320K", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. analytics platform", type: "short" },
    ],
  },
];
