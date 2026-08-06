"use client";

import { useState, useTransition } from "react";
import type { KsuMember } from "@/src/generated/prisma/client";
import { format } from "date-fns";
import { toggleJoinFormSetting, updateWhatsappLinkSetting, updateCardSettings, bulkDeleteKsuMembers } from "@/lib/actions/member";
import { Loader2 } from "lucide-react";
import DeleteMemberButton from "@/components/DeleteMemberButton";
import ExportCSVButton from "@/components/ExportCSVButton";

type Settings = { requireYear: boolean; requireLocation: boolean; requirePhoto: boolean; whatsappLink: string; cardColor: string; cardSignature: string };

export default function MembersTabs({ members, initialSettings }: { members: KsuMember[], initialSettings: Settings }) {
  const [activeTab, setActiveTab] = useState<"logs" | "settings">("logs");
  const [settings, setSettings] = useState(initialSettings);
  const [whatsappLink, setWhatsappLink] = useState(initialSettings.whatsappLink);
  const [cardColor, setCardColor] = useState(initialSettings.cardColor);
  const [cardSignature, setCardSignature] = useState(initialSettings.cardSignature);
  const [isPending, startTransition] = useTransition();
  const [linkSaved, setLinkSaved] = useState(false);
  const [cardSaved, setCardSaved] = useState(false);
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedIds.size === members.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(members.map((m) => m.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} members?`)) return;
    startTransition(async () => {
      await bulkDeleteKsuMembers(Array.from(selectedIds));
      setSelectedIds(new Set());
    });
  };

  const handleToggle = (key: keyof Omit<Settings, "whatsappLink">) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    startTransition(async () => {
      const dbKey = key === "requireYear" ? "join_require_year" : key === "requireLocation" ? "join_require_location" : "join_require_photo";
      await toggleJoinFormSetting(dbKey, newValue);
    });
  };

  const handleSaveLink = () => {
    startTransition(async () => {
      await updateWhatsappLinkSetting(whatsappLink);
      setLinkSaved(true);
      setTimeout(() => setLinkSaved(false), 3000);
    });
  };

  const handleSaveCardSettings = () => {
    startTransition(async () => {
      await updateCardSettings(cardColor, cardSignature);
      setCardSaved(true);
      setTimeout(() => setCardSaved(false), 3000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-white/10 pb-px">
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "logs" ? "border-[#456be5] text-white" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Registered Members
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "settings" ? "border-[#456be5] text-white" : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          Form Settings
        </button>
      </div>

      {activeTab === "logs" ? (
        <div className="space-y-4">
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 bg-[#456be5]/10 border border-[#456be5]/20 p-3 rounded-xl animate-in fade-in slide-in-from-top-2">
              <span className="text-sm font-semibold text-[#9db9ff] ml-2">
                {selectedIds.size} member{selectedIds.size > 1 ? "s" : ""} selected
              </span>
              <div className="flex-1" />
              <ExportCSVButton 
                filename="KSU-Members-Selected"
                data={members.filter(m => selectedIds.has(m.id)).map(m => ({
                  ID: m.memberId,
                  Name: m.name,
                  Email: m.email,
                  Department: m.department,
                  Year: m.year || "",
                  Location: m.location || "",
                  Joined: format(new Date(m.joinedAt), "yyyy-MM-dd HH:mm:ss")
                }))} 
              />
              <button
                onClick={handleBulkDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 font-bold rounded-lg transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                Delete Selected
              </button>
            </div>
          )}
          
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left">
                      <input 
                        type="checkbox" 
                        checked={members.length > 0 && selectedIds.size === members.length}
                        onChange={toggleSelectAll}
                        className="rounded border-white/20 bg-black/20 text-[#456be5] focus:ring-[#456be5] focus:ring-offset-black"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Member ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Joined At</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(member.id)}
                        onChange={() => toggleSelect(member.id)}
                        className="rounded border-white/20 bg-black/20 text-[#456be5] focus:ring-[#456be5] focus:ring-offset-black"
                      />
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-[#9db9ff]">
                      <div className="flex items-center gap-3">
                        {member.photoUrl && (
                          <img src={member.photoUrl} alt="" className="w-8 h-8 rounded-full object-cover border border-white/10" />
                        )}
                        {member.memberId}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">{member.name}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{member.department}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{member.year || "-"}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{member.location || "-"}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{format(new Date(member.joinedAt), "MMM d, yyyy HH:mm")}</td>
                    <td className="px-6 py-4 text-right">
                      <DeleteMemberButton id={member.id} />
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-16 text-center text-slate-500">No members have joined yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 max-w-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Registration Form Fields</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div>
                <p className="font-bold text-white">Require Year of Study</p>
                <p className="text-sm text-slate-400">Ask members for their current year of study.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.requireYear}
                  onChange={() => handleToggle("requireYear")}
                  disabled={isPending}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#456be5]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div>
                <p className="font-bold text-white">Require Native Place / Location</p>
                <p className="text-sm text-slate-400">Ask members where they are from.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.requireLocation}
                  onChange={() => handleToggle("requireLocation")}
                  disabled={isPending}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#456be5]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
              <div>
                <p className="font-bold text-white">Require Profile Photo</p>
                <p className="text-sm text-slate-400">Ask members to upload a photo for their membership card.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.requirePhoto}
                  onChange={() => handleToggle("requirePhoto")}
                  disabled={isPending}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#456be5]"></div>
              </label>
            </div>
            
            <hr className="border-white/10 my-4" />
            
            <div className="p-4 rounded-xl border border-white/5 bg-white/5">
              <div className="mb-3">
                <p className="font-bold text-white">KSU WhatsApp Group Link</p>
                <p className="text-sm text-slate-400">Members will be prompted to join this group after registering. Leave empty to hide the button.</p>
              </div>
              <div className="flex gap-3">
                <input
                  type="url"
                  placeholder="https://chat.whatsapp.com/..."
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  className="flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
                />
                <button
                  onClick={handleSaveLink}
                  disabled={isPending || whatsappLink === settings.whatsappLink}
                  className="px-6 py-2.5 bg-[#456be5] hover:bg-[#5b7df0] disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-lg transition-colors"
                >
                  {linkSaved ? "Saved!" : "Save Link"}
                </button>
              </div>
            </div>

            <hr className="border-white/10 my-4" />

            <div className="p-4 rounded-xl border border-white/5 bg-white/5 space-y-4">
              <div className="mb-3">
                <p className="font-bold text-white">Digital Membership Card Customization</p>
                <p className="text-sm text-slate-400">Change how the digital card looks when members register.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Card Theme Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={cardColor}
                      onChange={(e) => setCardColor(e.target.value)}
                      className="h-10 w-20 rounded border-0 bg-transparent p-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={cardColor}
                      onChange={(e) => setCardColor(e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Official Signature / Footer Text</label>
                  <input
                    type="text"
                    value={cardSignature}
                    onChange={(e) => setCardSignature(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#456be5]"
                    placeholder="E.g. KSU UCE Unit President"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSaveCardSettings}
                    disabled={isPending || (cardColor === settings.cardColor && cardSignature === settings.cardSignature)}
                    className="px-6 py-2.5 bg-[#456be5] hover:bg-[#5b7df0] disabled:bg-slate-700 disabled:text-slate-400 text-white font-bold rounded-lg transition-colors"
                  >
                    {cardSaved ? "Saved!" : "Save Card Design"}
                  </button>
                </div>
              </div>
            </div>

            {isPending && <p className="text-sm text-[#456be5] flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Saving settings...</p>}
          </div>
        </div>
      )}
    </div>
  );
}
