import TeaShopForm from "@/components/TeaShopForm";

export default function AddTeaShopPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Tea Shop</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new tea shop near campus</p>
      </div>
      <TeaShopForm submitLabel="Add Tea Shop" />
    </div>
  );
}
