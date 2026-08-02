import Link from "next/link";
import { getFacultyByDepartment } from "@/lib/actions/faculty";
import { getDepartmentById } from "@/lib/actions/department";
import { Plus, Users, User, ArrowLeft, Crown } from "lucide-react";
import DeleteFacultyButton from "@/components/DeleteFacultyButton";
import { notFound } from "next/navigation";

export default async function AdminFacultyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const department = await getDepartmentById(id);
  
  if (!department) {
    notFound();
  }

  const faculty = await getFacultyByDepartment(id);

  return (
    <div className="space-y-6">
      <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
        <ArrowLeft size={16} /> Back to Departments
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{department.name} Faculty</h1>
          <p className="text-slate-400 text-sm mt-1">{faculty.length} staff members</p>
        </div>
        <Link
          href={`/admin/departments/${id}/faculty/add`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Faculty
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f) => (
                <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {f.image ? (
                        <img src={f.image} alt={f.name} className="w-9 h-9 rounded-lg object-cover border border-white/10" />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <User size={16} className="text-slate-400" />
                        </div>
                      )}
                      <span className="text-white font-medium text-sm">{f.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {f.designation}
                  </td>
                  <td className="px-6 py-4">
                    {f.isHOD ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                        <Crown size={12} /> HOD
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs font-medium">Staff</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/departments/${id}/faculty/edit/${f.id}`}
                        className="text-sm font-medium text-[#456be5] hover:text-[#5b7df0] transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteFacultyButton id={f.id} name={f.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {faculty.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No faculty members added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
