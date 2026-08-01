import HostelForm from "@/components/HostelForm";

export default function AddHostelPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Hostel</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new hostel to the campus directory</p>
      </div>
      <HostelForm submitLabel="Add Hostel" />
    </div>
  );
}
