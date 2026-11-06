import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import CodingProfile from "../components/CodingProfile";
import GithubGraph from "../components/GithubGraph";
import Contact from "../components/Contact";

const SectionWrapper = ({ id, children, initialY = 24, delay = 0 }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: initialY }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    className="w-full"
  >
    {children}
  </motion.section>
);

SectionWrapper.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initialY: PropTypes.number,
  delay: PropTypes.number,
};

const Home = ({ darkMode }) => {
  return (
    <>
      <div className="block lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Profile />
        </motion.div>
      </div>

      <SectionWrapper id="header" initialY={16} delay={0.1}>
        <Header />
      </SectionWrapper>

      <SectionWrapper id="skills" delay={0.05}>
        <Skills />
      </SectionWrapper>

      <SectionWrapper id="projects" delay={0.05}>
        <Projects />
      </SectionWrapper>

      <SectionWrapper id="coding-profile" delay={0.05}>
        <CodingProfile darkMode={darkMode} />
      </SectionWrapper>

      <SectionWrapper id="github" delay={0.05}>
        <GithubGraph darkMode={darkMode} />
      </SectionWrapper>

      <SectionWrapper id="experience" delay={0.05}>
        <Experience />
      </SectionWrapper>

      <SectionWrapper id="achievements" delay={0.05}>
        <Achievements />
      </SectionWrapper>

      <SectionWrapper id="contact" delay={0.05}>
        <Contact />
      </SectionWrapper>
    </>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Home;
