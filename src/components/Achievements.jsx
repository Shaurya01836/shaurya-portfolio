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
    <div className="flex flex-col w-full px-8 pb-10 gap-2 text-black dark:text-white">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Achievements
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[minmax(220px,auto)]">
        {displayedAchievements.map((achievement, index) => {
          const coverImg = achievement.imageUrl || achievement.image;
          return (
            <BentoCard
              key={achievement.id}
              title={achievement.title}
              description={`${achievement.event} (${achievement.year}) • ${achievement.description}`}
              header={
                coverImg ? (
                  <img
                    src={coverImg}
                    alt={`${achievement.title} cover`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-[#151515] text-gray-400 text-sm">
                    No cover image
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
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] px-6 py-2.5 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm transition-all duration-300 hover:border-gray-400 dark:hover:border-[#444444] hover:bg-gray-50 dark:hover:bg-[#141414] hover:shadow-md"
          >
            <span>{showAll ? "Show Less" : `Show More (${achievements.length - 4} more)`}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
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
              className="w-full max-w-5xl max-h-[85vh] flex flex-col relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedAchievement.title} details`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="absolute z-50 right-4 top-4 rounded-full bg-white md:bg-white/80 p-2 text-gray-700 shadow-sm md:backdrop-blur-md transition hover:bg-white hover:text-gray-900 dark:bg-[#0A0A0A] dark:md:bg-[#0A0A0A]/80 dark:text-gray-300 dark:hover:bg-[#111111] dark:hover:text-white border border-gray-200 dark:border-white/10"
                aria-label="Close achievement details"
              >
                <RiCloseLine size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-y-auto min-h-0">
                <div className="flex min-h-[260px] w-full items-center justify-center bg-gray-50 p-4 dark:bg-[#050505]">
                  {selectedAchievement.imageUrl ? (
                    <div className="relative w-full flex justify-center items-center">
                      {!imageLoaded && (
                        <div className="absolute inset-0 w-full h-full min-h-[260px] rounded-xl bg-gray-200 dark:bg-[#111111] animate-pulse border border-gray-200 dark:border-[#1F1F1F]" />
                      )}
                      <img
                        src={selectedAchievement.imageUrl}
                        alt={`${selectedAchievement.title} certificate`}
                        className={`max-h-[70vh] w-full rounded-xl border border-gray-200 object-contain dark:border-[#1F1F1F] transition-opacity duration-300 ${imageLoaded ? 'opacity-100 relative z-10' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  ) : (
                    <div className="w-full rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      Certificate image not available
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col p-6 md:p-8">
                  <h3 className="pr-16 text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedAchievement.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {selectedAchievement.event} • {selectedAchievement.year}
                  </p>

                  <p className="mt-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {selectedAchievement.description}
                  </p>

                  {extraDetails.length > 0 && (
                    <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                      {extraDetails.map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1">
                          <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {formatLabel(key)}
                          </span>
                          <span className="text-sm text-gray-800 dark:text-gray-200">
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
