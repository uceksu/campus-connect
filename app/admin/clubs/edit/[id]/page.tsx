import { notFound } from "next/navigation";
import { getClubById } from "@/lib/actions/club";
import ClubForm from "@/components/ClubForm";

export default async function EditClubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const club = await getClubById(id);
  if (!club) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Club</h1>
        <p className="text-slate-400 text-sm mt-1">{club.name}</p>
      </div>
      <ClubForm submitLabel="Save Changes" clubId={club.id} initialData={club} />
    </div>
  );
}
