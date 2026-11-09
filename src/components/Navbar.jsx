import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { SwitchMode } from "./watermelon/switch-mode";
import { RiGithubLine, RiLinkedinLine, RiTwitterXLine, RiMailLine } from "@remixicon/react";
import Crosshair from "./ui/Crosshair";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const location = useLocation();

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
      <div className="relative max-w-[1160px] mx-auto border-x border-[var(--line)] h-14 sm:h-16 flex items-stretch justify-between">
        {/* Bottom Crosshairs at intersection of navbar border-b and frame border-x */}
        <div className="absolute -bottom-[5.5px] -left-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>
        <div className="absolute -bottom-[5.5px] -right-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>

        {/* Left: Brand Cell */}
        <Link
          to="/"
          className="flex items-center gap-2.5 px-4 sm:px-6 border-r border-[var(--line)] font-tech text-xs tracking-wider uppercase text-gray-900 dark:text-gray-100 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
        >
          <span className="font-semibold text-sm tracking-tight font-sans">Shaurya</span>
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
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
            >
              <RiGithubLine size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <RiLinkedinLine size={16} />
            </a>
            <a
              href="https://x.com/shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <RiTwitterXLine size={15} />
            </a>
            <a
              href="mailto:shaurya01836@gmail.com"
              aria-label="Send Email"
              className="px-3.5 flex items-center hover:text-black dark:hover:text-[#CDBDFF] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors border-l border-[var(--line)]"
            >
              <RiMailLine size={16} />
            </a>
          </div>

          {/* Theme Switcher Cell */}
          <div className="flex items-center px-4 sm:px-5">
            <SwitchMode
              isDark={isDarkMode}
              onToggle={toggleTheme}
              width={52}
              height={26}
              darkColor="#07070A"
              lightColor="#F0F0F4"
              knobDarkColor="#262626"
              knobLightColor="#FFFFFF"
              borderDarkColor="rgba(255,255,255,0.12)"
              borderLightColor="rgba(0,0,0,0.12)"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default Navbar;
