
import {
  RiInstagramLine,
  RiLinkedinLine,
  RiGithubLine,
  RiTwitterLine,
} from "@remixicon/react";

export const ConnectSection = ({ className }) => (
  <div className={`mt-10 ${className}`}>
    <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
    <div className="flex items-center gap-4">
      <a
        href="mailto:youremail@example.com"
        className="bg-black text-white hover:bg-gray-800 px-5 py-2 text-sm rounded-full font-semibold transition-colors duration-300"
      >
        Send Email
      </a>
      <a
        href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-600"
      >
        <RiLinkedinLine size={28} />
      </a>
      <a
        href="https://github.com/Shaurya01836"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-black"
      >
        <RiGithubLine size={28} />
      </a>
      <a
        href="https://x.com/shaurya01836"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-blue-400"
      >
        <RiTwitterLine size={28} />
      </a>
      <a
        href="https://www.instagram.com/shaurya_mnu/profilecard/?igsh=d21qb2E1cDZ6Yjdr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-pink-500"
      >
        <RiInstagramLine size={28} />
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
          <h1 className="text-5xl font-bold tracking-tight">
            Shaurya Upadhyay
          </h1>
          <p className="text-gray-700 mt-4 max-w-md text-lg">
            I'm currently learning Java and have a good grasp of its basics. My
            goal is to dive deeper into backend development using Java and
            strengthen my knowledge of Data Structures and Algorithms (DSA) in
            Java.
          </p>
        </div>
      </div>

      <ConnectSection className="hidden lg:block" />
    </div>
  );
};

export default Profile;