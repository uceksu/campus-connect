import Link from "next/link";
import Image from "next/image";
import { getHostels } from "@/lib/actions/hostel";
import DeleteHostelButton from "@/components/DeleteHostelButton";
import { Plus } from "lucide-react";

export default async function AdminHostelsPage() {
  const hostels = await getHostels();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hostels</h1>
          <p className="text-slate-400 text-sm mt-1">{hostels.length} entries</p>
        </div>
        <Link
          href="/admin/hostels/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Hostel
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Hostel</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Distance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hostels.map((hostel) => (
                <tr key={hostel.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image
                      src={hostel.image}
                      alt={hostel.name}
                      width={60}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{hostel.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      hostel.type === "Girls"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}>
                      {hostel.type === "Girls" ? "Girls" : "Boys"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{hostel.distance}</td>
                  <td className="px-6 py-4 text-amber-400 text-sm">⭐ {hostel.rating}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{hostel.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/hostels/edit/${hostel.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteHostelButton id={hostel.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {hostels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                    No hostels found. Add your first hostel.
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