import Image from "next/image";
import PublicPageHero from "@/components/PublicPageHero";
import { getHospitals } from "@/lib/actions/hospital";
import { MapPin, Phone, ShieldAlert } from "lucide-react";

export default async function HospitalsPage() {
  const hospitals = await getHospitals();

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="Care near campus"
        title="Medical help"
        accent="when you need it."
        description="Find nearby hospitals, emergency contacts, and directions around the campus."
      />

      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {hospitals.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/60 p-10 text-center text-slate-500 dark:text-slate-400 backdrop-blur-md">
            Hospital listings will appear here once added by an administrator.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <article key={hospital.id} className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-xl dark:shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-white/5 backdrop-blur-md">
                <div className="relative h-48 w-full">
                  <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white mb-3">{hospital.name}</h2>
                  <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                    <MapPin size={14} className="shrink-0 mt-0.5" /> {hospital.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1.5">
                    <Phone size={14} className="shrink-0" /> {hospital.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-semibold">
                    <ShieldAlert size={14} className="shrink-0" /> Emergency: {hospital.emergencyContact}
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-350 line-clamp-2">{hospital.description}</p>
                  <div className="mt-5 flex gap-3">
                    <a href={`tel:${hospital.phone}`} className="flex-1 rounded-xl bg-[#071333] dark:bg-slate-900 py-2.5 text-center text-sm font-bold text-white hover:bg-[#17244a] dark:hover:bg-slate-800 transition-colors border dark:border-slate-850">
                      Call
                    </a>
                    <a href={hospital.maps} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-[#456be5] dark:bg-blue-600 py-2.5 text-center text-sm font-bold text-white hover:bg-[#3659c8] dark:hover:bg-blue-500 transition-colors">
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
