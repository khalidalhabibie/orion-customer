import type { Promotion, PromotionPlacement } from "../types/promotion";

type RawPromotion = Promotion & {
  image_url?: string;
  cta_label?: string;
  cta_url?: string;
};

type PromotionResponse = RawPromotion[] | { data?: RawPromotion[]; promotions?: RawPromotion[] };

function getPromotionsFromResponse(response: PromotionResponse): Promotion[] {
  const promotions = Array.isArray(response) ? response : response.data ?? response.promotions ?? [];

  return promotions.map(normalizePromotion).filter((promotion) => promotion.id && promotion.title);
}

function normalizePromotion(promotion: RawPromotion): Promotion {
  return {
    id: promotion.id,
    title: promotion.title,
    description: promotion.description,
    imageUrl: promotion.imageUrl ?? promotion.image_url ?? "",
    ctaLabel: promotion.ctaLabel ?? promotion.cta_label,
    ctaUrl: promotion.ctaUrl ?? promotion.cta_url,
    badge: promotion.badge,
  };
}


export async function fetchPromotions(placement: PromotionPlacement, signal?: AbortSignal): Promise<Promotion[]> {
  const response = await fetch(`/api/customer/promotions?placement=${placement}`, { signal });

  if (!response.ok) {
    throw new Error(`Failed to fetch promotions for ${placement}`);
  }

  return getPromotionsFromResponse((await response.json()) as PromotionResponse);
}

export function trackPromotionImpression(id: string) {
  void postPromotionEvent(id, "impression");
}

export function trackPromotionClick(id: string) {
  void postPromotionEvent(id, "click");
}

async function postPromotionEvent(id: string, eventName: "impression" | "click") {
  const url = `/api/customer/promotions/${id}/${eventName}`;

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(url, new Blob([], { type: "application/json" }));

    if (sent) {
      return;
    }
  }

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
  });
}
