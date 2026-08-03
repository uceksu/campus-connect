import { getAdminLogs } from "@/lib/actions/adminLog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { Activity, Shield, User, FileText, Trash2, Edit } from "lucide-react";

export default async function ActivityLogsPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const logs = await getAdminLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Activity Logs</h1>
          <p className="mt-2 text-sm text-slate-400">
            Audit feed of all actions performed by admins and sub-admins.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f172a] shadow-xl overflow-hidden">
        {logs.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="mx-auto size-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-300">No recent activity</h3>
            <p className="text-slate-500 mt-2">Admin actions will appear here once they occur.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {logs.map((log) => {
              // Determine icon and color based on action type
              let Icon = Activity;
              let iconColor = "text-blue-400 bg-blue-500/10";
              
              if (log.action.includes("CREATE")) {
                Icon = FileText;
                iconColor = "text-emerald-400 bg-emerald-500/10";
              } else if (log.action.includes("UPDATE")) {
                Icon = Edit;
                iconColor = "text-amber-400 bg-amber-500/10";
              } else if (log.action.includes("DELETE")) {
                Icon = Trash2;
                iconColor = "text-rose-400 bg-rose-500/10";
              }

              return (
                <div key={log.id} className="p-4 sm:p-6 hover:bg-white/[0.02] transition-colors flex gap-4">
                  <div className={`mt-1 flex-shrink-0 size-10 rounded-full flex items-center justify-center ${iconColor}`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white break-words">
                      <span className="font-bold text-slate-200">{log.adminName}</span>{" "}
                      {log.action.toLowerCase().replace(/_/g, " ")}{" "}
                      <span className="font-semibold text-white">{log.target}</span>
                    </p>
                    {log.details && (
                      <p className="text-sm text-slate-400 mt-1 truncate">{log.details}</p>
                    )}
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Shield className="size-3" /> {log.adminId.slice(-6)}
                      </span>
                      <span>{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
