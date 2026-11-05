import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import BentoCard from "./BentoCard";
import { RiCloseLine } from "@remixicon/react";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const listener = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (selectedAchievement) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [selectedAchievement, lenis]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(
          collection(db, "achievements"),
          orderBy("year", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  useEffect(() => {
    if (!selectedAchievement) return;

    setImageLoaded(false);
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedAchievement(null);
      }
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        const activeEl = document.activeElement;
        const isInsideModal = activeEl && activeEl.closest("[role='dialog']");
        if (!isInsideModal) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedAchievement]);

  const [showAll, setShowAll] = useState(false);

  if (loading) return <div className="px-8 pb-10">Loading Achievements...</div>;

  const hiddenDetailKeys = new Set([
    "id",
    "title",
    "event",
    "year",
    "description",
    "imageUrl",
    "image",
    "order",
    "createdAt",
    "created_at",
    "updatedAt",
    "updated_at",
    "timestamp",
  ]);
  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());

  const extraDetails = selectedAchievement
    ? Object.entries(selectedAchievement).filter(
        ([key, value]) =>
          !hiddenDetailKeys.has(key) &&
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (typeof value === "string" || typeof value === "number"),
      )
    : [];

  const getCardSpan = (index) => {
    if (index === 1 || index === 2) {
      return "md:col-span-2";
    }
    return "md:col-span-1";
  };

  const displayedAchievements = showAll ? achievements : achievements.slice(0, 4);

  return (
    <div className="flex flex-col w-full px-8 py-10 gap-4 text-black dark:text-white transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Achievements
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Grid Sub-bar with System Metadata */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border border-gray-200 dark:border-[#1F1F1F] rounded-md select-none">
        <div className="flex items-center gap-2">
          <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
            Honors & Recognitions
          </h2>
        </div>
        <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
          {achievements.length} Verified Entries
        </span>
      </div>

      {/* Bento Grid - Exact Same Layout Maintained */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[minmax(220px,auto)]">
        {displayedAchievements.map((achievement, index) => {
          const coverImg = achievement.imageUrl || achievement.image;
          return (
            <BentoCard
              key={achievement.id}
              index={index}
              year={achievement.year}
              event={achievement.event}
              title={achievement.title}
              description={achievement.description}
              header={
                coverImg ? (
                  <img
                    src={coverImg}
                    alt={`${achievement.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#0E0E0E] text-gray-400 text-xs font-tech">
                    No image available
                  </div>
                )
              }
              className={getCardSpan(index)}
              onClick={() => setSelectedAchievement(achievement)}
              ariaLabel={`Open details for ${achievement.title}`}
            />
          );
        })}
      </div>

      {achievements.length > 4 && (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2 rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/90 dark:bg-[#121212] px-5 py-2 font-tech text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 shadow-xs transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#181818]"
          >
            <span>{showAll ? "Show Less" : `Show More (${achievements.length - 4} more)`}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "opacity" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 md:bg-black/60 p-4 md:backdrop-blur-sm"
            onClick={() => setSelectedAchievement(null)}
            data-lenis-prevent
          >
            <motion.div
              initial={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="w-full max-w-5xl max-h-[85vh] flex flex-col relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedAchievement.title} details`}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Modal Technical Header Strip */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/90 dark:bg-[#111111]/90 border-b border-gray-200 dark:border-[#1F1F1F] select-none">
                <span className="font-tech text-xs text-gray-400 dark:text-gray-500 font-medium">
                  SPECIFICATION : {selectedAchievement.title}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedAchievement(null)}
                  className="rounded border border-gray-200 dark:border-[#222222] bg-white dark:bg-[#0A0A0A] p-1 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Close achievement details"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto min-h-0">
                <div className="flex min-h-[260px] w-full items-center justify-center bg-gray-50/60 p-4 dark:bg-[#080808] border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#1F1F1F]">
                  {selectedAchievement.imageUrl ? (
                    <div className="relative w-full flex justify-center items-center">
                      {!imageLoaded && (
                        <div className="absolute inset-0 w-full h-full min-h-[260px] rounded bg-gray-200 dark:bg-[#111111] animate-pulse border border-gray-200 dark:border-[#1F1F1F]" />
                      )}
                      <img
                        src={selectedAchievement.imageUrl}
                        alt={`${selectedAchievement.title} certificate`}
                        className={`max-h-[70vh] w-full rounded border border-gray-200 object-contain dark:border-[#1F1F1F] transition-opacity duration-300 ${imageLoaded ? 'opacity-100 relative z-10' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  ) : (
                    <div className="w-full rounded border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      Certificate image not available
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedAchievement.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-tech text-xs text-gray-500 dark:text-gray-400">
                      {selectedAchievement.event}
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span className="font-tech text-xs font-semibold px-2 py-0.5 rounded border border-gray-200 dark:border-[#222222] bg-gray-50 dark:bg-[#121212] text-gray-700 dark:text-gray-300">
                      {selectedAchievement.year}
                    </span>
                  </div>

                  <p className="mt-6 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {selectedAchievement.description}
                  </p>

                  {extraDetails.length > 0 && (
                    <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 dark:border-[#1F1F1F]">
                      {extraDetails.map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1">
                          <span className="font-tech text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {formatLabel(key)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;
