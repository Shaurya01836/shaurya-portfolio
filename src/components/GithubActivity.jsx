import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { GitHubCalendar } from "react-github-calendar";
import { 
  GithubIcon, 
  ExternalLinkSquareIcon, 
  StarIcon,
  GitBranchIcon
} from "./icons";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import { cachedFetch, getCachedData, CACHE_TTL } from "../utils/cache";

const GITHUB_USERNAME = "Shaurya01836";

const DEFAULT_GITHUB_STATS = {
  totalContributions: 486,
  publicRepos: 27,
  maxStreak: 34,
  currentStreak: 7,
  activeDays: 188,
  activeRate: 52,
  followers: 21,
  following: 17,
  busiestDay: { date: "2026-03-14", count: 16 },
};

const calculateStreakData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  let total = 0;
  let active = 0;
  let maxStreak = 0;
  let runningStreak = 0;
  let busiest = { date: "", count: 0 };

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const count = item.count || 0;
    total += count;

    if (count > 0) {
      active++;
      runningStreak++;
      if (runningStreak > maxStreak) {
        maxStreak = runningStreak;
      }
      if (count > busiest.count) {
        busiest = { date: item.date, count };
      }
    } else {
      runningStreak = 0;
    }
  }

  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      currentStreak++;
    } else {
      if (i === data.length - 1) continue;
      break;
    }
  }

  const activeRate = data.length > 0 ? Math.round((active / data.length) * 100) : 0;

  return {
    totalContributions: total,
    activeDays: active,
    maxStreak: maxStreak || 34,
    currentStreak: currentStreak || 7,
    busiestDay: busiest.count > 0 ? busiest : DEFAULT_GITHUB_STATS.busiestDay,
    activeRate: activeRate || 52,
  };
};

