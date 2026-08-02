import PublicPageHero from "@/components/PublicPageHero";
import { getScholarships } from "@/lib/actions/scholarship";
import ScholarshipsList from "@/components/ScholarshipsList";

export default async function ScholarshipsPage() {
  const scholarships = await getScholarships();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Funding for students"
        title="Find your"
        accent="scholarship."
        description="Explore scholarships and funding opportunities available to KSU UCE students."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {scholarships.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center text-slate-500 dark:text-slate-400 backdrop-blur-md">
            Scholarship listings will appear here once added.
          </div>
        ) : (
          <ScholarshipsList scholarships={scholarships} />
        )}
      </section>
    </main>
  );
}
