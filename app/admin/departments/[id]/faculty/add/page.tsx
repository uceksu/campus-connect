import FacultyForm from "@/components/FacultyForm";
import { getDepartmentById } from "@/lib/actions/department";
import { notFound } from "next/navigation";

export default async function AddFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const department = await getDepartmentById(id);

  if (!department) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add Faculty</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new staff member to {department.name}.</p>
      </div>

      <FacultyForm submitLabel="Add Faculty" departmentId={department.id} />
    </div>
  );
}
