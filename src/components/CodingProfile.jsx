import { useState, useEffect } from "react";

const CodingProfile = ({ darkMode }) => {
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
      
        const response = await fetch(
          `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`
        );
        
      
        const calendarResponse = await fetch(
          `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`
        );

        if (!response.ok || !calendarResponse.ok) throw new Error("Failed to fetch LeetCode data");

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

      } catch (error) {
        console.error("LeetCode Fetch Error:", error);
        setLeetCodeStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load stats",
        }));
      }
    };

    fetchLeetCode();
  }, [LEETCODE_USERNAME]);

  
  if (leetCodeStats.error) {
    return (
       <div className="flex flex-col w-full px-8 pb-10 gap-4 text-black dark:text-white">
         <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-md">
           Unable to load LeetCode profile. Please try again later.
         </div>
       </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-8 pb-10 gap-4 text-black dark:text-white transition-colors duration-300">
      <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
        Coding Profile
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full">
        <div className="col-span-1 md:col-span-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 bg-white dark:bg-[#0A0A0A] flex flex-col justify-between min-h-[250px]">
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 flex-grow">
            <div className="flex flex-col items-center">
              <span className="text-6xl font-bold text-gray-900 dark:text-white">
                {leetCodeStats.loading ? "0" : leetCodeStats.totalSolved}
              </span>
              <span className="text-gray-500 mt-2">Problems Solved</span>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full max-w-xs">
              <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/10 p-3 rounded border border-green-100 dark:border-green-900/30">
                <span className="text-green-700 dark:text-green-400 font-medium">Easy</span>
                <span className="font-bold text-green-800 dark:text-green-300">
                  {leetCodeStats.easy}
                </span>
              </div>
              <div className="flex justify-between items-center bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded border border-yellow-100 dark:border-yellow-900/30">
                <span className="text-yellow-700 dark:text-yellow-400 font-medium">Medium</span>
                <span className="font-bold text-yellow-800 dark:text-yellow-300">
                  {leetCodeStats.medium}
                </span>
              </div>
              <div className="flex justify-between items-center bg-red-50 dark:bg-red-900/10 p-3 rounded border border-red-100 dark:border-red-900/30">
                <span className="text-red-700 dark:text-red-400 font-medium">Hard</span>
                <span className="font-bold text-red-800 dark:text-red-300">
                  {leetCodeStats.hard}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4 h-full">
          <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors min-h-[115px]">
            <span className="text-gray-500 text-sm mb-1">Active Days</span>
            <span className="text-3xl font-bold text-blue-500">
              {leetCodeStats.loading ? "..." : leetCodeStats.activeDays}
            </span>
            <span className="text-xs text-gray-400 mt-1">Total Days</span>
          </div>

          <div className="flex-1 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md p-6 bg-white dark:bg-[#0A0A0A] flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-[#161b22] transition-colors min-h-[115px]">
            <span className="text-gray-500 text-sm mb-1">Max Streak</span>
            <span className="text-3xl font-bold text-orange-500">
              {leetCodeStats.loading ? "..." : `${leetCodeStats.maxStreak} 🔥`}
            </span>
            <span className="text-xs text-gray-400 mt-1">Days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingProfile;