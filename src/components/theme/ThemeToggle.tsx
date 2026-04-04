"use client";

import { usePreferencesStore } from "@/store/preferencesStore";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePreferencesStore();

  return (
    <button type="button" className="button" onClick={toggleTheme}>
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
