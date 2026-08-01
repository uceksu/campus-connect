import { notFound } from "next/navigation";
import { getTeaShopById } from "@/lib/actions/teashop";
import TeaShopForm from "@/components/TeaShopForm";

export default async function EditTeaShopPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const shop = await getTeaShopById(id);
  if (!shop) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Tea Shop</h1>
        <p className="text-slate-400 text-sm mt-1">{shop.name}</p>
      </div>
      <TeaShopForm submitLabel="Save Changes" teaShopId={shop.id} initialData={shop} />
    </div>
  );
}
