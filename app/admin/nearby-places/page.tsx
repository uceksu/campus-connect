import Link from "next/link";
import Image from "next/image";
import { getNearbyPlaces } from "@/lib/actions/nearbyPlace";
import DeleteNearbyPlaceButton from "@/components/DeleteNearbyPlaceButton";
import { Plus } from "lucide-react";
import ExportCSVButton from "@/components/ExportCSVButton";

export default async function AdminNearbyPlacesPage() {
  const places = await getNearbyPlaces();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nearby Places</h1>
          <p className="text-slate-400 text-sm mt-1">{places.length} entries</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={places} filename="nearby-places-export" />
          <Link
            href="/admin/nearby-places/add"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
          >
            <Plus size={16} />
            Add Place
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr key={place.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image
                      src={place.image}
                      alt={place.name}
                      width={60}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{place.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      {place.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{place.address}</td>
                  <td className="px-6 py-4 text-amber-400 text-sm">⭐ {place.rating}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/nearby-places/edit/${place.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteNearbyPlaceButton id={place.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {places.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    No nearby places found. Add your first one.
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
