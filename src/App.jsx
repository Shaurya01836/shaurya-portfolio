import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ReactLenis, useLenis } from "lenis/react";
import Profile from "./components/Profile";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import { MagneticScrollIndicator, AmbientGutterGrid } from "./components/MagneticScrollIndicator";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase.config";

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

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 flex flex-col relative">
      {/* Ambient background lines in outer free space */}
      <AmbientGutterGrid />

      {/* Interactive Magnetic Scroll Progress Indicator */}
      <MagneticScrollIndicator />

      <div className="sm:px-36 flex-1 relative z-10">
        <div className="flex flex-col lg:flex-row border-x border-solid border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] transition-colors duration-300 min-h-full">
          {/* Fixed / Sticky Left Profile Sidebar on Desktop */}
          <aside className="hidden lg:block lg:w-2/5 lg:h-screen lg:sticky lg:top-0 lg:overflow-hidden">
            <Profile />
          </aside>

          {/* Right Main Column */}
          <main className="lg:w-3/5 pb-20 lg:pb-0 lg:border-l border-solid border-gray-200 dark:border-[#1F1F1F]">
            {/* Top Navbar */}
            <Navbar toggleTheme={toggleTheme} isDarkMode={darkMode} hasBanner={false} />

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
                  path="*"
                  element={
                    <PageWrapper>
                      <NotFound />
                    </PageWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

AnimatedRoutes.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    const supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return theme === "dark" || (!theme && supportDarkMode);
  });

  useEffect(() => {
    const prefetchData = async () => {
      try {
        await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "profile")),
          getDocs(collection(db, "featuredImages")),
          getDocs(query(collection(db, "achievements"), orderBy("date", "desc"))),
        ]);
      } catch (error) {
        console.error("Error prefetching data:", error);
      }
    };

    prefetchData();
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

  return (
    <ReactLenis root>
      <Router>
        <AnimatedRoutes darkMode={darkMode} toggleTheme={toggleTheme} />
      </Router>
    </ReactLenis>
  );
}

export default App;
