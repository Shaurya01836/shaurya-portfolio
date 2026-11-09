import { motion } from "framer-motion";

/**
 * Signature Figma-style selection box with cursor label around name.
 * Cursor & label positioned at bottom-right corner to leave the name fully visible.
 * Uses soft lavender accent #CDBDFF.
 */
export const NameSelectionDoodle = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
      {/* Selection Outline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute -inset-1 sm:-inset-1.5 border border-[#CDBDFF] rounded-[1px]"
      />

      {/* 4 Corner Bounding Box Handles */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 350, damping: 25 }}
        className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 350, damping: 25 }}
        className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 350, damping: 25 }}
        className="absolute -bottom-1.5 -left-1.5 sm:-bottom-2 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 350, damping: 25 }}
        className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--bg-primary)] border border-[#CDBDFF] rounded-[0.5px] z-10"
      />

      {/* Animated Figma Cursor with role tag at bottom-right */}
      <motion.div
        initial={{ x: 14, y: 14, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{
          duration: 0.45,
          delay: 0.25,
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        className="absolute -bottom-6 sm:-bottom-8 -right-14 z-20 flex items-center gap-1 pointer-events-none"
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
