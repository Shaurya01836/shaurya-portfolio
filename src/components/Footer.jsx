import { GithubIcon, LinkedinIcon, XComIcon, EnvelopeIcon } from "./icons";

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-[var(--line)] bg-[var(--bg-primary)] overflow-hidden">
      <div className="relative max-w-5xl mx-auto border-x border-b border-[var(--line)]">
        {/* Top Info Bar (Copyright + Location + Social Links) */}
        <div className="py-6 px-6 sm:px-8 border-b border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-xs text-gray-500 dark:text-[#71717A]">
          {/* Copyright and Location */}
          <div className="flex items-center gap-2">
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
              <GithubIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/in/this-is-shaurya-upadhyay"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <LinkedinIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="https://x.com/shaurya01836"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <XComIcon width={16} height={16} aria-hidden />
            </a>
            <a
              href="mailto:shaurya01836@gmail.com"
              aria-label="Email"
              className="hover:text-black dark:hover:text-[#CDBDFF] transition-colors"
            >
              <EnvelopeIcon width={16} height={16} aria-hidden />
            </a>
          </div>
        </div>

        {/* Massive Editorial Name Watermark with Blueprint Hatching & Gradient Fade */}
        <div className="pt-6 sm:pt-10 md:pt-14 pb-0 px-2 sm:px-6 relative select-none overflow-hidden group">
          <svg
            viewBox="0 0 1100 170"
            className="w-full h-auto block transform translate-y-1 sm:translate-y-2 text-gray-900 dark:text-zinc-100 transition-opacity duration-300 group-hover:opacity-100 opacity-85"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="footer-blueprint-hatch"
                width="4"
                height="4"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </pattern>
              <linearGradient id="footer-fade-gradient" x1="0%" y1="0%" x2="0%" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.5" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
              <mask id="footer-fade-mask">
                <rect x="0" y="0" width="1100" height="170" fill="url(#footer-fade-gradient)" />
              </mask>
            </defs>
            <text
              x="550"
              y="126"
              textAnchor="middle"
              className="font-editorial"
              style={{
                fontFamily: "'Instrument Serif', 'Playfair Display', Georgia, serif",
                fontSize: "138px",
                letterSpacing: "-0.015em",
              }}
              fill="url(#footer-blueprint-hatch)"
              mask="url(#footer-fade-mask)"
            >
              Shaurya Upadhyay
            </text>
          </svg>
          <span className="sr-only">Shaurya Upadhyay</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
