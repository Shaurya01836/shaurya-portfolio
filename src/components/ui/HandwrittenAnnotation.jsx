import PropTypes from "prop-types";

/**
 * Hand-drawn cursive blueprint annotation note with curved arrows
 * designed to sit in the outer gutters / margins on the left or right side.
 */
export const HandwrittenAnnotation = ({
  text,
  lines,
  arrow = "down-left",
  className = "",
  textClassName = "",
  arrowClassName = "",
  align = "left", // 'left' | 'right'
}) => {
  const renderedLines = lines || (text ? [text] : []);
  const isRightAligned = align === "right";

  return (
    <div
      className={`inline-flex flex-col ${
        isRightAligned ? "items-end text-right" : "items-start text-left"
      } select-none pointer-events-none w-max max-w-[200px] ${className}`}
    >
      {/* Hand-drawn cursive text note */}
      <div
        className={`font-handwriting text-lg sm:text-xl md:text-[22px] leading-[1.15] text-gray-400 dark:text-gray-400 font-medium ${textClassName}`}
      >
        {renderedLines.map((line, idx) => (
          <div key={idx} className="whitespace-nowrap">
            {line}
          </div>
        ))}
      </div>

      {/* Hand-drawn curved arrow */}
      {arrow !== "none" && (
        <svg
          viewBox="0 0 44 44"
          className={`w-9 h-9 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500 stroke-current fill-none mt-1 ${
            isRightAligned ? "mr-2" : "ml-2"
          } ${arrowClassName}`}
          aria-hidden="true"
        >
          {arrow === "down-right" && (
            <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 4 C 12 18, 20 28, 36 28" />
              <path d="M 27 22 L 36 28 L 27 34" />
            </g>
          )}

          {arrow === "down-left" && (
            <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 34 4 C 32 18, 24 28, 8 28" />
              <path d="M 17 22 L 8 28 L 17 34" />
            </g>
          )}

          {arrow === "up-right" && (
            <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 38 C 12 24, 20 14, 36 14" />
              <path d="M 27 8 L 36 14 L 27 20" />
            </g>
          )}

          {arrow === "up-left" && (
            <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 34 38 C 32 24, 24 14, 8 14" />
              <path d="M 17 8 L 8 14 L 17 20" />
            </g>
          )}
        </svg>
      )}
    </div>
  );
};

HandwrittenAnnotation.propTypes = {
  text: PropTypes.string,
  lines: PropTypes.arrayOf(PropTypes.string),
  arrow: PropTypes.oneOf(["down-left", "down-right", "up-left", "up-right", "none"]),
  className: PropTypes.string,
  textClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  align: PropTypes.oneOf(["left", "right"]),
};

export default HandwrittenAnnotation;
