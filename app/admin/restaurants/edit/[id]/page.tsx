import { notFound } from "next/navigation";
import { getRestaurantById } from "@/lib/actions/restaurant";
import RestaurantForm from "@/components/RestaurantForm";

export default async function EditRestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const restaurant = await getRestaurantById(id);
  if (!restaurant) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Restaurant</h1>
        <p className="text-slate-400 text-sm mt-1">{restaurant.name}</p>
      </div>
      <RestaurantForm submitLabel="Save Changes" restaurantId={restaurant.id} initialData={restaurant} />
    </div>
  );
}
