import Link from "next/link";
import { notFound } from "next/navigation";
import { getScholarshipById } from "@/lib/actions/scholarship";
import { ArrowLeft, Award, Calendar, ExternalLink, IndianRupee, Landmark } from "lucide-react";

export default async function ScholarshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = await getScholarshipById(id);
  if (!scholarship) notFound();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back Navigation */}
        <Link
          href="/scholarships"
          className="inline-flex items-center gap-2 text-white/90 dark:text-slate-400 hover:text-white dark:hover:text-white text-sm font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Scholarships
        </Link>

        {/* Details Card */}
        <article className="rounded-3xl border border-white/30 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-2xl dark:shadow-none overflow-hidden backdrop-blur-md">
          {/* Card Header section with gradient */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-900/10 p-8 sm:p-10 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e8eeff] dark:bg-blue-950/40 flex items-center justify-center text-[#456be5] dark:text-blue-400 shrink-0 shadow-inner">
              <Award size={28} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#456be5] dark:text-blue-400">
                Scholarship Profile
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white leading-tight">
                {scholarship.name}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 font-semibold">
                <Landmark size={14} /> Offered by {scholarship.provider}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-8 sm:p-10 space-y-8">
            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 p-5 flex flex-col justify-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Financial Benefit
                </span>
                <span className="flex items-center gap-1.5 text-lg font-black text-green-700 dark:text-green-400">
                  <IndianRupee size={16} /> {scholarship.amount}
                </span>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/20 p-5 flex flex-col justify-center">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-1">
                  Application Deadline
                </span>
                <span className="flex items-center gap-1.5 text-lg font-black text-orange-700 dark:text-orange-400">
                  <Calendar size={16} /> {scholarship.deadline}
                </span>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                Eligibility Criteria
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {scholarship.eligibility}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 pb-2">
                Detailed Description & Requirements
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {scholarship.description}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href={scholarship.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#456be5] dark:bg-blue-600 py-4 text-base font-bold text-white hover:bg-[#3659c8] dark:hover:bg-blue-500 transition-colors shadow-lg shadow-[#456be5]/25 dark:shadow-none"
              >
                Go to Application Portal <ExternalLink size={18} />
              </a>
              <Link
                href="/scholarships"
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-4 px-6 text-center text-base font-bold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Back
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
