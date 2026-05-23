export type SlideFeature =
  | string
  | { bold: string; rest: string }
  | { before: string; bold: string; after?: string };

export type BeforeAfterConfig = {
  beforeAssetId: "modernizace-before";
  afterAssetId: "modernizace-after";
  beforeLabel: string;
  afterLabel: string;
  introDemo?: boolean;
};

export type Slide = {
  id: string;
  title: string;
  description: string;
  featuresSubheading?: string;
  features: SlideFeature[];
  cta: string;
  imageAssetId?: "web-app" | "ai-bot";
  beforeAfter?: BeforeAfterConfig;
};
