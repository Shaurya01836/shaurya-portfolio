import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { GitHubCalendar } from "react-github-calendar";
import { RiGithubLine, RiExternalLinkLine } from "@remixicon/react";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";

const GITHUB_USERNAME = "Shaurya01836";

const GithubActivity = ({ darkMode }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <BlueprintSection id="github-activity" ariaLabel="GitHub Contributions">
      <div ref={containerRef}>
        {/* 2-cell Section Header */}
        <SectionHeader
          number="05"
          label="CONTRIBUTIONS"
          title="Open-Source"
          accentWord="Activity"
          description="Public code releases, repository commits, and ongoing project iterations"
        />

        {/* Contribution Graph Box */}
        <div className="p-6 sm:p-8 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="overflow-x-auto pb-2 flex justify-center">
            {shouldRender ? (
              <div className="min-w-[650px] flex justify-center py-2">
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  colorScheme={darkMode ? "dark" : "light"}
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  style={{
                    color: darkMode ? "#9ca3af" : "#4b5563",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                />
              </div>
            ) : (
              <div className="h-32 w-full flex items-center justify-center text-xs font-tech text-gray-400">
                Loading contribution calendar...
              </div>
            )}
          </div>
        </div>

        {/* Meta Bar */}
        <div className="px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-tech text-xs text-gray-500 dark:text-[#71717A]">
          <div className="flex items-center gap-2">
            <span>Profile:</span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <RiGithubLine size={14} />
              <span>@{GITHUB_USERNAME}</span>
              <RiExternalLinkLine size={12} />
            </a>
          </div>
          <div className="text-[11px] text-gray-400">
            Public contributions over the past year
          </div>
        </div>
      </div>
    </BlueprintSection>
  );
};

GithubActivity.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default GithubActivity;
