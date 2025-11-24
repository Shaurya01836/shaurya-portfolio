import Profile, { ConnectSection } from "./components/Profile";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import GithubGraph from "./components/GithubGraph";

function App() {
  return (
    <div className="bg-white text-gray-900 sm:px-52 min-h-screen">
      <div className="flex flex-col lg:flex-row border border-gray-200 bg-white">
        <aside className="lg:w-2/5 lg:h-screen lg:sticky lg:top-0">
          <Profile />
        </aside>

        <main className="lg:w-3/5 pb-20 lg:pb-0">
          <section id="home">
            <Header />
          </section>
          <section id="github">
            <GithubGraph />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>

          <section id="achievements">
            <Achievements />
          </section>
        </main>
      </div>

      <section id="contact" className="lg:hidden px-8 pb-20">
        <ConnectSection />
      </section>
    </div>
  );
}

export default App;
