import HospitalForm from "@/components/HospitalForm";

export default function AddHospitalPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Hospital</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new hospital to the campus directory</p>
      </div>
      <HospitalForm submitLabel="Add Hospital" />
    </div>
  );
}
