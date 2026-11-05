import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TechCornerTicks } from "./TechGridElements";

function Cards({
  title,
  description,
  techStack = [],
  liveDemo,
  to,
  image,
  className = "",
  onClick,
  ariaLabel,
  index,
}) {
  const CardContent = () => (
    <>
      <TechCornerTicks />
      
      {/* Top Technical Metadata Strip */}
      {index !== undefined && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-[#1F1F1F] bg-gray-50/80 dark:bg-[#121212] select-none text-[11px] font-tech text-gray-400 dark:text-gray-500">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            [0{index + 1}]
          </span>
        </div>
      )}

      {/* Image Container with 1px border divider */}
      <div className="w-full h-44 sm:h-48 bg-gray-100 dark:bg-[#0D0D0D] overflow-hidden relative border-b border-gray-200 dark:border-[#1F1F1F]">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt={`${title} project screenshot`}
          loading="lazy"
        />
      </div>

      {/* Title & Description Body */}
      <div className="flex flex-col flex-grow text-left p-4 gap-1.5">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm flex-grow leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Bottom Tech Stack Tags */}
      <div className="flex items-center justify-between p-4 pt-0 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="bg-gray-100 dark:bg-[#141414] border border-gray-200 dark:border-[#222222] font-tech text-[10px] px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const commonClasses = `relative group bg-white dark:bg-[#0A0A0A] text-black dark:text-gray-100 w-full rounded-md border border-gray-200 dark:border-[#1F1F1F] flex flex-col overflow-hidden transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50/40 dark:hover:bg-[#111111] select-none ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || `Open details for ${title}`}
        className={`${commonClasses} text-left`}
      >
        <CardContent />
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={commonClasses}>
        <CardContent />
      </Link>
    );
  }

  return (
    <a
      href={liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className={commonClasses}
    >
      <CardContent />
    </a>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string),
  liveDemo: PropTypes.string,
  to: PropTypes.string,
  image: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  index: PropTypes.number,
};

export default Cards;
