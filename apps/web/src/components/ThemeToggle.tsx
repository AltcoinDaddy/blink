"use client";

import * as React from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)]" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
