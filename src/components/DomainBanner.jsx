import { Globe, ArrowRight, ExternalLink } from "lucide-react";

const DomainBanner = () => {
  return (
    <div className="w-full relative z-40 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-[#121124] dark:via-[#191533] dark:to-[#0A0A0A] text-gray-800 dark:text-gray-200 border-b border-indigo-100 dark:border-indigo-900/40 transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
           
            <p className="text-xs sm:text-sm font-medium leading-tight truncate sm:whitespace-normal">
              <span className="font-semibold text-gray-900 dark:text-white">Domain Migration Notice:</span> We have officially moved to{" "}
              <a
                href="https://www.ershaurya.dev/"
                className="font-bold underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.ershaurya.dev
                <ExternalLink className="w-3.5 h-3.5 inline" />
              </a>
              ! Please update your bookmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
            <a
              href="https://www.ershaurya.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all shadow-sm transform hover:scale-105 active:scale-95"
            >
              Visit New Site
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainBanner;
