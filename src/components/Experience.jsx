import { RiBuildingLine, RiCalendarLine } from "@remixicon/react";

const experienceData = [
  {
    company: "Software Technology Parks of India, Jaipur",
    role: "Frontend Web Developer",
    duration: "June - July 2025",
    tasks: [
      "Contributed to frontend development of dashboards and user interfaces.",
      "Enhanced application usability through UI/UX improvements and feature updates.",
      "Collaborated on code refactoring and component optimization.",
    ],
    skills: ["React.js", "Tailwind CSS", "JavaScript", "UI/UX"]
  },
];

const Experience = () => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-4 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Experience
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Structural Career Matrix Container */}
      <div className="flex flex-col border border-gray-200 dark:border-[#1F1F1F] rounded-md overflow-hidden bg-white dark:bg-[#0A0A0A]">
        {/* Header Strip with System Metadata */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
              Career History
            </h2>
          </div>
          <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
            {experienceData.length} Position Recorded
          </span>
        </div>

        {/* Divided by clean 1px structural lines */}
        <div className="flex flex-col divide-y divide-gray-200 dark:divide-[#1F1F1F]">
          {experienceData.map((job, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 flex flex-col gap-5 bg-white dark:bg-[#0A0A0A] hover:bg-gray-50/60 dark:hover:bg-[#111111] transition-colors duration-200"
            >
              {/* Job Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {job.company}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 mt-0.5">
                      {job.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-gray-200 dark:border-[#222222] bg-gray-50/90 dark:bg-[#141414] font-tech text-xs text-gray-600 dark:text-gray-400 self-start sm:self-center">
                  <RiCalendarLine size={13} className="opacity-70" />
                  <span>{job.duration}</span>
                </div>
              </div>

              {/* Responsibilities list with technical cross ticks */}
              <div className="flex flex-col gap-2 pt-1 border-t border-gray-100 dark:border-[#1A1A1A]">
                <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                  Key Responsibilities & Impact
                </span>
                <ul className="space-y-2">
                  {job.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="font-tech text-[10px] text-gray-400 dark:text-gray-600 mt-1 select-none">+</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills footer strip */}
              {job.skills && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-[#1A1A1A]">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="font-tech text-[10px] px-2 py-0.5 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#141414] text-gray-600 dark:text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;