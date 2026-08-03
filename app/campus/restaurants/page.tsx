import Image from "next/image";
import PublicPageHero from "@/components/PublicPageHero";
import { getRestaurants } from "@/lib/actions/restaurant";
import { MapPin, Phone, Star } from "lucide-react";

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Eat near campus"
        title="Find a"
        accent="restaurant."
        description="Discover local restaurants and dining spots around campus — rated and reviewed."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {restaurants.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center text-slate-500 dark:text-slate-400 backdrop-blur-md">
            Restaurant listings will appear here as they are added.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <article key={restaurant.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-white/5 backdrop-blur-md">
                <div className="relative h-48 w-full">
                  <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="text-xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white">{restaurant.name}</h2>
                    <span className="flex items-center gap-1 text-sm font-bold text-amber-500 shrink-0">
                      <Star size={14} fill="currentColor" /> {restaurant.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <MapPin size={14} className="shrink-0" /> {restaurant.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <Phone size={14} className="shrink-0" /> {restaurant.phone}
                  </div>
                  <p className="text-xs text-[#456be5] dark:text-blue-400 font-semibold mt-2">{restaurant.price}</p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-350 line-clamp-2">{restaurant.description}</p>
                  <div className="mt-5 flex gap-3">
                    <a href={`tel:${restaurant.phone}`} className="flex-1 rounded-xl bg-[#071333] dark:bg-slate-900 py-2.5 text-center text-sm font-bold text-white hover:bg-[#17244a] dark:hover:bg-slate-800 transition-colors border dark:border-slate-850">
                      Call
                    </a>
                    <a href={restaurant.maps} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[#456be5] dark:bg-blue-600 py-2.5 text-center text-sm font-bold text-white hover:bg-[#3659c8] dark:hover:bg-blue-50 transition-colors">
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
