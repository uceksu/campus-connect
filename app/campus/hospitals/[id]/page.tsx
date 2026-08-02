import Link from "next/link";

interface HospitalDetailsPageProps { params: Promise<{ id: string }>; }

export default async function HospitalDetailsPage({ params }: HospitalDetailsPageProps) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-[#f8faff] dark:bg-[#060b18] px-6 py-12 sm:px-10 lg:px-16 transition-colors duration-300">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#dce5ff] dark:border-slate-800 bg-white dark:bg-[#0f172a]/65 p-8 shadow-xl sm:p-12 backdrop-blur-md">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#456be5] dark:text-slate-550">Care near campus</p>
        <h1 className="mt-5 text-4xl font-black uppercase tracking-[-0.05em] text-[#071333] dark:text-white sm:text-5xl">Hospital details</h1>
        <p className="mt-6 text-slate-600 dark:text-slate-400">This page will display the complete details for hospital <strong>{id}</strong>.</p>
        <Link href="/campus/hospitals" className="mt-8 inline-flex rounded-full bg-[#456be5] dark:bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-[#3659c8] dark:hover:bg-blue-500 transition-colors">
          Back to hospitals
        </Link>
      </div>
    </main>
  );
}
