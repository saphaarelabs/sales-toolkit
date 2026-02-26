import type { EmailTemplate } from "./emailTemplateTypes";

export const hunterTemplates: EmailTemplate[] = [
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
    id: "hu-3", category: "Hunter.io", title: "How Do You Handle This?",
    subject: "How you handle {{Problem}}?",
    body: `Hi {{FirstName}},

My name is [Your Name] with [Your Company].

I help {{Industry}} companies with {{OneLiner}}.

I wanted to learn how you handle {{Area}} at {{Company}} and show you what we're working on.

Are you available for a brief call at {{TimeOptions}}?

Kind regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "OneLiner", label: "One-Liner Pitch", placeholder: "automating outbound sales" },
      { key: "Problem", label: "Problem Area", placeholder: "lead generation" },
      { key: "Area", label: "Specific Area", placeholder: "outbound prospecting" },
      { key: "TimeOptions", label: "Time Options", placeholder: "Tuesday or Thursday afternoon" },
    ],
  },
  {
    id: "hu-4", category: "Hunter.io", title: "Right Person to Talk To",
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
    id: "hu-5", category: "Hunter.io", title: "Referral Introduction",
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
    id: "hu-6", category: "Hunter.io", title: "Solve Their Problem",
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
    id: "hu-7", category: "Hunter.io", title: "Guest Post / Collaboration",
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
  {
    id: "hu-8", category: "Hunter.io", title: "Trying to Connect",
    subject: "Trying to connect",
    body: `Hey {{FirstName}},

My name is [Your Name] and I'm with [Your Company]. We work with organizations like {{Company}} to {{OneLinerPitch}}.

{{UniqueBenefit}}.

Could you direct me to the right person to talk to about this at {{Company}} so we can explore if this would be something valuable to incorporate into your events?

Cheers,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "OneLinerPitch", label: "One-Liner Pitch", placeholder: "boost event engagement" },
      { key: "UniqueBenefit", label: "Unique Benefit", placeholder: "We've increased attendee satisfaction by 40% for similar events" },
    ],
  },
  {
    id: "hu-9", category: "Hunter.io", title: "Following Up – Not a Priority?",
    subject: "Not a priority?",
    body: `Hey {{FirstName}},

I get it. Working with a {{CompanyType}} isn't a priority right now. It seems like you don't have plans to {{Service}}. Is that true?

I won't reach out again, but please feel free to get in touch if you need help with {{Services}}.

All the best!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyType", label: "Company Type", placeholder: "marketing agency" },
      { key: "Service", label: "Service", placeholder: "scale outbound" },
      { key: "Services", label: "Services You Provide", placeholder: "lead gen, outreach, and sales enablement" },
    ],
  },
  {
    id: "hu-10", category: "Hunter.io", title: "Content Cooperation",
    subject: "Content cooperation",
    body: `Hi {{FirstName}},

I'd like to follow up on how we can cooperate in the content matter.

I'm open to discuss the details here, alternatively, we can set up a call.

P.S. If you're not the right person for this matter, I'd be happy to know the right contact to talk to.

Cheers,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
    ],
  },
  {
    id: "hu-11", category: "Hunter.io", title: "Mutual Connection Introduction",
    subject: "Introduction from {{Connection}}",
    body: `Dear {{FirstName}},

One of my dear friends and our mutual acquaintance {{Connection}} very enthusiastically recommended your name for a {{Role}} that I'm looking to fill for a client.

They have been ranked as one of the fastest-growing startups in the {{Industry}} and this role will play a key part in their client acquisition and retention activities.

Do let me know if you are interested in discussing the role and company in more detail.

I am flexible with my availability. Thank you for your time.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Connection", label: "Mutual Connection", placeholder: "Sarah Johnson" },
      { key: "Role", label: "Role", placeholder: "Community Operations Manager" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
    ],
  },
  {
    id: "hu-12", category: "Hunter.io", title: "Ideas on a Topic",
    subject: "Ideas on {{Topic}}",
    body: `Hey {{FirstName}},

I'm [Your Name] from [Your Company]. I see you're going to be attending the {{Event}} this {{Time}}. I have a few interesting ideas to share with you about {{Topic}}.

Would you be interested in a chat?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Topic", label: "Topic", placeholder: "outbound automation" },
      { key: "Event", label: "Event Name", placeholder: "SaaStr Annual" },
      { key: "Time", label: "Time", placeholder: "month" },
    ],
  },
  {
    id: "hu-13", category: "Hunter.io", title: "Guest Post Pitch",
    subject: "Post idea for {{Company}}",
    body: `Hey {{FirstName}},

I saw that you've had a few great posts from contributors on your site. Just wanted to let you know that I've written a lot on {{Topic}} and would love to put something together for your blog.

Here are some of my past posts in case you're curious:
[Link to post #1]
[Link to post #2]
[Link to post #3]

Also, I looked through your site and came up with a few topics that I thought you might like:
1. {{TopicIdea1}}
2. {{TopicIdea2}}
3. {{TopicIdea3}}

Do you think any of these topics would be a good fit for your blog?

Thanks in advance!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Topic", label: "Topic", placeholder: "sales automation" },
      { key: "TopicIdea1", label: "Topic Idea 1", placeholder: "How to automate follow-ups" },
      { key: "TopicIdea2", label: "Topic Idea 2", placeholder: "Cold email best practices" },
      { key: "TopicIdea3", label: "Topic Idea 3", placeholder: "AI in sales outreach" },
    ],
  },
  {
    id: "hu-14", category: "Hunter.io", title: "Congrats on Funding",
    subject: "Congrats!",
    body: `Hi {{FirstName}},

Congratulations on your recent round of funding!

Your shining reviews on {{ReviewSite}} say a lot about your team. It's clear that you're going to make an impact on the {{Industry}} soon.

I just wanted to say congratulations, I look forward to more good news about {{Company}}.

My name is [Your Name], I work at [Your Company], and we {{OneLiner}}. If you need anything at all, just give us a shout.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ReviewSite", label: "Review Site", placeholder: "G2" },
      { key: "Industry", label: "Industry", placeholder: "fintech" },
      { key: "OneLiner", label: "One-Liner", placeholder: "help startups scale their outbound" },
    ],
  },
  {
    id: "hu-15", category: "Hunter.io", title: "Permission to Close File",
    subject: "Permission to close your file?",
    body: `{{FirstName}},

We are in the process of closing files for the month.

Typically when I haven't heard back from someone it means they're either really busy or aren't interested. If you aren't interested, do I have your permission to close your file?

If you're still interested, what do you recommend as a next step?

Thanks for your help.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
    ],
  },
  {
    id: "hu-16", category: "Hunter.io", title: "Additional Resource for Content",
    subject: "Additional resource for {{ContentTitle}}",
    body: `Hey {{FirstName}},

I loved your recent article on {{ContentTitle}} and I noticed that you mentioned {{SimilarArticle}}. {{Observation}}.

My name is [Your Name] and I'm a {{Position}} at [Your Company].

I recently produced a similar piece of content and was hoping that, if you find it useful, you could link to it as a resource for your audience.

I've linked to it here for you. If you find it helpful at all I'd really appreciate a share and a comment on the piece.

Thank you for your time.

Take care,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ContentTitle", label: "Content Title", placeholder: "cold email best practices" },
      { key: "SimilarArticle", label: "Similar Article", placeholder: "outbound strategies for 2024" },
      { key: "Observation", label: "Your Observation", placeholder: "Great insight on personalization!" },
      { key: "Position", label: "Your Position", placeholder: "Content Marketing Lead" },
    ],
  },
  {
    id: "hu-17", category: "Hunter.io", title: "Great Meeting at Event",
    subject: "Great meeting you at {{Event}}!",
    body: `Hi {{FirstName}},

It was great to meet you last night at the {{Event}}. I enjoyed our conversation afterward — particularly {{ConversationTopic}}.

{{ValueOffer}}.

Stay in touch,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Event", label: "Event Name", placeholder: "SaaS Connect" },
      { key: "ConversationTopic", label: "Conversation Topic", placeholder: "your approach to outbound" },
      { key: "ValueOffer", label: "Value to Offer", placeholder: "I've attached the case study I mentioned" },
    ],
  },
  {
    id: "hu-18", category: "Hunter.io", title: "Two Quick Questions",
    subject: "2 Questions {{FirstName}}",
    body: `Hey {{FirstName}},

Looking at how {{Company}} works and the pricing breakdowns, and I was wondering if you're using automation to {{Question1}} and do you think it correlates to {{Question2}}?

If so, could I share with you how our approach can {{Benefit}}?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Question1", label: "Question 1", placeholder: "recover failed payments" },
      { key: "Question2", label: "Question 2", placeholder: "involuntary churn" },
      { key: "Benefit", label: "Key Benefit", placeholder: "add 20% or more back" },
    ],
  },
  {
    id: "hu-19", category: "Hunter.io", title: "Congrats on New Role",
    subject: "Congrats on new role",
    body: `Hey {{FirstName}},

Congratulations on your new role as {{NewRole}}. Based on your LinkedIn profile, it looks like you've done an amazing job developing your career at {{Company}}.

If there are ways I can help you get your message out to my network of {{Audience}}, please let me know. I'm a fan and I want to help.

Do you have a PR or content person on your team?

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "NewRole", label: "New Role", placeholder: "VP Marketing" },
      { key: "Audience", label: "Your Audience", placeholder: "sales leaders" },
    ],
  },
  {
    id: "hu-20", category: "Hunter.io", title: "Google Ads Competitor Gap",
    subject: "{{Company}} on Google Ads",
    body: `Hey {{FirstName}},

I just saw your ad on Google Ads & I researched a company similar to yours, {{Competitor}}.

Good news — I found some gaps in their paid ads strategies that you could leverage.

I'm [Your Name] and I help {{Industry}} companies grow with paid ads (increase ROAS while reducing CaC).

First thing I noticed about those guys — they have pretty weak ads in general.

To give you a leg up, I'd love to send you our free {{Resource}} — I think you'd find it pretty valuable.

Do you mind if I share it with you?

Just reply "Yes" & I'll send it over.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Competitor", label: "Competitor", placeholder: "CompetitorCo" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "Resource", label: "Resource Name", placeholder: "SaaS CheatSheet for Google Ads" },
    ],
  },
  {
    id: "hu-21", category: "Hunter.io", title: "Open Position Outreach",
    subject: "Open position",
    body: `Hi {{FirstName}},

You probably get this often, but your background caught my eye.

I'm a recruiter at [Your Company]. I'm reaching out because I think that with your experience in {{Expertise}}, you would be a great fit for one of our client's open roles for {{Position}}.

Are you open to a chat?

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Expertise", label: "Their Expertise", placeholder: "full-stack development" },
      { key: "Position", label: "Position", placeholder: "Senior Engineer" },
    ],
  },
  {
    id: "hu-22", category: "Hunter.io", title: "Quick Win Tips",
    subject: "Quick win for {{Company}}",
    body: `Hi {{FirstName}},

Want to see how you can instantly {{Benefit}}?

I know you're busy working to {{EndResult}}, so I'll make this quick.

I'm the lead {{Role}} at [Your Company], and I've got a few suggestions to help you immediately generate some quick wins with {{Area}}. Here they are:

{{Tip1}}

{{Tip2}}

You might not have the time to do this though, and that's where we can help. Would you like a quick 15-minute session during the next week so I can walk you through the tips?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Benefit", label: "Key Benefit", placeholder: "boost conversion rates" },
      { key: "EndResult", label: "End Result", placeholder: "grow revenue" },
      { key: "Role", label: "Your Role", placeholder: "Growth Consultant" },
      { key: "Area", label: "Area", placeholder: "landing page optimization" },
      { key: "Tip1", label: "Tip 1", placeholder: "Add social proof above the fold" },
      { key: "Tip2", label: "Tip 2", placeholder: "Simplify your CTA to a single action" },
    ],
  },
  {
    id: "hu-23", category: "Hunter.io", title: "Industry Insights",
    subject: "{{Industry}} insights",
    body: `Hi {{FirstName}},

As the {{Position}}, I thought you might find this stat interesting:

{{Stat}}

With this rapid growth in {{Industry}}, I've had the opportunity to work with companies like {{Customer1}} and {{Customer2}} by improving their {{KPI}} with {{Product}}.

{{FirstName}}, it would be great if we can get on a short 10-minute call on Friday morning?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Position", label: "Their Position", placeholder: "VP of Sales" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "Stat", label: "Industry Stat", placeholder: "The average SaaS company loses 5-7% of revenue to churn annually" },
      { key: "Customer1", label: "Customer 1", placeholder: "Company A" },
      { key: "Customer2", label: "Customer 2", placeholder: "Company B" },
      { key: "KPI", label: "KPI", placeholder: "retention rates" },
      { key: "Product", label: "Your Product", placeholder: "ChurnGuard" },
    ],
  },
  {
    id: "hu-24", category: "Hunter.io", title: "Broken Link Outreach",
    subject: "Broken link on {{Page}}",
    body: `Hey {{FirstName}},

I noticed the link leading to {{ReferenceLink}} on your page {{PageURL}} appears to be broken. I wanted to point it out so that it doesn't impede your traffic going forward.

While we're at it, there are a few ways I see for you to optimize your entire page to drive more traffic to the rest of your site.

I put together a quick list of tips that you can reference during your next audit. Check it out and let me know if you have any questions!

Cheers!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Page", label: "Page Name", placeholder: "your resources page" },
      { key: "ReferenceLink", label: "Broken Link", placeholder: "https://example.com/old-link" },
      { key: "PageURL", label: "Page URL", placeholder: "https://theirsite.com/resources" },
    ],
  },
  {
    id: "hu-25", category: "Hunter.io", title: "Mentioned You in Blog Post",
    subject: "Mentioned {{Company}} in my blog post",
    body: `Hey {{FirstName}},

Last week I wrote a {{ContentType}} on {{Topic}}.

As you see in this guide, I was very impressed with {{Personalization}} and linked back to your {{Asset}}.

If you enjoyed the guide, feel free to share it with your subscribers or link back to it on your blog.

Either way, keep up the awesome work!

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ContentType", label: "Content Type", placeholder: "comprehensive guide" },
      { key: "Topic", label: "Topic", placeholder: "cold email best practices" },
      { key: "Personalization", label: "What Impressed You", placeholder: "your unique approach to follow-ups" },
      { key: "Asset", label: "Their Asset", placeholder: "website" },
    ],
  },
  {
    id: "hu-26", category: "Hunter.io", title: "Referral Program Invite",
    subject: "Join our referral program",
    body: `Hey {{FirstName}},

[Your Name] here from [Your Company], a high-rated {{CompetitorType}} alternative.

I saw one of your posts promoting {{Topic}} and thought you'd be a great fit for our referral program.

We're already working with the likes of {{Example1}} and {{Example2}} who generate more than 4-figures in revenue through us.

By signing up and promoting [Your Company] through our program you get:

- 30% recurring and scalable commissions
- Bonus rewards
- Ready-made resources to promote us effectively
- A dedicated Account Manager (that's me!)

Ready to start earning? Here's the link to join us: [Link]

Cheers,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompetitorType", label: "Competitor Type", placeholder: "Mailchimp" },
      { key: "Topic", label: "Topic They Posted About", placeholder: "email marketing" },
      { key: "Example1", label: "Example Partner 1", placeholder: "BloggerA" },
      { key: "Example2", label: "Example Partner 2", placeholder: "BloggerB" },
    ],
  },
  {
    id: "hu-27", category: "Hunter.io", title: "Sales Team Goals",
    subject: "Sales team goals",
    body: `Hello {{FirstName}},

Did you know that an average sales person {{Statistic}}? Is your sales team achieving the goals?

{{ValueProp}}

If you're looking to accelerate your sales like our clients {{HighEndClient}} did, let's connect for a quick 15-minute call later this week.

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Statistic", label: "Pain Point Stat", placeholder: "spends 65% of their time on non-selling activities" },
      { key: "ValueProp", label: "Value Proposition", placeholder: "We automate the busywork so your reps can focus on closing deals." },
      { key: "HighEndClient", label: "High-End Client", placeholder: "Salesforce" },
    ],
  },
  {
    id: "hu-28", category: "Hunter.io", title: "Shopify Launch Congrats",
    subject: "Congrats on your launch!",
    body: `Hey {{FirstName}},

I noticed {{Brand}} just launched on {{Platform}} — congrats! How amazing did it feel to press that publish button?

Not too long ago, I released a how-to guide all about optimizing a {{Platform}} website for SEO. In it, I break down specific insights on things like {{Topic1}}, {{Topic2}} and {{Topic3}}.

Launching your site is just the first step; I'd love to show you how you can increase your traffic and sustain its growth long-term. If you'd like to give it a read, let me know!

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Brand", label: "Brand Name", placeholder: "CoolStore" },
      { key: "Platform", label: "Platform", placeholder: "Shopify" },
      { key: "Topic1", label: "Topic 1", placeholder: "site speed optimization" },
      { key: "Topic2", label: "Topic 2", placeholder: "product page SEO" },
      { key: "Topic3", label: "Topic 3", placeholder: "structured data markup" },
    ],
  },
];

