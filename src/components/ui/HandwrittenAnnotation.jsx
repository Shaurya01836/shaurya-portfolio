import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { MultipleCrossCancelIcon } from "../icons";
import { playPopSound, playCloseSound } from "../../utils/sound";

/**
 * Curated Behind-the-Scenes Easter Eggs
 * Tailored fun facts and engineering stories for each section's annotation.
 */
const DEFAULT_EASTER_EGGS = {
  crickauction: {
    tag: "BEHIND THE CODE",
    title: "The 2.4M Hits Weekend",
    story:
      "Built CrickAuction during the IPL season for college friends. A Twitter thread went viral and traffic spiked to 2.4M+ requests in 48 hours. Had to rewrite query batching on the fly at 3 AM to avoid Firestore bottlenecks!",
    funFact: "Zero server cost thanks to Cloudflare edge caching + Firebase optimization.",
  },
  year: {
    tag: "CAREER DEV LOG",
    title: "From 'Hello World' to Production",
    story:
      "Every year on this timeline represents breaking things in development and learning to never do it in production. My first real-world bug dropped a database table... in a local Docker container, thankfully!",
    funFact: "Favorite stack evolutions: Raw Servlets → Spring Boot 3 → Next.js / Edge Workers.",
  },
  solved: {
    tag: "ALGORITHM LORE",
    title: "The 3 AM Graph Traversal",
    story:
      "Started competitive problem solving to build algorithmic intuition. Solved 150+ graph & dynamic programming problems. Now I can't look at a subway transit map without mentally computing Dijkstra's shortest path.",
    funFact: "Global Top 12% on LeetCode with 1,750+ contest rating.",
  },
  credentials: {
    tag: "HACKATHON WAR STORY",
    title: "36-Hour Hackathon Clutch",
    story:
      "At Smart India Hackathon internal rounds, our backend service crashed 20 minutes before our final demo. We hotfixed an asynchronous event queue with 3 minutes to spare. Won 1st place.",
    funFact: "Fueled by 4.5 Americanos and pure adrenaline.",
  },
  articles: {
    tag: "WHY I WRITE",
    title: "Writing to Debug Tomorrow",
    story:
      "I write technical guides whenever I spend more than 2 hours debugging something that wasn't in the official documentation. It's an open engineering diary for anyone facing the exact same walls.",
    funFact: "Every article code snippet is tested locally against real test suites.",
  },
};

/**
 * Helper to match text to a default easter egg if none explicitly passed
 */
const getEasterEggForText = (renderedLines) => {
  const combined = renderedLines.join(" ").toLowerCase();
  if (combined.includes("crickauction") || combined.includes("hits")) {
    return DEFAULT_EASTER_EGGS.crickauction;
  }
  if (combined.includes("shoot") || combined.includes("year")) {
    return DEFAULT_EASTER_EGGS.year;
  }
  if (combined.includes("solved") || combined.includes("medium")) {
    return DEFAULT_EASTER_EGGS.solved;
  }
  if (combined.includes("credentials") || combined.includes("hackathon")) {
    return DEFAULT_EASTER_EGGS.credentials;
  }
  if (combined.includes("articles") || combined.includes("build")) {
    return DEFAULT_EASTER_EGGS.articles;
  }
  return {
    tag: "ARCHITECT NOTE",
    title: "Blueprint Margin Note",
    story:
      "Handwritten margin notes throughout this portfolio reveal behind-the-scenes thoughts and technical details. Explore and click any annotation you find!",
    funFact: "Press Alt + D to launch the Figma Dev Mode inspector.",
  };
};

/**
 * Hand-drawn cursive blueprint annotation note with curved arrows
 * Features:
 * - Playful spring wiggle & doodle drawing on hover
 * - Click opens architect's handwritten sticky note with fun facts / behind-the-scenes stories
 * - Contextual cursor integration
 */
