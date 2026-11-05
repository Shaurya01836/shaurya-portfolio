import { motion } from 'framer-motion';

const skillsData = {
  "Languages & Frameworks": [
    { 
      name: "JavaScript", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      description: "The foundational language of modern web development. I utilize JavaScript (ES6+) for building highly dynamic user interfaces, asynchronous API integrations, and client-side applications."
    },
    { 
      name: "Java", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      description: "My primary language for backend systems. I design robust, modular, and thread-safe applications using Object-Oriented principles, multi-threading, and core Java features."
    },
    { 
      name: "React.js", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      description: "My favorite library for creating interactive SPAs. I am experienced with state management (Context, Hooks), optimized rendering, custom hooks, and rich animations using Framer Motion."
    },
    { 
      name: "Spring Boot", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      description: "My go-to framework for enterprise Java backends. I build modular REST APIs, secure endpoints using Spring Security, perform DB operations with Spring Data JPA, and configure dependency injection."
    },
    { 
      name: "HTML5", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      description: "The structural skeleton of the web. I write clean, semantic HTML5 markup to maintain high standards of SEO structure, accessibility (WCAG), and responsive rendering across web viewports."
    },
    { 
      name: "CSS3", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      description: "Used to design aesthetically premium web visuals. I utilize modern CSS features including Flexbox, CSS Grid layouts, custom variables, and keyframe transitions to craft fluid layouts."
    },
    { 
      name: "Tailwind CSS", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      description: "A utility-first CSS framework. It empowers me to quickly prototype and build clean, custom responsive layouts without writing bulky external stylesheets."
    },
  ],
  "Databases & Tools": [
    { 
      name: "PostgreSQL", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      description: "My primary SQL database choice. I write performant queries, model relational database schemas, design table index configurations, and manage relational database constraints."
    },
    { 
      name: "MongoDB", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      description: "A document-oriented NoSQL database. I use MongoDB for storing flexible JSON-like documents, implementing aggregations, and scaling data models quickly."
    },
    { 
      name: "Redis", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      description: "An in-memory data store. I use Redis as a high-performance database caching layer, session storage, and key-value store to optimize server response times."
    },
    { 
      name: "Firebase", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
      description: "A serverless cloud platform by Google. I use Firebase Firestore for real-time document storage, Authentication, and serverless communications inside client applications."
    },
    { 
      name: "Git", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      description: "Distributed version control system. I am comfortable managing branches, merging commits, resolving complex merge conflicts, and utilizing commands on the command line."
    },
    { 
      name: "GitHub", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", 
      iconDark: "https://cdn.simpleicons.org/github/ffffff",
      description: "The primary hosting provider for my codebase. I use GitHub for collaborative code reviews, issue tracking, continuous integration (CI/CD) pipelines, and release delivery."
    },
    { 
      name: "Postman", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
      description: "API testing client. I use Postman to design, validate, mock, and document REST endpoints, writing automated scripts to test HTTP request workflows."
    },
    { 
      name: "Docker", 
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      description: "A containerization platform. I wrap backend applications and database services into standardized containers to ensure consistent environments from local machine to cloud deployment."
    },
  ]
};

const categoryVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Skills = () => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-6 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Tech Stack Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Tech Stack
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Grid of Skills Categories */}
      <div className="flex flex-col gap-6">
        {Object.entries(skillsData).map(([category, skills], catIndex) => {
          const isOdd = skills.length % 2 !== 0;
          return (
            <motion.div
              key={category}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
              className="flex flex-col border border-gray-200 dark:border-[#1F1F1F] rounded-md overflow-hidden bg-white dark:bg-[#0A0A0A]"
            >
              {/* Category Header Bar with Technical Lines */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
                <div className="flex items-center gap-2">
                  <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
                    {category}
                  </h2>
                </div>
                <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
                  {skills.length} Modules
                </span>
              </div>

              {/* Technical Grid Matrix using 1px Lines */}
              <div className="grid grid-cols-2 md:grid-cols-4 -mr-[1px] -mb-[1px] overflow-hidden">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative flex items-center gap-3 p-3.5 sm:p-4 border-r border-b border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#121212] transition-colors duration-150 select-none cursor-default"
                  >
                    <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                      <img
                        src={skill.icon}
                        alt={`${skill.name} logo`}
                        className={`w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110 ${skill.iconDark ? "dark:hidden" : ""}`}
                      />
                      {skill.iconDark && (
                        <img
                          src={skill.iconDark}
                          alt={`${skill.name} logo`}
                          className="hidden w-6 h-6 object-contain dark:block transition-transform duration-200 group-hover:scale-110"
                        />
                      )}
                    </div>
                    <span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-150 truncate">
                      {skill.name}
                    </span>
                    <span className="absolute top-1.5 right-1.5 font-tech text-[8px] text-gray-300 dark:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      +
                    </span>
                  </div>
                ))}

                {/* If odd number of items, fill the remaining grid cell to maintain perfect rectangle */}
                {isOdd && (
                  <div className="border-r border-b border-gray-200 dark:border-[#1F1F1F] p-3.5 sm:p-4 flex items-center justify-center gap-1.5 bg-gray-50/40 dark:bg-[#0E0E0E]/50 select-none">
                    <span className="font-tech text-[10px] text-gray-400 dark:text-gray-600 tracking-wider">
                      + more
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;