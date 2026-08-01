import Link from "next/link";
import Image from "next/image";
import { getClubs } from "@/lib/actions/club";
import DeleteClubButton from "@/components/DeleteClubButton";
import { Plus, Users } from "lucide-react";

export default async function AdminClubsPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clubs</h1>
          <p className="text-slate-400 text-sm mt-1">{clubs.length} entries</p>
        </div>
        <Link
          href="/admin/clubs/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Club
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Club Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club) => (
                <tr key={club.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image src={club.image} alt={club.name} width={60} height={48} className="rounded-lg object-cover" />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{club.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                      {club.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{club.contactPhone}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm max-w-[200px] truncate">{club.meetingSchedule}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/clubs/edit/${club.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteClubButton id={club.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {clubs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No clubs found. Add your first club.
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
