import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Subtle 3D Tilt Card (Bencho-inspired)
 * - Maximum tilt angle: 4 degrees
 * - Disabled on touch devices and under prefers-reduced-motion
 * - Neutral specular rim highlight
 */
export const TiltCard = ({ children, className = "", maxTilt = 4, ...props }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    const isPointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanTilt(isPointerFine && !isReducedMotion);

    const handleMediaChange = () => {
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setCanTilt(fine && !reduced);
    };

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    mqReduced.addEventListener("change", handleMediaChange);
    return () => mqReduced.removeEventListener("change", handleMediaChange);
  }, []);

  const handleMouseMove = (e) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRatio = (x / rect.width - 0.5) * 2; // -1 to 1
    const yRatio = (y / rect.height - 0.5) * 2; // -1 to 1

    const rotY = xRatio * maxTilt;
    const rotX = -yRatio * maxTilt;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    if (!canTilt) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!canTilt) return;
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 900,
      }}
      className="w-full h-full"
      {...props}
    >
      <div
        style={{
          transform: canTilt && isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(4px)`
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`w-full h-full ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxTilt: PropTypes.number,
};

export default TiltCard;

