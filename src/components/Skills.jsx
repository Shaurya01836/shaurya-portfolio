import PropTypes from "prop-types";
import { motion } from 'framer-motion';

const skillsData = {
  
  "Languages & Frameworks": [
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  ],
  "Databases & Tools": [
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", iconDark: "https://cdn.simpleicons.org/github/ffffff" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
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

const SkillCard = ({ name, icon, iconDark }) => {
  return (
    <motion.div
      variants={skillVariants}
      whileHover={{ y: -4, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      viewport={{ once: true }}
      className="group relative flex items-center gap-3 overflow-hidden rounded-md border border-solid border-gray-200 bg-white px-4 py-2.5 shadow-sm transition-colors duration-200 dark:border-[#1F1F1F] dark:bg-[#0D0D0D]"
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
};

const Skills = () => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-8 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Tech Stack
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

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
                <SkillCard 
                  key={skill.name} 
                  name={skill.name} 
                  icon={skill.icon}
                  iconDark={skill.iconDark}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;