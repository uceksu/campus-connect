"use client";

import { useEffect } from "react";

export function PwaRegistry() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Catch beforeinstallprompt globally as early as possible
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        (window as any).deferredPwaPrompt = e;
      });

      if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered with scope:", registration.scope);
          })
          .catch((error) => {
            console.error("Service Worker registration failed:", error);
          });
      });
      }
    }
  }, []);

  return null;
}
