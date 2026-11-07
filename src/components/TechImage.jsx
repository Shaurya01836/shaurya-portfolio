import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { TechCornerTicks } from "./TechGridElements";

export const TechImage = ({
  src,
  alt = "",
  className = "",
  containerClassName = "",
  loading = "lazy",
  onClick,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  // Check if image is already cached/completed by browser
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden bg-gray-100 dark:bg-[#0D0D0D] select-none ${containerClassName}`}
    >
      <TechCornerTicks />

      {/* Minimal Digital Shimmer & Diagonal Hatch Skeleton (No text, no dots) */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
          >
            {/* Background Diagonal Technical Hatching */}
            <div className="absolute inset-0 tech-hatch-pattern opacity-80" />

            {/* Sweeping 45-degree Glass Shimmer Beam */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.12) 50%, transparent 80%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#111111] text-gray-400 dark:text-gray-600 font-tech text-xs">
          <span>SOURCE_UNAVAILABLE</span>
        </div>
      ) : (
        <img
          ref={(node) => {
            imgRef.current = node;
            if (node && node.complete && node.naturalWidth > 0 && !isLoaded) {
              setIsLoaded(true);
            }
          }}
          key={src}
          src={src}
          alt={alt}
          loading={priority ? "eager" : loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
        />
      )}
    </div>
  );
};

TechImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  onClick: PropTypes.func,
  priority: PropTypes.bool,
};

export default TechImage;
