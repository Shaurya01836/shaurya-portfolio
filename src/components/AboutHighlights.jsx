import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { RiAwardLine, RiCloseLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import { playPopSound, playCloseSound } from "../utils/sound";

const AboutHighlights = () => {
  const [achievements, setAchievements] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const achQ = query(collection(db, "achievements"), orderBy("year", "desc"));
        const achSnap = await getDocs(achQ);
        const achList = achSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setAchievements(achList);
      } catch (err) {
        console.error("Error fetching about/highlights data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <BlueprintSection id="about" ariaLabel="About and Highlights">
      {/* 2-cell Section Header */}
      <SectionHeader
        number="06"
        label="HIGHLIGHTS"
        title="Personal"
        accentWord="Background"
        description="Philosophy, hackathon competitions, and verified industry credentials"
      />

      {/* Engineering Profile & Background */}
      <div className="p-6 sm:p-10 md:p-12 border-b border-[var(--line)] flex flex-col gap-5 text-left">
        <div className="flex flex-col gap-1.5">
          <span className="font-tech text-[10px] tracking-widest text-[#CDBDFF] uppercase font-semibold">
            [ENGINEERING PROFILE &amp; PHILOSOPHY]
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
            Building Resilient, Scalable Systems
          </h3>
        </div>

        <div className="flex flex-col gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal max-w-4xl">
          <p>
            I am a software engineer focused on building robust, scalable web systems. My core stack centers around{" "}
            <span className="text-gray-900 dark:text-white font-medium">React.js</span> on the frontend and{" "}
            <span className="text-gray-900 dark:text-white font-medium">Java / Spring Boot</span> for enterprise backends, complemented by modern databases like PostgreSQL and Redis.
          </p>
          <p>
            Previously, I interned at the{" "}
            <span className="text-gray-900 dark:text-white font-medium">Software Technology Parks of India (STPI)</span> in Jaipur, contributing to frontend dashboards, interface usability, and performance optimizations.
          </p>
          <p>
            I actively build projects and compete in hackathons, developing real-time platforms, high-throughput bidding engines, and decentralized applications.
          </p>
        </div>
      </div>

      {/* Certificates & Achievements Grid */}
      {achievements.length > 0 && (
        <div className="border-b border-[var(--line)]">
          <div className="px-6 py-3 border-b border-[var(--line)] font-tech text-[10px] tracking-wider uppercase text-gray-500 dark:text-[#71717A]">
            Verified Certifications &amp; Awards
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {achievements.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => {
                  playPopSound();
                  setSelectedItem(item);
                }}
                className="p-5 border-b sm:border-b-0 border-r border-[var(--line)] last:border-r-0 bg-[var(--surface)] hover:bg-black/[0.015] dark:hover:bg-white/[0.015] cursor-pointer transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 shrink-0 border border-[var(--line)] flex items-center justify-center text-gray-500">
                  <RiAwardLine size={16} />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-[#F4F4F5] truncate">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 font-tech text-[11px] text-gray-500 dark:text-[#71717A]">
                    <span>{item.issuer || "Certificate"}</span>
                    {item.year && <span>· {item.year}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Dialog for Certificate / Photo View */}
      <AnimatePresence>
        {selectedItem && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
            onClick={() => {
              playCloseSound();
              setSelectedItem(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto custom-scrollbar bg-[var(--surface)] border border-[var(--line)] rounded-none shadow-2xl p-6 sm:p-8 flex flex-col gap-6 overscroll-contain"
            >
              <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-tech text-[10px] tracking-widest text-[#CDBDFF] uppercase">
                    [ARCHIVE SPEC]
                  </span>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
                    {selectedItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playCloseSound();
                    setSelectedItem(null);
                  }}
                  className="p-1 border border-[var(--line)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              {selectedItem.image && (
                <div className="w-full h-64 sm:h-72 overflow-hidden border border-[var(--line)] bg-black/[0.04]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {selectedItem.description && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {selectedItem.description}
                </p>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BlueprintSection>
  );
};

export default AboutHighlights;