export const saleshandyTemplates: EmailTemplate[] = [
  {
    id: "sh-1", category: "Saleshandy", title: "The Startup Technique",
    subject: "{{FirstName}}, do you need help with {{Solution}}?",
    body: `Hello {{FirstName}},

Have your employees at {{Company}} been dealing with {{Problem}} currently?

I'm from [Your Company] and I'm working with dozens of companies from your field, like {{Examples}} to make sure their {{Problem}} is resolved on a daily basis because of our {{Service}}.

Trust me, I know you might not have an easy day as the {{Position}} and your schedule might be as busy as it gets, but how about we settle for a quick call for later?

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
    id: "sh-2", category: "Saleshandy", title: "The Helpful Technique",
    subject: "{{FirstName}}, are you dealing with {{Problem}}?",
    body: `Hello {{FirstName}},

Have you been facing issues with {{Problem}}? We've all been there, trust me!

If you're in the same boat, then lucky for you because I would like to help you out. Just send me an email and I'll tell you about my ideas.

Looking forward to your response! Have a great day!

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Problem", label: "Problem", placeholder: "low email response rates" },
    ],
  },
  {
    id: "sh-3", category: "Saleshandy", title: "The Direct Technique",
    subject: "I have some exciting news!",
    body: `Hey {{FirstName}},

I am [Your Name] from [Your Company], and we specialize in {{Service}}.

With the hustle and bustle of life, {{PainPoint}} has become a tedious task. With traditional methods, {{Challenge}} is not guaranteed.

But, with {{Product}}, all of these things are a dream come true!

If this has piqued your interest, reply to this email and we'll go from there.

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Service", label: "Your Service", placeholder: "email marketing services" },
      { key: "PainPoint", label: "Pain Point", placeholder: "sending out emails manually" },
      { key: "Challenge", label: "Challenge", placeholder: "tracking open rates and ensuring deliverability" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "sh-4", category: "Saleshandy", title: "Short and Sweet",
    subject: "I only need 10 minutes!",
    body: `Hi {{FirstName}},

My name is [Your Name], and I work as a {{JobTitle}} at [Your Company].

I'll keep this quick as I understand you might be busy. Our company specializes in {{Service}} and has over {{UserCount}} users to date.

Companies like {{BigClients}} have been using our services for years now.

Using our software, we can guarantee:
a) {{Benefit1}}
b) {{Benefit2}}
c) {{Benefit3}}

