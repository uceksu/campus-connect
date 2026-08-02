import { notFound } from "next/navigation";
import { getAcademicNoteById } from "@/lib/actions/academicNote";
import { getAcademicSubjects } from "@/lib/actions/academicSubject";
import AcademicNoteForm from "@/components/AcademicNoteForm";

export default async function EditAcademicNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const note = await getAcademicNoteById(resolvedParams.id);
  const subjects = await getAcademicSubjects();

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Academic Note</h1>
        <p className="text-slate-400 text-sm mt-1">Update study material or notes</p>
      </div>
      <AcademicNoteForm
        submitLabel="Update Note"
        noteId={note.id}
        initialData={note}
        subjects={subjects}
      />
    </div>
  );
}
