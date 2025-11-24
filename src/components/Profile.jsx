import {
  RiInstagramLine,
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterLine,
} from "@remixicon/react";


const leetcodeLogoUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/leetcode/leetcode-original.svg";
const gfgLogoUrl = "https://media.geeksforgeeks.org/wp-content/uploads/20230403183704/gfg_logo.png";
const hackerrankLogoUrl = "https://cdn-1.webcatalog.io/catalog/hackerrank/hackerrank-icon.png";


const TechBadge = ({ text }) => (
  <span className="inline-flex items-center px-2 py-0.5 mx-1 rounded bg-gray-100 text-gray-800 border border-gray-200 text-base font-medium hover:bg-gray-200 transition-colors align-baseline cursor-pointer">
    {text}
  </span>
);

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
        className="text-black hover:scale-105 transition-all duration-300"
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
        href="https://www.geeksforgeeks.org/user/shaurya3ms8/"
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


const Profile = () => {
  return (
    <div className="flex flex-col h-full justify-center p-8 lg:pl-20">
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
          <div className="mt-4 max-w-lg text-lg text-gray-600 leading-loose">
            <p className="font-semibold text-lg text-black mb-2">
              A Java Developer.
            </p>
            <p>
              I build robust backend applications using 
              <TechBadge text="Java" />
              . With a focus on 
              <TechBadge text="Backend Development" />
              . Enthusiastic about 
              <TechBadge text="Data Structures & Algorithms" />
              , driven by a passion for efficient code.
            </p>
          </div>
        
        </div>
      </div>
      <a href="https://hackerrank-resume.s3.us-east-1.amazonaws.com/uploads/26823516/MjY4MjM1MTY=.pdf" target="_blank"><TechBadge text="Resume" /></a> 

      <ConnectSection className="hidden lg:block" />
    </div>
  );
};

export default Profile;