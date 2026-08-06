import Link from "next/link";
import { getDepartments } from "@/lib/actions/department";
import { Plus, Building2, Users } from "lucide-react";
import DeleteDepartmentButton from "@/components/DeleteDepartmentButton";
import ExportCSVButton from "@/components/ExportCSVButton";

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments();

  const csvData = departments.flatMap(d => {
    if (d.faculty.length === 0) {
      return [{
        "Department": d.name,
        "Faculty Name": "No Faculty Added",
        "Designation": "-",
        "Specialization": "-",
        "Phone": "-",
        "Email": "-",
        "Is HOD": "-"
      }];
    }
    return d.faculty.map(f => ({
      "Department": d.name,
      "Faculty Name": f.name,
      "Designation": f.designation,
      "Specialization": f.specialization || "-",
      "Phone": f.phone || "-",
      "Email": f.email || "-",
      "Is HOD": f.isHOD ? "Yes" : "No"
    }));
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Departments</h1>
          <p className="text-slate-400 text-sm mt-1">{departments.length} entries</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={csvData} filename="departments_report.csv" />
          <Link
            href="/admin/departments/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} />
            Add Department
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Department Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Faculty Count</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#456be5]/10 border border-[#456be5]/20 flex items-center justify-center shrink-0">
                        <Building2 size={16} className="text-[#456be5]" />
                      </div>
                      <span className="text-white font-medium text-sm max-w-[320px] truncate">{dept.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {dept.shortName}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    <Link
                      href={`/admin/departments/${dept.id}/faculty`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors text-xs font-medium"
                    >
                      <Users size={14} className="text-[#456be5]" />
                      {dept._count.faculty} Faculty
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/departments/edit/${dept.id}`}
                        className="text-sm font-medium text-[#456be5] hover:text-[#5b7df0] transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteDepartmentButton id={dept.id} name={dept.name} />
                    </div>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No departments found. Add one to get started.
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
