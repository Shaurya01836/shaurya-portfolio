const skillsData = {
  "Languages & Frameworks": [
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    },
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
    },
  ],
  
};

const Skills = () => {
  return (
    <div className="flex flex-col w-full px-8  gap-2 bg-white text-black">
      <h1 className="text-lg text-gray-600 font-semibold">
        Skills & Expertise
      </h1>

      <div className="w-full  gap-8">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div
            key={category}
            className="border border-gray-200 rounded-md p-6 shadow-sm "
          >
            <div className="flex flex-wrap gap-4">
              {skills.map(({ name, icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-3 bg-gray-50 rounded-md p-2"
                >
                  <img src={icon} alt={`${name} logo`} className="w-6 h-6" />
                  <span className="font-semibold text-md text-gray-800">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
