import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden bg-gray-100 dark:bg-[#111111] select-none ${containerClassName}`}
    >
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 bg-gray-200/60 dark:bg-gray-800/40 animate-pulse pointer-events-none"
          />
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-[#111111] text-gray-400 dark:text-gray-600 font-tech text-xs">
          <span>Image preview unavailable</span>
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
