import { useState, useEffect, useRef } from "react";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import { RiExternalLinkLine } from "@remixicon/react";

const LEETCODE_USERNAME = "shaurya01836";


const CodingStats = () => {
  const [stats, setStats] = useState({
    totalSolved: 556,
    easy: 190,
    medium: 345,
    hard: 21,
    ranking: "174,231",
    maxStreak: 45,
    totalQuestions: 3420,
    loading: true,
  });

  const sectionRef = useRef(null);
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRequestedRef.current) {
            hasRequestedRef.current = true;
            fetchStats();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `https://leetcode-stats.tashif.codes/${LEETCODE_USERNAME}`
      );
      if (!response.ok) throw new Error("API response not ok");

      const data = await response.json();
      if (data.status !== "success") throw new Error("API returned failure status");

      let maxStreak = 0;
      if (data.submissionCalendar) {
        const timestamps = Object.keys(data.submissionCalendar)
          .map(Number)
          .sort((a, b) => a - b);

        let current = 0;
        let prevDate = null;
        timestamps.forEach((t) => {
          const d = new Date(t * 1000);
          d.setHours(0, 0, 0, 0);
          if (prevDate) {
            const diffDays = Math.ceil(Math.abs(d - prevDate) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) current++;
            else if (diffDays > 1) current = 1;
          } else {
            current = 1;
          }
          if (current > maxStreak) maxStreak = current;
          prevDate = d;
        });
      }

      setStats({
        totalSolved: data.totalSolved || 556,
        easy: data.easySolved || 190,
        medium: data.mediumSolved || 345,
        hard: data.hardSolved || 21,
        ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : "Top 15%",
        maxStreak: maxStreak || 45,
        totalQuestions: data.totalQuestions || 3420,
        loading: false,
      });
    } catch {
      setStats((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  // Math for Circular SVG Donut Chart
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.59
  const totalSolved = stats.totalSolved || 556;

  const easyRatio = totalSolved > 0 ? stats.easy / totalSolved : 0.34;
  const mediumRatio = totalSolved > 0 ? stats.medium / totalSolved : 0.62;
  const hardRatio = totalSolved > 0 ? stats.hard / totalSolved : 0.04;

  const easyLen = Math.max(0, easyRatio * circumference - 3);
  const mediumLen = Math.max(0, mediumRatio * circumference - 3);
  const hardLen = Math.max(0, hardRatio * circumference - 3);

  const easyOffset = 0;
  const mediumOffset = -easyRatio * circumference;
  const hardOffset = -(easyRatio + mediumRatio) * circumference;

  return (
    <BlueprintSection id="coding-stats" ariaLabel="LeetCode Statistics">
      <div ref={sectionRef}>
        {/* 2-cell Section Header */}
        <SectionHeader
          number="04"
          label="LEETCODE"
          title="LeetCode"
          accentWord="Profile"
          description="Verified algorithmic problem-solving distribution, difficulty breakdown & contest streak"
        />

        {/* Authentic LeetCode Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[var(--line)]">
          {/* Left Pane: Radial Donut Progress Gauge */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--line)] bg-[var(--surface)] gap-4">
            

            {/* SVG Donut Ring */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                {/* Background Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="7"
                  className="text-black/[0.06] dark:text-white/[0.08]"
                  fill="none"
                />
                {/* Easy Segment (#00B8A3) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#00B8A3"
                  strokeWidth="7"
                  strokeDasharray={`${easyLen} ${circumference - easyLen}`}
                  strokeDashoffset={easyOffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
                {/* Medium Segment (#FFC01E) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#FFC01E"
                  strokeWidth="7"
                  strokeDasharray={`${mediumLen} ${circumference - mediumLen}`}
                  strokeDashoffset={mediumOffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
                {/* Hard Segment (#FF375F) */}
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#FF375F"
                  strokeWidth="7"
                  strokeDasharray={`${hardLen} ${circumference - hardLen}`}
                  strokeDashoffset={hardOffset}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
              </svg>

              {/* Inside Donut Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-tech select-none">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
                  {stats.totalSolved}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-[#71717A] uppercase tracking-widest font-medium mt-0.5">
                  Solved
                </span>
              </div>
            </div>

            {/* Subtext */}
            <div className="font-tech text-xs text-gray-500 dark:text-[#71717A] text-center">
              <span>{stats.totalSolved}</span>
              <span className="opacity-40"> / </span>
              <span>{stats.totalQuestions} Questions</span>
            </div>
          </div>

          {/* Right Pane: Difficulty Breakdown (Easy / Medium / Hard) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center gap-4 bg-black/[0.015] dark:bg-white/[0.01]">
            <div className="font-tech text-xs tracking-wider uppercase text-gray-500 dark:text-[#71717A] pb-1">
              [Difficulty Distribution]
            </div>

            {/* Easy Card */}
            <div className="p-4 border border-[var(--line)] bg-[var(--surface)] flex flex-col gap-2">
              <div className="flex items-center justify-between font-tech text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[#00B8A3]" />
                  <span className="font-semibold text-[#00B8A3] tracking-wide">Easy</span>
                </div>
                <div className="flex items-baseline gap-1.5 font-tech text-xs text-gray-900 dark:text-gray-100 font-semibold">
                  <span className="text-sm">{stats.easy}</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({Math.round((stats.easy / stats.totalSolved) * 100)}%)
                  </span>
                </div>
              </div>
              {/* Progress Track */}
              <div className="w-full h-1.5 bg-black/[0.05] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-[#00B8A3] transition-all duration-700"
                  style={{ width: `${(stats.easy / stats.totalSolved) * 100}%` }}
                />
              </div>
            </div>

            {/* Medium Card */}
            <div className="p-4 border border-[var(--line)] bg-[var(--surface)] flex flex-col gap-2">
              <div className="flex items-center justify-between font-tech text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FFC01E]" />
                  <span className="font-semibold text-[#FFC01E] tracking-wide">Medium</span>
                </div>
                <div className="flex items-baseline gap-1.5 font-tech text-xs text-gray-900 dark:text-gray-100 font-semibold">
                  <span className="text-sm">{stats.medium}</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({Math.round((stats.medium / stats.totalSolved) * 100)}%)
                  </span>
                </div>
              </div>
              {/* Progress Track */}
              <div className="w-full h-1.5 bg-black/[0.05] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-[#FFC01E] transition-all duration-700"
                  style={{ width: `${(stats.medium / stats.totalSolved) * 100}%` }}
                />
              </div>
            </div>

            {/* Hard Card */}
            <div className="p-4 border border-[var(--line)] bg-[var(--surface)] flex flex-col gap-2">
              <div className="flex items-center justify-between font-tech text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FF375F]" />
                  <span className="font-semibold text-[#FF375F] tracking-wide">Hard</span>
                </div>
                <div className="flex items-baseline gap-1.5 font-tech text-xs text-gray-900 dark:text-gray-100 font-semibold">
                  <span className="text-sm">{stats.hard}</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({Math.round((stats.hard / stats.totalSolved) * 100)}%)
                  </span>
                </div>
              </div>
              {/* Progress Track */}
              <div className="w-full h-1.5 bg-black/[0.05] dark:bg-white/[0.08] overflow-hidden">
                <div
                  className="h-full bg-[#FF375F] transition-all duration-700"
                  style={{ width: `${(stats.hard / stats.totalSolved) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Telemetry Metrics (Global Rank, Streak, Live Profile) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-[var(--line)] font-tech text-xs">
          {/* Cell 1: Global Ranking */}
          <div className="p-5 border-b sm:border-b-0 sm:border-r border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between gap-2">
            <span className="text-[10px] text-gray-400 dark:text-[#71717A] uppercase tracking-wider">
              [GLOBAL RANKING]
            </span>
            <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
              {stats.ranking}
            </div>
            <span className="text-[11px] text-gray-500 dark:text-[#71717A]">
              Top 15% worldwide
            </span>
          </div>

          {/* Cell 2: Max Streak */}
          <div className="p-5 border-b sm:border-b-0 sm:border-r border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between gap-2">
            <span className="text-[10px] text-gray-400 dark:text-[#71717A] uppercase tracking-wider">
              [MAX STREAK]
            </span>
            <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F4F4F5] flex items-baseline gap-1.5">
              <span>{stats.maxStreak}</span>
              <span className="text-xs font-normal text-amber-500">Days</span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-[#71717A]">
              Continuous problem solving
            </span>
          </div>

          {/* Cell 3: Live Profile Link */}
          <a
            href={`https://leetcode.com/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 bg-[var(--surface)] hover:bg-black/[0.02] dark:hover:bg-white/[0.02] flex flex-col justify-between gap-2 transition-colors group"
          >
            <div className="flex items-center justify-between text-[10px] text-gray-400 dark:text-[#71717A] uppercase tracking-wider">
              <span>[OFFICIAL PROFILE]</span>
              <RiExternalLinkLine size={13} className="group-hover:text-black dark:group-hover:text-[#CDBDFF] transition-colors" />
            </div>
            <div className="text-base font-semibold text-gray-900 dark:text-[#F4F4F5] group-hover:text-black dark:group-hover:text-white transition-colors">
              @{LEETCODE_USERNAME}
            </div>
            <span className="text-[11px] text-[#CDBDFF] uppercase tracking-wider">
              Verify On LeetCode ↗
            </span>
          </a>
        </div>
      </div>
    </BlueprintSection>
  );
};

export default CodingStats;
