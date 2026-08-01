import ScholarshipForm from "@/components/ScholarshipForm";

export default function AddScholarshipPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Scholarship</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new scholarship listing to Campus Connect</p>
      </div>
      <ScholarshipForm submitLabel="Add Scholarship" />
    </div>
  );
}
