import PropTypes from "prop-types";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import CodingProfile from "../components/CodingProfile";
import GithubGraph from "../components/GithubGraph";
import Contact from "../components/Contact";

const Home = ({ darkMode }) => {
  return (
    <>
      <div className="block lg:hidden">
        <Profile />
      </div>
      <section id="header">
        <Header />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="coding-profile">
        <CodingProfile darkMode={darkMode} />
      </section>
      <section id="github">
        <GithubGraph darkMode={darkMode} />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="achievements">
        <Achievements />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Home;
