import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiFileTextLine, RiGithubLine } from "@remixicon/react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { NameSelectionDoodle } from "./Doodles";
import StatusStrip from "./ui/StatusStrip";
import HatchBand from "./ui/HatchBand";
import BlueprintSection from "./ui/BlueprintSection";

const DEFAULT_RESUME_URL =
  "https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/26823516/MjY4MjM1MTY=.pdf";

const DEFAULT_FEATURED = [
  {
    id: "tek-connect",
    title: "TEK CONNECT",
    caption: "Presenting AyurHerb at TEK Connect · 2nd Place among 50+ Engineering Teams",
    tag: "TEK CONNECT 2ND",
    src: "https://res.cloudinary.com/drl6ky9as/image/upload/v1786369908/ChatGPT_Image_Aug_10_2026_04_59_57_PM_cnn32h.png",
  },
  {
    id: "coder-of-the-year",
    title: "CODER OF THE YEAR",
    caption: "Coder of the Year · Outstanding Algorithmic Rigor & Technical Achievement",
    tag: "CODER OF THE YEAR",
    src: "https://res.cloudinary.com/drl6ky9as/image/upload/v1786369908/ChatGPT_Image_Aug_10_2026_05_05_56_PM_gnbymn.png",
  },
];

const Hero = () => {
  const [resumeUrl, setResumeUrl] = useState(DEFAULT_RESUME_URL);
  const [featuredImages, setFeaturedImages] = useState(DEFAULT_FEATURED);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        // Fetch resume URL
        const q = query(collection(db, "profile"), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          const dbResume = data.resumeUrl || data.resumeLink || data.reusmeUrl;
          if (typeof dbResume === "string" && dbResume.trim()) {
            setResumeUrl(dbResume.trim());
          }
        }

        // Fetch featured images for Tek Connect and Coder of the Year
        const featSnap = await getDocs(collection(db, "featuredImages"));
        if (!featSnap.empty) {
          const docs = featSnap.docs.map((d) => d.data());
          const tekDoc = docs.find((d) =>
            (d.title || d.name || "").toLowerCase().includes("tek connect")
          );
          const coderDoc = docs.find((d) =>
            (d.title || d.name || "").toLowerCase().includes("coder of the year")
          );

          const updated = [];
          if (tekDoc?.image || tekDoc?.imageUrl) {
            updated.push({
              id: "tek-connect",
              title: "TEK CONNECT",
              caption: "Presenting AyurHerb at TEK Connect · 2nd Place among 50+ Engineering Teams",
              tag: "TEK CONNECT 2ND",
              src: tekDoc.image || tekDoc.imageUrl,
            });
          }
          if (coderDoc?.image || coderDoc?.imageUrl) {
            updated.push({
              id: "coder-of-the-year",
              title: "CODER OF THE YEAR",
              caption: "Coder of the Year · Outstanding Algorithmic Rigor & Technical Achievement",
              tag: "CODER OF THE YEAR",
              src: coderDoc.image || coderDoc.imageUrl,
            });
          }

          if (updated.length > 0) {
            setFeaturedImages(updated);
          }
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHeroData();
  }, []);

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNextImage();
    }
  };

  const currentItem = featuredImages[currentIndex] || DEFAULT_FEATURED[0];

  return (
    <>
      <BlueprintSection
        id="hero"
        ariaLabel="Introduction"
        noTopBorder={true}
        innerClassName="flex flex-col"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Identity, Role, Statement, Actions */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 flex flex-col items-start justify-center gap-6 border-b lg:border-b-0 lg:border-r border-[var(--line)]">
            {/* Spec Tag */}
            <div className="font-tech text-xs tracking-[0.08em] text-gray-500 dark:text-[#71717A] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#CDBDFF]" aria-hidden="true" />
              <span>Full-Stack Engineer</span>
              <span className="opacity-40">/</span>
              <span>2026</span>
            </div>

            {/* Name with Figma-style signature Doodle */}
            <div className="relative inline-block my-1">
              <NameSelectionDoodle />
              <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-[#F4F4F5] px-2 py-0.5">
                Shaurya Upadhyay
              </h1>
            </div>

            {/* One-line role */}
            <p className="font-tech text-xs sm:text-sm text-gray-500 dark:text-[#71717A] tracking-wide">
              Full-stack developer · React &amp; Java · Jaipur, India
            </p>

            {/* Short Statement */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-xl">
              Building scalable full-stack applications with React &amp; Java ecosystems. Focused on clean system architecture, REST APIs, and performance.
            </p>

            {/* Square Blueprint Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary: Solid White / Near-black text in dark mode */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-medium text-xs sm:text-sm tracking-wide transition-colors duration-150 hover:bg-gray-800 dark:hover:bg-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
              >
                <RiFileTextLine size={16} />
                <span>VIEW RESUME</span>
                <span className="text-xs">↗</span>
              </a>

              {/* Secondary: 1px Outlined */}
              <a
                href="https://github.com/Shaurya01836"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none border border-[var(--line)] bg-[var(--surface)] text-gray-800 dark:text-gray-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] font-medium text-xs sm:text-sm tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
              >
                <RiGithubLine size={16} />
                <span>GITHUB</span>
              </a>
            </div>
          </div>

          {/* Right Column: Single Interactive Showcase (Tek Connect & Coder of the Year) */}
          <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-center bg-black/[0.015] dark:bg-white/[0.01]">
            <div
              role="button"
              tabIndex={0}
              onClick={handleNextImage}
              onKeyDown={handleKeyDown}
              aria-label={`Current achievement: ${currentItem.title}. Click to switch.`}
              className="group cursor-pointer border border-[var(--line)] bg-[var(--surface)] flex flex-col text-left transition-colors hover:border-gray-400 dark:hover:border-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] select-none"
            >
            

              {/* Main Photo Frame */}
              <div className="relative w-full overflow-hidden bg-black/[0.04] dark:bg-white/[0.02]">
              
                {/* Animated Image Switch */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-60 relative"
                  >
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {/* Top-Right Badge Overlay */}
                    <div className="absolute top-3 right-3 z-10 px-2.5 py-1 border border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-xs font-tech text-[10px] uppercase tracking-wider text-gray-900 dark:text-[#F4F4F5] font-semibold">
                      {currentItem.tag}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Caption & Metadata */}
              <div className="p-4 border-t border-[var(--line)] bg-[var(--surface)] flex flex-col gap-1.5 font-tech">
                <p className="text-xs text-gray-500 dark:text-[#71717A] leading-relaxed">
                  {currentItem.caption}
                </p>
              </div>

              {/* Footer Switcher Bar with dot indicators */}
              <div className="px-4 py-2 border-t border-[var(--line)] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between font-tech text-[10px] text-gray-400 dark:text-[#71717A] tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  {featuredImages.map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-1.5 h-1.5 ${
                        currentIndex === i ? "bg-[#CDBDFF]" : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                  <span className="ml-1">SWITCH ON CLICK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Strip */}
        <StatusStrip />
      </BlueprintSection>

      {/* Hatched Band 1: Directly after Hero */}
      <HatchBand />
    </>
  );
};

export default Hero;
