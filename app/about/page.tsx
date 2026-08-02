import Link from "next/link";
import PublicPageHero from "@/components/PublicPageHero";
import { ArrowLeft, MapPin, Users, Landmark, Award } from "lucide-react";

export default function AboutCollegePage() {
  const governingBody = [
    {
      role: "Chairman",
      name: "Shri. Roji M John",
      designation: "Hon'ble Minister for Higher Education",
      affiliation: "Govt. of Kerala",
    },
    {
      role: "Vice Chairman",
      name: "Dr. B Ashok IAS",
      designation: "Principal Secretary",
      affiliation: "Higher Education Department, Govt. of Kerala",
    },
    {
      role: "Director",
      name: "Shri. Harikrishnan P",
      designation: "Director",
      affiliation: "Center for Professional and Advanced Studies, Kottayam",
    },
  ];

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Institution Profile"
        title="About our"
        accent="college."
        description="Learn more about the history, campus profile, and administration of University College of Engineering Thodupuzha."
      />

      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20 space-y-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/90 dark:text-slate-400 hover:text-white dark:hover:text-white text-sm font-bold transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Content Container */}
        <div className="rounded-3xl border border-white/30 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-2xl dark:shadow-none overflow-hidden backdrop-blur-md">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/40 dark:to-slate-900/10 p-8 sm:p-10 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#e8eeff] dark:bg-blue-950/40 flex items-center justify-center text-[#456be5] dark:text-blue-400 shrink-0 shadow-inner">
              <Landmark size={28} />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#456be5] dark:text-blue-400">
                University College of Engineering, Thodupuzha (UCE)
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white leading-tight">
                About Our College
              </h1>
            </div>
          </div>

          {/* Body Section */}
          <div className="p-8 sm:p-10 space-y-10">
            {/* History/Overview */}
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed font-medium">
                University College of Engineering, Thodupuzha (UCE) is a premier institute of Engineering and Technology run and managed by the Center for Professional and Advanced Studies, Kottayam, Kerala.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                When it was started, UCE was the first self-financing college to be started under the university. UCE offers B.Tech. degree courses in five branches of Engineering. All the courses conducted by the college have been approved by the All India Council for Technical Education (AICTE), New Delhi.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                This institute started functioning in 1996 in Thodupuzha and was later moved to its own campus at Muttom in May 2002.
              </p>
            </div>

            {/* Campus Info */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 p-6 sm:p-8 space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-black text-[#071333] dark:text-white uppercase tracking-tight">
                <MapPin size={20} className="text-[#456be5] dark:text-blue-400" /> Campus Information
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                The college campus is located in a picturesque place spread over 25 acres of land at Muttom, 8 km away from Thodupuzha, by the side of State Highway No 33.
              </p>
            </div>

            {/* Governing Body */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-black text-[#071333] dark:text-white uppercase tracking-tight border-b border-slate-100 dark:border-slate-800 pb-3">
                <Users size={20} className="text-[#456be5] dark:text-blue-400" /> Governing Body
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {governingBody.map((member) => (
                  <div
                    key={member.role}
                    className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 p-5 flex flex-col justify-between hover:border-blue-200 dark:hover:border-blue-800 transition-colors shadow-sm"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 mb-4">
                        {member.role}
                      </span>
                      <h4 className="text-base font-black text-[#071333] dark:text-white leading-snug">
                        {member.name}
                      </h4>
                    </div>
                    <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 font-semibold space-y-0.5">
                      <p>{member.designation}</p>
                      <p className="text-slate-400 dark:text-slate-500 font-medium">{member.affiliation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
