import PropTypes from "prop-types";

/**
 * Thin segmented status strip with 3 cells separated by vertical hairlines.
 * Uses square bullets and factual developer information.
 */
export const StatusStrip = ({ className = "" }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 border-t border-[var(--line)] font-tech text-xs ${className}`}>
      {/* Cell 1: Availability */}
      <div className="flex items-center gap-2.5 px-6 py-3.5 border-b sm:border-b-0 sm:border-r border-[var(--line)] text-gray-800 dark:text-gray-300">
        <span className="w-1.5 h-1.5 bg-[#CDBDFF] shrink-0" aria-hidden="true" />
        <span className="tracking-wider uppercase text-[11px] font-medium">Available for work</span>
      </div>

      {/* Cell 2: Coordinates / Location */}
      <div className="flex items-center gap-2 px-6 py-3.5 border-b sm:border-b-0 sm:border-r border-[var(--line)] text-gray-500 dark:text-[#71717A] text-[11px] tracking-wider uppercase">
        <span>Jaipur, IN</span>
        <span className="opacity-40">·</span>
        <span>26.9124° N, 75.7873° E</span>
      </div>

      {/* Cell 3: Production Traction */}
      <a
        href="https://crickauction.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3.5 text-gray-500 dark:text-[#71717A] text-[11px] tracking-wider uppercase hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
        title="View live production app CrickAuction (2.41M+ 30-day pageviews)"
      >
        <span className="text-gray-900 dark:text-gray-200 font-medium">2.41M+ Views</span>
        <span className="opacity-40">·</span>
        <span>CrickAuction ↗</span>
      </a>
    </div>
  );
};

StatusStrip.propTypes = {
  className: PropTypes.string,
};

export default StatusStrip;

