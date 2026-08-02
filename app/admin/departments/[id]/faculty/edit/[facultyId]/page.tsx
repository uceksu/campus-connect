import FacultyForm from "@/components/FacultyForm";
import { getDepartmentById } from "@/lib/actions/department";
import { getFacultyById } from "@/lib/actions/faculty";
import { notFound } from "next/navigation";

export default async function EditFacultyPage({ params }: { params: Promise<{ id: string; facultyId: string }> }) {
  const { id, facultyId } = await params;
  
  const [department, faculty] = await Promise.all([
    getDepartmentById(id),
    getFacultyById(facultyId)
  ]);

  if (!department || !faculty || faculty.departmentId !== department.id) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Faculty</h1>
        <p className="text-slate-400 text-sm mt-1">Update details for {faculty.name}.</p>
      </div>

      <FacultyForm 
        submitLabel="Save Changes" 
        departmentId={department.id} 
        facultyId={faculty.id}
        initialData={faculty}
      />
    </div>
  );
}
