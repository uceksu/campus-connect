import { notFound } from "next/navigation";
import { getAcademicNoteById } from "@/lib/actions/academicNote";
import AcademicNoteForm from "@/components/AcademicNoteForm";

export default async function EditAcademicNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getAcademicNoteById(id);
  if (!note) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Academic Note</h1>
        <p className="text-slate-400 text-sm mt-1">{note.title}</p>
      </div>
      <AcademicNoteForm
        submitLabel="Save Changes"
        noteId={note.id}
        initialData={note}
      />
    </div>
  );
}
