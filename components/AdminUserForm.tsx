"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminUser, updateAdminUser } from "@/lib/actions/adminUser";
import type { User } from "@/src/generated/prisma/client";

const AVAILABLE_PERMISSIONS = [
  { id: "hostels", label: "Hostels" },
  { id: "hospitals", label: "Hospitals" },
  { id: "academic-notes", label: "Academic Notes" },
  { id: "subjects", label: "Subjects" },
  { id: "departments", label: "Departments" },
  { id: "teashops", label: "Tea Shops" },
  { id: "restaurants", label: "Restaurants" },
  { id: "nearby-places", label: "Nearby Places" },
  { id: "note-requests", label: "Note Requests" },
  { id: "notices", label: "Notices" },
  { id: "scholarships", label: "Scholarships" },
  { id: "clubs", label: "Clubs" },
  { id: "committee", label: "Committee" },
  { id: "developers", label: "Developers" },
];

type Props = {
  initialData?: User | null;
};

export default function AdminUserForm({ initialData }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "",
  });

  const [permissions, setPermissions] = useState<string[]>(
    initialData?.permissions || []
  );

  const togglePermission = (permId: string) => {
    setPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const selectAll = () => setPermissions(AVAILABLE_PERMISSIONS.map(p => p.id));
  const deselectAll = () => setPermissions([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsSubmitting(true);

    try {
      if (initialData) {
        await updateAdminUser(initialData.id, {
          ...formData,
          permissions,
        });
        router.push("/admin/sub-admins");
        router.refresh();
      } else {
        const res = await createAdminUser({
          ...formData,
          permissions,
        });
        setSuccessMsg(`Admin created! Temporary Password: ${res.plainPassword}`);
        setFormData({ name: "", email: "", password: "" });
        setPermissions([]);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}
      
      {successMsg && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono">
          {successMsg}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Name</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5]"
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-300">Email Address</label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5]"
            placeholder="admin@example.com"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-slate-300">
            Password {initialData && "(Leave blank to keep unchanged)"}
          </label>
          <input
            type="text"
            name="new-admin-password"
            autoComplete="new-password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#456be5]"
            placeholder={initialData ? "Leave blank to keep current password" : "Leave blank to auto-generate"}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-semibold text-slate-300 block">Access Permissions</label>
            <p className="text-xs text-slate-500">Select which dashboards this admin can access and manage.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={selectAll} className="text-xs font-medium text-[#456be5] hover:text-white px-3 py-1.5 rounded-lg bg-[#456be5]/10 hover:bg-[#456be5]/20 transition">Select All</button>
            <button type="button" onClick={deselectAll} className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition">Clear All</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {AVAILABLE_PERMISSIONS.map((perm) => {
            const isSelected = permissions.includes(perm.id);
            return (
              <label
                key={perm.id}
                onClick={(e) => {
                  e.preventDefault();
                  togglePermission(perm.id);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-[#456be5]/10 border-[#456be5]/50 text-white"
                    : "bg-[#0b1120] border-white/10 text-slate-400 hover:border-white/20"
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                  isSelected ? "bg-[#456be5] border-[#456be5]" : "border-slate-600"
                }`}>
                  {isSelected && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white" stroke="currentColor" strokeWidth={3}>
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium">{perm.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-8 py-3 bg-[#456be5] hover:bg-[#3659c8] text-white rounded-xl font-bold transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : initialData ? "Update Sub-Admin" : "Create Sub-Admin"}
      </button>
    </form>
  );
}
