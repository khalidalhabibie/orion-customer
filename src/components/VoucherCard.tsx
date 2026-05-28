import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import type { Voucher } from "../types/voucher";

type VoucherCardProps = {
  voucher: Voucher;
};

export function VoucherCard({ voucher }: VoucherCardProps) {
  const isDisabled = voucher.status !== "AVAILABLE";

  return (
    <article className={`voucher-card ${isDisabled ? "voucher-card--disabled" : ""}`}>
      <div className="voucher-card__top">
        <div>
          <p className="voucher-card__tenant">{voucher.tenantName}</p>
          <h2>{voucher.title}</h2>
        </div>
        <StatusBadge status={voucher.status} />
      </div>

      <p className="voucher-card__benefit">{voucher.benefit}</p>
      <p className="voucher-card__expiry">Expires {voucher.expiryDate}</p>

      <Link className="button button--secondary voucher-card__button" to={`/vouchers/${voucher.id}`}>
        View Detail
      </Link>
    </article>
  );
}
