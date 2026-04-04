import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <Link href="/characters" className="app-brand">
          Rick and Morty Explorer
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
