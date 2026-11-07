import PropTypes from "prop-types";
import { GitHubCalendar } from "react-github-calendar";

const GithubGraph = ({ darkMode }) => {
  return (
    <div className="flex flex-col w-full px-8 py-10 gap-4 text-black dark:text-white transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          GitHub Activity
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Structural Telemetry Container */}
      <div className="flex flex-col border border-gray-200 dark:border-[#1F1F1F] rounded-md overflow-hidden bg-white dark:bg-[#0A0A0A]">
        {/* Header Strip with System Metadata */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
          <div className="flex items-center gap-2">
            <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
              Contribution Heatmap
            </h2>
            <span className="hidden sm:inline font-tech text-[10px] text-gray-400 dark:text-gray-500 font-mono">
              @Shaurya01836
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/Shaurya01836"
              target="_blank"
              rel="noopener noreferrer me"
              className="font-tech text-[10px] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Heatmap Viewport */}
        <div className="p-6 overflow-x-auto flex justify-center items-center bg-white dark:bg-[#0A0A0A]">
          <GitHubCalendar
            username="Shaurya01836"
            blockSize={13}
            blockMargin={4}
            fontSize={13}
            colorScheme={darkMode ? "dark" : "light"}
            theme={{
              light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
              dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            }}
            style={{
              color: darkMode ? "#9ca3af" : "#4b5563",
              fontFamily: "JetBrains Mono, monospace",
            }}
          />
        </div>

        {/* Bottom Telemetry Footer */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-[#1F1F1F] bg-gray-50/50 dark:bg-[#0D0D0D] flex items-center justify-between text-[10px] font-tech text-gray-400 dark:text-gray-500 select-none">
          <span>AUDIT : PUBLIC COMMITS & REPOSITORIES</span>
          <span>SOURCE : API.GITHUB.COM</span>
        </div>
      </div>
    </div>
  );
};

GithubGraph.propTypes = {
  darkMode: PropTypes.bool,
};

export default GithubGraph;