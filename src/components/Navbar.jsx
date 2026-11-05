import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { SwitchMode } from "./watermelon/switch-mode";

const NavCornerTicks = () => (
  <>
    <span className="absolute -bottom-1 -left-1 font-mono text-[9px] text-gray-400 dark:text-gray-600 select-none leading-none pointer-events-none">+</span>
    <span className="absolute -bottom-1 -right-1 font-mono text-[9px] text-gray-400 dark:text-gray-600 select-none leading-none pointer-events-none">+</span>
  </>
);

const Navbar = ({ toggleTheme, isDarkMode, hasBanner }) => {
  const location = useLocation();

  const isLinkActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { id: "01", label: "HOME", path: "/" },
    { id: "02", label: "BLOGS", path: "/blogs" },
  ];

  const getPathBreadcrumb = () => {
    if (location.pathname === "/") return "INDEX.ROOT";
    if (location.pathname.startsWith("/blogs/")) return "BLOGS.DETAIL";
    if (location.pathname === "/blogs") return "BLOGS.INDEX";
    return location.pathname.replace(/^\//, "").toUpperCase();
  };

  return (
    <header
      className={`sticky ${
        hasBanner ? "top-14 md:top-14" : "top-0"
      } z-40 w-full bg-white/85 dark:bg-[#0A0A0A]/85 backdrop-blur-md border-b border-gray-200 dark:border-[#1F1F1F] transition-colors duration-300 relative`}
    >
      <NavCornerTicks />

      <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 gap-3">
        {/* Left Telemetry: Status & Breadcrumb */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-gray-400 dark:text-gray-500">
            <span className="text-gray-300 dark:text-[#2A2A2A]">|</span>
            <span className="text-[10px] tracking-wider">LOC:</span>
            <span className="text-gray-800 dark:text-gray-200 font-semibold tracking-wider">
              {getPathBreadcrumb()}
            </span>
          </div>
        </div>

        {/* Right Navigation & Mode Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Segmented Industrial Route Switcher */}
          <nav className="flex items-center p-0.5 rounded-md border border-gray-200 dark:border-[#222222] bg-gray-100/70 dark:bg-[#121212]">
            {navItems.map((item) => {
              const active = isLinkActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative px-3 sm:px-3.5 py-1 sm:py-1.5 rounded text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? "text-gray-950 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded bg-white dark:bg-[#1F1F1F] shadow-sm border border-gray-200 dark:border-[#2F2F2F]"
                    />
                  )}
                  <span className="relative z-10 tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-gray-200 dark:bg-[#222222]" />

          {/* Theme Switcher Housing */}
          <div className="inline-flex items-center">
            <SwitchMode
              isDark={isDarkMode}
              onToggle={toggleTheme}
              width={64}
              height={30}
              darkColor="#121212"
              lightColor="#F4F4F5"
              knobDarkColor="#262626"
              knobLightColor="#FFFFFF"
              borderDarkColor="#2F2F2F"
              borderLightColor="#E2E2E5"
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
  hasBanner: PropTypes.bool,
};

export default Navbar;
