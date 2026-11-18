import PropTypes from "prop-types";
import Crosshair from "./Crosshair";
import HandwrittenAnnotation from "./HandwrittenAnnotation";

/**
 * Hatched Band divider strip (~72px on desktop, ~40px on mobile)
 * Inside frame, filled with faint 45-degree diagonal stripes.
 * Full hairline on top and bottom with crosshairs at corners.
 * Side gutters: optionally displays floating handwritten notes on the left or right side.
 */
export const HatchBand = ({
  className = "",
  leftAnnotation = null,
  rightAnnotation = null,
}) => {
  return (
    <div className={`relative w-full border-t border-b border-[var(--line)] ${className}`}>
      <div className="relative max-w-5xl mx-auto border-x border-[var(--line)] h-10 sm:h-14 md:h-16 bg-hatch overflow-visible">
        {/* Top-Left Crosshair */}
        <div className="absolute -top-[5.5px] -left-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>
        {/* Top-Right Crosshair */}
        <div className="absolute -top-[5.5px] -right-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>
        {/* Bottom-Left Crosshair */}
        <div className="absolute -bottom-[5.5px] -left-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>
        {/* Bottom-Right Crosshair */}
        <div className="absolute -bottom-[5.5px] -right-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>

        {/* Floating Left Gutter Annotation */}
        {leftAnnotation && (
          <div className="hidden xl:flex absolute right-full mr-3 sm:mr-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
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
          <div className="hidden xl:flex absolute left-full ml-3 sm:ml-5 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <HandwrittenAnnotation
              lines={rightAnnotation.lines}
              text={rightAnnotation.text}
              arrow={rightAnnotation.arrow || "down-left"}
              align="left"
              className={rightAnnotation.className}
            />
          </div>
        )}
      </div>
    </div>
  );
};

HatchBand.propTypes = {
  className: PropTypes.string,
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

export default HatchBand;
