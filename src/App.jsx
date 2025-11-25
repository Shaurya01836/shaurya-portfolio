import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import GithubGraph from "./components/GithubGraph";
import Loading from "./components/Loading";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 sm:px-52 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row border-x border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <aside className="lg:w-2/5 lg:h-screen lg:sticky lg:top-0">
          <Profile />
        </aside>

        <main className="lg:w-3/5 pb-20 lg:pb-0">
          <Header toggleTheme={toggleTheme} isDarkMode={darkMode} />

          <GithubGraph darkMode={darkMode} />

          <Experience />

          <Skills />

          <Projects />

          <Achievements />
        </main>
      </div>

      <Analytics />
    </div>
  );
}

export default App;
