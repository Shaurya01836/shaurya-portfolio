
import { RiBuildingLine } from "@remixicon/react";

const experienceData = [
  {
    company: "Software Technology Parks of India, Jaipur",
    role: "Frontend Web Developer",
    duration: "Date - Date", 
    tasks: [
      "Contributed to frontend development of dashboards and user interfaces.",
      "Enhanced application usability through UI/UX improvements and feature updates.",
      "Collaborated on code refactoring and component optimization for better maintainability.",
    ],
  },
 
];

const Experience = () => {
  return (
    <div className="flex flex-col items-center w-full px-8 py-20 gap-10 bg-white text-black">
    

      <h1 className="font-bold text-xl">Experience</h1>

      {/* Experience Card */}
      <div className="w-full ">
        {experienceData.map((job, index) => (
          <div
            key={index}
            className="flex items-start gap-6 p-6 border border-gray-200 rounded-3xl shadow-sm "
          >
            <div className="text-blue-500 bg-blue-50 p-3 rounded-full">
              <RiBuildingLine />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{job.role}</h2>
              <p className="text-md font-semibold text-gray-500">
                {job.company}
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-600">
                {job.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
