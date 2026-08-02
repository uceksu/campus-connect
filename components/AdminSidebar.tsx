"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOut } from "@/lib/actions/authActions";
import {
  LayoutDashboard,
  Building2,
  Hospital,
  BookOpen,
  Coffee,
  MapPin,
  Bell,
  GraduationCap,
  LogOut,
  Shield,
  Menu,
  X,
  Users,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/hostels", label: "Hostels", icon: Building2 },
  { href: "/admin/hospitals", label: "Hospitals", icon: Hospital },
  { href: "/admin/academic-notes", label: "Academic Notes", icon: BookOpen },
  { href: "/admin/subjects", label: "Subjects", icon: BookOpen },
  { href: "/admin/teashops", label: "Tea Shops", icon: Coffee },
  { href: "/admin/nearby-places", label: "Nearby Places", icon: MapPin },
  { href: "/admin/clubs", label: "Clubs", icon: Users },
  { href: "/admin/notices", label: "Notices", icon: Bell },
  { href: "/admin/scholarships", label: "Scholarships", icon: GraduationCap },
  { href: "/admin/committee", label: "Committee", icon: Users },
];

type SidebarProps = {
  userName?: string | null;
  userEmail?: string | null;
  userRole?: string | null;
  userPermissions?: string[];
};

export default function AdminSidebar({ userName, userEmail, userRole, userPermissions = [] }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#456be5] flex items-center justify-center shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-none">Campus Connect</p>
          <p className="text-slate-500 text-xs mt-0.5">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // If ADMIN, check if they have permission for this section (based on the href path)
          const section = item.href.split("/")[2];
          if (userRole !== "SUPER_ADMIN" && section) {
            if (!userPermissions.includes(section)) return null;
          }

          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "bg-[#456be5] text-white shadow-lg shadow-[#456be5]/30"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon
                size={18}
                className={`shrink-0 ${active ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
              />
              {item.label}
            </Link>
          );
        })}

        {userRole === "SUPER_ADMIN" && (
          <Link
            href="/admin/sub-admins"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mt-4 border-t border-white/10 pt-4 ${
              isActive("/admin/sub-admins")
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Shield
              size={18}
              className={`shrink-0 ${isActive("/admin/sub-admins") ? "text-rose-400" : "text-slate-500 group-hover:text-slate-300"}`}
            />
            Sub-Admins
          </Link>
        )}
      </nav>

      {/* User info + logout */}
      <div className="px-4 pb-5 pt-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#456be5] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {(userName ?? userEmail ?? "A")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName ?? "Admin"}</p>
            <p className="text-xs text-slate-500 truncate">{userRole ?? "ADMIN"}</p>
          </div>
        </div>
        <button
          id="admin-logout-btn"
          onClick={() => logOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        id="mobile-sidebar-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-[#0f1628] border border-white/10 flex items-center justify-center text-white touch-manipulation cursor-pointer"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#0b1120] border-r border-white/10 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0b1120] border-r border-white/10 h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  );
}
