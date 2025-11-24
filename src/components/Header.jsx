import { RiArticleLine } from "@remixicon/react";
import BentoCard from "./BentoCard";

const Header = () => {
  return (
    <div className="relative p-4 md:p-8 md:py-14 text-black flex items-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full items-center">
        <nav className="fixed top-6 right-6 md:top-5 md:right-60 z-20">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-black font-semibold text-lg transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-md border border-gray-200"
          >
            <span>Blogs</span>
          </a>
        </nav>
        <h1 className="text-lg text-gray-600 font-semibold">STPI Internship</h1>
        <BentoCard className="col-span-4 h-44 p-0">
          <img
            src="https://i.ibb.co/PZt4m1GV/stpi.jpg"
            alt="Primary image"
            className="w-full h-full object-cover rounded-md"
          />
        </BentoCard>
      </div>
    </div>
  );
};

export default Header;
