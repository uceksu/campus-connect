import { notFound } from "next/navigation";
import { getHostelById } from "@/lib/actions/hostel";
import HostelForm from "@/components/HostelForm";

export default async function EditHostelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const hostel = await getHostelById(id);
  if (!hostel) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Hostel</h1>
        <p className="text-slate-400 text-sm mt-1">{hostel.name}</p>
      </div>
      <HostelForm
        submitLabel="Save Changes"
        hostelId={hostel.id}
        initialData={{
          name: hostel.name,
          distance: hostel.distance,
          rating: hostel.rating.toString(),
          price: hostel.price,
          phone: hostel.phone,
          maps: hostel.maps,
          description: hostel.description,
          image: hostel.image,
        }}
      />
    </div>
  );
}
