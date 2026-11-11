import PropTypes from "prop-types";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import CodingStats from "../components/CodingStats";
import GithubActivity from "../components/GithubActivity";
import AboutHighlights from "../components/AboutHighlights";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import HatchBand from "../components/ui/HatchBand";

const Home = ({ darkMode }) => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero (includes StatusStrip & Hatched Band 1) */}
      <Hero />

      {/* 2. Projects */}
      <Projects />

      {/* 3. Tech Stack */}
      <Skills />

      {/* 4. Experience */}
      <Experience />
      <HatchBand />

      {/* 5. Coding Stats (LeetCode) */}
      <CodingStats />

      {/* 6. GitHub Activity */}
      <GithubActivity darkMode={darkMode} />

      <HatchBand />

      {/* 7. Highlights / About */}
      <AboutHighlights />

      {/* Hatched Band 2: Before Contact */}
      <HatchBand />

      {/* 8. Contact */}
      <ContactSection />

      {/* Hatched Band 3: Before Footer */}
      <HatchBand />

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default Home;
