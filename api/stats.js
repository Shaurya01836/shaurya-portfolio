/* global process */
export default async function handler(req, res) {
  // CORS & Edge Caching Headers (cached for 60s at Vercel's global edge)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=180"
  );

  const shareId = process.env.UMAMI_SHARE_ID || "UyzK9wHBN84hUbvy";

  try {
    // 1. Fetch public share session token from Umami Cloud
    const shareRes = await fetch(
      `https://cloud.umami.is/analytics/us/api/share/${shareId}`,
      { headers: { Accept: "application/json" } }
    );
    if (!shareRes.ok) {
      throw new Error(`Umami share token request failed with status ${shareRes.status}`);
    }
    const shareData = await shareRes.json();

    const headers = {
      "x-umami-share-token": shareData.token,
      "x-umami-share-context": shareData.shareId,
      Accept: "application/json",
    };

    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    // 2. Query real stats in parallel: 7-day, all-time, active visitors, and daily breakdown
    const [sevenDayRes, allTimeRes, activeRes, pageviewsRes] =
      await Promise.allSettled([
        fetch(
          `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/stats?startAt=${sevenDaysAgo}&endAt=${now}`,
          { headers }
        ),
        fetch(
          `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/stats?startAt=0&endAt=${now}`,
          { headers }
        ),
        fetch(
          `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/active`,
          { headers }
        ),
        fetch(
          `https://cloud.umami.is/analytics/us/api/websites/${shareData.websiteId}/pageviews?startAt=${sevenDaysAgo}&endAt=${now}&unit=day`,
          { headers }
        ),
      ]);

    let sevenDaysViews = 0;
    let sevenDaysVisitors = 0;
    let totalViews = 0;
    let totalVisitors = 0;
    let active = 1;
    let dailyViews = [];

    if (sevenDayRes.status === "fulfilled" && sevenDayRes.value.ok) {
      const data = await sevenDayRes.value.json();
      sevenDaysViews = data.pageviews?.value ?? data.pageviews ?? 0;
      sevenDaysVisitors = data.visitors?.value ?? data.visitors ?? 0;
    }

    if (allTimeRes.status === "fulfilled" && allTimeRes.value.ok) {
      const data = await allTimeRes.value.json();
      totalViews = data.pageviews?.value ?? data.pageviews ?? 0;
      totalVisitors = data.visitors?.value ?? data.visitors ?? 0;
    }

    if (activeRes.status === "fulfilled" && activeRes.value.ok) {
      const data = await activeRes.value.json();
      active = data.visitors ?? data.x ?? 1;
    }

    if (pageviewsRes.status === "fulfilled" && pageviewsRes.value.ok) {
      const data = await pageviewsRes.value.json();
      dailyViews = data.pageviews || [];
    }

    return res.status(200).json({
      configured: true,
      sevenDaysViews,
      sevenDaysVisitors,
      totalViews,
      totalVisitors,
      active,
      dailyViews,
      shareId,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Umami stats fetch error:", err);
    return res.status(500).json({
      configured: false,
      sevenDaysViews: null,
      sevenDaysVisitors: null,
      totalViews: null,
      totalVisitors: null,
      active: null,
      dailyViews: [],
      error: err.message,
    });
  }
}
