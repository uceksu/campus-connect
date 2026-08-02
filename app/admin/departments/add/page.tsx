import DepartmentForm from "@/components/DepartmentForm";

export default function AddDepartmentPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add Department</h1>
        <p className="text-slate-400 text-sm mt-1">Create a new academic department.</p>
      </div>

      <DepartmentForm submitLabel="Create Department" />
    </div>
  );
}
