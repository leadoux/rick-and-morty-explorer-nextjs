"use client";

import { usePreferencesStore } from "@/store/preferencesStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePreferencesStore();
  const hydrated = useIsHydrated();

  return (
    <button type="button" className="button" onClick={toggleTheme}>
      {hydrated ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
    </button>
  );
}
