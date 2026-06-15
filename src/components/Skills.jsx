import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiCloseLine, 
  RiExternalLinkLine, 
  RiGithubLine, 
  RiSparklingLine, 
  RiBriefcaseLine,
  RiCodeSSlashLine
} from "@remixicon/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { useLenis } from "lenis/react";

const Magnetic = ({ children, scale = 0.25 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * scale, y: distanceY * scale });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  scale: PropTypes.number,
};

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const SkillCard = ({ name, icon, iconDark, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      variants={skillVariants}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      viewport={{ once: true }}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${name}`}
      className="group relative flex items-center gap-3 overflow-hidden rounded-md border border-solid border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-colors duration-200 dark:border-[#1F1F1F] dark:bg-[#0D0D0D] cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      <motion.img
        src={icon}
        alt={`${name} logo`}
        className={`w-6 h-6 object-contain ${iconDark ? "dark:hidden" : ""}`}
        whileHover={{ rotate: 6, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      />
      {iconDark ? (
        <motion.img
          src={iconDark}
          alt={`${name} logo`}
          className="hidden w-6 h-6 object-contain dark:block"
          whileHover={{ rotate: 6, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
      ) : null}
      <span className="font-medium text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white">
        {name}
      </span>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:via-white/5" />
    </motion.div>
  );
};

SkillCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  iconDark: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const lenis = useLenis();

  // Disable Lenis scrolling when modal is open
  useEffect(() => {
    if (!lenis) return;
    if (selectedSkill) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [selectedSkill, lenis]);

  // Fetch all projects on mount to link them dynamically inside details view
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects in Skills: ", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

  // Keyboard close and scroll prevention when modal is active
  useEffect(() => {
    if (!selectedSkill) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedSkill(null);
      }
      // Block keys that cause document scrolling to prevent layout movement
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        const activeEl = document.activeElement;
        const isInsideModal = activeEl && activeEl.closest("[role='dialog']");
        if (!isInsideModal) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedSkill]);

  // Case-insensitive flexible matching for matching skill to project techStack
  const getRelatedProjects = (skillName) => {
    if (!skillName || loadingProjects) return [];
    const skillLower = skillName.toLowerCase().trim();

    return projects.filter(project => {
      if (!project.techStack) return false;
      
      const stackList = Array.isArray(project.techStack)
        ? project.techStack.map(s => s.toLowerCase().trim())
        : typeof project.techStack === "string"
          ? project.techStack.split(",").map(s => s.toLowerCase().trim())
          : [];

      return stackList.some(tech => {
        if (tech === skillLower) return true;
        if (skillLower === "javascript" && (tech === "js" || tech.includes("javascript"))) return true;
        if (skillLower === "react.js" && tech.includes("react")) return true;
        if (skillLower === "spring boot" && tech.includes("spring")) return true;
        if (skillLower === "postgresql" && tech.includes("postgres")) return true;
        if (skillLower === "html5" && tech.includes("html")) return true;
        if (skillLower === "css3" && tech.includes("css")) return true;
        
        // Prevent java from matching javascript
        if (tech.includes(skillLower)) {
          if (skillLower === "java" && tech.includes("javascript")) return false;
          return true;
        }
        if (skillLower.includes(tech)) {
          if (tech === "java" && skillLower.includes("javascript")) return false;
          return true;
        }
        return false;
      });
    });
  };

  const activeRelatedProjects = selectedSkill ? getRelatedProjects(selectedSkill.name) : [];

  return (
    <div className="flex flex-col w-full px-8 py-10 gap-8 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Tech Stack Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Tech Stack
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      {/* Grid of Skills Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skillsData).map(([category, skills], catIndex) => (
          <motion.div
            key={category}
            variants={categoryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-1">
              {category}
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Magnetic key={skill.name}>
                  <SkillCard 
                    name={skill.name} 
                    icon={skill.icon}
                    iconDark={skill.iconDark}
                    onClick={() => setSelectedSkill({ ...skill, category })}
                  />
                </Magnetic>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Detail Modal/Drawer Overlay */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
            data-lenis-prevent
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full max-w-4xl max-h-[85vh] flex flex-col relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedSkill.name} Details`}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSkill(null)}
                className="absolute z-50 right-4 top-4 rounded-full bg-white/80 p-2 text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-gray-900 dark:bg-[#0A0A0A]/80 dark:text-gray-300 dark:hover:bg-[#111111] dark:hover:text-white border border-gray-200 dark:border-white/10"
                aria-label="Close details"
              >
                <RiCloseLine size={24} />
              </button>

              {/* Two Column Layout: Left Column = Info, Right Column = Projects */}
              <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden min-h-0">
                
                {/* Left Side: Skill Details */}
                <div className="flex flex-col md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-[#1F1F1F] md:overflow-y-auto bg-gray-50/50 dark:bg-[#050505]/45">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-xl shadow-sm">
                      <img 
                        src={selectedSkill.icon} 
                        alt={`${selectedSkill.name} logo`} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        {selectedSkill.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                        {selectedSkill.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 flex-grow">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1.5">
                        <RiSparklingLine size={14} className="text-blue-500" /> Usage & Experience
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {selectedSkill.description || "I use this technology in my development workflow to build premium, scalable web properties and backend architectures."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Related Projects */}
                <div className="flex flex-col md:w-1/2 p-6 md:p-8 md:overflow-y-auto bg-white dark:bg-[#0A0A0A] min-h-0">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-1.5 border-b border-gray-100 dark:border-[#1F1F1F] pb-2">
                    <RiBriefcaseLine size={14} className="text-blue-500" /> Related Projects ({activeRelatedProjects.length})
                  </h4>

                  {loadingProjects ? (
                    <div className="flex flex-col gap-3 py-6 justify-center items-center text-gray-400 text-sm">
                      <span>Loading projects...</span>
                    </div>
                  ) : activeRelatedProjects.length > 0 ? (
                    <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                      {activeRelatedProjects.map((project) => (
                        <div 
                          key={project.id}
                          className="p-4 rounded-xl border border-gray-100 dark:border-[#1F1F1F] bg-gray-50/30 dark:bg-[#0D0D0D]/50 hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 flex flex-col gap-3"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-bold text-gray-900 dark:text-white text-base">
                              {project.title}
                            </h5>
                            <div className="flex items-center gap-2">
                              {project.githubUrl && (
                                <a 
                                  href={project.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="p-1 rounded bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 hover:text-blue-500 text-gray-500 dark:text-gray-400 transition-colors"
                                  title="View Repository"
                                >
                                  <RiGithubLine size={16} />
                                </a>
                              )}
                              {project.liveDemo && (
                                <a 
                                  href={project.liveDemo} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="p-1 rounded bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/5 hover:text-blue-500 text-gray-500 dark:text-gray-400 transition-colors"
                                  title="Open Live Demo"
                                >
                                  <RiExternalLinkLine size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {Array.isArray(project.techStack) ? (
                              project.techStack.slice(0, 4).map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                                    tech.toLowerCase().includes(selectedSkill.name.toLowerCase())
                                      ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                      : "bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 border border-gray-200 dark:border-white/5"
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))
                            ) : typeof project.techStack === "string" ? (
                              project.techStack.split(",").slice(0, 4).map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className={`text-[9px] font-semibold px-2 py-0.5 rounded ${
                                    tech.toLowerCase().includes(selectedSkill.name.toLowerCase())
                                      ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                                      : "bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 border border-gray-200 dark:border-white/5"
                                  }`}
                                >
                                  {tech.trim()}
                                </span>
                              ))
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-gray-200 dark:border-[#1F1F1F] rounded-xl flex-grow bg-gray-50/20 dark:bg-[#070707]/30">
                      <RiCodeSSlashLine size={36} className="text-gray-300 dark:text-gray-700 mb-3" />
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        No projects linked yet
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 max-w-xs leading-normal">
                        I haven't added projects containing this exact technology tag to my database yet. Check back soon!
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;