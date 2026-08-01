"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, MessageSquare } from "lucide-react";

export default function SuggestionPage() {
  const [name, setName] = useState("");
  const [semDept, setSemDept] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !semDept || !suggestion) return;

    const message = `Hi Team KSU,

My Name: ${name}
Semester & Department: ${semDept}

My Suggestion / Idea:
${suggestion}`;

    // Target WhatsApp number for Team KSU support desk
    const whatsappNumber = "919497045236"; 
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#f8faff] text-[#071333] py-14 sm:py-20">
      <div className="mx-auto max-w-2xl px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-2">Share your</h1>
          <h2 className="text-[#456be5] italic text-5xl sm:text-6xl font-black tracking-tight leading-none mb-4">
            IDEAS.
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            got an idea or suggestion to improve academics, hostels, or campus life? we'd love to hear it!
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSend} className="rounded-3xl border border-[#dce5ff] bg-white shadow-xl overflow-hidden p-8 space-y-6">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#456be5]">
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call you?"
              required
              className="w-full border-b border-slate-100 bg-transparent py-3 text-[#071333] placeholder-slate-400 focus:border-[#456be5] focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Semester & Department Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#456be5]">
              Semester and Department
            </label>
            <input
              value={semDept}
              onChange={(e) => setSemDept(e.target.value)}
              placeholder="e.g. S3 · Computer Science"
              required
              className="w-full border-b border-slate-100 bg-transparent py-3 text-[#071333] placeholder-slate-400 focus:border-[#456be5] focus:outline-none transition-colors text-sm"
            />
          </div>

          {/* Suggestion Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#456be5]">
              Your suggestion
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Describe your suggestion or idea. We are always looking for ways to improve our campus connection."
              rows={5}
              required
              className="w-full border-b border-slate-100 bg-transparent py-3 text-[#071333] placeholder-slate-400 focus:border-[#456be5] focus:outline-none transition-colors text-sm resize-none"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <Lightbulb size={16} /> Send to Team KSU via WhatsApp
          </button>
        </form>
      </div>
    </main>
  );
}
