import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Copy, Check, ChevronDown, ChevronUp, Search } from "lucide-react";
import type { EmailTemplate, TemplateVariable } from "@/data/emailTemplateTypes";
import { hunterTemplates, saleshandyTemplates, lemlistTemplates, klentyTemplates, expertFrameworkTemplates, linkedinDmTemplates } from "@/data/externalTemplates";

const commonVars: TemplateVariable[] = [
  { key: "FirstName", label: "First Name", placeholder: "John" },
  { key: "Company", label: "Company", placeholder: "Acme Inc" },
  { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
];

const coreTemplates: EmailTemplate[] = [
  // ── Cold Outreach ──
  {
    id: "co-1", category: "Cold Outreach", title: "Initial Contact with a New Prospect",
    subject: "Thoughts, {{FirstName}}?",
    body: `Hi {{FirstName}},

I noticed that {{Company}} has been making strides in the {{Tech}} space. At [Your Company], we specialize in helping businesses like yours achieve [specific outcome].

We recently helped {{Case study}} increase their [relevant metric] by [percentage/result]. I believe we could help {{Company}} achieve similar results.

Can we schedule a brief call to discuss how we can support your goals?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [...commonVars, { key: "Tech", label: "Technology/Space", placeholder: "AI" }],
  },
  {
    id: "co-2", category: "Cold Outreach", title: "Reaching Out to Warm Leads",
    subject: "Quick Question, {{FirstName}}",
    body: `Hi {{FirstName}},

It was great speaking with you at [event/previous interaction]. I wanted to follow up on our conversation about [topic]. At [Your Company], we have been able to help clients like {{Case study}} achieve [specific outcome].

I believe there's a lot we could do for {{Company}} as well. Are you available for a call next week to explore this further?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "co-3", category: "Cold Outreach", title: "Following Up on a Previous Meeting",
    subject: "Next Steps, {{FirstName}}",
    body: `Hi {{FirstName}},

I enjoyed our conversation about {{Company}}'s goals and challenges in the {{Tech}} space. As discussed, I'm sharing more details on how we helped {{Case study}} achieve [specific outcome].

Can we set up a follow-up meeting to dive deeper into how we can help {{Company}} achieve similar results?

Looking forward to your thoughts.

Best,
[Your Name]`,
    variables: [...commonVars, { key: "Tech", label: "Technology/Space", placeholder: "cloud infrastructure" }],
  },
  {
    id: "co-4", category: "Cold Outreach", title: "Introducing Your Service to a New Market",
    subject: "{{Company}}'s Growth",
    body: `Hi {{FirstName}},

I see that {{Company}} is expanding its presence in the {{Country}} market. At [Your Company], we've helped businesses like {{Case study}} navigate new markets and achieve [specific outcome].

I'd love to share some insights on how we can support {{Company}} in {{Country}}.

Could we schedule a brief call next week?

Best regards,
[Your Name]`,
    variables: [...commonVars, { key: "Country", label: "Country/Market", placeholder: "APAC" }],
  },
  {
    id: "co-5", category: "Cold Outreach", title: "Networking at Industry Events",
    subject: "Great to Meet You, {{FirstName}}",
    body: `Hi {{FirstName}},

It was a pleasure meeting you at [Event]. I was impressed by {{Company}}'s work in the {{Tech}} space.

At [Your Company], we specialize in [service/product] and have helped clients like {{Case study}} achieve [specific outcome].

I'd love to continue our conversation and explore how we might collaborate.

Are you available for a coffee chat next week?

Best,
[Your Name]`,
    variables: [...commonVars, { key: "Tech", label: "Technology/Space", placeholder: "fintech" }],
  },
  {
    id: "co-6", category: "Cold Outreach", title: "Requesting a Referral from a Mutual Connection",
    subject: "Introduction Request, {{FirstName}}",
    body: `Hi {{FirstName}},

I hope you're well. Our mutual connection, [Mutual Connection's Name], mentioned that you might be interested in [specific outcome]. At [Your Company], we specialize in helping businesses achieve just that.

We've worked with clients like {{Case study}} to deliver [specific outcome]. I'd love to discuss how we might be able to support {{Company}} as well.

Can we schedule a quick call next week?

Best regards,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "co-7", category: "Cold Outreach", title: "Cold Outreach to Decision-Makers",
    subject: "{{FirstName}}, {{Industry}} Growth",
    body: `Hi {{FirstName}},

I see that {{Company}} is a key player in the {{Industry}} industry. At [Your Company], we've helped businesses like {{Case study}} achieve [specific outcome] with our [service/product].

I believe we could help {{Company}} enhance its performance and achieve similar results.

Can we set up a brief call next week to discuss this?

Best,
[Your Name]`,
    variables: [...commonVars, { key: "Industry", label: "Industry", placeholder: "healthcare" }],
  },

  // ── Follow-Up Emails ──
  {
    id: "fu-1", category: "Follow-Up Emails", title: "Follow-Up After Initial Contact",
    subject: "Following up, {{FirstName}}",
    body: `Hi {{FirstName}},

I wanted to follow up on my previous email regarding how [Your Company] can help {{Company}} achieve [specific outcome]. Our experience with clients like {{Case study}} shows we can deliver [specific result].

Would you be available for a quick call next week to discuss this further?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "fu-2", category: "Follow-Up Emails", title: "Follow-Up After Sending a Proposal",
    subject: "Proposal follow-up, {{FirstName}}",
    body: `Hi {{FirstName}},

I hope you had a chance to review the proposal I sent last week. As outlined, our approach can help {{Company}} achieve [specific outcome] effectively.

I'd love to discuss any questions or feedback you might have. Can we set up a call to go over the details?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "fu-3", category: "Follow-Up Emails", title: "Follow-Up After a Meeting or Call",
    subject: "Great Meeting with {{Company}}",
    body: `Hi {{FirstName}},

It was great speaking with you about {{Company}}'s goals and how we can help achieve them. I wanted to recap our discussion and highlight how our solutions can deliver [specific outcome].

Let's schedule a follow-up call to dive deeper into the specifics and next steps.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "fu-4", category: "Follow-Up Emails", title: "Follow-Up After an In-Person Event",
    subject: "Following Up from {{EventName}}",
    body: `Hi {{FirstName}},

It was a pleasure meeting you at {{EventName}}. I wanted to follow up on our conversation about how [Your Company] can help {{Company}} with [specific challenge or goal].

Our solutions have helped clients like {{Case study}} achieve [specific outcome], and I believe we can deliver similar results for {{Company}}.

Can we schedule a call to discuss this further?

Best,
[Your Name]`,
    variables: [...commonVars, { key: "EventName", label: "Event Name", placeholder: "SaaStr Annual" }],
  },
  {
    id: "fu-5", category: "Follow-Up Emails", title: "Follow-Up After a Webinar",
    subject: "Webinar Follow-Up for {{Company}}",
    body: `Hi {{FirstName}},

Thank you for attending our recent webinar on [webinar topic]. I hope you found the information useful for {{Company}}. As discussed, our solutions can help you achieve [specific outcome].

We've helped clients like {{Case study}} see [specific result] and I'd love to explore how we can do the same for {{Company}}.

Can we schedule a call to discuss this in more detail?

Best,
[Your Name]`,
    variables: commonVars,
  },

  // ── Pitching ──
  {
    id: "pi-1", category: "Pitching", title: "Initial Pitch to a New Client",
    subject: "Opportunity for {{Company}}",
    body: `Hi {{FirstName}},

I noticed that {{Company}} is focused on [specific area or goal]. At [Your Company], we help businesses like yours achieve [specific outcome] through [brief description of your service/product].

For instance, we helped {{Case study}} increase their [relevant metric] by [percentage/result]. I believe we could achieve similar results for {{Company}}.

Could we schedule a brief call to explore this opportunity further?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "pi-2", category: "Pitching", title: "Follow-Up Pitch After Initial Meeting",
    subject: "Next Steps for {{Company}}",
    body: `Hi {{FirstName}},

It was great meeting with you to discuss {{Company}}'s goals. Based on our conversation, I wanted to outline how [Your Company] can help you achieve [specific outcome].

Our approach has helped clients like {{Case study}} see [specific result], and I'm confident we can deliver similar success for {{Company}}.

Let's schedule a follow-up meeting to discuss the next steps.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "pi-3", category: "Pitching", title: "Detailed Proposal Submission",
    subject: "Proposal for {{Company}}",
    body: `Hi {{FirstName}},

Attached is the detailed proposal we discussed for helping {{Company}} achieve [specific outcome]. The proposal outlines our approach, timeline, and expected results.

Our track record with clients like {{Case study}} demonstrates our ability to deliver [specific result].

Please review the proposal and let me know if you have any questions.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "pi-4", category: "Pitching", title: "Pitching a New Idea to an Existing Client",
    subject: "New Idea for {{Company}}",
    body: `Hi {{FirstName}},

Given our ongoing work with {{Company}}, I wanted to propose a new idea that could help you achieve [specific outcome]. By implementing [brief description of the idea], we could enhance [specific aspect] and drive [specific result].

Our experience with {{Case study}} showed impressive results, and I believe we can replicate this success for {{Company}}.

Can we discuss this idea in more detail at your convenience?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "pi-5", category: "Pitching", title: "Requesting a Meeting to Discuss Opportunities",
    subject: "Exploring Opportunities for {{Company}}",
    body: `Hi {{FirstName}},

I'd love to schedule a meeting to discuss potential opportunities for {{Company}} to achieve [specific outcome]. At [Your Company], we specialize in [brief description], which have helped clients like {{Case study}} achieve [specific result].

Could we find a time next week to discuss how we can collaborate?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "pi-6", category: "Pitching", title: "Presenting a Custom Solution",
    subject: "Custom Solution for {{Company}}",
    body: `Hi {{FirstName}},

Based on our discussions and understanding of {{Company}}'s needs, I have developed a custom solution designed to achieve [specific outcome]. This solution leverages [brief description of key features].

Our client {{Case study}} saw [specific result] with a similar approach.

Can we schedule a call to go over the details?

Best,
[Your Name]`,
    variables: commonVars,
  },

  // ── Value Propositions ──
  {
    id: "vp-1", category: "Value Propositions", title: "Introducing a New Service",
    subject: "New Service for {{Company}}",
    body: `Hi {{FirstName}},

Are you facing challenges with [specific problem]? At [Your Company], we've just launched a new service designed to solve [specific problem] for companies like {{Company}}.

Our new service has helped clients like {{Case study}} achieve [specific outcome].

Can we schedule a brief call to discuss how this can benefit {{Company}}?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-2", category: "Value Propositions", title: "Announcing a Product Launch",
    subject: "New Product for {{Company}}",
    body: `Hi {{FirstName}},

Do you struggle with [specific problem]? Our new product, [Product Name], is designed to help companies like {{Company}} overcome these challenges.

With features like [briefly mention key features], it has helped clients like {{Case study}} achieve [specific outcome].

Would you be interested in a demo?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-3", category: "Value Propositions", title: "Special Discount or Promotion",
    subject: "Special Offer for {{Company}}",
    body: `Hi {{FirstName}},

For a limited time, we're offering [specific discount] on our [product/service], designed to help companies like {{Company}} reach their goals.

Clients like {{Case study}} have seen [specific result].

Let's discuss how {{Company}} can take advantage of this offer.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-4", category: "Value Propositions", title: "Highlighting a Unique Selling Proposition",
    subject: "Unique Solution for {{Company}}",
    body: `Hi {{FirstName}},

Is {{Company}} facing [specific problem]? At [Your Company], we offer a unique solution that [briefly describe USP], which leads to [specific benefit].

Our client {{Case study}} experienced [specific outcome] thanks to this approach.

Let's schedule a call to explore how this can benefit {{Company}}.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-5", category: "Value Propositions", title: "Sharing Case Studies or Success Stories",
    subject: "Success stories for {{Company}}",
    body: `Hi {{FirstName}},

Is {{Company}} aiming to achieve [specific outcome]?

Let me share a success story from our client {{Case study}}, who faced similar challenges and achieved [specific result] using our [product/service].

Can we set up a call to discuss how we can replicate these results?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-6", category: "Value Propositions", title: "Sharing Industry Insights",
    subject: "Insights for {{Company}}",
    body: `Hi {{FirstName}},

Are you looking for ways to stay ahead in [industry]? Our latest industry report provides valuable insights that can help {{Company}} achieve [specific benefit].

Clients like {{Case study}} have used these insights to achieve [specific result].

Would you be interested in a brief call to discuss?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "vp-7", category: "Value Propositions", title: "Proposing a Partnership",
    subject: "Partnership Opportunity for {{Company}}",
    body: `Hi {{FirstName}},

I believe there's a great opportunity for {{Company}} and [Your Company] to collaborate on [specific initiative].

Our expertise in [your field] complements your work in [their field], and together we could achieve [specific outcome].

We've successfully partnered with companies like {{Case study}} to achieve [specific result].

Can we schedule a meeting to discuss?

Best,
[Your Name]`,
    variables: commonVars,
  },

  // ── Response Handling ──
  {
    id: "rh-1", category: "Response Handling", title: "When They Ask for More Details",
    subject: "RE: More information",
    body: `Thanks for reaching out and showing interest. I appreciate your request for more information and would love the opportunity to dive deeper into how we can specifically help you achieve [outcome].

To provide relevant and tailored information, a short call would be the most efficient way to understand what you're looking for.

This will NOT be a sales call and is our way of providing you the information you need.

Are you free for 15 minutes tomorrow at [time]?

Best,
[Your Name]`,
    variables: [],
  },
  {
    id: "rh-2", category: "Response Handling", title: "When They Ask About Pricing",
    subject: "RE: Pricing",
    body: `Our pricing varies from $X to $Y.

Whilst I appreciate it can be frustrating, please give us some flexibility as our service is modular and we don't have a fixed price.

I've attached our process and [sales asset/ideally an ROI calculator].

If you're looking to solve [problem] and can share what you need, I can give you a price straight away.

Are you free for 15 minutes tomorrow so I can give you a price?

Best,
[Your Name]`,
    variables: [],
  },

  // ── Objection Handling ──
  {
    id: "oh-1", category: "Objection Handling", title: "Responding to 'Not Interested'",
    subject: "Thanks for Your Feedback, {{FirstName}}",
    body: `Hi {{FirstName}},

Thank you for letting me know. I understand that {{Company}} might not be looking for [specific service] right now.

If circumstances change, please don't hesitate to reach out. We've helped clients like {{Case study}} achieve [specific outcome] and would love the opportunity to do the same for you.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "oh-2", category: "Objection Handling", title: "Responding to 'Already Using a Service'",
    subject: "Quick comparison, {{FirstName}}",
    body: `Hi {{FirstName}},

That's great to hear that {{Company}} is already using [current service]. May I ask when was the last time you did a cost and service comparison?

At [Your Company], we offer a complimentary comparison to help businesses make sure they're getting the best value. Our clients, including {{Case study}}, have found this extremely insightful.

Would you be open to a brief call?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "oh-3", category: "Objection Handling", title: "Responding to 'Send More Information'",
    subject: "More info for {{Company}}",
    body: `Hi {{FirstName}},

I'd be happy to provide more information. Attached is a detailed overview of our [service/product], including case studies from clients like {{Case study}}.

Let me know if you have any questions or if you'd like to schedule a call.

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "oh-4", category: "Objection Handling", title: "Responding to 'Pricing Inquiry'",
    subject: "Pricing details, {{FirstName}}",
    body: `Hi {{FirstName}},

Thank you for your interest. We can provide a ballpark range of [price range] and assure you a minimum ROI of [specific ROI]. However, our pricing is modular and depends on your specific needs.

Could we schedule a call to discuss your needs and provide an exact cost?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "oh-5", category: "Objection Handling", title: "Handling 'No Budget' Objections",
    subject: "Budget-friendly options, {{FirstName}}",
    body: `Hi {{FirstName}},

I understand that budget constraints are a concern for {{Company}}. We've worked with clients like {{Case study}} to deliver significant value while staying within budget.

Could we discuss potential options that might fit your current financial planning?

Best,
[Your Name]`,
    variables: commonVars,
  },
  {
    id: "oh-6", category: "Objection Handling", title: "Handling 'Contact Later' Responses",
    subject: "Staying in touch, {{FirstName}}",
    body: `Hi {{FirstName}},

I understand that now might not be the right time for {{Company}}. When would be a better time to reconnect?

I'll set a reminder to reach out then. In the meantime, if anything changes, please don't hesitate to contact me.

Best,
[Your Name]`,
    variables: commonVars,
  },

  // ── Unique Scenarios ──
  {
    id: "us-1", category: "Unique Scenarios", title: "Outreach to Companies Hiring for Similar Roles",
    subject: "Role {{Vacancy}}",
    body: `Hi {{FirstName}},

I noticed that {{CompanyName}} is currently hiring for a {{Role}}. If we could demonstrate how we're 80% more cost-effective, deliver 60% higher ROI, and cut your risk by 50%, would you be open to exploring us as an alternative?

Here are some success stories:
Company A: 40% increase in qualified leads within three months.
Company B: Reduced lead acquisition costs by 35%.
Company C: 50% boost in conversion rates.

Does it make sense for us to have a quick conversation?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
      { key: "Vacancy", label: "Vacancy Title", placeholder: "SDR Manager" },
      { key: "Role", label: "Role", placeholder: "Sales Development Rep" },
    ],
  },
  {
    id: "us-2", category: "Unique Scenarios", title: "Re-engaging Old Leads",
    subject: "{{FirstName}}, let's reconnect?",
    body: `Hi {{FirstName}},

It's been a while since we last connected. I wanted to see how things have been progressing at {{CompanyName}}.

Since we last spoke, we've achieved some exciting results with our clients. I believe there might be great new opportunities for us to explore together.

Would you be available for a brief catch-up call next week?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "us-3", category: "Unique Scenarios", title: "Inviting Prospects to Webinars",
    subject: "{{FirstName}}, upcoming webinar",
    body: `Hi {{FirstName}},

Did you know that [statistic relevant to their industry]? This is a challenge many companies face, and we're here to help.

We're hosting a webinar where you'll learn how to [specific benefit]. During this session, you will gain insights into:
[Key Takeaway 1]
[Key Takeaway 2]
[Key Takeaway 3]

Would you like us to send you an invite?

Best,
[Your Name]`,
    variables: [{ key: "FirstName", label: "First Name", placeholder: "John" }],
  },
  {
    id: "us-4", category: "Unique Scenarios", title: "Holiday Greetings",
    subject: "Happy {{Occasion}} from [Your Company]",
    body: `Hi {{FirstName}},

As {{Occasion}} approaches, I wanted to wish you and your team at {{CompanyName}} a wonderful {{Occasion}}.

We truly appreciate your partnership and look forward to continuing our collaboration.

Warm regards,
[Your Name]

P.S. If there's anything we can assist with, please don't hesitate to reach out.`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
      { key: "Occasion", label: "Occasion/Holiday", placeholder: "the holidays" },
    ],
  },
  {
    id: "us-5", category: "Unique Scenarios", title: "Asking Clients for Referrals",
    subject: "{{FirstName}}, your help would mean a lot!",
    body: `Hi {{FirstName}},

We've loved working with you and are always looking to help more companies like {{CompanyName}}.

If you know of anyone who could benefit from [specific service], we would be grateful for a referral. As a token of our appreciation, we're offering [specific incentive].

Thank you for your continued trust.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "us-6", category: "Unique Scenarios", title: "Event/Deadline Reminders",
    subject: "Reminder: {{EventName}} on {{Date}}",
    body: `Hi {{FirstName}},

This is a friendly reminder about the upcoming {{EventName}}, scheduled for {{Date}}.

We're looking forward to your participation. If you have any questions, please don't hesitate to contact me.

See you there!

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "EventName", label: "Event Name", placeholder: "Product Launch" },
      { key: "Date", label: "Date", placeholder: "March 15th" },
    ],
  },
  {
    id: "us-7", category: "Unique Scenarios", title: "Company News Announcement",
    subject: "Exciting News from [Your Company]",
    body: `Hi {{FirstName}},

I'm thrilled to share some exciting news! [Briefly describe the news].

This development represents a significant step forward, and we're eager to see how it can benefit your business.

Thank you for being a valued part of our journey.

Best,
[Your Name]`,
    variables: [{ key: "FirstName", label: "First Name", placeholder: "John" }],
  },

  // ── Offer-Specific ──
  {
    id: "os-1", category: "Offer-Specific", title: "Paid Ads",
    subject: "{{Company}}'s ad performance",
    body: `Hi {{FirstName}},

We saw you were running paid ads and typically spend {{Amount}}.

If you're not seeing {{ROAS}} we can help you realise a {{ROAS}} guaranteed.

We've done this for {{Case study}}.

Can we send you a case study showing you how?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Amount", label: "Ad Spend", placeholder: "$10k/month" },
      { key: "ROAS", label: "Target ROAS", placeholder: "5x ROAS" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
    ],
  },
  {
    id: "os-2", category: "Offer-Specific", title: "SaaS Product",
    subject: "Quick demo for {{Company}}?",
    body: `Hi {{FirstName}},

{{Problem}} is a challenge many companies in {{Industry}} face, and our product solves it.

We've helped clients like {{Case study}} achieve {{Outcome}}.

Would you be interested in a quick demo?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Problem", label: "Problem", placeholder: "Managing customer data" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
      { key: "Outcome", label: "Outcome", placeholder: "40% more conversions" },
    ],
  },
  {
    id: "os-3", category: "Offer-Specific", title: "Email Marketing",
    subject: "{{Company}}'s email performance",
    body: `Hi {{FirstName}},

Did you know that 60% of marketing emails go unopened? This leads to an average of 23% in lost revenue.

At [Your Company], we offer an email marketing service that guarantees a 65% open rate and a 5% conversion rate.

We have helped {{Case study}} achieve outstanding results.

Could we show you our 4-step process?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
    ],
  },
  {
    id: "os-4", category: "Offer-Specific", title: "SEO Services",
    subject: "{{Company}}'s traffic",
    body: `Hi {{FirstName}},

We see that {{Company}} gets {{Visitors}} visitors every month.

We guarantee to triple this within 30 days or you don't pay — which based on industry averages would lead to a 42% increase in sales.

We've done this for 25+ clients including {{Case study}}.

Can we help you get 42% more sales?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Visitors", label: "Monthly Visitors", placeholder: "5,000" },
      { key: "Case study", label: "Case Studies", placeholder: "Company A, Company B" },
    ],
  },
  {
    id: "os-5", category: "Offer-Specific", title: "Website Design",
    subject: "{{CompanyName}}'s website",
    body: `Hi {{FirstName}},

Did you know that 75% of customers judge a company's credibility based on its website design? This leads to 40% in lost revenue.

Can we share with you the 3 things we would do to improve {{CompanyName}}'s website which we guarantee would increase your sales by 40%?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "os-6", category: "Offer-Specific", title: "Content Marketing",
    subject: "{{Company}}'s content strategy",
    body: `Hi {{FirstName}},

Did you know that companies with an active blog generate 67% more leads?

At [Your Company], we provide content marketing services that increase pipeline by 45%.

Our clients, including {{Case study}}, have seen {{Result}}.

We created a blog around {{Topic}} for you — can we share it?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
      { key: "Result", label: "Result", placeholder: "3x more inbound leads" },
      { key: "Topic", label: "Blog Topic", placeholder: "sales automation" },
    ],
  },

  // ── Nurturing Sequences ──
  {
    id: "ns-1", category: "Nurturing Sequences", title: "5-Email Nurturing Sequence",
    subject: "{{CompanyName}}'s growth opportunity",
    body: `This is a 5-email lead nurturing sequence (sent 14 days apart over 8 weeks).

── Email 1: Introduction ──
Subject: {{CompanyName}}'s [topic]

Hi {{FirstName}},
My name's [Name] from [Your Company]. We help brands [your value proposition].

[Explain what your solution is and why it matters — 2-3 short paragraphs]

If this is something you'd be interested in implementing for {{CompanyName}}, happy to arrange a quick chat.

Kind regards, [Name]

── Email 2: Value Content ──
Subject: 7 ways to improve {{CompanyName}}'s [area]

Hi {{FirstName}},
Here are 7 ways to improve [area]:
1 - [Tip 1]  2 - [Tip 2]  3 - [Tip 3]  4 - [Tip 4]
5 - [Tip 5]  6 - [Tip 6]  7 - [Tip 7]

Kind regards, [Name]

── Email 3: Deeper Education ──
Subject: 6 things a good [solution] does

Hi {{FirstName}},
Here are 6 things a good [solution] should do:
1 - [Point 1]  2 - [Point 2]  3 - [Point 3]
4 - [Point 4]  5 - [Point 5]  6 - [Point 6]

Kind regards, [Name]

── Email 4: Actionable Tips ──
Subject: Top 8 ways to [achieve outcome]

Hi {{FirstName}},
1-8 actionable tips relevant to their goals.

Kind regards, [Name]

── Email 5: Direct Ask ──
Subject: {{CompanyName}} + [Your Company]

Hi {{FirstName}},
Over the past couple of months, I have highlighted the importance of [your solution].

Having recently worked with [list of clients], I would love to talk about how we could do this for {{CompanyName}} too.

Do you have 15 minutes this week?
Kind regards, [Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
];

// Combine all templates
const templates: EmailTemplate[] = [
  ...coreTemplates,
  ...hunterTemplates,
  ...saleshandyTemplates,
  ...lemlistTemplates,
  ...klentyTemplates,
  ...expertFrameworkTemplates,
  ...linkedinDmTemplates,
];

const templateCategories = [...new Set(templates.map((t) => t.category))];

const EmailTemplateLibrary = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const setVal = (templateId: string, key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [templateId]: { ...prev[templateId], [key]: value },
    }));
  };

  const fillTemplate = (template: EmailTemplate) => {
    let text = `Subject: ${template.subject}\n\n${template.body}`;
    const vals = values[template.id] || {};
    for (const v of template.variables) {
      const regex = new RegExp(`\\{\\{${v.key}\\}\\}`, "g");
      text = text.replace(regex, vals[v.key] || `{{${v.key}}}`);
    }
    return text;
  };

  const copyTemplate = (template: EmailTemplate) => {
    navigator.clipboard.writeText(fillTemplate(template));
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredTemplates = templates.filter((t) => {
    const matchesCat = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <ToolLayout title="Email Template Library" description={`${templates.length}+ ready-to-use email templates from top sources. Fill in your details, preview, and copy.`}>
      {/* Search & Category Tabs */}
      <div className="mb-6">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
          >
            All ({templates.length})
          </button>
          {templateCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
            >
              {cat} ({templates.filter((t) => t.category === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Template Cards */}
      <div className="space-y-3">
        {filteredTemplates.map((template) => {
          const isExpanded = expandedId === template.id;
          const vals = values[template.id] || {};

          return (
            <div key={template.id} className="border rounded-lg bg-card overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : template.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-accent/30 transition-colors"
              >
                <div className="min-w-0">
                  <span className="text-xs font-medium text-muted-foreground">{template.category}</span>
                  <h3 className="font-medium text-sm mt-0.5">{template.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">Subject: {template.subject}</p>
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t p-4">
                  {/* Variable Inputs */}
                  {template.variables.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Fill in your details</p>
                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {template.variables.map((v) => (
                          <div key={v.key}>
                            <label className="text-xs text-muted-foreground">{v.label}</label>
                            <input
                              type="text"
                              placeholder={v.placeholder}
                              value={vals[v.key] || ""}
                              onChange={(e) => setVal(template.id, v.key, e.target.value)}
                              className="w-full h-9 px-3 rounded-md border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring mt-1"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="bg-secondary/50 rounded-lg p-4 mb-3">
                    <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed text-foreground">
                      {fillTemplate(template)}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyTemplate(template)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {copiedId === template.id ? <><Check className="h-4 w-4" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy Email</>}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredTemplates.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No templates found.</p>
        )}
      </div>
    </ToolLayout>
  );
};

export default EmailTemplateLibrary;
