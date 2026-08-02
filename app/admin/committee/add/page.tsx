import CommitteeForm from "@/components/CommitteeForm";

export default function AddCommitteePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Committee Member</h1>
        <p className="text-slate-400 text-sm mt-1">Add a new leader to the organization</p>
      </div>
      <CommitteeForm submitLabel="Add Member" />
    </div>
  );
}
