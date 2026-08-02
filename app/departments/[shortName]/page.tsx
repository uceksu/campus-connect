import { getDepartmentByShortName } from "@/lib/actions/department";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Crown, Mail, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ shortName: string }> }) {
  const { shortName } = await params;
  const dept = await getDepartmentByShortName(shortName);
  
  if (!dept) return { title: "Not Found" };
  
  return {
    title: `${dept.name} (${dept.shortName}) | Campus Connect`,
    description: dept.description,
  };
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ shortName: string }> }) {
  const { shortName } = await params;
  const dept = await getDepartmentByShortName(shortName);

  if (!dept) {
    notFound();
  }

  const hod = dept.faculty.find(f => f.isHOD);
  const staff = dept.faculty.filter(f => !f.isHOD);

  return (
    <div className="min-h-screen bg-[#071333] selection:bg-[#456be5]/30">
      <div className="relative isolate pt-24 pb-20">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <Link href="/departments" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Departments
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              {dept.name}
            </h1>
            <p className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-bold text-sm tracking-wider mb-6">
              {dept.shortName}
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              {dept.description}
            </p>
          </div>

          {hod && (
            <div className="mb-20">
              <h2 className="text-2xl font-bold text-white text-center mb-8">Head of Department</h2>
              <div className="flex justify-center">
                <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#456be5]/50 transition-all w-full max-w-sm">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-[#456be5] rounded-full blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity" />
                    {hod.image ? (
                      <img src={hod.image} alt={hod.name} className="relative w-40 h-40 rounded-full object-cover border-4 border-white/10" />
                    ) : (
                      <div className="relative w-40 h-40 rounded-full bg-white/10 border-4 border-white/10 flex items-center justify-center">
                        <User size={64} className="text-slate-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-2 right-4 bg-yellow-500 text-black p-2 rounded-full shadow-lg">
                      <Crown size={20} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{hod.name}</h3>
                  <p className="text-[#456be5] font-semibold mb-2">{hod.designation}</p>
                  
                  {hod.specialization && (
                    <p className="text-sm text-slate-400 mb-4">{hod.specialization}</p>
                  )}

                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10 w-full text-sm">
                    {hod.email && (
                      <a href={`mailto:${hod.email}`} className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <Mail size={14} className="text-slate-500" />
                        {hod.email}
                      </a>
                    )}
                    {hod.phone && (
                      <a href={`tel:${hod.phone}`} className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors">
                        <Phone size={14} className="text-slate-500" />
                        {hod.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {staff.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white text-center mb-8">Faculty Members</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {staff.map((f) => (
                  <div key={f.id} className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all">
                    {f.image ? (
                      <img src={f.image} alt={f.name} className="w-24 h-24 rounded-full object-cover border-2 border-white/10 mb-4" />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center mb-4">
                        <User size={32} className="text-slate-400" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-1">{f.name}</h3>
                    <p className="text-[#456be5] text-sm font-medium mb-1">{f.designation}</p>
                    
                    {f.specialization && (
                      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{f.specialization}</p>
                    )}

                    {(f.email || f.phone) && (
                      <div className="flex flex-col items-center gap-1.5 mt-auto pt-3 border-t border-white/10 w-full text-xs">
                        {f.email && (
                          <a href={`mailto:${f.email}`} className="flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-colors w-full truncate">
                            <Mail size={12} className="shrink-0" />
                            <span className="truncate">{f.email}</span>
                          </a>
                        )}
                        {f.phone && (
                          <a href={`tel:${f.phone}`} className="flex items-center justify-center gap-1.5 text-slate-400 hover:text-white transition-colors">
                            <Phone size={12} className="shrink-0" />
                            {f.phone}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!hod && staff.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No faculty members found for this department.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
