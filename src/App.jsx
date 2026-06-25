import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ReactLenis, useLenis } from "lenis/react";
import Profile from "./components/Profile";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Loading from "./components/Loading";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
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
    <div className="bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 sm:px-36 min-h-screen transition-colors duration-300">
      <div className="flex flex-col lg:flex-row border-x border-solid border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
        <aside className="hidden lg:block lg:w-2/5 lg:h-screen lg:sticky lg:top-0">
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
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("hasLoadedBefore");
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    let completed = false;

    const prefetchData = async () => {
      try {
        await Promise.all([
          getDocs(collection(db, "projects")),
          getDocs(collection(db, "profile")),
          getDocs(query(collection(db, "achievements"), orderBy("date", "desc")))
        ]);
      } catch (error) {
        console.error("Error prefetching data:", error);
      } finally {
        if (!completed) {
          setIsDataLoaded(true);
        }
      }
    };

    prefetchData();

    // Fallback safety timeout (5 seconds) to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      completed = true;
      setIsDataLoaded(true);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
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
    sessionStorage.setItem("hasLoadedBefore", "true");
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onComplete={handleLoadingComplete} isDone={isDataLoaded} />;
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
