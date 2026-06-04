import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const FlipCard = ({ isFlipped, setIsFlipped, frontContent, backContent, colorTheme }) => {
  return (
    <div 
      onClick={() => setIsFlipped(!isFlipped)}
      className="h-[120px] cursor-pointer group relative w-full [perspective:1000px] select-none"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Front Side */}
        <div 
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 w-full h-full border-2 border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md p-5 bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center text-center hover:border-gray-300 dark:hover:border-[#2b2b2b] hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.01)] transition-all duration-300"
        >
          {frontContent}
          <span className="absolute bottom-2 right-3 text-[8px] text-gray-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Click to flip ↺
          </span>
        </div>

        {/* Back Side */}
        <div 
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
          className={`absolute inset-0 w-full h-full border-2 border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md p-5 bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center text-center transition-all duration-300 ${colorTheme}`}
        >
          {backContent}
          <span className="absolute bottom-2 right-3 text-[8px] text-gray-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Click to flip ↺
          </span>
        </div>
      </motion.div>
    </div>
  );
};

FlipCard.propTypes = {
  isFlipped: PropTypes.bool.isRequired,
  setIsFlipped: PropTypes.func.isRequired,
  frontContent: PropTypes.node.isRequired,
  backContent: PropTypes.node.isRequired,
  colorTheme: PropTypes.string,
};

