import Link from "next/link";
import Image from "next/image";
import { getCommitteeMembers, deleteCommitteeMember } from "@/lib/actions/committee";
import { Plus, Edit2 } from "lucide-react";
import DeleteCommitteeButton from "./DeleteCommitteeButton"; // I'll create this right after

export default async function CommitteePage() {
  const members = await getCommitteeMembers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Committee Members</h1>
          <p className="text-slate-400 text-sm mt-1">Manage KSU and Priyadarshini leaders</p>
        </div>
        <Link
          href="/admin/committee/add"
          className="flex items-center gap-2 bg-[#456be5] hover:bg-[#5b7df0] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Member
        </Link>
      </div>

      <div className="bg-[#0b1120] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 border-b border-white/10 text-slate-300">
              <tr>
                <th className="px-6 py-4 font-medium">Name & Role</th>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Contacts</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No committee members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                          <Image src={member.image} alt={member.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{member.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        member.organization === "KSU" 
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                      }`}>
                        {member.organization}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-slate-400">
                        <span>WhatsApp: {member.whatsapp}</span>
                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-[#456be5] hover:underline truncate max-w-[150px]">
                          Instagram
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/committee/edit/${member.id}`}
                          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <DeleteCommitteeButton id={member.id} />
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
