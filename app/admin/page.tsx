import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import MaintenanceToggle from "@/components/MaintenanceToggle";
import { getMaintenanceMode } from "@/lib/actions/settings";
import {
  Building2,
  Hospital,
  BookOpen,
  Coffee,
  MapPin,
  Bell,
  GraduationCap,
  ArrowUpRight,
  TrendingUp,
  Users,
} from "lucide-react";

async function getDashboardStats() {
  const [hostels, hospitals, academicNotes, teaShops, nearbyPlaces, notices, scholarships, clubs, committeeMembers, academicSubjects] =
    await Promise.all([
      prisma.hostel.count(),
      prisma.hospital.count(),
      prisma.academicNote.count(),
      prisma.teaShop.count(),
      prisma.nearbyPlace.count(),
      prisma.notice.count(),
      prisma.scholarship.count(),
      prisma.club.count(),
      prisma.committeeMember.count(),
      prisma.academicSubject.count(),
    ]);

  return { hostels, hospitals, academicNotes, teaShops, nearbyPlaces, notices, scholarships, clubs, committeeMembers, academicSubjects };
}

const cards = [
  {
    label: "Hostels",
    key: "hostels" as const,
    href: "/admin/hostels",
    addHref: "/admin/hostels/add",
    icon: Building2,
    color: "from-blue-500 to-blue-700",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
  },
  {
    label: "Hospitals",
    key: "hospitals" as const,
    href: "/admin/hospitals",
    addHref: "/admin/hospitals/add",
    icon: Hospital,
    color: "from-rose-500 to-rose-700",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-400",
  },
  {
    label: "Academic Notes",
    key: "academicNotes" as const,
    href: "/admin/academic-notes",
    addHref: "/admin/academic-notes/add",
    icon: BookOpen,
    color: "from-violet-500 to-violet-700",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
  },
  {
    label: "Tea Shops",
    key: "teaShops" as const,
    href: "/admin/teashops",
    addHref: "/admin/teashops/add",
    icon: Coffee,
    color: "from-amber-500 to-amber-700",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
  {
    label: "Nearby Places",
    key: "nearbyPlaces" as const,
    href: "/admin/nearby-places",
    addHref: "/admin/nearby-places/add",
    icon: MapPin,
    color: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  {
    label: "Notices",
    key: "notices" as const,
    href: "/admin/notices",
    addHref: "/admin/notices/add",
    icon: Bell,
    color: "from-orange-500 to-orange-700",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
  },
  {
    label: "Scholarships",
    key: "scholarships" as const,
    href: "/admin/scholarships",
    addHref: "/admin/scholarships/add",
    icon: GraduationCap,
    color: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
  },
  {
    label: "Clubs",
    key: "clubs" as const,
    href: "/admin/clubs",
    addHref: "/admin/clubs/add",
    icon: Users,
    color: "from-indigo-500 to-indigo-700",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
  },
  {
    label: "Committee",
    key: "committeeMembers" as const,
    href: "/admin/committee",
    addHref: "/admin/committee/add",
    icon: Users,
    color: "from-pink-500 to-pink-700",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
  },
  {
    label: "Subjects",
    key: "academicSubjects" as const,
    href: "/admin/subjects",
    addHref: "/admin/subjects/add",
    icon: BookOpen,
    color: "from-fuchsia-500 to-fuchsia-700",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    text: "text-fuchsia-400",
  },
];

export default async function AdminDashboardPage() {
  const session = await auth();
  const userRole = session?.user?.role;
  const userPermissions = (session?.user as any)?.permissions || [];

  // Filter cards based on RBAC
  const visibleCards = cards.filter((card) => {
    if (userRole === "SUPER_ADMIN") return true;
    const section = card.href.split("/")[2];
    return userPermissions.includes(section);
  });

  const stats = await getDashboardStats();
  
  // Calculate total items only for visible cards
  const totalItems = visibleCards.reduce((total, card) => total + stats[card.key], 0);

  const isMaintenanceOn = await getMaintenanceMode();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-400">
          Overview of all campus content —{" "}
          <span className="text-white font-medium">{totalItems} total items</span> across {visibleCards.length} sections
        </p>
      </div>

      {userRole === "SUPER_ADMIN" && (
        <MaintenanceToggle initialStatus={isMaintenanceOn} />
      )}

      {/* Total banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1a2644] to-[#0f1628] border border-[#456be5]/20 p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#456be5]/20 flex items-center justify-center">
          <TrendingUp size={24} className="text-[#456be5]" />
        </div>
        <div>
          <p className="text-slate-400 text-sm">Total managed entries</p>
          <p className="text-4xl font-black text-white">{totalItems}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleCards.length === 0 && (
          <div className="col-span-full p-8 border border-white/10 rounded-2xl bg-[#0b1120] text-center text-slate-400">
            You do not have access to any dashboard sections yet. Please contact the Super Admin.
          </div>
        )}
        
        {visibleCards.map((card) => {
          const count = stats[card.key];
          return (
            <div
              key={card.key}
              className={`rounded-2xl border ${card.border} ${card.bg} p-6 flex flex-col gap-4 group hover:scale-[1.01] transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center`}>
                  <card.icon size={20} className={card.text} />
                </div>
                <span className={`text-4xl font-black ${card.text}`}>{count}</span>
              </div>

              <div>
                <p className="text-white font-semibold text-lg">{card.label}</p>
                <p className="text-slate-500 text-sm mt-0.5">
                  {count === 0 ? "No entries yet" : `${count} ${count === 1 ? "entry" : "entries"}`}
                </p>
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  href={card.href}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium ${card.text} border ${card.border} hover:bg-white/5 transition-colors`}
                >
                  View all
                  <ArrowUpRight size={14} />
                </Link>
                <Link
                  href={card.addHref}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${card.color} hover:opacity-90 transition-opacity`}
                >
                  + Add
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}