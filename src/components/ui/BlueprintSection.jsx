import PropTypes from "prop-types";
import Crosshair from "./Crosshair";
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
        {/* Top-Left Crosshair */}
        {!noTopBorder && (
          <div className="absolute -top-[5.5px] -left-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
            <Crosshair />
          </div>
        )}
        {/* Top-Right Crosshair */}
        {!noTopBorder && (
          <div className="absolute -top-[5.5px] -right-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
            <Crosshair />
          </div>
        )}

        {/* Floating Left Gutter Annotation */}
        {leftAnnotation && (
          <div className="hidden xl:flex absolute right-full mr-3 sm:mr-5 top-16 z-30 pointer-events-none">
            <HandwrittenAnnotation
              lines={leftAnnotation.lines}
              text={leftAnnotation.text}
              arrow={leftAnnotation.arrow || "down-right"}
              align="right"
              className={leftAnnotation.className}
            />
          </div>
        )}

        {/* Floating Right Gutter Annotation */}
        {rightAnnotation && (
          <div className="hidden xl:flex absolute left-full ml-3 sm:ml-5 top-16 z-30 pointer-events-none">
            <HandwrittenAnnotation
              lines={rightAnnotation.lines}
              text={rightAnnotation.text}
              arrow={rightAnnotation.arrow || "down-left"}
              align="left"
              className={rightAnnotation.className}
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
  }),
  rightAnnotation: PropTypes.shape({
    lines: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    arrow: PropTypes.oneOf(["down-left", "down-right", "up-left", "up-right", "none"]),
    className: PropTypes.string,
  }),
};

export default BlueprintSection;
