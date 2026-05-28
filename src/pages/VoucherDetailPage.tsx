import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { StatusBadge } from "../components/StatusBadge";
import type { Voucher } from "../types/voucher";

type VoucherDetailPageProps = {
  vouchers: Voucher[];
  onRedeemVoucher: (id: string) => void;
};

export function VoucherDetailPage({ vouchers, onRedeemVoucher }: VoucherDetailPageProps) {
  const { id } = useParams();
  const [isConfirming, setIsConfirming] = useState(false);
  const voucher = vouchers.find((item) => item.id === id);

  if (!voucher) {
    return (
      <main className="page empty-state">
        <h1>Voucher not found</h1>
        <p>The voucher you are looking for is not available.</p>
        <Link className="button" to="/vouchers">
          Back to Vouchers
        </Link>
      </main>
    );
  }

  const canRedeem = voucher.status === "AVAILABLE";

  return (
    <main className="page detail-page app-page">
      <Link className="text-link" to="/vouchers">
        Back to vouchers
      </Link>

      <section className="detail-panel">
        <div className="detail-panel__header">
          <div>
            <p className="voucher-card__tenant">{voucher.tenantName}</p>
            <h1>{voucher.title}</h1>
          </div>
          <StatusBadge status={voucher.status} />
        </div>

        <div className="benefit-box">
          <span>Benefit</span>
          <strong>{voucher.benefit}</strong>
        </div>

        <div className="detail-section">
          <h2>Description</h2>
          <p>{voucher.description}</p>
        </div>

        <div className="detail-section">
          <h2>Terms and conditions</h2>
          <ul>
            {voucher.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>

        <dl className="detail-list">
          <div>
            <dt>Expiry date</dt>
            <dd>{voucher.expiryDate}</dd>
          </div>
          <div>
            <dt>Voucher code</dt>
            <dd>{voucher.code}</dd>
          </div>
          <div>
            <dt>Redemption status</dt>
            <dd>{voucher.status}</dd>
          </div>
        </dl>

        <button className="button detail-panel__redeem" type="button" disabled={!canRedeem} onClick={() => setIsConfirming(true)}>
          Redeem Voucher
        </button>
      </section>

      {isConfirming ? (
        <ConfirmModal
          title="Redeem voucher?"
          message="This voucher will be marked as used on this device."
          onCancel={() => setIsConfirming(false)}
          onConfirm={() => {
            onRedeemVoucher(voucher.id);
            setIsConfirming(false);
          }}
        />
      ) : null}
    </main>
  );
}
