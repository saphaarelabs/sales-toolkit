import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { Copy, Check, ChevronDown, ChevronUp, Search } from "lucide-react";

interface TemplateVariable {
  key: string;
  label: string;
  placeholder: string;
}

interface EmailTemplate {
  id: string;
  title: string;
  subject: string;
  body: string;
  category: string;
  variables: TemplateVariable[];
}

const commonVars: TemplateVariable[] = [
  { key: "FirstName", label: "First Name", placeholder: "John" },
  { key: "Company", label: "Company", placeholder: "Acme Inc" },
  { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
];

const templates: EmailTemplate[] = [
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "co-7", category: "Cold Outreach", title: "Cold Outreach to Decision-Makers",
    subject: "{{FirstName}}, {{Industry}} Growth",
    body: `Hi {{FirstName}},

I see that {{Company}} is a key player in the {{Industry}} industry. At [Your Company], we've helped businesses like {{Case study}} achieve [specific outcome] with our [service/product].

I believe we could help {{Company}} enhance its performance and achieve similar results.

Can we set up a brief call next week to discuss this?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [...commonVars, { key: "Industry", label: "Industry", placeholder: "healthcare" }],
  },

  // ── Follow-Up Emails ──
  {
    id: "fu-1", category: "Follow-Up Emails", title: "Follow-Up After Initial Contact",
    subject: "Following up, {{FirstName}}",
    body: `Hi {{FirstName}},

I wanted to follow up on my previous email regarding how [Your Company] can help {{Company}} achieve [specific outcome]. Our experience with clients like {{Case study}} shows we can deliver [specific result].

Would you be available for a quick call next week to discuss this further?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "fu-2", category: "Follow-Up Emails", title: "Follow-Up After Sending a Proposal",
    subject: "Proposal follow-up, {{FirstName}}",
    body: `Hi {{FirstName}},

I hope you had a chance to review the proposal I sent last week. As outlined, our approach can help {{Company}} achieve [specific outcome] effectively.

I'd love to discuss any questions or feedback you might have. Can we set up a call to go over the details?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "fu-3", category: "Follow-Up Emails", title: "Follow-Up After a Meeting or Call",
    subject: "Great Meeting with {{Company}}",
    body: `Hi {{FirstName}},

It was great speaking with you about {{Company}}'s goals and how we can help achieve them. I wanted to recap our discussion and highlight how our solutions can deliver [specific outcome].

Let's schedule a follow-up call to dive deeper into the specifics and next steps.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "pi-3", category: "Pitching", title: "Detailed Proposal Submission",
    subject: "Proposal for {{Company}}",
    body: `Hi {{FirstName}},

Attached is the detailed proposal we discussed for helping {{Company}} achieve [specific outcome]. The proposal outlines our approach, timeline, and expected results.

Our track record with clients like {{Case study}} demonstrates our ability to deliver [specific result].

Please review the proposal and let me know if you have any questions or if we can schedule a time to discuss it further.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "pi-5", category: "Pitching", title: "Requesting a Meeting to Discuss Opportunities",
    subject: "Exploring Opportunities for {{Company}}",
    body: `Hi {{FirstName}},

I'd love to schedule a meeting to discuss potential opportunities for {{Company}} to achieve [specific outcome]. At [Your Company], we specialize in [brief description of your services/products], which have helped clients like {{Case study}} achieve [specific result].

Could we find a time next week to discuss how we can collaborate to reach {{Company}}'s goals?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "pi-6", category: "Pitching", title: "Presenting a Custom Solution",
    subject: "Custom Solution for {{Company}}",
    body: `Hi {{FirstName}},

Based on our discussions and understanding of {{Company}}'s needs, I have developed a custom solution designed to achieve [specific outcome]. This solution leverages [brief description of key features or approaches].

Our client {{Case study}} saw [specific result] with a similar approach, and I believe we can deliver similar success for {{Company}}.

Can we schedule a call to go over the details and address any questions you might have?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },

  // ── Value Propositions ──
  {
    id: "vp-1", category: "Value Propositions", title: "Introducing a New Service",
    subject: "New Service for {{Company}}",
    body: `Hi {{FirstName}},

Are you facing challenges with [specific problem]? At [Your Company], we've just launched a new service designed to solve [specific problem] for companies like {{Company}}.

Our new service has helped clients like {{Case study}} achieve [specific outcome], and we believe it can do the same for {{Company}}.

Can we schedule a brief call to discuss how this new service can benefit {{Company}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-2", category: "Value Propositions", title: "Announcing a Product Launch",
    subject: "New Product for {{Company}}",
    body: `Hi {{FirstName}},

Do you struggle with [specific problem]? Our new product, [Product Name], is designed to help companies like {{Company}} overcome these challenges effectively.

With features like [briefly mention key features], it has helped clients like {{Case study}} achieve [specific outcome].

Would you be interested in a demo to see how it can benefit {{Company}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-3", category: "Value Propositions", title: "Special Discount or Promotion",
    subject: "Special Offer for {{Company}}",
    body: `Hi {{FirstName}},

Are you looking to achieve [specific outcome]? For a limited time, we're offering [specific discount or promotion] on our [product/service], designed to help companies like {{Company}} reach their goals.

Clients like {{Case study}} have seen [specific result] using our [product/service].

Let's discuss how {{Company}} can take advantage of this offer.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-4", category: "Value Propositions", title: "Highlighting a Unique Selling Proposition",
    subject: "Unique Solution for {{Company}}",
    body: `Hi {{FirstName}},

Is {{Company}} facing [specific problem]? At [Your Company], we offer a unique solution that [briefly describe unique selling proposition], which leads to [specific benefit].

Our client {{Case study}} experienced [specific outcome] thanks to this unique approach.

Let's schedule a call to explore how this can benefit {{Company}}.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-5", category: "Value Propositions", title: "Sharing Case Studies or Success Stories",
    subject: "Success stories for {{Company}}",
    body: `Hi {{FirstName}},

Is {{Company}} aiming to achieve [specific outcome]?

Let me share a success story from our client {{Case study}}, who faced similar challenges and achieved [specific result] using our [product/service].

This demonstrates how we can help {{Company}} achieve [desired outcome] as well.

Can we set up a call to discuss how we can replicate these results for {{Company}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-6", category: "Value Propositions", title: "Sharing Industry Insights",
    subject: "Insights for {{Company}}",
    body: `Hi {{FirstName}},

Are you looking for ways to stay ahead in [industry]? Our latest industry report on [topic] provides valuable insights that can help {{Company}} achieve [specific benefit].

Clients like {{Case study}} have used these insights to achieve [specific result].

Would you be interested in a brief call to discuss how these insights can benefit {{Company}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "vp-7", category: "Value Propositions", title: "Proposing a Partnership",
    subject: "Partnership Opportunity for {{Company}}",
    body: `Hi {{FirstName}},

Are you looking to achieve [specific outcome]? I believe there's a great opportunity for {{Company}} and [Your Company] to collaborate on [specific initiative].

Our expertise in [your field] complements your work in [their field], and together we could achieve [specific outcome].

We've successfully partnered with companies like {{Case study}} to achieve [specific result].

Can we schedule a meeting to discuss how we can work together?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },

  // ── Response Handling ──
  {
    id: "rh-1", category: "Response Handling", title: "When They Ask for More Details",
    subject: "RE: More information",
    body: `Thanks for reaching out and showing interest in [Your Company/Service/Product]. I appreciate your request for more information and would love the opportunity to dive deeper into how we can specifically help you achieve [outcome].

To be able to provide relevant and tailored information, a short call would be the most efficient way to understand what information you're looking for.

This will NOT be a sales call and is our way of providing you the information you need to understand if we're worth continuing to talk to or not.

Are you free for 15 minutes tomorrow at [time]?

Best,
[Your Name]`,
    variables: [],
  },
  {
    id: "rh-2", category: "Response Handling", title: "When They Ask About Pricing",
    subject: "RE: Pricing",
    body: `Our pricing varies from $X to $Y.

Whilst I appreciate it can be frustrating, please give us some flexibility as our service is modular and we don't have an off-the-shelf service, meaning we don't have a fixed price.

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

If circumstances change or if there's another way we can support {{Company}}, please don't hesitate to reach out. We've helped clients like {{Case study}} achieve [specific outcome] and would love the opportunity to do the same for you.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-2", category: "Objection Handling", title: "Responding to 'Already Using a Service'",
    subject: "Quick comparison, {{FirstName}}",
    body: `Hi {{FirstName}},

That's great to hear that {{Company}} is already using [current service]. May I ask when was the last time you did a cost and service comparison to ensure you're getting the best value?

At [Your Company], we offer a complimentary cost and service comparison to help businesses like yours make sure they're receiving optimal benefits. Our clients, including {{Case study}}, have found this comparison extremely insightful and have achieved [specific outcome] as a result.

Would you be open to a brief call to discuss this and see how we might enhance your current setup?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-3", category: "Objection Handling", title: "Responding to 'Send More Information'",
    subject: "More info for {{Company}}",
    body: `Hi {{FirstName}},

I'd be happy to provide more information about how [Your Company] can help {{Company}} achieve [specific outcome]. Attached is a detailed overview of our [service/product], including case studies and results from clients like {{Case study}}.

Let me know if you have any questions or if you'd like to schedule a call to discuss this further.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-4", category: "Objection Handling", title: "Responding to 'Pricing Inquiry'",
    subject: "Pricing details, {{FirstName}}",
    body: `Hi {{FirstName}},

Thank you for your interest in our services. We can provide a ballpark range of [price range] and assure you that you will receive a minimum ROI of [specific ROI]. However, our pricing is modular and depends on your specific needs and requirements.

Could we schedule a call to discuss your needs in more detail and provide you with an exact cost?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-5", category: "Objection Handling", title: "Responding to 'Schedule a Call'",
    subject: "Let's talk, {{FirstName}}",
    body: `Hi {{FirstName}},

Great to hear that you're interested in scheduling a call. How about [suggest two possible dates and times]?

During the call, we can discuss how [Your Company] can help {{Company}} achieve [specific outcome], drawing from our success with clients like {{Case study}}.

Looking forward to speaking with you.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-6", category: "Objection Handling", title: "Handling 'No Budget' Objections",
    subject: "Budget-friendly options, {{FirstName}}",
    body: `Hi {{FirstName}},

I understand that budget constraints are a concern for {{Company}}. We've worked with clients like {{Case study}} to deliver significant value while staying within budget.

Could we discuss potential options that might fit your current financial planning and still help you achieve [specific outcome]?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },
  {
    id: "oh-7", category: "Objection Handling", title: "Handling 'Contact Later' Responses",
    subject: "Staying in touch, {{FirstName}}",
    body: `Hi {{FirstName}},

I understand that now might not be the right time for {{Company}}. When would be a better time to reconnect about how we can help you achieve [specific outcome]?

I'll set a reminder to reach out then. In the meantime, if anything changes, please don't hesitate to contact me.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: commonVars,
  },

  // ── Unique Scenarios ──
  {
    id: "us-1", category: "Unique Scenarios", title: "Outreach to Companies Hiring for Similar Roles",
    subject: "Role {{Vacancy}}",
    body: `Hi {{FirstName}},

I noticed that {{CompanyName}} is currently hiring for a {{Role}}. If we could demonstrate how we're 80% more cost-effective, deliver 60% higher ROI, and cut your risk and opportunity cost by 50%, would you be open to exploring us as an alternative?

Here are some success stories from our clients:

Company A: Achieved a 40% increase in qualified leads within three months.
Company B: Reduced lead acquisition costs by 35%.
Company C: Experienced a 50% boost in conversion rates.

Does it make sense for us to have a quick conversation to see how we can achieve similar results for {{CompanyName}}?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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

I hope this email finds you well. It's been a while since we last connected, and I wanted to reach out to see how things have been progressing at {{CompanyName}}.

Since we last spoke, we've achieved some exciting results with our clients, including [specific achievement or case study]. I believe there might be some great new opportunities for us to explore together.

Would you be available for a brief catch-up call next week? I'd love to hear more about your current priorities and see how we can assist you in achieving your goals.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "us-3", category: "Unique Scenarios", title: "Inviting Prospects to Webinars",
    subject: "{{FirstName}}, upcoming webinar",
    body: `Hi {{FirstName}},

Did you know that [statistic relevant to their industry]? This is a challenge many companies in [industry] face, and we're here to help.

We're hosting a webinar where you'll learn how to [specific benefit or solution]. During this session, you will gain insights into:

[Key Takeaway 1]
[Key Takeaway 2]
[Key Takeaway 3]

Would you like us to send you an invite?

Looking forward to your response.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [{ key: "FirstName", label: "First Name", placeholder: "John" }],
  },
  {
    id: "us-4", category: "Unique Scenarios", title: "Holiday Greetings",
    subject: "Happy {{Occasion}} from [Your Company]",
    body: `Hi {{FirstName}},

As {{Occasion}} approaches, I wanted to take a moment to wish you and your team at {{CompanyName}} a wonderful {{Occasion}}.

We truly appreciate your partnership and look forward to continuing our successful collaboration in the coming year.

Warm regards,
[Your Name]
[Your Position]
[Your Contact Information]

P.S. If there's anything we can assist with during this time, please don't hesitate to reach out.`,
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

I hope you're doing well. We've loved working with you and are always looking to help more companies like {{CompanyName}}.

If you know of anyone who could benefit from [specific service], we would be immensely grateful for a referral. As a token of our appreciation, we're offering [specific incentive, if applicable].

Thank you in advance for considering this, and for your continued trust in our services.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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

We're looking forward to your participation and hope you're as excited as we are. If you have any questions or need further information, please don't hesitate to contact me.

See you there!

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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

I'm thrilled to share some exciting news with you! [Briefly describe the news or update, e.g., a new product launch, a recent achievement, a company milestone].

This development represents a significant step forward for us, and we're eager to see how it can benefit your business. [Include any relevant details or next steps].

Thank you for being a valued part of our journey. If you have any questions or would like to learn more, please feel free to reach out.

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
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
[Your Name]
[Your Position]
[Your Contact Information]`,
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

Our product consistently delivers {{Result}}, and we believe it can do the same for {{Company}}.

Would you be interested in a quick demo?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Problem", label: "Problem Statement", placeholder: "Managing customer data" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
      { key: "Outcome", label: "Outcome", placeholder: "40% more conversions" },
      { key: "Result", label: "Result", placeholder: "significant ROI" },
    ],
  },
  {
    id: "os-3", category: "Offer-Specific", title: "Pay-Per-Call Lead Gen",
    subject: "Qualified calls for {{Company}}",
    body: `Hi {{FirstName}},

Most businesses simply aren't aware that [industry stat]. We have developed a specific approach that communicates your value, and on average we generate {{Result}} for our clients.

We are confident that our process will add significant value to your outbound pipeline.

Can we show you how we helped {{Case study}} generate outstanding results?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Result", label: "Result", placeholder: "23 meetings/month" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
    ],
  },
  {
    id: "os-4", category: "Offer-Specific", title: "Monthly Retainer Lead Gen",
    subject: "{{Company}}'s pipeline",
    body: `Hi {{FirstName}},

If we could connect you with 25 prospects you'd love to work with every month and guarantee to 10x your pipeline within 60 days, would that be worth a 15-minute call on Tuesday?

We helped {{CaseStudy1}} generate {{Result1}} and {{CaseStudy2}} generate {{Result2}}.

Best,
[Your Name]

P.S. We would love to share the exact process we followed.`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "CaseStudy1", label: "Case Study 1", placeholder: "Company A" },
      { key: "Result1", label: "Result 1", placeholder: "$200K pipeline" },
      { key: "CaseStudy2", label: "Case Study 2", placeholder: "Company B" },
      { key: "Result2", label: "Result 2", placeholder: "$150K pipeline" },
    ],
  },
  {
    id: "os-5", category: "Offer-Specific", title: "Email Marketing",
    subject: "{{Company}}'s email performance",
    body: `Hi {{FirstName}},

Did you know that 60% of marketing emails go unopened? This leads to an average of 23% in lost revenue.

At [Your Company], we offer an email marketing service that guarantees a 65% open rate and a 5% conversion rate, leading to an uplift in revenue of 43%.

We have helped {{Case study}} achieve outstanding results.

Could we show you our 4-step process to increase revenue from your email marketing?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
    ],
  },
  {
    id: "os-6", category: "Offer-Specific", title: "Funnel Building",
    subject: "{{CompanyName}}'s funnel",
    body: `Hi {{FirstName}},

Did you know that 80% of leads drop off before making a purchase due to inefficient sales funnels?

At [Your Company], we're offering a free audit on {{CompanyName}}'s funnel and we guarantee our audit will lead to at least a 5% increase in sales.

This is a complimentary offer, no catch.

Can we arrange a time to speak?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "os-7", category: "Offer-Specific", title: "Social Media Management",
    subject: "{{CompanyName}}'s social presence",
    body: `Hi {{FirstName}},

We saw {{CompanyName}}'s last LinkedIn post was [date]. Did you know that businesses with active social media presence see a 22% increase in customer loyalty?

We offer a done-for-you social media management service and we guarantee to increase your following by 35% across all channels within 40 days.

Can we send you the exact process we used to generate {{Result}} for {{SimilarCompany}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
      { key: "Result", label: "Result", placeholder: "10K followers" },
      { key: "SimilarCompany", label: "Similar Company", placeholder: "ClientCo" },
    ],
  },
  {
    id: "os-8", category: "Offer-Specific", title: "Lead Gen Systems Build-Out",
    subject: "{{Company}}'s lead gen",
    body: `Hi {{FirstName}},

Did you know that 50% of companies struggle with generating quality leads consistently and 30% have already outsourced lead generation but been unhappy with the results?

We build lead generation systems for our clients in-house and train their teams to run them — meaning you're in control of a scalable asset that generates leads consistently.

{{Case study}}.

Can we show you the exact process we use and how it works?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "We helped Company A generate 200+ leads/month" },
    ],
  },
  {
    id: "os-9", category: "Offer-Specific", title: "SEO Services",
    subject: "{{Company}}'s traffic",
    body: `Hi {{FirstName}},

We see that {{Company}} gets {{Visitors}} visitors every month.

We guarantee to triple this within 30 days or you don't pay — which based on industry averages would lead to a 42% increase in sales.

We've done this for 25+ clients including {{Case study}}.

Can we help you get 42% more sales?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Visitors", label: "Monthly Visitors", placeholder: "5,000" },
      { key: "Case study", label: "Case Studies", placeholder: "Company A, Company B" },
    ],
  },
  {
    id: "os-10", category: "Offer-Specific", title: "Website Design",
    subject: "{{CompanyName}}'s website",
    body: `Hi {{FirstName}},

Did you know that 75% of customers admit to making judgments on a company's credibility based on its website design? This on average leads to 40% in lost revenue.

Can we share with you the 3 things that we would do to improve {{CompanyName}}'s website which we guarantee would increase your sales by 40%?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "os-11", category: "Offer-Specific", title: "Content Marketing",
    subject: "{{Company}}'s content strategy",
    body: `Hi {{FirstName}},

Did you know that companies with an active blog generate 67% more leads than those without one?

At [Your Company], we provide content marketing services that increase pipeline by 45%.

Our clients, including {{Case study}}, have seen {{Result}}.

We created a blog around {{Topic}} for you — can we share it?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
      { key: "Result", label: "Result", placeholder: "3x more inbound leads" },
      { key: "Topic", label: "Blog Topic", placeholder: "sales automation" },
    ],
  },
  {
    id: "os-12", category: "Offer-Specific", title: "Consulting Services",
    subject: "Consulting for {{Company}}",
    body: `Hi {{FirstName}},

Did you know that businesses using consulting services see an average 30% improvement in operational efficiency?

At [Your Company], we offer consulting services that drive growth and operational efficiency by 30%. Our clients, including {{Case study}}, have experienced significant improvements in their business processes and outcomes.

Would you be open to a brief call to discuss how our consulting services can benefit {{Company}}?

Best,
[Your Name]
[Your Position]
[Your Contact Information]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Case study", label: "Case Study", placeholder: "ClientCo" },
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
1 - [Tip 1]
2 - [Tip 2]
3 - [Tip 3]
4 - [Tip 4]
5 - [Tip 5]
6 - [Tip 6]
7 - [Tip 7]

If you'd like to know more, please feel free to let me know.
Kind regards, [Name]

── Email 3: Deeper Education ──
Subject: 6 things a good [solution] does

Hi {{FirstName}},
In my last email, I covered 7 ways to improve. Now here are 6 things a good [solution] should do:
1 - [Point 1]
2 - [Point 2]
3 - [Point 3]
4 - [Point 4]
5 - [Point 5]
6 - [Point 6]

Interested in learning how we do this for {{CompanyName}}? Let's chat.
Kind regards, [Name]

── Email 4: Actionable Tips ──
Subject: Top 8 ways to [achieve outcome]

Hi {{FirstName}},
Here are the top 8 ways:
1 - [Way 1]  2 - [Way 2]  3 - [Way 3]  4 - [Way 4]
5 - [Way 5]  6 - [Way 6]  7 - [Way 7]  8 - [Way 8]

Are these things you'd like to implement for {{CompanyName}}?
Kind regards, [Name]

── Email 5: Direct Ask ──
Subject: {{CompanyName}} + [Your Company]

Hi {{FirstName}},
Over the past couple of months, I have highlighted the importance of [your solution] and how [Your Company] can implement it for {{CompanyName}}.

Having recently worked with [list of clients], I would love to talk about how we could do this for {{CompanyName}} too.

Do you have 15 minutes this week or next to discuss this further?
Kind regards, [Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company Name", placeholder: "Acme Inc" },
    ],
  },

  // ── Hunter.io Templates ──
  {
    id: "hu-1", category: "Hunter.io", title: "Help with Pain Point",
    subject: "Can I help with {{PainPoint}}?",
    body: `Hi {{FirstName}},

I want to reach out and ask how everything is going at {{Company}}? How is your current solution working out for you?

We've recently added some new features to our software that I believe would be really helpful for {{PainPoint}}. If you would be interested in a quick chat or demo this week, please let me know or if there are any other ways we can help {{Company}}.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "PainPoint", label: "Pain Point", placeholder: "managing customer data" },
    ],
  },
  {
    id: "hu-2", category: "Hunter.io", title: "Solution for Challenge",
    subject: "Solution for {{Challenge}}",
    body: `Hi {{FirstName}},

In working with other {{Industry}} professionals, one of the key issues they're struggling with is {{Challenge}}.

This past year we helped numerous companies to {{BusinessDriver}}, resulting in {{Results}}.

If this is something you're challenged with too, let's set up a quick call. I have some ideas that might help.

All the best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Industry", label: "Industry/Position", placeholder: "SaaS founders" },
      { key: "Challenge", label: "Challenge", placeholder: "scaling outbound" },
      { key: "BusinessDriver", label: "Business Driver", placeholder: "automate outreach" },
      { key: "Results", label: "Results Achieved", placeholder: "50% more meetings booked" },
    ],
  },
  {
    id: "hu-3", category: "Hunter.io", title: "Right Person to Talk To",
    subject: "Right person at {{Company}}?",
    body: `Hi {{FirstName}},

I hope this note finds you well.

I've been working for a company called [Your Company] that specializes in {{Service}}.

In thinking about your role at {{Company}}, I thought there might be a good fit for your group.

Our {{Product}} has garnered a lot of attention in the marketplace and I think it's something that your organization might see immediate value in.

Can you help me get in contact with the right decision-maker?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Service", label: "Your Service", placeholder: "sales automation" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "hu-4", category: "Hunter.io", title: "Referral Introduction",
    subject: "Reaching out via {{ReferralName}}",
    body: `Hi {{FirstName}},

My name is [Your Name], I was given your name by {{ReferralName}}. I run a {{Industry}} business and it sounds like we could benefit from knowing one another!

I browsed through your site — love {{SiteCompliment}}.

If you ever want to meet up for coffee or have a phone/video chat to exchange ideas, let me know!

Have a great rest of your week,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ReferralName", label: "Referral Name", placeholder: "Sarah" },
      { key: "Industry", label: "Industry", placeholder: "marketing" },
      { key: "SiteCompliment", label: "What You Like", placeholder: "the clean design" },
    ],
  },
  {
    id: "hu-5", category: "Hunter.io", title: "Solve Their Problem",
    subject: "Solve {{Problem}}",
    body: `Dear {{FirstName}},

Do you struggle with {{Problem}}? {{ProblemDetail}}

Here at [Your Company], we've helped many other businesses deal with this problem by {{Solution}}. Businesses we've worked with have seen {{Evidence}} as the result of our product.

Would you like to speak to me and learn more about how we can help? Let's set up a phone call soon.

Warm regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Problem", label: "Problem", placeholder: "low email open rates" },
      { key: "ProblemDetail", label: "Problem Detail", placeholder: "Getting prospects to open cold emails is harder than ever." },
      { key: "Solution", label: "Your Solution", placeholder: "AI-powered subject line optimization" },
      { key: "Evidence", label: "Evidence/Results", placeholder: "3x improvement in open rates" },
    ],
  },
  {
    id: "hu-6", category: "Hunter.io", title: "Guest Post / Collaboration",
    subject: "Quick collaboration with {{Company}}",
    body: `Hi {{FirstName}},

I just came across your article {{ArticleURL}} and wanted to explore the possibility of featuring our blog in it.

Would you mind sharing the criteria for featuring a blog/resource in your article?

Also, whatever we can do in return… just name it.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ArticleURL", label: "Article URL", placeholder: "https://example.com/post" },
    ],
  },

  // ── Saleshandy Templates ──
  {
    id: "sh-1", category: "Saleshandy", title: "The Startup Technique",
    subject: "{{FirstName}}, do you need help with {{Solution}}?",
    body: `Hello {{FirstName}},

Have your employees at {{Company}} been dealing with {{Problem}} currently?

I'm from [Your Company] and I'm working with dozens of companies from your field, like {{Examples}} to make sure their {{Problem}} is resolved on a daily basis because of our {{Service}}.

Trust me, I know you might not have an easy day as the {{Position}} and your schedule might be as busy as it gets, but how about we settle for a quick call for later? We might get to the bottom of this and eradicate the problem forever.

Cheers!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Solution", label: "Solution Area", placeholder: "email marketing" },
      { key: "Problem", label: "Problem", placeholder: "low deliverability" },
      { key: "Examples", label: "Example Companies", placeholder: "CompanyA, CompanyB" },
      { key: "Service", label: "Your Service", placeholder: "email automation tools" },
      { key: "Position", label: "Their Position", placeholder: "Head of Marketing" },
    ],
  },
  {
    id: "sh-2", category: "Saleshandy", title: "The Problem Solver",
    subject: "{{FirstName}}, we have the answer to your problem!",
    body: `Hey there {{FirstName}},

Do you feel like you could use a break right about now? As a business professional myself, I can totally resonate with you.

Our {{Product}} has helped many entrepreneurs like yourself save a lot of time and stay on top of things! I myself have saved around {{TimeSaved}} per week by setting up {{Process}}.

Do you want to save time as well? If you do, then we can set up a demo call.

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
      { key: "TimeSaved", label: "Time Saved", placeholder: "5 hours" },
      { key: "Process", label: "Process", placeholder: "automated email campaigns" },
    ],
  },
  {
    id: "sh-3", category: "Saleshandy", title: "The Elevator Pitch",
    subject: "{{FirstName}}, this is perfect for you!",
    body: `Hi {{FirstName}},

I know you're probably busy so I am going to make this fast. I want to ask you a simple question: {{Question}}?

Well, that is exactly what we at [Your Company] aim to resolve for our customers. The reason {{Product}} will be a perfect fit for you is because {{Reasons}}.

The majority of our customers have mentioned {{Metric}} after using our services. Do you think this is something you are interested in?

Let me know and I will set up a personal product demo call for you.

Have an awesome day!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Question", label: "Key Question", placeholder: "Do you struggle with tracking email opens?" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
      { key: "Reasons", label: "Key Reasons", placeholder: "it automates follow-ups and tracks engagement" },
      { key: "Metric", label: "Customer Metric", placeholder: "a 40% increase in reply rates" },
    ],
  },
  {
    id: "sh-4", category: "Saleshandy", title: "The Content Technique",
    subject: "Your article about {{ArticleTitle}}",
    body: `Hey {{FirstName}}!

I happened to read your article on your blog about {{ArticleTitle}}. I loved the way you talked about it, mainly when you detailed {{WhatYouLiked}}.

I work at a company called [Your Company] and we like to help other businesses in {{Area}} like {{Examples}} achieve their goals with our {{Solution}}.

If you're also seeking some help in those areas, I have a few ideas for how you can get past your issues. How do you feel about a quick call this afternoon?

Thank you!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ArticleTitle", label: "Article Title", placeholder: "scaling outbound sales" },
      { key: "WhatYouLiked", label: "What You Liked", placeholder: "the data-driven approach" },
      { key: "Area", label: "Area", placeholder: "email marketing" },
      { key: "Examples", label: "Example Companies", placeholder: "CompanyA, CompanyB" },
      { key: "Solution", label: "Your Solution", placeholder: "email tracking tools" },
    ],
  },
  {
    id: "sh-5", category: "Saleshandy", title: "Competitor Differentiation",
    subject: "{{FirstName}}, we have just the thing for you!",
    body: `Hello {{FirstName}},

How are you doing? I recently visited your website and I noticed you were using {{CompetitorProduct}}.

Our organization also specializes in {{YourProduct}}. However, we have {{Differentiators}}.

I am sharing a few links with you so you can understand what makes us different:
[Link 1]
[Link 2]

What do you think? If you are interested, let me know and I can set up a demo call for you with my team.

Have a great day!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompetitorProduct", label: "Competitor Product", placeholder: "MailChimp" },
      { key: "YourProduct", label: "Your Product", placeholder: "email automation" },
      { key: "Differentiators", label: "Key Differentiators", placeholder: "AI-powered personalization and 99% deliverability" },
    ],
  },
  {
    id: "sh-6", category: "Saleshandy", title: "Three Sentence Format",
    subject: "A plan that could double your {{Area}} efforts",
    body: `Hey {{FirstName}},

I am [Your Name] working for [Your Company]. I have a plan for you that can double your {{Area}} efforts in a month.

Let's connect this week if you're interested in knowing how!

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Area", label: "Area", placeholder: "marketing" },
    ],
  },
  {
    id: "sh-7", category: "Saleshandy", title: "Follow-Up Sequence (3 Steps)",
    subject: "Hey! Remember me?",
    body: `── Step 1: Initial Follow-Up ──
Subject: Hey! Remember me?

Hi {{FirstName}},
I emailed you a few days ago about {{Topic}}. I understand that you might be busy. Did I mention we offer a free trial with no commitments whatsoever?

You can sign up for our trial here, in case you wish to try out our software.

Let me know how it goes.
Best, [Your Name]

── Step 2: Second Follow-Up ──
Subject: {{FirstName}}, any update?

Hi again, {{FirstName}},
I wanted to reach out to ask you if there were any updates regarding my previous email? Just to reiterate, {{Summary}}.

Let me know :)
Best, [Your Name]

