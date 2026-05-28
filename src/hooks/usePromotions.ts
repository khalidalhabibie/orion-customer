import { useEffect, useState } from "react";
import { fetchPromotions } from "../api/promotions";
import type { Promotion, PromotionPlacement } from "../types/promotion";

type UsePromotionsResult = {
  promotions: Promotion[];
  isLoading: boolean;
};

export function usePromotions(placement: PromotionPlacement, limit?: number): UsePromotionsResult {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPromotions() {
      try {
        setIsLoading(true);
        const data = await fetchPromotions(placement, controller.signal);
        setPromotions(typeof limit === "number" ? data.slice(0, limit) : data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setPromotions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPromotions();

    return () => controller.abort();
  }, [limit, placement]);

  return { promotions, isLoading };
}
