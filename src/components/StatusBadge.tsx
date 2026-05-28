import type { MembershipStatus } from "../types/membership";
import type { VoucherStatus } from "../types/voucher";

type StatusBadgeProps = {
  status: VoucherStatus | MembershipStatus;
};

const labels: Record<VoucherStatus | MembershipStatus, string> = {
  AVAILABLE: "Available",
  USED: "Used",
  EXPIRED: "Expired",
  ACTIVE: "Active",
  REWARD_READY: "Reward Ready",
  COMPLETED: "Completed",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge status-badge--${status.toLowerCase().replace("_", "-")}`}>{labels[status]}</span>;
}
