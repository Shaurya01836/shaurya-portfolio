import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { TechImage } from "./TechImage";
import { RiAwardLine, RiCloseLine } from "@remixicon/react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";

const TEK_CONNECT_IMAGE =
  "https://res.cloudinary.com/drl6ky9as/image/upload/v1786369908/ChatGPT_Image_Aug_10_2026_04_59_57_PM_cnn32h.png";

const AboutHighlights = () => {
  const [tekConnectImage, setTekConnectImage] = useState(TEK_CONNECT_IMAGE);
  const [achievements, setAchievements] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featSnap = await getDocs(collection(db, "featuredImages"));
        if (!featSnap.empty) {
          const tekDoc = featSnap.docs.find(
            (d) =>
              (d.data().title || "").toLowerCase().includes("tek connect") ||
              (d.data().name || "").toLowerCase().includes("tek connect")
          );
          if (tekDoc) {
            const data = tekDoc.data();
            setTekConnectImage(data.image || data.imageUrl || TEK_CONNECT_IMAGE);
          }
        }

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

      {/* 2-Column Split: Bio on Left, Tek Connect Spotlight on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[var(--line)]">
        {/* Bio text */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-normal border-b md:border-b-0 md:border-r border-[var(--line)]">
          <p>
            I am a software engineer focused on building robust, scalable web systems. My core stack centers around <span className="text-gray-900 dark:text-white font-medium">React.js</span> on the frontend and <span className="text-gray-900 dark:text-white font-medium">Java / Spring Boot</span> for enterprise backends, complemented by modern databases like PostgreSQL and Redis.
          </p>
          <p>
            Previously, I interned at the <span className="text-gray-900 dark:text-white font-medium">Software Technology Parks of India (STPI)</span> in Jaipur, contributing to frontend dashboards, interface usability, and performance optimizations.
          </p>
          <p>
            I actively build projects and compete in hackathons, developing real-time platforms, high-throughput bidding engines, and decentralized applications.
          </p>
        </div>

        {/* Tek Connect Spotlight Photo */}
        <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-black/[0.015] dark:bg-white/[0.01]">
          <div
            onClick={() =>
              setSelectedItem({
                title: "TEK Connect Hackathon",
                image: tekConnectImage,
                description: "Shaurya presenting AyurHerb at TEK Connect, securing 2nd place among 50+ competing engineering teams.",
              })
            }
            className="group cursor-pointer relative border border-[var(--line)] bg-[var(--surface)] transition-colors hover:border-gray-400 dark:hover:border-white/30"
          >
            <div className="h-52 sm:h-60 w-full overflow-hidden bg-black/[0.04]">
              <TechImage
                src={tekConnectImage}
                alt="Tek Connect Presentation"
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="p-3.5 bg-[var(--surface)] border-t border-[var(--line)] flex items-center justify-between font-tech text-xs">
              <span className="font-medium text-gray-900 dark:text-gray-200">
                TEK CONNECT SHOWCASE
              </span>
              <span className="text-[#CDBDFF] text-[11px] uppercase tracking-wider">
                [View ↗]
              </span>
            </div>
          </div>
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
                onClick={() => setSelectedItem(item)}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-[var(--surface)] border border-[var(--line)] rounded-none shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
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
                  onClick={() => setSelectedItem(null)}
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
