"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/characters", label: "Characters" },
  { href: "/episodes", label: "Episodes" },
  { href: "/locations", label: "Locations" },
  { href: "/favorites", label: "Favorites" },
  { href: "/compare", label: "Compare" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`nav-link ${pathname.startsWith(item.href) ? "nav-link--active" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
