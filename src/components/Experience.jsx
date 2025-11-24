import { RiBuildingLine, } from "@remixicon/react";

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
  },
];

const Experience = () => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-2 bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">Experience</h1>

      <div className="w-full space-y-12 border border-gray-200 dark:border-gray-800 rounded-md p-6 shadow-sm bg-white dark:bg-[#0A0A0A]">
        {experienceData.map((job, index) => (
          <div key={index} className="flex flex-col gap-2">

            <div className="flex items-center gap-3">
              <RiBuildingLine size={24} className="text-gray-500 dark:text-gray-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.company}</h2>
            </div>

            <div className="flex items-center gap-3 pl-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {job.role}
              </h3>
            </div>

            <div className="pl-11 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span>{job.duration}</span>
            </div>

            <ul className="list-disc list-outside ml-16 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
              {job.tasks.map((task, i) => (
                <li key={i} className="pl-2 leading-relaxed">
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;