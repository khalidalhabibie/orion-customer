import type { Promotion, PromotionPlacement } from "../types/promotion";

export const mockPromotionsByPlacement: Record<PromotionPlacement, Promotion[]> = {
  CUSTOMER_HOME: [
    {
      id: "home-kopi-senja-member",
      title: "Morning coffee for members",
      description: "Start your day with a member-only coffee benefit at Kopi Senja.",
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "View Offer",
      ctaUrl: "/vouchers/coffee-discount",
      badge: "MEMBER_EXCLUSIVE",
    },
    {
      id: "home-lunch-reward",
      title: "Lunch reward is waiting",
      description: "Use your loyalty progress to unlock a warm lunch package.",
      imageUrl:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "Claim Reward",
      ctaUrl: "/memberships/warung-nusantara-stamp-card",
      badge: "FEATURED",
    },
    {
      id: "home-laundry-weekend",
      title: "Weekend laundry savings",
      description: "Keep your week simple with a special CleanMate member offer.",
      imageUrl:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "Learn More",
      ctaUrl: "/vouchers/laundry",
      badge: "LIMITED",
    },
  ],
  CUSTOMER_WALLET: [
    {
      id: "wallet-fitspace",
      title: "Move more this week",
      description: "Try FitSpace with your loyalty benefits and keep your routine going.",
      imageUrl:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "View Benefit",
      ctaUrl: "/memberships/fitspace-stamp-card",
      badge: "FEATURED",
    },
    {
      id: "wallet-bookstore",
      title: "A new read for less",
      description: "Enjoy member savings on books and stationery at Ruang Buku.",
      imageUrl:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "View Offer",
      ctaUrl: "/vouchers/bookstore",
      badge: "MEMBER_EXCLUSIVE",
    },
  ],
  CUSTOMER_REWARDS: [
    {
      id: "rewards-food-cashback",
      title: "Cashback for local favorites",
      description: "Get cashback when you order selected dishes at Warung Nusantara.",
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "View Offer",
      ctaUrl: "/vouchers/food-cashback",
      badge: "FEATURED",
    },
    {
      id: "rewards-cine-bogo",
      title: "Movie night benefit",
      description: "Bring someone along with a buy 1 get 1 ticket reward.",
      imageUrl:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "Learn More",
      ctaUrl: "/vouchers/movie-ticket",
      badge: "LIMITED",
    },
    {
      id: "rewards-coffee",
      title: "Your next coffee, lighter",
      description: "A simple member benefit for your next Kopi Senja visit.",
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
      ctaLabel: "View Offer",
      ctaUrl: "/vouchers/coffee-discount",
      badge: "MEMBER_EXCLUSIVE",
    },
  ],
};
