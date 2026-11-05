import { motion } from "framer-motion";

/**
 * Animated Figma/Sketched selection box with cursor and handwritten tag that comes to the name
 * Dual palette: #C084FC (Lilac/Purple) & Pink
 */
export const NameSelectionDoodle = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible">
      {/* Sketched Hand-Drawn Selection Border in #C084FC */}
      <svg
        className="absolute -inset-x-1.5 -inset-y-1 w-[calc(100%+12px)] h-[calc(100%+8px)] pointer-events-none select-none z-0 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2,3 C 30,1 70,2 98,3 C 99,30 98,70 97,97 C 70,98 30,97 2,96 C 1,70 2,30 2,3 Z"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeInOut", delay: 0.2 }}
          fill="none"
          stroke="#C084FC"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="5 3"
          className="opacity-95"
        />
      </svg>

      {/* 4 Corner Selection Nodes (Design Tool handles) in #C084FC */}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 320 }}
        className="absolute -top-1.5 -left-2 w-1.5 h-1.5 bg-white dark:bg-[#0A0A0A] border border-[#C084FC] rounded-[1px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 320 }}
        className="absolute -top-1.5 -right-2 w-1.5 h-1.5 bg-white dark:bg-[#0A0A0A] border border-[#C084FC] rounded-[1px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 320 }}
        className="absolute -bottom-1.5 -left-2 w-1.5 h-1.5 bg-white dark:bg-[#0A0A0A] border border-[#C084FC] rounded-[1px] z-10"
      />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.95, type: "spring", stiffness: 320 }}
        className="absolute -bottom-1.5 -right-2 w-1.5 h-1.5 bg-white dark:bg-[#0A0A0A] border border-[#C084FC] rounded-[1px] z-10"
      />

      {/* Animated Cursor & Tag that glides into the name in #C084FC */}
      <motion.div
        initial={{ x: -45, y: -30, opacity: 0, scale: 0.7 }}
        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 0.65,
          delay: 0.45,
          type: "spring",
          stiffness: 180,
          damping: 14,
        }}
        className="absolute -top-6 -left-3 z-20 flex items-center gap-1"
      >
        {/* Cursor Pointer in #C084FC */}
        <svg
          className="w-4 h-4 fill-[#C084FC] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          viewBox="0 0 24 24"
        >
          <path d="M4 2 L19 12 L11 14 L8 22 Z" />
        </svg>

        {/* Handwritten Tag in #C084FC */}
        <motion.span
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: -4 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
          className="px-2 py-0.5 rounded-full bg-[#C084FC] text-gray-950 font-bold text-xs tracking-wide shadow-xs whitespace-nowrap leading-none flex items-center gap-1"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "14px" }}
        >
          <span>developer</span>
        </motion.span>
      </motion.div>

      {/* Sketched Marker Underline Accent in Pink & #C084FC */}
      <div className="absolute -bottom-2.5 left-0 w-full overflow-visible">
        <svg
          viewBox="0 0 240 14"
          className="w-full h-3 fill-none overflow-visible"
        >
          <motion.path
            d="M 2 7 C 60 12, 120 4, 180 8 C 205 10, 230 5, 238 7"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="stroke-pink-500 dark:stroke-pink-400"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          />
          <motion.path
            d="M 12 11 C 70 15, 140 8, 210 11"
            strokeWidth="1.5"
            strokeLinecap="round"
            stroke="#C084FC"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 0.85, opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Animated hand-drawn curved arrow pointing to the portrait photo
 * Dual palette: Pink text and #C084FC curved arrow
 */
export const AvatarArrowDoodle = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
    animate={{ opacity: 1, scale: 1, rotate: -3 }}
    transition={{ duration: 0.6, delay: 0.35, type: "spring" }}
    className="absolute top-1 sm:top-2 left-[122px] sm:left-[138px] z-20 pointer-events-none select-none whitespace-nowrap"
  >
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-start"
    >
      <svg
        viewBox="0 0 120 75"
        className="w-24 sm:w-28 h-16 sm:h-18 fill-none overflow-visible"
      >
        <text
          x="12"
          y="20"
          className="fill-pink-500 dark:fill-pink-400 font-bold stroke-none select-none"
          stroke="none"
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "21px",
          }}
          transform="rotate(6 40 20)"
        >
          that's me!
        </text>

        {/* Curved hand-drawn arrow pointing left towards the photo in #C084FC */}
        <motion.path
          d="M 68 34 C 55 48, 30 54, 8 48"
          stroke="#C084FC"
          strokeWidth="2.75"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.75, delay: 0.55, ease: "easeInOut" }}
        />

        {/* Arrow head pointing left in #C084FC */}
        <motion.path
          d="M 20 40 L 8 48 L 18 58"
          stroke="#C084FC"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: 1.15, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  </motion.div>
);
