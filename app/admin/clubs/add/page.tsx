import ClubForm from "@/components/ClubForm";

export default function AddClubPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Club</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new student club to Campus Connect</p>
      </div>
      <ClubForm submitLabel="Add Club" />
    </div>
  );
}
