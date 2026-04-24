import PropTypes from "prop-types";

const BentoCard = ({ children, className = "", title, description, header, href, onClick, ariaLabel }) => {
  const CardContent = (
    <>
      <div className="w-full h-full flex flex-col overflow-hidden">
       {/* Skeleton/Illustration Area */}
<div className="relative w-full flex-1 min-h-[160px] overflow-hidden flex items-center justify-center p-4">
  {children || header}
</div>

        {/* Content Area */}
        <div className="p-6 pt-0 mt-auto">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </>
  );

  const baseStyles = "group relative flex flex-col rounded-xl border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50";

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

  return (
    <div className={`${baseStyles} ${className}`}>
      {CardContent}
    </div>
  );
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
};

export default BentoCard;