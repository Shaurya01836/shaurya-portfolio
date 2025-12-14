import { RiSunLine, RiMoonLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="fixed top-6 right-6 md:top-5 md:right-60 z-50 flex gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700"
      >
        <span>Portfolio</span>
      </Link>
      <Link
        to="/blogs"
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700"
      >
        <span>Blogs</span>
      </Link>

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;