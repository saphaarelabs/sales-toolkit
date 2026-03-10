import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are a world-class sales strategist with deep knowledge of Indian and global markets. The user will describe a product or service in plain English. Analyze it and return a comprehensive, hyper-specific sales kit using the generate_sales_kit tool. Use real platform names, real Indian market data, real contact methods. Never be vague or generic. Include at least 2-3 audience personas, 5+ objections, and detailed B2B/B2C outreach strategies.`;

const salesKitTool = {
  type: "function" as const,
  function: {
    name: "generate_sales_kit",
    description: "Generate a complete structured sales kit from a product/service description.",
    parameters: {
      type: "object",
      properties: {
        hook: { type: "string", description: "One killer sales sentence" },
        category: { type: "string", description: "Auto-detected product category" },
        marketType: { type: "string", enum: ["B2B", "B2C", "Both"] },
        usp: { type: "array", items: { type: "string" }, description: "3 unique selling points" },
        audience: {
          type: "array",
          items: {
            type: "object",
            properties: {
              personaName: { type: "string" },
              ageRange: { type: "string" },
              gender: { type: "string" },
              incomeLevel: { type: "string" },
              location: { type: "string" },
              painPoints: { type: "array", items: { type: "string" } },
              buyingTriggers: { type: "array", items: { type: "string" } },
              bestTimeToReach: { type: "string" },
              howToTargetThem: { type: "string" },
            },
            required: ["personaName", "ageRange", "gender", "incomeLevel", "location", "painPoints", "buyingTriggers", "bestTimeToReach", "howToTargetThem"],
          },
        },
        pitches: {
          type: "object",
          properties: {
            emotional: {
              type: "object",
              properties: { hook: { type: "string" }, problem: { type: "string" }, solution: { type: "string" }, proof: { type: "string" }, cta: { type: "string" } },
              required: ["hook", "problem", "solution", "proof", "cta"],
            },
            logical: {
              type: "object",
              properties: { hook: { type: "string" }, problem: { type: "string" }, solution: { type: "string" }, proof: { type: "string" }, cta: { type: "string" } },
              required: ["hook", "problem", "solution", "proof", "cta"],
            },
            urgency: {
              type: "object",
              properties: { hook: { type: "string" }, problem: { type: "string" }, solution: { type: "string" }, proof: { type: "string" }, cta: { type: "string" } },
              required: ["hook", "problem", "solution", "proof", "cta"],
            },
            sms: { type: "string", description: "SMS template under 160 chars" },
            whatsapp: { type: "string" },
          },
          required: ["emotional", "logical", "urgency", "sms", "whatsapp"],
        },
        b2b: {
          type: "object",
          properties: {
            industries: { type: "array", items: { type: "string" } },
            companySize: { type: "string" },
            jobTitles: { type: "array", items: { type: "string" } },
            estimatedLeads: { type: "string" },
            linkedinFilters: { type: "string" },
            coldEmailSequence: {
              type: "array",
              items: {
                type: "object",
                properties: { day: { type: "number" }, subject: { type: "string" }, body: { type: "string" } },
                required: ["day", "subject", "body"],
              },
            },
            linkedinMessages: {
              type: "array",
              items: {
                type: "object",
                properties: { day: { type: "number" }, message: { type: "string" } },
                required: ["day", "message"],
              },
            },
            coldCallScript: {
              type: "object",
              properties: {
                opener: { type: "string" },
                pitch: { type: "string" },
                objections: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: { objection: { type: "string" }, response: { type: "string" } },
                    required: ["objection", "response"],
                  },
                },
                close: { type: "string" },
              },
              required: ["opener", "pitch", "objections", "close"],
            },
            directories: { type: "array", items: { type: "string" } },
            phoneNumbers: { type: "string" },
            platformsToList: { type: "array", items: { type: "string" } },
          },
          required: ["industries", "companySize", "jobTitles", "estimatedLeads", "linkedinFilters", "coldEmailSequence", "linkedinMessages", "coldCallScript", "directories", "phoneNumbers", "platformsToList"],
        },
        b2c: {
          type: "object",
          properties: {
            platforms: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  adCopy: { type: "string" },
                  targetingSettings: { type: "string" },
                  bestPostingTime: { type: "string" },
                  contactMethod: { type: "string" },
                },
                required: ["name", "adCopy", "targetingSettings", "bestPostingTime", "contactMethod"],
              },
            },
            emailTemplates: {
              type: "array",
              items: {
                type: "object",
                properties: { type: { type: "string" }, subject: { type: "string" }, body: { type: "string" } },
                required: ["type", "subject", "body"],
              },
            },
            marketplaces: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  platform: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  tags: { type: "array", items: { type: "string" } },
                  pricingTip: { type: "string" },
                },
                required: ["platform", "title", "description", "tags", "pricingTip"],
              },
            },
            offlineChannels: {
              type: "array",
              items: {
                type: "object",
                properties: { channel: { type: "string" }, location: { type: "string" }, script: { type: "string" }, contactInfo: { type: "string" } },
                required: ["channel", "location", "script", "contactInfo"],
              },
            },
            whatsappBroadcast: { type: "string" },
            coldContactPlaces: { type: "array", items: { type: "string" } },
          },
          required: ["platforms", "emailTemplates", "marketplaces", "offlineChannels", "whatsappBroadcast", "coldContactPlaces"],
        },
        keywords: {
          type: "object",
          properties: {
            primary: { type: "array", items: { type: "string" } },
            longTail: { type: "array", items: { type: "string" } },
            negative: { type: "array", items: { type: "string" } },
            metaTitle: { type: "string" },
            metaDescription: { type: "string" },
            blogTitles: { type: "array", items: { type: "string" } },
            youtubeTitles: { type: "array", items: { type: "string" } },
          },
          required: ["primary", "longTail", "negative", "metaTitle", "metaDescription", "blogTitles", "youtubeTitles"],
        },
        objections: {
          type: "array",
          items: {
            type: "object",
            properties: {
              objection: { type: "string" },
              psychology: { type: "string" },
              softResponse: { type: "string" },
              assertiveResponse: { type: "string" },
              closingLine: { type: "string" },
            },
            required: ["objection", "psychology", "softResponse", "assertiveResponse", "closingLine"],
          },
        },
      },
      required: ["hook", "category", "marketType", "usp", "audience", "pitches", "b2b", "b2c", "keywords", "objections"],
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { description, offeringType, marketTarget } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = `Product/Service Description: "${description}"
Offering Type: ${offeringType}
Target Market: ${marketTarget}

Generate a complete, hyper-specific sales kit. Be detailed and actionable. Use real Indian and global market data.`;

    const payload = JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      tools: [salesKitTool],
      tool_choice: { type: "function", function: { name: "generate_sales_kit" } },
    });

    let response: Response | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: payload,
      });
      if (response.status !== 503) break;
      console.log(`Attempt ${attempt + 1} got 503, retrying...`);
      await response.text(); // consume body
      await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
    }

    if (!response || !response.ok) {
      const status = response?.status || 500;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = response ? await response.text() : "No response";
      console.error("AI gateway error:", status, text);
      return new Response(JSON.stringify({ error: "Failed to generate sales kit." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      console.error("No tool call in response:", JSON.stringify(data));
      return new Response(JSON.stringify({ error: "AI did not return structured data. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let result;
    try {
      result = typeof toolCall.function.arguments === "string"
        ? JSON.parse(toolCall.function.arguments)
        : toolCall.function.arguments;
    } catch {
      console.error("Failed to parse tool call arguments:", toolCall.function.arguments);
      return new Response(JSON.stringify({ error: "Failed to parse AI response." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sell-anything error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
