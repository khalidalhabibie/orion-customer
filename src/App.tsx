import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { USE_MOCK_DATA } from "./config/features";
import { mockMemberships } from "./data/mockMemberships";
import { mockVouchers } from "./data/mockVouchers";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { MembershipDetailPage } from "./pages/MembershipDetailPage";
import { MembershipListPage } from "./pages/MembershipListPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { VoucherDetailPage } from "./pages/VoucherDetailPage";
import { VoucherListPage } from "./pages/VoucherListPage";
import { WalletPage } from "./pages/WalletPage";

export default function App() {
  const [vouchers, setVouchers] = useState(USE_MOCK_DATA ? mockVouchers : []);
  const [memberships, setMemberships] = useState(USE_MOCK_DATA ? mockMemberships : []);
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  function handleRedeemVoucher(id: string) {
    setVouchers((currentVouchers) =>
      currentVouchers.map((voucher) => (voucher.id === id ? { ...voucher, status: "USED" } : voucher)),
    );
  }

  function handleRedeemReward(id: string) {
    setMemberships((currentMemberships) =>
      currentMemberships.map((membership) =>
        membership.id === id ? { ...membership, status: "COMPLETED" } : membership,
      ),
    );
  }

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wallet" element={<WalletPage vouchers={vouchers} memberships={memberships} />} />
        <Route path="/vouchers" element={<VoucherListPage vouchers={vouchers} />} />
        <Route
          path="/vouchers/:id"
          element={<VoucherDetailPage vouchers={vouchers} onRedeemVoucher={handleRedeemVoucher} />}
        />
        <Route path="/memberships" element={<MembershipListPage memberships={memberships} />} />
        <Route
          path="/memberships/:id"
          element={<MembershipDetailPage memberships={memberships} onRedeemReward={handleRedeemReward} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
