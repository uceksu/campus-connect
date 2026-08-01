import Image from "next/image";
import { notFound } from "next/navigation";
import { getHostelById } from "@/lib/actions/hostel";

interface HostelDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function HostelDetailsPage({ params }: HostelDetailsPageProps) {
  const { id } = await params;
  const hostel = await getHostelById(id);

  if (!hostel) notFound();

  return (
    <main className="min-h-screen bg-[#f8faff] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#dce5ff] bg-white shadow-xl">
        <Image src={hostel.image} alt={hostel.name} width={1200} height={600} className="h-72 w-full object-cover sm:h-96" />
        <div className="p-7 sm:p-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#456be5]">Hostel details</p>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] text-[#071333] sm:text-5xl">{hostel.name}</h1>
          <p className="mt-4 text-slate-600">{hostel.distance}</p>
          <p className="mt-7 max-w-3xl leading-7 text-slate-700">{hostel.description}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#dce5ff] bg-[#f8faff] p-6"><h2 className="text-xl font-black uppercase tracking-[-0.03em] text-[#071333]">Contact</h2><p className="mt-3">{hostel.phone}</p><a href={hostel.maps} target="_blank" rel="noreferrer" className="mt-3 inline-block font-bold text-[#456be5] hover:underline">View on Maps</a></div>
            <div className="rounded-3xl border border-[#dce5ff] bg-[#f8faff] p-6"><h2 className="text-xl font-black uppercase tracking-[-0.03em] text-[#071333]">Price</h2><p className="mt-3">{hostel.price}</p></div>
          </div>
        </div>
      </div>
    </main>
  );
}
