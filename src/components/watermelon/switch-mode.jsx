import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { IoMoon, IoMoonOutline, IoSunny, IoSunnyOutline } from "react-icons/io5";

export const SwitchMode = ({
  width = 80,
  height = 40,
  darkColor = "#0B0B0B",
  lightColor = "#FFFFFF",
  knobDarkColor = "#2A2A2E",
  knobLightColor = "#F3F2F7",
  borderDarkColor = "#4C4C50",
  borderLightColor = "#D8D6E0",
  isDark = false,
  onToggle,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width, height }}
        className="rounded-full border-2 border-transparent"
      />
    );
  }

  const iconSize = height * 0.45;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      className="relative flex items-center rounded-full border-2 transition-colors cursor-pointer select-none"
      style={{
        width,
        height,
        borderColor: isDark ? borderDarkColor : borderLightColor,
      }}
      aria-label="Toggle theme"
    >
      {/* TRACK */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ backgroundColor: isDark ? darkColor : lightColor }}
        transition={{ duration: 0.4 }}
      />

      {/* SLIDING KNOB */}
      <motion.div
        initial={false}
        animate={{ x: isDark ? width - height : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute rounded-full border-2 z-10"
        style={{
          width: height,
          height,
          left: -2,
          top: -2,
          backgroundColor: isDark ? knobDarkColor : knobLightColor,
          borderColor: isDark ? borderDarkColor : borderLightColor,
        }}
      />

      {/* SUN */}
      <motion.div
        className="relative z-20 flex items-center justify-center pointer-events-none"
        style={{ width: height, height }}
        animate={{ rotate: isDark ? 45 : 0 }}
        transition={{ stiffness: 20 }}
      >
        {isDark ? (
          <IoSunnyOutline
            color="#8A8A8F"
            fill="#8A8A8F"
            stroke="#8A8A8F"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        ) : (
          <IoSunny
            color="#686771"
            fill="#686771"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        )}
      </motion.div>

      {/* MOON */}
      <motion.div
        className="relative z-20 flex items-center justify-center pointer-events-none"
        style={{ width: height, height }}
        animate={{ rotate: isDark ? 0 : 15 }}
        transition={{ stiffness: 20, damping: 14 }}
      >
        {isDark ? (
          <IoMoon
            color="#F4F4FB"
            fill="#F4F4FB"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        ) : (
          <IoMoonOutline
            color="#ABABB4"
            fill="#ABABB4"
            stroke="#ABABB4"
            style={{ width: iconSize, height: iconSize }}
            className="transition-colors duration-200"
          />
        )}
      </motion.div>
    </motion.button>
  );
};

SwitchMode.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  darkColor: PropTypes.string,
  lightColor: PropTypes.string,
  knobDarkColor: PropTypes.string,
  knobLightColor: PropTypes.string,
  borderDarkColor: PropTypes.string,
  borderLightColor: PropTypes.string,
  isDark: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default SwitchMode;
