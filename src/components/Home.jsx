import GithubGraph from "./GithubGraph";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Header from "./Header";
import CodingProfile from "./CodingProfile";

const Home = ({ darkMode }) => {
  return (
    <>
      <Header />
      <CodingProfile darkMode={darkMode} />
      <GithubGraph darkMode={darkMode} />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
    </>
  );
};

export default Home;
