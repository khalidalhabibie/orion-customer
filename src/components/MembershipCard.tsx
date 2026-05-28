import { Link } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";
import type { Membership } from "../types/membership";

type MembershipCardProps = {
  membership: Membership;
};

export function MembershipCard({ membership }: MembershipCardProps) {
  const progress = Math.min((membership.currentStamps / membership.requiredStamps) * 100, 100);
  const isDisabled = membership.status === "COMPLETED" || membership.status === "EXPIRED";

  return (
    <article className={`membership-card ${isDisabled ? "membership-card--disabled" : ""}`}>
      <div className="voucher-card__top">
        <div>
          <p className="voucher-card__tenant">{membership.tenantName}</p>
          <h2>{membership.programName}</h2>
        </div>
        <StatusBadge status={membership.status} />
      </div>

      <div className="progress-block">
        <div className="progress-block__label">
          <span>{membership.currentStamps} / {membership.requiredStamps} stamps</span>
          <strong>{Math.round(progress)}%</strong>
        </div>
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="membership-card__reward">{membership.rewardName}</p>

      <Link className="button button--secondary voucher-card__button" to={`/memberships/${membership.id}`}>
        View Stamp Card
      </Link>
    </article>
  );
}
