import PublicPageHero from "@/components/PublicPageHero";
import { getAcademicNotes } from "@/lib/actions/academicNote";
import { getAcademicSubjects } from "@/lib/actions/academicSubject";
import { NotesList } from "@/components/AcademicNotesList";
import { GraduationCap } from "lucide-react";

export default async function AcademicsPage() {
  const notes = await getAcademicNotes();
  const subjects = await getAcademicSubjects();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Study at KSU UCE"
        title="Your academic"
        accent="workspace."
        description="Browse notes by branch — ECE, AD, CS, CY, Polymer, and EEE. Find what you need fast."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {notes.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center shadow-sm dark:shadow-none backdrop-blur-md">
            <GraduationCap className="mx-auto mb-4 size-10 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-500 dark:text-slate-400">Academic notes will appear here once added by faculty or admin.</p>
          </div>
        ) : (
          <NotesList notes={notes} subjects={subjects} />
        )}
      </section>
    </main>
  );
}