// eslint-disable-next-line no-unused-vars, react/prop-types
const CodingProfile = ({ darkMode }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [activeDaysFlipped, setActiveDaysFlipped] = useState(false);
  const [streakFlipped, setStreakFlipped] = useState(false);
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

  return (
    <div className="flex flex-col w-full px-8 pb-10 gap-4 text-black dark:text-white transition-colors duration-300">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Coding Profile
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        <div className="col-span-1 md:col-span-2 border-2 border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md p-6 bg-white dark:bg-[#0A0A0A] flex flex-col justify-between min-h-[250px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              LeetCode
              <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {leetCodeStats.loading ? "..." : `#${leetCodeStats.ranking}`}
              </span>
            </h2>
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-gray-500 hover:underline"
            >
              Profile ↗
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-8 flex-grow">
            {/* SVG Doughnut Chart Container */}
            <div className="relative w-44 h-44 md:w-48 md:h-48 flex items-center justify-center">
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

                {/* Base gray ring background */}
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
                    strokeWidth={hoveredSegment === "easy" ? "16" : "12"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${easyLength} ${circumference}` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeDashoffset={easyOffset}
                    onMouseEnter={() => setHoveredSegment("easy")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.25s ease, opacity 0.25s ease",
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
                    strokeWidth={hoveredSegment === "medium" ? "16" : "12"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${mediumLength} ${circumference}` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    strokeDashoffset={mediumOffset}
                    onMouseEnter={() => setHoveredSegment("medium")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.25s ease, opacity 0.25s ease",
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
                    strokeWidth={hoveredSegment === "hard" ? "16" : "12"}
                    strokeLinecap="round"
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    animate={{ strokeDasharray: `${hardLength} ${circumference}` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    strokeDashoffset={hardOffset}
                    onMouseEnter={() => setHoveredSegment("hard")}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                      transformOrigin: "center",
                      transition: "stroke-width 0.25s ease, opacity 0.25s ease",
                      opacity: hoveredSegment && hoveredSegment !== "hard" ? 0.35 : 1,
                      filter: hoveredSegment === "hard" ? "url(#glow)" : "none",
                    }}
                  />
                )}
              </svg>

              {/* Absolute Center Text overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none leading-none">
                {hoveredSegment ? (
                  <>
                    <span
                      className="text-3xl font-extrabold transition-all duration-300"
                      style={{
                        color:
                          hoveredSegment === "easy"
                            ? "#22c55e"
                            : hoveredSegment === "medium"
                            ? "#eab308"
                            : "#ef4444",
                      }}
                    >
                      {hoveredSegment === "easy" ? easy : hoveredSegment === "medium" ? medium : hard}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-gray-500 dark:text-gray-400 mt-1.5">
                      {hoveredSegment}
                    </span>
                    <span className="text-[9px] text-gray-400 mt-1">
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
                    <span className="text-2xl font-bold text-gray-900 dark:text-white transition-all duration-300">
                      {leetCodeStats.loading ? "0" : totalSolved}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mt-1.5">
                      Solved
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Legend List */}
            <div className="grid grid-cols-1 gap-3 w-full max-w-[240px]">
              {/* Easy Card */}
              <div
                onMouseEnter={() => setHoveredSegment("easy")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`flex flex-col gap-2 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  hoveredSegment === "easy"
                    ? "bg-green-50/70 border-green-300 dark:bg-green-950/10 dark:border-green-500/30 shadow-[0_4px_12px_rgba(34,197,94,0.08)] scale-[1.02]"
                    : "bg-gray-50/50 border-gray-100 dark:bg-[#111111]/45 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                    Easy
                  </span>
                  <span className="text-sm font-bold text-green-800 dark:text-green-300">
                    {easy} <span className="text-xs font-normal text-gray-500">solved</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/70 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#22c55e] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalSolved > 0 ? (easy / totalSolved) * 100 : 0}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Medium Card */}
              <div
                onMouseEnter={() => setHoveredSegment("medium")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`flex flex-col gap-2 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  hoveredSegment === "medium"
                    ? "bg-yellow-50/70 border-yellow-300 dark:bg-yellow-950/10 dark:border-yellow-500/30 shadow-[0_4px_12px_rgba(234,179,8,0.08)] scale-[1.02]"
                    : "bg-gray-50/50 border-gray-100 dark:bg-[#111111]/45 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                    Medium
                  </span>
                  <span className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
                    {medium} <span className="text-xs font-normal text-gray-500">solved</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/70 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#eab308] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalSolved > 0 ? (medium / totalSolved) * 100 : 0}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                  />
                </div>
              </div>

              {/* Hard Card */}
              <div
                onMouseEnter={() => setHoveredSegment("hard")}
                onMouseLeave={() => setHoveredSegment(null)}
                className={`flex flex-col gap-2 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  hoveredSegment === "hard"
                    ? "bg-red-50/70 border-red-300 dark:bg-red-950/10 dark:border-red-500/30 shadow-[0_4px_12px_rgba(239,68,68,0.08)] scale-[1.02]"
                    : "bg-gray-50/50 border-gray-100 dark:bg-[#111111]/45 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    Hard
                  </span>
                  <span className="text-sm font-bold text-red-800 dark:text-red-300">
                    {hard} <span className="text-xs font-normal text-gray-500">solved</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/70 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#ef4444] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${totalSolved > 0 ? (hard / totalSolved) * 100 : 0}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4 h-full justify-between">
          <FlipCard
            isFlipped={activeDaysFlipped}
            setIsFlipped={setActiveDaysFlipped}
            colorTheme="hover:border-blue-500/30 dark:hover:border-blue-500/25 shadow-[0_4px_12px_rgba(59,130,246,0.06)]"
            frontContent={
              <>
                <span className="text-gray-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Days</span>
                <span className="text-3xl font-extrabold text-blue-500">
                  {leetCodeStats.loading ? "..." : leetCodeStats.activeDays}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 font-medium">Total active days</span>
              </>
            }
            backContent={
              <>
                <span className="text-gray-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Consistency Details</span>
                <div className="flex flex-col gap-1 text-center w-full">
                  <div className="flex justify-between items-center text-xs px-2 py-0.5 border-b border-gray-100 dark:border-zinc-800/50 pb-1">
                    <span className="text-gray-400">Daily Average</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {leetCodeStats.activeDays > 0 ? (totalSolved / leetCodeStats.activeDays).toFixed(1) : "0"} / day
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs px-2 py-0.5 pt-1">
                    <span className="text-gray-400">Yearly Active</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {Math.round((leetCodeStats.activeDays / 365) * 100)}%
                    </span>
                  </div>
                </div>
              </>
            }
          />

          <FlipCard
            isFlipped={streakFlipped}
            setIsFlipped={setStreakFlipped}
            colorTheme="hover:border-orange-500/30 dark:hover:border-orange-500/25 shadow-[0_4px_12px_rgba(249,115,22,0.06)]"
            frontContent={
              <>
                <span className="text-gray-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Max Streak</span>
                <span className="text-3xl font-extrabold text-orange-500">
                  {leetCodeStats.loading ? "..." : `${leetCodeStats.maxStreak} 🔥`}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 font-medium">Consecutive days</span>
              </>
            }
            backContent={
              <>
                <span className="text-gray-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Streak Progress</span>
                <div className="flex flex-col gap-1 text-center w-full">
                  <div className="flex justify-between items-center text-xs px-2 py-0.5 border-b border-gray-100 dark:border-zinc-800/50 pb-1">
                    <span className="text-gray-400">Streak Ratio</span>
                    <span className="font-bold text-orange-600 dark:text-orange-400">
                      {leetCodeStats.activeDays > 0 ? Math.round((leetCodeStats.maxStreak / leetCodeStats.activeDays) * 100) : 0}% of active
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs px-2 py-0.5 pt-1">
                    <span className="text-gray-400">Next Goal</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      {leetCodeStats.maxStreak < 50 ? 50 : leetCodeStats.maxStreak < 100 ? 100 : Math.ceil(leetCodeStats.maxStreak / 50) * 50} days
                    </span>
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CodingProfile;