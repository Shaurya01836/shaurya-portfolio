import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import SquareToggleRow from "./ui/SquareToggleRow";

const experienceData = [
  {
    company: "Software Technology Parks of India, Jaipur",
    role: "Frontend Web Developer",
    duration: "June – July 2025",
    description:
      "Contributed to frontend architecture for internal dashboards and web interfaces. Improved usability and responsive UX through component refactoring, modular design, and client-side optimization.",
    skills: ["React.js", "Tailwind CSS", "JavaScript", "UI/UX Architecture"],
    defaultOpen: true,
  },
];

const Experience = () => {
  return (
    <BlueprintSection id="experience" ariaLabel="Work Experience">
      {/* 2-cell Section Header */}
      <SectionHeader
        number="03"
        label="CAREER"
        title="Professional"
        accentWord="Experience"
        description="Engineering milestones, roles, and institutional internships"
      />

      {/* Accordion Rows */}
      <div className="flex flex-col">
        {experienceData.map((job, idx) => (
          <SquareToggleRow
            key={idx}
            title={job.role}
            subtitle={job.company}
            meta={job.duration}
            defaultOpen={job.defaultOpen}
          >
            <div className="flex flex-col gap-4 pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {job.description}
              </p>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="font-tech text-[10px] sm:text-[11px] px-2.5 py-1 rounded-none bg-black/[0.02] dark:bg-white/[0.03] text-gray-600 dark:text-[#71717A] border border-[var(--line)] uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </SquareToggleRow>
        ))}
      </div>
    </BlueprintSection>
  );
};

export default Experience;
