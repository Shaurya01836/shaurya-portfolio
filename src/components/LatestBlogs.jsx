import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import Cards from "./Cards";
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";
import { playClickSound, playPopSound } from "../utils/sound";
import { cachedFetch, getCachedData, CACHE_TTL } from "../utils/cache";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState(() => {
    const cached = getCachedData("firestore_blogs");
    return cached && cached.data ? cached.data.slice(0, 3) : [];
  });
  const [totalCount, setTotalCount] = useState(() => {
    const cached = getCachedData("firestore_blogs");
    return cached && cached.data ? cached.data.length : 0;
  });
  const [loading, setLoading] = useState(() => {
    const cached = getCachedData("firestore_blogs");
    return !cached || !cached.data || cached.data.length === 0;
  });

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogsData = await cachedFetch(
          "firestore_blogs",
          async () => {
            const blogsRef = collection(db, "blogs");
            let querySnapshot;

            try {
              const q = query(blogsRef, orderBy("createdAt", "desc"));
              querySnapshot = await getDocs(q);
            } catch {
              querySnapshot = await getDocs(blogsRef);
            }

            if (querySnapshot.empty) {
              querySnapshot = await getDocs(blogsRef);
            }

            const data = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            // Sort client-side safely
            data.sort((a, b) => {
              const getTime = (val) => {
                if (!val) return 0;
                if (typeof val.toDate === "function") return val.toDate().getTime();
                if (val.seconds) return val.seconds * 1000;
                const d = new Date(val);
                return isNaN(d.getTime()) ? 0 : d.getTime();
              };
              const timeA = getTime(a.createdAt || a.updatedAt);
              const timeB = getTime(b.createdAt || b.updatedAt);
              return timeB - timeA;
            });

            return data;
          },
          CACHE_TTL.FIRESTORE
        );

        setTotalCount(blogsData.length);
        setBlogs(blogsData.slice(0, 3));
      } catch (err) {
        console.error("Error fetching latest blogs: ", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <BlueprintSection
      id="blogs"
      ariaLabel="Latest Publications & Articles"
      rightAnnotation={{
        lines: ["articles on things", "I build & learn"],
        arrow: "down-left",
      }}
    >
      {/* 2-cell Section Header */}
      <SectionHeader
        number="07"
        label="ARTICLES"
        title="Latest"
        accentWord="Posts"
        description="Tutorials, guides, and notes on web development"
      />

      {/* Content Area */}
      <div className="p-6 sm:p-8 md:p-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-[var(--line)] bg-[var(--surface)] p-6 flex flex-col gap-4 animate-pulse"
              >
                <div className="w-full h-44 bg-black/[0.04] dark:bg-white/[0.04]" />
                <div className="h-4 bg-black/[0.06] dark:bg-white/[0.06] w-3/4" />
                <div className="h-3 bg-black/[0.04] dark:bg-white/[0.04] w-full" />
                <div className="h-3 bg-black/[0.04] dark:bg-white/[0.04] w-2/3" />
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="flex flex-col gap-8">
            {/* Grid of Latest Blog Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => {
                const rawSnippet = (blog.introduction || blog.content || blog.description || "")
                  .replace(/^[#\s*`_~>-]+/gm, "")
                  .replace(/\n+/g, " ")
                  .trim();
                const description =
                  rawSnippet.length > 120 ? rawSnippet.substring(0, 120) + "..." : rawSnippet;

                const tags =
                  blog.category && blog.category.trim()
                    ? [blog.category.trim()]
                    : Array.isArray(blog.techStack)
                    ? blog.techStack.filter(Boolean).slice(0, 2)
                    : [];

                return (
                  <Cards
                    key={blog.id}
                    title={blog.title}
                    description={description}
                    techStack={tags}
                    image={blog.thumbnailUrl || ""}
                    to={`/blogs/${blog.id}`}
                    onClick={playPopSound}
                  />
                );
              })}
            </div>

            {/* Link to full /blogs catalog */}
            <div className="flex justify-center pt-2">
              <Link
                to="/blogs"
                onClick={playClickSound}
                className="px-5 py-2.5 rounded-none border border-[var(--line)] bg-[var(--surface)] text-xs font-tech tracking-wider uppercase text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF] flex items-center gap-2"
              >
                <span>View All Articles {totalCount > 3 ? `(${totalCount})` : ""}</span>
                <span className="text-xs">↗</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="py-12 border border-dashed border-[var(--line)] bg-[var(--surface)] text-center flex flex-col items-center justify-center p-6">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
              Articles Coming Soon
            </h3>
            <p className="text-xs font-tech text-gray-500 dark:text-gray-400 max-w-md leading-relaxed mb-4">
              New articles and guides on React, Java, and web development are on the way.
            </p>
            <Link
              to="/blogs"
              onClick={playClickSound}
              className="text-xs font-tech text-[#CDBDFF] hover:underline"
            >
              Browse Blog Archive ↗
            </Link>
          </div>
        )}
      </div>
    </BlueprintSection>
  );
};

export default LatestBlogs;

