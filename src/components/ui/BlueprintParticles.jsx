import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Blueprint Celebration Particles
 * Emits a delicate cascade of tiny lavender geometric particles
 * (blueprint squares, rotated diamonds, and plus crosshairs) on click.
 */
export const BlueprintParticles = ({ trigger, count = 14, className = "" }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!trigger) return;

    const generated = Array.from({ length: count }, (_, i) => {
      // Golden ratio angle distribution with subtle randomness
      const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const distance = 22 + Math.random() * 42;
      const x = Math.cos(angle) * distance;
      // Slight upward gravity bias
      const y = Math.sin(angle) * distance - 10;
      const shapeType = i % 4; // 0: square, 1: diamond, 2: plus, 3: emerald accent
      const rot = (Math.random() - 0.5) * 220;

      return {
        id: `${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        shapeType,
        rot,
      };
    });

    setParticles(generated);
    const timeout = setTimeout(() => {
      setParticles([]);
    }, 750);

    return () => clearTimeout(timeout);
  }, [trigger, count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-visible z-50 flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              scale: [0, 1.3, 0.9, 0],
              opacity: [1, 1, 0.85, 0],
              rotate: p.rot,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.68,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          >
            {p.shapeType === 0 && (
              // Lavender Blueprint Square
              <span className="w-1.5 h-1.5 bg-[#CDBDFF] shadow-[0_0_6px_rgba(205,189,255,0.7)]" />
            )}
            {p.shapeType === 1 && (
              // Lavender Diamond
              <span className="w-1.5 h-1.5 bg-[#E8DEFF] rotate-45 shadow-[0_0_5px_rgba(232,222,255,0.6)]" />
            )}
            {p.shapeType === 2 && (
              // Blueprint Plus Crosshair
              <span className="font-tech text-[10px] leading-none text-[#CDBDFF] font-bold select-none">
                +
              </span>
            )}
            {p.shapeType === 3 && (
              // Emerald Verification Accent Dot
              <span className="w-1 h-1 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            )}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

BlueprintParticles.propTypes = {
  trigger: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string]),
  count: PropTypes.number,
  className: PropTypes.string,
};

export default BlueprintParticles;

