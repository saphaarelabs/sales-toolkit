import type { PromptTemplate } from "../promptTemplates";

export const engagePrompts: PromptTemplate[] = [
  // ── Phase 4: Cold Outreach ──
  {
    id: "cold-email-scratch",
    title: "Cold Email from Scratch",
    description: "Generate 3 cold email variations using PAS, BAB, and AIDA frameworks.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a world-class cold email copywriter. Generate 3 cold email variations:

My product: [YOUR_PRODUCT]
What it does: [PRODUCT_DESCRIPTION]
Target: [PROSPECT_ROLE] at [PROSPECT_COMPANY]
Industry: [INDUSTRY]
Pain point: [PAIN_POINT]
Social proof: [SOCIAL_PROOF]

Write 3 variations:
**Email 1: Problem-Agitate-Solve (PAS)**
**Email 2: Before-After-Bridge (BAB)**
**Email 3: AIDA (Attention-Interest-Desire-Action)**

Rules:
- Subject lines under 6 words
- Body under 90 words
- One clear CTA
- No buzzwords
- Sound human, not a marketing department`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. Gong", type: "short" },
      { key: "PRODUCT_DESCRIPTION", label: "What It Does", placeholder: "e.g. AI that analyzes sales calls to find winning patterns", type: "long" },
      { key: "PROSPECT_ROLE", label: "Target Role", placeholder: "e.g. VP of Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Target Company", placeholder: "e.g. mid-market SaaS companies", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "PAIN_POINT", label: "Key Pain Point", placeholder: "e.g. reps losing deals because they talk too much", type: "long" },
      { key: "SOCIAL_PROOF", label: "Social Proof", placeholder: "e.g. used by 3,000+ sales teams including LinkedIn", type: "short" },
    ],
  },
  {
    id: "linkedin-outreach",
    title: "LinkedIn Outreach Messages",
    description: "Generate 3 personalized LinkedIn connection/message variations for a target prospect.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write 3 LinkedIn outreach message variations:

Name: [PROSPECT_NAME]
Role: [PROSPECT_ROLE]
Company: [PROSPECT_COMPANY]
Notable: [NOTABLE_THING]
What I sell: [YOUR_PRODUCT]
Relevance: [RELEVANCE]

3 approaches:
1. "Mutual interest" angle
2. "Insight" angle — share a relevant data point
3. "Direct" angle — upfront about why, but make it about them

Rules:
- Under 300 chars for connections, under 500 for InMails
- No cringe, no fake flattery
- Sound like a real human`,
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
    id: "subject-line-generator",
    title: "Subject Line A/B Generator",
    description: "Generate 10 subject line variants with framework labels and predicted open rate ranges.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["ChatGPT", "Claude", "Gemini"],
    prompt: `Act as an email deliverability expert. Generate 10 subject line variants:

Product: [YOUR_PRODUCT]
Target: [TARGET_AUDIENCE]
Email goal: [EMAIL_GOAL]
Value prop: [VALUE_PROP]
Industry: [INDUSTRY]

Generate 10 subject lines using different frameworks:
| # | Subject Line | Framework | Predicted Open Rate | Why It Works |

Frameworks: Curiosity Gap, Personalized, Social Proof, Question, Pain Point, Data-Driven, Pattern Interrupt, Casual/Human, Urgency (real), Contrarian

Then recommend:
- Top 3 to A/B test first
- Which to avoid for enterprise (too casual/clickbaity)
- Deliverability tips (avoid spam triggers)`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales coaching platform", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. VP Sales at mid-market SaaS", type: "short" },
      { key: "EMAIL_GOAL", label: "Email Goal", placeholder: "e.g. book a demo, start a conversation", type: "short" },
      { key: "VALUE_PROP", label: "Key Value Prop", placeholder: "e.g. reduce ramp time by 40%", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
    ],
  },
  {
    id: "video-prospecting",
    title: "Video Prospecting Script",
    description: "Create personalized 60-second video scripts with hook, value, and CTA structure.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a video prospecting coach. Create a personalized 60-second video script.

Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
Product: [YOUR_PRODUCT]
Why reaching out: [OUTREACH_REASON]
Personalization: [PERSONALIZATION]

Create:
1. **Hook (0-5s)**: Say their name, show their website/LinkedIn
2. **Problem (5-20s)**: Reference something specific about their situation
3. **Value (20-40s)**: ONE specific result with customer proof
4. **CTA (40-60s)**: Low-commitment ask, friendly sign-off

Production tips:
- Thumbnail: Show their website (3x higher click rate)
- Length: 45-60s MAX
- Energy: Enthusiastic but not manic

Also write the companion email (3 lines max + video thumbnail).`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP of Marketing", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. HubSpot", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. personalized video platform", type: "short" },
      { key: "OUTREACH_REASON", label: "Why Reaching Out", placeholder: "e.g. they're hiring SDRs and could use video", type: "long" },
      { key: "PERSONALIZATION", label: "Personalization Detail", placeholder: "e.g. they posted about improving outbound response rates", type: "long" },
    ],
  },
  {
    id: "executive-outreach",
    title: "Executive Outreach Email",
    description: "C-suite specific messaging — short, strategic, no fluff. Built for VP+ audiences.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Craft executive-level outreach for [EXEC_TITLE] at [COMPANY_NAME].

Executive: [EXEC_NAME], [EXEC_TITLE] at [COMPANY_NAME]
Company size: [COMPANY_SIZE]
Industry: [INDUSTRY]
Product: [YOUR_PRODUCT]
Strategic relevance: [STRATEGIC_RELEVANCE]
Warm angle: [WARM_ANGLE]

Write 3 variations:
1. **Strategic Insight** — Board-level insight, peer conversation offer, under 60 words
2. **Peer Introduction** — Mutual connection leverage, under 50 words
3. **Data Point** — One compelling stat, 15-min briefing offer, under 50 words

Rules:
- Never "I'd love to" or "I was hoping to"
- No features — only business outcomes
- CTA: briefing or strategic discussion, never "demo"
- Subject: 3-4 words max

Also: best send time, LinkedIn fallback, EA ally strategy.`,
    variables: [
      { key: "EXEC_NAME", label: "Executive Name", placeholder: "e.g. Jennifer Walsh", type: "short" },
      { key: "EXEC_TITLE", label: "Executive Title", placeholder: "e.g. CRO, VP Sales, CMO", type: "short" },
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Snowflake", type: "short" },
      { key: "COMPANY_SIZE", label: "Company Size", placeholder: "e.g. 3,000 employees", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. cloud data platform", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "STRATEGIC_RELEVANCE", label: "Strategic Relevance", placeholder: "e.g. they just missed earnings forecast", type: "long" },
      { key: "WARM_ANGLE", label: "Warm Angle", placeholder: "e.g. mutual connection, same alma mater", type: "short" },
    ],
  },
  {
    id: "multi-channel-sequence",
    title: "Multi-Channel Outreach Sequence",
    description: "Design a 14-day sequence mixing email, LinkedIn, phone, and video across 8-12 touches.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Act as a sales engagement architect. Design a multi-channel outreach sequence.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE] in [INDUSTRY]
Sequence goal: [SEQUENCE_GOAL]
Tools available: [TOOLS]

Design a 14-day, 10-touch sequence:

| Day | Channel | Touch Type | Message Theme | Content |

Channel mix: Email (5), LinkedIn (3), Phone (2), Optional video (1)

For each touch:
- Full message/script content
- Why this channel on this day
- What to do if they engage vs. ignore

Also include:
- **A/B Test Plan** — What to test in first 100 sends
- **Personalization Framework** — What to customize per prospect
- **Exit Criteria** — When to stop the sequence
- **Reply Handling** — Templates for common responses (interested, not now, not me)`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales analytics platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. VP of Sales", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "SEQUENCE_GOAL", label: "Sequence Goal", placeholder: "e.g. book a 15-minute discovery call", type: "short" },
      { key: "TOOLS", label: "Tools Available", placeholder: "e.g. Outreach, LinkedIn Sales Nav, Vidyard, Salesforce", type: "short" },
    ],
  },
  {
    id: "cold-call-script",
    title: "Cold Call Script & Objection Map",
    description: "Build a conversational cold call framework with openers, talk tracks, and objection responses.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Act as a cold calling coach. Build a cold call framework for my team.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE]
Industry: [INDUSTRY]
Common objections: [COMMON_OBJECTIONS]
Call goal: [CALL_GOAL]

Create:
1. **3 Opening Lines** — Pattern interrupts that earn 15 more seconds
2. **Permission-Based Opener** — Ask for time without being weak
3. **Value Proposition (10 seconds)** — Why they should care, tailored to their role
4. **3 Discovery Questions** — Get them talking about their pain
5. **Transition to Meeting** — How to bridge from interest to booking
6. **Objection Responses** (for 8 common objections):
   - "Not interested" / "Send me an email" / "We already have something"
   - "Now's not a good time" / "What is this about?" / "How'd you get my number?"
   - "We're locked into a contract" / "I need to talk to my team"
7. **Voicemail Script** — Under 20 seconds, creates curiosity
8. **Post-Call Follow-Up** — Email template to send within 5 minutes`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. cybersecurity platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. CISO, VP of IT", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. financial services", type: "short" },
      { key: "COMMON_OBJECTIONS", label: "Common Objections", placeholder: "e.g. 'we use CrowdStrike', 'no budget', 'not a priority'", type: "long" },
      { key: "CALL_GOAL", label: "Call Goal", placeholder: "e.g. book a 15-minute technical overview", type: "short" },
    ],
  },
  {
    id: "personalization-at-scale",
    title: "Personalization at Scale Framework",
    description: "Build a personalization system that feels 1:1 but can scale across 100+ prospects per week.",
    category: "Cold Outreach",
    phase: 4,
    optimizedFor: ["Claude", "ChatGPT", "Cursor"],
    prompt: `Act as a sales efficiency consultant. Build a personalization framework that scales.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE]
Weekly outreach volume: [WEEKLY_VOLUME]
Current personalization approach: [CURRENT_APPROACH]
Tools: [TOOLS]

Create:
1. **Personalization Tiers**:
   - Tier 1 (Top 20%): Deep research, custom messaging, video
   - Tier 2 (Middle 50%): Template + 2-3 custom elements
   - Tier 3 (Bottom 30%): Smart templates with dynamic variables

2. **Research Shortcuts** — Where to find personalization data in under 2 minutes:
   - LinkedIn (what to look for), company news, job postings, tech stack, mutual connections

3. **Template System** — Base templates with modular personalization blocks:
   - [PAIN_BLOCK] + [PROOF_BLOCK] + [CTA_BLOCK]
   - Mix and match for unique-feeling emails

4. **AI Prompt for Batch Personalization** — A prompt you can paste into AI with 10 prospect names to get personalized opening lines for all 10

5. **Quality Check** — How to review 50 personalized emails in 10 minutes
6. **Metrics** — How to measure if personalization is actually improving results`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. VP Sales, CRO", type: "short" },
      { key: "WEEKLY_VOLUME", label: "Weekly Outreach Volume", placeholder: "e.g. 200 emails/week", type: "short" },
      { key: "CURRENT_APPROACH", label: "Current Approach", placeholder: "e.g. manual research, 5 min per prospect", type: "short" },
      { key: "TOOLS", label: "Tools", placeholder: "e.g. Outreach, Sales Nav, ChatGPT", type: "short" },
    ],
  },

  // ── Phase 5: Follow-Up & Nurture ──
  {
    id: "breakup-email",
    title: "Breakup Email Sequence",
    description: "Create a 3-part breakup email sequence for prospects who've gone silent.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write a 3-part breakup email sequence for a silent prospect.

Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
What we discussed: [DISCUSSION_SUMMARY]
Last contact: [LAST_CONTACT]
Follow-ups sent: [FOLLOWUP_COUNT]

3 emails:
1. Day 1: "Gentle nudge" — assume positive intent, offer value
2. Day 4: "Pattern interrupt" — completely different angle or format
3. Day 7: "Permission to close" — give them an easy out

Rules:
- Under 100 words each
- No guilt-tripping
- Each works standalone
- Include subject lines`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Jordan", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. TechCo", type: "short" },
      { key: "DISCUSSION_SUMMARY", label: "What You Discussed", placeholder: "e.g. demo of analytics, they liked reporting features", type: "long" },
      { key: "LAST_CONTACT", label: "Last Contact", placeholder: "e.g. 2 weeks ago, after demo", type: "short" },
      { key: "FOLLOWUP_COUNT", label: "Follow-ups Sent", placeholder: "e.g. 2", type: "short" },
    ],
  },
  {
    id: "reengagement-campaign",
    title: "Re-engagement Campaign",
    description: "Craft a sequence for dead leads or closed-lost deals that resurfaces value without desperation.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create a 4-email re-engagement sequence for contacts who have gone cold or closed-lost.

Product: [YOUR_PRODUCT]
Original interest: [ORIGINAL_INTEREST]
Why they went cold: [REASON_LOST]
Time elapsed: [TIME_ELAPSED]
What's new: [WHATS_NEW]

4 emails over 3 weeks:
1. Day 1: "No Ask" Value Drop — genuinely useful content, zero pitch
2. Day 5: "What's Changed" Update — new features, customers, data
3. Day 12: "Social Proof" Nudge — customer story from similar company
4. Day 21: "Door is Open" Close — warm, make it easy to re-engage

Rules:
- Never reference that they "ghosted"
- No fake urgency
- Each email under 80 words
- Different subject line approach each time`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. marketing automation platform", type: "short" },
      { key: "ORIGINAL_INTEREST", label: "Original Interest", placeholder: "e.g. wanted to automate email nurture sequences", type: "long" },
      { key: "REASON_LOST", label: "Why They Went Cold", placeholder: "e.g. lost to competitor, budget freeze, champion left", type: "short" },
      { key: "TIME_ELAPSED", label: "Time Since Last Contact", placeholder: "e.g. 4 months", type: "short" },
      { key: "WHATS_NEW", label: "What's Changed", placeholder: "e.g. launched AI features, dropped pricing 20%", type: "long" },
    ],
  },
  {
    id: "referral-request",
    title: "Referral Request Email",
    description: "Generate warm referral ask emails for champions, customers, and mutual connections.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Generate 3 referral request emails tailored to different relationships.

Product: [YOUR_PRODUCT]
Your name: [YOUR_NAME]
Target intro: [TARGET_INTRO]

3 emails:
1. **Asking a Happy Customer** — [CUSTOMER_NAME] at [CUSTOMER_COMPANY], customer for [CUSTOMER_TENURE], loves [WHAT_THEY_LOVE]
2. **Asking a Champion** — Forward to economic buyer with exact forwardable email
3. **Asking a Mutual Connection** — LinkedIn shared connection, explain the why

Rules:
- Make the ask specific (name, company, role)
- Offer to draft the intro email for them
- Under 100 words each`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales coaching platform", type: "short" },
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Sarah", type: "short" },
      { key: "TARGET_INTRO", label: "Who You Want Intro To", placeholder: "e.g. VP Sales at Series B+ SaaS", type: "short" },
      { key: "CUSTOMER_NAME", label: "Happy Customer Name", placeholder: "e.g. Mike", type: "short" },
      { key: "CUSTOMER_COMPANY", label: "Customer Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "CUSTOMER_TENURE", label: "Customer Tenure", placeholder: "e.g. 8 months", type: "short" },
      { key: "WHAT_THEY_LOVE", label: "What They Love", placeholder: "e.g. call recording analytics saved 10 hrs/week", type: "long" },
    ],
  },
  {
    id: "event-followup",
    title: "Event / Webinar Follow-Up",
    description: "Personalized follow-ups referencing specific event content, booth visits, or webinar attendance.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Generate personalized follow-up emails for different event scenarios.

Event: [EVENT_NAME]
Product: [YOUR_PRODUCT]
Company: [YOUR_COMPANY]

3 scenarios:
1. **Booth/In-Person** — Prospect: [PROSPECT_NAME], [PROSPECT_ROLE]. Discussion: [CONVERSATION_NOTES]. Same-day follow-up.
2. **Webinar Attendee** — No interaction. Reference key insight: [KEY_INSIGHT]. Offer recording + resource.
3. **Speaker Connection** — Reference their quote: [SPEAKER_QUOTE]. Peer-to-peer positioning.

Rules:
- Send within 24 hours
- Reference specific details
- Under 100 words each
- Low-commitment CTA
- Subject lines that stand out in post-event inbox flood`,
    variables: [
      { key: "EVENT_NAME", label: "Event Name", placeholder: "e.g. SaaStr Annual 2024", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "YOUR_COMPANY", label: "Your Company", placeholder: "e.g. CloserKit", type: "short" },
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Dana", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. CRO", type: "short" },
      { key: "CONVERSATION_NOTES", label: "Conversation Notes", placeholder: "e.g. discussed rep ramp time challenge", type: "long" },
      { key: "KEY_INSIGHT", label: "Key Webinar Insight", placeholder: "e.g. 73% of deals stall at proposal stage", type: "short" },
      { key: "SPEAKER_QUOTE", label: "Speaker Quote", placeholder: "e.g. their point about selling to the CFO", type: "short" },
    ],
  },
  {
    id: "closed-lost-winback",
    title: "Closed-Lost Win-Back",
    description: "Analyze why a deal was lost and generate a re-engagement strategy timed to their renewal cycle.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Analyze this closed-lost deal and create a re-engagement plan.

Company: [COMPANY_NAME]
Deal size: [DEAL_SIZE]
Lost date: [LOST_DATE]
Reason: [REASON_LOST]
Who they chose: [COMPETITOR_CHOSEN]
Champion status: [CHAMPION_STATUS]
Renewal date: [RENEWAL_DATE]

Produce:
1. **Loss Analysis** — Root cause, what we could've done differently
2. **Win-Back Timing** — Optimal re-engagement window, triggers to monitor
3. **Re-Engagement Sequence** — 5 touches over 3 months (value-add, what's changed, competitive intel, proof, direct ask)
4. **Messaging Adjustments** — What to say differently, objections to preempt
5. **Disqualification Criteria** — When to stop pursuing

Never sound desperate or bitter.`,
    variables: [
      { key: "COMPANY_NAME", label: "Company", placeholder: "e.g. Acme Corp", type: "short" },
      { key: "DEAL_SIZE", label: "Original Deal Size", placeholder: "e.g. $80K ARR", type: "short" },
      { key: "LOST_DATE", label: "When You Lost", placeholder: "e.g. October 2024", type: "short" },
      { key: "REASON_LOST", label: "Stated Reason Lost", placeholder: "e.g. went with competitor on price", type: "long" },
      { key: "COMPETITOR_CHOSEN", label: "Who They Chose", placeholder: "e.g. Competitor X, built in-house", type: "short" },
      { key: "CHAMPION_STATUS", label: "Champion Status", placeholder: "e.g. still there, left the company", type: "short" },
      { key: "RENEWAL_DATE", label: "Their Renewal Date", placeholder: "e.g. September 2025", type: "short" },
    ],
  },
  {
    id: "nurture-drip-campaign",
    title: "Long-Term Nurture Drip",
    description: "Design a 6-month nurture campaign for prospects who aren't ready to buy yet.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["Claude", "ChatGPT"],
    prompt: `Design a 6-month nurture campaign for prospects who aren't ready to buy.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE] in [INDUSTRY]
Common "not now" reasons: [NOT_NOW_REASONS]
Content assets available: [CONTENT_ASSETS]

Create a 6-month plan:
| Month | Email | Theme | Content | CTA | Goal |

Principles:
1. Every email provides standalone value (no "just checking in")
2. Mix formats: data, stories, tools, frameworks, industry news
3. Progressive engagement — each month slightly more direct
4. Re-engagement triggers — what signals they're warming up
5. Exit ramp — when to remove from nurture
6. Handoff criteria — when to route back to sales

Include 12 email subject lines and brief descriptions.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. HR analytics platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. CHRO, VP People", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. tech companies 500+", type: "short" },
      { key: "NOT_NOW_REASONS", label: "Common 'Not Now' Reasons", placeholder: "e.g. budget cycle, current contract, other priorities", type: "long" },
      { key: "CONTENT_ASSETS", label: "Available Content", placeholder: "e.g. 5 blog posts, 2 case studies, 1 ROI calculator, webinar recordings", type: "long" },
    ],
  },
  {
    id: "ghosted-recovery",
    title: "Ghosted Prospect Recovery",
    description: "Creative recovery tactics for when a prospect goes dark mid-deal with unusual re-engagement angles.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `My prospect has gone completely dark. Help me recover this deal with creative tactics.

Prospect: [PROSPECT_NAME], [PROSPECT_ROLE] at [PROSPECT_COMPANY]
Last interaction: [LAST_INTERACTION]
Deal stage when they went dark: [DEAL_STAGE]
Product: [YOUR_PRODUCT]
What was going well: [WHAT_WAS_GOING_WELL]

Give me 7 creative recovery tactics (beyond standard follow-up):
1. **The "New Information" Play** — Share something that changes the equation
2. **The "Different Person" Play** — Have someone else reach out
3. **The "Value Bomb" Play** — Send something so useful they HAVE to respond
4. **The "Breakup with a Twist" Play** — Unexpected format or angle
5. **The "Social Proof" Play** — Their competitor or peer just signed
6. **The "Direct Mail" Play** — Physical mail that gets attention
7. **The "LinkedIn Engagement" Play** — Warm through social before re-emailing

For each: exact message/script, timing, and expected response rate.`,
    variables: [
      { key: "PROSPECT_NAME", label: "Prospect Name", placeholder: "e.g. Alex", type: "short" },
      { key: "PROSPECT_ROLE", label: "Prospect Role", placeholder: "e.g. VP Sales", type: "short" },
      { key: "PROSPECT_COMPANY", label: "Prospect Company", placeholder: "e.g. TechCo", type: "short" },
      { key: "LAST_INTERACTION", label: "Last Interaction", placeholder: "e.g. great demo 3 weeks ago, said they'd schedule next steps", type: "long" },
      { key: "DEAL_STAGE", label: "Deal Stage", placeholder: "e.g. post-demo, pre-proposal", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. analytics platform", type: "short" },
      { key: "WHAT_WAS_GOING_WELL", label: "What Was Going Well", placeholder: "e.g. they loved the product, champion was engaged", type: "long" },
    ],
  },
  {
    id: "trigger-based-followup",
    title: "Trigger-Based Follow-Up",
    description: "Create follow-up messages triggered by specific prospect actions or events.",
    category: "Follow-Up & Nurture",
    phase: 5,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create follow-up messages for specific trigger events.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE]
Industry: [INDUSTRY]

Write a follow-up email for each trigger:

1. **Visited Pricing Page** — They checked pricing but didn't request a demo
2. **Downloaded Content** — They downloaded [CONTENT_ASSET]
3. **Competitor News** — Their current vendor had a negative event
4. **Leadership Change** — New person in the target role at their company
5. **Funding Round** — They just raised money
6. **Job Posting** — They posted a job that signals need for your product
7. **LinkedIn Engagement** — They liked/commented on your content
8. **Annual Review Time** — It's their typical budget/vendor review period

For each: subject line, email body (under 60 words), timing, and CTA.`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. security compliance platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. CISO, VP Engineering", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. fintech", type: "short" },
      { key: "CONTENT_ASSET", label: "Content Asset", placeholder: "e.g. '2025 Security Compliance Guide'", type: "short" },
    ],
  },

  // ── Phase 6: Social Selling ──
  {
    id: "linkedin-profile-optimizer",
    title: "LinkedIn Profile Optimizer",
    description: "Rewrite your LinkedIn profile to attract inbound leads and position you as a trusted advisor.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Rewrite my LinkedIn profile to attract inbound leads.

Name: [YOUR_NAME]
Role: [YOUR_ROLE]
Company: [YOUR_COMPANY]
Product: [YOUR_PRODUCT]
Target buyer: [TARGET_BUYER]
Key results: [KEY_RESULTS]
Unique angle: [UNIQUE_ANGLE]

Rewrite:
1. **Headline** (220 chars, 3 variations): [Who you help] + [How] + [Proof]
2. **About Section** (2,600 chars): Hook, problem, solution, proof, CTA
3. **Featured Section**: 3 content ideas to pin
4. **Experience**: Lead with impact, not responsibilities
5. **Banner Image Concept**: What it should communicate

No buzzwords (passionate, driven). Sound human.`,
    variables: [
      { key: "YOUR_NAME", label: "Your Name", placeholder: "e.g. Alex Chen", type: "short" },
      { key: "YOUR_ROLE", label: "Current Role", placeholder: "e.g. Senior AE", type: "short" },
      { key: "YOUR_COMPANY", label: "Company", placeholder: "e.g. Gong", type: "short" },
      { key: "YOUR_PRODUCT", label: "What You Sell", placeholder: "e.g. revenue intelligence platform", type: "short" },
      { key: "TARGET_BUYER", label: "Target Buyer", placeholder: "e.g. VP Sales at mid-market SaaS", type: "short" },
      { key: "KEY_RESULTS", label: "Key Results", placeholder: "e.g. helped 50+ teams improve forecast accuracy by 35%", type: "long" },
      { key: "UNIQUE_ANGLE", label: "Your Unique Angle", placeholder: "e.g. former engineer turned sales leader", type: "long" },
    ],
  },
  {
    id: "linkedin-content-calendar",
    title: "LinkedIn Content Calendar",
    description: "30-day LinkedIn posting plan with hooks, frameworks, and engagement strategies for sales professionals.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create a 30-day LinkedIn content calendar for a sales professional.

Role: [YOUR_ROLE] selling [YOUR_PRODUCT]
Target audience: [TARGET_AUDIENCE]
Expertise areas: [EXPERTISE]
Current followers: [FOLLOWERS]
Posting frequency: [FREQUENCY]

Create:
1. **Content Pillars** (4 themes to rotate):
   - Industry insights, personal stories, tactical tips, social proof

2. **30-Day Calendar**:
   | Day | Content Type | Topic | Hook (first line) | Framework | CTA |

3. **Post Templates** (write 5 full posts):
   - The "hot take" that sparks debate
   - The "here's what I learned" story
   - The "tactical how-to" with a framework
   - The "customer win" celebration
   - The "vulnerable moment" that builds trust

4. **Engagement Strategy**:
   - Who to comment on daily (target accounts, industry leaders)
   - Comment templates that start conversations
   - How to turn commenters into prospects

5. **Metrics**: What to track and optimize for`,
    variables: [
      { key: "YOUR_ROLE", label: "Your Role", placeholder: "e.g. Enterprise AE", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales enablement platform", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. VP Sales, CROs at B2B SaaS", type: "short" },
      { key: "EXPERTISE", label: "Your Expertise", placeholder: "e.g. enterprise selling, MEDDIC, sales coaching", type: "long" },
      { key: "FOLLOWERS", label: "Current Followers", placeholder: "e.g. 2,500", type: "short" },
      { key: "FREQUENCY", label: "Posting Frequency", placeholder: "e.g. 3x/week", type: "short" },
    ],
  },
  {
    id: "social-selling-dm-strategy",
    title: "Social Selling DM Strategy",
    description: "Build a LinkedIn DM approach that warms prospects through engagement before making the ask.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Design a social selling DM strategy that converts LinkedIn connections into meetings.

Product: [YOUR_PRODUCT]
Target: [TARGET_ROLE]
Industry: [INDUSTRY]
Your LinkedIn activity level: [ACTIVITY_LEVEL]

Create a 3-phase approach:

**Phase 1: Warm-Up (Week 1-2)**
- How to engage with their content authentically
- Comment strategies that get noticed
- Content to share that establishes credibility

**Phase 2: Connection (Week 2-3)**
- Connection request templates (3 variations)
- First message after connection (NOT a pitch)
- How to build rapport through shared interests

**Phase 3: Conversion (Week 3-4)**
- Transition from social to business conversation
- DM sequence: value → curiosity → ask
- How to handle "not interested" gracefully
- Meeting booking message

Rules:
- Never pitch in the connection request
- Always provide value before asking
- 3-touch minimum before any business ask

Include 10 example DM conversations (message + response + next message).`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. CRM platform", type: "short" },
      { key: "TARGET_ROLE", label: "Target Role", placeholder: "e.g. Head of Sales, VP Revenue", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "ACTIVITY_LEVEL", label: "Your LinkedIn Activity", placeholder: "e.g. post 2x/week, 500 connections", type: "short" },
    ],
  },
  {
    id: "linkedin-comment-strategy",
    title: "LinkedIn Comment Strategy",
    description: "Build strategic commenting habits that get you noticed by target accounts and industry leaders.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create a LinkedIn commenting strategy to build visibility with target accounts.

Product: [YOUR_PRODUCT]
Target accounts: [TARGET_ACCOUNTS]
Target contacts: [TARGET_CONTACTS]
Industry: [INDUSTRY]
Time budget: [TIME_BUDGET]

Create:
1. **Target List** — 20 accounts to monitor (executives, industry voices, prospects)
2. **Comment Frameworks** (5 types):
   - The "insightful add-on" — extend their point with data
   - The "respectful challenge" — offer a different perspective
   - The "personal story" — relate with your experience
   - The "question" — spark deeper conversation
   - The "connector" — tag someone relevant

3. **Daily Routine** (15 minutes):
   - 5 strategic comments on target account posts
   - 3 comments on industry leader posts
   - 2 replies to comments on YOUR posts

4. **Comment Templates** — 10 fill-in-the-blank comment starters
5. **What NOT to Do** — Comments that hurt credibility
6. **Tracking** — How to measure if commenting is creating opportunities`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales analytics platform", type: "short" },
      { key: "TARGET_ACCOUNTS", label: "Target Accounts", placeholder: "e.g. Stripe, Notion, Figma, Datadog", type: "long" },
      { key: "TARGET_CONTACTS", label: "Target Contacts", placeholder: "e.g. VP Sales at each, CROs, Sales Directors", type: "long" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. B2B SaaS", type: "short" },
      { key: "TIME_BUDGET", label: "Time Budget", placeholder: "e.g. 15-20 minutes/day", type: "short" },
    ],
  },
  {
    id: "thought-leadership-post",
    title: "Thought Leadership Post Writer",
    description: "Write a LinkedIn post that positions you as an expert and attracts your target buyers.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Write a thought leadership LinkedIn post.

Topic: [TOPIC]
Your angle: [YOUR_ANGLE]
Target reader: [TARGET_READER]
Key point: [KEY_POINT]
Supporting data: [DATA]
Your experience: [EXPERIENCE]

Write 3 variations:

1. **The Contrarian Take** — Challenge conventional wisdom
2. **The Story-Based Lesson** — Personal story → universal insight
3. **The Tactical Framework** — Actionable steps readers can use today

For each post:
- Hook (first 2 lines — must stop the scroll)
- Body (clear structure, short paragraphs, whitespace)
- CTA (engagement-driving, not salesy)
- 3-5 relevant hashtags
- Best posting time

Rules:
- No "I'm excited to share" or "thrilled to announce"
- Write like you talk
- One idea per post
- Under 1,300 characters for maximum reach`,
    variables: [
      { key: "TOPIC", label: "Topic", placeholder: "e.g. cold email is dead, AI in sales, outbound strategies", type: "short" },
      { key: "YOUR_ANGLE", label: "Your Angle", placeholder: "e.g. cold email isn't dead — lazy cold email is", type: "short" },
      { key: "TARGET_READER", label: "Target Reader", placeholder: "e.g. SDRs and AEs at B2B SaaS companies", type: "short" },
      { key: "KEY_POINT", label: "Key Point", placeholder: "e.g. personalization at scale beats volume every time", type: "short" },
      { key: "DATA", label: "Supporting Data", placeholder: "e.g. our team's reply rates went from 2% to 12%", type: "short" },
      { key: "EXPERIENCE", label: "Your Experience", placeholder: "e.g. tested 50K cold emails over 2 years", type: "long" },
    ],
  },
  {
    id: "social-proof-storytelling",
    title: "Social Proof Storytelling",
    description: "Turn customer wins into compelling social media stories that attract similar buyers.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Turn this customer win into a LinkedIn story that attracts similar buyers.

Customer: [CUSTOMER_COMPANY] ([CUSTOMER_INDUSTRY])
Result: [KEY_RESULT]
Before state: [BEFORE_STATE]
After state: [AFTER_STATE]
Your product: [YOUR_PRODUCT]
Quote from customer (if available): [CUSTOMER_QUOTE]

Write 3 versions:
1. **The "Before/After" Story** — Paint the contrast dramatically
2. **The "Lessons Learned" Post** — What we learned helping them succeed
3. **The "Behind the Scenes" Post** — The journey, including challenges

For each:
- Hook that stops scrolling
- Story structure (setup → conflict → resolution)
- Subtle product mention (never the hero — the customer is)
- CTA that invites similar prospects to engage

Also: Tag strategy, best time to post, comment reply templates for interested prospects.`,
    variables: [
      { key: "CUSTOMER_COMPANY", label: "Customer Company", placeholder: "e.g. Notion", type: "short" },
      { key: "CUSTOMER_INDUSTRY", label: "Customer Industry", placeholder: "e.g. productivity SaaS", type: "short" },
      { key: "KEY_RESULT", label: "Key Result", placeholder: "e.g. 3x pipeline in 90 days", type: "short" },
      { key: "BEFORE_STATE", label: "Before State", placeholder: "e.g. manual outbound, 2% reply rate, missed quota 3 quarters", type: "long" },
      { key: "AFTER_STATE", label: "After State", placeholder: "e.g. 12% reply rate, 150% quota attainment, promoted to team lead", type: "long" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. sales engagement platform", type: "short" },
      { key: "CUSTOMER_QUOTE", label: "Customer Quote (optional)", placeholder: "e.g. 'This tool changed how my team prospects'", type: "long" },
    ],
  },
  {
    id: "community-engagement",
    title: "Community & Forum Strategy",
    description: "Build presence in Slack communities, Reddit, and industry forums to generate warm leads.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Build a community engagement strategy for generating warm leads.

Product: [YOUR_PRODUCT]
Target buyer: [TARGET_BUYER]
Industry: [INDUSTRY]
Communities you're in: [COMMUNITIES]
Time budget: [TIME_BUDGET]

Create:
1. **Community Audit** — Best communities for your ICP (Slack, Reddit, Discord, forums)
2. **Profile Setup** — How to position yourself (not as a vendor)
3. **Content Strategy** — What to share, how to add value
4. **Engagement Cadence** — Daily/weekly activities
5. **Lead Identification** — How to spot buying signals in community conversations
6. **Transition to DM** — How to move from public helpful → private conversation
7. **Rules of Engagement** — What gets you banned vs. respected
8. **Measurement** — Track community-sourced pipeline`,
    variables: [
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. developer tools platform", type: "short" },
      { key: "TARGET_BUYER", label: "Target Buyer", placeholder: "e.g. engineering managers, CTOs", type: "short" },
      { key: "INDUSTRY", label: "Industry", placeholder: "e.g. developer tools, DevOps", type: "short" },
      { key: "COMMUNITIES", label: "Communities", placeholder: "e.g. r/sales, RevGenius Slack, Pavilion", type: "long" },
      { key: "TIME_BUDGET", label: "Time Budget", placeholder: "e.g. 30 min/day", type: "short" },
    ],
  },
  {
    id: "video-content-strategy",
    title: "Video Content Strategy for Sales",
    description: "Create a video content plan for LinkedIn, YouTube Shorts, or TikTok to build your sales brand.",
    category: "Social Selling",
    phase: 6,
    optimizedFor: ["ChatGPT", "Claude"],
    prompt: `Create a video content strategy for a sales professional.

Role: [YOUR_ROLE]
Product: [YOUR_PRODUCT]
Target audience: [TARGET_AUDIENCE]
Platforms: [PLATFORMS]
Comfort level on camera: [COMFORT_LEVEL]

Create:
1. **Content Themes** (5 recurring series):
   - Sales tips, industry takes, behind-the-scenes, customer stories, tool reviews

2. **12-Video Plan**:
   | Video | Topic | Hook | Format | Length | Platform |

3. **Script Templates** for each format:
   - 60-second tip
   - 3-minute deep dive
   - React/commentary on industry news

4. **Production Tips** — Equipment, lighting, editing (budget: $0-$100)
5. **Distribution Strategy** — Where to post, repurposing across platforms
6. **Lead Capture** — How to turn viewers into prospects
7. **Growth Tactics** — Hashtags, engagement, collaboration opportunities`,
    variables: [
      { key: "YOUR_ROLE", label: "Your Role", placeholder: "e.g. AE at sales tech company", type: "short" },
      { key: "YOUR_PRODUCT", label: "Your Product", placeholder: "e.g. outbound automation tool", type: "short" },
      { key: "TARGET_AUDIENCE", label: "Target Audience", placeholder: "e.g. SDRs, sales managers", type: "short" },
      { key: "PLATFORMS", label: "Platforms", placeholder: "e.g. LinkedIn, YouTube Shorts, TikTok", type: "short" },
      { key: "COMFORT_LEVEL", label: "Comfort on Camera", placeholder: "e.g. beginner, intermediate, experienced", type: "short" },
    ],
  },
];
