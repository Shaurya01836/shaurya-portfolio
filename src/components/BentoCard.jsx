import PropTypes from "prop-types";
import { TechCornerTicks } from "./TechGridElements";

const BentoCard = ({
  children,
  className = "",
  title,
  description,
  header,
  href,
  onClick,
  ariaLabel,
  index,
  year,
  event,
}) => {
  const CardContent = (
    <div className="w-full h-full flex flex-col overflow-hidden relative">
      <TechCornerTicks />

      {/* Top Technical Metadata Strip */}
      {(index !== undefined || year || event) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-[#1F1F1F] bg-gray-50/80 dark:bg-[#121212] select-none text-[11px] font-tech text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2">
            {event && (
              <span className="truncate max-w-[140px] sm:max-w-[200px] font-medium text-gray-600 dark:text-gray-400">
                {event}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cover Image / Header Area */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-gray-100 dark:bg-[#0D0D0D] border-b border-gray-200 dark:border-[#1F1F1F]">
        {children || header}
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow text-left gap-1.5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  const baseStyles =
    "group relative flex flex-col rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] overflow-hidden text-left transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50/40 dark:hover:bg-[#111111] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
      >
        {CardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel || title}
        className={`${baseStyles} ${className}`}
      >
        {CardContent}
      </button>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{CardContent}</div>;
};

BentoCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  header: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  index: PropTypes.number,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  event: PropTypes.string,
};

export default BentoCard;