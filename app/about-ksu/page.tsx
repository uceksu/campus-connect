import Image from "next/image";
import { getCommitteeMembers } from "@/lib/actions/committee";
import { MessageCircle } from "lucide-react"; // MessageCircle for WhatsApp

export const metadata = {
  title: "About KSU UCE | KSU Initiative Campus Connect",
  description: "Learn about the Kerala Students Union at UCE and meet our committee leaders.",
};

export default async function AboutKSUPage() {
  const members = await getCommitteeMembers();

  const ksuMembers = members.filter((m) => m.organization === "KSU");
  const priyadarshiniMembers = members.filter((m) => m.organization === "Priyadarshini");

  // A helper component to render the member cards
  const MemberCard = ({ member }: { member: any }) => (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-64 w-full bg-slate-100 shrink-0">
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
        <div className="mt-6 flex items-center gap-3">
          <a
            href={`https://wa.me/${member.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1ebd57]"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-2.5 text-white transition-transform hover:scale-105"
            title="Follow on Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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

  return (
    <main className="min-h-screen bg-[#f8faff] text-[#071333] pt-16 lg:pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-6 sm:px-10 lg:px-16 mb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-[#456be5] mb-4">
            Our Organization
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-[#071333]">
            What is <span className="text-[#456be5]">KSU</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-slate-600 leading-relaxed">
            The Kerala Students Union (KSU) is a vibrant and dynamic student organization committed to safeguarding student rights, promoting welfare, and fostering leadership. At University College of Engineering, KSU stands as the primary voice of the student body, constantly striving to improve campus infrastructure, academic quality, and social harmony.
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Alongside KSU, the Priyadarshini Arts & Sports Club nurtures the creative and athletic talents of our students, ensuring a holistic campus experience. Together, we are dedicated to making UCE a better place to learn, grow, and succeed.
          </p>
        </div>
      </section>

      {/* Committee Members Grid */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8">
            
            {/* KSU Column */}
            <div className="space-y-8 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-blue-100 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#456be5]">
                  KSU Leaders
                </h2>
                <div className="h-1 w-20 bg-[#456be5] mx-auto mt-4 rounded-full" />
              </div>
              
              {ksuMembers.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No KSU leaders found.</div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {ksuMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>

            {/* Priyadarshini Column */}
            <div className="space-y-8 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-orange-100 shadow-sm">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#f97316]">
                  Priyadarshini
                </h2>
                <div className="h-1 w-20 bg-[#f97316] mx-auto mt-4 rounded-full" />
              </div>

              {priyadarshiniMembers.length === 0 ? (
                <div className="text-center py-10 text-slate-500">No Priyadarshini leaders found.</div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2">
                  {priyadarshiniMembers.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
