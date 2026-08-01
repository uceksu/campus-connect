import { notFound } from "next/navigation";
import { getHospitalById } from "@/lib/actions/hospital";
import HospitalForm from "@/components/HospitalForm";

export default async function EditHospitalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hospital = await getHospitalById(id);
  if (!hospital) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Hospital</h1>
        <p className="text-slate-400 text-sm mt-1">{hospital.name}</p>
      </div>
      <HospitalForm
        submitLabel="Save Changes"
        hospitalId={hospital.id}
        initialData={hospital}
      />
    </div>
  );
}
