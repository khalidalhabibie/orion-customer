import { useMemo, useState } from "react";
import { VoucherCard } from "../components/VoucherCard";
import type { Voucher, VoucherStatus } from "../types/voucher";

type VoucherListPageProps = {
  vouchers: Voucher[];
};

type Filter = "ALL" | VoucherStatus;

const filters: { label: string; value: Filter }[] = [
  { label: "All", value: "ALL" },
  { label: "Available", value: "AVAILABLE" },
  { label: "Used", value: "USED" },
  { label: "Expired", value: "EXPIRED" },
];

export function VoucherListPage({ vouchers }: VoucherListPageProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("ALL");

  const visibleVouchers = useMemo(() => {
    if (activeFilter === "ALL") {
      return vouchers;
    }

    return vouchers.filter((voucher) => voucher.status === activeFilter);
  }, [activeFilter, vouchers]);

  return (
    <main className="page vouchers-page">
      <section className="page-heading">
        <p className="eyebrow">Voucher wallet</p>
        <h1>My Vouchers</h1>
      </section>

      <div className="filter-tabs" role="tablist" aria-label="Filter vouchers by status">
        {filters.map((filter) => (
          <button
            className={`filter-tab ${activeFilter === filter.value ? "filter-tab--active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeFilter === filter.value}
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="voucher-grid" aria-label="Voucher list">
        {visibleVouchers.map((voucher) => (
          <VoucherCard voucher={voucher} key={voucher.id} />
        ))}
      </section>
    </main>
  );
}
