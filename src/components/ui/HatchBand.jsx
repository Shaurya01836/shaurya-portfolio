import PropTypes from "prop-types";
import Crosshair from "./Crosshair";

/**
 * Hatched Band divider strip (~72px on desktop, ~40px on mobile)
 * Inside frame, filled with faint 45-degree diagonal stripes.
 * Full hairline on top and bottom with crosshairs at corners.
 */
export const HatchBand = ({ className = "" }) => {
  return (
    <div className={`relative w-full border-t border-b border-[var(--line)] ${className}`}>
      <div className="relative max-w-[1160px] mx-auto border-x border-[var(--line)] h-10 sm:h-16 md:h-20 bg-hatch overflow-visible">
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
      </div>
    </div>
  );
};

HatchBand.propTypes = {
  className: PropTypes.string,
};

export default HatchBand;

