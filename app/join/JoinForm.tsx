"use client";

import { useState, useRef } from "react";
import { Loader2, Download, MessageCircle, Shield } from "lucide-react";
import { registerKsuMember } from "@/lib/actions/member";
import * as htmlToImage from "html-to-image";
import ImageUpload from "@/components/ImageUpload";

type Settings = { requireYear: boolean; requireLocation: boolean; requirePhoto: boolean; whatsappLink: string; cardColor: string; cardSignature: string };

export default function JoinForm({ settings }: { settings: Settings }) {
  const [status, setStatus] = useState<"idle" | "uploading" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [member, setMember] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/cloudinary/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data.url as string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (settings.requirePhoto && !selectedFile) {
      setError("Please upload a profile photo.");
      return;
    }

    // Extract form data synchronously before any await
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      department: formData.get("department") as string,
      year: formData.get("year") as string | undefined,
      location: formData.get("location") as string | undefined,
    };

    try {
      let photoUrl = undefined;
      if (selectedFile) {
        setStatus("uploading");
        photoUrl = await uploadImage(selectedFile);
      }

      setStatus("submitting");

      const newMember = await registerKsuMember({ ...data, photoUrl });
      setMember(newMember);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
      setStatus("idle");
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `KSU-Member-${member?.memberId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Failed to download card. Please try again.");
    }
  };

  if (status === "success" && member) {
    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#071333] dark:text-white">
            Welcome to KSU!
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Your registration is complete. Here is your official digital membership card.
          </p>
        </div>

        {/* Membership Card Wrapper */}
        <div className="flex justify-center">
          <div 
            ref={cardRef} 
            className="relative w-full max-w-sm overflow-hidden rounded-2xl p-6 text-white shadow-2xl border border-white/10"
            style={{ 
              aspectRatio: "85.6/54", 
              backgroundColor: settings.cardColor || "#071333",
              backgroundImage: `linear-gradient(to bottom right, ${settings.cardColor || '#071333'}, rgba(0,0,0,0.4))`
            }}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-white blur-3xl opacity-10" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 rounded-full bg-[#9db9ff] blur-3xl opacity-10" />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Shield className="text-[#456be5]" size={24} />
                <div className="leading-none">
                  <span className="block font-black uppercase text-lg tracking-tight">Campus Connect</span>
                  <span className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest mt-0.5">KSU UCE</span>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Member ID</span>
                <span className="font-mono font-bold text-[#9db9ff] tracking-wider">{member.memberId}</span>
              </div>
            </div>

            {/* Body */}
            <div className="relative flex gap-6">
              {/* Photo Area */}
              {member.photoUrl && (
                <div className="shrink-0">
                  <div className="h-24 w-20 overflow-hidden rounded-lg border-2 border-white/20 bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={member.photoUrl} alt="Member" className="h-full w-full object-cover" crossOrigin="anonymous" />
                  </div>
                </div>
              )}
              
              {/* Details Area */}
              <div className="space-y-3 flex-1 pb-4">
                <div>
                  <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Name</span>
                  <span className="block font-bold text-lg sm:text-xl uppercase tracking-tight leading-tight line-clamp-2">{member.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Department</span>
                    <span className="block font-semibold text-xs leading-tight line-clamp-2 pr-2">{member.department.replace(/\s*\([^)]*\)/, '')}</span>
                  </div>
                  {member.year && (
                    <div>
                      <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Year</span>
                      <span className="block font-semibold text-xs leading-tight">{member.year}</span>
                    </div>
                  )}
                </div>
                {member.location && (
                  <div>
                    <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Native Place</span>
                    <span className="block font-semibold text-xs leading-tight line-clamp-1">{member.location}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-2 right-3">
              <span className="font-mono text-[7px] text-slate-400/80 uppercase tracking-widest">
                {settings.cardSignature || "Official KSU Member"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button 
            onClick={downloadCard}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-200 dark:bg-slate-800 px-6 py-3.5 font-bold text-[#071333] dark:text-white transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            <Download size={18} />
            Download Card
          </button>
          
          {settings.whatsappLink && (
            <a 
              href={settings.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white transition-colors hover:bg-[#1ebd5a]"
            >
              <MessageCircle size={18} />
              Join WhatsApp Group
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 p-6 sm:p-10 shadow-xl backdrop-blur-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 text-[#071333] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 text-[#071333] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
          />
        </div>
        
        <div>
          <label htmlFor="department" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Department *</label>
          <select
            id="department"
            name="department"
            required
            className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 text-[#071333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] [&>option]:bg-white [&>option]:dark:bg-slate-900"
          >
            <option value="" disabled selected className="text-slate-500">Select Department</option>
            <option value="Computer Science (CS)">Computer Science (CS)</option>
            <option value="Electronics and Communication (ECE)">Electronics and Communication (ECE)</option>
            <option value="Electrical and Electronics (EEE)">Electrical and Electronics (EEE)</option>
            <option value="Cyber Security (CY)">Cyber Security (CY)</option>
            <option value="AI & Data Science (AD)">AI & Data Science (AD)</option>
            <option value="Polymer Engineering (PO)">Polymer Engineering (PO)</option>
          </select>
        </div>

        {settings.requireYear && (
          <div>
            <label htmlFor="year" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Year of Study *</label>
            <select
              id="year"
              name="year"
              required
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 text-[#071333] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#456be5] [&>option]:bg-white [&>option]:dark:bg-slate-900"
            >
              <option value="" disabled selected className="text-slate-500">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        )}

        {settings.requireLocation && (
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Native Place *</label>
            <input
              id="location"
              name="location"
              type="text"
              required
              placeholder="E.g. Trivandrum"
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-transparent px-4 py-3 text-[#071333] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
            />
          </div>
        )}

        {settings.requirePhoto && (
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Profile Photo *</label>
            <ImageUpload 
              required 
              aspect={3 / 4} 
              cropShape="rect" 
              label="Upload a passport-size photo"
              onFileSelect={setSelectedFile} 
            />
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-500/10 p-4 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting" || status === "uploading"}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#456be5] px-4 py-4 font-bold text-white transition-colors hover:bg-[#5b7df0] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500"
        >
          {status === "uploading" ? (
            <><Loader2 size={18} className="animate-spin" /> Uploading Photo...</>
          ) : status === "submitting" ? (
            <><Loader2 size={18} className="animate-spin" /> Registering...</>
          ) : (
            "Join KSU"
          )}
        </button>
      </form>
    </div>
  );
}
