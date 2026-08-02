"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin portal pages
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/portal-admin");
  if (isAdminPage) return null;

  return (
    <footer className="bg-[#050b1a] text-slate-400 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 space-y-10">
        
        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 leading-none">
            <div className="flex items-center">
              <span className="text-lg font-black uppercase tracking-[-0.04em] text-[#456be5]">
                CAMPUS
              </span>
              <span className="text-lg font-black uppercase tracking-[-0.04em] text-white">
                CONNECT
              </span>
            </div>
            <span className="text-white font-black text-sm leading-none opacity-80 mt-0.5">•</span>
            <span className="text-sm font-black uppercase tracking-wider text-white whitespace-nowrap mt-0.5">
              KSU UCE
            </span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          
          {/* Left Column (Academics) */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
              ACADEMICS
            </h4>
            <ul className="space-y-3 text-[13px] font-medium text-slate-400">
              <li>
                <Link href="/academics" className="hover:text-white transition-colors">
                  Academics Workspace
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-white transition-colors">
                  Stay on Schedule
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-white transition-colors">
                  Student Clubs
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-white transition-colors">
                  Funding Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column (Support & Explore on Mobile) */}
          <div className="space-y-10 sm:space-y-0 sm:contents">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
                SUPPORT
              </h4>
              <ul className="space-y-3 text-[13px] font-medium text-slate-400">
                <li>
                  <Link href="/support/enquiry" className="hover:text-white transition-colors">
                    Got Questions
                  </Link>
                </li>
                <li>
                  <Link href="/support/report" className="hover:text-white transition-colors">
                    Raise Issue
                  </Link>
                </li>
                <li>
                  <Link href="/support/suggestion" className="hover:text-white transition-colors">
                    Suggestion Box
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
                EXPLORE
              </h4>
              <ul className="space-y-3 text-[13px] font-medium text-slate-400">
                <li>
                  <Link href="/campus" className="hover:text-white transition-colors">
                    Explore UCE
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About College
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Area */}
        <div className="pt-6">
          <div className="mb-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider inline-block border-b-[2px] border-white pb-1">
              ABOUT CAMPUS CONNECT
            </h4>
          </div>
          
          <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 text-[10px] text-slate-500 font-mono font-bold uppercase tracking-[0.15em]">
              <p>© 2026 CAMPUS CONNECT • A KSU INITIATIVE</p>
              <p>BUILT BY STUDENTS, FOR STUDENTS.</p>
              <p className="text-slate-400">UNIVERSITY COLLEGE OF ENGINEERING THODUPUZHA</p>
            </div>
            <div className="md:text-right mt-2 md:mt-0 opacity-40 hover:opacity-100 transition-opacity">
              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Inspired by GENOME BY KSU GECT
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
