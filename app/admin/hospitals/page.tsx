import Link from "next/link";
import Image from "next/image";
import { getHospitals } from "@/lib/actions/hospital";
import type { Hospital } from "@/src/generated/prisma/client";
import DeleteHospitalButton from "@/components/DeleteHospitalButton";
import { Plus } from "lucide-react";

export default async function AdminHospitalsPage() {
  const hospitals = await getHospitals() as Hospital[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hospitals</h1>
          <p className="text-slate-400 text-sm mt-1">{hospitals.length} entries</p>
        </div>
        <Link
          href="/admin/hospitals/add"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#456be5] hover:bg-[#5b7df0] text-white text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Hospital
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <Image
                      src={hospital.image}
                      alt={hospital.name}
                      width={60}
                      height={48}
                      className="rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{hospital.name}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{hospital.address}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{hospital.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/hospitals/edit/${hospital.id}`}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <DeleteHospitalButton id={hospital.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {hospitals.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                    No hospitals found. Add your first hospital.
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
