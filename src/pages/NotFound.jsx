import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../components/icons";
import BlueprintSection from "../components/ui/BlueprintSection";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="not-found" ariaLabel="404 Page Not Found" noTopBorder={true}>
        <div className="flex flex-col items-center justify-center min-h-[75vh] py-16 px-4 text-center">
          <div className="flex flex-col items-center gap-8 max-w-lg w-full">
            {/* Clean Blueprint 404 Display */}
            <div className="w-full h-56 sm:h-64 rounded-none border border-[var(--line)] bg-[var(--surface)] relative flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="font-tech text-6xl sm:text-7xl font-bold tracking-tight text-gray-900 dark:text-[#F4F4F5] select-none">
                404
              </div>
              <div className="font-tech text-xs tracking-widest uppercase text-gray-400 dark:text-[#71717A] mt-2">
                [PAGE NOT FOUND]
              </div>
              <div className="absolute top-3 left-3 font-tech text-[10px] text-gray-400 dark:text-[#71717A]">
                Error 404
              </div>
              <div className="absolute bottom-3 right-3 font-tech text-[10px] text-gray-400 dark:text-[#71717A]">
                Status: 404
              </div>
            </div>

            {/* Messaging */}
            <div className="flex flex-col gap-2 max-w-sm">
              <div className="font-tech text-xs tracking-widest uppercase text-[#CDBDFF]">
                [Error 404]
              </div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-[#F4F4F5]">
                Page Not Found
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-[#71717A] leading-relaxed font-tech">
                The page you are looking for does not exist or has been moved.
              </p>
            </div>

            {/* Back to Home Button */}
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-tech text-xs tracking-wider uppercase transition-colors hover:bg-gray-800 dark:hover:bg-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
              >
                <ArrowLeftIcon width={15} height={15} aria-hidden />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </BlueprintSection>
      <Footer />
    </div>
  );
};

export default NotFound;
