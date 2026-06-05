import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Magnetic = ({ children, scale = 0.08 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * scale, y: distanceY * scale });
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
      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.1 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  scale: PropTypes.number,
};

const Header = () => {
  return (
    <div className="relative flex flex-col gap-6 text-black dark:text-white p-4 md:p-8 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Left Column - STPI Internship */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">
              STPI Internship
            </h1>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
          </div>
          <Magnetic scale={0.06}>
            <img
              src="https://i.ibb.co/PZt4m1GV/stpi.jpg"
              alt="STPI Internship"
              loading="lazy"
              className="w-full h-44 object-cover rounded-md border border-gray-200 dark:border-[#1F1F1F] shadow-sm cursor-pointer"
            />
          </Magnetic>
        </div>

        {/* Right Column - Coding Vibes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">
              Coding Vibes
            </h1>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
          </div>
          <Magnetic scale={0.06}>
            <img
              src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
              alt="Coding GIF"
              loading="lazy"
              className="w-full h-44 object-cover rounded-md border border-gray-200 dark:border-[#1F1F1F] shadow-sm cursor-pointer"
            />
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default Header;