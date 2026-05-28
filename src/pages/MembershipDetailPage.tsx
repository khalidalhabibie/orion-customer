import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { StampGrid } from "../components/StampGrid";
import { StatusBadge } from "../components/StatusBadge";
import type { Membership } from "../types/membership";

type MembershipDetailPageProps = {
  memberships: Membership[];
  onRedeemReward: (id: string) => void;
};

export function MembershipDetailPage({ memberships, onRedeemReward }: MembershipDetailPageProps) {
  const { id } = useParams();
  const [isConfirming, setIsConfirming] = useState(false);
  const membership = memberships.find((item) => item.id === id);

  if (!membership) {
    return (
      <main className="page empty-state">
        <h1>Membership not found</h1>
        <p>The stamp card you are looking for is not available.</p>
        <Link className="button" to="/memberships">
          Back to Memberships
        </Link>
      </main>
    );
  }

  const isComplete = membership.currentStamps >= membership.requiredStamps;
  const canRedeem = isComplete && membership.status === "REWARD_READY";
  const helperText =
    membership.status === "ACTIVE" && !isComplete ? "Collect more stamps to unlock this reward." : null;

  return (
    <main className="page detail-page">
      <Link className="text-link" to="/memberships">
        Back to memberships
      </Link>

      <section className="detail-panel">
        <div className="detail-panel__header">
          <div>
            <p className="voucher-card__tenant">{membership.tenantName}</p>
            <h1>{membership.programName}</h1>
          </div>
          <StatusBadge status={membership.status} />
        </div>

        <p className="detail-description">{membership.description}</p>

        <div className="benefit-box">
          <span>Stamp progress</span>
          <strong>{membership.currentStamps} / {membership.requiredStamps} stamps</strong>
        </div>

        <StampGrid currentStamps={membership.currentStamps} requiredStamps={membership.requiredStamps} />

        <div className="detail-section detail-section--spaced">
          <h2>Reward</h2>
          <p>{membership.rewardName}</p>
        </div>

        <div className="detail-section">
          <h2>Terms and conditions</h2>
          <ul>
            {membership.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </div>

        <dl className="detail-list detail-list--membership">
          <div>
            <dt>Expiry date</dt>
            <dd>{membership.expiryDate}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{membership.status}</dd>
          </div>
        </dl>

        {helperText ? <p className="helper-text">{helperText}</p> : null}

        <button className="button detail-panel__redeem" type="button" disabled={!canRedeem} onClick={() => setIsConfirming(true)}>
          Redeem Reward
        </button>
      </section>

      {isConfirming ? (
        <ConfirmModal
          title="Redeem reward?"
          message="This membership reward will be marked as completed on this device."
          onCancel={() => setIsConfirming(false)}
          onConfirm={() => {
            onRedeemReward(membership.id);
            setIsConfirming(false);
          }}
        />
      ) : null}
    </main>
  );
}
