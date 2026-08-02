import DeveloperForm from "@/components/DeveloperForm";
import { getDeveloper } from "@/lib/actions/developer";
import { notFound } from "next/navigation";

export default async function EditDeveloperPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const developer = await getDeveloper(resolvedParams.id);

  if (!developer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Developer</h1>
        <p className="text-slate-400 text-sm mt-1">Update details for {developer.name}.</p>
      </div>
      <DeveloperForm submitLabel="Update Developer" developerId={developer.id} initialData={developer} />
    </div>
  );
}