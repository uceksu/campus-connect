"use client";

import { useState, useTransition } from "react";
import { ServerCog, Loader2 } from "lucide-react";
import { toggleMaintenanceMode } from "@/lib/actions/settings";
import { useRouter } from "next/navigation";

export default function MaintenanceToggle({ initialStatus }: { initialStatus: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [isOn, setIsOn] = useState(initialStatus);
  const router = useRouter();

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    
    startTransition(async () => {
      const result = await toggleMaintenanceMode(newState);
      if (!result.success) {
        setIsOn(!newState); // revert on failure
        alert("Failed to toggle maintenance mode");
      } else {
        router.refresh();
      }
    });
  };

  return (
    <div className="rounded-2xl border border-[#456be5]/20 bg-gradient-to-r from-[#1a2644] to-[#0f1628] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isOn ? "bg-rose-500/20 text-rose-500" : "bg-[#456be5]/20 text-[#456be5]"
        }`}>
          {isPending ? <Loader2 size={24} className="animate-spin" /> : <ServerCog size={24} />}
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Maintenance Mode</h3>
          <p className="text-slate-400 text-sm mt-0.5 max-w-md">
            When active, the public website is hidden behind a maintenance screen. Admins can still browse freely.
          </p>
        </div>
      </div>
      
      {/* Custom Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={isPending}
        onClick={handleToggle}
        className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
          isOn ? 'bg-rose-500' : 'bg-slate-700'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span className="sr-only">Toggle Maintenance Mode</span>
        <span
          className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            isOn ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
