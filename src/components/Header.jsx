import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import { TechCornerTicks } from "./TechGridElements";
import { TechImage } from "./TechImage";

const DEFAULT_FEATURED = [
  {
    title: "STPI Internship",
    image: "https://i.ibb.co/PZt4m1GV/stpi.jpg",
  },
];

const Header = () => {
  // Synchronously initialize from local storage cache if available
  const [featuredItems, setFeaturedItems] = useState(() => {
    try {
      const cached = localStorage.getItem("featured_images_cache");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_FEATURED;
  });

  // Pick stable initial index on mount (cached or 0) - does NOT randomly jump post-render
  const [currentIndex, setCurrentIndex] = useState(() => {
    try {
      const savedIndex = sessionStorage.getItem("featured_index");
      if (savedIndex !== null) {
        const num = parseInt(savedIndex, 10);
        if (!isNaN(num) && num >= 0) return num;
      }
    } catch {
      // fallback to 0
    }
    return 0;
  });

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "featuredImages"));
        if (!querySnapshot.empty && isMounted) {
          const items = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || data.name || "STPI Internship",
              image: data.image || data.imageUrl || data.url || "https://i.ibb.co/PZt4m1GV/stpi.jpg",
            };
          });

          // Save to local cache for instant zero-delay render on future visits
          try {
            localStorage.setItem("featured_images_cache", JSON.stringify(items));
          } catch {
            // ignore
          }

          setFeaturedItems(items);

          // Keep current index stable so the image does NOT abruptly swap after page load
          setCurrentIndex((prev) => (prev < items.length ? prev : 0));
        }
      } catch (error) {
        console.error("Error fetching featured images:", error);
      }
    };

    fetchFeaturedImages();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageClick = () => {
    if (featuredItems.length <= 1) return;
    setCurrentIndex((prevIndex) => {
      const next = (prevIndex + 1) % featuredItems.length;
      try {
        sessionStorage.setItem("featured_index", next.toString());
      } catch {
        // ignore
      }
      return next;
    });
  };

  const currentItem = featuredItems[currentIndex] || DEFAULT_FEATURED[0];

  return (
    <div className="flex flex-col w-full px-8 py-10 gap-4 text-black dark:text-white transition-colors duration-300">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Overview
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* 2-Column Grid with gap-4 matching Projects section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Featured Highlights Spotlight */}
        <div className="group relative flex flex-col rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] overflow-hidden transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-700">
          {/* Top Metadata Strip */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider font-tech truncate max-w-[150px] sm:max-w-[180px]">
                {currentItem.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
                {currentIndex + 1}/{featuredItems.length}
              </span>
            </div>
          </div>

          {/* Showcase Image Viewport */}
          <div
            onClick={handleImageClick}
            className="relative w-full h-52 sm:h-56 overflow-hidden group cursor-pointer select-none"
          >
            <TechImage
              src={currentItem.image}
              alt={currentItem.title}
              priority={true}
              tag={`SPOTLIGHT: 0${currentIndex + 1}`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay Tag */}
            {featuredItems.length > 1 && (
              <div className="absolute bottom-2.5 right-2.5 font-tech text-[10px] px-2 py-0.5 rounded border border-white/20 bg-black/75 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                Click to swap
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Developer Studio / Coding Vibes */}
        <div className="group relative flex flex-col rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A] overflow-hidden transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-700">
          {/* Top Metadata Strip */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border-b border-gray-200 dark:border-[#1F1F1F] select-none">
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider font-tech">
                CODING VIBES
              </h2>
            </div>
          </div>

          {/* GIF Viewport */}
          <div className="relative w-full h-52 sm:h-56 overflow-hidden select-none">
            <TechImage
              src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
              alt="Coding GIF"
              tag="STUDIO: TELEMETRY"
              className="object-contain transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
