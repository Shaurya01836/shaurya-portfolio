import { RiGithubLine, RiLinkedinLine, RiTwitterXLine, RiMailLine } from "@remixicon/react";
import Crosshair from "./ui/Crosshair";

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-[var(--line)] bg-[var(--bg-primary)]">
      <div className="relative max-w-[1160px] mx-auto border-x border-[var(--line)] py-8 px-6 sm:px-8">
        {/* Top-Left & Right Crosshairs */}
        <div className="absolute -top-[5.5px] -left-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>
        <div className="absolute -top-[5.5px] -right-[5.5px] z-20 pointer-events-none select-none" aria-hidden="true">
          <Crosshair />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs text-gray-500 dark:text-[#71717A]">
          {/* Copyright and Location */}
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Shaurya Upadhyay</span>
            <span className="opacity-40">·</span>
            <span>Jaipur, India</span>
            <span className="hidden md:inline-block opacity-40">·</span>
            <span className="hidden md:inline-block text-[11px] text-gray-400">All rights reserved</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <RiGithubLine size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <RiLinkedinLine size={16} />
            </a>
            <a
              href="https://x.com/shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <RiTwitterXLine size={15} />
            </a>
            <a
              href="mailto:shaurya01836@gmail.com"
              aria-label="Email"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <RiMailLine size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
