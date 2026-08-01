type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
};

export default function PublicPageHero({
  eyebrow,
  title,
  accent,
  description,
}: PublicPageHeroProps) {
  return (
    <section className="rounded-b-[2.5rem] bg-white px-6 pb-14 pt-16 sm:px-10 lg:px-16 lg:pb-20 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-[#071333] sm:text-7xl">
          {title}
          <span className="mt-3 block normal-case tracking-[-0.04em] text-[#456be5]">
            {accent}
          </span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