── Step 3: Final Follow-Up ──
Subject: {{FirstName}}, let's cut to the chase!

Hello {{FirstName}},
I wanted to reach out to you one last time. Let me know if you are interested in {{Offer}}.

If I don't hear back from you, I'll assume the timing wasn't right. If in the future you'd like to use our services, feel free to reach out.

Wishing you the best.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Topic", label: "Original Topic", placeholder: "email automation tools" },
      { key: "Summary", label: "Brief Summary", placeholder: "our platform can automate your outreach" },
      { key: "Offer", label: "Your Offer", placeholder: "a free trial of our email platform" },
    ],
  },

  // ── Lemlist Templates ──
  {
    id: "le-1", category: "Lemlist", title: "Partnership for Backlinks",
    subject: "Collaboration idea {{FirstName}}?",
    body: `Hey {{FirstName}},

{{Icebreaker}}

Anyway, why I'm reaching out...

Building reputable white-hat backlinks is terribly time-consuming and exhausting, especially when up against client deadlines.

My name is [Your Name] and I help {{Industry}} agencies build links from reputable sources for their clients from various niches.

Recently helped {{CaseStudy}}, build {{Result}} which led to {{Outcome}}.

Worth exploring for {{Company}}?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Icebreaker", label: "Icebreaker", placeholder: "Loved your recent post on SEO trends!" },
      { key: "Industry", label: "Industry", placeholder: "SEO" },
      { key: "CaseStudy", label: "Case Study", placeholder: "Company X" },
      { key: "Result", label: "Result", placeholder: "15 links in 3 months" },
      { key: "Outcome", label: "Outcome", placeholder: "24% increase in organic traffic" },
    ],
  },
  {
    id: "le-2", category: "Lemlist", title: "Generating Calls with Brands",
    subject: "{{Company}} x [Your Company]",
    body: `Hey {{FirstName}},

Saturated digital marketing channels is greatly impacting your potential to acquire new customers and ultimately the growth of {{Company}}.

At [Your Company], we focus on innovative {{Channel}} to avoid these hurdles.

We typically achieve impressive results with companies similar to {{Company}} and this is why I am reaching out to you before anyone else with this.

If you have 25 minutes in the coming days, I would love to show you how we can help {{Company}} reach your ideal target market.

When are you available?

Looking forward to meeting you!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Channel", label: "Marketing Channel", placeholder: "micro-influencer campaigns" },
    ],
  },
  {
    id: "le-3", category: "Lemlist", title: "Lead Gen Agency Strategy",
    subject: "{{FirstName}} — {{ReferralName}} referred me",
    body: `Hi {{FirstName}},

Our founder, {{ReferralName}} couldn't stop talking about {{Company}} during our weekly meeting and asked me to reach out…

Not sure if you have heard of us, but at [Your Company], we regularly work with {{TargetCompanyType}} to help them automate and scale their outbound sales programs.

I poked around on your LinkedIn to get a sense for who you have on your team right now, and I agree that you could potentially be a good fit for our program. We see that companies of your size often run into challenges trying to scale without dumping more money into ads.

Would you be open to chat about what you are currently doing to see if there is a fit?

If so, just reply to this email and we can set it up.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ReferralName", label: "Referral Name", placeholder: "Sarah" },
      { key: "TargetCompanyType", label: "Target Company Type", placeholder: "SaaS and professional service companies" },
    ],
  },
  {
    id: "le-4", category: "Lemlist", title: "Developer Recruitment",
    subject: "Developers needed!",
    body: `Hello {{FirstName}},

While searching for {{Role}} in your area I found your profile on LinkedIn and I got to say that I was really impressed!

I would love to invite you to join our marketplace of IT professionals at [Your Platform] and get freelance jobs.

We can proudly say that there is a huge demand for {{Role}} right now.

Why should you join?
- Quick sign-up for our free, anonymous service
- Receive job offers tailored just for you
- Once you join, just sit back and let suitable assignments find you!

If you want to find more about how it works, check the link below.
[Your Link]

It is only 1-click apply!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Role", label: "Role", placeholder: "Developers" },
    ],
  },
  {
    id: "le-5", category: "Lemlist", title: "Multi-Step Cold Outreach",
    subject: "{{Company}} + [Your Company]",
    body: `── Email 1 ──
Hey {{FirstName}},

{{Icebreaker}}

At [Your Company], we help companies like {{Company}} achieve {{Outcome}} through {{Method}}.

Worth a quick chat?

Best, [Your Name]

── Email 2 (3 days later) ──
Hey {{FirstName}},

Did you have a chance to think about my proposal? I wanted to share that we recently helped {{CaseStudy}} achieve {{Result}}.

Let me know if you'd like to explore this for {{Company}}.

Best, [Your Name]

── Email 3 (5 days later) ──
Hey {{FirstName}},

Just following up one last time. If the timing isn't right, no worries — I'll check back in a few months.

But if {{Outcome}} is still a priority for {{Company}}, I'd love 15 minutes on your calendar.

Best, [Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Icebreaker", label: "Icebreaker", placeholder: "Loved your recent post!" },
      { key: "Outcome", label: "Desired Outcome", placeholder: "2x pipeline growth" },
      { key: "Method", label: "Your Method", placeholder: "automated outbound sequences" },
      { key: "CaseStudy", label: "Case Study", placeholder: "Company X" },
      { key: "Result", label: "Result", placeholder: "400% growth in traffic" },
    ],
  },

  // ── Klenty Templates ──
  {
    id: "kl-1", category: "Klenty", title: "Foot in the Door",
    subject: "The right direction, please?",
    body: `Hi {{FirstName}},

Quick question: Who handles your team's {{Department}}?

{{Competitor}} is already using {{Product}} to {{Benefit}} and I don't want your organization to miss out on this opportunity.

However, I am not very sure who is the right person to make the most of this opportunity.

If that's you, then could you tell me how your calendar looks like this week?

If not, would you be kind enough to point me to the person who would benefit the most from this conversation?

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Department", label: "Department", placeholder: "sales enablement" },
      { key: "Competitor", label: "Competitor Name", placeholder: "CompanyX" },
      { key: "Product", label: "Your Product", placeholder: "OutreachPro" },
      { key: "Benefit", label: "Key Benefit", placeholder: "double their pipeline" },
    ],
  },
  {
    id: "kl-2", category: "Klenty", title: "Word-of-Mouth Intro",
    subject: "{{InitialContact}} told me to get in touch",
    body: `Hello {{FirstName}},

I just had an exciting conversation with {{InitialContact}}, who directed me to you.

I noticed that {{Company}} is dealing with challenges like {{PainPoint1}} and {{PainPoint2}}.

{{Product}} can help solve these issues rapidly, and even {{InitialContact}} strongly believes in it.

However, they also pointed out that you are the person who can take a call on this and suggested we have a chat.

Can we have a quick 5-10 minute call next week to explore our solution to these challenges?

Shoot me an email, and I will fix a call at your convenience.

Warm regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "InitialContact", label: "Initial Contact", placeholder: "Sarah from Marketing" },
      { key: "PainPoint1", label: "Pain Point 1", placeholder: "low conversion rates" },
      { key: "PainPoint2", label: "Pain Point 2", placeholder: "manual follow-ups" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "kl-3", category: "Klenty", title: "Value Proposition Pitch",
    subject: "{{FirstName}}, {{Result}}",
    body: `Hi {{FirstName}},

We recently helped a startup {{Result}} by {{Method}}.

Can you point me to the person who handles {{Area}} to discuss further?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Result", label: "Result Achieved", placeholder: "increase revenue by 40%" },
      { key: "Method", label: "Method Used", placeholder: "automating their outbound" },
      { key: "Area", label: "Relevant Area", placeholder: "sales operations" },
    ],
  },
  {
    id: "kl-4", category: "Klenty", title: "Open with a Compliment",
    subject: "{{FirstName}}, you have an awesome website",
    body: `Hi {{FirstName}},

I really like the clean design and usability of your website. It's really, really good.

{{ValueProp}} and I would like to speak with someone who is responsible for this area of your marketing, at {{Company}}.

Are you the right person to speak about this? If not, who do you recommend I should contact?

Many thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ValueProp", label: "Your Value Prop", placeholder: "We help companies increase website conversions by 35%" },
    ],
  },
  {
    id: "kl-5", category: "Klenty", title: "Scaling Customer Acquisition",
    subject: "{{FirstName}}, reduce your cost per acquisition",
    body: `{{FirstName}},

One of our clients was able to acquire about {{Number}} customers at half of their target cost per acquisition number.

Is this something that might interest you right now?

If so, can you point me in the direction of the person that handles this?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Number", label: "Customer Count", placeholder: "6,000" },
    ],
  },
  {
    id: "kl-6", category: "Klenty", title: "Based on Online Profile",
    subject: "{{FirstName}}, need your help!",
    body: `Hi {{FirstName}},

My name is [Your Name] and I head up business development efforts with [Your Company]. We recently launched a new platform that {{OneLinerPitch}}.

I am taking an educated stab in the dark here, however, based on your online profile, you appear to be an appropriate person to connect with… or might at least point me in the right direction.

I'd like to speak with someone from {{Company}} who is responsible for {{Area}}.

If that's you, are you open to a fifteen-minute call on {{DateTime}} to discuss ways our platform can specifically help your business?

If not you, can you please put me in touch with the right person?

I appreciate the help!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "OneLinerPitch", label: "One-Liner Pitch", placeholder: "automates cold outreach at scale" },
      { key: "Area", label: "Relevant Area", placeholder: "sales operations" },
      { key: "DateTime", label: "Suggested Date/Time", placeholder: "Tuesday at 2pm" },
    ],
  },
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
    <ToolLayout title="Email Template Library" description="75+ ready-to-use email templates from top sources. Fill in your details, preview, and copy.">
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
