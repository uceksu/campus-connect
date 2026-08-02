"use client";

import { ShieldAlert, ServerCog, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function MaintenanceView() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050b1a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#456be5]/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-lg w-full text-center">
        {/* Icon container */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-[#456be5]/20 rounded-3xl rotate-6 animate-pulse" />
          <div className="absolute inset-0 bg-[#7c3aed]/20 rounded-3xl -rotate-6 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="relative w-full h-full bg-[#0b1120] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
            <ServerCog size={40} className="text-[#456be5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-500 rounded-xl flex items-center justify-center border-4 border-[#050b1a] shadow-lg">
            <ShieldAlert size={16} className="text-white" />
          </div>
        </div>

        {/* Text content */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          System Update
        </h1>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">
          Campus Connect is currently undergoing scheduled maintenance to improve your experience. We'll be back online shortly.
        </p>

        {/* Status card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex items-center justify-center gap-4 mx-auto max-w-sm">
          <RefreshCcw size={20} className="text-[#456be5] animate-spin" />
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-slate-300">
            Work in progress{dots}
          </p>
        </div>

        {/* Footer branding */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
            © 2026 Campus Connect
          </p>
        </div>
      </div>
    </div>
  );
}
