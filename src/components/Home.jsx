import GithubGraph from "./GithubGraph";
import Experience from "./Experience";
import Skills from "./Skills";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Header from "./Header";

const Home = ({ darkMode }) => {
  return (
    <>
      <Header />
      <GithubGraph darkMode={darkMode} />
      <Experience />
      <Skills />
      <Projects />
      <Achievements />
    </>
  );
};

export default Home;
