/**
 * Client-Side Cache Engine with Memory + SessionStorage & SWR
 * - 0ms instantaneous page transitions
 * - Request deduplication for simultaneous in-flight queries
 * - SessionStorage backup (persists on browser refresh within session)
 * - Stale-While-Revalidate pattern (returns cached data instantly, refreshes if stale)
 */

const memoryCache = new Map();
const inFlightRequests = new Map();

// Default TTLs in milliseconds
export const CACHE_TTL = {
  FIRESTORE: 10 * 60 * 1000,    // 10 minutes for projects, blogs, achievements, profile
  ANALYTICS: 2 * 60 * 1000,     // 2 minutes for Umami analytics stats
  EXTERNAL_API: 15 * 60 * 1000, // 15 minutes for GitHub and LeetCode APIs
};

/**
 * Retrieves cached entry from memory or sessionStorage
 */
export const getCachedData = (key) => {
  // 1. In-memory check (instantaneous 0ms)
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }

  // 2. SessionStorage fallback
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const stored = sessionStorage.getItem(`app_cache_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        memoryCache.set(key, parsed);
        return parsed;
      }
    } catch (e) {
      void e;
    }
  }

  return null;
};

/**
 * Stores data in memory and sessionStorage
 */
export const setCachedData = (key, data, ttl = CACHE_TTL.FIRESTORE) => {
  const entry = {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttl,
  };

  memoryCache.set(key, entry);

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      sessionStorage.setItem(`app_cache_${key}`, JSON.stringify(entry));
    } catch (e) {
      void e;
    }
  }

  return data;
};

/**
 * Fetches data with automatic caching and request deduplication
 * @param {string} key - Unique cache key
 * @param {Function} fetcher - Async function returning data
 * @param {number} ttl - TTL in milliseconds
 * @param {boolean} forceRefresh - If true, ignores cache and fetches fresh
 */
export const cachedFetch = async (key, fetcher, ttl = CACHE_TTL.FIRESTORE, forceRefresh = false) => {
  const cached = getCachedData(key);

  // Return fresh cache immediately
  if (!forceRefresh && cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  // Deduplicate in-flight promises
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }

  const promise = (async () => {
    try {
      const result = await fetcher();
      if (result !== undefined && result !== null) {
        setCachedData(key, result, ttl);
      }
      return result;
    } catch (err) {
      // Gracefully serve stale cached data on network error
      if (cached && cached.data) {
        console.warn(`[Client Cache] Network fetch failed for "${key}", serving cached copy.`, err);
        return cached.data;
      }
      throw err;
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, promise);

  // Stale-While-Revalidate: return stale data immediately while background promise updates cache
  if (!forceRefresh && cached && cached.data) {
    return cached.data;
  }

  return promise;
};

/**
 * Invalidates cache by exact key or prefix (e.g. "firestore_blogs")
 */
export const invalidateCache = (prefix = "") => {
  if (!prefix) {
    memoryCache.clear();
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const keys = Object.keys(sessionStorage);
        keys.forEach((k) => {
          if (k.startsWith("app_cache_")) sessionStorage.removeItem(k);
        });
      } catch (e) {
        void e;
      }
    }
    return;
  }

  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }

  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const keys = Object.keys(sessionStorage);
      keys.forEach((k) => {
        if (k.startsWith(`app_cache_${prefix}`)) sessionStorage.removeItem(k);
      });
    } catch (e) {
      void e;
    }
  }
};

