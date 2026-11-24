import { useState, useEffect } from "react";
import { cachedFetch, getCachedData, CACHE_TTL } from "../utils/cache";

/**
 * useUmamiStats
 * Fetches real analytics metrics (7-day views/visitors, all-time totals, active readers, and daily series)
 * from the serverless endpoint `/api/stats`.
 * 100% Real Live Data fetched via Umami Cloud Public Share.
 */
export const useUmamiStats = () => {
  const [stats, setStats] = useState(() => {
    const cached = getCachedData("api_umami_stats");
    if (cached && cached.data) {
      const data = cached.data;
      return {
        sevenDaysViews: data.sevenDaysViews ?? null,
        sevenDaysVisitors: data.sevenDaysVisitors ?? null,
        totalViews: data.totalViews ?? null,
        totalVisitors: data.totalVisitors ?? null,
        active: data.active ?? null,
        dailyViews: Array.isArray(data.dailyViews) ? data.dailyViews : [],
        loading: false,
        configured: Boolean(data.configured),
      };
    }
    return {
      sevenDaysViews: null,
      sevenDaysVisitors: null,
      totalViews: null,
      totalVisitors: null,
      active: null,
      dailyViews: [],
      loading: true,
      configured: false,
    };
  });

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const data = await cachedFetch(
          "api_umami_stats",
          async () => {
            const res = await fetch("/api/stats");
            if (!res.ok) throw new Error("Failed to load analytics");
            return await res.json();
          },
          CACHE_TTL.ANALYTICS
        );

        if (isMounted) {
          setStats({
            sevenDaysViews: data.sevenDaysViews ?? null,
            sevenDaysVisitors: data.sevenDaysVisitors ?? null,
            totalViews: data.totalViews ?? null,
            totalVisitors: data.totalVisitors ?? null,
            active: data.active ?? null,
            dailyViews: Array.isArray(data.dailyViews) ? data.dailyViews : [],
            loading: false,
            configured: Boolean(data.configured),
          });
        }
      } catch {
        if (isMounted) {
          setStats((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      }
    };

    fetchStats();
    // Poll every 60 seconds
    const interval = setInterval(fetchStats, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return stats;
};

export default useUmamiStats;
