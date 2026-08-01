import { notFound } from "next/navigation";
import { getNearbyPlaceById } from "@/lib/actions/nearbyPlace";
import NearbyPlaceForm from "@/components/NearbyPlaceForm";

export default async function EditNearbyPlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = await getNearbyPlaceById(id);
  if (!place) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Nearby Place</h1>
        <p className="text-slate-400 text-sm mt-1">{place.name}</p>
      </div>
      <NearbyPlaceForm
        submitLabel="Save Changes"
        placeId={place.id}
        initialData={place}
      />
    </div>
  );
}
