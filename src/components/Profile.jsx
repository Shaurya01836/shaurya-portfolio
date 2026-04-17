import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  RiInstagramLine,
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterLine,
} from "@remixicon/react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";

const leetcodeLogoUrl =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg";
const gfgLogoUrl =
  "https://media.geeksforgeeks.org/wp-content/uploads/20230403183704/gfg_logo.png";
const hackerrankLogoUrl =
  "https://cdn-1.webcatalog.io/catalog/hackerrank/hackerrank-icon.png";
const defaultResumeUrl =
  "https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/26823516/MjY4MjM1MTY=.pdf";

const TechBadge = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 mx-1 rounded bg-gray-100 dark:bg-transparent text-gray-800 dark:text-gray-200 border-2 border-dotted border-gray-200 dark:border-solid dark:border-[#1F1F1F] text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors align-baseline cursor-pointer">
    {text}
  </span>
);

TechBadge.propTypes = {
  text: PropTypes.string.isRequired,
};

export const ConnectSection = ({ className }) => (
  <div className={`mt-10 ${className}`}>
    <div className="flex items-center gap-4 flex-wrap">
      <a
        href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0077b5] hover:scale-105 transition-all duration-300"
      >
        <RiLinkedinLine size={28} />
      </a>
      <a
        href="https://github.com/Shaurya01836"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black dark:text-white hover:scale-105 transition-all duration-300"
      >
        <RiGithubLine size={28} />
      </a>
      <a
        href="https://x.com/shaurya01836"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1da1f2] hover:scale-105 transition-all duration-300"
      >
        <RiTwitterLine size={28} />
      </a>
      <a
        href="https://www.instagram.com/shaurya_mnu/profilecard/?igsh=d21qb2E1cDZ6Yjdr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#e1306c] hover:scale-105 transition-all duration-300"
      >
        <RiInstagramLine size={28} />
      </a>

      <a
        href="https://leetcode.com/u/shaurya01836/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-105"
      >
        <img src={leetcodeLogoUrl} alt="LeetCode" className="w-7 h-7" />
      </a>

      <a
        href="https://www.geeksforgeeks.org/user/shaurya01836/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-105"
      >
        <img src={gfgLogoUrl} alt="GeeksForGeeks" className="w-7 h-7" />
      </a>

      <a
        href="https://www.hackerrank.com/profile/shaurya01836"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-all duration-300 hover:scale-105"
      >
        <img src={hackerrankLogoUrl} alt="HackerRank" className="w-7 h-7" />
      </a>
    </div>
  </div>
);

ConnectSection.propTypes = {
  className: PropTypes.string,
};

const Profile = () => {
  const [resumeUrl, setResumeUrl] = useState(defaultResumeUrl);

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
    <div className="flex flex-col h-full justify-center p-8 lg:pl-20 text-gray-900 dark:text-gray-100">
      <div className="flex-grow flex flex-col justify-center">
        <img
          src="https://i.ibb.co/8LJ9qL10/Whats-App-Image-2025-06-23-at-00-34-04-8a1e77d6.jpg"
          alt="Shaurya Upadhyay"
          className="rounded-full w-40 h-40 mb-6 border-4 border-pink-400"
        />
        <div className="text-left">
          <h1 className="text-4xl font-bold tracking-tight">
            Shaurya Upadhyay
          </h1>
          <div className="mt-4 max-w-lg text-lg text-gray-600 dark:text-gray-300 leading-loose">
            <p className="font-semibold text-lg text-black dark:text-white mb-2">
              Software Developer
            </p>
            <p>
              Building with
              <TechBadge text="React.js" />
              &
              <TechBadge text="Java" />
               Exploring
              <TechBadge text="Spring Boot" />
              ,
              <TechBadge text="REST APIs" />
               Passionate about
              <TechBadge text="DSA" />
              &
              <TechBadge text="AI-assisted development" />
            </p>
          </div>
        </div>
      </div>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <TechBadge text="Resume" />
      </a>

      <ConnectSection />
    </div>
  );
};

export default Profile;
