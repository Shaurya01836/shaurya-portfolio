import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";

const techList = [
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    iconDark: "https://cdn.simpleicons.org/github/ffffff",
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  },
];

const Skills = () => {
  return (
    <BlueprintSection id="tech-stack" ariaLabel="Tech Stack">
      {/* 2-cell Section Header */}
      <SectionHeader
        number="02"
        label="STACK"
        title="Technical"
        accentWord="Capabilities"
        description="Core languages, enterprise frameworks, databases & infrastructure"
      />

      {/* Grid of Square Cells with 1px borders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 border-b border-[var(--line)]">
        {techList.map((skill) => (
          <div
            key={skill.name}
            className="group relative flex flex-col items-center justify-center p-6 border sm:border-b-0 border-[var(--line)] bg-[var(--surface)] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors duration-150 cursor-default select-none"
          >
            <div className="w-8 h-8 flex items-center justify-center mb-3">
              <img
                src={skill.icon}
                alt={`${skill.name} icon`}
                className={`w-6 h-6 object-contain transition-all duration-200 ${
                  skill.iconDark ? "dark:hidden" : ""
                }`}
                loading="lazy"
              />
              {skill.iconDark && (
                <img
                  src={skill.iconDark}
                  alt={`${skill.name} icon`}
                  className="hidden w-6 h-6 object-contain dark:block transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              )}
            </div>
            <span className="font-tech text-xs tracking-wider uppercase text-gray-700 dark:text-[#71717A] group-hover:text-black dark:group-hover:text-white transition-colors text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </BlueprintSection>
  );
};

export default Skills;
