import PublicPageHero from "@/components/PublicPageHero";
import { Code2 } from "lucide-react";
import { getDevelopers } from "@/lib/actions/developer";
import type { Developer } from "@/src/generated/prisma/client";
import Image from "next/image";

export default async function AboutCampusConnectPage() {
  const developers = await getDevelopers();

  return (
    <main className="min-h-screen bg-[#f8faff] dark:bg-[#060b18] text-[#071333] dark:text-slate-100 pt-24 pb-12 transition-colors duration-300">
      <PublicPageHero
        title="About Campus Connect"
        description="The digital gateway to life at UCE Muttom."
        eyebrow="PORTAL"
        accent="About"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* About Campus Connect Project */}
            <div className="rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-[#0f172a]/65 p-8 sm:p-10 space-y-6 shadow-sm backdrop-blur-md">
              <h3 className="flex items-center gap-2 text-xl font-black text-[#071333] dark:text-white uppercase tracking-tight">
                <Code2 size={24} className="text-[#456be5] dark:text-blue-400" /> The Project
              </h3>
              <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                Campus Connect is a unified portal designed exclusively for the students and staff of UCE Muttom. 
                Our goal is to centralize academic resources, campus news, and community interactions into one accessible platform. 
                From previous year question papers and study materials to local amenities and emergency contacts, Campus Connect is your digital gateway to life at UCE.
              </p>
              
              {/* Developer Team Section */}
              <div className="pt-6 border-t border-blue-100/60 dark:border-slate-800 space-y-6">
                <h4 className="text-lg font-bold text-[#071333] dark:text-white">Developer Team</h4>
                
                {developers.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {developers.map((dev: Developer) => (
                      <div key={dev.id} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#456be5]/20 dark:border-blue-500/10 shrink-0 bg-white dark:bg-slate-950">
                          <Image src={dev.image} alt={dev.name} width={64} height={64} className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-[#071333] dark:text-white text-base truncate">{dev.name}</h5>
                          <p className="text-xs font-semibold text-[#456be5] dark:text-blue-400 uppercase tracking-wider mt-0.5">{dev.role}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">{dev.description}</p>
                          
                          <div className="flex items-center gap-3 mt-3">
                            {dev.instagram && (
                              <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="text-[#456be5] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" title="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                              </a>
                            )}
                            {dev.whatsapp && (
                              <a href={dev.whatsapp.includes('http') || dev.whatsapp.includes('wa.me') ? dev.whatsapp : `https://wa.me/${dev.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-[#456be5] dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors" title="WhatsApp">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">Developer team information will be updated soon.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}