import PublicPageHero from "@/components/PublicPageHero";
import { getNotices } from "@/lib/actions/notice";
import { Bell, Calendar, AlertCircle } from "lucide-react";
import Image from "next/image";

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Campus updates"
        title="Latest"
        accent="notices."
        description="Stay up to date with official announcements, events, and updates from KSU UCE."
      />

      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {notices.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center text-slate-500 dark:text-slate-400 backdrop-blur-md">
            <Bell className="mx-auto mb-4 size-10 text-slate-300 dark:text-slate-600" />
            No notices have been published yet.
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <article key={notice.id} className={`rounded-3xl border bg-white dark:bg-[#0f172a]/65 shadow-lg dark:shadow-none p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl backdrop-blur-md ${notice.isImportant ? "border-red-200 dark:border-red-900/50" : "border-slate-200 dark:border-white/10"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notice.isImportant ? "bg-red-50 dark:bg-red-950/20" : "bg-[#e8eeff] dark:bg-blue-950/40"}`}>
                      {notice.isImportant
                        ? <AlertCircle size={18} className="text-red-500" />
                        : <Bell size={18} className="text-[#456be5] dark:text-blue-400" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-black text-[#071333] dark:text-white text-lg">{notice.title}</h2>
                        {notice.isImportant && (
                          <span className="px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold">Important</span>
                        )}
                      </div>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#e8eeff] dark:bg-blue-950/50 text-[#456be5] dark:text-blue-400 text-xs font-semibold">
                        {notice.category}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 shrink-0">
                    <Calendar size={11} /> {timeAgo(notice.createdAt)}
                  </span>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-350 leading-relaxed pl-13">{notice.content}</p>
                {notice.image && (
                  <div className="mt-4 pl-13">
                    <div className="relative w-full max-w-lg h-64 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                      <Image 
                        src={notice.image} 
                        alt="Notice Attachment" 
                        fill
                        className="object-contain bg-slate-50 dark:bg-slate-900"
                      />
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
