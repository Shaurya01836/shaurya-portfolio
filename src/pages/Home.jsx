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
      <Header />
      <Skills />
      <Projects />
      <CodingProfile darkMode={darkMode} />
      <GithubGraph darkMode={darkMode} />
      <Experience />
      <Achievements />
      <Contact />
    </>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Home;
