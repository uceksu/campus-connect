type QuickCardProps = {
  emoji: string;
  title: string;
};

export default function QuickCard({
  emoji,
  title,
}: QuickCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="text-4xl">{emoji}</div>

      <h2 className="mt-3 text-lg font-bold text-slate-800">
        {title}
      </h2>
    </div>
  );
}