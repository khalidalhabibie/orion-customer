import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/">
        Our Voucher
      </Link>
      <nav className="navbar__links" aria-label="Primary navigation">
        <NavLink to="/wallet">Wallet</NavLink>
        <NavLink to="/vouchers">Vouchers</NavLink>
        <NavLink to="/memberships">Memberships</NavLink>
      </nav>
    </header>
  );
}