I only need 10 minutes of your time to explain all of this to you. Let me know if you are interested.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "JobTitle", label: "Your Job Title", placeholder: "Account Executive" },
      { key: "Service", label: "Your Service", placeholder: "email tracking tools" },
      { key: "UserCount", label: "User Count", placeholder: "100,000" },
      { key: "BigClients", label: "Big Clients", placeholder: "Google, Stripe, HubSpot" },
      { key: "Benefit1", label: "Benefit 1", placeholder: "Increased Open Rates" },
      { key: "Benefit2", label: "Benefit 2", placeholder: "Increased Replies" },
      { key: "Benefit3", label: "Benefit 3", placeholder: "99% Inbox Delivery" },
    ],
  },
  {
    id: "sh-5", category: "Saleshandy", title: "The Problem Solver",
    subject: "{{FirstName}}, we have the answer!",
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
    id: "sh-6", category: "Saleshandy", title: "The Flattery Technique",
    subject: "Great Job {{FirstName}}",
    body: `Hi {{FirstName}},

Congratulations on winning the {{Achievement}}, I am so happy for you!

I am sure you must be busy preparing for the big day. Your emails must be piling on!

Why not automate your emails with {{Product}}? {{ProductBenefit}}.

Let me know what you think, I can assure you that this will help you manage your emails effectively.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Achievement", label: "Their Achievement", placeholder: "Best Startup Award" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
      { key: "ProductBenefit", label: "Product Benefit", placeholder: "You can personalize and schedule each email automatically" },
    ],
  },
  {
    id: "sh-7", category: "Saleshandy", title: "The Content Technique",
    subject: "Your article about {{ArticleTitle}}",
    body: `Hey {{FirstName}}!

I happened to read your article on your blog about {{ArticleTitle}}. I loved the way you talked about it, mainly when you detailed {{WhatYouLiked}}.

I work at [Your Company] and we help businesses in {{Area}} like {{Examples}} achieve their goals with our {{Solution}}.

If you're also seeking help in those areas, I have a few ideas. How do you feel about a quick call this afternoon?

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
    id: "sh-8", category: "Saleshandy", title: "Competitor Differentiation",
    subject: "{{FirstName}}, we have just the thing!",
    body: `Hello {{FirstName}},

I recently visited your website and noticed you were using {{CompetitorProduct}}.

Our organization also specializes in {{YourProduct}}. However, we have {{Differentiators}}.

I am sharing a few links so you can understand what makes us different:
[Link 1]
[Link 2]

If you are interested, let me know and I can set up a demo call.

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
    id: "sh-9", category: "Saleshandy", title: "The Curious Technique",
    subject: "{{FirstName}}, I have a question!",
    body: `Hi {{FirstName}},

Hope you are doing well. I am [Your Name] from [Your Company] and I work as a {{JobTitle}}.

I just had a quick question for you: {{Question}}

I would love to have a conversation with you about this. Let me know which time works best for you.

Have a great day!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "JobTitle", label: "Your Job Title", placeholder: "Growth Manager" },
      { key: "Question", label: "Your Question", placeholder: "How do you automate your emails and follow-ups?" },
    ],
  },
  {
    id: "sh-10", category: "Saleshandy", title: "The Elevator Pitch",
    subject: "{{FirstName}}, this is perfect for you!",
    body: `Hi {{FirstName}},

I know you're probably busy so I am going to make this fast. I want to ask you a simple question: {{Question}}?

Well, that is exactly what we at [Your Company] aim to resolve. The reason {{Product}} will be a perfect fit for you is because {{Reasons}}.

The majority of our customers have mentioned {{Metric}} after using our services.

Do you think this is something you are interested in? Let me know and I will set up a personal demo call for you.

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
    id: "sh-11", category: "Saleshandy", title: "LinkedIn Connection",
    subject: "{{FirstName}}, saw you on LinkedIn!",
    body: `Hey {{FirstName}},

I came across your profile on LinkedIn whilst {{HowYouFound}}. Your background and experience are extremely impressive and I truly believe I could learn so much from a professional like yourself.

I am sure you are an individual that {{PainPoint}}.

Well, what if I told you that you could {{Solution}}?

Let's set up a quick call so I can introduce {{Product}}.

Have a great day!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "HowYouFound", label: "How You Found Them", placeholder: "researching sales leaders in SaaS" },
      { key: "PainPoint", label: "Pain Point", placeholder: "struggles with scaling outreach" },
      { key: "Solution", label: "Your Solution", placeholder: "automate your entire outbound workflow" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "sh-12", category: "Saleshandy", title: "Mutual Connection",
    subject: "{{FirstName}}, how do you know {{MutualName}}?",
    body: `Hi there, {{FirstName}}

I noticed that you and I are both connected to {{MutualName}}. How do you know them?

{{MutualName}} was actually one of our first few customers when we first started out. Since then, they have been able to {{Metrics}}.

We specialize in {{Product}} — {{USPs}}.

I am attaching a few resources so you can understand what exactly we offer:
[Link 1]
[Link 2]

Let's set up a quick call so I can walk you through our product.

Have a great day!
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "MutualName", label: "Mutual Connection", placeholder: "Sarah Johnson" },
      { key: "Metrics", label: "Metrics Achieved", placeholder: "increase reply rates by 35%" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
      { key: "USPs", label: "USPs", placeholder: "AI-powered email personalization at scale" },
    ],
  },
  {
    id: "sh-13", category: "Saleshandy", title: "I Saw Your Website",
    subject: "{{FirstName}}, love your website!",
    body: `Hi {{FirstName}},

I am [Your Name] from [Your Company] and I am a {{JobTitle}}.

I happened to come across your website through {{Source}}, and I absolutely loved the {{WhatYouLiked}} of it.

I was wondering if you would be interested in {{YourService}}, as I think you could double your sales with {{Benefits}}.

Let's schedule a quick call so I can further explain this to you. I will make it worth your while!

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "JobTitle", label: "Your Job Title", placeholder: "Digital Marketer" },
      { key: "Source", label: "How You Found Them", placeholder: "Google search" },
      { key: "WhatYouLiked", label: "What You Liked", placeholder: "UI and UX" },
      { key: "YourService", label: "Your Service", placeholder: "conversion rate optimization" },
      { key: "Benefits", label: "Benefits", placeholder: "better landing pages and faster load times" },
    ],
  },
  {
    id: "sh-14", category: "Saleshandy", title: "Dormant Customer Win-Back",
    subject: "{{FirstName}}, we miss you!",
    body: `Hey {{FirstName}},

How have you been doing? We miss you here at [Your Company]!

It's been quite a while since you've used your account. Since we last saw you, we have added so many exciting new features!

{{Feature1}}
{{Feature2}}
{{Feature3}}

Log into your account and let's get this party started again!

Looking forward to seeing you back.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Feature1", label: "New Feature 1", placeholder: "AI-powered subject line generator" },
      { key: "Feature2", label: "New Feature 2", placeholder: "Advanced analytics dashboard" },
      { key: "Feature3", label: "New Feature 3", placeholder: "One-click A/B testing" },
    ],
  },
  {
    id: "sh-15", category: "Saleshandy", title: "Sharing Valuable Ideas",
    subject: "Do you want to boost your productivity?",
    body: `Hi {{FirstName}},

My name is [Your Name], and we work with organizations like yours to boost their {{Area}}.

I looked at your website and I have a few ideas on how exactly you can increase {{Area}} within your organization by using our tools.

For example, {{Idea}}.

This is just one of the many ideas I have to help {{Company}} undertake this. Let's set up a meeting and discuss further.

Cheers,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Area", label: "Area to Improve", placeholder: "productivity" },
      { key: "Idea", label: "Specific Idea", placeholder: "automating your follow-up sequences to save 5 hours/week" },
    ],
  },
  {
    id: "sh-16", category: "Saleshandy", title: "Setting Up a Phone Call",
    subject: "A call that can fix your {{Subject}}",
    body: `Hey {{FirstName}},

I hope you're doing well. I am [Your Name], I came across your write-up regarding {{Subject}}.

I have been working in the same industry for {{Years}} years and have helped various organizations and professionals who have faced similar issues.

Let's connect over a call and see how our solution can help you grow? I promise to make it brief and crisp.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Subject", label: "Subject Matter", placeholder: "email deliverability" },
      { key: "Years", label: "Years of Experience", placeholder: "10" },
    ],
  },
  {
    id: "sh-17", category: "Saleshandy", title: "Three Sentence Format",
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
    id: "sh-18", category: "Saleshandy", title: "PAS Method (Problem-Agitate-Solve)",
    subject: "We have a solution to your {{Problem}} problem",
    body: `Hi {{FirstName}},

I am [Your Name]. While conducting my market research, I noticed some {{Issue}} on your {{Platform}}.

Managing and resolving the issue can become troublesome without using the right tools, and I am sure you must be putting in your best efforts to fix it ASAP.

I want to introduce you to {{Product}} — {{ProductDescription}}.

Would you like to know more about our solution and how it can work the best for you?

I would love to connect and explain it to you. Let me know if you're interested.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Problem", label: "Problem", placeholder: "negative reviews" },
      { key: "Issue", label: "Specific Issue", placeholder: "negative reviews" },
      { key: "Platform", label: "Platform", placeholder: "social media" },
      { key: "Product", label: "Product Name", placeholder: "ReviewGuard" },
      { key: "ProductDescription", label: "Product Description", placeholder: "an AI tool that helps manage and respond to reviews" },
    ],
  },
  {
    id: "sh-19", category: "Saleshandy", title: "AIDA Method",
    subject: "Our solution can help your problem",
    body: `Hi {{FirstName}} from {{Company}},

What if I told you that we could help you improve your {{Problem}} by {{Number}}?

Sounds too much? Over the past few years, we have closely worked with companies and helped them achieve this number. Here is social proof: [Link to case study]

{{Tool}} helps to achieve this number and cancel out the unwanted steps in the process, making it easy and effective.

I would like to connect and explain how our solution can help. Let me know if you're interested.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Problem", label: "Problem", placeholder: "email open rates" },
      { key: "Number", label: "Improvement Number", placeholder: "40%" },
      { key: "Tool", label: "Your Tool", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "sh-20", category: "Saleshandy", title: "Competitor's Client Outreach",
    subject: "{{FirstName}}, can I help you achieve desired results?",
    body: `Hi {{FirstName}},

I came across your profile and had a look at your website. I noticed you're using our competitor's platform for your {{Service}}.

I was just wondering what kind of results you have seen till now?

I have seen a few of our current clients show concern over {{CompetitorIssue}}. Are you facing any similar issues?

Would you like to connect this week and I will help you understand how our solution can help you in a much better way?

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Service", label: "Service Area", placeholder: "email marketing" },
      { key: "CompetitorIssue", label: "Competitor Issue", placeholder: "low deliverability and limited personalization" },
    ],
  },
  {
    id: "sh-21", category: "Saleshandy", title: "Cold Email with Statistics",
    subject: "{{FirstName}}, did you know {{Stat}}?",
    body: `Hey {{FirstName}},

I hope this email finds you well. I thought of sharing some exciting statistics with you as it is related to the area of your expertise.

{{Stat}}

The market seems to be booming. And it becomes imperative for service providers to use tools that ease the process.

And I have a handy tool for you! Would you be free to talk this week for just 10 minutes? I can explain {{Product}} to you.

Let me know if you're interested.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Stat", label: "Statistic", placeholder: "73% of B2B buyers prefer email for business communication" },
      { key: "Product", label: "Your Product", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "sh-22", category: "Saleshandy", title: "Before-After-Bridge",
    subject: "We noticed an issue and it needs to change!",
    body: `Hi {{FirstName}},

I noticed your {{Issue}}, which might affect the complete user experience.

But don't you worry, our tool perfectly works to solve such issues without you having to do much.

Do you want to see a quick demo? Here is a link to our product demo video: [link]

If you have any questions, feel free to reach out.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Issue", label: "Issue Noticed", placeholder: "website is not mobile-friendly" },
    ],
  },
  {
    id: "sh-23", category: "Saleshandy", title: "Social Media Post Hook",
    subject: "{{FirstName}}, your post caught my attention!",
    body: `Hey {{FirstName}},

Your recent social media post on {{Topic}} caught my attention. I was wondering if {{YourThoughts}}.

Few of my clients have used our solutions for their {{Area}} and are now seeing expected results like: {{Results}}.

It would be interesting to see how we can help you achieve your desired targets using our platform. How about we connect this week?

Let me know if you're interested.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Topic", label: "Post Topic", placeholder: "outbound sales strategies" },
      { key: "YourThoughts", label: "Your Thoughts", placeholder: "you've considered automating some of those processes" },
      { key: "Area", label: "Area", placeholder: "outbound sales" },
      { key: "Results", label: "Results", placeholder: "40% more qualified meetings" },
    ],
  },
  {
    id: "sh-24", category: "Saleshandy", title: "Follow-Up Sequence (3 Steps)",
    subject: "Hey! Remember me?",
    body: `── Step 1: Initial Follow-Up ──
Subject: Hey! Remember me?

Hi {{FirstName}},
I emailed you a few days ago about {{Topic}}. I understand that you might be busy.

Did I mention we offer a free trial with no commitments? You can sign up here.

Let me know how it goes.
Best, [Your Name]

── Step 2: Second Follow-Up ──
Subject: {{FirstName}}, any update?

Hi again, {{FirstName}},
I wanted to reach out to ask if there were any updates regarding my previous email?

Just to reiterate, {{Summary}}.

Let me know :)
Best, [Your Name]

