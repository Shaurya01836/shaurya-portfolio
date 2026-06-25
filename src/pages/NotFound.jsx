import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RiArrowLeftLine } from "@remixicon/react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-8 py-32 text-center text-black dark:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-8 max-w-md w-full"
      >

        {/* Developer Busy Live-Feed Container */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-2xl overflow-hidden border border-solid border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0D0D0D] shadow-xl relative"
        >
          {/* Mock Video Feed Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-solid border-gray-200 dark:border-[#1F1F1F] bg-gray-50 dark:bg-[#080808]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              Coder: Busy Coding
            </div>
          </div>

          {/* Gif Feed */}
          <img
            src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
            alt="Coder is busy coding"
            loading="lazy"
            className="w-full h-48 md:h-52 object-cover select-none filter dark:brightness-90"
          />
        </motion.div>

        {/* Messaging */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Developer is in the Zone
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed px-2">
            The coder is currently locked in, writing clean code and shipping features. Meanwhile, you&apos;ve taken a wrong turn and landed in the void!
          </p>
        </div>

        {/* CTA Link */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md bg-black text-white hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-100 font-semibold text-sm transition-all duration-300 shadow-md border border-transparent dark:border-white/10"
          >
            <RiArrowLeftLine
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
