export type MembershipStatus = "ACTIVE" | "REWARD_READY" | "COMPLETED" | "EXPIRED";

export type Membership = {
  id: string;
  tenantName: string;
  programName: string;
  description: string;
  currentStamps: number;
  requiredStamps: number;
  rewardName: string;
  terms: string[];
  expiryDate: string;
  status: MembershipStatus;
};