── Step 3: Final Follow-Up ──
Subject: {{FirstName}}, let's cut to the chase!

Hello {{FirstName}},
I wanted to reach out to you one last time. Let me know if you are interested in {{Offer}}.

If I don't hear back, I'll assume the timing wasn't right. Feel free to reach out in the future.

Wishing you the best.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Topic", label: "Original Topic", placeholder: "email automation tools" },
      { key: "Summary", label: "Brief Summary", placeholder: "our platform can automate your outreach" },
      { key: "Offer", label: "Your Offer", placeholder: "a free trial of our email platform" },
    ],
  },
  {
    id: "sh-25", category: "Saleshandy", title: "Congratulations on Funding",
    subject: "You guys did a great job!",
    body: `{{FirstName}},

Big congratulations on the funding you have received. Super excited for the future of your company.

I recently studied your website, and I discovered new opportunities to add more value to the platform. And after such significant funding, some changes will be much needed, right?

Why don't we hop on a call and discuss this in detail?

You can know a little more about me here: [Link to profile]

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
    ],
  },
  {
    id: "sh-26", category: "Saleshandy", title: "Exclusive Offer",
    subject: "{{Discount}} off just for you!",
    body: `Hey {{FirstName}},

{{EventContext}}

All of our products & services are {{Discount}} off if you sign up today. This is an exclusive offer that is valid till {{Date}}.

Don't believe us? Sign up right now and find out yourself: [Link]

If you have any questions, feel free to reply back.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "EventContext", label: "Event/Occasion", placeholder: "Our Black Friday sale is live!" },
      { key: "Discount", label: "Discount Amount", placeholder: "50%" },
      { key: "Date", label: "Expiry Date", placeholder: "December 1st" },
    ],
  },
  {
    id: "sh-27", category: "Saleshandy", title: "Free Trial Offer",
    subject: "Ready. Set. Go: Exclusive offer for you!",
    body: `Hi {{FirstName}},

Happy {{Day}}.

I have a very exclusive offer for you. As our team has developed an updated version of our current services, we are offering you {{TrialLength}} of free access to our updated platform.

You can use the platform in your best interest, use all the newly added features, and share any ideas or feedback.

Your time is ticking. Take action now!

To get access, reply "I am interested" to this mail.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Day", label: "Day/Occasion", placeholder: "Monday" },
      { key: "TrialLength", label: "Trial Length", placeholder: "7 days" },
    ],
  },
  {
    id: "sh-28", category: "Saleshandy", title: "Webinar Invite",
    subject: "You're invited!",
    body: `Hey there, {{FirstName}}

I have some exciting news. My team and I will be hosting a webinar on {{WebinarTitle}}.

The webinar will be held on {{DateTime}}.

I will be speaking with {{Speaker}} about {{Topic}}. Besides that, we have a guest speaker, {{GuestSpeaker}} that will be sharing some exclusive industry secrets with us!

Here is the signup sheet: [Link]

Ps: The first 50 sign-ups will be receiving a goodie bag!

Hoping to see you there.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "WebinarTitle", label: "Webinar Title", placeholder: "Cold Email Mastery" },
      { key: "DateTime", label: "Date & Time", placeholder: "March 15th at 2pm EST" },
      { key: "Speaker", label: "Co-Speaker", placeholder: "my colleague Sarah" },
      { key: "Topic", label: "Topic", placeholder: "email personalization at scale" },
      { key: "GuestSpeaker", label: "Guest Speaker", placeholder: "Alex from SalesForce" },
    ],
  },
  {
    id: "sh-29", category: "Saleshandy", title: "Link Building Outreach",
    subject: "LOVE YOUR NEW BLOG!",
    body: `Hey there {{FirstName}},

I am [Your Name] from [Your Company]. I work as a {{JobTitle}} and, much like yourself, write well-researched and in-depth articles.

I recently had the opportunity to read your {{ArticleTitle}}, and thought it was very interesting and intricately put-together.

As I was reading your piece, I noticed a couple of anchor texts that didn't exactly fit. It can be tough finding the right article to link to.

Hence, I suggest adding our link about {{Topic}} to help your readers better understand the message you're putting forth.

We're more than happy to add links from your blogs to ours too.

Let me know if you are open to this collaboration.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "JobTitle", label: "Your Job Title", placeholder: "Content Writer" },
      { key: "ArticleTitle", label: "Article Title", placeholder: "The Ultimate Guide to Cold Outreach" },
      { key: "Topic", label: "Your Topic", placeholder: "email personalization best practices" },
    ],
  },
  {
    id: "sh-30", category: "Saleshandy", title: "Break-Up Email",
    subject: "{{FirstName}}, I am waiting for you!",
    body: `Hi {{FirstName}},

I am [Your Name] from [Your Company]. I am following up on the previous mail I had sent.

I'd appreciate it if you could let me know if you would be interested in our {{Product}}.

If you're interested, let's take the conversation ahead and discuss the actionable.

And if not, should I connect with you after a couple of months?

Let me know what works for you.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Product", label: "Product/Service", placeholder: "email automation platform" },
    ],
  },
  {
    id: "sh-31", category: "Saleshandy", title: "Podcast Guest Invite",
    subject: "Would you like to be our guest?",
    body: `Hey {{FirstName}},

Greetings! I am [Your Name] from [Your Company].

Recently, we started a podcast on {{Niche}}. By continuous efforts, we have received {{Listeners}} listeners.

This coming week, we're planning a podcast on {{Topic}}, and instantly we thought of connecting with you. Your experience and knowledge in this field speak for themselves.

We believe having you would be an insightful experience for us as well as the audience.

Let us know if you're interested!

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Niche", label: "Podcast Niche", placeholder: "sales and marketing" },
      { key: "Listeners", label: "Listener Count", placeholder: "5,000" },
      { key: "Topic", label: "Episode Topic", placeholder: "cold outreach strategies for 2024" },
    ],
  },
  {
    id: "sh-32", category: "Saleshandy", title: "New Product Launch",
    subject: "{{Product}} IS HERE! IT'S LIVE!",
    body: `Hi there {{FirstName}},

We have some exciting news to share with you!

We have been working on this product tirelessly for months. Our engineers have been burning the midnight oil to come up with the new and improved {{Product}}.

We want our users to have the best experience possible. Keeping in mind all the feedback from previous customers, we have put together a new and revamped version.

You can use your previous account's email address to log in.

We aim to continuously provide top-notch services, so any feedback is welcome.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro 2.0" },
    ],
  },
];

