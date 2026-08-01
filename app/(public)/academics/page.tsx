import PublicPageHero from "@/components/PublicPageHero";
import { getAcademicNotes } from "@/lib/actions/academicNote";
import { NotesList } from "@/components/AcademicNotesList";
import { GraduationCap } from "lucide-react";

export default async function AcademicsPage() {
  const notes = await getAcademicNotes();

  return (
    <main className="min-h-screen bg-[#456be5] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[18px_18px]">
      <PublicPageHero
        eyebrow="Study at KSU UCE"
        title="Your academic"
        accent="workspace."
        description="Browse notes by branch — ECE, AD, CS, CY, Polymer, and EEE. Find what you need fast."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {notes.length === 0 ? (
          <div className="rounded-3xl border border-white/30 bg-white p-10 text-center">
            <GraduationCap className="mx-auto mb-4 size-10 text-slate-300" />
            <p className="text-slate-500">Academic notes will appear here once added by faculty or admin.</p>
          </div>
        ) : (
          <NotesList notes={notes} />
        )}
      </section>
    </main>
  );
}
