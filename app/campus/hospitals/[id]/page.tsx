import Link from "next/link";

interface HospitalDetailsPageProps { params: Promise<{ id: string }>; }

export default async function HospitalDetailsPage({ params }: HospitalDetailsPageProps) {
  const { id } = await params;
  return <main className="min-h-screen bg-[#f8faff] px-6 py-12 sm:px-10 lg:px-16"><div className="mx-auto max-w-4xl rounded-[2rem] border border-[#dce5ff] bg-white p-8 shadow-xl sm:p-12"><p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#456be5]">Care near campus</p><h1 className="mt-5 text-4xl font-black uppercase tracking-[-0.05em] text-[#071333] sm:text-5xl">Hospital details</h1><p className="mt-6 text-slate-600">This page will display the complete details for hospital <strong>{id}</strong>.</p><Link href="/campus/hospitals" className="mt-8 inline-flex rounded-full bg-[#456be5] px-5 py-3 text-sm font-bold text-white hover:bg-[#3659c8]">Back to hospitals</Link></div></main>;
}
