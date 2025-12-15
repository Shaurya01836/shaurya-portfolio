import { useEffect, useState, useCallback } from "react";
import Cards from "./Cards";
import { RiErrorWarningLine, RiRefreshLine } from "@remixicon/react";

// 1. Skeleton Component for Loading State
const BlogSkeleton = () => (
  <div className="flex flex-col bg-white dark:bg-[#0A0A0A] rounded-md shadow-sm border border-gray-200 dark:border-gray-800 w-full animate-pulse h-full">
  
    <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-t-md"></div>
    
   
    <div className="flex flex-col p-4 gap-3 flex-grow">
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
      
    
      <div className="flex gap-2 mt-auto pt-2">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
      </div>
    </div>
  </div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const LOCAL_API = import.meta.env.VITE_API_LOCAL;
  const PROD_API = import.meta.env.VITE_API_PROD;


  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting Local Fetch...");
      const response = await fetch(`${LOCAL_API}/api/blogs`);
      
      if (!response.ok) throw new Error("Local fetch failed");
      
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
      console.log("Loaded from: Localhost");

    } catch (localErr) {
      console.warn("Switching to Production...", localErr);
      
      try {
        const prodResponse = await fetch(`${PROD_API}/api/blogs`);
        
        if (!prodResponse.ok) throw new Error("Production fetch failed");

        const data = await prodResponse.json();
        setBlogs(data);
        setLoading(false);

      } catch (prodErr) {
        console.error(prodErr);
        setError("Unable to connect to Blog Server.");
        setLoading(false);
      }
    }
  }, [LOCAL_API, PROD_API]);


  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div
      id="blogs"
      className="flex flex-col py-24 w-full px-8 gap-4 text-black dark:text-white transition-colors duration-300"
    >
      {/* Header */}
      {!loading && !error && blogs.length > 0 && (
         <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-2">
           Latest Blogs
         </h1>
      )}

      {/* 2. LOADING STATE: Skeleton Grid */}
      {loading && (
        <div className="w-full">
           <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold mb-6">
             Latest Blogs
           </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
            {[...Array(4)].map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
        </div>
      )}

      {/* 3. ERROR STATE: Styled Error Card */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-red-200 dark:border-red-900/50 rounded-xl bg-red-50/50 dark:bg-red-900/10 animate-fade-in-up w-full">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4 text-red-500 dark:text-red-400 shadow-sm">
            <RiErrorWarningLine size={48} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
            {error} <br/> Check your internet connection or try again later.
          </p>
          <button 
            onClick={handleRetry} 
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
          >
            <RiRefreshLine size={20} />
            Try Again
          </button>
        </div>
      )}

      {/* 4. EMPTY STATE: Improved Visuals */}
      {!loading && !error && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md bg-gray-50/50 dark:bg-[#161b22]/50 animate-fade-in-up w-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            No Blogs Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            I have not published any articles just yet. <br/> 
            Check back soon for tutorials, technical deep dives, and project updates!
          </p>
        </div>
      )}

      {/* SUCCESS STATE: Blog Grid */}
      {!loading && !error && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
          {blogs.map((blog) => (
            <Cards
              key={blog.id}
              title={blog.title}
              description={
                blog.content.length > 100
                  ? blog.content.substring(0, 100) + "..."
                  : blog.content
              }
              techStack={[blog.category]}
              image={
                blog.thumbnailUrl ||
                "https://via.placeholder.com/600x400?text=No+Image"
              }
              to={`/blogs/${blog.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;