import PropTypes from "prop-types";
import Crosshair from "./Crosshair";

/**
 * BlueprintSection
 * - Outer wrapper spans 100vw edge-to-edge with 1px border-t border-[var(--line)].
 * - Centered frame container spans max-w-[1160px] with border-x border-[var(--line)].
 * - Crisp 11x11px SVG '+' crosshairs placed at intersection of border-t and border-x.
 */
export const BlueprintSection = ({
  id,
  children,
  className = "",
  innerClassName = "",
  noTopBorder = false,
  noBottomBorder = false,
  ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${noTopBorder ? "" : "border-t border-[var(--line)]"} ${noBottomBorder ? "" : ""} ${className}`}
    >
      <div className={`relative max-w-[1160px] mx-auto border-x border-[var(--line)] ${innerClassName}`}>
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
};

export default BlueprintSection;

