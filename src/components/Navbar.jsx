import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { RiSunLine, RiMoonLine } from "@remixicon/react";
import { Link } from "react-router-dom";

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
};

const Navbar = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className="fixed top-6 right-6 md:top-5 md:right-60 z-50 flex gap-4">
      <Magnetic>
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-[#1F1F1F] block"
        >
          <span>Portfolio</span>
        </Link>
      </Magnetic>

      <Magnetic>
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-semibold text-lg transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200 dark:border-[#1F1F1F] block"
        >
          <span>Blogs</span>
        </Link>
      </Magnetic>

      <Magnetic>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-sm px-3 py-2 rounded-md border border-gray-200 dark:border-[#1F1F1F]"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <RiSunLine size={20} /> : <RiMoonLine size={20} />}
        </button>
      </Magnetic>
    </nav>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navbar;