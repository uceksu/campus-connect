"use client";

import { useState, useEffect } from "react";
import type { AcademicNote, AcademicSubject } from "@/src/generated/prisma/client";
import { BookOpen, ExternalLink, FileText, Download, Folder } from "lucide-react";

const BRANCHES = ["ECE", "AD", "CS", "CY", "Polymer", "EEE"];
const SEMESTERS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
const BRANCH_FULL_NAMES: Record<string, string> = {
  ECE: "Electronics & Communication Engineering",
  AD: "Artificial Intelligence & Data Science",
  CS: "Computer Science & Engineering",
  CY: "Cyber Security",
  Polymer: "Polymer Technology",
  EEE: "Electrical & Electronics Engineering",
};

const BRANCH_THEMES: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  ECE: { bg: "bg-blue-50/50", border: "border-blue-200", text: "text-blue-700", gradient: "from-blue-500 to-indigo-600" },
  AD: { bg: "bg-purple-50/50", border: "border-purple-200", text: "text-purple-700", gradient: "from-purple-500 to-indigo-600" },
  CS: { bg: "bg-green-50/50", border: "border-green-200", text: "text-green-700", gradient: "from-green-500 to-emerald-600" },
  CY: { bg: "bg-orange-50/50", border: "border-orange-200", text: "text-orange-700", gradient: "from-orange-500 to-red-600" },
  Polymer: { bg: "bg-pink-50/50", border: "border-pink-200", text: "text-pink-700", gradient: "from-pink-500 to-rose-600" },
  EEE: { bg: "bg-yellow-50/50", border: "border-yellow-200", text: "text-yellow-700", gradient: "from-yellow-500 to-amber-600" },
};

type Props = { notes: AcademicNote[]; subjects: AcademicSubject[] };

