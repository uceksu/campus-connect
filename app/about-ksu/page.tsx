import { getCommitteeMembers } from "@/lib/actions/committee";
import CommitteeTabs from "@/components/CommitteeTabs";

export const metadata = {
  title: "About KSU UCE | KSU Initiative Campus Connect",
  description: "Learn about the Kerala Students Union at UCE and meet our committee leaders.",
};

export default async function AboutKSUPage() {
  const members = await getCommitteeMembers();

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

      {/* Committee Members Tabs */}
      <section className="px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <CommitteeTabs members={members} />
        </div>
      </section>
    </main>
  );
}
