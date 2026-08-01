import Link from "next/link";
import { Award, Calendar, ChevronRight, IndianRupee } from "lucide-react";
import type { Scholarship } from "@/src/generated/prisma/client";

type Props = {
  scholarships: Scholarship[];
};

export default function ScholarshipsList({ scholarships }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {scholarships.map((s) => (
        <article
          key={s.id}
          className="rounded-3xl border border-white/30 bg-white shadow-xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#e8eeff] flex items-center justify-center shrink-0">
              <Award size={20} className="text-[#456be5]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-black text-[#071333] leading-snug text-lg">{s.name}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{s.provider}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold">
              <IndianRupee size={11} /> {s.amount}
            </span>
            <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold">
              <Calendar size={11} /> Deadline: {s.deadline}
            </span>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Eligibility</p>
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
              {s.eligibility}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</p>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
              {s.description}
            </p>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
            <Link
              href={`/scholarships/${s.id}`}
              className="flex items-center gap-1 text-xs font-bold text-[#456be5] hover:text-[#3659c8] transition-colors"
            >
              Read Details <ChevronRight size={14} />
            </Link>
            <a
              href={s.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-[#456be5] px-4 py-2 text-xs font-bold text-white hover:bg-[#3659c8] transition-colors"
            >
              Apply Now
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
