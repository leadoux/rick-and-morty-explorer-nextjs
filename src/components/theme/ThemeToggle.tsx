"use client";

import { usePreferencesStore } from "@/store/preferencesStore";
import { useIsHydrated } from "@/hooks/useIsHydrated";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePreferencesStore();
  const hydrated = useIsHydrated();
  const isDarkTheme = hydrated && theme === "dark";

  return (
    <button
      type="button"
      className="button theme-toggle"
      aria-pressed={isDarkTheme}
      aria-label={isDarkTheme ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      {hydrated ? (isDarkTheme ? "Light mode" : "Dark mode") : "Theme mode"}
    </button>
  );
}
