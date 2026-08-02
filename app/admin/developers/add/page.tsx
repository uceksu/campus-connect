import DeveloperForm from "@/components/DeveloperForm";

export default function AddDeveloperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Developer</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new developer to the Campus Connect team.</p>
      </div>
      <DeveloperForm submitLabel="Add Developer" />
    </div>
  );
}