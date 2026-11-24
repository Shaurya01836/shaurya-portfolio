import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../components/icons";
import BlueprintSection from "../components/ui/BlueprintSection";
import Footer from "../components/Footer";
import { Dithered404 } from "../components/ui/Dithered404";
import {
  playEmberCrackleSound,
  playReformSnapSound,
  playClickSound,
} from "../utils/sound";

const NotFound = () => {
  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="not-found" ariaLabel="404 Page Not Found" noTopBorder={true}>
        <div className="flex flex-col items-center justify-center min-h-[78vh] py-12 px-4 text-center">
          <div className="flex flex-col items-center gap-8 max-w-xl w-full">
            {/* Interactive Dithered 404 Canvas Display */}
            <div className="w-full h-64 sm:h-80  relative overflow-hidden shadow-2xl select-none group">
              <Dithered404
                color="#CDBDFF"
                pixelSize={4}
                brush={30}
                interactive={true}
                dither={true}
                onBurn={playEmberCrackleSound}
                onReform={playReformSnapSound}
              />
            </div>

            {/* Messaging */}
            <div className="flex flex-col items-center gap-2 max-w-sm">
              <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-[#F4F4F5]">
                Page Coordinate Not Found
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-[#71717A] leading-relaxed font-tech">
                The node you requested does not exist on this blueprint or has been shifted in deployment.
              </p>
            </div>

            {/* Return to Home Button */}
            <div>
              <Link
                to="/"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--line)] bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-tech text-xs tracking-wider uppercase transition-all hover:bg-gray-800 dark:hover:bg-white hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CDBDFF]"
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
