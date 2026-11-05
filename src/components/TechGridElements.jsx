import PropTypes from "prop-types";

/**
 * Precision crosshair "+" alignment mark used at technical grid intersections.
 */
export const TechCrosshair = ({ className = "" }) => (
  <span
    className={`absolute pointer-events-none select-none font-tech text-[11px] leading-none text-gray-400 dark:text-gray-600 transition-colors z-20 ${className}`}
    aria-hidden="true"
  >
    +
  </span>
);

TechCrosshair.propTypes = {
  className: PropTypes.string,
};

/**
 * Precision industrial corner ticks for cards and framing containers.
 */
export const TechCornerTicks = ({ className = "" }) => (
  <div className={`pointer-events-none absolute inset-0 z-10 ${className}`} aria-hidden="true">
    {/* Top Left */}
    <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gray-400/40 dark:border-gray-500/40" />
    {/* Top Right */}
    <span className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gray-400/40 dark:border-gray-500/40" />
    {/* Bottom Left */}
    <span className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gray-400/40 dark:border-gray-500/40" />
    {/* Bottom Right */}
    <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gray-400/40 dark:border-gray-500/40" />
  </div>
);

TechCornerTicks.propTypes = {
  className: PropTypes.string,
};

/**
 * Subtle theme-aware diagonal hatch separator band.
 */
export const TechHatchDivider = ({ className = "" }) => (
  <div
    className={`w-full h-3.5 sm:h-4 border-y border-gray-200 dark:border-[#1F1F1F] tech-hatch-pattern select-none transition-colors overflow-hidden ${className}`}
    aria-hidden="true"
  />
);

TechHatchDivider.propTypes = {
  className: PropTypes.string,
};

/**
 * Subtle technical tag in monospace font.
 */
export const TechBadge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-tech text-[11px] rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/70 dark:bg-[#111111]/70 text-gray-600 dark:text-gray-400 select-none ${className}`}
  >
    {children}
  </span>
);

TechBadge.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

