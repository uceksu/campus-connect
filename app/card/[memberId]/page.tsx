import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getJoinFormSettings } from "@/lib/actions/member";
import { Shield, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KSU Digital Membership Card",
  description: "View your official KSU Digital Membership Card.",
};

export default async function MemberCardPage({ params }: { params: { memberId: string } }) {
  const member = await prisma.ksuMember.findUnique({
    where: { memberId: params.memberId },
  });

  if (!member) {
    notFound();
  }

  const settings = await getJoinFormSettings();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tight text-[#071333] dark:text-white">
          KSU Member
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Official Digital Membership Card
        </p>
      </div>

      <div 
        className="relative w-full max-w-sm overflow-hidden rounded-2xl p-6 text-white shadow-2xl border border-white/10"
        style={{ 
          aspectRatio: "85.6/54", 
          backgroundColor: settings.cardColor || "#071333",
          backgroundImage: `linear-gradient(to bottom right, ${settings.cardColor || '#071333'}, rgba(0,0,0,0.4))`
        }}
      >
        {/* Background elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-white blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 rounded-full bg-[#9db9ff] blur-3xl opacity-10" />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Shield className="text-[#456be5]" size={24} />
            <div className="leading-none">
              <span className="block font-black uppercase text-lg tracking-tight">Campus Connect</span>
              <span className="block font-mono text-[9px] font-bold text-slate-400 tracking-widest mt-0.5">KSU UCE</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Member ID</span>
            <span className="font-mono font-bold text-[#9db9ff] tracking-wider">{member.memberId}</span>
          </div>
        </div>

        {/* Body */}
        <div className="relative flex gap-6">
          {/* Photo Area */}
          {member.photoUrl && (
            <div className="shrink-0">
              <div className="h-24 w-20 overflow-hidden rounded-lg border-2 border-white/20 bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.photoUrl} alt="Member" className="h-full w-full object-cover" crossOrigin="anonymous" />
              </div>
            </div>
          )}
          
          {/* Details Area */}
          <div className="space-y-4 flex-1">
            <div>
              <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Name</span>
              <span className="block font-bold text-xl uppercase tracking-tight leading-tight">{member.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Department</span>
                <span className="block font-semibold text-sm leading-tight">{member.department}</span>
              </div>
              {member.year && (
                <div>
                  <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Year</span>
                  <span className="block font-semibold text-sm leading-tight">{member.year}</span>
                </div>
              )}
            </div>
            {member.location && (
              <div>
                <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1">Native Place</span>
                <span className="block font-semibold text-sm leading-tight">{member.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 p-4">
          <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">
            {settings.cardSignature || "Official KSU Member"}
          </span>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-500 max-w-sm">
        <p>Take a screenshot of this page to save your digital membership card.</p>
        
        {settings.whatsappLink && (
          <a 
            href={settings.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white transition-colors hover:bg-[#1ebd5a]"
          >
            <MessageCircle size={18} />
            Join WhatsApp Group
          </a>
        )}
      </div>

    </div>
  );
}
