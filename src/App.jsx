import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { ReactLenis, useLenis } from "lenis/react";

import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";
import { MagneticScrollIndicator } from "./components/MagneticScrollIndicator";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase.config";

// Lazy-loaded routes for optimal initial bundle performance
const NotFound = lazy(() => import("./pages/NotFound"));

// Local-only admin portal (aliased via vite.config.js to NotFound if gitignored in production)
const Admin = lazy(() => import("@admin-portal"));

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

  // Check if session is on local development environment
  const isLocalhost = Boolean(
    typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        import.meta.env.DEV)
  );

  // Dedicated Full-Width Layout for Admin Portal (strictly gated to localhost)
  if (location.pathname.startsWith("/admin")) {
    if (!isLocalhost) {
      return (
        <PageWrapper>
          <NotFound />
        </PageWrapper>
      );
    }
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A] text-gray-500 font-tech text-xs uppercase tracking-wider">
            Loading Admin Console...
          </div>
        }
      >
        <Admin darkMode={darkMode} toggleTheme={toggleTheme} />
      </Suspense>
    );
  }

  return (
    <ReactLenis root>
      <div className="bg-[var(--bg-primary)] dark:bg-[#07070A] text-gray-900 dark:text-[#F4F4F5] min-h-screen transition-colors duration-200 flex flex-col relative selection:bg-[#CDBDFF]/25 selection:text-black dark:selection:text-[#CDBDFF]">
        {/* Subtle, thin top scroll progress indicator */}
        <MagneticScrollIndicator />

        {/* Top Navbar */}
        <Navbar toggleTheme={toggleTheme} isDarkMode={darkMode} />

        {/* Full-width blueprint viewport: hairlines run edge-to-edge, content is framed at max-w-[1160px] */}
        <main className="flex-1 w-full">
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
                    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-xs font-tech text-gray-400">Loading...</div>}>
                      <NotFound />
                    </Suspense>
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </ReactLenis>
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
    <Router>
      <AnimatedRoutes darkMode={darkMode} toggleTheme={toggleTheme} />
    </Router>
  );
}

export default App;
