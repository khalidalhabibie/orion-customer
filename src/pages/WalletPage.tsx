import { Link } from "react-router-dom";
import { StatusBadge } from "../components/StatusBadge";
import type { Membership } from "../types/membership";
import type { Voucher } from "../types/voucher";

type WalletPageProps = {
  vouchers: Voucher[];
  memberships: Membership[];
};

export function WalletPage({ vouchers, memberships }: WalletPageProps) {
  const availableVouchers = vouchers.filter((voucher) => voucher.status === "AVAILABLE");
  const primaryMembership =
    memberships.find((membership) => membership.status === "REWARD_READY") ??
    memberships.find((membership) => membership.status === "ACTIVE") ??
    memberships[0];
  const readyRewards = memberships.filter((membership) => membership.status === "REWARD_READY");
  const recentActivity = [
    ...vouchers.filter((voucher) => voucher.status === "USED").map((voucher) => `${voucher.benefit} used at ${voucher.tenantName}`),
    ...memberships
      .filter((membership) => membership.status === "COMPLETED")
      .map((membership) => `${membership.rewardName} completed at ${membership.tenantName}`),
  ].slice(0, 3);

  return (
    <main className="page wallet-page app-page">
      <section className="home-hero">
        <p className="eyebrow">Our Voucher</p>
        <h1>Good to see you</h1>
        <p>Your rewards, vouchers, and stamp cards are ready when you are.</p>
      </section>

      <section className="premium-card" aria-label="Membership status">
        {primaryMembership ? (
          <>
            <div className="premium-card__top">
              <div>
                <span>{primaryMembership.tenantName}</span>
                <h2>{primaryMembership.programName}</h2>
              </div>
              <StatusBadge status={primaryMembership.status} />
            </div>
            <div className="premium-card__progress">
              <strong>
                {primaryMembership.currentStamps}/{primaryMembership.requiredStamps}
              </strong>
              <span>stamps collected</span>
            </div>
            <div className="premium-card__bar">
              <span
                style={{
                  width: `${Math.min((primaryMembership.currentStamps / primaryMembership.requiredStamps) * 100, 100)}%`,
                }}
              />
            </div>
            <p>{primaryMembership.rewardName}</p>
          </>
        ) : (
          <div className="compact-empty compact-empty--dark">
            <h2>No membership yet</h2>
            <p>Join a tenant program to start collecting stamps.</p>
          </div>
        )}
      </section>

      <section className="primary-actions" aria-label="Main actions">
        <Link className="button primary-action" to={availableVouchers[0] ? `/vouchers/${availableVouchers[0].id}` : "/vouchers"}>
          Redeem Voucher
        </Link>
        <Link className="button button--ghost primary-action" to="/memberships">
          Scan QR
        </Link>
      </section>

      <section className="home-section" aria-label="Available rewards">
        <div className="section-title">
          <h2>Ready rewards</h2>
          <Link to="/vouchers">See all</Link>
        </div>
        {readyRewards.length > 0 || availableVouchers.length > 0 ? (
          <div className="reward-strip">
            {readyRewards.slice(0, 2).map((membership) => (
              <Link className="reward-pill" to={`/memberships/${membership.id}`} key={membership.id}>
                <span>{membership.tenantName}</span>
                <strong>{membership.rewardName}</strong>
              </Link>
            ))}
            {availableVouchers.slice(0, 2).map((voucher) => (
              <Link className="reward-pill" to={`/vouchers/${voucher.id}`} key={voucher.id}>
                <span>{voucher.tenantName}</span>
                <strong>{voucher.benefit}</strong>
              </Link>
            ))}
          </div>
        ) : (
          <div className="compact-empty">
            <h3>No rewards yet</h3>
            <p>Collect stamps or claim vouchers to unlock rewards.</p>
          </div>
        )}
      </section>

      <section className="home-section" aria-label="Recent activity">
        <div className="section-title">
          <h2>Recent activity</h2>
        </div>
        {recentActivity.length > 0 ? (
          <ul className="activity-list">
            {recentActivity.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        ) : (
          <div className="compact-empty">
            <h3>No recent activity</h3>
            <p>Your redemptions and completed rewards will appear here.</p>
          </div>
        )}
      </section>
    </main>
  );
}
