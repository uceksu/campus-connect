import NoticeForm from "@/components/NoticeForm";

export default function AddNoticePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Add Notice</h1>
        <p className="text-slate-400 text-sm mt-1">Publish a new notice to the campus notice board</p>
      </div>
      <NoticeForm submitLabel="Publish Notice" />
    </div>
  );
}
