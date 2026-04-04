"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";
const STORAGE_KEY = "rm-theme";

type PreferencesContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

type PreferencesProviderProps = {
  children: React.ReactNode;
};

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferencesStore() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferencesStore must be used inside PreferencesProvider");
  }

  return context;
}
