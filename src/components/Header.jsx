import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

const Magnetic = ({ children, scale = 0.08 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    setPosition({ x: distanceX * scale, y: distanceY * scale });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 0.1 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  scale: PropTypes.number,
};

const Header = () => {
  const [featuredItems, setFeaturedItems] = useState([
    {
      title: "STPI Internship",
      image: "https://i.ibb.co/PZt4m1GV/stpi.jpg",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "featuredImages"));
        if (!querySnapshot.empty) {
          const items = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || data.name || "STPI Internship",
              image: data.image || data.imageUrl || data.url || "https://i.ibb.co/PZt4m1GV/stpi.jpg",
            };
          });

          setFeaturedItems(items);
          // Select random starting index
          const randomIndex = Math.floor(Math.random() * items.length);
          setCurrentIndex(randomIndex);
        }
      } catch (error) {
        console.error("Error fetching featured images:", error);
      }
    };

    fetchFeaturedImages();
  }, []);

  const handleImageClick = () => {
    if (featuredItems.length <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
  };

  const currentItem = featuredItems[currentIndex] || {
    title: "STPI Internship",
    image: "https://i.ibb.co/PZt4m1GV/stpi.jpg",
  };

  // Helper to get items in the stack sequence
  const getStackItem = (offset) => {
    const index = (currentIndex + offset) % featuredItems.length;
    return featuredItems[index];
  };

  return (
    <div className="relative flex flex-col gap-6 text-black dark:text-white p-4 md:p-8 md:pt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Left Column - Dynamic Featured Item Stack */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">
              {currentItem.title}
            </h1>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
          </div>
          <Magnetic scale={0.04}>
            <div className="relative w-full h-44 select-none">
              {/* Stack Card 3 (Bottom-most) */}
              {featuredItems.length > 2 && (
                <div
                  className="absolute inset-0 w-full h-full rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-gray-100 dark:bg-[#121212] shadow-sm pointer-events-none transition-all duration-300 origin-bottom-right"
                  style={{
                    transform: "rotate(3deg) translate(6px, 6px) scale(0.95)",
                    opacity: 0.35,
                    zIndex: 1,
                  }}
                >
                  <img
                    src={getStackItem(2).image}
                    alt="Stack Background 2"
                    className="w-full h-full object-cover rounded-md grayscale-[20%] opacity-80"
                  />
                </div>
              )}

              {/* Stack Card 2 (Middle) */}
              {featuredItems.length > 1 && (
                <div
                  className="absolute inset-0 w-full h-full rounded-md border border-gray-200 dark:border-[#1F1F1F] bg-gray-100 dark:bg-[#121212] shadow-sm pointer-events-none transition-all duration-300 origin-bottom-left"
                  style={{
                    transform: "rotate(-2deg) translate(-4px, 4px) scale(0.98)",
                    opacity: 0.65,
                    zIndex: 2,
                  }}
                >
                  <img
                    src={getStackItem(1).image}
                    alt="Stack Background 1"
                    className="w-full h-full object-cover rounded-md grayscale-[10%] opacity-90"
                  />
                </div>
              )}

              {/* Stack Card 1 (Top / Active Clickable Card) */}
              <div className="relative w-full h-full rounded-md border border-gray-200 dark:border-[#1F1F1F] shadow-md z-10 bg-white dark:bg-[#151515] overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentItem.image}
                    src={currentItem.image}
                    alt={currentItem.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover rounded-md cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    onClick={handleImageClick}
                    loading="lazy"
                  />
                </AnimatePresence>
                
                {/* Floating "Click to cycle" hint on hover */}
                {featuredItems.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to swap
                  </div>
                )}
              </div>
            </div>
          </Magnetic>
        </div>

        {/* Right Column - Coding Vibes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider whitespace-nowrap">
              Coding Vibes
            </h1>
            <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
          </div>
          <Magnetic scale={0.06}>
            <img
              src="https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif"
              alt="Coding GIF"
              loading="lazy"
              className="w-full h-44 object-cover rounded-md border border-gray-200 dark:border-[#1F1F1F] shadow-sm cursor-pointer"
            />
          </Magnetic>
        </div>
      </div>
    </div>
  );
};

export default Header;