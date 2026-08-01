import { notFound } from "next/navigation";
import { getScholarshipById } from "@/lib/actions/scholarship";
import ScholarshipForm from "@/components/ScholarshipForm";

export default async function EditScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarship = await getScholarshipById(id);
  if (!scholarship) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Scholarship</h1>
        <p className="text-slate-400 text-sm mt-1">{scholarship.name}</p>
      </div>
      <ScholarshipForm submitLabel="Save Changes" scholarshipId={scholarship.id} initialData={scholarship} />
    </div>
  );
}
