import type { PromptTemplate } from "../promptTemplates";

export const growPrompts: PromptTemplate[] = [
  // ── Phase 14: Onboarding & Handoff ──
  {
    id: "customer-success-handoff",
    title: "Customer Success Handoff",
    description: "Create a structured AE-to-CSM handoff document with full deal context.",
    category: "Onboarding & Handoff",
    phase: 14,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a comprehensive AE-to-CSM handoff document.

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Closed: [CLOSED_DATE]
Cycle length: [CYCLE_LENGTH]
Champion: [CHAMPION]
Exec sponsor: [EXEC_SPONSOR]
Use case: [USE_CASE]

Build:
1. **Account Overview** — Why they bought (real reason), what they replaced, decision process
2. **Stakeholder Map**: Name | Title | Role | Strength | Concerns
3. **Promises Made** ⚠️ — Specific commitments, timeline, features, ROI targets
4. **Implementation** — Phase 1 (30-day wins), Phase 2 (full rollout), Phase 3 (expansion)
5. **Risk Factors** — Concerns during sales, competitive alternatives, politics
6. **Success Metrics** — What they'll measure, timeline, first QBR expectations
7. **Expansion Opportunities** — Additional teams, upsell products, timing

The single document CS needs to never start from scratch.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $80K ARR", type: "short" },
      { key: "CLOSED_DATE", label: "Closed Date", placeholder: "e.g. March 15, 2025", type: "short" },
      { key: "CYCLE_LENGTH", label: "Cycle Length", placeholder: "e.g. 62 days", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP Ops", type: "short" },
      { key: "EXEC_SPONSOR", label: "Exec Sponsor", placeholder: "e.g. CFO, met twice", type: "short" },
      { key: "USE_CASE", label: "Primary Use Case", placeholder: "e.g. automate pipeline reporting", type: "long" },
    ],
  },
  {
    id: "onboarding-playbook",
    title: "Customer Onboarding Playbook",
    description: "Design a 90-day onboarding program with milestones, training plans, and adoption metrics.",
    category: "Onboarding & Handoff",
    phase: 14,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Design a 90-day customer onboarding playbook.

Product: [YOUR_PRODUCT]
Customer: [CUSTOMER_COMPANY]
Team size: [TEAM_SIZE]
Primary use case: [USE_CASE]
Success metrics: [SUCCESS_METRICS]
Technical complexity: [COMPLEXITY]

Create:
1. **Week 1: Quick Win** — What they can achieve in 5 days
2. **Week 2-4: Foundation** — Core setup, data migration, key integrations
3. **Month 2: Adoption** — Training rollout, power user development
4. **Month 3: Value** — First measurable results, optimization
5. **Milestone Checklist**: Week | Milestone | Owner | Success Criteria
6. **Risk Signals** — Early warning signs of failed onboarding
7. **Escalation Matrix** — When to involve sales, exec, or engineering
8. **First QBR Prep** — What data to collect for 90-day review`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. CRM platform", type: "short" },
      { key: "CUSTOMER_COMPANY", label: "Customer", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "TEAM_SIZE", label: "Team Size", placeholder: "e.g. 30 users", type: "short" },
      { key: "USE_CASE", label: "Primary Use Case", placeholder: "e.g. sales pipeline management", type: "long" },
      { key: "SUCCESS_METRICS", label: "Success Metrics", placeholder: "e.g. 80% adoption in 60 days, pipeline accuracy >90%", type: "long" },
      { key: "COMPLEXITY", label: "Technical Complexity", placeholder: "e.g. 3 integrations, data migration from legacy system", type: "short" },
    ],
  },
  {
    id: "kickoff-meeting-agenda",
    title: "Customer Kickoff Meeting Agenda",
    description: "Structure the first post-sale meeting to set expectations, build excitement, and align on success.",
    category: "Onboarding & Handoff",
    phase: 14,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Build a customer kickoff meeting agenda.

Customer: [CUSTOMER_COMPANY]
Attendees: [ATTENDEES]
Product: [YOUR_PRODUCT]
Duration: [DURATION]
Key goals: [KEY_GOALS]

Create:
1. **Welcome & Introductions** (5 min) — Team intros, roles, communication preferences
2. **Vision Recap** (5 min) — Why they bought, desired outcomes (THEIR words from sales)
3. **Success Metrics Alignment** (10 min) — Agree on measurable goals and timeline
4. **Implementation Walkthrough** (15 min) — Phase-by-phase plan, who does what
5. **Quick Win Identification** (10 min) — What can we show value on in week 1?
6. **Communication & Cadence** (5 min) — Check-in schedule, Slack/email, escalation paths
7. **Q&A & Next Steps** (10 min) — Address concerns, assign first actions

Also: pre-meeting email template, post-meeting summary template, "parking lot" items list.`,
    variables: [
      { key: "CUSTOMER_COMPANY", label: "Customer", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ATTENDEES", label: "Attendees", placeholder: "e.g. CSM, SE, their VP Sales, Ops Manager, IT lead", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales enablement platform", type: "short" },
      { key: "DURATION", label: "Duration", placeholder: "e.g. 60 minutes", type: "short" },
      { key: "KEY_GOALS", label: "Key Goals", placeholder: "e.g. go-live in 4 weeks, migrate from legacy CRM", type: "long" },
    ],
  },
  {
    id: "adoption-email-sequence",
    title: "User Adoption Email Sequence",
    description: "Build a drip sequence that drives product adoption during the first 30 days post-onboarding.",
    category: "Onboarding & Handoff",
    phase: 14,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create a 30-day user adoption email sequence.

Product: [YOUR_PRODUCT]
User persona: [USER_PERSONA]
Key features to adopt: [KEY_FEATURES]
Common friction points: [FRICTION_POINTS]

Build a 10-email sequence:
| Day | Subject | Theme | Content Focus | CTA |

Principles:
- Day 1: Welcome + the ONE thing to do first
- Day 3: First quick win tutorial
- Day 7: "How [peer company] uses this feature"
- Day 14: Advanced feature introduction
- Day 21: Power user tips
- Day 30: Success check-in + feedback request

Each email: under 100 words, one clear action, mobile-friendly.
Also: re-engagement email for users who haven't logged in by day 7.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. project management tool", type: "short" },
      { key: "USER_PERSONA", label: "User Persona", placeholder: "e.g. sales reps, first-line managers", type: "short" },
      { key: "KEY_FEATURES", label: "Key Features to Adopt", placeholder: "e.g. pipeline view, activity logging, reports", type: "long" },
      { key: "FRICTION_POINTS", label: "Common Friction Points", placeholder: "e.g. Salesforce sync confusion, too many features at once", type: "long" },
    ],
  },

  // ── Phase 15: Account Management ──
  {
    id: "qbr-prep",
    title: "QBR Prep & Presentation",
    description: "Generate a Quarterly Business Review with usage analysis and expansion opportunities.",
    category: "Account Management",
    phase: 15,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a comprehensive QBR preparation package.

Company: [COMPANY_NAME]
Account size: [ACCOUNT_SIZE]
Customer since: [CUSTOMER_SINCE]
Primary contact: [PRIMARY_CONTACT]
Exec sponsor: [EXEC_SPONSOR]
Use cases: [USE_CASES]
Usage data: [USAGE_DATA]
Issues: [ISSUES]
Renewal: [RENEWAL_DATE]

Build:
1. **Executive Summary** — Health score (G/Y/R), top 3 wins, one concern
2. **Value Delivered** — ROI analysis, before vs. after, vs. business case projections
3. **Adoption Analysis** — Usage vs. benchmarks, feature utilization, power users
4. **Roadmap Preview** — 2-3 relevant upcoming features
5. **Strategic Recommendations** — Expansion opps, risks to address, next quarter goals
6. **Discussion Questions** — 5 questions for strategic conversation

Strategic partnership review, not vendor check-in.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ACCOUNT_SIZE", label: "Account Size", placeholder: "e.g. $120K ARR, 50 seats", type: "short" },
      { key: "CUSTOMER_SINCE", label: "Customer Since", placeholder: "e.g. January 2024", type: "short" },
      { key: "PRIMARY_CONTACT", label: "Primary Contact", placeholder: "e.g. Sarah, Director Ops", type: "short" },
      { key: "EXEC_SPONSOR", label: "Exec Sponsor", placeholder: "e.g. VP Sales, Mike", type: "short" },
      { key: "USE_CASES", label: "Use Cases", placeholder: "e.g. pipeline, forecasting, coaching", type: "long" },
      { key: "USAGE_DATA", label: "Usage Data", placeholder: "e.g. 85% DAU, 120 reports/month", type: "long" },
      { key: "ISSUES", label: "Issues This Quarter", placeholder: "e.g. one outage, feature request delayed", type: "long" },
      { key: "RENEWAL_DATE", label: "Renewal Date", placeholder: "e.g. December 2025", type: "short" },
    ],
  },
  {
    id: "case-study-interview",
    title: "Case Study Interview Script",
    description: "Generate interview questions to extract a compelling customer story.",
    category: "Account Management",
    phase: 15,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Generate a customer case study interview script.

Customer: [CUSTOMER_COMPANY]
Contact: [CONTACT_NAME], [CONTACT_ROLE]
Product: [YOUR_PRODUCT]
Tenure: [TENURE]
Results: [KEY_RESULTS]
Use case: [USE_CASE]

Create:
1. **Pre-Interview Prep** — Research checklist, scheduling email, recording permission
2. **Interview Questions** (30-min format):
   - Opening/Warm-Up (3 min)
   - Before State (7 min) — process, frustrations, quantified impact
   - Decision Process (5 min) — what they evaluated, why they chose you
   - Implementation (5 min) — experience, surprises
   - Results (7 min) — specific numbers, team impact
   - Quotable Moments (3 min) — describe to a peer, tell someone on the fence
3. **Case Study Outline** — Challenge → Solution → Results → What's Next
4. **Follow-Up** — Thank-you email, draft review, publication timeline`,
    variables: [
      { key: "CUSTOMER_COMPANY", label: "Customer", placeholder: "e.g. Notion", type: "short" },
      { key: "CONTACT_NAME", label: "Contact", placeholder: "e.g. Sarah Chen", type: "short" },
      { key: "CONTACT_ROLE", label: "Role", placeholder: "e.g. Head of Sales Ops", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence", type: "short" },
      { key: "TENURE", label: "Tenure", placeholder: "e.g. 14 months", type: "short" },
      { key: "KEY_RESULTS", label: "Key Results", placeholder: "e.g. 35% forecast improvement, 10 hrs/week saved", type: "long" },
      { key: "USE_CASE", label: "Use Case", placeholder: "e.g. pipeline management for 40-person sales team", type: "long" },
    ],
  },
  {
    id: "executive-alignment",
    title: "Executive Relationship Builder",
    description: "Build an executive relationship plan to strengthen strategic alignment and protect the account.",
    category: "Account Management",
    phase: 15,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build an executive relationship plan for [COMPANY_NAME].

Account: [COMPANY_NAME], [ACCOUNT_SIZE]
Current exec engagement: [CURRENT_ENGAGEMENT]
Their executives: [THEIR_EXECS]
Our executives: [OUR_EXECS]
Strategic goals: [STRATEGIC_GOALS]

Create:
1. **Exec Alignment Map**: Their Exec | Our Exec | Relationship Status | Next Action
2. **Quarterly Touch Plan** — Cadence, topics, formats (dinner, advisory board, QBR)
3. **Value Story for Each Exec** — What they care about, how to speak their language
4. **Risk Mitigation** — If champion leaves, if priorities shift
5. **Executive Briefing Template** — For our execs before any customer exec meeting
6. **Expansion Hooks** — How to use exec relationships to open new doors`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ACCOUNT_SIZE", label: "Account Size", placeholder: "e.g. $200K ARR", type: "short" },
      { key: "CURRENT_ENGAGEMENT", label: "Current Exec Engagement", placeholder: "e.g. VP Sales met our CEO once, no regular cadence", type: "long" },
      { key: "THEIR_EXECS", label: "Their Executives", placeholder: "e.g. CRO (Sarah), VP Ops (Mike), CFO (unknown)", type: "long" },
      { key: "OUR_EXECS", label: "Our Executives", placeholder: "e.g. CEO, VP CS, CRO", type: "short" },
      { key: "STRATEGIC_GOALS", label: "Strategic Goals", placeholder: "e.g. expand to 3 more departments, become strategic vendor", type: "long" },
    ],
  },

  // ── Phase 16: Renewal & Retention ──
  {
    id: "churn-risk",
    title: "Churn Risk Assessment & Save Plan",
    description: "Analyze at-risk accounts and create a structured save plan.",
    category: "Renewal & Retention",
    phase: 16,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Analyze this at-risk account and create a save plan.

Company: [COMPANY_NAME]
Account: [ACCOUNT_SIZE]
Customer since: [CUSTOMER_SINCE]
Renewal: [RENEWAL_DATE]
Contact: [PRIMARY_CONTACT]
Exec sponsor: [EXEC_SPONSOR]
Risk signals: [RISK_SIGNALS]
Usage trends: [USAGE_TRENDS]
Recent interactions: [RECENT_INTERACTIONS]

Produce:
1. **Risk Assessment** — Churn probability (%), root cause analysis, severity timeline
2. **Save/Don't-Save Decision** — Is this account worth saving? (honest assessment)
3. **90-Day Save Plan** — Month 1: quick wins, Month 2: relationship rebuild, Month 3: renewal positioning
4. **Talk Tracks** — "Usage declined...", "Evaluating alternatives...", "What would need to change?", "Here's what we've improved..."
5. **Escalation Criteria** — When to involve execs, when to offer concessions, when to let go`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "ACCOUNT_SIZE", label: "Account Size", placeholder: "e.g. $80K ARR", type: "short" },
      { key: "CUSTOMER_SINCE", label: "Customer Since", placeholder: "e.g. March 2023", type: "short" },
      { key: "RENEWAL_DATE", label: "Renewal Date", placeholder: "e.g. June 2025", type: "short" },
      { key: "PRIMARY_CONTACT", label: "Contact", placeholder: "e.g. Jordan, Sales Ops Manager", type: "short" },
      { key: "EXEC_SPONSOR", label: "Exec Sponsor", placeholder: "e.g. VP Sales (disengaged)", type: "short" },
      { key: "RISK_SIGNALS", label: "Risk Signals", placeholder: "e.g. usage dropped 40%, champion left, missed check-ins", type: "long" },
      { key: "USAGE_TRENDS", label: "Usage Trends", placeholder: "e.g. DAU from 35 to 18, reports down 60%", type: "long" },
      { key: "RECENT_INTERACTIONS", label: "Recent Interactions", placeholder: "e.g. tense QBR, concerns about missing features", type: "long" },
    ],
  },
  {
    id: "renewal-playbook",
    title: "Renewal Conversation Playbook",
    description: "Build talk tracks and strategies for renewal conversations at different health levels.",
    category: "Renewal & Retention",
    phase: 16,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a renewal conversation playbook.

Product: [YOUR_PRODUCT]
Average contract value: [AVG_CONTRACT]
Typical renewal timeline: [RENEWAL_TIMELINE]
Common renewal objections: [RENEWAL_OBJECTIONS]
Price increase planned: [PRICE_INCREASE]

Create playbooks for 3 scenarios:

**1. Green Account (Happy, High Usage)**
- How to secure early renewal (60+ days out)
- Upsell/expansion conversation starters
- Multi-year incentive positioning
- Talk track for price increase

**2. Yellow Account (Some Concerns)**
- Value re-establishment tactics
- Addressing specific concerns before renewal
- Success story sharing strategy
- Talk track for "we're considering alternatives"

**3. Red Account (At Risk)**
- Emergency save sequence
- Executive escalation protocol
- Concession framework (what to offer, what to get back)
- Talk track for "we're not renewing"

For each: email templates, call scripts, and timeline.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales analytics platform", type: "short" },
      { key: "AVG_CONTRACT", label: "Average Contract Value", placeholder: "e.g. $60K ARR", type: "short" },
      { key: "RENEWAL_TIMELINE", label: "Renewal Timeline", placeholder: "e.g. start 90 days before expiry", type: "short" },
      { key: "RENEWAL_OBJECTIONS", label: "Common Objections", placeholder: "e.g. 'too expensive', 'not enough ROI', 'switching to competitor'", type: "long" },
      { key: "PRICE_INCREASE", label: "Price Increase", placeholder: "e.g. 5-10% annual increase planned", type: "short" },
    ],
  },
  {
    id: "health-score-model",
    title: "Customer Health Score Model",
    description: "Design a customer health scoring system to predict churn and prioritize CS resources.",
    category: "Renewal & Retention",
    phase: 16,
    optimizedFor: ["Claude", "ChatGPT", "Cursor"],
    prompt: `Design a customer health scoring model.

Product: [YOUR_PRODUCT]
Customer count: [CUSTOMER_COUNT]
Available data: [AVAILABLE_DATA]
Current churn rate: [CHURN_RATE]

Create:
1. **Health Score Components** (weighted to 100):
   - Product usage (30%) — DAU, feature adoption, depth
   - Support health (20%) — Ticket volume, sentiment, response
   - Relationship (20%) — Exec engagement, multi-threading, NPS
   - Business outcomes (20%) — ROI achieved, success metrics
   - Commercial (10%) — Payment history, contract terms, expansion

2. **Scoring Rubric**: Factor | Weight | Green (8-10) | Yellow (5-7) | Red (1-4)
3. **Threshold Actions**: Score Range | Alert | Action | Owner
4. **Dashboard Design** — What to show, how to sort, drill-down views
5. **Review Cadence** — How often to review, calibration meetings
6. **Predictive Signals** — Leading indicators of churn (6-12 months early)`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. SaaS analytics platform", type: "short" },
      { key: "CUSTOMER_COUNT", label: "Customer Count", placeholder: "e.g. 200 customers", type: "short" },
      { key: "AVAILABLE_DATA", label: "Available Data", placeholder: "e.g. product analytics, support tickets, NPS surveys, CRM data", type: "long" },
      { key: "CHURN_RATE", label: "Current Churn Rate", placeholder: "e.g. 8% annual logo churn", type: "short" },
    ],
  },

  // ── Phase 17: Upsell & Cross-Sell ──
  {
    id: "expansion-upsell",
    title: "Expansion / Upsell Pitch",
    description: "Craft an upsell or cross-sell pitch based on current usage and stakeholder mapping.",
    category: "Upsell & Cross-Sell",
    phase: 17,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build an expansion strategy for an existing customer.

Company: [COMPANY_NAME]
Current plan: [CURRENT_PLAN]
Current ARR: [CURRENT_ARR]
Target ARR: [TARGET_ARR]
Usage: [USAGE_PATTERNS]
Current teams: [CURRENT_TEAMS]
Potential teams: [POTENTIAL_TEAMS]
Champion: [CHAMPION]
Opportunity: [EXPANSION_OPP]

Create:
1. **Opportunity Analysis** — Best expansion path, evidence, timing signals
2. **Value Story per Stakeholder** — Champion, new dept head, economic buyer
3. **Outreach Sequence** — Email to champion, internal deck, new dept email, budget justification
4. **Pricing Strategy** — Bundling, anchor price, pilot option
5. **Objection Playbook** — "Happy as-is", "Budget tight", "Different needs", "Need more ROI"

Use their usage data as evidence.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CURRENT_PLAN", label: "Current Plan", placeholder: "e.g. Pro, 30 seats", type: "short" },
      { key: "CURRENT_ARR", label: "Current ARR", placeholder: "e.g. $45K", type: "short" },
      { key: "TARGET_ARR", label: "Target ARR", placeholder: "e.g. $90K", type: "short" },
      { key: "USAGE_PATTERNS", label: "Usage", placeholder: "e.g. maxing API limits, 95% utilization", type: "long" },
      { key: "CURRENT_TEAMS", label: "Current Teams", placeholder: "e.g. Sales (30 reps)", type: "short" },
      { key: "POTENTIAL_TEAMS", label: "Potential Teams", placeholder: "e.g. Marketing (20), CS (15)", type: "short" },
      { key: "CHAMPION", label: "Champion", placeholder: "e.g. Sarah, VP Sales", type: "short" },
      { key: "EXPANSION_OPP", label: "Expansion Opportunity", placeholder: "e.g. add marketing team, upgrade to enterprise tier", type: "long" },
    ],
  },
  {
    id: "cross-sell-trigger-map",
    title: "Cross-Sell Trigger Map",
    description: "Identify signals that indicate a customer is ready for additional products or features.",
    category: "Upsell & Cross-Sell",
    phase: 17,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a cross-sell trigger map for my product portfolio.

Products: [PRODUCTS]
Customer base: [CUSTOMER_BASE]
Average starting product: [STARTING_PRODUCT]
Cross-sell targets: [CROSS_SELL_TARGETS]

Create:
1. **Trigger Signal Map**: Signal | Indicates Need For | Urgency | Action
   - Usage signals (feature adoption, volume, requests)
   - Business signals (growth, new hires, org changes)
   - Conversation signals (things they mention in calls/emails)
   - Support signals (questions about capabilities they don't have)

2. **Cross-Sell Sequence** for each product combination
3. **ROI Story** — How Product A + Product B is better together
4. **Bundle Pricing** — Incentives for multi-product adoption
5. **Champion Activation** — How to get existing champion to advocate for new product
6. **Pilot Program** — Low-risk way to trial the additional product`,
    variables: [
      { key: "PRODUCTS", label: "Your Products", placeholder: "e.g. CRM, Marketing Automation, Analytics, Support", type: "long" },
      { key: "CUSTOMER_BASE", label: "Customer Base", placeholder: "e.g. 500 customers, mostly on CRM", type: "short" },
      { key: "STARTING_PRODUCT", label: "Starting Product", placeholder: "e.g. most start with CRM ($30K)", type: "short" },
      { key: "CROSS_SELL_TARGETS", label: "Cross-Sell Targets", placeholder: "e.g. CRM → Analytics is highest-value path", type: "long" },
    ],
  },

  // ── Phase 18: Sales Leadership ──
  {
    id: "sales-hiring-scorecard",
    title: "Sales Hiring Scorecard",
    description: "Create a structured interview scorecard for hiring AEs, SDRs, or Sales Engineers.",
    category: "Sales Leadership",
    phase: 18,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a hiring scorecard for a [ROLE_TITLE] position.

Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Motion: [SALES_MOTION]
Deal size: [DEAL_SIZE]
Team: [TEAM_SIZE]

Build:
1. **Role Profile** — Must-have vs. nice-to-have, red flags, ideal candidate
2. **Interview Scorecard** (1-5 per category):
   Category | Weight | What to Evaluate | Sample Questions
   (discovery, objection handling, closing, pipeline mgmt, technical aptitude, coachability)
3. **Role-Play Scenarios** (3) — Cold call, discovery, objection handling + scoring
4. **Behavioral Questions** (10) — Past performance, problem-solving, resilience
5. **Reference Check Script** — 5 back-channel questions
6. **Compensation** — OTE range, base/variable split, ramp expectations`,
    variables: [
      { key: "ROLE_TITLE", label: "Role Title", placeholder: "e.g. Account Executive, SDR", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Product", placeholder: "e.g. AI-powered CRM", type: "short" },
      { key: "SALES_MOTION", label: "Sales Motion", placeholder: "e.g. enterprise outbound, PLG", type: "short" },
      { key: "DEAL_SIZE", label: "Deal Size", placeholder: "e.g. $50K ARR", type: "short" },
      { key: "TEAM_SIZE", label: "Team Size", placeholder: "e.g. 8 AEs, 4 SDRs", type: "short" },
    ],
  },
  {
    id: "pipeline-review-framework",
    title: "Pipeline Review Framework",
    description: "Structured framework for running effective pipeline review meetings.",
    category: "Sales Leadership",
    phase: 18,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Create a pipeline review framework for my team.

Team: [TEAM_SIZE]
Cycle: [DEAL_CYCLE]
Quota: [QUOTA]
Coverage: [COVERAGE]
CRM: [CRM]

Build:
1. **Pre-Review Prep** — What reps must prepare (snapshot, commits, stuck deals, new pipeline)
2. **Review Structure** (45 min):
   Time | Section | Focus
3. **Questions Framework** per deal — "What changed?", "Next step?", "Met buyer?", "Compelling event?", "Bet your own money?"
4. **Red Flag Checklist** — Single-threaded, no next step, no buyer access, no timeline, etc.
5. **Coaching Moments** — When to coach vs. direct, questions that make reps think
6. **Post-Review Actions** — Escalate, kill, get exec involved, pipeline targets`,
    variables: [
      { key: "TEAM_SIZE", label: "Team Size", placeholder: "e.g. 8 AEs", type: "short" },
      { key: "DEAL_CYCLE", label: "Deal Cycle", placeholder: "e.g. 45 days", type: "short" },
      { key: "QUOTA", label: "Quota/Rep", placeholder: "e.g. $500K/quarter", type: "short" },
      { key: "COVERAGE", label: "Pipeline Coverage", placeholder: "e.g. 2.8x", type: "short" },
      { key: "CRM", label: "CRM", placeholder: "e.g. Salesforce, HubSpot", type: "short" },
    ],
  },
  {
    id: "rep-coaching-plan",
    title: "Rep Coaching Plan",
    description: "Build a personalized coaching plan for an underperforming or developing sales rep.",
    category: "Sales Leadership",
    phase: 18,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Build a coaching plan for a sales rep.

Rep: [REP_NAME]
Role: [REP_ROLE]
Tenure: [TENURE]
Performance: [PERFORMANCE_DATA]
Strengths: [STRENGTHS]
Weaknesses: [WEAKNESSES]
Goal: [COACHING_GOAL]

Create:
1. **Diagnostic Assessment** — Root cause of underperformance (skills, will, or environment?)
2. **30-60-90 Day Plan**: Week | Focus Area | Activity | Success Metric
3. **Skill Development** — Specific exercises for each weakness:
   - If prospecting: activity blitzes, script practice
   - If discovery: ride-alongs, question frameworks
   - If closing: negotiation simulations, deal reviews
4. **Weekly 1:1 Structure** — What to review, questions to ask, accountability format
5. **Progress Milestones** — Clear checkpoints with objective criteria
6. **Escalation Plan** — What happens if no improvement by day 60, 90`,
    variables: [
      { key: "REP_NAME", label: "Rep Name", placeholder: "e.g. Alex", type: "short" },
      { key: "REP_ROLE", label: "Role", placeholder: "e.g. AE, SDR", type: "short" },
      { key: "TENURE", label: "Tenure", placeholder: "e.g. 6 months", type: "short" },
      { key: "PERFORMANCE_DATA", label: "Performance", placeholder: "e.g. 60% of quota, low close rate, strong pipeline gen", type: "long" },
      { key: "STRENGTHS", label: "Strengths", placeholder: "e.g. great prospecting, high activity", type: "long" },
      { key: "WEAKNESSES", label: "Weaknesses", placeholder: "e.g. loses deals in negotiation, poor discovery", type: "long" },
      { key: "COACHING_GOAL", label: "Goal", placeholder: "e.g. hit 90% of quota within 60 days", type: "short" },
    ],
  },
  {
    id: "sales-team-onboarding",
    title: "New Rep Onboarding Program",
    description: "Design a 30-60-90 day onboarding program for new sales hires.",
    category: "Sales Leadership",
    phase: 18,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Design a sales rep onboarding program.

Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Role: [ROLE]
Sales motion: [SALES_MOTION]
Ramp target: [RAMP_TARGET]
Current ramp time: [CURRENT_RAMP]

Create:
1. **Week 1: Foundations** — Product, ICP, competitors, tools, shadowing
2. **Week 2-4: Skill Building** — Pitch practice, call shadowing, first outreach
3. **Month 2: Ramping** — Own pipeline, coached deals, increasing quota
4. **Month 3: Independent** — Full quota, self-directed with check-ins

For each week: Learning Objectives | Activities | Deliverables | Assessment

Also:
- **Certification Checkpoints** — What they must demonstrate before progressing
- **Buddy System** — How to pair with a top performer
- **Content Library** — What to create (playbook, battle cards, call recordings)
- **Manager Checklist** — What the manager should do each week`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Product", placeholder: "e.g. data analytics platform", type: "short" },
      { key: "ROLE", label: "Role", placeholder: "e.g. AE, SDR, SE", type: "short" },
      { key: "SALES_MOTION", label: "Sales Motion", placeholder: "e.g. outbound enterprise, inbound SMB", type: "short" },
      { key: "RAMP_TARGET", label: "Ramp Target", placeholder: "e.g. full quota by month 4", type: "short" },
      { key: "CURRENT_RAMP", label: "Current Ramp Time", placeholder: "e.g. 6 months average", type: "short" },
    ],
  },

  // ── Phase 19: RevOps & Forecasting ──
  {
    id: "forecast-model",
    title: "Revenue Forecast Model",
    description: "Build a bottoms-up forecast model with commit/upside/best-case categories and accuracy tracking.",
    category: "RevOps & Forecasting",
    phase: 19,
    optimizedFor: ["Claude", "ChatGPT", "Cursor"],
    prompt: `Build a revenue forecast model for my sales org.

Org: [ORG_SIZE]
Quarterly target: [QUARTERLY_TARGET]
Current pipeline: [CURRENT_PIPELINE]
Historical win rates by stage: [WIN_RATES]
Average deal cycle: [DEAL_CYCLE]
CRM: [CRM]

Create:
1. **Forecast Categories**: Commit | Most Likely | Upside | Pipeline
2. **Bottoms-Up Model**: Rep → Team → Org aggregation
3. **Weighted Pipeline Calculation**: Stage × Historical Win Rate
4. **Accuracy Tracking**: Forecast vs. Actual by category (template)
5. **Red Flags** — When to downgrade a deal's forecast category
6. **Weekly Forecast Cadence**: Who reports what, when, to whom
7. **Board-Ready Summary**: How to present to leadership
8. **AI Enhancement** — How to use AI to improve forecast accuracy`,
    variables: [
      { key: "ORG_SIZE", label: "Org Size", placeholder: "e.g. 4 teams, 20 AEs total", type: "short" },
      { key: "QUARTERLY_TARGET", label: "Quarterly Target", placeholder: "e.g. $3M", type: "short" },
      { key: "CURRENT_PIPELINE", label: "Current Pipeline", placeholder: "e.g. $9M total, 3x coverage", type: "short" },
      { key: "WIN_RATES", label: "Win Rates by Stage", placeholder: "e.g. Disco: 20%, Demo: 35%, Proposal: 50%, Nego: 75%", type: "long" },
      { key: "DEAL_CYCLE", label: "Average Deal Cycle", placeholder: "e.g. 45 days", type: "short" },
      { key: "CRM", label: "CRM", placeholder: "e.g. Salesforce", type: "short" },
    ],
  },
  {
    id: "sales-dashboard-design",
    title: "Sales Dashboard Design",
    description: "Design KPI dashboards for reps, managers, and executives with the right metrics at each level.",
    category: "RevOps & Forecasting",
    phase: 19,
    optimizedFor: ["Claude", "ChatGPT", "Cursor"],
    prompt: `Design sales dashboards for 3 audience levels.

Org: [ORG_SIZE]
Product: [YOUR_PRODUCT]
Sales motion: [SALES_MOTION]
CRM: [CRM]
Current reporting: [CURRENT_REPORTING]

Design dashboards for:

**1. Rep Dashboard** — What each rep sees daily:
- Pipeline health, activity metrics, deal aging, forecast vs. target
- Key KPIs with benchmarks

**2. Manager Dashboard** — What frontline managers review weekly:
- Team performance, pipeline by rep, conversion rates, coaching priorities
- Forecast roll-up, deal risk alerts

**3. Executive Dashboard** — What leadership sees monthly:
- Revenue vs. plan, pipeline generation, forecast accuracy
- Win rates, deal velocity, rep productivity

For each: layout mockup (text), KPIs with formulas, refresh cadence, drill-down paths.`,
    variables: [
      { key: "ORG_SIZE", label: "Org Size", placeholder: "e.g. 20 reps, 4 managers, VP + CRO", type: "short" },
      { key: "YOUR_PRODUCT", label: "Product", placeholder: "e.g. CRM analytics", type: "short" },
      { key: "SALES_MOTION", label: "Sales Motion", placeholder: "e.g. enterprise outbound", type: "short" },
      { key: "CRM", label: "CRM", placeholder: "e.g. Salesforce", type: "short" },
      { key: "CURRENT_REPORTING", label: "Current Reporting", placeholder: "e.g. manual spreadsheets, basic Salesforce reports", type: "short" },
    ],
  },
  {
    id: "sales-process-audit",
    title: "Sales Process Audit",
    description: "Audit your current sales process and identify bottlenecks, gaps, and optimization opportunities.",
    category: "RevOps & Forecasting",
    phase: 19,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Audit my sales process and identify optimization opportunities.

Current process:
- Stages: [SALES_STAGES]
- Average cycle: [DEAL_CYCLE]
- Win rate: [WIN_RATE]
- Biggest bottleneck: [BOTTLENECK]
- Tools: [TOOLS]
- Team: [TEAM_SIZE]

Analyze:
1. **Stage-by-Stage Conversion** — Where are deals dropping off?
2. **Process Gaps** — Missing steps, undefined exit criteria, handoff issues
3. **Velocity Analysis** — Where deals slow down and why
4. **Automation Opportunities** — What can be automated to save time
5. **Best Practice Comparison** — How your process compares to top-performing orgs
6. **Recommended Changes** — Prioritized by impact (quick wins first)
7. **Implementation Plan** — How to roll out changes without disrupting current pipeline
8. **Measurement Framework** — How to track if changes are working`,
    variables: [
      { key: "SALES_STAGES", label: "Sales Stages", placeholder: "e.g. Lead → Qualified → Demo → Proposal → Negotiation → Closed", type: "long" },
      { key: "DEAL_CYCLE", label: "Average Cycle", placeholder: "e.g. 52 days", type: "short" },
      { key: "WIN_RATE", label: "Win Rate", placeholder: "e.g. 22% from qualified opp", type: "short" },
      { key: "BOTTLENECK", label: "Biggest Bottleneck", placeholder: "e.g. deals stall between demo and proposal", type: "long" },
      { key: "TOOLS", label: "Sales Tools", placeholder: "e.g. Salesforce, Outreach, Gong, Slack", type: "short" },
      { key: "TEAM_SIZE", label: "Team Size", placeholder: "e.g. 5 SDRs, 10 AEs, 3 SEs", type: "short" },
    ],
  },
  {
    id: "comp-plan-designer",
    title: "Sales Comp Plan Designer",
    description: "Design a sales compensation plan with quotas, accelerators, and SPIFs aligned to company goals.",
    category: "RevOps & Forecasting",
    phase: 19,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Design a sales compensation plan.

Company: [COMPANY_NAME]
Product: [YOUR_PRODUCT]
Annual revenue target: [REVENUE_TARGET]
Team structure: [TEAM_STRUCTURE]
Average deal size: [AVG_DEAL]
Current comp structure: [CURRENT_COMP]
Key behaviors to incentivize: [KEY_BEHAVIORS]

Design:
1. **Quota Setting** — How to set fair, achievable quotas (top-down meets bottom-up)
2. **Pay Mix** — Base/variable split by role, OTE ranges
3. **Commission Structure** — Rate, accelerators above quota, decelerators below
4. **SPIFs** — Quarterly bonus programs for strategic priorities
5. **Multi-Product Incentives** — How to incentivize cross-sell without cannibalizing
6. **Clawback & Grace Periods** — Policies for churned deals
7. **Ramp Period** — Reduced quota + guaranteed draw during ramp
8. **Modeling** — Expected total comp at 80%, 100%, 120%, 150% attainment`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "YOUR_PRODUCT", label: "Product", placeholder: "e.g. SaaS analytics", type: "short" },
      { key: "REVENUE_TARGET", label: "Revenue Target", placeholder: "e.g. $12M ARR this year", type: "short" },
      { key: "TEAM_STRUCTURE", label: "Team Structure", placeholder: "e.g. 10 AEs, 5 SDRs, 3 SEs, 2 CS managers", type: "long" },
      { key: "AVG_DEAL", label: "Average Deal", placeholder: "e.g. $50K ARR", type: "short" },
      { key: "CURRENT_COMP", label: "Current Comp", placeholder: "e.g. $80K base + $80K variable for AEs", type: "short" },
      { key: "KEY_BEHAVIORS", label: "Key Behaviors to Incentivize", placeholder: "e.g. multi-year deals, new logos, expansion revenue", type: "long" },
    ],
  },

  // ── Phase 20: Personal Branding ──
  {
    id: "personal-brand-strategy",
    title: "Personal Brand Strategy",
    description: "Build a personal brand as a sales professional that generates inbound opportunities.",
    category: "Personal Branding",
    phase: 20,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Build a personal branding strategy for a sales professional.

Name: [YOUR_NAME]
Role: [YOUR_ROLE]
Company: [YOUR_COMPANY]
Target audience: [TARGET_AUDIENCE]
Expertise: [EXPERTISE]
Goal: [BRANDING_GOAL]
Current presence: [CURRENT_PRESENCE]

Create:
1. **Brand Positioning** — Your unique angle in 1 sentence
2. **Content Pillars** — 4 topics you'll own
3. **Platform Strategy** — Where to focus (LinkedIn, Twitter, podcast, newsletter)
4. **Content Calendar** — 30-day plan with post types and topics
5. **Networking Strategy** — How to build relationships with industry leaders
6. **Speaking Opportunities** — How to get on podcasts, panels, and stages
7. **Measurement** — How to track if your brand is generating pipeline
8. **90-Day Milestones** — Monthly goals for growth and engagement`,
    variables: [
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "YOUR_ROLE", label: "Your Role", placeholder: "e.g. Enterprise AE", type: "short" },
      { key: "YOUR_COMPANY", label: "Company", placeholder: "e.g. Gong", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. sales leaders at B2B SaaS companies", type: "short" },
      { key: "EXPERTISE", label: "Your Expertise", placeholder: "e.g. MEDDIC, enterprise selling, sales coaching", type: "long" },
      { key: "BRANDING_GOAL", label: "Goal", placeholder: "e.g. become known as the go-to expert for enterprise sales", type: "long" },
      { key: "CURRENT_PRESENCE", label: "Current Presence", placeholder: "e.g. 2K LinkedIn followers, occasional posts, no other platforms", type: "short" },
    ],
  },
  {
    id: "podcast-guest-pitch",
    title: "Podcast Guest Pitch",
    description: "Write pitches to get on industry podcasts and build authority in your sales niche.",
    category: "Personal Branding",
    phase: 20,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write podcast guest pitches to build my authority.

Name: [YOUR_NAME]
Role: [YOUR_ROLE]
Expertise: [EXPERTISE]
Target podcasts: [TARGET_PODCASTS]
Unique stories: [UNIQUE_STORIES]
Results: [KEY_RESULTS]

Create:
1. **3 Pitch Emails** — Each with a different angle:
   - The "Contrarian Take" pitch
   - The "War Story" pitch
   - The "Data-Driven Insight" pitch

2. **5 Episode Topic Ideas** — Each with hook, outline, and audience takeaway
3. **Media Kit** — One-page bio, speaking topics, headshot guidelines
4. **Preparation Guide** — How to prepare for podcast appearances
5. **Promotion Plan** — How to maximize impact after the episode airs
6. **Follow-Up** — How to build ongoing relationship with hosts`,
    variables: [
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Sarah Johnson", type: "short" },
      { key: "YOUR_ROLE", label: "Your Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "EXPERTISE", label: "Expertise", placeholder: "e.g. scaling outbound from 0 to $10M pipeline", type: "long" },
      { key: "TARGET_PODCASTS", label: "Target Podcasts", placeholder: "e.g. Revenue Builders, 30 Minutes to President's Club, Sell or Die", type: "long" },
      { key: "UNIQUE_STORIES", label: "Unique Stories", placeholder: "e.g. built SDR team from 0 to 20, pivoted from engineer to sales", type: "long" },
      { key: "KEY_RESULTS", label: "Key Results", placeholder: "e.g. grew pipeline 5x in 12 months, 145% quota attainment", type: "long" },
    ],
  },
  {
    id: "newsletter-launch",
    title: "Sales Newsletter Launch Plan",
    description: "Design and launch a niche newsletter that positions you as a thought leader and generates leads.",
    category: "Personal Branding",
    phase: 20,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Help me launch a niche sales newsletter.

Niche: [NICHE]
Target reader: [TARGET_READER]
Frequency: [FREQUENCY]
Goal: [NEWSLETTER_GOAL]
Your expertise: [EXPERTISE]

Create:
1. **Newsletter Concept** — Name options (5), tagline, positioning
2. **Content Framework** — Recurring sections (e.g. Tip of the Week, Tool Review, Deal Breakdown)
3. **First 8 Issue Outlines** — Topic, sections, estimated read time
4. **Growth Strategy** — How to get first 500 subscribers (LinkedIn, cross-promotion, CTAs)
5. **Monetization Path** — Sponsorships, premium tier, lead gen for your deals
6. **Tech Stack** — Best tools (Substack, Beehiiv, ConvertKit)
7. **Issue #1 Draft** — Complete first issue ready to send
8. **Launch Sequence** — 2-week launch plan with daily actions`,
    variables: [
      { key: "NICHE", label: "Newsletter Niche", placeholder: "e.g. enterprise sales tactics, SDR productivity, sales + AI", type: "short" },
      { key: "TARGET_READER", label: "Target Reader", placeholder: "e.g. B2B sales reps and managers", type: "short" },
      { key: "FREQUENCY", label: "Frequency", placeholder: "e.g. weekly, bi-weekly", type: "short" },
      { key: "NEWSLETTER_GOAL", label: "Goal", placeholder: "e.g. 1000 subscribers in 90 days, position as expert", type: "short" },
      { key: "EXPERTISE", label: "Your Expertise", placeholder: "e.g. 8 years in enterprise sales, MEDDIC certified", type: "long" },
    ],
  },
  {
    id: "speaking-abstract",
    title: "Conference Speaking Abstract",
    description: "Write conference speaking proposals that get accepted for sales and revenue conferences.",
    category: "Personal Branding",
    phase: 20,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write conference speaking proposals for sales/revenue conferences.

Name: [YOUR_NAME]
Role: [YOUR_ROLE]
Topic area: [TOPIC_AREA]
Target conferences: [CONFERENCES]
Unique angle: [UNIQUE_ANGLE]
Audience: [AUDIENCE]

Create:
1. **3 Session Proposals** — Each with different format:
   - Keynote-style talk (20 min)
   - Workshop (45 min)
   - Panel discussion (moderator angle)

For each:
- Title (attention-grabbing, not generic)
- Abstract (200 words)
- 3 key takeaways for attendees
- Why YOU're the right speaker (credibility statement)
- Audience level (beginner/intermediate/advanced)

2. **Speaker Bio** — 50-word and 150-word versions
3. **Slide Outline** — 10-slide framework for the keynote
4. **Application Tips** — What conference organizers look for`,
    variables: [
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "YOUR_ROLE", label: "Your Role", placeholder: "e.g. Director of Sales", type: "short" },
      { key: "TOPIC_AREA", label: "Topic Area", placeholder: "e.g. AI in sales, outbound strategies, sales leadership", type: "short" },
      { key: "CONFERENCES", label: "Target Conferences", placeholder: "e.g. SaaStr, Pavilion CRO Summit, Dreamforce", type: "long" },
      { key: "UNIQUE_ANGLE", label: "Unique Angle", placeholder: "e.g. built a $50M pipeline using AI-powered outbound", type: "long" },
      { key: "AUDIENCE", label: "Target Audience", placeholder: "e.g. sales leaders, revenue operators, SDR managers", type: "short" },
    ],
  },
];
