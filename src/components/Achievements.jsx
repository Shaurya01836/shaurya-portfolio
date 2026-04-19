import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import BentoCard from "./BentoCard";
import {
  RiTrophyLine,
  RiAwardLine,
  RiCodeLine,
  RiGlobalLine,
} from "@remixicon/react";

const metamaskLogoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg";

const TrophySkeleton = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/10 dark:to-indigo-900/10">
    <div className="absolute inset-0 opacity-20 dark:opacity-10">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-400" />
    </div>
    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
      <RiTrophyLine
        size={64}
        className="text-blue-500 dark:text-blue-400 drop-shadow-lg"
      />
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-30">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full h-[1px] bg-blue-300 dark:bg-blue-700 transform rotate-12"
          style={{ marginTop: `${i * 20}px` }}
        />
      ))}
    </div>
  </div>
);

const GlobalSkeleton = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-blue-900/10 dark:to-indigo-900/10">
    <div className="absolute inset-0 opacity-20 dark:opacity-10">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-400" />
    </div>
    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
      <RiGlobalLine
        size={64}
        className="text-blue-500 dark:text-blue-400 drop-shadow-lg"
      />
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-30">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full h-[1px] bg-blue-300 dark:bg-blue-700 transform rotate-12"
          style={{ marginTop: `${i * 20}px` }}
        />
      ))}
    </div>
  </div>
);
const MetaMask = () => (
  <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-orange-100/70 via-amber-100/50 to-yellow-100/70 dark:from-orange-900/20 dark:via-amber-900/10 dark:to-yellow-900/20">
    <div className="absolute inset-0 opacity-60 dark:opacity-30">
      <div className="absolute -left-10 -top-12 h-28 w-28 rounded-full bg-orange-300/70 blur-2xl transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-5" />
      <div className="absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-amber-300/70 blur-2xl transition-transform duration-700 group-hover:-translate-x-4 group-hover:-translate-y-3" />
    </div>

    <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
      <img
        src={metamaskLogoUrl}
        alt="MetaMask logo"
        className="h-20 w-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:rotate-6"
        loading="lazy"
      />
    </div>
  </div>
);

const AwardSkeleton = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100/50 to-yellow-100/50 dark:from-emerald-900/10 dark:to-yellow-900/10">
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-emerald-300/20 dark:bg-emerald-700/10 rounded-full blur-2xl" />
    </div>
    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
      <RiAwardLine
        size={64}
        className="text-emerald-500 dark:text-emerald-400 drop-shadow-lg"
      />
    </div>
    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-1 flex-grow bg-emerald-200 dark:bg-emerald-800 rounded-full"
        />
      ))}
    </div>
  </div>
);

const CodeSkeleton = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-purple-900/10 dark:to-pink-900/10">
    <div className="absolute inset-x-4 top-4 bottom-4 flex flex-col gap-3 opacity-40">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-2 bg-purple-300 dark:bg-purple-700 rounded-full"
          style={{ width: `${Math.random() * 50 + 40}%` }}
        />
      ))}
    </div>
    <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">
      <RiCodeLine
        size={64}
        className="text-purple-500 dark:text-purple-400 drop-shadow-lg"
      />
    </div>
  </div>
);

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

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

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedAchievement(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedAchievement]);

  if (loading) return <div className="px-8 pb-10">Loading Achievements...</div>;

  const skeletonMap = [
    <TrophySkeleton key="trophy" />,
    <CodeSkeleton key="code" />,
    <MetaMask key="metamask" />,
    <GlobalSkeleton key="global" />,
    <AwardSkeleton key="award" />,
    <GlobalSkeleton key="global" />,
  ];

  const gridSpans = [
    "md:col-span-1", // Wide
    "md:col-span-1", // Square
    "md:col-span-2", // Square
    "md:col-span-1", // Wide
    "md:col-span-1", // Square
  ];

  const hiddenDetailKeys = new Set([
    "id",
    "title",
    "event",
    "year",
    "description",
    "imageUrl",
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

  return (
    <div className="flex flex-col w-full px-8 pb-10 gap-2 text-black dark:text-white">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Achievements
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-flow-dense md:auto-rows-[minmax(220px,auto)]">
        {achievements.map((achievement, index) => (
          <BentoCard
            key={achievement.id}
            title={achievement.title}
            description={`${achievement.event} (${achievement.year}) • ${achievement.description}`}
            header={skeletonMap[index % skeletonMap.length]}
            className={gridSpans[index % gridSpans.length] || "md:col-span-1"}
            onClick={() => setSelectedAchievement(achievement)}
            ariaLabel={`Open details for ${achievement.title}`}
          />
        ))}
      </div>

      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedAchievement.title} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex min-h-[260px] items-center justify-center bg-gray-50 p-4 dark:bg-[#050505]">
                {selectedAchievement.imageUrl ? (
                  <img
                    src={selectedAchievement.imageUrl}
                    alt={`${selectedAchievement.title} certificate`}
                    className="max-h-[70vh] w-full rounded-xl border border-gray-200 object-contain dark:border-[#1F1F1F]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Certificate image not available
                  </div>
                )}
              </div>

              <div className="relative flex flex-col p-6 md:p-8">
                <button
                  type="button"
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute right-4 top-4 rounded-md px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-[#151515] dark:hover:text-white"
                  aria-label="Close achievement details"
                >
                  Close
                </button>

                <h3 className="pr-20 text-2xl font-bold text-gray-900 dark:text-white">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
