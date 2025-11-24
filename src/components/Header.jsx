import BentoCard from "./BentoCard";
import { RiSunLine, RiMoonLine } from "@remixicon/react";

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="relative p-4 md:p-8 md:py-14 text-black dark:text-white flex items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full items-center">
        <nav className="fixed top-6 right-6 md:top-5 md:right-60 z-20 flex gap-4">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <span>Portfolio</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-gray-700"
          >
            <span>Blogs</span>
          </a>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
          </button>
        </nav>

        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">STPI Internship</h1>
        <BentoCard className="col-span-4 h-44 p-0">
          <img
            src="https://i.ibb.co/PZt4m1GV/stpi.jpg"
            alt="Primary image"
            className="w-full h-full object-cover rounded-md"
          />
        </BentoCard>
      </div>
    </div>
  );
};

export default Header;