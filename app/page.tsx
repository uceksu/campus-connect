import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  GraduationCap,
  MapPin,
  Shield,
  Bell,
  Users,
  Calendar,
  Building2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Academic Workspace",
    label: "Study",
    description: "Find academic resources and keep your campus learning organised.",
    icon: GraduationCap,
    href: "/academics",
  },
  {
    title: "Departments",
    label: "Academics",
    description: "Explore various departments, faculty profiles, and their details.",
    icon: Building2,
    href: "/departments",
  },
  {
    title: "Around Campus",
    label: "Explore",
    description: "Discover hostels, hospitals, tea shops, and useful places nearby.",
    icon: MapPin,
    href: "/campus",
  },
  {
    title: "Funding Finder",
    label: "Scholarships",
    description: "Explore scholarship information and opportunities for students.",
    icon: Award,
    href: "/scholarships",
  },
  {
    title: "Latest Notices",
    label: "Updates",
    description: "Stay up-to-date with official announcements, news and updates.",
    icon: Bell,
    href: "/notices",
  },
  {
    title: "Student Clubs",
    label: "Community",
    description: "Connect with campus societies, sports teams, and interest groups.",
    icon: Users,
    href: "/clubs",
  },
  {
    title: "Academic Calendar",
    label: "Schedule",
    description: "View exam timetables, term dates, and official holidays.",
    icon: Calendar,
    href: "/calendar",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#f8faff] dark:bg-[#060b18] text-[#071333] dark:text-slate-100 transition-colors duration-300">
      <section className="relative overflow-hidden bg-[#071333] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(68,104,231,0.5),_transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#a9c1ff]">
            KSU UCE · Student Portal
          </p>
          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Your campus
            <span className="mt-4 block text-[#9db9ff] normal-case tracking-[-0.04em]">connected.</span>
            In one place.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Campus Connect brings the essentials of student life together—so you
            can find what you need and get on with your day.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#explore"
              className="rounded-full bg-[#456be5] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#5b7df0]"
            >
              Explore campus
            </Link>
            <Link
              href="/about-ksu"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              About KSU
            </Link>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section id="explore" className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#456be5] dark:text-blue-400">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl text-[#071333] dark:text-white">
                Everything you need
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Choose a section to find the information and services that matter to you.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => (
              <Link key={item.title} href={item.href} className="group">
                <Card className="h-full rounded-3xl border border-[#dce5ff] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#91aaf5] hover:shadow-xl dark:bg-[#0f172a] dark:border-[#1e293b] dark:hover:border-[#334155]">
                  <CardContent className="flex min-h-56 flex-col p-7 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full bg-[#e8eeff] dark:bg-blue-950/40 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#456be5] dark:text-blue-400">
                        {item.label}
                      </span>
                      <item.icon className="size-6 text-[#456be5] dark:text-blue-400" aria-hidden="true" />
                    </div>
                    <h3 className="mt-8 text-2xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                    <span className="mt-auto flex size-10 items-center justify-center self-end rounded-full bg-[#456be5] dark:bg-blue-600 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="size-5" aria-hidden="true" />
                      <span className="sr-only">Open {item.title}</span>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>      {/* Help & Support Desk Section */}
      <section className="bg-slate-50 dark:bg-[#090e1a] border-t border-slate-100 dark:border-[#1e293b]/50 px-6 py-16 sm:px-10 lg:px-16 lg:py-24 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#456be5] dark:text-blue-400">
              Get Support
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl text-[#071333] dark:text-white">
              Student Help & Support Desk
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Have a question or need to report a problem? Get direct support from Team KSU via WhatsApp.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Got Questions? */}
            <Link href="/support/enquiry" className="group flex flex-col h-full overflow-hidden rounded-3xl border border-blue-200 dark:border-[#1e293b] bg-[#eef3ff] dark:bg-[#0f172a]/55 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-56 w-full flex items-center justify-center p-4 shrink-0 bg-white/20 dark:bg-white/5">
                <span className="absolute top-4 left-4 rounded-full bg-[#cbdcff] dark:bg-blue-950/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#456be5] dark:text-blue-400">
                  Enquiry
                </span>
                <div className="relative w-36 h-36 transition-transform duration-300 group-hover:scale-105">
                  <Image src="/question-bubble-3d.jpg" alt="Got Questions" fill className="object-contain" />
                </div>
              </div>
              <div className="bg-[#456be5] dark:bg-[#254cc4] p-8 text-white relative flex-1 flex flex-col justify-between min-h-[180px] rounded-b-[22px]">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                    Ask
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">
                    Got Questions?
                  </h3>
                  <p className="mt-2 text-sm text-blue-100 leading-relaxed max-w-md">
                    Ask Team KSU anything. We'll make sure your question reaches the right person.
                  </p>
                </div>
                <span className="absolute bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-white text-[#456be5] dark:text-[#254cc4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="size-6" />
                </span>
              </div>
            </Link>

            {/* Card 2: Raise Issue */}
            <Link href="/support/report" className="group flex flex-col h-full overflow-hidden rounded-3xl border border-blue-200 dark:border-[#1e293b] bg-[#eef3ff] dark:bg-[#0f172a]/55 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-56 w-full flex items-center justify-center p-4 shrink-0 bg-white/20 dark:bg-white/5">
                <span className="absolute top-4 left-4 rounded-full bg-[#cbdcff] dark:bg-blue-950/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#456be5] dark:text-blue-400">
                  Report
                </span>
                <div className="relative w-36 h-36 transition-transform duration-300 group-hover:scale-105">
                  <Image src="/megaphone-warning-3d.jpg" alt="Raise Issue" fill className="object-contain" />
                </div>
              </div>
              <div className="bg-[#456be5] dark:bg-[#254cc4] p-8 text-white relative flex-1 flex flex-col justify-between min-h-[180px] rounded-b-[22px]">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                    Student Welfare
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">
                    Raise Issue
                  </h3>
                  <p className="mt-2 text-sm text-blue-100 leading-relaxed max-w-md">
                    Report hostel problems directly to KSU via WhatsApp.
                  </p>
                </div>
                <span className="absolute bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-white text-[#456be5] dark:text-[#254cc4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="size-6" />
                </span>
              </div>
            </Link>

            {/* Card 3: Suggestion */}
            <Link href="/support/suggestion" className="group flex flex-col h-full overflow-hidden rounded-3xl border border-blue-200 dark:border-[#1e293b] bg-[#eef3ff] dark:bg-[#0f172a]/55 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative h-56 w-full flex items-center justify-center p-4 shrink-0 bg-white/20 dark:bg-white/5">
                <span className="absolute top-4 left-4 rounded-full bg-[#cbdcff] dark:bg-blue-950/40 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#456be5] dark:text-blue-400">
                  Suggestion
                </span>
                <div className="relative w-36 h-36 transition-transform duration-300 group-hover:scale-105">
                  <Image src="/lightbulb-idea-3d.jpg" alt="Suggestions" fill className="object-contain" />
                </div>
              </div>
              <div className="bg-[#456be5] dark:bg-[#254cc4] p-8 text-white relative flex-1 flex flex-col justify-between min-h-[180px] rounded-b-[22px]">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                    Ideas
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">
                    Suggestions
                  </h3>
                  <p className="mt-2 text-sm text-blue-100 leading-relaxed max-w-md">
                    Give ideas and suggestions to improve campus life.
                  </p>
                </div>
                <span className="absolute bottom-8 right-8 flex size-12 items-center justify-center rounded-full bg-white text-[#456be5] dark:text-[#254cc4] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="size-6" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
