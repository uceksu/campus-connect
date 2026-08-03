import Link from "next/link";
import Image from "next/image";
import { getRestaurants } from "@/lib/actions/restaurant";
import DeleteRestaurantButton from "@/components/DeleteRestaurantButton";
import { Plus } from "lucide-react";
import ExportCSVButton from "@/components/ExportCSVButton";

export default async function AdminRestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Restaurants</h1>
          <p className="text-slate-400 text-sm mt-1">{restaurants.length} entries</p>
        </div>
        <div className="flex items-center gap-3">
          <ExportCSVButton data={restaurants} filename="restaurants-export" />
          <Link href="/admin/restaurants/add" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors">
            <Plus size={16} /> Add Restaurant
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image src={restaurant.image} alt={restaurant.name} width={60} height={48} className="rounded-lg object-cover" />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{restaurant.name}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{restaurant.address}</td>
                  <td className="px-6 py-4 text-amber-400 text-sm">⭐ {restaurant.rating}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{restaurant.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/restaurants/edit/${restaurant.id}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium">Edit</Link>
                      <DeleteRestaurantButton id={restaurant.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {restaurants.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-slate-500">No restaurants found. Add your first one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
