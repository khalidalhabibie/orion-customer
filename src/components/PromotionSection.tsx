import { useEffect, useRef } from "react";
import { trackPromotionClick, trackPromotionImpression } from "../api/promotions";
import { usePromotions } from "../hooks/usePromotions";
import type { Promotion, PromotionPlacement } from "../types/promotion";

type PromotionSectionProps = {
  title: string;
  placement: PromotionPlacement;
  limit?: number;
  variant?: "featured" | "subtle";
};

const trackedImpressions = new Set<string>();

function formatBadge(badge?: string) {
  if (!badge) {
    return "Featured";
  }

  return badge
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function PromotionSkeleton() {
  return (
    <div className="promotion-card promotion-card--skeleton" aria-hidden="true">
      <div className="promotion-card__image" />
      <div className="promotion-card__body">
        <span />
        <strong />
        <p />
      </div>
    </div>
  );
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
  const cardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = cardRef.current;

    if (!element || trackedImpressions.has(promotion.id)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackedImpressions.add(promotion.id);
          trackPromotionImpression(promotion.id);
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [promotion.id]);

  return (
    <article className="promotion-card" ref={cardRef}>
      {promotion.imageUrl ? (
        <img className="promotion-card__image" src={promotion.imageUrl} alt="" loading="lazy" />
      ) : (
        <div className="promotion-card__image" aria-hidden="true" />
      )}
      <div className="promotion-card__body">
        <span className="promotion-card__badge">{formatBadge(promotion.badge)}</span>
        <h3>{promotion.title}</h3>
        <p>{promotion.description}</p>
        <a
          className="button button--secondary promotion-card__cta"
          href={promotion.ctaUrl ?? "#"}
          onClick={(event) => {
            if (!promotion.ctaUrl) {
              event.preventDefault();
            }

            trackPromotionClick(promotion.id);
          }}
        >
          {promotion.ctaLabel ?? "View Offer"}
        </a>
      </div>
    </article>
  );
}

export function PromotionSection({ title, placement, limit, variant = "featured" }: PromotionSectionProps) {
  const { promotions, isLoading } = usePromotions(placement, limit);

  if (!isLoading && promotions.length === 0) {
    return null;
  }

  return (
    <section className={`promotion-section promotion-section--${variant}`} aria-label={title}>
      <div className="section-title">
        <h2>{title}</h2>
      </div>

      <div className="promotion-carousel">
        {isLoading
          ? Array.from({ length: variant === "subtle" ? 1 : 3 }, (_, index) => <PromotionSkeleton key={index} />)
          : promotions.map((promotion) => <PromotionCard promotion={promotion} key={promotion.id} />)}
      </div>
    </section>
  );
}
