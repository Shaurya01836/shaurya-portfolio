import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { RiGitBranchLine, RiGitCommitLine } from "@remixicon/react";
import { useLenis } from "lenis/react";

/**
 * Git Branch Timeline - Subtle Coding-Themed Scroll Indicator.
 * Intentionally subdued and low-contrast so it does NOT dominate or highlight over content.
 */
const COMMITS = [
  { id: "header", hash: "9a2f1b", tag: "init", message: "Initial commit: bio & hero overview" },
  { id: "skills", hash: "4c8e71", tag: "feat", message: "feat(skills): add technical stack & competencies" },
  { id: "projects", hash: "8f8aaf", tag: "feat", message: "feat(work): showcase engineering projects" },
  { id: "coding-profile", hash: "2b9d03", tag: "perf", message: "perf(stats): connect LeetCode & stats" },
  { id: "github", hash: "6d1a94", tag: "ci", message: "ci(github): live contribution activity graph" },
  { id: "experience", hash: "5e3b3f", tag: "docs", message: "docs(career): career timeline & roles" },
  { id: "achievements", hash: "3436c5", tag: "test", message: "test(awards): add hackathons & recognitions" },
  { id: "contact", hash: "c450eb", tag: "chore", message: "chore(contact): initialize contact dispatch" },
];

