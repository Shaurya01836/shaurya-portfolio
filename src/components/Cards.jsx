import PropTypes from "prop-types";
import { TechImage } from "./TechImage";
import { Link } from "react-router-dom";
import { RiExternalLinkLine, RiGithubLine } from "@remixicon/react";

function Cards({
  title,
  description,
  techStack = [],
  liveDemo,
  githubUrl,
  to,
  image,
  className = "",
  onClick,
  ariaLabel,
}) {
  const CardBody = () => (
    <>
      {/* Image Preview Container with 1px bottom border */}
      <div className="w-full h-44 sm:h-52 overflow-hidden relative bg-black/[0.04] dark:bg-white/[0.02] border-b border-[var(--line)]">
        <TechImage
          src={image}
          alt={`${title} preview`}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5 sm:p-6 gap-3 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5] group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Direct Links */}
          {(liveDemo || githubUrl) && (
            <div
              className="flex items-center gap-1.5 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} source on GitHub`}
                  className="p-1 text-gray-400 hover:text-black dark:hover:text-[#CDBDFF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
                >
                  <RiGithubLine size={16} />
                </a>
              )}
              {liveDemo && (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${title} live demo`}
                  className="p-1 text-gray-400 hover:text-black dark:hover:text-[#CDBDFF] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
                >
                  <RiExternalLinkLine size={16} />
                </a>
              )}
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-[#71717A] line-clamp-2 leading-relaxed flex-grow font-normal">
          {description}
        </p>

        {/* Square Tech Chips with 1px border */}
        {techStack && techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
            {techStack.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="font-tech text-[10px] sm:text-[11px] px-2 py-0.5 rounded-none bg-black/[0.02] dark:bg-white/[0.03] text-gray-600 dark:text-[#71717A] border border-[var(--line)] uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const containerClasses = `group relative flex flex-col rounded-none border border-[var(--line)] bg-[var(--surface)] overflow-hidden transition-colors duration-150 hover:border-gray-400 dark:hover:border-white/30 hover:bg-black/[0.015] dark:hover:bg-white/[0.015] ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || `Open details for ${title}`}
        className={`${containerClasses} text-left w-full h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]`}
      >
        <CardBody />
      </button>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        aria-label={ariaLabel || `View ${title}`}
        className={`${containerClasses} block w-full h-full focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]`}
      >
        <CardBody />
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      <CardBody />
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string),
  liveDemo: PropTypes.string,
  githubUrl: PropTypes.string,
  to: PropTypes.string,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default Cards;
