import SubjectForm from "@/components/SubjectForm";

export default function AddSubjectPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Academic Subject</h1>
        <p className="text-slate-400 text-sm mt-1">Create a new subject for students</p>
      </div>
      <SubjectForm submitLabel="Add Subject" />
    </div>
  );
}
