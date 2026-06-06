import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ReactLenis, useLenis } from "lenis/react";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Loading from "./components/Loading";
import BlogDetail from "./components/BlogDetail";
import Navbar from "./components/Navbar";
import MigrateBlogs from "./components/MigrateBlogs";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function AnimatedRoutes({ darkMode, toggleTheme }) {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis]);

  const isBlogSection = location.pathname.startsWith("/blogs");

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 sm:px-40 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row border-x border-solid border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <aside className={`${isBlogSection ? "hidden lg:block" : ""} lg:w-2/5 lg:h-screen lg:sticky lg:top-0`}>
          <Profile />
        </aside>

        <main className="lg:w-3/5 pb-20 lg:pb-0">
          <Navbar toggleTheme={toggleTheme} isDarkMode={darkMode} />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home darkMode={darkMode} />
                  </PageWrapper>
                }
              />
              <Route
                path="/blogs"
                element={
                  <PageWrapper>
                    <Blogs />
                  </PageWrapper>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <PageWrapper>
                    <BlogDetail />
                  </PageWrapper>
                }
              />
              <Route
                path="/migrate-blogs"
                element={
                  <PageWrapper>
                    <MigrateBlogs />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

AnimatedRoutes.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

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
    <ReactLenis root>
      <Router>
        <AnimatedRoutes darkMode={darkMode} toggleTheme={toggleTheme} />
      </Router>
    </ReactLenis>
  );
}

export default App;
