import { NavLink } from "react-router-dom";

const items = [
  { label: "Home", to: "/wallet" },
  { label: "Rewards", to: "/vouchers" },
  { label: "Membership", to: "/memberships" },
  { label: "Profile", to: "/profile" },
];

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Customer navigation">
      {items.map((item) => (
        <NavLink className="bottom-nav__item" to={item.to} key={item.to}>
          <span className="bottom-nav__dot" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
