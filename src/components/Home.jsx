import Header from "./Header";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Achievements from "./Achievements";
import CodingProfile from "./CodingProfile";
import GithubGraph from "./GithubGraph";
import Contact from "./Contact";

const Home = ({ darkMode }) => {
  return (
    <>
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

export default Home;
