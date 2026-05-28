import { Link } from "react-router-dom";
import { SummaryCard } from "../components/SummaryCard";
import type { Membership } from "../types/membership";
import type { Voucher } from "../types/voucher";

type WalletPageProps = {
  vouchers: Voucher[];
  memberships: Membership[];
};

export function WalletPage({ vouchers, memberships }: WalletPageProps) {
  const availableVoucherCount = vouchers.filter((voucher) => voucher.status === "AVAILABLE").length;
  const activeMembershipCount = memberships.filter(
    (membership) => membership.status === "ACTIVE" || membership.status === "REWARD_READY",
  ).length;
  const rewardsReadyCount = memberships.filter((membership) => membership.status === "REWARD_READY").length;

  return (
    <main className="page wallet-page">
      <section className="page-heading">
        <p className="eyebrow">Customer wallet</p>
        <h1>Hi, welcome back</h1>
        <p>Manage your vouchers, collect stamps, and redeem rewards from participating tenants.</p>
      </section>

      <section className="summary-grid" aria-label="Wallet summary">
        <SummaryCard label="Available vouchers" value={availableVoucherCount} />
        <SummaryCard label="Active memberships" value={activeMembershipCount} />
        <SummaryCard label="Rewards ready" value={rewardsReadyCount} />
      </section>

      <section className="quick-actions" aria-label="Quick actions">
        <Link className="quick-action-card" to="/vouchers">
          <span>Voucher wallet</span>
          <strong>View Vouchers</strong>
        </Link>
        <Link className="quick-action-card" to="/memberships">
          <span>Stamp cards</span>
          <strong>View Memberships</strong>
        </Link>
      </section>
    </main>
  );
}