export const HandwrittenAnnotation = ({
  text,
  lines,
  arrow = "down-left",
  className = "",
  textClassName = "",
  arrowClassName = "",
  align = "left", // 'left' | 'right'
  easterEgg = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const noteRef = useRef(null);
  const renderedLines = lines || (text ? [text] : []);
  const isRightAligned = align === "right";

  const activeEgg = easterEgg || getEasterEggForText(renderedLines);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (noteRef.current && !noteRef.current.contains(e.target)) {
        playCloseSound();
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        playCloseSound();
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleToggleNote = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      playPopSound();
      setIsOpen(true);
    } else {
      playCloseSound();
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggleNote(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleToggleNote}
      onKeyDown={handleKeyDown}
      data-cursor="SECRET NOTE ✏️"
      aria-label={`Read behind-the-scenes note: ${renderedLines.join(" ")}`}
      className={`group relative inline-flex flex-col ${
        isRightAligned ? "items-end text-right" : "items-start text-left"
      } select-none cursor-pointer pointer-events-auto w-max max-w-[170px] xl:max-w-[195px] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] ${className}`}
    >
      {/* Hand-drawn cursive text note with playful spring wiggle */}
      <motion.div
        whileHover={{
          rotate: isRightAligned ? [-1, 2, -1.5, 0] : [1, -2, 1.5, 0],
          scale: 1.04,
          transition: { duration: 0.35, ease: "easeOut" },
        }}
        whileTap={{ scale: 0.97 }}
        className="relative"
      >
        {/* Playful Hand-Drawn Doodle Spark ✨ on Hover */}
        <svg
          viewBox="0 0 24 24"
          className={`absolute -top-3.5 ${
            isRightAligned ? "-left-4" : "-right-4"
          } w-4 h-4 text-[#CDBDFF] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-110 pointer-events-none`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Animated Hand-Drawn Spark Star */}
          <path d="M12 2 L14 8 L20 10 L15 14 L17 21 L12 17 L7 21 L9 14 L4 10 L10 8 Z" />
        </svg>

        <div
          className={`font-handwriting text-lg sm:text-xl md:text-[21px] leading-[1.12] text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-[#E8DEFF] transition-colors duration-200 tracking-wide ${textClassName}`}
        >
          {renderedLines.map((line, idx) => (
            <div key={idx} className="whitespace-nowrap">
              {line}
            </div>
          ))}
        </div>

        {/* Playful hint on hover */}
        <span
          className={`inline-block font-handwriting text-xs text-[#CDBDFF] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-0.5 tracking-normal ${
            isRightAligned ? "text-right" : "text-left"
          }`}
        >
          (click me)
        </span>
      </motion.div>

      {/* Hand-drawn curved arrow with hover bounce */}
      {arrow !== "none" && (
        <svg
          viewBox="0 0 44 44"
          className={`w-8 h-8 sm:w-9 sm:h-9 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-[#CDBDFF] stroke-current fill-none mt-0.5 transition-all duration-300 group-hover:scale-105 ${
            isRightAligned ? "mr-2 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"
          } ${arrowClassName}`}
          aria-hidden="true"
        >
          {arrow === "down-right" && (
            <g strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 18 4 C 18 18, 24 30, 36 30" />
              <path d="M 27 23 L 36 30 L 30 36" />
            </g>
          )}

          {arrow === "down-left" && (
            <g strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 26 4 C 26 18, 20 30, 8 30" />
              <path d="M 17 23 L 8 30 L 14 36" />
            </g>
          )}

          {arrow === "up-right" && (
            <g strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 18 40 C 18 26, 24 14, 36 14" />
              <path d="M 27 21 L 36 14 L 30 8" />
            </g>
          )}

          {arrow === "up-left" && (
            <g strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 26 40 C 26 26, 20 14, 8 14" />
              <path d="M 17 21 L 8 14 L 14 8" />
            </g>
          )}
        </svg>
      )}

      {/* Architect's Handwritten Sticky Note (Easter Egg) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={noteRef}
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 8,
              rotate: isRightAligned ? -2 : 2,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: isRightAligned ? 1 : -1,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 6,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 26,
            }}
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-0 ${
              isRightAligned ? "left-full ml-3" : "right-full mr-3"
            } z-[9999] w-72 sm:w-80 p-4 sm:p-5 rounded-none bg-[#FFFDF7] dark:bg-[#13121D] text-zinc-900 dark:text-zinc-100 border border-amber-300/80 dark:border-[#CDBDFF]/40 shadow-[0_16px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.5)] select-text text-left cursor-default`}
          >
            {/* Architect's Washi Tape Strip at top */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/60 dark:bg-white/10 backdrop-blur-sm border-t border-b border-amber-400/30 dark:border-white/20 rotate-1 pointer-events-none" />

            {/* Sticky Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/60 dark:border-white/10">
              <span className="font-tech text-[10px] font-bold tracking-wider uppercase text-amber-700 dark:text-[#CDBDFF]">
                [{activeEgg.tag || "EASTER EGG // DEV LOG"}]
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playCloseSound();
                  setIsOpen(false);
                }}
                className="p-1 text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors focus:outline-none"
                title="Close Note (Esc)"
                aria-label="Close Note"
              >
                <MultipleCrossCancelIcon width={14} height={14} />
              </button>
            </div>

            {/* Note Title */}
            <h4 className="font-handwriting text-xl sm:text-2xl text-zinc-900 dark:text-white leading-tight mb-2">
              {activeEgg.title}
            </h4>

            {/* Story / Behind the Scenes */}
            <p className="font-sans text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
              {activeEgg.story}
            </p>

            {/* Fun Fact Pill */}
            {activeEgg.funFact && (
              <div className="p-2.5 bg-amber-100/70 dark:bg-white/[0.04] border border-amber-200 dark:border-white/10 flex items-start gap-2">
                <span className="text-xs">💡</span>
                <div className="flex flex-col">
                  <span className="font-tech text-[9px] uppercase tracking-wider text-amber-800 dark:text-[#CDBDFF] font-semibold">
                    Fun Fact
                  </span>
                  <span className="font-sans text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug">
                    {activeEgg.funFact}
                  </span>
                </div>
              </div>
            )}

            {/* Footer note */}
            <div className="mt-3 pt-2 border-t border-amber-200/40 dark:border-white/5 flex items-center justify-between text-[10px] font-tech text-zinc-400">
              <span>[esc to close]</span>
              <span className="font-handwriting text-xs text-zinc-500">— Shaurya</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

HandwrittenAnnotation.propTypes = {
  text: PropTypes.string,
  lines: PropTypes.arrayOf(PropTypes.string),
  arrow: PropTypes.oneOf(["down-left", "down-right", "up-left", "up-right", "none"]),
  className: PropTypes.string,
  textClassName: PropTypes.string,
  arrowClassName: PropTypes.string,
  align: PropTypes.oneOf(["left", "right"]),
  easterEgg: PropTypes.shape({
    tag: PropTypes.string,
    title: PropTypes.string.isRequired,
    story: PropTypes.string.isRequired,
    funFact: PropTypes.string,
  }),
};

export default HandwrittenAnnotation;
