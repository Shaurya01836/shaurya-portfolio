import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiPriceTag3Line,
} from "@remixicon/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        console.log(`Fetching Blog Detail (${id}) from Firestore...`);
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog({ id: blogSnap.id, ...blogSnap.data() });
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      } catch (firebaseErr) {
        console.error("Firebase fetch failed", firebaseErr);
        setError("Unable to connect to Blog Database.");
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading)
    return (
      <div className="p-8 text-gray-600 dark:text-gray-400">
        Loading post...
      </div>
    );
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!blog) return <div className="p-8 text-gray-600">Blog not found</div>;

  return (
    <div className="flex flex-col py-24 px-8 w-full max-w-4xl mx-auto gap-6 border-l text-black dark:text-white animate-fade-in-up">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-4 w-fit"
      >
        <RiArrowLeftLine size={20} />
        <span>Back to Blogs</span>
      </Link>

      <div className="w-full h-64 md:h-96 rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-[#1F1F1F]">
        <img
          src={
            blog.thumbnailUrl ||
            "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 items-center">
          <span className="flex items-center gap-1">
            <RiCalendarLine size={16} />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
            <RiPriceTag3Line size={14} />
            {blog.category}
          </span>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-[#1F1F1F]" />

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;
