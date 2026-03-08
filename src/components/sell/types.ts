export interface PersonaType {
  personaName: string;
  ageRange: string;
  gender: string;
  incomeLevel: string;
  location: string;
  painPoints: string[];
  buyingTriggers: string[];
  bestTimeToReach: string;
  howToTargetThem: string;
}

export interface PitchType {
  hook: string;
  problem: string;
  solution: string;
  proof: string;
  cta: string;
}

export interface ColdEmailType {
  day: number;
  subject: string;
  body: string;
}

export interface LinkedInMsgType {
  day: number;
  message: string;
}

export interface ObjectionType {
  objection: string;
  psychology: string;
  softResponse: string;
  assertiveResponse: string;
  closingLine: string;
}

export interface PlatformType {
  name: string;
  adCopy: string;
  targetingSettings: string;
  bestPostingTime: string;
  contactMethod: string;
}

export interface EmailTemplateType {
  type: string;
  subject: string;
  body: string;
}

export interface MarketplaceType {
  platform: string;
  title: string;
  description: string;
  tags: string[];
  pricingTip: string;
}

export interface OfflineChannelType {
  channel: string;
  location: string;
  script: string;
  contactInfo: string;
}

export interface SalesKitResult {
  hook: string;
  category: string;
  marketType: "B2B" | "B2C" | "Both";
  usp: string[];
  audience: PersonaType[];
  pitches: {
    emotional: PitchType;
    logical: PitchType;
    urgency: PitchType;
    sms: string;
    whatsapp: string;
  };
  b2b: {
    industries: string[];
    companySize: string;
    jobTitles: string[];
    estimatedLeads: string;
    linkedinFilters: string;
    coldEmailSequence: ColdEmailType[];
    linkedinMessages: LinkedInMsgType[];
    coldCallScript: {
      opener: string;
      pitch: string;
      objections: { objection: string; response: string }[];
      close: string;
    };
    directories: string[];
    phoneNumbers: string;
    platformsToList: string[];
  };
  b2c: {
    platforms: PlatformType[];
    emailTemplates: EmailTemplateType[];
    marketplaces: MarketplaceType[];
    offlineChannels: OfflineChannelType[];
    whatsappBroadcast: string;
    coldContactPlaces: string[];
  };
  keywords: {
    primary: string[];
    longTail: string[];
    negative: string[];
    metaTitle: string;
    metaDescription: string;
    blogTitles: string[];
    youtubeTitles: string[];
  };
  objections: ObjectionType[];
}

export type OfferingType = "product" | "service" | "both";
export type MarketTarget = "b2c" | "b2b" | "both";
