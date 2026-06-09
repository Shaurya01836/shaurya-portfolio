import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  RiInstagramLine,
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterLine,
} from "@remixicon/react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase.config";
import {
  ArrowToMeDoodle,
  UnderlineDoodle,
  ResumeHighlightDoodle,
} from "./Doodles";

const leetcodeLogoUrl =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg";
const gfgLogoUrl =
  "https://media.geeksforgeeks.org/wp-content/uploads/20230403183704/gfg_logo.png";
const hackerrankLogoUrl =
  "https://cdn-1.webcatalog.io/catalog/hackerrank/hackerrank-icon.png";
const defaultResumeUrl =
  "https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/26823516/MjY4MjM1MTY=.pdf";

const brandStyles = {
  "React.js": "hover:bg-[#61dafb]/10 hover:text-[#61dafb] hover:border-[#61dafb]/40 dark:hover:border-[#61dafb]/60 hover:shadow-[0_0_12px_rgba(97,218,251,0.2)]",
  "Java": "hover:bg-[#f89820]/10 hover:text-[#f89820] hover:border-[#f89820]/40 dark:hover:border-[#f89820]/60 hover:shadow-[0_0_12px_rgba(248,152,32,0.2)]",
  "Spring Boot": "hover:bg-[#6db33f]/10 hover:text-[#6db33f] hover:border-[#6db33f]/40 dark:hover:border-[#6db33f]/60 hover:shadow-[0_0_12px_rgba(109,179,63,0.2)]",
  "REST APIs": "hover:bg-[#009688]/10 hover:text-[#009688] hover:border-[#009688]/40 dark:hover:border-[#009688]/60 hover:shadow-[0_0_12px_rgba(0,150,136,0.2)]",
  "DSA": "hover:bg-[#e91e63]/10 hover:text-[#e91e63] hover:border-[#e91e63]/40 dark:hover:border-[#e91e63]/60 hover:shadow-[0_0_12px_rgba(233,30,99,0.2)]",
  "AI-assisted development": "hover:bg-[#9c27b0]/10 hover:text-[#9c27b0] hover:border-[#9c27b0]/40 dark:hover:border-[#9c27b0]/60 hover:shadow-[0_0_12px_rgba(156,39,176,0.2)]",
  "Resume": "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/40 dark:hover:border-pink-500/60 hover:shadow-[0_0_12px_rgba(244,63,94,0.2)]",
};

const TechBadge = ({ text }) => {
  const hoverStyle = brandStyles[text] || "hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 mx-1 rounded bg-gray-100 dark:bg-transparent text-gray-800 dark:text-gray-200 border-2 border-dotted border-gray-200 dark:border-solid dark:border-[#1F1F1F] text-base font-medium transition-all duration-300 ease-out align-baseline cursor-pointer ${hoverStyle}`}>
      {text}
    </span>
  );
};

TechBadge.propTypes = {
  text: PropTypes.string.isRequired,
};

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ConnectSection = ({ className }) => (
  <div className={`mt-10 ${className}`}>
    <div className="flex items-center gap-4 flex-wrap">
      <Magnetic>
        <a
          href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0077b5] block hover:scale-105 transition-all duration-300"
        >
          <RiLinkedinLine size={28} />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://github.com/Shaurya01836"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black dark:text-white block hover:scale-105 transition-all duration-300"
        >
          <RiGithubLine size={28} />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://x.com/shaurya01836"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1da1f2] block hover:scale-105 transition-all duration-300"
        >
          <RiTwitterLine size={28} />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://www.instagram.com/shaurya_mnu/profilecard/?igsh=d21qb2E1cDZ6Yjdr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e1306c] block hover:scale-105 transition-all duration-300"
        >
          <RiInstagramLine size={28} />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://leetcode.com/u/shaurya01836/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-105 block"
        >
          <img src={leetcodeLogoUrl} alt="LeetCode" className="w-7 h-7" />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://www.geeksforgeeks.org/user/shaurya01836/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-105 block"
        >
          <img src={gfgLogoUrl} alt="GeeksForGeeks" className="w-7 h-7" />
        </a>
      </Magnetic>

      <Magnetic>
        <a
          href="https://www.hackerrank.com/profile/shaurya01836"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-105 block"
        >
          <img src={hackerrankLogoUrl} alt="HackerRank" className="w-7 h-7" />
        </a>
      </Magnetic>
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
      className="relative flex flex-col h-full justify-center p-8 pt-20 md:pt-0 lg:pl-20 text-gray-900 dark:text-gray-100 overflow-visible"
    >
      <div className="flex-grow flex flex-col justify-center">
        {/* Avatar Image with Arrow Doodle */}
        <div className="relative w-fit mb-6 group">
          <img
            src="https://i.ibb.co/8LJ9qL10/Whats-App-Image-2025-06-23-at-00-34-04-8a1e77d6.jpg"
            alt="Shaurya Upadhyay"
            className="rounded-full w-40 h-40 border-4 border-pink-400 relative z-10 select-none pointer-events-none"
          />
          <div className="absolute top-[10px] left-[150px] z-20 pointer-events-none">
            <ArrowToMeDoodle />
          </div>
        </div>

        <div className="text-left">
          {/* Name with Underline Doodle */}
          <div className="relative w-fit mb-6">
            <h1 className="text-4xl font-bold tracking-tight pb-1">
              Shaurya Upadhyay
            </h1>
            <div className="absolute bottom-[-16px] left-0 w-full z-10 pointer-events-none">
              <UnderlineDoodle />
            </div>
          </div>

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
      <div className="relative w-fit group mt-16 sm:mt-0">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10"
        >
          <TechBadge text="Resume" />
        </a>
        <ResumeHighlightDoodle />
      </div>

      {/* Social Links */}
      <ConnectSection />
    </div>
  );
};

export default Profile;
