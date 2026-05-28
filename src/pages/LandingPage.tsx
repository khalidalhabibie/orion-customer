import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="page landing-page">
      <section className="landing-hero">
        <p className="eyebrow">Our Voucher</p>
        <h1>Store vouchers and collect stamps in one place.</h1>
        <p>
          Keep vouchers digitally, collect membership stamps, and redeem rewards at participating tenants whenever
          you are ready.
        </p>
        <Link className="button landing-hero__cta" to="/login">
          View My Wallet
        </Link>
      </section>
    </main>
  );
}
