import { useEffect, useState, useCallback } from "react";
import Cards from "../components/Cards";
import { RiErrorWarningLine, RiRefreshLine } from "@remixicon/react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import BlueprintSection from "../components/ui/BlueprintSection";
import SectionHeader from "../components/ui/SectionHeader";
import Footer from "../components/Footer";

const BlogSkeleton = () => (
  <div className="flex flex-col bg-[var(--surface)] border border-[var(--line)] w-full animate-pulse h-full">
    <div className="w-full h-48 bg-black/[0.04] dark:bg-white/[0.03]"></div>
    <div className="flex flex-col p-5 gap-3 flex-grow">
      <div className="h-5 bg-black/[0.06] dark:bg-white/[0.05] w-3/4"></div>
      <div className="h-4 bg-black/[0.04] dark:bg-white/[0.03] w-full"></div>
      <div className="h-4 bg-black/[0.04] dark:bg-white/[0.03] w-2/3"></div>
      <div className="flex gap-2 mt-auto pt-2">
        <div className="h-5 w-16 bg-black/[0.05] dark:bg-white/[0.04]"></div>
      </div>
    </div>
  </div>
);

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setBlogs(blogsData);
      setLoading(false);
    } catch (firebaseErr) {
      console.error("Firebase fetch failed: ", firebaseErr);
      setBlogs([]);
      setError("Unable to connect to Blog Database.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, retryCount]);

  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        setShowSkeleton(true);
      }, 200);
    } else {
      setShowSkeleton(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="blogs" ariaLabel="Technical Publications" noTopBorder={true}>
        <SectionHeader
          number="00"
          label="ARTICLES"
          title="Engineering"
          accentWord="Dispatches"
          description="In-depth technical publications, design patterns & system architecture"
        />

        <div className="p-6 sm:p-8 md:p-10 min-h-[60vh]">
          {/* Skeleton state */}
          {showSkeleton && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {[...Array(4)].map((_, i) => (
                <BlogSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-red-500/20 bg-red-500/[0.03] p-8 max-w-md mx-auto">
              <div className="p-3 bg-red-500/10 text-red-500 mb-3">
                <RiErrorWarningLine size={32} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Database Sync Error
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 font-tech">
                {error}
              </p>
              <button 
                onClick={handleRetry} 
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-950 dark:bg-white text-white dark:text-black font-tech text-xs tracking-wider uppercase"
              >
                <RiRefreshLine size={16} />
                <span>Retry Transmission</span>
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && blogs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-[var(--line)] bg-[var(--surface)] p-8 max-w-lg mx-auto">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                No Publications Found
              </h3>
              <p className="text-xs font-tech text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                Articles are currently in draft. Check back soon for deep dives into Java backends, React optimization, and distributed systems.
              </p>
            </div>
          )}

          {/* Success state */}
          {!loading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {blogs.map((blog) => (
                <Cards
                  key={blog.id}
                  title={blog.title}
                  description={
                    blog.content.length > 110
                      ? blog.content.substring(0, 110) + "..."
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
      </BlueprintSection>

      <Footer />
    </div>
  );
};

export default Blogs;