export const lemlistTemplates: EmailTemplate[] = [
  {
    id: "le-1", category: "Lemlist", title: "Partnership for Backlinks",
    subject: "Collaboration idea {{FirstName}}?",
    body: `Hey {{FirstName}},

{{Icebreaker}}

Anyway, why I'm reaching out...

Building reputable white-hat backlinks is terribly time-consuming and exhausting, especially when up against client deadlines.

My name is [Your Name] and I help {{Industry}} agencies build links from reputable sources for their clients from various niches.

Recently helped {{CaseStudy}} build {{Result}} which led to {{Outcome}}.

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

We typically achieve impressive results with companies similar to {{Company}} and this is why I am reaching out to you before anyone else.

If you have 25 minutes in the coming days, I would love to show you how we can help.

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

Not sure if you have heard of us, but at [Your Company], we regularly work with {{TargetType}} to help them automate and scale their outbound sales programs.

I poked around on your LinkedIn and I agree that you could potentially be a good fit. We see that companies of your size often run into challenges trying to scale without dumping more money into ads.

Would you be open to chat about what you are currently doing to see if there is a fit?

If so, just reply to this email.
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ReferralName", label: "Referral Name", placeholder: "Sarah" },
      { key: "TargetType", label: "Target Company Type", placeholder: "SaaS and service companies" },
    ],
  },
  {
    id: "le-4", category: "Lemlist", title: "Find New Business Partners",
    subject: "Partnership with {{Company}}",
    body: `Hi {{FirstName}},

My name is [Your Name] and I am the {{Role}} of [Your Company], a leading company in {{Field}}.

I have discovered your profile in {{Source}} and thought we could connect to discuss partnership opportunities given your focus on {{TheirFocus}}.

Our company helped over {{ClientCount}} companies {{WhatYouDo}}, including local branches of major corporations like {{Client1}}, {{Client2}} to name a few.

We are looking to expand our network of partners who have clients in {{TargetArea}}. Thanks to this partnership, you could benefit from our extensive knowledge and outsource part of your work.

Please let me know if you'd be available for a first exploratory exchange in the coming weeks?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Role", label: "Your Role", placeholder: "CEO" },
      { key: "Field", label: "Your Field", placeholder: "corporate governance" },
      { key: "Source", label: "Where You Found Them", placeholder: "LinkedIn" },
      { key: "TheirFocus", label: "Their Focus", placeholder: "compliance and investigations" },
      { key: "ClientCount", label: "Client Count", placeholder: "150" },
      { key: "WhatYouDo", label: "What You Do", placeholder: "monitor compliance programs" },
      { key: "Client1", label: "Client 1", placeholder: "Company A" },
      { key: "Client2", label: "Client 2", placeholder: "Company B" },
      { key: "TargetArea", label: "Target Area", placeholder: "Latin America" },
    ],
  },
  {
    id: "le-5", category: "Lemlist", title: "Promote Marketing Services",
    subject: "Email?",
    body: `{{FirstName}} — have you ever considered running any of {{Company}}'s offers via email?

The reason I'm contacting you directly is that we've done tons of research into companies whose offers would see serious results with the right Email Outreach strategy in place.

{{Company}} is at the top of our list, which means we see insane potential for your growth and would love to share a few ideas if you're up for it.

LMK
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
    ],
  },
  {
    id: "le-6", category: "Lemlist", title: "Multichannel Outbound",
    subject: "{{Company}} <> [Your Company] Partnership",
    body: `Bonjour {{FirstName}},

{{Company}} could halve its spending on {{Area}}. Being a founder yourself, you know it's a bold claim, but give me 15 seconds to back it up.

[Your Company] is the {{Analogy}} of {{Industry}}. We're {{PriceAdvantage}} cheaper than the alternatives — by {{HowYouDoIt}}.

We've already helped over {{ClientCount}} firms like {{Company}}, such as {{Example1}} and {{Example2}}, {{Result}}.

Are you free for a quick call next {{Day}} to discuss this?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Area", label: "Spending Area", placeholder: "cloud computing" },
      { key: "Analogy", label: "Analogy", placeholder: "Airbnb" },
      { key: "Industry", label: "Industry", placeholder: "GPU computing" },
      { key: "PriceAdvantage", label: "Price Advantage", placeholder: "3-5x" },
      { key: "HowYouDoIt", label: "How You Do It", placeholder: "renting spare servers globally" },
      { key: "ClientCount", label: "Client Count", placeholder: "40" },
      { key: "Example1", label: "Example 1", placeholder: "Company A" },
      { key: "Example2", label: "Example 2", placeholder: "Company B" },
      { key: "Result", label: "Result", placeholder: "halved their largest cost" },
      { key: "Day", label: "Day", placeholder: "Tuesday afternoon" },
    ],
  },
  {
    id: "le-7", category: "Lemlist", title: "Creating Agency Partnerships",
    subject: "Question about {{Company}}?",
    body: `Hello {{FirstName}},

Through my search for partnerships with {{AgencyType}} like yours, I saw {{Company}}'s profile on {{Platform}} and saw your showcase of impressive work.

We at [Your Company] are in search of partnering with {{AgencyType}} where we can complement and build their designed products.

I am interested in learning how you manage to {{Process}}?

I am attaching our profile of work for your reference. If this sounds interesting I would love to arrange for a 15-min Zoom call.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "AgencyType", label: "Agency Type", placeholder: "product design agencies" },
      { key: "Platform", label: "Platform", placeholder: "Clutch" },
      { key: "Process", label: "Their Process", placeholder: "develop your designed products" },
    ],
  },
  {
    id: "le-8", category: "Lemlist", title: "Find Webinar Guests",
    subject: "Private invitation for {{FirstName}}",
    body: `Hi {{FirstName}},

I am really impressed with your {{Achievement}} in {{Year}}!

Wanted to reach out and invite you as a guest speaker to our weekly webinar sessions. Every week we discuss a hot topic from the {{Industry}} world based on the expertise of guests like yourself.

We have an active audience of +{{AudienceSize}} viewers across all social channels.

We already had amazing webinar guests like {{Guest1}}, {{Guest2}} & {{Guest3}}.

Would you be interested in joining as a guest speaker?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Achievement", label: "Their Achievement", placeholder: "brokerage performance" },
      { key: "Year", label: "Year", placeholder: "2024" },
      { key: "Industry", label: "Industry", placeholder: "Real Estate" },
      { key: "AudienceSize", label: "Audience Size", placeholder: "1,000" },
      { key: "Guest1", label: "Past Guest 1", placeholder: "Jane Smith" },
      { key: "Guest2", label: "Past Guest 2", placeholder: "Bob Johnson" },
      { key: "Guest3", label: "Past Guest 3", placeholder: "Alice Brown" },
    ],
  },
  {
    id: "le-9", category: "Lemlist", title: "Multi-Step Cold Outreach",
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
  {
    id: "le-10", category: "Lemlist", title: "Sell Talent Sourcing",
    subject: "Quick chat about {{Company}}?",
    body: `Hey {{FirstName}},

I'm not here to waste your time, so I'll get straight to it.

My name is [Your Name] and I co-founded [Your Company] — we work with {{Industry}} companies helping them bring in {{Candidates}} from pre-qualified candidates in their local area every single day.

If this is something that interests you, are we able to schedule a quick 20-minute call this week? I would love to discuss the strategy we're using and find a way to work together.

If your answer is YES then I'll forward my calendar link. If your answer is No then I'll stop emailing you immediately.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Industry", label: "Industry", placeholder: "healthcare recruitment" },
      { key: "Candidates", label: "Candidate Type", placeholder: "job applications" },
    ],
  },
];

export const klentyTemplates: EmailTemplate[] = [
  {
    id: "kl-1", category: "Klenty", title: "Foot in the Door",
    subject: "The right direction, please?",
    body: `Hi {{FirstName}},

Quick question: Who handles your team's {{Department}}?

{{Competitor}} is already using {{Product}} to {{Benefit}} and I don't want your organization to miss out on this opportunity.

If that's you, then could you tell me how your calendar looks this week?

If not, would you be kind enough to point me to the right person?

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

Can we have a quick 5-10 minute call next week?

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

{{ValueProp}} and I would like to speak with someone responsible for this area at {{Company}}.

Are you the right person? If not, who do you recommend?

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

My name is [Your Name] and I head up business development at [Your Company]. We recently launched a new platform that {{OneLinerPitch}}.

Based on your online profile, you appear to be an appropriate person to connect with — or might at least point me in the right direction.

I'd like to speak with someone from {{Company}} who is responsible for {{Area}}.

If that's you, are you open to a fifteen-minute call on {{DateTime}}?

If not, can you please put me in touch with the right person?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "OneLinerPitch", label: "One-Liner Pitch", placeholder: "automates cold outreach at scale" },
      { key: "Area", label: "Relevant Area", placeholder: "sales operations" },
      { key: "DateTime", label: "Suggested Date/Time", placeholder: "Tuesday at 2pm" },
    ],
  },
  {
    id: "kl-7", category: "Klenty", title: "Vision Alignment",
    subject: "{{Company}} <> [Your Company]",
    body: `Hi {{FirstName}},

Wanted to reach out and introduce myself.

I am [Your Name], and I work as an AE at [Your Company].

Our product {{Product}} helps businesses solve {{PainPoint}}.

I just wanted to check with you what your vision is for {{Company}} and how we could help you align with that vision.

Let me know what your calendar looks like, and I would be happy to set something up.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
      { key: "PainPoint", label: "Pain Point", placeholder: "scaling outbound sales" },
    ],
  },
  {
    id: "kl-8", category: "Klenty", title: "The Compliment Intro",
    subject: "Time to talk?",
    body: `Hello {{FirstName}},

I recently visited your LinkedIn profile and couldn't help noticing that you have been promoted as {{Position}} at {{Company}}. Congrats!

I also understand that in this position, you must be acquainted with all the processes related to {{Department}}.

Do you think that {{Company}}'s operational efficiency can be improved through {{Idea}}?

If so, our solution should be definitely attractive to you.

Are you available next week for a quick call?

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Position", label: "Their New Position", placeholder: "VP of Sales" },
      { key: "Department", label: "Department", placeholder: "sales" },
      { key: "Idea", label: "Your Idea", placeholder: "automating repetitive tasks" },
    ],
  },
  {
    id: "kl-9", category: "Klenty", title: "Specificity + Customer Story",
    subject: "Achieve {{Goal}} in {{Timeframe}}",
    body: `Hi {{FirstName}},

I have an idea that I can explain in 10 minutes. This will help {{Company}} achieve {{Goal}} in {{Timeframe}}.

{{Customer}} who used {{Product}} was able to achieve this in {{Timeframe}}.

Would you be interested to know how it happened?

If yes, let me know a good time this week for a quick chat.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Goal", label: "Goal", placeholder: "double qualified leads" },
      { key: "Timeframe", label: "Timeframe", placeholder: "90 days" },
      { key: "Customer", label: "Customer Name", placeholder: "Company X" },
      { key: "Product", label: "Product Name", placeholder: "OutreachPro" },
    ],
  },
  {
    id: "kl-10", category: "Klenty", title: "Trigger-Based Outreach",
    subject: "Congrats! Have you thought of {{BusinessValue}}?",
    body: `Hey {{FirstName}},

Since I work so much with {{Industry}}, I constantly follow industry news. I've noticed that you recently {{CompanyAction}}. Congrats!

Usually when that happens, {{BusinessValue}} becomes a priority. That's why I thought you might be interested in finding out how we helped {{SimilarCompany}} get going quickly in their new direction — without any of the typical glitches.

If you'd like to learn more, let's set up a quick call. How does {{DateAndTime}} look on your calendar?

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Industry", label: "Industry", placeholder: "SaaS" },
      { key: "CompanyAction", label: "Company Action", placeholder: "raised a Series A" },
      { key: "BusinessValue", label: "Business Value", placeholder: "scaling sales" },
      { key: "SimilarCompany", label: "Similar Company", placeholder: "Company X" },
      { key: "DateAndTime", label: "Date & Time", placeholder: "Thursday at 2pm" },
    ],
  },
  {
    id: "kl-11", category: "Klenty", title: "Use Numbers and Stats",
    subject: "Are you up for a {{Stat}} increase?",
    body: `Hello {{FirstName}},

What would it mean to your top-line revenue if you saw a {{Stat1}} increase in contact rates, {{Stat2}} improvement in closes, and {{Stat3}} increase in quota-hitting sales reps?

Let's find a few minutes to talk about how [Your Company] is providing these results to our clients.

I'm available tomorrow at {{Time1}} or {{Time2}}. Can we sync up?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Stat", label: "Headline Stat", placeholder: "70%" },
      { key: "Stat1", label: "Stat 1", placeholder: "70%" },
      { key: "Stat2", label: "Stat 2", placeholder: "50%" },
      { key: "Stat3", label: "Stat 3", placeholder: "40%" },
      { key: "Time1", label: "Time Option 1", placeholder: "10am" },
      { key: "Time2", label: "Time Option 2", placeholder: "2pm" },
    ],
  },
  {
    id: "kl-12", category: "Klenty", title: "Quick Call — 10x Traction",
    subject: "10x {{Company}} traction in 10 minutes",
    body: `Hey {{FirstName}},

I have an idea that I can explain in 10 minutes that can get {{Company}} its next {{Target}}.

I recently used this idea to help our client {{SimilarCompany}} almost triple their monthly run rate.

{{FirstName}}, let's schedule a quick 10-minute call so I can share the idea with you. When works best for you?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Target", label: "Target", placeholder: "100 best customers" },
      { key: "SimilarCompany", label: "Similar Company", placeholder: "Company X" },
    ],
  },
  {
    id: "kl-13", category: "Klenty", title: "Head-to-Head Against Competitor",
    subject: "{{FirstName}}, are you liking {{Competitor}}?",
    body: `Hi {{FirstName}},

Just ran across your website and noticed you were using {{Competitor}}.

How are you liking it? I run a {{Service}} called [Your Company]. It's just like {{Competitor}}, only {{Differentiator}}.

If you're up for it, I would love to jump on a quick call with you and get your opinion on how we could make {{Company}} better (and see if it would make sense for us to work together).

Would {{Time1}} or {{Time2}} be a good time for you?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Competitor", label: "Competitor Name", placeholder: "CompetitorCo" },
      { key: "Service", label: "Your Service Type", placeholder: "sales engagement platform" },
      { key: "Differentiator", label: "Key Differentiator", placeholder: "we include AI-powered personalization" },
      { key: "Time1", label: "Time Option 1", placeholder: "Tuesday at 10am" },
      { key: "Time2", label: "Time Option 2", placeholder: "Wednesday at 2pm" },
    ],
  },
  {
    id: "kl-14", category: "Klenty", title: "Personalized Demo",
    subject: "Check out this demo for {{Company}}!",
    body: `{{FirstName}},

I love {{Company}} and I'm also a big fan of your blog.

I work with companies like {{Competitors}} and help them {{KeyBenefits}}.

Here's an example of {{Example}}. Just wanted to email you and see if {{Company}} might be interested in a similar solution.

I made a demo for you based on {{DemoBasedOn}} to show you what it might look like.

Is this something you guys would be interested in?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Competitors", label: "Their Competitors", placeholder: "CompanyA, CompanyB" },
      { key: "KeyBenefits", label: "Key Benefits", placeholder: "increase outbound conversions" },
      { key: "Example", label: "Example", placeholder: "how we helped CompanyC grow 40%" },
      { key: "DemoBasedOn", label: "Demo Based On", placeholder: "your current product offerings" },
    ],
  },
  {
    id: "kl-15", category: "Klenty", title: "Saw Your Careers Page",
    subject: "Hiring {{Role}}?",
    body: `Hi {{FirstName}},

I noticed on your careers page that you're hiring {{Role}} who {{Description}}.

Would love a few minutes to discuss how [Your Company] removes this burden.

We help clients like {{Clients}} to {{Solution}}.

{{Benefits}}

Would you be open to a call at {{Time1}} or {{Time2}} to see how we could help your team?

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Role", label: "Role They're Hiring", placeholder: "SDRs" },
      { key: "Description", label: "Role Description", placeholder: "handle outbound prospecting" },
      { key: "Clients", label: "Your Clients", placeholder: "CompanyA, CompanyB" },
      { key: "Solution", label: "Your Solution", placeholder: "automate prospecting at scale" },
      { key: "Benefits", label: "Key Benefits", placeholder: "50% faster pipeline, 30% lower cost per lead" },
      { key: "Time1", label: "Time Option 1", placeholder: "Tuesday" },
      { key: "Time2", label: "Time Option 2", placeholder: "Thursday" },
    ],
  },
  {
    id: "kl-16", category: "Klenty", title: "Competitor Just Did X",
    subject: "{{Competitor}}'s {{TriggerEvent}}",
    body: `Hey {{FirstName}},

I'm sure you heard {{Competitor}} recently {{TriggerEvent}}.

I think now would be the perfect time to make a move to take some market share from them.

They're probably really busy with {{TriggerEvent}} and aren't thinking as much about {{Category}}.

I have some ideas how you could take advantage and achieve {{Benefit}}.

Do you have 5 minutes tomorrow morning to chat?

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Competitor", label: "Competitor", placeholder: "CompetitorCo" },
      { key: "TriggerEvent", label: "Trigger Event", placeholder: "announced a merger" },
      { key: "Category", label: "Your Category", placeholder: "sales enablement" },
      { key: "Benefit", label: "Broad Benefit", placeholder: "capturing their displaced customers" },
    ],
  },
  {
    id: "kl-17", category: "Klenty", title: "LinkedIn Article Engagement",
    subject: "{{FirstName}}, great article — {{ArticleName}}",
    body: `Hi {{FirstName}},

The article you shared on LinkedIn yesterday addresses a challenge that I've heard multiple sales directors mention this week.

Your unique perspective would be beneficial for them to hear. We help sales execs improve their reps' success with a similar approach.

Do you have 5 mins to speak on {{Day}} afternoon this week?

Regards,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ArticleName", label: "Article Name", placeholder: "The Future of Cold Email" },
      { key: "Day", label: "Day", placeholder: "Wednesday or Thursday" },
    ],
  },
  {
    id: "kl-18", category: "Klenty", title: "Focus on Benefits",
    subject: "{{FirstName}}, {{ValueProp}}",
    body: `{{FirstName}},

In working with other {{Industry}} professionals, one of the key issues they're struggling with is {{KeyIssue}}.

This past year we helped numerous companies to {{BusinessDriver}}, resulting in {{Results}}.

If this is something you're challenged with too, let's set up a quick call. I have some ideas that might help.

All the best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Industry", label: "Industry/Position", placeholder: "SaaS sales leaders" },
      { key: "KeyIssue", label: "Key Issue", placeholder: "scaling outbound without adding headcount" },
      { key: "BusinessDriver", label: "Business Driver", placeholder: "automate prospecting" },
      { key: "Results", label: "Results", placeholder: "$500K+ in pipeline per quarter" },
      { key: "ValueProp", label: "Value Prop (Subject)", placeholder: "Scale outbound without adding headcount" },
    ],
  },
  {
    id: "kl-19", category: "Klenty", title: "Analysis on Your Product",
    subject: "{{FirstName}}, increase your revenue by {{Percentage}}",
    body: `Hi {{FirstName}},

I really like what you've done so far with {{Company}} and we genuinely believe it has great potential.

Earlier this week we did an analysis with a new product that we recently launched and found that you have an easy {{Percentage}} revenue improvement opportunity.

We were a bit surprised as the average result we get with similar websites is around {{AvgResult}}.

I'd really like to give you a quick call sometime next week to show you the results and get your opinion.

Let me know your thoughts.

Thanks,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Percentage", label: "Revenue Improvement %", placeholder: "15%" },
      { key: "AvgResult", label: "Average Result", placeholder: "9%" },
    ],
  },
  {
    id: "kl-20", category: "Klenty", title: "Be Upfront",
    subject: "Revenue Growth",
    body: `Hi {{FirstName}},

My name is [Your Name] and I'm with [Your Company], a {{WhatYouDo}}.

We've worked with venture-backed startups to Fortune 500 companies like {{Companies}}.

We take a different approach to growing companies and aren't like {{CompetitiveNiche}}.

We move quickly and if we don't think we can kick butt for you, we'll be upfront about it.

Are you free for a chat this week or next about {{Topic}}? If so, I'll be available at {{Time1}} or {{Time2}}.

Best,
[Your Name]`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "WhatYouDo", label: "What You Do", placeholder: "growth marketing agency" },
      { key: "Companies", label: "Companies You've Worked With", placeholder: "Stripe, HubSpot, Notion" },
      { key: "CompetitiveNiche", label: "Competitive Niche", placeholder: "traditional marketing agencies" },
      { key: "Topic", label: "Topic", placeholder: "marketing" },
      { key: "Time1", label: "Time Option 1", placeholder: "Tuesday at 10am" },
      { key: "Time2", label: "Time Option 2", placeholder: "Thursday at 2pm" },
     ],
  },
];

// ═══════════════════════════════════════════════════════════
// Expert Frameworks — curated from top sales practitioners
// ═══════════════════════════════════════════════════════════

export const expertFrameworkTemplates: EmailTemplate[] = [
  {
    id: "ef-1", category: "Expert Frameworks", title: "Ask Before Pitch (Will Allred)",
    subject: "Quick question, {{FirstName}}",
    body: `Hey {{FirstName}}, [open-ended question as CTA]

You're {{Trigger}}. {{PotentialProblem}}

{{HowProductSolves}}

PS — Relevant because {{Personalization}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Trigger", label: "Trigger / Observation", placeholder: "hiring 5 new SDRs this quarter" },
      { key: "PotentialProblem", label: "Potential Problem", placeholder: "Ramping that many reps usually means inconsistent messaging" },
      { key: "HowProductSolves", label: "How Your Product Solves It", placeholder: "We give every rep a proven playbook from day one" },
      { key: "Personalization", label: "Personalization", placeholder: "I saw your post about scaling the team" },
    ],
  },
  {
    id: "ef-2", category: "Expert Frameworks", title: "Insight Validation (Leslie Venetz)",
    subject: "Thought on {{Topic}}, {{FirstName}}",
    body: `Hey {{FirstName}},

{{NonObviousInsight}}

I could be wrong — does that match what you're seeing at {{Company}}?

Companies like {{SocialProofCompany}} told us the same thing before switching to {{YourSolution}}.

Worth a quick chat?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Topic", label: "Topic", placeholder: "outbound conversion" },
      { key: "NonObviousInsight", label: "Non-Obvious Insight", placeholder: "Most SDR teams lose 40% of pipeline to bad data — not bad messaging" },
      { key: "SocialProofCompany", label: "Social Proof Company", placeholder: "Gong" },
      { key: "YourSolution", label: "Your Solution", placeholder: "our data enrichment layer" },
    ],
  },
  {
    id: "ef-3", category: "Expert Frameworks", title: "Pattern Interrupt (Patrick William Joyce)",
    subject: "Quick one, {{FirstName}}",
    body: `Hey {{FirstName}} – are there any discussions internally re: {{ThingYouHelpThemDo}}? We're helping companies like {{CompanyName}} achieve {{Outcome}} in {{Timeframe}} without {{BadThing}}. Is this a priority over at {{CompanyName}}?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "CompanyName", label: "Company", placeholder: "Acme Inc" },
      { key: "ThingYouHelpThemDo", label: "Thing You Help Them Do", placeholder: "reducing ramp time for new hires" },
      { key: "Outcome", label: "Outcome", placeholder: "50% faster onboarding" },
      { key: "Timeframe", label: "Timeframe", placeholder: "90 days" },
      { key: "BadThing", label: "Without (Bad Thing)", placeholder: "adding headcount to enablement" },
    ],
  },
  {
    id: "ef-4", category: "Expert Frameworks", title: "Pain Point + Case Study #1 (Alan Ruchtein)",
    subject: "How are you managing {{PainPoint}}?",
    body: `Hey {{FirstName}}, how are you managing {{PainPoint}}?

The reason I'm asking is because we help {{JobTitle}} at {{Subniche}} solve {{PainPoint}} by {{Offer}}.

Just recently, we helped {{CaseStudy}} achieve {{Transformation}} in {{Timeframe}} and made a quick video outlining how we'd do something similar for {{Company}}.

Is this something of interest?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "PainPoint", label: "Pain Point", placeholder: "lead response time" },
      { key: "JobTitle", label: "Job Title", placeholder: "VP Sales" },
      { key: "Subniche", label: "Sub-niche", placeholder: "mid-market SaaS" },
      { key: "Offer", label: "Your Offer", placeholder: "automating speed-to-lead" },
      { key: "CaseStudy", label: "Case Study", placeholder: "ClientCo" },
      { key: "Transformation", label: "Transformation", placeholder: "3x faster lead response" },
      { key: "Timeframe", label: "Timeframe", placeholder: "60 days" },
    ],
  },
  {
    id: "ef-5", category: "Expert Frameworks", title: "Pain Point + Case Study #2 (Alan Ruchtein)",
    subject: "Struggling with {{PainPoint}}?",
    body: `Hi {{FirstName}}, not sure if you're struggling with {{PainPoint}}.

The reason I ask is we helped {{CaseStudy}} achieve {{Transformation}} in {{Timeframe}} and made a quick video outlining how we'd do something similar for {{Company}}.

Mind if I share it here?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "PainPoint", label: "Pain Point", placeholder: "pipeline coverage" },
      { key: "CaseStudy", label: "Case Study", placeholder: "ClientCo" },
      { key: "Transformation", label: "Transformation", placeholder: "2x pipeline in 90 days" },
      { key: "Timeframe", label: "Timeframe", placeholder: "90 days" },
    ],
  },
  {
    id: "ef-6", category: "Expert Frameworks", title: "Meme Follow-Up (Eric Nowoslawski)",
    subject: "Re: {{ProblemYouSolve}}",
    body: `Hey {{FirstName}} let me know if this meme resonates at all.

[Attach a relevant meme]

Jokes aside, let me know if you'd like to connect re: {{ProblemYouSolve}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ProblemYouSolve", label: "Problem You Solve", placeholder: "outbound deliverability" },
    ],
  },
  {
    id: "ef-7", category: "Expert Frameworks", title: "Bullet Point Follow-Up (Eric Nowoslawski)",
    subject: "More context on {{Outcome}}",
    body: `Hey {{FirstName}} – to add some more context, here's how we achieved {{Outcome}}.

- {{Item1}}
- {{Item2}}
- {{Item3}}

Would it make sense to connect about this?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Outcome", label: "Outcome", placeholder: "40% more demos booked" },
      { key: "Item1", label: "Bullet 1", placeholder: "Rebuilt ICP targeting from scratch" },
      { key: "Item2", label: "Bullet 2", placeholder: "A/B tested 12 subject lines" },
      { key: "Item3", label: "Bullet 3", placeholder: "Cut sequence length from 8 to 4 steps" },
    ],
  },
  {
    id: "ef-8", category: "Expert Frameworks", title: "Reference Redirect Follow-Up (Eric Nowoslawski)",
    subject: "You or {{OtherName}}?",
    body: `Hey {{FirstName}} – I rolled the dice reaching out to you or {{OtherName}}. Let me know if this falls under you or if I should reach out to them.`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "OtherName", label: "Other Employee Name", placeholder: "Sarah" },
    ],
  },
  {
    id: "ef-9", category: "Expert Frameworks", title: "Lead Magnet Approach (Alan Ruchtein)",
    subject: "Have you tried {{UniqueMechanism}}?",
    body: `Hey {{FirstName}},

{{UniqueMechanism}} gets {{DesiredOutcome}}.

Have you tried {{UniqueMechanism}} already?

{{Struggle}}

So we made a {{LeadMagnet}} that gets {{DesiredOutcome}}.

Mind if I share?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "UniqueMechanism", label: "Unique Mechanism", placeholder: "Lead Magnets" },
      { key: "DesiredOutcome", label: "Desired Outcome", placeholder: "5-10x more replies than standard cold emails" },
      { key: "Struggle", label: "What They Struggle With", placeholder: "Testing new email styles takes at least 4 or 5 attempts to perfect" },
      { key: "LeadMagnet", label: "Lead Magnet Type", placeholder: "template" },
    ],
  },
  {
    id: "ef-10", category: "Expert Frameworks", title: "Selling Software to Sales (Christian Krause)",
    subject: "Missing piece at {{Company}}?",
    body: `{{FirstName}}, if {{ValueProp}} is missing, then {{TechnicalPain}}. As a result, {{QualitativeImpact}}. This strategy causes {{QuantitativeImpact}}.

{{ValidatingQuestion}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "ValueProp", label: "Value Prop", placeholder: "the KPI monitoring piece" },
      { key: "TechnicalPain", label: "Technical Pain", placeholder: "you won't see how reps execute strategy in real-time" },
      { key: "QualitativeImpact", label: "Qualitative Impact", placeholder: "you only learn about success or failure when monthly reports come in" },
      { key: "QuantitativeImpact", label: "Quantitative Impact", placeholder: "a hit-or-miss strategy that can cost crucial ARR needed for the next funding round" },
      { key: "ValidatingQuestion", label: "Validating Question", placeholder: "What are your thoughts?" },
    ],
  },
  {
    id: "ef-11", category: "Expert Frameworks", title: "Trigger > Pitch > Calculation > CTA (Thibaut Souyris)",
    subject: "Noticed something at {{Company}}",
    body: `{{FirstName}}, noticed {{Trigger}}.

We help {{TargetType}} {{QuickPitch}}.

{{Calculation}}

Worth a chat?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Trigger", label: "Trigger (with number)", placeholder: "you have over 50 open positions on your job portal" },
      { key: "TargetType", label: "Target Type", placeholder: "tech scale-ups" },
      { key: "QuickPitch", label: "Quick Pitch", placeholder: "reduce new employee churn from 30% to 10% or less" },
      { key: "Calculation", label: "Back-of-Napkin Calculation", placeholder: "With a typical cost of mishire around $30K per employee, this means going from 15 mishires to 5 — $300K saved" },
    ],
  },
  {
    id: "ef-12", category: "Expert Frameworks", title: "Trigger > Agitation > Social Proof > CTA (Alan Ruchtein)",
    subject: "Revenue loss",
    body: `Hey {{FirstName}},

{{Trigger}}. Usually, that means {{Agitation}}.

Not having it under control can {{NegativeConsequence}}.

We helped {{CaseStudy}} achieve {{Result}} in {{Timeframe}}.

Worth a chat?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Trigger", label: "Trigger", placeholder: "You have several open roles at your company" },
      { key: "Agitation", label: "Agitation", placeholder: "more difficulty, complexity, and costs when defining budgets" },
      { key: "NegativeConsequence", label: "Negative Consequence", placeholder: "drastically impact margin gains" },
      { key: "CaseStudy", label: "Case Study Company", placeholder: "XYZ Company" },
      { key: "Result", label: "Specific Result", placeholder: "20% cost reduction" },
      { key: "Timeframe", label: "Timeframe", placeholder: "6 months" },
    ],
  },
  {
    id: "ef-13", category: "Expert Frameworks", title: "Feedback Only — Competitor Research (Jed Mahrle)",
    subject: "Quick feedback, {{FirstName}}?",
    body: `Hey {{FirstName}},

Let me preface this by saying I'm not trying to sell you anything.

I was hoping to get some feedback from you as someone I would normally sell to…

I've started to build the sales team here at {{YourCompany}}. We're a competitor of tools like {{Competitors}} — I'm sure your team uses one of those.

I'm genuinely curious what — if anything — would it take for you to consider an alternative?

Any feedback would be massively appreciated.

Cheers`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "YourCompany", label: "Your Company", placeholder: "CloserKit" },
      { key: "Competitors", label: "Competitors", placeholder: "Outreach, Salesloft, Apollo" },
    ],
  },
  {
    id: "ef-14", category: "Expert Frameworks", title: "Feedback Only — Quote Request (Jed Mahrle)",
    subject: "Request for quote from {{FirstName}}",
    body: `{{FirstName}} – we are speaking with other {{LeadershipType}} leaders and were curious if we could get a quote.

No call is necessary, we just had two questions:

1. {{Question1}}
2. {{Question2}}

We are looking to share answers from you and your peers anonymously in a report we are gathering together for the market.

Any response would be appreciated!`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "LeadershipType", label: "Leadership Type", placeholder: "RevOps" },
      { key: "Question1", label: "Question 1 (Opinion)", placeholder: "What's the biggest challenge you face with pipeline forecasting?" },
      { key: "Question2", label: "Question 2 (Problem Discovery)", placeholder: "How are you currently handling deal inspection across your team?" },
     ],
  },
];

