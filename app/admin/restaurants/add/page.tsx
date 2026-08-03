import RestaurantForm from "@/components/RestaurantForm";

export default function AddRestaurantPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Restaurant</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new restaurant near campus</p>
      </div>
      <RestaurantForm submitLabel="Add Restaurant" />
    </div>
  );
}
