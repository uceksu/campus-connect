"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import type { CommitteeMember } from "@/src/generated/prisma/client";

// A helper component to render the member cards
const MemberCard = ({ member }: { member: CommitteeMember }) => (
  <div className="flex flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl max-w-[280px] w-full mx-auto">
    <div className="relative h-56 w-full bg-slate-100 shrink-0">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top"
      />
    </div>
    <div className="flex flex-1 flex-col justify-between p-6">
      <div>
        <span className="inline-block rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#456be5]">
          {member.role}
        </span>
        <h3 className="mt-3 text-xl font-black uppercase tracking-[-0.02em] text-[#071333]">
          {member.name}
        </h3>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <a
          href={`https://wa.me/${member.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 rounded-full text-[#456be5] hover:bg-blue-50 transition-colors"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={22} />
        </a>
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 rounded-full text-[#456be5] hover:bg-blue-50 transition-colors"
          title="Follow on Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
      </div>
    </div>
  </div>
);

export default function CommitteeTabs({ members }: { members: CommitteeMember[] }) {
  const [activeTab, setActiveTab] = useState<"KSU" | "Priyadarshini">("KSU");

  const ksuMembers = members.filter((m) => m.organization === "KSU");
  const priyadarshiniMembers = members.filter((m) => m.organization === "Priyadarshini");

  const currentMembers = activeTab === "KSU" ? ksuMembers : priyadarshiniMembers;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center rounded-full bg-white border border-[#dce5ff] p-1.5 shadow-sm">
          <button
            onClick={() => setActiveTab("KSU")}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation cursor-pointer ${
              activeTab === "KSU"
                ? "bg-[#456be5] text-white shadow-md md:scale-[1.02]"
                : "text-slate-500 hover:text-[#456be5]"
            }`}
          >
            KSU Leaders
          </button>
          <button
            onClick={() => setActiveTab("Priyadarshini")}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 touch-manipulation cursor-pointer ${
              activeTab === "Priyadarshini"
                ? "bg-[#f97316] text-white shadow-md md:scale-[1.02]"
                : "text-slate-500 hover:text-[#f97316]"
            }`}
          >
            Priyadarshini
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className={`space-y-8 bg-white p-6 sm:p-10 rounded-[2.5rem] border shadow-sm transition-colors duration-300 ${
        activeTab === "KSU" ? "border-blue-100" : "border-orange-100"
      }`}>
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-black uppercase tracking-tight ${
            activeTab === "KSU" ? "text-[#456be5]" : "text-[#f97316]"
          }`}>
            {activeTab === "KSU" ? "KSU Leaders" : "Priyadarshini"}
          </h2>
          <div className={`h-1 w-20 mx-auto mt-4 rounded-full ${
            activeTab === "KSU" ? "bg-[#456be5]" : "bg-[#f97316]"
          }`} />
        </div>
        
        {currentMembers.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            No {activeTab} leaders found.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
