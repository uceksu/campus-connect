import { getDepartments } from "@/lib/actions/department";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Departments | Campus Connect",
  description: "Explore the academic departments at KSU UCE.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div className="min-h-screen bg-[#071333] selection:bg-[#456be5]/30">
      <div className="relative isolate pt-24 pb-20">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-blue-500/10 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute top-40 -left-20 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6">
              Academic Departments
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Explore the various branches of study at KSU UCE, meet our esteemed faculty, and learn about our academic offerings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <Link
                key={dept.id}
                href={`/departments/${dept.shortName.toLowerCase()}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-[#456be5]/50 hover:shadow-2xl hover:shadow-[#456be5]/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#456be5]/10 blur-[50px] -z-10 rounded-full group-hover:bg-[#456be5]/20 transition-colors" />
                
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#456be5]/20 border border-[#456be5]/30 flex items-center justify-center mb-6">
                    <Building2 size={28} className="text-[#456be5]" />
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                    {dept.name}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium mb-4">
                    {dept.shortName}
                  </p>
                  <p className="text-slate-500 text-sm line-clamp-3">
                    {dept.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center text-sm font-bold text-[#456be5] group-hover:text-[#5b7df0] transition-colors">
                  View Faculty
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {departments.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-slate-400 text-lg">No departments found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
