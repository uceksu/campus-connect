import { Coffee } from "lucide-react";
import PublicPageHero from "@/components/PublicPageHero";

export default function TeaShopsPage() {
  return <main className="min-h-screen bg-[#456be5] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[18px_18px]"><PublicPageHero eyebrow="Food & refreshment" title="Tea, snacks," accent="and campus life." description="A simple guide to student-friendly refreshment spots." /><section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20"><div className="rounded-3xl border border-white/30 bg-white p-8 shadow-xl"><Coffee className="size-8 text-[#456be5]" aria-hidden="true" /><p className="mt-6 text-lg text-slate-600">Tea shop details will be available here soon.</p></div></section></main>;
}
