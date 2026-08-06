import { getKsuMembers, getJoinFormSettings } from "@/lib/actions/member";
import ExportCSVButton from "@/components/ExportCSVButton";
import MembersTabs from "./MembersTabs";

export default async function AdminMembersPage() {
  const members = await getKsuMembers();
  const settings = await getJoinFormSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">KSU Members</h1>
          <p className="text-slate-400 text-sm mt-1">{members.length} registered members</p>
        </div>
        <ExportCSVButton data={members} filename="ksu-members" />
      </div>

      <MembersTabs members={members} initialSettings={settings} />
    </div>
  );
}