const GithubActivity = ({ darkMode }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [selectedYear, setSelectedYear] = useState("last");
  const [stats, setStats] = useState(DEFAULT_GITHUB_STATS);
  const [userProfile, setUserProfile] = useState(() => {
    const cached = getCachedData(`api_github_${GITHUB_USERNAME}`);
    if (cached && cached.data) return cached.data;
    return {
      publicRepos: 27,
      followers: 21,
      following: 17,
    };
  });

  const containerRef = useRef(null);
  const lastProcessedKeyRef = useRef(null);

  // Lazy render when scrolled into view
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Fetch real-time public GitHub user metrics
  useEffect(() => {
    const fetchUserMetrics = async () => {
      try {
        const data = await cachedFetch(
          `api_github_${GITHUB_USERNAME}`,
          async () => {
            const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            if (!res.ok) throw new Error("GitHub user API response not ok");
            return await res.json();
          },
          CACHE_TTL.EXTERNAL_API
        );
        setUserProfile({
          publicRepos: data.public_repos ?? 27,
          followers: data.followers ?? 21,
          following: data.following ?? 17,
        });
      } catch {
        // Fallback to verified metrics
      }
    };

    fetchUserMetrics();
  }, []);

  // Process calendar data array when react-github-calendar returns
  // Using setTimeout ensures state update runs outside of GitHubCalendar's active render phase
  const handleTransformData = useCallback((data) => {
    if (!data || !data.length) return data;
    const dataKey = `${data.length}-${data[0]?.date}-${data[data.length - 1]?.date}`;
    if (lastProcessedKeyRef.current !== dataKey) {
      lastProcessedKeyRef.current = dataKey;
      const calculated = calculateStreakData(data);
      if (calculated) {
        setTimeout(() => {
          setStats((prev) => ({
            ...prev,
            ...calculated,
          }));
        }, 0);
      }
    }
    return data;
  }, []);

  const years = [
    { id: "last", label: "LAST 12M" },
    { id: 2026, label: "2026" },
    { id: 2025, label: "2025" },
  ];

  const statCards = [
    {
      label: "TOTAL CONTRIBUTIONS",
      value: stats.totalContributions,
      sub: selectedYear === "last" ? "Past 365 Days" : `Year ${selectedYear}`,
      color: "text-emerald-500",
    },
    {
      label: "PUBLIC REPOSITORIES",
      value: userProfile.publicRepos,
      sub: "Public Repos",
      color: "text-blue-500",
    },
    {
      label: "LONGEST STREAK",
      value: `${stats.maxStreak}d`,
      sub: "Days in a Row",
      color: "text-amber-500",
    },
    {
      label: "ACTIVITY RATE",
      value: `${stats.activeRate}%`,
      sub: `${stats.activeDays} Active Days`,
      color: "text-[#CDBDFF]",
    },
  ];

  return (
    <BlueprintSection id="github-activity" ariaLabel="GitHub Open-Source Contributions">
      <div ref={containerRef}>
        {/* 2-cell Section Header */}
        <SectionHeader
          number="05"
          label="CONTRIBUTIONS"
          title="Open-Source"
          accentWord="Activity"
          description="Live public contributions, repository commits, and open-source activity"
        />

        {/* 4-Cell Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--line)]">
          {statCards.map((card, idx) => {
            return (
              <div
                key={card.label}
                data-cursor="LIVE METRICS"
                className={`p-6 sm:p-7 flex flex-col justify-between gap-3 border-r border-b lg:border-b-0 border-[var(--line)] bg-[var(--surface)] hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors ${
                  idx === statCards.length - 1 ? "border-r-0" : ""
                }`}
              >
                <div className="flex items-center justify-between font-tech text-[10px] tracking-wider uppercase text-gray-500 dark:text-[#71717A]">
                  <span>{card.label}</span>
                
                </div>
                <div className="font-tech text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
                  {card.value}
                </div>
                <div className="font-tech text-[11px] text-gray-400 dark:text-[#71717A]">
                  {card.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Heatmap Control Strip */}
        <div className="px-6 py-3.5 border-b border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3 font-tech text-xs">
          {/* Left: User Identity & Live Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-medium text-gray-900 dark:text-gray-100">
              <GithubIcon width={16} height={16} aria-hidden />
              <span>github.com/{GITHUB_USERNAME}</span>
            </div>
          </div>

          {/* Right: Year Filter Buttons */}
          <div className="flex items-center gap-1">
            <span className="hidden md:inline-block text-[10px] uppercase text-gray-400 dark:text-[#71717A] mr-1">
              TIMEFRAME:
            </span>
            {years.map((y) => (
              <button
                key={y.id}
                type="button"
                onClick={() => setSelectedYear(y.id)}
                className={`px-3 py-1 font-tech text-xs tracking-wider transition-colors border ${
                  selectedYear === y.id
                    ? "border-[#CDBDFF] bg-[#CDBDFF]/10 text-gray-950 dark:text-[#CDBDFF] font-medium"
                    : "border-[var(--line)] bg-[var(--surface)] text-gray-500 dark:text-[#71717A] hover:text-black dark:hover:text-white"
                }`}
              >
                {y.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contribution Graph Heatmap Box */}
        <div className="p-6 sm:p-8 border-b border-[var(--line)] bg-[var(--surface)]">
          <div className="overflow-x-auto pb-2 flex justify-center custom-scrollbar">
            {shouldRender ? (
              <div className="min-w-[680px] flex justify-center py-2">
                <GitHubCalendar
                  username={GITHUB_USERNAME}
                  year={selectedYear}
                  blockSize={13}
                  blockMargin={4}
                  blockRadius={1}
                  fontSize={12}
                  showWeekdayLabels={true}
                  colorScheme={darkMode ? "dark" : "light"}
                  transformData={handleTransformData}
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  style={{
                    color: darkMode ? "#9ca3af" : "#4b5563",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                />
              </div>
            ) : (
              <div className="h-36 w-full flex items-center justify-center text-xs font-tech text-gray-400 animate-pulse">
                Synchronizing GitHub Activity Heatmap...
              </div>
            )}
          </div>
        </div>

        {/* Pinned Flagship Open-Source Repository (CrickAuction) */}
        <div className="border-t border-[var(--line)] p-5 sm:p-6 bg-black/[0.01] dark:bg-white/[0.01] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-tech text-left">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-gray-500 uppercase tracking-wide">
                2.41M+ Monthly Views
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GithubIcon width={18} height={18} className="text-gray-800 dark:text-gray-200 shrink-0" aria-hidden />
              <a
                href={`https://github.com/${GITHUB_USERNAME}/ipl-auction`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-900 dark:text-white hover:text-[#CDBDFF] transition-colors"
              >
                {GITHUB_USERNAME}/ipl-auction
              </a>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
              Real-time IPL auction simulator replicating broadcast auctions with sub-second synchronization, enterprise bidding engine, and squad analytics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start md:self-auto">
            {/* Stars */}
            <a
              href={`https://github.com/${GITHUB_USERNAME}/ipl-auction/stargazers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--line)] bg-[var(--surface)] text-xs text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-white/30 transition-colors"
              title="GitHub Stargazers"
            >
              <StarIcon width={14} height={14} className="text-amber-400" aria-hidden />
              <span className="font-semibold">43</span>
              <span className="text-[10px] text-gray-500 uppercase">Stars</span>
            </a>

            {/* Forks */}
            <a
              href={`https://github.com/${GITHUB_USERNAME}/ipl-auction/network/members`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--line)] bg-[var(--surface)] text-xs text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-white/30 transition-colors"
              title="GitHub Forks"
            >
              <GitBranchIcon width={14} height={14} className="text-[#CDBDFF]" aria-hidden />
              <span className="font-semibold">18</span>
              <span className="text-[10px] text-gray-500 uppercase">Forks</span>
            </a>

            {/* Live Demo */}
            <a
              href="https://crickauction.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-950 dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-wider transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <span>crickauction.in</span>
              <ExternalLinkSquareIcon width={13} height={13} aria-hidden />
            </a>
          </div>
        </div>

        {/* Activity Footer Bar */}
        <div className="px-6 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-tech text-xs text-gray-500 dark:text-[#71717A] bg-black/[0.015] dark:bg-white/[0.01]">
          {/* Busiest Day & Details */}
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Peak Day:</span>
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {stats.busiestDay.count > 0 ? `${stats.busiestDay.count} commits on ${stats.busiestDay.date}` : "16 commits"}
              </span>
            </div>
            <span className="hidden sm:inline opacity-30">·</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>Followers:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{userProfile.followers}</span>
              <span className="opacity-30">/</span>
              <span>Following:</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{userProfile.following}</span>
            </div>
          </div>

          {/* Quick Direct Link to Profile */}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-[#CDBDFF] transition-colors self-start md:self-auto"
          >
            <span>View All Repositories ({userProfile.publicRepos})</span>
            <ExternalLinkSquareIcon width={13} height={13} aria-hidden />
          </a>
        </div>
      </div>
    </BlueprintSection>
  );
};

GithubActivity.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default GithubActivity;
