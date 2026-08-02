import { getAcademicSubjectById } from "@/lib/actions/academicSubject";
import SubjectForm from "@/components/SubjectForm";
import { notFound } from "next/navigation";

export default async function EditSubjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const subject = await getAcademicSubjectById(resolvedParams.id);

  if (!subject) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Edit Academic Subject</h1>
        <p className="text-slate-400 text-sm mt-1">Update subject details</p>
      </div>
      <SubjectForm
        submitLabel="Update Subject"
        subjectId={subject.id}
        initialData={subject}
      />
    </div>
  );
}