const CommitNode = ({ commit, index, mousePos, scrollProgress, onJump }) => {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const threshold = index / (COMMITS.length - 1);
  const isPassed = scrollProgress >= threshold - 0.04;
  const isCurrent =
    scrollProgress >= threshold - 0.05 &&
    (index === COMMITS.length - 1 || scrollProgress < (index + 1) / (COMMITS.length - 1) - 0.05);

  useEffect(() => {
    if (!ref.current || mousePos.y === null) {
      setOffsetY(0);
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const nodeCenterY = rect.top + rect.height / 2;
    const distance = mousePos.y - nodeCenterY;
    const maxDistance = 55;

    if (Math.abs(distance) < maxDistance) {
      const power = 1 - Math.abs(distance) / maxDistance;
      setOffsetY(distance * 0.25 * power);
    } else {
      setOffsetY(0);
    }
  }, [mousePos]);

  return (
    <motion.div
      ref={ref}
      animate={{ y: offsetY }}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.1 }}
      className="relative flex items-center gap-2.5 py-1.5 cursor-pointer group"
      onClick={() => onJump(commit.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Node Commit Bullet - Clearly Visible & Crisp */}
      <div className="relative flex items-center justify-center w-4 h-4">
        <div
          className={`rounded-full transition-all duration-300 z-20 ${
            isPassed
              ? "w-2 h-2 bg-slate-800 dark:bg-slate-200 border border-slate-800 dark:border-slate-200"
              : "w-2 h-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0A0A0A] group-hover:border-slate-600 dark:group-hover:border-slate-300"
          } ${isCurrent ? "scale-125 ring-2 ring-slate-400/50 dark:ring-slate-500/50" : ""}`}
        />
      </div>

      {/* Monospace commit hash prefix - Legible & Defined */}
      <span
        className={`font-tech text-[10px] transition-colors duration-200 select-none ${
          isPassed
            ? "text-slate-800 dark:text-slate-200 font-medium"
            : "text-gray-400 dark:text-gray-500 group-hover:text-slate-700 dark:group-hover:text-slate-200"
        }`}
      >
        {commit.hash}
      </span>

      {/* Floating Git Commit Tooltip Card on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -6, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-56 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-md shadow-xl text-left pointer-events-none z-50 select-none"
          >
            <div className="flex items-center justify-between text-[10px] font-tech text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-100">
                <RiGitCommitLine size={13} className="text-slate-600 dark:text-slate-400" />
                {commit.hash}
              </span>
              <span className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-[9px] font-medium uppercase text-slate-700 dark:text-slate-300">
                {commit.tag}
              </span>
            </div>

            <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
              {commit.message}
            </p>

            <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[9px] font-tech text-slate-400 dark:text-slate-500">
              <span>Jump to #{commit.id}</span>
              <span>↵</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

CommitNode.propTypes = {
  commit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  mousePos: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  scrollProgress: PropTypes.number.isRequired,
  onJump: PropTypes.func.isRequired,
};

export const MagneticScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 24,
    mass: 0.2,
  });

  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [rawProgress, setRawProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setRawProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: null, y: null });
  };

  const handleJumpToSection = (sectionId) => {
    if (lenis) {
      lenis.scrollTo(`#${sectionId}`, { offset: -20 });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Convert progress (0 to 1) into runner line height (0% to 100%)
  const branchLineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <aside
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-start select-none"
      aria-label="Git commit branch timeline"
    >
      {/* Clear, Legible Branch Header Label */}
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-gray-200 dark:border-[#222222] bg-white/95 dark:bg-[#111111]/95 shadow-xs font-tech text-[10px] text-gray-700 dark:text-gray-300 mb-2 select-none">
        <RiGitBranchLine size={12} className="text-gray-500 dark:text-gray-400" />
        <span className="font-semibold">main</span>
        <span className="text-gray-300 dark:text-gray-700">|</span>
        <span className="tabular-nums font-mono text-[9px] text-gray-500 dark:text-gray-400">
          {Math.round(rawProgress * 100)}%
        </span>
      </div>

      {/* Vertical Branch Track Container */}
      <div className="relative flex flex-col items-start py-1">
        {/* Base visible branch wire */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200 dark:bg-[#222222] -z-10" />

        {/* Dynamic active branch progress wire */}
        <motion.div
          className="absolute left-[7px] top-2 w-[2px] bg-slate-700 dark:bg-slate-300 -z-10 origin-top"
          style={{ height: branchLineHeight }}
        />

        {/* Commit Nodes */}
        <div className="flex flex-col">
          {COMMITS.map((commit, index) => (
            <CommitNode
              key={commit.id}
              commit={commit}
              index={index}
              mousePos={mousePos}
              scrollProgress={rawProgress}
              onJump={handleJumpToSection}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

/**
 * Ambient background architectural blueprint grid with radiant top aura,
 * continuous precision drafting rulers along the canvas boundaries, and telemetry HUD stamps.
 */
export const AmbientGutterGrid = () => (
  <div
    className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    {/* Fine 32px Technical Orthogonal Mesh across peripheral space with radial fade */}
    <div
      className="absolute inset-0 tech-grid-pattern opacity-30 dark:opacity-20 pointer-events-none"
      style={{
        maskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, transparent 95%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 50%, black 45%, transparent 95%)",
      }}
    />

    {/* Continuous Precision Drafting Ruler along Left Canvas Border (left-36 / 144px) */}
    <div className="hidden sm:block absolute left-36 top-0 bottom-0 w-[1px] bg-gray-200/80 dark:bg-[#1F1F1F] z-10">
      <div className="absolute inset-y-0 -left-2 w-2 tech-ruler-ticks-y opacity-30" />
    </div>

    {/* Continuous Precision Drafting Ruler along Right Canvas Border (right-36 / 144px) */}
    <div className="hidden sm:block absolute right-36 top-0 bottom-0 w-[1px] bg-gray-200/80 dark:bg-[#1F1F1F] z-10">
      <div className="absolute inset-y-0 -right-2 w-2 tech-ruler-ticks-y opacity-30" />
    </div>

    {/* Peripheral Outer Hairline Guides */}
    <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-[1px] bg-gray-200/40 dark:bg-[#141414]" />
    <div className="hidden sm:block absolute right-8 top-0 bottom-0 w-[1px] bg-gray-200/40 dark:bg-[#141414]" />

    {/* Corner Telemetry HUD Stamps */}
    {/* Top-Left HUD */}
    <div className="hidden 2xl:flex absolute top-6 left-6 flex-col gap-1 font-tech text-[9px] text-gray-400 dark:text-gray-500 tracking-wider">
      <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200 font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC]" />
        <span>STUDIO.CANVAS</span>
      </div>
      <span>COORD: 26.91°N 75.78°E</span>
      <span>GRID: 32PX_ORTHO</span>
    </div>

    {/* Top-Right HUD */}
    <div className="hidden 2xl:flex absolute top-6 right-6 flex-col gap-1 font-tech text-[9px] text-gray-400 dark:text-gray-500 tracking-wider text-right">
      <div className="flex items-center justify-end gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>KERNEL: ONLINE</span>
      </div>
      <span>SCALE: 1:1 CALIBRATED</span>
      <span>ENV: PRODUCTION</span>
    </div>

    {/* Bottom-Left HUD */}
    <div className="hidden 2xl:flex absolute bottom-6 left-6 flex-col gap-0.5 font-tech text-[8px] text-gray-400 dark:text-gray-600 tracking-wider">
      <span>BASE_SYS: PORTFOLIO_PRO</span>
      <span>TIMEZONE: IST (UTC+5:30)</span>
    </div>

    {/* Bottom-Right HUD */}
    <div className="hidden 2xl:flex absolute bottom-6 right-6 flex-col gap-0.5 font-tech text-[8px] text-gray-400 dark:text-gray-600 tracking-wider text-right">
      <span>SHAURYA UPADHYAY</span>
      <span>SOFTWARE ENGINEER</span>
    </div>
  </div>
);

export default MagneticScrollIndicator;
