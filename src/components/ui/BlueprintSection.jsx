import PropTypes from "prop-types";
import HandwrittenAnnotation from "./HandwrittenAnnotation";

/**
 * BlueprintSection
 * - Outer wrapper spans 100vw edge-to-edge with 1px border-t border-[var(--line)].
 * - Centered frame container spans max-w-5xl with border-x border-[var(--line)].
 * - Crisp 11x11px SVG '+' crosshairs placed at intersection of border-t and border-x.
 * - Supports floating handwritten sketch notes in the left/right outer gutters.
 */
export const BlueprintSection = ({
  id,
  children,
  className = "",
  innerClassName = "",
  noTopBorder = false,
  noBottomBorder = false,
  ariaLabel,
  leftAnnotation = null,
  rightAnnotation = null,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${noTopBorder ? "" : "border-t border-[var(--line)]"} ${noBottomBorder ? "" : ""} ${className}`}
    >
      <div className={`relative max-w-5xl mx-auto border-x border-[var(--line)] overflow-visible ${innerClassName}`}>
        {/* Floating Left Gutter Annotation */}
        {leftAnnotation && (
          <div className="hidden min-[1200px]:flex absolute right-full mr-3 sm:mr-4 top-14 z-30 pointer-events-auto">
            <HandwrittenAnnotation
              lines={leftAnnotation.lines}
              text={leftAnnotation.text}
              arrow={leftAnnotation.arrow || "down-right"}
              align="right"
              className={leftAnnotation.className}
              easterEgg={leftAnnotation.easterEgg}
            />
          </div>
        )}

        {/* Floating Right Gutter Annotation */}
        {rightAnnotation && (
          <div className="hidden min-[1200px]:flex absolute left-full ml-3 sm:ml-4 top-14 z-30 pointer-events-auto">
            <HandwrittenAnnotation
              lines={rightAnnotation.lines}
              text={rightAnnotation.text}
              arrow={rightAnnotation.arrow || "down-left"}
              align="left"
              className={rightAnnotation.className}
              easterEgg={rightAnnotation.easterEgg}
            />
          </div>
        )}

        {children}
      </div>
    </section>
  );
};

BlueprintSection.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  innerClassName: PropTypes.string,
  noTopBorder: PropTypes.bool,
  noBottomBorder: PropTypes.bool,
  ariaLabel: PropTypes.string,
  leftAnnotation: PropTypes.shape({
    lines: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    arrow: PropTypes.oneOf(["down-left", "down-right", "up-left", "up-right", "none"]),
    className: PropTypes.string,
    easterEgg: PropTypes.object,
  }),
  rightAnnotation: PropTypes.shape({
    lines: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    arrow: PropTypes.oneOf(["down-left", "down-right", "up-left", "up-right", "none"]),
    className: PropTypes.string,
    easterEgg: PropTypes.object,
  }),
};

export default BlueprintSection;
