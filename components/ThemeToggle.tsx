"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch by rendering only after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-slate-200/20 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-slate-200/40 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg flex items-center justify-center shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 hover:border-slate-300 dark:hover:border-white/20 group"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-6 h-6 text-amber-500 transition-all duration-500 ease-out absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 group-hover:rotate-45"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-5 h-5 text-indigo-400 transition-all duration-500 ease-out absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100 group-hover:-rotate-12"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}