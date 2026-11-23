import { useState, useEffect } from "react";
import { FileIcon, GithubIcon } from "./icons";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { NameSelectionDoodle } from "./Doodles";
import StatusStrip from "./ui/StatusStrip";
import HatchBand from "./ui/HatchBand";
import BlueprintSection from "./ui/BlueprintSection";
import { playClickSound } from "../utils/sound";

const DEFAULT_RESUME_URL =
  "https://drive.google.com/file/d/1s6AgfIBqO-MFrqpWgc69Oj_Ojb7g9mBH/view?usp=sharing";

const Hero = () => {
  const [resumeUrl, setResumeUrl] = useState(DEFAULT_RESUME_URL);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const q = query(collection(db, "profile"), limit(1));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          const dbResume = data.resumeUrl || data.resumeLink || data.reusmeUrl;
          if (typeof dbResume === "string" && dbResume.trim()) {
            setResumeUrl(dbResume.trim());
          }
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHeroData();
  }, []);

  return (
    <>
      <BlueprintSection
        id="hero"
        ariaLabel="Introduction"
        noTopBorder={true}
        innerClassName="flex flex-col"
      >
        {/* 1. Profile Identity Bar (DP + Identity Info + Actions) */}
        <div className="p-4 sm:p-8 md:p-10 border-b border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex flex-row items-center gap-3.5 sm:gap-6 min-w-0">
            {/* Square Avatar with Rounded Corners */}
            <div className="shrink-0 w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl sm:rounded-2xl border-2 border-[var(--line)] bg-[var(--surface)] shadow-lg relative overflow-hidden group">
              <img
                src="/profile-portrait.webp"
                alt="Shaurya Upadhyay"
                className="w-full h-full object-cover object-top rounded-[10px] sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 px-1 sm:px-1.5 py-0.5 bg-[var(--surface)]/90 backdrop-blur-xs border border-[var(--line)] rounded-full font-tech text-[7px] sm:text-[8px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ON</span>
              </div>
            </div>

            {/* Name, Spec & Role */}
            <div className="flex flex-col items-start gap-0.5 sm:gap-1 min-w-0 flex-1">
              {/* Name with Doodle */}
              <div className="relative inline-block my-0.5">
                <NameSelectionDoodle />
                <h1 className="relative z-10 text-xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.03em] text-gray-900 dark:text-[#F4F4F5] px-1 py-0.5 whitespace-nowrap">
                  Shaurya Upadhyay
                </h1>
              </div>

              <div className="flex flex-col mt-2 sm:mt-0 gap-0.5">
                <p className="text-[11px] sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full-stack developer · React &amp; Java Ecosystem
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-stretch sm:self-auto pt-2 md:pt-0">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              data-cursor="PDF · 1 PAGE"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-medium text-xs sm:text-sm tracking-wide transition-colors duration-150 hover:bg-gray-800 dark:hover:bg-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
            >
              <FileIcon width={16} height={16} aria-hidden />
              <span>VIEW RESUME</span>
            </a>

            <a
              href="https://github.com/Shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-none border border-[var(--line)] bg-[var(--surface)] text-gray-800 dark:text-gray-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] font-medium text-xs sm:text-sm tracking-wide transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
            >
              <GithubIcon width={16} height={16} aria-hidden />
              <span>GITHUB</span>
            </a>
          </div>
        </div>

        {/* 2. Core Statement & Specialization */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-3 max-w-3xl">
            <span className="font-tech text-[10px] tracking-widest text-[#CDBDFF] uppercase font-semibold">
              [About Me]
            </span>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              Creator of{" "}
              <a
                href="https://crickauction.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white font-medium underline underline-offset-4 decoration-[#CDBDFF] transition-colors"
              >
                CrickAuction
              </a>{" "}
              (2.4M+ pageviews · 480k+ unique users). Focused on clean system architecture, high-concurrency real-time bidding engines, and enterprise Java REST backends.
            </p>
          </div>

          {/* Core Tech Stack Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--line)] font-tech text-xs text-gray-500">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Core Stack:</span>
            <span className="px-2.5 py-1 border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300">React.js</span>
            <span className="px-2.5 py-1 border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300">Java / Spring Boot</span>
            <span className="px-2.5 py-1 border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300">Firebase Realtime DB</span>
            <span className="px-2.5 py-1 border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300">PostgreSQL</span>
          </div>
        </div>

        {/* 3. Status Strip */}
        <StatusStrip />
      </BlueprintSection>

      {/* Hatched Band 1: Directly after Hero */}
      <HatchBand />
    </>
  );
};

export default Hero;
