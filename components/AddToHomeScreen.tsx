"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare, Download } from "lucide-react";

export function AddToHomeScreen() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showAndroidFallback, setShowAndroidFallback] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if user has already dismissed or installed
    const hasDismissed = localStorage.getItem("pwaPromptDismissed");
    const hasInstalled = localStorage.getItem("pwaInstalled");
    
    // Check if already in standalone mode (installed)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                         (window.navigator as any).standalone;

    if (hasDismissed === "true" || hasInstalled === "true" || isStandalone) {
      return;
    }

    // Detect iOS and Android
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isAndroidDevice = /android/.test(userAgent);
    
    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);

    if (isIosDevice || isAndroidDevice) {
      // Show the prompt after a slight delay for all mobile devices
      setTimeout(() => setShowPrompt(true), 3000);
    }

    // For Android/Chrome, listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setShowPrompt(true);
    });

    // Listen for successful installation
    window.addEventListener("appinstalled", () => {
      localStorage.setItem("pwaInstalled", "true");
      setShowPrompt(false);
    });

    // Listen for manual trigger from Navbar
    const handleManualTrigger = () => setShowPrompt(true);
    window.addEventListener("show-pwa-prompt", handleManualTrigger);

    return () => {
      window.removeEventListener("show-pwa-prompt", handleManualTrigger);
    };
  }, []);

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        localStorage.setItem("pwaInstalled", "true");
        window.dispatchEvent(new Event("pwa-installed-manual"));
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback if the native prompt didn't fire
      setShowAndroidFallback(true);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm sm:bottom-8 sm:left-auto sm:right-8 sm:max-w-md animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="relative rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl bg-[#0b1120]/90">
        <button
          onClick={dismissPrompt}
          className="absolute right-3 top-3 rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex gap-4 items-start pr-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#456be5] to-[#5b7df0] flex items-center justify-center shrink-0 shadow-lg">
            <img src="/icon.png" alt="App Icon" className="w-10 h-10 object-contain drop-shadow-md" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg leading-tight">Install Campus Connect</h3>
            <p className="text-sm text-slate-300 mt-1">
              Add this app to your home screen for quick and easy access!
            </p>
          </div>
        </div>

        <div className="mt-5">
          {isIOS ? (
            <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 text-sm text-slate-200">
              <p className="flex items-center gap-2 mb-2">
                1. Tap the <Share size={16} className="text-[#456be5]" /> Share button below.
              </p>
              <p className="flex items-center gap-2">
                2. Select <PlusSquare size={16} className="text-[#456be5]" /> <strong>Add to Home Screen</strong>.
              </p>
            </div>
          ) : showAndroidFallback ? (
            <div className="rounded-xl bg-white/5 border border-white/10 p-3.5 text-sm text-slate-200">
              <p className="mb-2 font-semibold text-white">To install manually:</p>
              <p className="mb-1">1. Tap the <strong>3-dots menu</strong> (⋮) in Chrome</p>
              <p>2. Select <strong>Add to Home screen</strong> or <strong>Install app</strong></p>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] py-3 font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-[#456be5]/25"
            >
              <Download size={18} />
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
