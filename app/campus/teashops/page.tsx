import Image from "next/image";
import PublicPageHero from "@/components/PublicPageHero";
import { getTeaShops } from "@/lib/actions/teashop";
import { MapPin, Phone, Star } from "lucide-react";

export default async function TeaShopsPage() {
  const shops = await getTeaShops();

  return (
    <main className="min-h-screen bg-[#456be5] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[18px_18px]">
      <PublicPageHero
        eyebrow="Eat near campus"
        title="Take a"
        accent="tea break."
        description="Discover tea shops and food spots around campus — rated and reviewed."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {shops.length === 0 ? (
          <div className="rounded-3xl border border-white/30 bg-white p-10 text-center text-slate-500">
            Tea shop listings will appear here as they are added.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((shop) => (
              <article key={shop.id} className="overflow-hidden rounded-3xl border border-white/30 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative h-48 w-full">
                  <Image src={shop.image} alt={shop.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-xl font-black uppercase tracking-[-0.04em] text-[#071333]">{shop.name}</h2>
                    <span className="flex items-center gap-1 text-sm font-bold text-amber-500 shrink-0">
                      <Star size={14} fill="currentColor" /> {shop.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <MapPin size={14} className="shrink-0" /> {shop.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                    <Phone size={14} className="shrink-0" /> {shop.phone}
                  </div>
                  <p className="text-xs text-[#456be5] font-semibold mt-2">{shop.price}</p>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">{shop.description}</p>
                  <div className="mt-5 flex gap-3">
                    <a href={`tel:${shop.phone}`} className="flex-1 rounded-xl bg-[#071333] py-2.5 text-center text-sm font-bold text-white hover:bg-[#17244a] transition-colors">
                      Call
                    </a>
                    <a href={shop.maps} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[#456be5] py-2.5 text-center text-sm font-bold text-white hover:bg-[#3659c8] transition-colors">
                      Maps
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
