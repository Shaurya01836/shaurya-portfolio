import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  RiInstagramLine,
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterXLine,
  RiFileTextLine,
  RiMapPinLine,
} from "@remixicon/react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { TechCornerTicks } from "./TechGridElements";
import {
  NameSelectionDoodle,
  AvatarArrowDoodle,
} from "./Doodles";

const leetcodeLogoUrl =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg";
const gfgLogoUrl =
  "https://media.geeksforgeeks.org/wp-content/uploads/20230403183704/gfg_logo.png";
const hackerrankLogoUrl =
  "https://cdn-1.webcatalog.io/catalog/hackerrank/hackerrank-icon.png";
const defaultResumeUrl =
  "https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/26823516/MjY4MjM1MTY=.pdf";

export const ConnectSection = ({ className = "" }) => (
  <div className={`flex flex-col gap-2.5 ${className}`}>
    <div className="flex items-center justify-between text-[10px] font-tech text-gray-400 dark:text-gray-500 uppercase tracking-wider select-none">
      <span>Connect & Profiles</span>
      <span>7 Channels</span>
    </div>
    <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
      <a
        href="https://github.com/Shaurya01836"
        target="_blank"
        rel="noopener noreferrer me"
        title="GitHub"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center group select-none"
      >
        <RiGithubLine size={17} className="transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
        target="_blank"
        rel="noopener noreferrer me"
        title="LinkedIn"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center group select-none"
      >
        <RiLinkedinLine size={17} className="transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://leetcode.com/u/shaurya01836/"
        target="_blank"
        rel="noopener noreferrer me"
        title="LeetCode"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 transition-all flex items-center justify-center group select-none"
      >
        <img src={leetcodeLogoUrl} alt="LeetCode" className="w-4 h-4 object-contain transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://x.com/shaurya01836"
        target="_blank"
        rel="noopener noreferrer me"
        title="Twitter / X"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center group select-none"
      >
        <RiTwitterXLine size={16} className="transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://www.geeksforgeeks.org/user/shaurya01836/"
        target="_blank"
        rel="noopener noreferrer me"
        title="GeeksforGeeks"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 transition-all flex items-center justify-center group select-none"
      >
        <img src={gfgLogoUrl} alt="GFG" className="w-4 h-4 object-contain transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://www.hackerrank.com/profile/shaurya01836"
        target="_blank"
        rel="noopener noreferrer me"
        title="HackerRank"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 transition-all flex items-center justify-center group select-none"
      >
        <img src={hackerrankLogoUrl} alt="HackerRank" className="w-4 h-4 object-contain transition-transform group-hover:scale-110" />
      </a>

      <a
        href="https://www.instagram.com/shaurya_mnu/profilecard/?igsh=d21qb2E1cDZ6Yjdr"
        target="_blank"
        rel="noopener noreferrer me"
        title="Instagram"
        className="p-2 sm:p-2.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] hover:bg-gray-50 dark:hover:bg-[#141414] hover:border-gray-400 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 transition-all flex items-center justify-center group select-none"
      >
        <RiInstagramLine size={17} className="transition-transform group-hover:scale-110" />
      </a>
    </div>
  </div>
);

ConnectSection.propTypes = {
  className: PropTypes.string,
};

const Profile = () => {
  const [resumeUrl, setResumeUrl] = useState(defaultResumeUrl);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const q = query(collection(db, "profile"), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const profileData = querySnapshot.docs[0].data();
          const dbResumeUrl =
            profileData.resumeUrl || profileData.resumeLink || profileData.reusmeUrl;

          if (typeof dbResumeUrl === "string" && dbResumeUrl.trim()) {
            setResumeUrl(dbResumeUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      }
    };

    fetchResumeUrl();
  }, []);

  return (
    <div
      ref={profileRef}
      className="relative flex flex-col h-full justify-between p-6 sm:p-8 lg:p-10 text-gray-900 dark:text-gray-100 overflow-y-auto"
    >
      <div className="flex flex-col gap-6">
        {/* Portrait with "that's me!" Doodle */}
        <div className="flex flex-col gap-2">
          <div className="relative w-fit">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md border border-gray-200 dark:border-[#1F1F1F] p-1 bg-white dark:bg-[#0A0A0A] shadow-xs shrink-0 overflow-hidden">
              <TechCornerTicks />
              <img
                src="https://i.ibb.co/8LJ9qL10/Whats-App-Image-2025-06-23-at-00-34-04-8a1e77d6.jpg"
                alt="Shaurya Upadhyay"
                className="w-full h-full object-cover rounded select-none"
              />
            </div>
            <AvatarArrowDoodle />
          </div>
        </div>

        {/* Identity & Header with Selection Doodle & Comfortable Spacing */}
        <div className="flex flex-col text-left pt-2 sm:pt-3 pb-1">
          <div className="relative inline-block w-fit my-3 sm:my-3.5">
            <NameSelectionDoodle />
            <h1 className="relative z-10 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white px-2 py-0.5">
              Shaurya Upadhyay
            </h1>
          </div>

          <div className="flex items-center gap-2 font-tech text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2.5">
            <span>Software Engineer</span>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span className="flex items-center gap-1">
              <RiMapPinLine size={12} className="opacity-70" />
              <span>Jaipur, India</span>
            </span>
          </div>
        </div>

        {/* Technical Bio */}
        <div className="text-left flex flex-col gap-3">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Building scalable full-stack applications with React.js &amp; Java ecosystems. Focused on clean system architecture, REST APIs, and performance.
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {["React.js", "Java", "Spring Boot", "REST APIs", "DSA", "Tailwind CSS"].map((tech) => (
              <span
                key={tech}
                className="font-tech text-[11px] px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50 dark:bg-[#121212] text-gray-700 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Action */}
        <div className="pt-1">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded border border-gray-900 bg-gray-900 text-white hover:bg-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-tech text-xs uppercase tracking-wider transition-all select-none shadow-xs w-full sm:w-auto"
          >
            <RiFileTextLine size={15} />
            <span>View Resume ↗</span>
          </a>
        </div>
      </div>

      {/* Social & Coding Connect Channels */}
      <div className="pt-8 border-t border-gray-100 dark:border-[#1A1A1A] mt-8 lg:mt-0">
        <ConnectSection />
      </div>
    </div>
  );
};

export default Profile;
