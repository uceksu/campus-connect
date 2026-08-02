"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Sparkles, Download } from "lucide-react";

export default function Navbar({ 
  isAdminVisible = true,
  logoUrl = null
}: { 
  isAdminVisible?: boolean;
  logoUrl?: string | null;
}) {
  const pathname = usePathname();
  const [isInstalled, setIsInstalled] = useState(true); // Default true to prevent flash

  useEffect(() => {
    // Check if installed on mount
    const hasInstalled = localStorage.getItem("pwaInstalled") === "true";
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || 
                         (window.navigator as any).standalone;
    
    if (!hasInstalled && !isStandalone) {
      setIsInstalled(false);
    }

    const handleInstalled = () => setIsInstalled(true);
    window.addEventListener("appinstalled", handleInstalled);
    
    // Also listen to a custom event we can emit from the manual Android fallback
    window.addEventListener("pwa-installed-manual", handleInstalled);

    return () => {
      window.removeEventListener("appinstalled", handleInstalled);
      window.removeEventListener("pwa-installed-manual", handleInstalled);
    };
  }, []);

  // Hide the public navbar on admin dashboard and login routes
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/portal-admin");
  if (isAdminPage) return null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/academics", label: "Academics" },
    { href: "/calendar", label: "Calendar" },
    { href: "/clubs", label: "Clubs" },
    { href: "/notices", label: "Notices" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/campus", label: "Around Campus" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <nav className="border-b border-white/10 bg-[#071333] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div className="w-9 h-9 rounded-xl bg-[#456be5] overflow-hidden flex items-center justify-center shadow-lg shadow-[#456be5]/30 group-hover:scale-105 transition-transform shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <Shield size={18} className="text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg font-black uppercase tracking-[-0.04em] text-white">
                Campus
              </span>
              <span className="text-lg font-black uppercase tracking-[-0.04em] text-blue-400">
                Connect
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 block mt-0.5">
              KSU UCE
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 text-xs sm:text-sm font-bold">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-white/10 text-white border border-white/10 shadow-inner"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {isAdminVisible && (
            <Link
              href="/portal-admin/login"
              className="ml-2 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
            >
              <Shield size={14} />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
