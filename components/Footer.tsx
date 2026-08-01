"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin portal pages
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/portal-admin");
  if (isAdminPage) return null;

  return (
    <footer className="bg-[#071333] border-t border-white/5 text-slate-400 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5 lg:gap-16">
          {/* Logo & Info Column */}
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="inline-block leading-none">
              <span className="text-xl font-black uppercase tracking-[-0.06em] text-white">
                Campus
              </span>
              <span className="ml-1 text-xl font-black uppercase tracking-[-0.06em] text-[#456be5]">
                Connect
              </span>
              <span className="mx-2 text-slate-600 font-black">•</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                KSU UCE
              </span>
            </Link>
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#456be5]">
                About Campus Connect
              </h4>
              <p className="text-xs leading-relaxed text-slate-500">
                Your digital student portal for University College of Engineering Thodupuzha. Find academic notes, notices, calendar timelines, and campus support in one place.
              </p>
            </div>
          </div>

          {/* Academics Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              Academics
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/academics" className="text-white hover:text-[#456be5] transition-colors">
                  Academics Workspace
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-white hover:text-[#456be5] transition-colors">
                  Stay on Schedule
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="text-white hover:text-[#456be5] transition-colors">
                  Student Clubs
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-white hover:text-[#456be5] transition-colors">
                  Funding Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              Support
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/support/enquiry" className="text-white hover:text-[#456be5] transition-colors">
                  Got Questions
                </Link>
              </li>
              <li>
                <Link href="/support/report" className="text-white hover:text-[#456be5] transition-colors">
                  Raise Issue
                </Link>
              </li>
              <li>
                <Link href="/support/suggestion" className="text-white hover:text-[#456be5] transition-colors">
                  Suggestion Box
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/campus" className="text-white hover:text-[#456be5] transition-colors">
                  Explore UCE
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-[#456be5] transition-colors">
                  About College
                </Link>
              </li>
              <li>
                <Link href="/campus/places" className="text-white hover:text-[#456be5] transition-colors">
                  Neighbourhood Cheat Sheet
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Area */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-1.5 text-xs text-slate-500 font-mono font-bold uppercase tracking-wider">
            <p>© 2026 Campus Connect • A KSU Initiative</p>
            <p>Built by Students, for Students.</p>
            <p className="text-slate-400">University College of Engineering Thodupuzha</p>
          </div>
          <div className="md:text-right mt-auto">
            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">
              Inspired by GENOME BY KSU GEC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
