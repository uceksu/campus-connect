import Link from "next/link";
import { ArrowUpRight, Coffee, HeartPulse, Hotel, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PublicPageHero from "@/components/PublicPageHero";

const places = [
  { title: "Hostels", label: "Stay", description: "Compare nearby hostels and find a place that fits your student life.", icon: Hotel, href: "/campus/hostels" },
  { title: "Tea Shops", label: "Eat", description: "Find tea shops and everyday food spots around the campus.", icon: Coffee, href: "/campus/teashops" },
  { title: "Places to Visit", label: "Explore", description: "Discover useful places and services around KSU UCE.", icon: MapPin, href: "/campus/places" },
  { title: "Hospitals", label: "Care", description: "Keep emergency contacts and nearby medical help within reach.", icon: HeartPulse, href: "/campus/hospitals" },
];

export default function CampusPage() {
  return (
    <main className="min-h-screen bg-[#456be5] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[18px_18px]">
      <PublicPageHero eyebrow="Around campus" title="Find your" accent="way around." description="The essential places, services, and student-friendly spots around KSU UCE." />
      <div className="mx-auto grid max-w-7xl gap-5 px-6 py-14 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">
        {places.map((item) => (
          <Link href={item.href} key={item.title} className="group">
            <Card className="h-full rounded-3xl border border-white/30 bg-white py-0 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <CardContent className="flex min-h-56 flex-col p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-[#e8eeff] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#456be5]">{item.label}</span>
                  <item.icon className="size-6 text-[#456be5]" aria-hidden="true" />
                </div>
                <h2 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em]">{item.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">{item.description}</p>
                <span className="mt-auto flex size-10 items-center justify-center self-end rounded-full bg-[#456be5] text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><ArrowUpRight className="size-5" aria-hidden="true" /></span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
