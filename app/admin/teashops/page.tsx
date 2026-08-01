import Link from "next/link";
import Image from "next/image";
import { getTeaShops } from "@/lib/actions/teashop";
import DeleteTeaShopButton from "@/components/DeleteTeaShopButton";
import { Plus } from "lucide-react";

export default async function AdminTeaShopsPage() {
  const teaShops = await getTeaShops();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tea Shops</h1>
          <p className="text-slate-400 text-sm mt-1">{teaShops.length} entries</p>
        </div>
        <Link href="/admin/teashops/add" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors">
          <Plus size={16} /> Add Tea Shop
        </Link>
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
              {teaShops.map((shop) => (
                <tr key={shop.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image src={shop.image} alt={shop.name} width={60} height={48} className="rounded-lg object-cover" />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{shop.name}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{shop.address}</td>
                  <td className="px-6 py-4 text-amber-400 text-sm">⭐ {shop.rating}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{shop.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/teashops/edit/${shop.id}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium">Edit</Link>
                      <DeleteTeaShopButton id={shop.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {teaShops.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-slate-500">No tea shops found. Add your first one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
