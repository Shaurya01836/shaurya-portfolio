import { useState, useEffect } from "react";

const Loading = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        const increment = Math.floor(Math.random() * 10) + 1;
        const nextProgress = Math.min(prev + increment, 100);

        return nextProgress;
      });
    };

    const intervalId = setInterval(updateProgress, 200);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeoutId = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <div className="w-full max-w-md px-8 flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <span className="text-4xl font-bold text-gray-900 dark:text-white font-mono">
            {progress}%
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase pb-1">
            Loading
          </span>
        </div>

        <div className="w-full h-[2px] bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-black dark:bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
