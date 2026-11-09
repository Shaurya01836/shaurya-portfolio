import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Technical blueprint scroll progress indicator line.
 * Soft lavender accent #CDBDFF, respects reduced motion.
 */
export const MagneticScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#CDBDFF] origin-left z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default MagneticScrollIndicator;
