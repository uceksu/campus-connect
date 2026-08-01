import NearbyPlaceForm from "@/components/NearbyPlaceForm";

export default function AddNearbyPlacePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Nearby Place</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new place near campus</p>
      </div>
      <NearbyPlaceForm submitLabel="Add Place" />
    </div>
  );
}
