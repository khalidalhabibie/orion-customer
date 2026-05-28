import { MembershipCard } from "../components/MembershipCard";
import type { Membership } from "../types/membership";

type MembershipListPageProps = {
  memberships: Membership[];
};

export function MembershipListPage({ memberships }: MembershipListPageProps) {
  return (
    <main className="page memberships-page">
      <section className="page-heading">
        <p className="eyebrow">Memberships</p>
        <h1>My Stamp Cards</h1>
      </section>

      <section className="voucher-grid" aria-label="Membership list">
        {memberships.map((membership) => (
          <MembershipCard membership={membership} key={membership.id} />
        ))}
      </section>
    </main>
  );
}
