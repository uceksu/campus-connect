import Link from "next/link";
import { getAcademicSubjects } from "@/lib/actions/academicSubject";
import { Plus, Edit2 } from "lucide-react";
import DeleteSubjectButton from "./DeleteSubjectButton";

export default async function SubjectsPage() {
  const subjects = await getAcademicSubjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Academic Subjects</h1>
          <p className="text-slate-400 text-sm mt-1">Manage subjects for academic notes</p>
        </div>
        <Link
          href="/admin/subjects/add"
          className="flex items-center gap-2 bg-[#456be5] hover:bg-[#5b7df0] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Subject
        </Link>
      </div>

      <div className="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-slate-300">
              <tr>
                <th className="px-6 py-4 font-medium">Subject Name</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Semester</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {subjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No subjects found.
                  </td>
                </tr>
              ) : (
                subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4">
                      {subject.branch}
                    </td>
                    <td className="px-6 py-4">
                      Semester {subject.semester}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/subjects/edit/${subject.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <DeleteSubjectButton id={subject.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
