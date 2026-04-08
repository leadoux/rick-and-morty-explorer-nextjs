"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/characters", label: "Characters", activePatterns: ["/characters", "/character"] },
  { href: "/episodes", label: "Episodes", activePatterns: ["/episodes", "/episode"] },
  { href: "/locations", label: "Locations", activePatterns: ["/locations", "/location"] },
  { href: "/favorites", label: "Favorites", activePatterns: ["/favorites"] },
  { href: "/compare", label: "Compare", activePatterns: ["/compare"] },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="nav-list">
        {NAV_ITEMS.map((item) => {
          const isActive = item.activePatterns.some((p) => pathname === p || pathname.startsWith(`${p}/`));

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
