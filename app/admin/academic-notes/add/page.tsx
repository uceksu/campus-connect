import AcademicNoteForm from "@/components/AcademicNoteForm";

export default function AddAcademicNotePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Academic Note</h1>
        <p className="text-slate-400 text-sm mt-1">Add study material or notes to the campus directory</p>
      </div>
      <AcademicNoteForm submitLabel="Add Note" />
    </div>
  );
}
