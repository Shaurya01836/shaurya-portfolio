import { useState } from "react";
import { RiBuildingLine, RiGraduationCapLine } from "@remixicon/react";

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

const educationData = [
  {
    school: "Poornima College of Enginnering , Jaipur",
    degree: "Bachelor of Technology, Information Technology",
    duration: "2023 - 2027",
  }
 
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <div className="flex flex-col w-full px-8 py-20 gap-2 bg-white text-black">
      <h1 className="text-lg text-gray-600 font-semibold">Career & Education</h1>

      <div className="w-full">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-6 py-3 -mb-px font-semibold text-md
              ${
                activeTab === "experience"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
          >
            <RiBuildingLine size={20} />
            <span>Experience</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-6 py-3 -mb-px font-semibold text-md
              ${
                activeTab === "education"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
          >
            <RiGraduationCapLine size={20} />
            <span>Education</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          {activeTab === "experience" && (
            <div className="space-y-8">
              {experienceData.map((job, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 border border-gray-200 rounded-md shadow-sm"
                >
                  <div className="text-blue-500 bg-blue-50 p-3 rounded-full flex-shrink-0">
                    <RiBuildingLine />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h2 className="text-xl font-bold text-gray-800">
                        {job.role}
                      </h2>
                      <span className="text-sm font-medium text-gray-500 ml-4 flex-shrink-0">
                        {job.duration}
                      </span>
                    </div>
                    <p className="text-md font-semibold text-gray-600 mb-3">
                      {job.company}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {job.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "education" && (
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-start gap-6 p-6 border border-gray-200 rounded-md shadow-sm"
                >
                  <div className="text-blue-500 bg-blue-50 p-3 rounded-full flex-shrink-0">
                    <RiGraduationCapLine />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-gray-800">
                        {edu.school}
                      </h2>
                      <span className="text-sm font-medium text-gray-500 ml-4 flex-shrink-0">
                        {edu.duration}
                      </span>
                    </div>
                    <p className="text-md font-semibold text-gray-600">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;