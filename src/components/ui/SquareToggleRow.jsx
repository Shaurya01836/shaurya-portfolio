import { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SquareToggleRow
 * Accordion row with square 1px-bordered "+" box on the right.
 * Expands detail inline without leaving the grid.
 */
export const SquareToggleRow = ({
  title,
  subtitle,
  meta,
  defaultOpen = false,
  children,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`border-b border-[var(--line)] transition-colors ${
        isOpen ? "bg-black/[0.02] dark:bg-white/[0.02]" : "hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
      } ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 flex-grow">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
              {title}
            </h3>
            {subtitle && (
              <span className="text-xs sm:text-sm text-gray-500 dark:text-[#71717A] font-tech">
                · {subtitle}
              </span>
            )}
          </div>
          {meta && (
            <div className="font-tech text-xs text-gray-500 dark:text-[#71717A] shrink-0 tracking-wide uppercase">
              {meta}
            </div>
          )}
        </div>

        {/* Square 1px-bordered toggle box */}
        <div className="w-6 h-6 shrink-0 border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center font-tech text-xs text-gray-600 dark:text-gray-300">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.15 }}
            className="inline-block text-sm leading-none select-none"
            aria-hidden="true"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Expandable Content Inline */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 border-t border-[var(--line)] bg-black/[0.01] dark:bg-black/[0.2]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SquareToggleRow.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  meta: PropTypes.string,
  defaultOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SquareToggleRow;

