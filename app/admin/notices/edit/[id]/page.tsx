import { notFound } from "next/navigation";
import { getNoticeById } from "@/lib/actions/notice";
import NoticeForm from "@/components/NoticeForm";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const notice = await getNoticeById(id);
  if (!notice) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Notice</h1>
        <p className="text-slate-400 text-sm mt-1">{notice.title}</p>
      </div>
      <NoticeForm submitLabel="Save Changes" noticeId={notice.id} initialData={notice} />
    </div>
  );
}
