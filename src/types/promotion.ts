export type PromotionPlacement = "CUSTOMER_HOME" | "CUSTOMER_WALLET" | "CUSTOMER_REWARDS";

export type Promotion = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaLabel?: string;
  ctaUrl?: string;
  badge?: "FEATURED" | "LIMITED" | "MEMBER_EXCLUSIVE" | string;
};
