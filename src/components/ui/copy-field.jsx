import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { RiFileCopyLine, RiCheckLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Technical blueprint Click-to-Copy field
 * - Copies text to clipboard on click / keyboard press
 * - Displays a sleek "Copied" confirmation with morphing icon
 * - Square, sharp UI with 1px border and accessible focus rings
 */
export const CopyField = ({ text, label = "EMAIL", className = "" }) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopy();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCopy}
      onKeyDown={handleKeyDown}
      aria-label={`Copy ${label}: ${text}`}
      className={`group relative inline-flex items-center justify-between gap-3 px-4 py-3 rounded-none border border-[var(--line)] bg-[var(--surface)] hover:border-gray-400 dark:hover:border-white/30 transition-colors cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] ${className}`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <span className="text-[11px] font-tech text-gray-400 dark:text-[#71717A] uppercase tracking-wider shrink-0">
          [{label}]:
        </span>
        <span className="text-xs sm:text-sm font-medium font-tech text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
          {text}
        </span>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 pl-1">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="copied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-tech font-medium"
            >
              <RiCheckLine size={15} />
              <span>COPIED!</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 text-xs font-tech transition-colors"
            >
              <RiFileCopyLine size={15} />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">COPY</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

CopyField.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default CopyField;
