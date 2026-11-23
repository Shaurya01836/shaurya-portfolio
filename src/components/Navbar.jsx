import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GithubIcon,
  LinkedinIcon,
  XComIcon,
  EnvelopeIcon,
  VolumeTwoIcon,
  NotificationBellOffIcon,
  SunIcon,
  MoonIcon,
  CodeIcon,
} from "./icons";
import {
  playClickSound,
  playToggleSound,
  playDevModeToggleSound,
  getSoundMuted,
  toggleSoundMuted,
} from "../utils/sound";

const Navbar = ({ toggleTheme, isDarkMode, isDevMode = false, toggleDevMode }) => {
  const location = useLocation();
  const [soundMuted, setSoundMutedState] = useState(getSoundMuted());

  const handleSoundToggle = () => {
    const nextMuted = toggleSoundMuted();
    setSoundMutedState(nextMuted);
    if (!nextMuted) {
      playClickSound();
    }
  };

  const handleThemeToggle = () => {
    playToggleSound(!isDarkMode);
    toggleTheme();
  };

  const isLinkActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { id: "home", label: "HOME", path: "/" },
    { id: "blogs", label: "BLOGS", path: "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--line)] bg-[var(--bg-primary)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="relative max-w-5xl mx-auto border-x border-[var(--line)] h-14 sm:h-16 flex items-stretch justify-between">
        {/* Left: Brand Cell (Handwritten Signature) */}
        <Link
          to="/"
          onClick={playClickSound}
          className="flex items-center px-4 sm:px-6 border-r border-[var(--line)] text-gray-900 dark:text-[#F4F4F5] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] group"
        >
          <span className="font-handwriting text-xl sm:text-2xl tracking-wide text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-[#CDBDFF] transition-colors leading-none">
            shaurya Upadhyay
          </span>
        </Link>

        {/* Center / Right: Nav Links & Actions */}
        <div className="flex items-stretch">
          {/* Navigation Links */}
          <nav className="flex items-stretch border-l sm:border-l-0 border-r border-[var(--line)]">
            {navItems.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={playClickSound}
                  className={`flex items-center px-4 sm:px-6 font-tech text-xs tracking-wider transition-colors border-r last:border-r-0 border-[var(--line)] ${
                    active
                      ? "text-gray-950 dark:text-white bg-black/[0.04] dark:bg-white/[0.04] font-medium"
                      : "text-gray-500 dark:text-[#71717A] hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Social Icons (Desktop) */}
          <div className="hidden sm:flex items-stretch border-r border-[var(--line)] text-gray-500 dark:text-[#71717A]">
            <a
              href="https://github.com/Shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              onClick={playClickSound}
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              <GithubIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              onClick={playClickSound}
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <LinkedinIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="https://x.com/shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              onClick={playClickSound}
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <XComIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="mailto:shaurya01836@gmail.com"
              aria-label="Send Email"
              onClick={playClickSound}
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <EnvelopeIcon width={16} height={16} aria-hidden />
            </a>
          </div>

          {/* Sound Mute/Unmute Toggle Button */}
          <button
            type="button"
            onClick={handleSoundToggle}
            title={soundMuted ? "Enable tactile sounds" : "Mute UI sounds"}
            aria-label={soundMuted ? "Enable tactile sounds" : "Mute UI sounds"}
            className="px-3 sm:px-3.5 flex items-center border-r border-[var(--line)] text-gray-500 dark:text-[#71717A] hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
          >
            {soundMuted ? <NotificationBellOffIcon width={16} height={16} aria-hidden /> : <VolumeTwoIcon width={16} height={16} aria-hidden />}
          </button>

          {/* Figma Dev Mode / Measure Inspector Toggle */}
          <button
            type="button"
            onClick={() => {
              playDevModeToggleSound(!isDevMode);
              if (toggleDevMode) toggleDevMode();
            }}
            title={isDevMode ? "Turn off Figma Dev Mode (Esc)" : "Turn on Figma Dev Mode (Alt+D)"}
            aria-label="Toggle Figma Dev Mode Measure Inspector"
            className={`px-3 sm:px-3.5 flex items-center gap-1.5 border-r border-[var(--line)] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] ${
              isDevMode
                ? "text-black dark:text-white bg-[#CDBDFF]/25 font-semibold"
                : "text-gray-500 dark:text-[#71717A] hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
            }`}
          >
            <CodeIcon width={15} height={15} aria-hidden />
            <span className="font-tech text-[10px] tracking-wider uppercase hidden md:inline-block">
              {isDevMode ? "DEV ON" : "DEV"}
            </span>
          </button>

          {/* Dark / Light Mode Shift Button */}
          <button
            type="button"
            onClick={handleThemeToggle}
            title={isDarkMode ? "Shift to Light Mode" : "Shift to Dark Mode"}
            aria-label={isDarkMode ? "Shift to Light Mode" : "Shift to Dark Mode"}
            className="px-3.5 sm:px-4 flex items-center text-gray-500 dark:text-[#71717A] hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] cursor-pointer"
          >
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ rotate: -45, scale: 0.85, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              {isDarkMode ? (
                <SunIcon width={16} height={16} aria-hidden />
              ) : (
                <MoonIcon width={16} height={16} aria-hidden />
              )}
            </motion.div>
          </button>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isDevMode: PropTypes.bool,
  toggleDevMode: PropTypes.func,
};

export default Navbar;
