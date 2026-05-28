import { MembershipCard } from "../components/MembershipCard";
import type { Membership } from "../types/membership";

type MembershipListPageProps = {
  memberships: Membership[];
};

export function MembershipListPage({ memberships }: MembershipListPageProps) {
  return (
    <main className="page memberships-page app-page">
      <section className="page-heading">
        <p className="eyebrow">Memberships</p>
        <h1>My Stamp Cards</h1>
      </section>

      {memberships.length > 0 ? (
        <section className="voucher-grid" aria-label="Membership list">
          {memberships.map((membership) => (
            <MembershipCard membership={membership} key={membership.id} />
          ))}
        </section>
      ) : (
        <section className="empty-panel" aria-label="No membership">
          <h2>No membership yet</h2>
          <p>Your stamp cards will appear here after you join a tenant membership program.</p>
        </section>
      )}
    </main>
  );
}
