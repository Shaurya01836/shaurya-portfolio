import { motion } from "framer-motion";

/**
 * Signature Figma-style selection box with cursor label around name.
 * Cursor & label positioned at bottom-right corner to leave the name fully visible.
 * Uses soft lavender accent #CDBDFF.
 */
export const NameSelectionDoodle = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
      {/* 1. Selection Marquee & Fill - Sweeps from left to right covering the name */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute -inset-1 sm:-inset-1.5 border border-[#CDBDFF] bg-[#CDBDFF]/10 rounded-[1px]"
      />

      {/* 2. Top-Left & Bottom-Left Handles (pop in at start of selection) */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 380, damping: 25 }}
        className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.22, type: "spring", stiffness: 380, damping: 25 }}
        className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />

      {/* 3. Top-Right & Bottom-Right Handles (pop in as marquee finishes covering the name) */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.68, type: "spring", stiffness: 380, damping: 25 }}
        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.74, type: "spring", stiffness: 380, damping: 25 }}
        className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />

      {/* 4. Animated Figma Cursor with role tag - Slides in as selection locks in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, x: -16, y: -8 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.45,
          delay: 0.7,
          type: "spring",
          stiffness: 240,
          damping: 20,
        }}
        className="absolute top-6 -right-14 sm:top-auto sm:-bottom-8 sm:-right-14 z-20 flex items-center gap-1 pointer-events-none"
      >
        {/* Figma Pointer Cursor */}
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#CDBDFF] drop-shadow-xs shrink-0"
          viewBox="0 0 24 24"
        >
          <path d="M4 2 L19 12 L11 14 L8 22 Z" />
        </svg>

        {/* Clean Pill Tag in Monospace */}
        <span className="px-1.5 py-0.5 rounded-[1px] bg-[#CDBDFF] text-black font-tech text-[10px] font-semibold tracking-wider uppercase leading-none shadow-xs whitespace-nowrap">
          DEV
        </span>
      </motion.div>
    </div>
  );
};

export default NameSelectionDoodle;
