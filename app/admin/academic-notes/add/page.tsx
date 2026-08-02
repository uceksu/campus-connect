import AcademicNoteForm from "@/components/AcademicNoteForm";
import { getAcademicSubjects } from "@/lib/actions/academicSubject";

export default async function AddAcademicNotePage() {
  const subjects = await getAcademicSubjects();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Academic Note</h1>
        <p className="text-slate-400 text-sm mt-1">Add study material or notes to the campus directory</p>
      </div>
      <AcademicNoteForm submitLabel="Add Note" subjects={subjects} />
    </div>
  );
}
