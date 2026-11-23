import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { 
  CodeIcon, 
  CopyIcon, 
  CopyCopiedIcon, 
  MultipleCrossCancelIcon 
} from "../icons";
import { 
  playCloseSound, 
  playMeasureTick, 
  playInspectSnap, 
  playCopySuccessChime, 
  playDevModeToggleSound 
} from "../../utils/sound";
import BlueprintParticles from "./BlueprintParticles";

export const DevModeInspector = ({ isDevMode, setIsDevMode }) => {
  const [hoveredRect, setHoveredRect] = useState(null);
  const [hoveredInfo, setHoveredInfo] = useState(null);
  const [inspectedElement, setInspectedElement] = useState(null);
  const [copiedType, setCopiedType] = useState(null);
  const [burstType, setBurstType] = useState(null);
  const [burstCount, setBurstCount] = useState(0);
  const lastTargetRef = useRef(null);
  const lastTickTimeRef = useRef(0);

  // Keyboard shortcut listener: Hold Alt/Option, press Alt+D, or Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Alt+D
      if (e.altKey && (e.key === "d" || e.key === "D")) {
        e.preventDefault();
        setIsDevMode((prev) => {
          const next = !prev;
          playDevModeToggleSound(next);
          return next;
        });
        return;
      }

      // Close on Escape
      if (e.key === "Escape") {
        if (inspectedElement) {
          setInspectedElement(null);
          playCloseSound();
        } else if (isDevMode) {
          setIsDevMode(false);
          playDevModeToggleSound(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDevMode, inspectedElement, setIsDevMode]);

  // Extract styling specs from DOM element
  const getElementSpecs = useCallback((el) => {
    if (!el || typeof el.getBoundingClientRect !== "function") return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);

    const tagName = el.tagName.toLowerCase();
    const id = el.id ? `#${el.id}` : "";
    const rawClass = typeof el.className === "string" ? el.className.trim() : "";

    const padding = `${parseInt(style.paddingTop || 0)}px ${parseInt(style.paddingRight || 0)}px ${parseInt(style.paddingBottom || 0)}px ${parseInt(style.paddingLeft || 0)}px`;
    const margin = `${parseInt(style.marginTop || 0)}px ${parseInt(style.marginRight || 0)}px ${parseInt(style.marginBottom || 0)}px ${parseInt(style.marginLeft || 0)}px`;
    const font = `${(style.fontFamily || "sans-serif").split(",")[0].replace(/['"]/g, "")} ${Math.round(parseFloat(style.fontSize || 14))}px`;
    const color = style.color;
    const background = style.backgroundColor;
    const borderColor = style.borderColor;
    const borderRadius = style.borderRadius;

    return {
      tagName,
      id,
      selector: `<${tagName}${id}>`,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      padding,
      margin,
      font,
      color,
      background,
      borderColor,
      borderRadius,
      className: rawClass,
      textSnippet: (el.innerText || "").slice(0, 60).trim(),
    };
  }, []);

  // Mousemove listener when Dev Mode is active
  useEffect(() => {
    if (!isDevMode) {
      setHoveredRect(null);
      setHoveredInfo(null);
      return;
    }

    let rafId;

    const handleMouseMove = (e) => {
      rafId = requestAnimationFrame(() => {
        // Find element under cursor
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (!target) return;

        // Skip inspector UI elements
        if (target.closest("[data-dev-inspector]")) return;

        // Only inspect meaningful elements
        if (target === document.body || target === document.documentElement) {
          setHoveredRect(null);
          setHoveredInfo(null);
          return;
        }

        const rect = target.getBoundingClientRect();
        setHoveredRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });

        if (target !== lastTargetRef.current) {
          lastTargetRef.current = target;
          const specs = getElementSpecs(target);
          setHoveredInfo(specs);

          const now = performance.now();
          if (now - lastTickTimeRef.current > 75) {
            playMeasureTick();
            lastTickTimeRef.current = now;
          }
        }
      });
    };

    const handleScroll = () => {
      if (lastTargetRef.current) {
        const rect = lastTargetRef.current.getBoundingClientRect();
        setHoveredRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    const handleClick = (e) => {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (!target || target.closest("[data-dev-inspector]")) return;

      e.preventDefault();
      e.stopPropagation();

      playInspectSnap();
      const specs = getElementSpecs(target);
      setInspectedElement(specs);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, true);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDevMode, getElementSpecs]);

  const copyToClipboard = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    playCopySuccessChime();
    setCopiedType(type);
    setBurstType(type);
    setBurstCount((c) => c + 1);
    setTimeout(() => setCopiedType(null), 2500);
  };

  if (!isDevMode) return null;

  return (
    <div data-dev-inspector="true">
      {/* 1. Live Measurement Bounding Box & Dimension Lines */}
      {hoveredRect && !inspectedElement && (
        <div
          className="fixed pointer-events-none z-[9990] transition-all duration-75"
          style={{
            top: `${hoveredRect.top}px`,
            left: `${hoveredRect.left}px`,
            width: `${hoveredRect.width}px`,
            height: `${hoveredRect.height}px`,
          }}
        >
          {/* Lavender Bounding Box Outline */}
          <div className="absolute inset-0 border-2 border-[#CDBDFF] bg-[#CDBDFF]/10 shadow-[0_0_12px_rgba(205,189,255,0.25)]" />

          {/* 4 Corner Figma Handles */}
          <span className="absolute -top-1 -left-1 w-2 h-2 bg-white dark:bg-black border border-[#CDBDFF] rounded-[0.5px]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white dark:bg-black border border-[#CDBDFF] rounded-[0.5px]" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white dark:bg-black border border-[#CDBDFF] rounded-[0.5px]" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white dark:bg-black border border-[#CDBDFF] rounded-[0.5px]" />

          {/* Width Dimension Ruler (Top) */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-[1px] bg-[#CDBDFF] text-black font-tech text-[10px] font-bold tracking-wider shadow-sm whitespace-nowrap">
            <span>{Math.round(hoveredRect.width)} px</span>
          </div>

          {/* Height Dimension Ruler (Right) */}
          <div className="absolute top-1/2 -right-2 translate-x-full -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-[1px] bg-[#CDBDFF] text-black font-tech text-[10px] font-bold tracking-wider shadow-sm whitespace-nowrap">
            <span>{Math.round(hoveredRect.height)} px</span>
          </div>

          {/* Top-Left Tag & Spec Pill */}
          {hoveredInfo && (
            <div className="absolute -top-11 left-0 flex items-center gap-2 px-2 py-1 rounded-[1px] bg-gray-950/95 dark:bg-[#0A0A0A]/95 text-white border border-[#CDBDFF]/80 font-tech text-[10px] tracking-wide shadow-lg whitespace-nowrap backdrop-blur-xs">
              <span className="text-[#CDBDFF] font-semibold">{hoveredInfo.selector}</span>
              <span className="opacity-40">|</span>
              <span className="text-gray-300">{hoveredInfo.font}</span>
              <span className="opacity-40">|</span>
              <span className="text-emerald-400 font-medium">Click to inspect</span>
            </div>
          )}
        </div>
      )}

      {/* 2. Floating Dev Mode Status Pill (Bottom Center) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9995] flex items-center gap-3 px-4 py-2 bg-gray-950/90 dark:bg-[#0A0A0E]/95 backdrop-blur-md border border-[#CDBDFF] text-white shadow-2xl font-tech text-xs rounded-full">
        <span className="flex items-center gap-1.5 font-semibold tracking-wider text-[#CDBDFF] uppercase">
          <span>Figma Dev Mode</span>
        </span>
        <span className="hidden sm:inline-block text-gray-400 opacity-60">|</span>
        <span className="hidden sm:inline-block text-gray-300 text-[11px]">
          Hover to measure · Click for code · Esc to exit
        </span>
        <button
          type="button"
          onClick={() => {
            playDevModeToggleSound(false);
            setIsDevMode(false);
          }}
          className="ml-1 px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 text-[10px] uppercase font-semibold transition-colors"
        >
          Exit
        </button>
      </div>

      {/* 3. Code & Blueprint Inspection Drawer (Figma Dev Mode Panel) */}
      {inspectedElement && (
        <div className="fixed inset-x-0 bottom-0 z-[10000] max-h-[85vh] sm:max-h-[75vh] flex justify-center p-3 sm:p-5 pointer-events-auto animate-fade-in-up">
          <div className="w-full max-w-4xl bg-[var(--surface)] border-2 border-[#CDBDFF] shadow-2xl flex flex-col overflow-hidden max-h-full">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--line)] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-[#CDBDFF]/20 border border-[#CDBDFF] text-[#CDBDFF]">
                  <CodeIcon width={18} height={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-[#CDBDFF] font-semibold">
                    <span>Figma Inspector // Spec &amp; Code</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{inspectedElement.selector}</span>
                    <span className="text-xs font-tech text-gray-500 font-normal">
                      ({inspectedElement.width}px × {inspectedElement.height}px)
                    </span>
                  </h3>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  playCloseSound();
                  setInspectedElement(null);
                }}
                className="p-1.5 text-gray-500 hover:text-black dark:hover:text-white border border-[var(--line)] hover:border-gray-400 transition-colors"
                title="Close Inspector (Esc)"
                aria-label="Close Inspector"
              >
                <MultipleCrossCancelIcon width={16} height={16} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6 text-left">
              {/* Box Model Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-tech text-xs">
                <div className="p-3 border border-[var(--line)] bg-black/[0.015] dark:bg-white/[0.015] flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Dimensions</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {inspectedElement.width} × {inspectedElement.height} px
                  </span>
                </div>
                <div className="p-3 border border-[var(--line)] bg-black/[0.015] dark:bg-white/[0.015] flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Padding</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {inspectedElement.padding}
                  </span>
                </div>
                <div className="p-3 border border-[var(--line)] bg-black/[0.015] dark:bg-white/[0.015] flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Typography</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {inspectedElement.font}
                  </span>
                </div>
                <div className="p-3 border border-[var(--line)] bg-black/[0.015] dark:bg-white/[0.015] flex flex-col gap-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Border Radius</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {inspectedElement.borderRadius || "0px"}
                  </span>
                </div>
              </div>

              {/* Tailwind Classes Snippet */}
              {inspectedElement.className && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-xs tracking-wider uppercase text-gray-500 font-semibold">
                      Tailwind Classes
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(inspectedElement.className, "classes")}
                      className="relative inline-flex items-center gap-1.5 px-3 py-1 bg-black/[0.03] dark:bg-white/[0.05] border border-[var(--line)] hover:border-gray-400 font-tech text-xs text-gray-700 dark:text-gray-200 transition-colors"
                    >
                      <BlueprintParticles trigger={burstType === "classes" ? burstCount : 0} count={12} />
                      {copiedType === "classes" ? (
                        <>
                          <CopyCopiedIcon width={13} height={13} className="text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <CopyIcon width={13} height={13} />
                          <span>Copy Classes</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-black/[0.04] dark:bg-black/60 border border-[var(--line)] font-tech text-xs text-gray-800 dark:text-gray-200 leading-relaxed break-all select-all">
                    {inspectedElement.className}
                  </div>
                </div>
              )}

              {/* Ready-to-use React JSX Code Snippet */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-tech text-xs tracking-wider uppercase text-gray-500 font-semibold">
                    JSX Component Snippet
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const snippet = `<${inspectedElement.tagName} className="${inspectedElement.className}">\n  {/* ${inspectedElement.textSnippet || "Content"} */}\n</${inspectedElement.tagName}>`;
                      copyToClipboard(snippet, "jsx");
                    }}
                    className="relative inline-flex items-center gap-1.5 px-3 py-1 bg-[#CDBDFF] text-black font-tech text-xs font-semibold hover:bg-[#bfa7ff] transition-colors"
                  >
                    <BlueprintParticles trigger={burstType === "jsx" ? burstCount : 0} count={14} />
                    {copiedType === "jsx" ? (
                      <>
                        <CopyCopiedIcon width={13} height={13} />
                        <span>Copied Snippet!</span>
                      </>
                    ) : (
                      <>
                        <CopyIcon width={13} height={13} />
                        <span>Copy JSX</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 bg-gray-950 text-gray-200 border border-[var(--line)] font-tech text-xs overflow-x-auto selection:bg-[#CDBDFF]/40">
                  <code>{`<${inspectedElement.tagName} className="${inspectedElement.className}">\n  {/* ${inspectedElement.textSnippet || "Content"} */}\n</${inspectedElement.tagName}>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DevModeInspector.propTypes = {
  isDevMode: PropTypes.bool.isRequired,
  setIsDevMode: PropTypes.func.isRequired,
};

export default DevModeInspector;

