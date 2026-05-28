export type VoucherStatus = "AVAILABLE" | "USED" | "EXPIRED";

export type Voucher = {
  id: string;
  title: string;
  tenantName: string;
  benefit: string;
  description: string;
  terms: string[];
  expiryDate: string;
  code: string;
  status: VoucherStatus;
};
