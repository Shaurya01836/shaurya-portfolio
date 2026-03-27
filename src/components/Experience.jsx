import React from 'react';
import { motion } from 'framer-motion';
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

const ExperienceCard = ({ job, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative pl-8 pb-12 last:pb-0"
    >
   
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-[#1F1F1F] group-last:bottom-8"></div>
      
    
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white dark:bg-[#0A0A0A] border-2 border-gray-300 dark:border-[#1F1F1F] flex items-center justify-center z-10">
        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-md border border-solid border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0D0D0D] shadow-sm transition-all duration-300 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1A1A1A]">
              <RiBuildingLine size={20} className="text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white  transition-colors">
                {job.company}
              </h2>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {job.role}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 dark:bg-[#151515] border border-solid border-gray-200 dark:border-[#1F1F1F] text-sm text-gray-600 dark:text-gray-400">
            <RiCalendarLine size={14} />
            <span>{job.duration}</span>
          </div>
        </div>

        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          {job.tasks.map((task, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-gray-400 dark:text-gray-600 mt-1.5">•</span>
              {task}
            </li>
          ))}
        </ul>

        {job.skills && (
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 border border-solid border-gray-200 dark:border-[#1F1F1F]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-6 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Experience
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="max-w-4xl">
        {experienceData.map((job, index) => (
          <ExperienceCard key={index} job={job} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Experience;