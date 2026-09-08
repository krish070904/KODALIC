"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";

export type ThemeMode = "dark" | "light" | "system";

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleDark: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

const MEDIA = "(prefers-color-scheme: dark)";

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light" || stored === "system") {
      return stored as ThemeMode;
    }
  } catch {
    /* ignore */
  }
  return "dark";
}

function computeIsDark(mode: ThemeMode): boolean {
  if (typeof window === "undefined") return true;
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return window.matchMedia(MEDIA).matches;
}

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(callback: () => void) {
  listeners.add(callback);
  const mq = window.matchMedia(MEDIA);
  mq.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    mq.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, () => "dark" as ThemeMode);
  const isDark = computeIsDark(theme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [isDark]);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      /* ignore */
    }
    emit();
  }, []);

  const toggleDark = useCallback(() => {
    const current = readStoredTheme();
    const next = computeIsDark(current) ? "light" : "dark";
    setTheme(next);
  }, [setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "dark",
      isDark: true,
      setTheme: () => {},
      toggleDark: () => {},
    };
  }
  return ctx;
}
