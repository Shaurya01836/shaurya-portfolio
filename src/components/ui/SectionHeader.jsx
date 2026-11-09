import PropTypes from "prop-types";

/**
 * Two-cell header row separated by a vertical hairline.
 * Left cell: Monospace uppercase label with soft lavender number + tight-tracked heading with ONE accent word.
 * Right cell: Muted description aligned to the bottom.
 */
export const SectionHeader = ({
  number,
  label,
  title,
  accentWord,
  titleAfter = "",
  description,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 border-b border-[var(--line)] ${className}`}>
      {/* Left Cell: Monospace Tag + Tight Tracking Heading */}
      <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-[var(--line)]">
        <div className="flex items-center gap-2 font-tech text-xs tracking-[0.08em] uppercase">
          <span className="text-[#CDBDFF] font-medium">{number}</span>
          <span className="text-gray-500 dark:text-[#71717A]">{label}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-[#F4F4F5] leading-tight">
          {title}{" "}
          {accentWord && <span className="text-[#CDBDFF]">{accentWord}</span>}
          {titleAfter && ` ${titleAfter}`}
        </h2>
      </div>

      {/* Right Cell: Short one-line description, aligned to bottom */}
      <div className="md:col-span-4 p-6 sm:p-8 flex flex-col justify-end bg-black/[0.015] dark:bg-white/[0.01]">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-[#71717A] font-tech leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  accentWord: PropTypes.string,
  titleAfter: PropTypes.string,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SectionHeader;