export function NotesList({ notes, subjects }: Props) {
  const [activeScheme, setActiveScheme] = useState("2019");
  const [activeBranch, setActiveBranch] = useState("ECE");
  const [activeSemester, setActiveSemester] = useState("1st");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // Available subjects for the active branch and semester
  const availableSubjects = subjects.filter(
    (s) => s.branch === activeBranch && s.semester === activeSemester && s.scheme === activeScheme
  );

  // Automatically select the first subject when branch or semester changes, or clear it if none
  useEffect(() => {
    if (availableSubjects.length > 0) {
      if (!activeSubject || !availableSubjects.some((s) => s.name === activeSubject)) {
        setActiveSubject(availableSubjects[0].name);
      }
    } else {
      setActiveSubject(null);
    }
  }, [activeBranch, activeSemester, availableSubjects, activeSubject]);

  // Filter notes by active scheme, branch, semester, and subject
  const semesterNotes = notes.filter((n) => n.scheme === activeScheme && n.branch === activeBranch && n.semester === activeSemester);
  const filteredNotes = activeSubject ? semesterNotes.filter((n) => n.subject === activeSubject) : [];

  // Split into Notes and Question Papers
  const studyNotes = filteredNotes.filter((n) => n.type === "Note");
  const questionPapers = filteredNotes.filter((n) => n.type === "Question Paper");

  const currentModules = activeScheme === "2019"
    ? ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"]
    : ["Module 1", "Module 2", "Module 3", "Module 4"];

  const theme = BRANCH_THEMES[activeBranch] || BRANCH_THEMES.ECE;

  return (
    <div className="space-y-8">
      {/* 2 Schemes Tabs */}
      <div className="flex gap-4 justify-center py-2">
        {["2024", "2019"].map((scheme) => {
          const isActive = activeScheme === scheme;
          return (
            <button
              key={scheme}
              onClick={() => setActiveScheme(scheme)}
              className={`px-8 py-3 rounded-full text-base font-black uppercase tracking-wider transition-all duration-300 touch-manipulation cursor-pointer ${
                isActive
                  ? "bg-white text-[#456be5] shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              {scheme} Scheme
            </button>
          );
        })}
      </div>

      {/* 6 Branches Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {BRANCHES.map((branch) => {
          const isActive = activeBranch === branch;
          const bTheme = BRANCH_THEMES[branch];
          return (
            <button
              key={branch}
              onClick={() => setActiveBranch(branch)}
              title={BRANCH_FULL_NAMES[branch]}
              className={`p-4 rounded-2xl border text-center transition-all duration-300 group flex flex-col items-center justify-center gap-1 touch-manipulation cursor-pointer ${
                isActive
                  ? "bg-white border-white shadow-xl md:scale-[1.02]"
                  : "bg-white/10 border-white/25 text-white hover:bg-white/20"
              }`}
            >
              <span className={`text-lg font-black tracking-wider ${isActive ? bTheme.text : "text-white"}`}>
                {branch}
              </span>
              <span className={`text-[10px] font-semibold leading-tight line-clamp-1 opacity-70 ${isActive ? "text-slate-500" : "text-white/80"}`}>
                {BRANCH_FULL_NAMES[branch]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 8 Semesters Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center py-2">
        {SEMESTERS.map((sem) => {
          const isActive = activeSemester === sem;
          return (
            <button
              key={sem}
              onClick={() => setActiveSemester(sem)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-200 touch-manipulation cursor-pointer ${
                isActive
                  ? "bg-white border-white text-[#456be5] shadow-lg"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              Semester {sem[0]}
            </button>
          );
        })}
      </div>

      {/* Selected Header Card */}
      <div className="rounded-3xl border border-white/30 bg-white p-8 shadow-xl">
        <span className={`text-xs font-mono font-bold uppercase tracking-widest ${theme.text}`}>
          {activeSemester} Semester
        </span>
        <h2 className="mt-1 text-3xl font-black uppercase tracking-[-0.04em] text-[#071333]">
          {BRANCH_FULL_NAMES[activeBranch]}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl">
          Browse study materials grouped by module and download previous years' question papers for Semester {activeSemester[0]} {activeBranch}.
        </p>

        {/* Subjects Tabs */}
        {availableSubjects.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-2">
            {availableSubjects.map((sub) => {
              const isActive = activeSubject === sub.name;
              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubject(sub.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                    isActive
                      ? `${theme.bg} ${theme.border} ${theme.text}`
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {sub.name}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 text-sm font-medium text-slate-500 italic">
            No subjects added for this semester yet.
          </div>
        )}
      </div>

      {/* Two-Column Grid: Notes vs Question Papers */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Column 1: Study Notes (Subdivided by Modules 1 to 4) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shrink-0`}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Study Notes</h3>
              <p className="text-xs text-white/80">
                Grouped into {activeScheme === "2019" ? "Modules 1 to 5" : "Modules 1 to 4"}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {currentModules.map((moduleName) => {
              const moduleNotes = studyNotes.filter((n) => n.module === moduleName);

              return (
                <div key={moduleName} className="space-y-4">
                  {/* Module Title Header */}
                  <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                    <Folder size={16} className="text-white/85" />
                    <h4 className="font-bold text-lg text-white">{moduleName}</h4>
                  </div>

                  {moduleNotes.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/50 italic">
                      No notes uploaded in {moduleName} yet.
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {moduleNotes.map((note) => (
                        <article key={note.id} className="rounded-3xl border border-white/30 bg-white shadow-lg p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                          <div>
                            <h5 className="font-black text-[#071333] leading-snug">{note.title}</h5>
                            <p className="text-sm text-slate-500 mt-0.5">{note.subject}</p>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">{note.description}</p>
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                            <span className="text-xs text-slate-400">by {note.uploadedBy}</span>
                            <a href={note.fileUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 rounded-xl bg-[#456be5] px-4 py-2 text-xs font-bold text-white hover:bg-[#3659c8] transition-colors">
                              Open Notes <ExternalLink size={12} />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Question Papers */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Question Papers</h3>
              <p className="text-xs text-white/80">Previous semester exams and model papers</p>
            </div>
          </div>

          <div className="space-y-4">
            {questionPapers.length === 0 ? (
              <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm p-8 text-center text-white/80">
                No question papers uploaded for Semester {activeSemester[0]} yet.
              </div>
            ) : (
              questionPapers.map((paper) => (
                <article key={paper.id} className="rounded-3xl border border-white/30 bg-white shadow-lg p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                  <div>
                    <h4 className="font-black text-[#071333] leading-snug">{paper.title}</h4>
                    <p className="text-sm text-slate-500 mt-0.5">{paper.subject}</p>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{paper.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-auto">
                    <span className="text-xs text-slate-400">by {paper.uploadedBy}</span>
                    <a href={paper.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600 transition-colors">
                      Download PDF <Download size={12} />
                    </a>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
