import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Custom hook: animates a number from 0 to `target` over `duration` ms when `trigger` becomes true
const useCountUp = (target, duration, trigger) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger || target === 0) {
      setValue(target);
      return;
    }

    let startTime = null;
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startValue + eased * (target - startValue)));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [target, duration, trigger]);

  return value;
};

const CodingProfile = ({ darkMode }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const [leetCodeStats, setLeetCodeStats] = useState({
    totalSolved: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    ranking: 0,
    activeDays: 0,
    maxStreak: 0,
    loading: true,
    error: null,
  });

  const LEETCODE_USERNAME = "shaurya01836";

  // IntersectionObserver: trigger animations once the section enters the viewport
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processCalendarData = (calendarRaw) => {
    if (!calendarRaw || Object.keys(calendarRaw).length === 0) {
      return { activeDays: 0, maxStreak: 0 };
    }

    const timestamps = Object.keys(calendarRaw).map(Number).sort((a, b) => a - b);
    const activeDays = timestamps.length;

    let maxStreak = 0;
    let currentStreak = 0;
    let prevDate = null;

    timestamps.forEach((timestamp) => {
      const date = new Date(timestamp * 1000);
      date.setHours(0, 0, 0, 0);

      if (prevDate) {
        const diffTime = Math.abs(date - prevDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      if (currentStreak > maxStreak) maxStreak = currentStreak;
      prevDate = date;
    });

    return { activeDays, maxStreak };
  };

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        // Primary API
        const response = await fetch(
          `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`
        );

        if (!response.ok) throw new Error("Primary API failed");

        const data = await response.json();
        
        if (data.status !== "success") throw new Error("Primary API returned failure status");

        const { activeDays, maxStreak } = processCalendarData(data.submissionCalendar || {});

        setLeetCodeStats({
          totalSolved: data.totalSolved,
          easy: data.easySolved,
          medium: data.mediumSolved,
          hard: data.hardSolved,
          ranking: data.ranking || "N/A",
          activeDays,
          maxStreak,
          loading: false,
          error: null,
        });

      } catch (primaryError) {
        console.warn("Primary LeetCode API failed, trying fallback:", primaryError);
        
        try {
          // Fallback API
          const response = await fetch(
            `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`
          );
          
          const calendarResponse = await fetch(
            `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`
          );

          if (!response.ok || !calendarResponse.ok) throw new Error("Fallback API failed");

          const data = await response.json();
          const calendarData = await calendarResponse.json();

          const calendarRaw =
              typeof calendarData.submissionCalendar === "string"
                ? JSON.parse(calendarData.submissionCalendar)
                : calendarData.submissionCalendar || {};

          const { activeDays, maxStreak } = processCalendarData(calendarRaw);

          setLeetCodeStats({
              totalSolved: data.solvedProblem, 
              easy: data.easySolved,
              medium: data.mediumSolved,
              hard: data.hardSolved,
              ranking: data.ranking || "N/A", 
              activeDays,
              maxStreak,
              loading: false,
              error: null,
          });
        } catch (fallbackError) {
          console.error("LeetCode Fallback API also failed:", fallbackError);
          setLeetCodeStats((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to load stats",
          }));
        }
      }
    };

    fetchLeetCode();
  }, [LEETCODE_USERNAME]);

  
  if (leetCodeStats.error) {
    return (
      <></>
    )
  }

  const easy = leetCodeStats.easy || 0;
  const medium = leetCodeStats.medium || 0;
  const hard = leetCodeStats.hard || 0;
  const totalSolved = leetCodeStats.totalSolved || 0;

  // Count-up animated values (only run when hasAnimated && data loaded)
  const animTrigger = hasAnimated && !leetCodeStats.loading;
  const animTotalSolved = useCountUp(totalSolved, 1200, animTrigger);
  const animEasy = useCountUp(easy, 1000, animTrigger);
  const animMedium = useCountUp(medium, 1100, animTrigger);
  const animHard = useCountUp(hard, 1200, animTrigger);
  const animActiveDays = useCountUp(leetCodeStats.activeDays || 0, 1000, animTrigger);
  const animMaxStreak = useCountUp(leetCodeStats.maxStreak || 0, 1000, animTrigger);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const easyPct = totalSolved > 0 ? (easy / totalSolved) * 100 : 0;
  const mediumPct = totalSolved > 0 ? (medium / totalSolved) * 100 : 0;
  const hardPct = totalSolved > 0 ? (hard / totalSolved) * 100 : 0;

  const activeSegmentsCount = [easy > 0, medium > 0, hard > 0].filter(Boolean).length;
  const gap = activeSegmentsCount > 1 ? 22 : 0;

  const easyLength = easy > 0 ? Math.max((easyPct / 100) * circumference - gap, 0) : 0;
  const mediumLength = medium > 0 ? Math.max((mediumPct / 100) * circumference - gap, 0) : 0;
  const hardLength = hard > 0 ? Math.max((hardPct / 100) * circumference - gap, 0) : 0;

  const easyOffset = 0;
  const mediumOffset = -((easyPct / 100) * circumference);
  const hardOffset = -(((easyPct + mediumPct) / 100) * circumference);

  const dailyRate = leetCodeStats.activeDays > 0 ? (totalSolved / leetCodeStats.activeDays).toFixed(1) : "0";
  const yearlyPct = Math.min(Math.round((leetCodeStats.activeDays / 365) * 100), 100);
  const streakRatio = leetCodeStats.activeDays > 0 ? Math.round((leetCodeStats.maxStreak / leetCodeStats.activeDays) * 100) : 0;
  const nextGoal = leetCodeStats.maxStreak < 50 ? 50 : leetCodeStats.maxStreak < 100 ? 100 : Math.ceil(leetCodeStats.maxStreak / 50) * 50;

  return (
    <div ref={sectionRef} className="flex flex-col w-full px-8 py-10 gap-4 text-black dark:text-white transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Coding Profile
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Structural Telemetry Matrix Container */}
      <div className="flex flex-col border border-gray-200 dark:border-[#1F1F1F] rounded-md overflow-hidden bg-white dark:bg-[#0A0A0A]">
        {/* Header Strip with System Metadata */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
          <div className="flex items-center gap-2">
            
            <span className="hidden sm:inline font-tech text-[10px] text-gray-400 dark:text-gray-500 font-mono">
              @{LEETCODE_USERNAME}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-tech text-[10px] text-gray-600 dark:text-gray-400 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
              {leetCodeStats.loading ? "..." : `Rank #${leetCodeStats.ranking}`}
            </span>
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="font-tech text-[10px] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              Profile ↗
            </a>
          </div>
        </div>

        {/* Connected 2-Pane Technical Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-[#1F1F1F]">
          {/* Left Pane (8 cols): Interactive Doughnut Chart + Difficulty Telemetry */}
          <div className="lg:col-span-7 xl:col-span-8 p-6 flex flex-col md:flex-row items-center justify-around gap-6 bg-white dark:bg-[#0A0A0A]">
            {/* SVG Doughnut Chart */}
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90 select-none overflow-visible">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComponentTransfer in="blur" result="glow">
                      <feFuncA type="linear" slope="0.4" />
                    </feComponentTransfer>
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base track */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  className="stroke-gray-100 dark:stroke-[#18181b] fill-none"
                  strokeWidth="12"
                />

                {/* Easy Segment */}
                {easy > 0 && (
                  <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-[#22c55e] fill-none cursor-pointer"
                    strokeWidth={hoveredSegment === "easy" ? "15" : "11"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{
                      strokeDasharray: hasAnimated
                        ? `${easyLength} ${circumference}`
                        : `0 ${circumference}`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeDashoffset={easyOffset}
                    onMouseEnter={() => setHoveredSegment("easy")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.2s ease, opacity 0.2s ease",
                      opacity: hoveredSegment && hoveredSegment !== "easy" ? 0.35 : 1,
                      filter: hoveredSegment === "easy" ? "url(#glow)" : "none",
                    }}
                  />
                )}

                {/* Medium Segment */}
                {medium > 0 && (
                  <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-[#eab308] fill-none cursor-pointer"
                    strokeWidth={hoveredSegment === "medium" ? "15" : "11"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{
                      strokeDasharray: hasAnimated
                        ? `${mediumLength} ${circumference}`
                        : `0 ${circumference}`,
                    }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    strokeDashoffset={mediumOffset}
                    onMouseEnter={() => setHoveredSegment("medium")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.2s ease, opacity 0.2s ease",
                      opacity: hoveredSegment && hoveredSegment !== "medium" ? 0.35 : 1,
                      filter: hoveredSegment === "medium" ? "url(#glow)" : "none",
                    }}
                  />
                )}

                {/* Hard Segment */}
                {hard > 0 && (
                  <motion.circle
                    cx="100"
                    cy="100"
                    r={radius}
                    className="stroke-[#ef4444] fill-none cursor-pointer"
                    strokeWidth={hoveredSegment === "hard" ? "15" : "11"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{
                      strokeDasharray: hasAnimated
                        ? `${hardLength} ${circumference}`
                        : `0 ${circumference}`,
                    }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    strokeDashoffset={hardOffset}
                    onMouseEnter={() => setHoveredSegment("hard")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.2s ease, opacity 0.2s ease",
                      opacity: hoveredSegment && hoveredSegment !== "hard" ? 0.35 : 1,
                      filter: hoveredSegment === "hard" ? "url(#glow)" : "none",
                    }}
                  />
                )}
              </svg>

              {/* Center Metrics readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none leading-none select-none">
                {hoveredSegment ? (
                  <>
                    <span
                      className="text-2xl font-extrabold font-tech transition-all duration-200"
                      style={{
                        color:
                          hoveredSegment === "easy"
                            ? "#22c55e"
                            : hoveredSegment === "medium"
                            ? "#eab308"
                            : "#ef4444",
                      }}
                    >
                      {hoveredSegment === "easy" ? animEasy : hoveredSegment === "medium" ? animMedium : animHard}
                    </span>
                    <span className="text-[9px] font-tech uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">
                      {hoveredSegment}
                    </span>
                    <span className="text-[9px] font-tech text-gray-400 mt-1">
                      {totalSolved > 0
                        ? `${Math.round(
                            ((hoveredSegment === "easy"
                              ? easy
                              : hoveredSegment === "medium"
                              ? medium
                              : hard) /
                              totalSolved) *
                              100
                          )}%`
                        : "0%"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold font-tech text-gray-900 dark:text-white transition-all duration-200">
                      {leetCodeStats.loading ? "0" : animTotalSolved}
                    </span>
                    <span className="text-[9px] font-tech uppercase tracking-widest text-gray-400 font-semibold mt-1">
                      SOLVED
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Difficulty Telemetry Bars */}
            <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
              {/* Easy Bar */}
              <div
                onMouseEnter={() => setHoveredSegment("easy")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`p-2.5 rounded border transition-all duration-200 cursor-pointer ${
                  hoveredSegment === "easy"
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-gray-50/70 dark:bg-[#121212] border-gray-200 dark:border-[#1F1F1F] hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1.5 font-tech text-xs">
                  <span className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                    Easy
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {animEasy} <span className="font-normal text-[10px] text-gray-400">/{totalSolved}</span>
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-[#1F1F1F] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#22c55e] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hasAnimated ? `${totalSolved > 0 ? (easy / totalSolved) * 100 : 0}%` : 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Medium Bar */}
              <div
                onMouseEnter={() => setHoveredSegment("medium")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`p-2.5 rounded border transition-all duration-200 cursor-pointer ${
                  hoveredSegment === "medium"
                    ? "bg-yellow-500/10 border-yellow-500/40"
                    : "bg-gray-50/70 dark:bg-[#121212] border-gray-200 dark:border-[#1F1F1F] hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1.5 font-tech text-xs">
                  <span className="font-semibold text-yellow-700 dark:text-yellow-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                    Medium
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {animMedium} <span className="font-normal text-[10px] text-gray-400">/{totalSolved}</span>
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-[#1F1F1F] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#eab308] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hasAnimated ? `${totalSolved > 0 ? (medium / totalSolved) * 100 : 0}%` : 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  />
                </div>
              </div>

              {/* Hard Bar */}
              <div
                onMouseEnter={() => setHoveredSegment("hard")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`p-2.5 rounded border transition-all duration-200 cursor-pointer ${
                  hoveredSegment === "hard"
                    ? "bg-red-500/10 border-red-500/40"
                    : "bg-gray-50/70 dark:bg-[#121212] border-gray-200 dark:border-[#1F1F1F] hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1.5 font-tech text-xs">
                  <span className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]" />
                    Hard
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {animHard} <span className="font-normal text-[10px] text-gray-400">/{totalSolved}</span>
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-200 dark:bg-[#1F1F1F] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#ef4444] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: hasAnimated ? `${totalSolved > 0 ? (hard / totalSolved) * 100 : 0}%` : 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane (4 cols): Telemetry Metrics Grid (Active Days & Max Streak) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col divide-y divide-gray-200 dark:divide-[#1F1F1F]">
            {/* Metric Cell 1: Active Days */}
            <div className="p-5 flex flex-col justify-between flex-1 bg-white dark:bg-[#0A0A0A] hover:bg-gray-50/70 dark:hover:bg-[#121212] transition-colors select-none">
              <div>
                <div className="flex items-center justify-between text-[11px] font-tech text-gray-400 dark:text-gray-500 mb-1">
                  <span className="uppercase tracking-wider font-medium">ACTIVE DAYS</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#121212]">
                    CONSISTENCY
                  </span>
                </div>
                <div className="text-3xl font-extrabold font-tech text-blue-600 dark:text-blue-400 mt-2">
                  {leetCodeStats.loading ? "..." : animActiveDays}
                </div>
                <div className="text-[10px] font-tech text-gray-400 dark:text-gray-500 mt-0.5">
                  Total submission days
                </div>
              </div>
            </div>

            {/* Metric Cell 2: Max Streak */}
            <div className="p-5 flex flex-col justify-between flex-1 bg-white dark:bg-[#0A0A0A] hover:bg-gray-50/70 dark:hover:bg-[#121212] transition-colors select-none">
              <div>
                <div className="flex items-center justify-between text-[11px] font-tech text-gray-400 dark:text-gray-500 mb-1">
                  <span className="uppercase tracking-wider font-medium">MAX STREAK</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#121212]">
                    RECORD
                  </span>
                </div>
                <div className="text-3xl font-extrabold font-tech text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1.5">
                  {leetCodeStats.loading ? "..." : animMaxStreak}
                  <span className="text-xs font-normal text-amber-600/70 dark:text-amber-400/70 font-tech">days</span>
                </div>
                <div className="text-[10px] font-tech text-gray-400 dark:text-gray-500 mt-0.5">
                  Consecutive daily activity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CodingProfile.propTypes = {
  darkMode: PropTypes.bool,
};

export default CodingProfile;
