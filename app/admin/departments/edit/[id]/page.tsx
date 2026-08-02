import DepartmentForm from "@/components/DepartmentForm";
import { getDepartmentById } from "@/lib/actions/department";
import { notFound } from "next/navigation";

export default async function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const department = await getDepartmentById(id);

  if (!department) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Department</h1>
        <p className="text-slate-400 text-sm mt-1">Update details for {department.name}.</p>
      </div>

      <DepartmentForm
        submitLabel="Save Changes"
        departmentId={department.id}
        initialData={department}
      />
    </div>
  );
}
