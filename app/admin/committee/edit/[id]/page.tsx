import { getCommitteeMemberById } from "@/lib/actions/committee";
import CommitteeForm from "@/components/CommitteeForm";
import { notFound } from "next/navigation";

export default async function EditCommitteePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const member = await getCommitteeMemberById(resolvedParams.id);

  if (!member) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Committee Member</h1>
        <p className="text-slate-400 text-sm mt-1">Update leader details</p>
      </div>
      <CommitteeForm
        submitLabel="Update Member"
        memberId={member.id}
        initialData={member}
      />
    </div>
  );
}
