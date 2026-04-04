import Link from "next/link";
import { NavLinks } from "@/components/layout/NavLinks";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <Link href="/characters" className="app-brand">
          Rick and Morty Explorer
        </Link>
        <div className="header-tools">
          <GlobalSearch />
          <ThemeToggle />
          <NavLinks />
        </div>
      </div>
    </header>
  );
}
