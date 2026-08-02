"use client";

import { useState } from "react";
import PublicPageHero from "@/components/PublicPageHero";
import { Calendar, Clock, AlertCircle, Info, ChevronRight } from "lucide-react";

type EventCategory = "All" | "Academic" | "Exam" | "Holiday" | "Event";
type EventMonth = "All" | "July" | "August" | "September" | "October" | "November" | "December";

const CALENDAR_EVENTS = [
  // JULY 2026
  {
    title: "Commencement of S3/S5/S7 Classes",
    date: "July 01, 2026",
    month: "July",
    category: "Academic",
    status: "Milestone",
    description: "Official start of class instruction and academic sessions for all 3rd, 5th, and 7th semester B.Tech courses.",
  },
  {
    title: "Semester Enrollment Begins for S3/S5/S7",
    date: "July 08, 2026",
    month: "July",
    category: "Academic",
    status: "Administrative",
    description: "Students must initiate enrollment on the KTU portal and complete branch course registration.",
  },
  {
    title: "Semester Enrollment Ends for S3/S5/S7",
    date: "July 15, 2026",
    month: "July",
    category: "Academic",
    status: "Administrative",
    description: "Last date to complete portal enrollment without fine.",
  },
  {
    title: "Course Selection and Mapping Begins for S3/S5/S7",
    date: "July 18, 2026",
    month: "July",
    category: "Academic",
    status: "Administrative",
    description: "Faculty mapping and student course mapping opens on the KTU portal.",
  },

  // AUGUST 2026
  {
    title: "Course Selection and Mapping Ends for S3/S5/S7",
    date: "August 03, 2026",
    month: "August",
    category: "Academic",
    status: "Administrative",
    description: "Final deadline to map courses and assign faculties on the university database.",
  },
  {
    title: "Exam Registration Begins for S3/S5/S7",
    date: "August 05, 2026",
    month: "August",
    category: "Exam",
    status: "Registration",
    description: "Odd semester examination registration opens on KTU student login portals.",
  },
  {
    title: "Commencement of S1 Classes",
    date: "August 10, 2026",
    month: "August",
    category: "Academic",
    status: "Milestone",
    description: "Official commencement of academic sessions and lectures for 1st-semester (freshman) B.Tech batch.",
  },
  {
    title: "Commencement of Orientation Programme (O1) for First-Year Students",
    date: "August 11, 2026",
    month: "August",
    category: "Academic",
    status: "Milestone",
    description: "Inauguration of the induction and orientation program (Phase O1) to welcome freshers.",
  },
  {
    title: "Karkidaka Vavu",
    date: "August 12, 2026",
    month: "August",
    category: "Holiday",
    status: "Rest Day",
    description: "Public Holiday observing Karkidaka Vavu.",
  },
  {
    title: "Exam Registration Ends for S3/S5/S7",
    date: "August 13, 2026",
    month: "August",
    category: "Exam",
    status: "Registration Deadline",
    description: "Last date to complete examination fee payment and final registration submissions.",
  },
  {
    title: "Orientation Programme Days O2, O3, O4, O5",
    date: "August 13 - August 18, 2026",
    month: "August",
    category: "Academic",
    status: "Ongoing",
    description: "Interactive orientation sessions, bridge courses, and campus tours for S1 students.",
  },
  {
    title: "Independence Day",
    date: "August 15, 2026",
    month: "August",
    category: "Holiday",
    status: "National Holiday",
    description: "National Independence Day Celebrations.",
  },
  {
    title: "First Series Test Completion (S3/S5/S7, O6)",
    date: "August 19, 2026",
    month: "August",
    category: "Exam",
    status: "Assessment",
    description: "First internal assessment test timeline and orientation O6 feedback.",
  },
  {
    title: "Conclusion of Orientation Programme (O7) for First-Year Students",
    date: "August 20, 2026",
    month: "August",
    category: "Academic",
    status: "Milestone",
    description: "Valedictory session of S1 induction training, completing the 7-day orientation program.",
  },
  {
    title: "Onam Celebration (College Level)",
    date: "August 21, 2026",
    month: "August",
    category: "Event",
    status: "Celebration",
    description: "Traditional campus Onam festival celebrations, cultural programs, and student activities.",
  },
  {
    title: "Uthradam / Nabi Dinam",
    date: "August 25, 2026",
    month: "August",
    category: "Holiday",
    status: "Rest Day",
    description: "Public Holiday in commemoration of Nabi Dinam and Onam eve.",
  },
  {
    title: "Thiruvonam",
    date: "August 26, 2026",
    month: "August",
    category: "Holiday",
    status: "Rest Day",
    description: "Onam Festival - Public Holiday.",
  },
  {
    title: "Third Onam",
    date: "August 27, 2026",
    month: "August",
    category: "Holiday",
    status: "Rest Day",
    description: "Onam Holidays continue.",
  },
  {
    title: "Sree Narayana Guru Jayanthi",
    date: "August 28, 2026",
    month: "August",
    category: "Holiday",
    status: "Rest Day",
    description: "Public Holiday in commemoration of Sree Narayana Guru Jayanthi.",
  },

  // SEPTEMBER 2026
  {
    title: "Sreekrishna Jayanthi",
    date: "September 04, 2026",
    month: "September",
    category: "Holiday",
    status: "Rest Day",
    description: "Public Holiday.",
  },
  {
    title: "Sreenarayana Guru Samadhi",
    date: "September 21, 2026",
    month: "September",
    category: "Holiday",
    status: "Rest Day",
    description: "Public Holiday in commemoration of Sree Narayana Guru Samadhi.",
  },

  // OCTOBER 2026
  {
    title: "Gandhi Jayanthi",
    date: "October 02, 2026",
    month: "October",
    category: "Holiday",
    status: "National Holiday",
    description: "National Holiday observing Mahatma Gandhi birth anniversary.",
  },
  {
    title: "Annual Sports Meet (College Level)",
    date: "October 09, 2026",
    month: "October",
    category: "Event",
    status: "Sports",
    description: "Inter-departmental athletics meets and sports tournaments at college grounds.",
  },
  {
    title: "Second Series Test Completion (S3/S5/S7)",
    date: "October 16, 2026",
    month: "October",
    category: "Exam",
    status: "Assessment",
    description: "Deadline to complete second set of internal assessment tests for core subjects.",
  },
  {
    title: "Mahanavami",
    date: "October 20, 2026",
    month: "October",
    category: "Holiday",
    status: "Rest Day",
    description: "Pooja Holidays - Public Holiday.",
  },
  {
    title: "Vijayadasami",
    date: "October 21, 2026",
    month: "October",
    category: "Holiday",
    status: "Rest Day",
    description: "Pooja Holidays - Public Holiday.",
  },
  {
    title: "KTU Survey - Syllabus Coverage",
    date: "October 22, 2026",
    month: "October",
    category: "Academic",
    status: "Feedback",
    description: "Online submission of student syllabus coverage survey on KTU portal.",
  },
  {
    title: "Class Ends: Publish Attendance & Internal Marks",
    date: "October 29, 2026",
    month: "October",
    category: "Academic",
    status: "Semester End",
    description: "Odd semester instructional period ends. Faculty publish final attendance percentages and Internal Assessment (IA) marks.",
  },

  // NOVEMBER 2026
  {
    title: "Last Date for Entering Attendance & IA on KTU Portal",
    date: "November 02, 2026",
    month: "November",
    category: "Academic",
    status: "Administrative",
    description: "Final deadline for college administration to upload attendance and internals into university servers.",
  },
  {
    title: "Deepavali",
    date: "November 08, 2026",
    month: "November",
    category: "Holiday",
    status: "Festival Holiday",
    description: "Public Holiday observing Diwali/Deepavali.",
  },

  // DECEMBER 2026
  {
    title: "Winter Break & Exam Preparations",
    date: "December 2026",
    month: "December",
    category: "Holiday",
    status: "Ongoing",
    description: "University study leave, odd semester examinations preparation, and winter holidays.",
  }
];

