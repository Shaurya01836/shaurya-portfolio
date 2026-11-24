import { useState, useMemo } from "react";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import useUmamiStats from "../hooks/useUmamiStats";
import { ExternalLinkSquareIcon } from "./icons";
import { playMeasureTick } from "../utils/sound";

const UMAMI_SHARE_URL = "https://cloud.umami.is/share/UyzK9wHBN84hUbvy";

const formatDayLabel = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Generates smooth cubic Bézier spline across coordinate points
const getSmoothPath = (points) => {
  if (!points || points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
};

const AnalyticsSection = () => {
  const stats = useUmamiStats();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const statCards = [
    {
      label: "LAST 7 DAYS VIEWS",
      value: stats.sevenDaysViews !== null ? stats.sevenDaysViews.toLocaleString() : "--",
      sub: "Trailing 7 Days Pageviews",
      color: "text-emerald-500",
      cursor: "7D VIEWS",
    },
    {
      label: "LAST 7 DAYS VISITORS",
      value: stats.sevenDaysVisitors !== null ? stats.sevenDaysVisitors.toLocaleString() : "--",
      sub: "Unique Visitors Past Week",
      color: "text-blue-500",
      cursor: "7D VISITORS",
    },
    {
      label: "TOTAL ALL-TIME VIEWS",
      value: stats.totalViews !== null ? stats.totalViews.toLocaleString() : "--",
      sub: "All-Time Recorded Hits",
      color: "text-[#CDBDFF]",
      cursor: "TOTAL VIEWS",
    },
    {
      label: "LIVE READERS NOW",
      value: stats.active !== null ? stats.active : "--",
      sub: "Active in Past 5 Minutes",
      color: "text-amber-500",
      cursor: "LIVE VISITORS",
      isLive: true,
    },
  ];

  // SVG Geometry Dimensions
  const svgWidth = 800;
  const svgHeight = 220;
  const padLeft = 45;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const maxDailyViews = useMemo(() => {
    const rawMax = Math.max(1, ...stats.dailyViews.map((d) => d.y || 0));
    // Round up to nice visual interval
    return Math.ceil(rawMax / 5) * 5;
  }, [stats.dailyViews]);

  // Compute 2D SVG points
  const points = useMemo(() => {
    if (!stats.dailyViews || stats.dailyViews.length === 0) return [];
    const len = stats.dailyViews.length;
    return stats.dailyViews.map((day, i) => {
      const x = padLeft + (i / Math.max(1, len - 1)) * plotWidth;
      const normalizedY = (day.y || 0) / maxDailyViews;
      const y = padTop + plotHeight - normalizedY * plotHeight;
      return { x, y, raw: day, index: i };
    });
  }, [stats.dailyViews, maxDailyViews, padLeft, padTop, plotWidth, plotHeight]);

  const curvePath = useMemo(() => getSmoothPath(points), [points]);

  const areaPath = useMemo(() => {
    if (points.length < 2) return "";
    const bottomY = padTop + plotHeight;
    return `${curvePath} L ${points[points.length - 1].x} ${bottomY} L ${points[0].x} ${bottomY} Z`;
  }, [curvePath, points, padTop, plotHeight]);

  // Y-axis gridline levels
  const yTicks = [
    maxDailyViews,
    Math.round(maxDailyViews * 0.66),
    Math.round(maxDailyViews * 0.33),
    0,
  ];

  const handlePointHover = (i) => {
    if (i !== hoveredIndex) {
      setHoveredIndex(i);
      playMeasureTick();
    }
  };

  const activePoint = hoveredIndex !== null && points[hoveredIndex] ? points[hoveredIndex] : points[points.length - 1];

  return (
    <BlueprintSection
      id="analytics"
      ariaLabel="Live Website Analytics & Telemetry"
      rightAnnotation={{
        lines: ["live traffic stream", "verified by umami"],
        arrow: "down-left",
      }}
    >
      {/* 2-cell Section Header */}
      <SectionHeader
        number="08"
        label="TELEMETRY"
        title="Traffic"
        accentWord="Analytics"
        description="Real-time website traffic, pageviews, and visitor telemetry streaming directly from Umami Cloud"
      />

      {/* 4-Cell Specs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-[var(--line)]">
        {statCards.map((card, idx) => (
          <div
            key={card.label}
            data-cursor={card.cursor}
            className={`p-6 sm:p-7 flex flex-col justify-between gap-3 border-r border-b lg:border-b-0 border-[var(--line)] bg-[var(--surface)] hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-colors ${
              idx === statCards.length - 1 ? "border-r-0" : ""
            }`}
          >
            <div className="flex items-center justify-between font-tech text-[10px] tracking-wider uppercase text-gray-500 dark:text-[#71717A]">
              <span>{card.label}</span>
            </div>

            <div className="font-tech text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
              {stats.loading ? (
                <span className="text-gray-400 animate-pulse text-2xl">--</span>
              ) : (
                card.value
              )}
            </div>

            <div className="font-tech text-[11px] text-gray-400 dark:text-[#71717A]">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day Traffic Velocity Line / Area Graph */}
      <div className="p-6 sm:p-8 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="flex flex-col gap-4">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] pb-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-tech text-xs tracking-wider uppercase text-gray-700 dark:text-gray-300 font-semibold">
                [7-Day Traffic Velocity Graph]
              </span>
            </div>

            {/* Dynamic Active Inspector Pill */}
            {activePoint && (
              <div className="font-tech text-xs flex items-center gap-2 px-2.5 py-0.5 border border-[#CDBDFF]/40 bg-[#CDBDFF]/10 text-gray-900 dark:text-gray-100">
                <span className="text-gray-400 text-[10px] uppercase">
                  {activePoint.index === points.length - 1 ? "Today" : formatDayLabel(activePoint.raw?.x)}:
                </span>
                <span className="font-bold text-[#CDBDFF]">
                  {activePoint.raw?.y ?? 0}
                </span>
                <span className="text-[10px] text-gray-400">views</span>
              </div>
            )}
          </div>

          {/* SVG Architectural Blueprint Graph */}
          <div className="w-full relative py-2 select-none overflow-x-auto custom-scrollbar">
            {points.length > 0 ? (
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto min-w-[550px] overflow-visible block"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <defs>
                  {/* Subtle Blueprint Hatching under curve */}
                  <pattern
                    id="traffic-graph-hatch"
                    width="6"
                    height="6"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      className="text-[#CDBDFF]/25"
                    />
                  </pattern>

                  {/* Gradient fill under Bézier curve */}
                  <linearGradient id="traffic-area-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CDBDFF" stopOpacity="0.32" />
                    <stop offset="60%" stopColor="#CDBDFF" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#CDBDFF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Y-Axis Gridlines & Labels */}
                {yTicks.map((val) => {
                  const yPos = padTop + plotHeight - (val / maxDailyViews) * plotHeight;
                  return (
                    <g key={val}>
                      <line
                        x1={padLeft}
                        y1={yPos}
                        x2={svgWidth - padRight}
                        y2={yPos}
                        stroke="var(--line)"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={padLeft - 8}
                        y={yPos + 3.5}
                        textAnchor="end"
                        className="font-tech text-[10px] fill-gray-400 dark:fill-[#71717A]"
                      >
                        {val}
                      </text>
                    </g>
                  );
                })}

                {/* Fill Area Under Curve */}
                <path d={areaPath} fill="url(#traffic-area-gradient)" />
                <path d={areaPath} fill="url(#traffic-graph-hatch)" />

                {/* Main Architectural Smooth Velocity Curve */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#CDBDFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Vertical Laser Guideline when hovering */}
                {activePoint && (
                  <line
                    x1={activePoint.x}
                    y1={padTop}
                    x2={activePoint.x}
                    y2={padTop + plotHeight}
                    stroke="#CDBDFF"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    className="opacity-75"
                  />
                )}

                {/* Coordinate Nodes & Interaction Zones */}
                {points.map((p, i) => {
                  const isHovered = hoveredIndex === i;
                  const isLatest = i === points.length - 1;
                  const isSelected = activePoint && activePoint.index === i;

                  return (
                    <g
                      key={p.raw?.x || i}
                      className="cursor-pointer"
                      onMouseEnter={() => handlePointHover(i)}
                    >
                      {/* Generous invisible scrubbing target */}
                      <rect
                        x={p.x - 20}
                        y={padTop}
                        width="40"
                        height={plotHeight}
                        fill="transparent"
                      />

                      {/* X-Axis Date Labels */}
                      <text
                        x={p.x}
                        y={padTop + plotHeight + 20}
                        textAnchor="middle"
                        className={`font-tech text-[10px] transition-colors ${
                          isSelected
                            ? "fill-gray-950 dark:fill-white font-bold"
                            : "fill-gray-400 dark:fill-[#71717A]"
                        }`}
                      >
                        {isLatest ? "Today" : formatDayLabel(p.raw?.x)}
                      </text>

                      {/* Point Node Circle */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 6 : isLatest ? 4.5 : 3.5}
                        fill={isHovered ? "#CDBDFF" : isLatest ? "#CDBDFF" : "var(--bg-primary)"}
                        stroke="#CDBDFF"
                        strokeWidth={isHovered ? 2.5 : 2}
                        className="transition-all duration-150"
                      />

                      {/* Pulsing ring on latest today point */}
                      {isLatest && !isHovered && (
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="8"
                          fill="none"
                          stroke="#CDBDFF"
                          strokeWidth="1"
                          className="animate-ping opacity-60"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            ) : (
              <div className="h-44 flex items-center justify-center font-tech text-xs text-gray-400 animate-pulse">
                Synchronizing 7-Day Velocity Curve...
              </div>
            )}
          </div>
        </div>
      </div>

   
    </BlueprintSection>
  );
};

export default AnalyticsSection;
