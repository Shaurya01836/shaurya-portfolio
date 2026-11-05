import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { TechCornerTicks } from "./TechGridElements";

const BOOT_STEPS = [
  { threshold: 0, label: "CONNECTING TO FIRESTORE TELEMETRY..." },
  { threshold: 25, label: "PREFETCHING REPOSITORY DATA & ASSETS..." },
  { threshold: 50, label: "COMPILING COMPONENT RUNTIME..." },
  { threshold: 75, label: "HYDRATING INDUSTRIAL GRID SYSTEM..." },
  { threshold: 95, label: "SYSTEM OPTIMAL. LAUNCHING WORKSPACE..." },
];

const Loading = ({ onComplete, isDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        if (!isDone && prev >= 95) return 95;

        const increment = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + increment, 100);
      });
    };

    const intervalId = setInterval(updateProgress, 130);
    return () => clearInterval(intervalId);
  }, [isDone]);

  useEffect(() => {
    if (isDone && progress >= 95 && progress < 100) {
      setProgress(100);
    }
  }, [isDone, progress]);

  useEffect(() => {
    if (progress === 100) {
      const timeoutId = setTimeout(() => {
        onComplete();
      }, 450);
      return () => clearTimeout(timeoutId);
    }
  }, [progress, onComplete]);

  // Determine current active boot step
  const currentStep =
    [...BOOT_STEPS].reverse().find((step) => progress >= step.threshold)?.label ||
    BOOT_STEPS[0].label;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300 select-none overflow-hidden"
    >
      {/* Background Ambience Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Central HUD Monolith */}
      <div className="relative w-full max-w-lg rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-white/95 dark:bg-[#0C0C0C]/95 backdrop-blur-md p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">
        <TechCornerTicks />

        {/* Top Header Strip */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-[#1F1F1F] font-tech text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wider text-gray-800 dark:text-gray-200">
              SYS.BOOT: PORTFOLIO_KERNEL
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {progress === 100 ? "READY" : "INITIALIZING"}
          </span>
        </div>

        {/* Progress Counter & Matrix */}
        <div className="flex items-baseline justify-between font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-tech tracking-wider text-gray-500 dark:text-gray-400">
              TELEMETRY PROGRESS
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-950 dark:text-white">
              {progress.toString().padStart(3, "0")}
              <span className="text-xl sm:text-2xl text-gray-400 font-normal">%</span>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            <span className="text-[10px] font-tech uppercase tracking-wider text-gray-500 dark:text-gray-400">
              STATUS
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {progress === 100 ? "ONLINE" : "LOADING ASSETS"}
            </span>
          </div>
        </div>

        {/* Industrial Segmented Bar */}
        <div className="flex flex-col gap-2">
          {/* Progress Track */}
          <div className="w-full h-3 rounded-xs border border-gray-200 dark:border-[#222222] bg-gray-100 dark:bg-[#141414] p-0.5 overflow-hidden relative">
            <motion.div
              className="h-full bg-gray-950 dark:bg-white rounded-xs"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>

          {/* Graduation Rulers */}
          <div className="flex justify-between items-center text-[9px] font-mono text-gray-400 dark:text-gray-600 px-0.5">
            <span>00%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="flex items-center gap-2 p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50 dark:bg-[#111111] font-mono text-xs text-gray-600 dark:text-gray-300">
          <span className="text-amber-500 font-bold select-none">&gt;</span>
          <span className="truncate tracking-wide">{currentStep}</span>
          <span className="ml-auto w-1.5 h-3 bg-gray-800 dark:bg-gray-200 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

Loading.propTypes = {
  onComplete: PropTypes.func.isRequired,
  isDone: PropTypes.bool.isRequired,
};

export default Loading;
