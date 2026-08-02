import Image from "next/image";
import PublicPageHero from "@/components/PublicPageHero";
import { getClubs } from "@/lib/actions/club";
import { Mail, Phone, Clock } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  Academic: "bg-blue-500 text-white",
  Cultural: "bg-purple-500 text-white",
  Sports: "bg-green-500 text-white",
  Technical: "bg-orange-500 text-white",
  Social: "bg-pink-500 text-white",
  Other: "bg-slate-500 text-white",
};

export default async function ClubsPage() {
  const clubs = await getClubs();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Student life at KSU UCE"
        title="Join a"
        accent="club."
        description="Discover student clubs and societies — find your community at KSU UCE."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {clubs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center text-slate-500 dark:text-slate-400 backdrop-blur-md">
            Club listings will appear here once added by the administration.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.map((club) => (
              <article key={club.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-lg dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-white/5 backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full">
                    <Image src={club.image} alt={club.name} fill className="object-cover" />
                    <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${CATEGORY_COLORS[club.category] ?? CATEGORY_COLORS.Other}`}>
                      {club.category}
                    </span>
                  </div>
                  <div className="p-6 pb-0">
                    <h2 className="text-xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white mb-2">{club.name}</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">{club.description}</p>
                  </div>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <div className="space-y-1.5 text-sm text-slate-500 dark:text-slate-450 border-t border-slate-100 dark:border-slate-800/80 pt-4">
                    <div className="flex items-center gap-2">
                      <Clock size={13} className="shrink-0 text-[#456be5] dark:text-blue-400" />
                      {club.meetingSchedule}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={13} className="shrink-0 text-[#456be5] dark:text-blue-400" />
                      {club.contactEmail}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="shrink-0 text-[#456be5] dark:text-blue-400" />
                      {club.contactPhone}
                    </div>
                  </div>

                  <a href={`mailto:${club.contactEmail}`}
                    className="mt-5 block rounded-xl bg-[#456be5] dark:bg-blue-600 py-2.5 text-center text-sm font-bold text-white hover:bg-[#3659c8] dark:hover:bg-blue-500 transition-colors">
                    Contact Club
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