// ═══════════════════════════════════════════════════════════
// LinkedIn DM Templates — outreach frameworks for LinkedIn
// ═══════════════════════════════════════════════════════════

export const linkedinDmTemplates: EmailTemplate[] = [
  {
    id: "li-1", category: "LinkedIn DMs", title: "😯 Ask Before Pitch — Pattern Interrupt",
    subject: "Quick question",
    body: `Hey {{FirstName}}, {{OpenEndedQuestion}}

You're {{Trigger}}. {{PotentialProblem}}

{{HowProductSolves}}

PS — Relevant because {{Personalization}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Will" },
      { key: "OpenEndedQuestion", label: "Open-Ended Question", placeholder: "think this would help George & Anne?" },
      { key: "Trigger", label: "Trigger / Observation", placeholder: "hiring new sellers" },
      { key: "PotentialProblem", label: "Potential Problem", placeholder: "Despite the same templates, some reps get results and others don't" },
      { key: "HowProductSolves", label: "How Product Solves It", placeholder: "Lavender gives you a clearer picture on why things work. We've even seen it identify clear personalization plays for the team to use." },
      { key: "Personalization", label: "Personalization", placeholder: "the new focus upmarket" },
    ],
  },
  {
    id: "li-2", category: "LinkedIn DMs", title: "💎 Upfront Value",
    subject: "Something useful for you",
    body: `Hey {{FirstName}},

{{ValueOffering}}

Hope it was helpful!`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "ValueOffering", label: "Value Offering", placeholder: "Here's a list of every founder at every company that just implemented HubSpot" },
    ],
  },
  {
    id: "li-3", category: "LinkedIn DMs", title: "📒 Leverage Content in Outbound",
    subject: "{{ContentName}} for you",
    body: `Hey {{FirstName}} — we've compiled {{ContentName}} on how folks like {{SocialProof}} are {{Outcome}}.

Can I send it over to you?

{{SenderName}}
PS — Thought this was relevant because {{Personalization}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Jason" },
      { key: "ContentName", label: "Content Name", placeholder: "a cheat sheet" },
      { key: "SocialProof", label: "Social Proof", placeholder: "Gong, Outreach, and Clari" },
      { key: "Outcome", label: "Outcome", placeholder: "getting their AEs self-sourcing more than 30% of their own pipeline" },
      { key: "SenderName", label: "Your Name", placeholder: "Ethan" },
      { key: "Personalization", label: "Personalization", placeholder: "I saw you recently decreased SDR headcount and are hiring 3 more AEs right now" },
    ],
  },
  {
    id: "li-4", category: "LinkedIn DMs", title: "➕➗ Do the Math",
    subject: "Quick math on {{Company}}",
    body: `{{FirstName}}, {{Trigger}}.

{{QuickPitch}}.

{{Calculation}}.

Worth a chat?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Mary" },
      { key: "Company", label: "Company", placeholder: "Acme Inc" },
      { key: "Trigger", label: "Trigger (with number)", placeholder: "noticed you have over 50 open positions on your job portal" },
      { key: "QuickPitch", label: "Quick Pitch", placeholder: "We help tech scale-ups reduce new employee churn from 30% to 10% or less" },
      { key: "Calculation", label: "Back-of-Napkin Calculation", placeholder: "With a typical cost of mishire around $30K per employee, this means going from 15 mishires to 5 — $300K saved" },
    ],
  },
  {
    id: "li-5", category: "LinkedIn DMs", title: "🐛 Short Trigger-Based Outreach",
    subject: "Noticed something at {{Company}}",
    body: `{{Trigger}}.

{{ValidationAndValueProp}}.

Can I share how?`,
    variables: [
      { key: "Company", label: "Company", placeholder: "Reach" },
      { key: "Trigger", label: "Relevant Trigger", placeholder: "Saw that Reach's latest blog post doesn't include a Meta tag which can affect its online visibility" },
      { key: "ValidationAndValueProp", label: "Validation + Value Prop", placeholder: "{{client}} improved theirs by creating meta tags using ChatGPT" },
    ],
  },
  {
    id: "li-6", category: "LinkedIn DMs", title: "👯 Challenge of Similar Companies",
    subject: "Quick question, {{FirstName}}",
    body: `Hey {{FirstName}},

We are working with a lot of {{RoleType}} at {{IndustryType}} who {{Challenge}}.

{{Solution}}.

{{CTA}}

Cheers,
PS: {{FunnyPS}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Patrick" },
      { key: "RoleType", label: "Role Type", placeholder: "security officers" },
      { key: "IndustryType", label: "Industry Type", placeholder: "banks" },
      { key: "Challenge", label: "Challenge", placeholder: "faced losses of $9K per hour due to ransomware and had phishing victims every 11 seconds" },
      { key: "Solution", label: "Solution", placeholder: "We have a global team of experts available 24/7 to respond to and contain cyber incidents and can react in hours not days" },
      { key: "CTA", label: "CTA", placeholder: "When is the last time you tested your plan?" },
      { key: "FunnyPS", label: "Funny/Personal PS", placeholder: "I would attach a link but we both work in security 😅" },
    ],
  },
  {
    id: "li-7", category: "LinkedIn DMs", title: "⬜ Neutral Insight",
    subject: "Thought you'd find this interesting",
    body: `{{FirstName}}, do you read {{ThirdPartySource}}?

Given you're likely {{Context}}, I thought you'd find it interesting. {{InsightDetail}}.

Check it out.

{{SenderName}}
PS: {{Followup}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "George" },
      { key: "ThirdPartySource", label: "Third-Party Source", placeholder: "Outreach's blog" },
      { key: "Context", label: "Their Context", placeholder: "ramping reps" },
      { key: "InsightDetail", label: "Insight Detail", placeholder: "The VP of Sales Dev at Segment wrote about how she scaled her team to a $3.2B acquisition — without using canned templates" },
      { key: "SenderName", label: "Your Name", placeholder: "Will" },
      { key: "Followup", label: "Follow-up / PS", placeholder: "Any thoughts on my last note?" },
    ],
  },
  {
    id: "li-8", category: "LinkedIn DMs", title: "👨‍👦‍👦 Leader Responsibilities",
    subject: "Curious, {{FirstName}}",
    body: `{{FirstName}}, as a {{Role}} leader, curious how {{Responsibility}}?

{{Offer}}

Either way, {{Personalization}}!`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Armand" },
      { key: "Role", label: "Role", placeholder: "Sales" },
      { key: "Responsibility", label: "Responsibility Question", placeholder: "your reps prioritize which accounts to reach out to" },
      { key: "Offer", label: "Your Offer", placeholder: "If I can create a list for your team of Accounts researching competitors like Salesforce, would it be worth a conversation?" },
      { key: "Personalization", label: "Personalization", placeholder: "congrats on recently being named Top Sales Coach" },
    ],
  },
  {
    id: "li-9", category: "LinkedIn DMs", title: "✏️ Manual Style — Casual & Credible",
    subject: "Quick idea",
    body: `Hey, {{FirstName}} – {{PersonalHook}}.

I've been doing {{Expertise}} for {{Years}} years – have a few unconventional ideas that might {{Outcome}} without {{Downside}}.

{{RiskReversal}}.

Worth batting around a few ideas?

{{SenderName}}
PS: Not sure it's a fit for you, but {{SocialProof}}.`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Josh" },
      { key: "PersonalHook", label: "Personal Hook", placeholder: "Subscribed to your email list a few weeks ago" },
      { key: "Expertise", label: "Your Expertise", placeholder: "digital marketing" },
      { key: "Years", label: "Years of Experience", placeholder: "8" },
      { key: "Outcome", label: "Outcome", placeholder: "goose sales of your Badass Guide" },
      { key: "Downside", label: "Without (Downside)", placeholder: "offering discounts" },
      { key: "RiskReversal", label: "Risk Reversal", placeholder: "I don't get paid unless you make more" },
      { key: "SenderName", label: "Your Name", placeholder: "Henry" },
      { key: "SocialProof", label: "Social Proof", placeholder: "several course creators I'm working with are seeing a 10-12% MoM boost in sales" },
    ],
  },
  {
    id: "li-10", category: "LinkedIn DMs", title: "🚘 Be Specific, Not Generic",
    subject: "Thought about {{Company}}",
    body: `Hi {{FirstName}} – We're seeing that many {{IndustryType}} companies {{CompanyQualifier}} are {{Problem}}.

One of the reasons is {{Reason}}.

Worth exploring for {{Company}}?

Either way, {{PersonalTouch}}!`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Company", label: "Company", placeholder: "Animal Pharm" },
      { key: "IndustryType", label: "Industry Type", placeholder: "e-commerce companies in the pet space" },
      { key: "CompanyQualifier", label: "Company Qualifier", placeholder: "doing at least $5K/month in revenue" },
      { key: "Problem", label: "Problem", placeholder: "overpaying for shipping by 10-15%" },
      { key: "Reason", label: "Reason", placeholder: "the weight and dimensions of boxes for pet products" },
      { key: "PersonalTouch", label: "Personal Touch", placeholder: "I bought Cucumber Melon shampoo for my dog and love the smell" },
    ],
  },
  {
    id: "li-11", category: "LinkedIn DMs", title: "🫰 Why Are You Paying?",
    subject: "Quick thought",
    body: `Hey {{FirstName}},

{{LifeSituation}}.

{{ObviousChoice}}.

{{CompareToProspect}}.

Curious — {{CTA}}?`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "Sarah" },
      { key: "LifeSituation", label: "Life Situation Setup", placeholder: "Imagine you're buying a car and the dealer offers you a warranty that covers everything — brakes, engine, transmission" },
      { key: "ObviousChoice", label: "Obvious Choice", placeholder: "You'd obviously take it, right? Why pay out of pocket for something that's already covered?" },
      { key: "CompareToProspect", label: "Compare to Prospect's Situation", placeholder: "That's kind of what's happening when teams pay full price for data enrichment tools that only cover 60% of their TAM" },
      { key: "CTA", label: "CTA", placeholder: "have you looked at what you're actually getting for what you pay" },
    ],
  },
  {
    id: "li-12", category: "LinkedIn DMs", title: "😅 Be Cheeky — Humor + Personality",
    subject: "Re: {{Topic}}",
    body: `{{FirstName}} — {{DirectStatement}}.

{{HumorLine}} 😉

{{CTA}}`,
    variables: [
      { key: "FirstName", label: "First Name", placeholder: "John" },
      { key: "Topic", label: "Topic", placeholder: "data inputs" },
      { key: "DirectStatement", label: "Direct Statement", placeholder: "Yes, we can take in multiple data inputs & account for specific rules and logic" },
      { key: "HumorLine", label: "Humor Line", placeholder: "You can thank me later for being able to read your mind" },
      { key: "CTA", label: "CTA", placeholder: "Want me to show you how it works for your team?" },
    ],
  },
];