const MONTHS: EventMonth[] = ["All", "July", "August", "September", "October", "November", "December"];
const CATEGORIES: EventCategory[] = ["All", "Academic", "Exam", "Holiday", "Event"];

export default function AcademicCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState<EventMonth>("All");
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>("All");

  const filteredEvents = CALENDAR_EVENTS.filter((event) => {
    const matchesMonth = selectedMonth === "All" || event.month === selectedMonth;
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    return matchesMonth && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#456be5] dark:bg-[#060b18] bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[18px_18px] transition-colors duration-300">
      <PublicPageHero
        eyebrow="KTU B.Tech S3/S5/S7"
        title="Academic"
        accent="calendar."
        description="Stay on track with key semester dates, internal exams, surveys, and holidays from July 2026 to December 2026."
      />

      <section className="mx-auto max-w-4xl px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        {/* Notice/Disclaimer Box */}
        <div className="mb-10 rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-md p-6 text-white dark:text-slate-200 flex gap-4 items-start">
          <Info className="size-6 shrink-0 text-white dark:text-slate-300 mt-0.5" />
          <div>
            <h3 className="font-bold text-lg mb-1">KTU Official Calendar</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Official academic schedule for B.Tech S3/S5/S7 at University College of Engineering Thodupuzha. Any university updates, postponements, or emergency notifications will be highlighted in the <a href="/notices" className="underline font-bold hover:text-slate-200">Notices</a> section.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-10 space-y-6 bg-white/5 border border-white/10 dark:border-white/5 p-6 rounded-3xl backdrop-blur-sm">
          {/* Month Filter */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/70 dark:text-slate-400 mb-3">
              Filter by Month
            </label>
            <div className="flex flex-wrap gap-2">
              {MONTHS.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all touch-manipulation cursor-pointer ${
                    selectedMonth === month
                      ? "bg-white text-[#456be5] dark:bg-white dark:text-slate-900 shadow-md md:scale-[1.02]"
                      : "bg-white/10 text-white hover:bg-white/20 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-white/70 dark:text-slate-400 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all touch-manipulation cursor-pointer ${
                    selectedCategory === category
                      ? "bg-white text-[#456be5] dark:bg-white dark:text-slate-900 shadow-md md:scale-[1.02]"
                      : "bg-white/10 text-white hover:bg-white/20 dark:text-slate-300 dark:hover:bg-white/10"
                  }`}
                >
                  {category === "All" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              className="relative pl-8 sm:pl-10 before:absolute before:left-3.5 before:top-4 before:bottom-[-2.5rem] before:w-[2px] before:bg-white/30 dark:before:bg-slate-800 last:before:hidden"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 size-7 rounded-full bg-white/20 dark:bg-slate-900 border border-white dark:border-slate-800 flex items-center justify-center text-white shrink-0">
                <div className="size-2 rounded-full bg-white dark:bg-slate-300" />
              </div>

              {/* Card content */}
              <article className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f172a]/65 shadow-md dark:shadow-none p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-white/5 backdrop-blur-md">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        event.category === "Exam"
                          ? "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50"
                          : event.category === "Holiday"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
                          : event.category === "Event"
                          ? "bg-purple-50 text-purple-600 border border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/50"
                          : "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50"
                      }`}>
                        {event.category}
                      </span>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800">
                        {event.month}
                      </span>
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-[-0.04em] text-[#071333] dark:text-white leading-snug">
                      {event.title}
                    </h2>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-[#456be5] dark:text-blue-400">
                      <Calendar size={14} /> {event.date}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                      Status: {event.status}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </article>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-slate-900/30 backdrop-blur-md p-10 text-center text-white dark:text-slate-400">
              No calendar events found matching the selected filters.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
