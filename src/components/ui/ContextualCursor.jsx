import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export const ContextualCursor = () => {
  const [badgeText, setBadgeText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // High-performance motion values that update without triggering component re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Silky spring physics for smooth trailing companion effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const currentTextRef = useRef("");

  useEffect(() => {
    // Detect touch-only screens (mobile/tablet) to prevent ghost cursor
    if (typeof window !== "undefined") {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);
      if (isTouch) return;
    }

    const handleMouseMove = (e) => {
      // Offset companion pill so it never covers the pointer tip
      mouseX.set(e.clientX + 16);
      mouseY.set(e.clientY + 14);

      // Check for contextual targets
      const target = e.target;
      if (!target) return;

      // 1. Check explicit data-cursor attribute
      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor");
        if (text && text !== currentTextRef.current) {
          currentTextRef.current = text;
          setBadgeText(text);
          setIsVisible(true);
        }
        return;
      }

      // 2. Automatic context detection based on element types
      const link = target.closest("a");
      const button = target.closest("button");
      const card = target.closest(".group");

      if (link) {
        const href = link.getAttribute("href") || "";
        let autoText = "VISIT ↗";
        if (href.includes("github.com")) autoText = "GITHUB ↗";
        else if (href.includes("linkedin.com")) autoText = "LINKEDIN ↗";
        else if (href.includes("x.com") || href.includes("twitter.com")) autoText = "X.COM ↗";
        else if (href.startsWith("mailto:")) autoText = "SEND EMAIL";
        else if (href.includes("drive.google.com") || href.includes("resume")) autoText = "PDF · 1 PAGE";

        if (autoText !== currentTextRef.current) {
          currentTextRef.current = autoText;
          setBadgeText(autoText);
          setIsVisible(true);
        }
        return;
      }

      if (button) {
        const ariaLabel = (button.getAttribute("aria-label") || "").toLowerCase();
        let autoText = "CLICK";
        if (ariaLabel.includes("theme")) autoText = "THEME";
        else if (ariaLabel.includes("sound")) autoText = "AUDIO";
        else if (ariaLabel.includes("dev")) autoText = "DEV MODE";
        else if (ariaLabel.includes("close")) autoText = "CLOSE";
        else if (ariaLabel.includes("inspect")) autoText = "INSPECT";

        if (autoText !== currentTextRef.current) {
          currentTextRef.current = autoText;
          setBadgeText(autoText);
          setIsVisible(true);
        }
        return;
      }

      if (card && card.closest("#projects, #blogs, #latest-blogs")) {
        const autoText = "EXPLORE ↗";
        if (autoText !== currentTextRef.current) {
          currentTextRef.current = autoText;
          setBadgeText(autoText);
          setIsVisible(true);
        }
        return;
      }

      // If not hovering any interactive context, hide companion badge
      if (currentTextRef.current !== "") {
        currentTextRef.current = "";
        setIsVisible(false);
      }
    };

    const handleMouseLeave = () => {
      currentTextRef.current = "";
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="fixed top-0 left-0 pointer-events-none z-[9998] select-none"
    >
      <AnimatePresence>
        {isVisible && badgeText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.65, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 4 }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 28,
            }}
            className="flex items-center px-2 py-0.5 rounded-[1px] bg-gray-950/90 dark:bg-[#0E0E13]/90 text-white dark:text-[#F4F4F5] border border-[#CDBDFF]/60 shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_8px_rgba(205,189,255,0.06)] backdrop-blur-xs whitespace-nowrap"
          >
            {/* Context Badge Text */}
            <span className="font-tech text-[10px] font-medium tracking-wider uppercase leading-none text-gray-200 dark:text-[#CDBDFF]">
              {badgeText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContextualCursor;

