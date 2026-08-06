import { getJoinFormSettings } from "@/lib/actions/member";
import JoinForm from "./JoinForm";

export default async function JoinPage() {
  const settings = await getJoinFormSettings();

  return (
    <main className="min-h-screen bg-[#f8faff] dark:bg-[#060b18] text-[#071333] dark:text-slate-100 transition-colors duration-300">
      <section className="relative overflow-hidden bg-[#071333] px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(68,104,231,0.3),_transparent_40%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#a9c1ff]">
            Be part of the community
          </p>
          <h1 className="text-4xl font-black uppercase leading-tight tracking-[-0.04em] text-white sm:text-6xl">
            Join <span className="text-[#9db9ff]">KSU</span> UCE
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-slate-300">
            Register below to get your digital membership card and instantly join the official KSU WhatsApp group.
          </p>
        </div>
      </section>
      
      <section className="px-6 py-12 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <JoinForm settings={settings} />
        </div>
      </section>
    </main>
  );
}
