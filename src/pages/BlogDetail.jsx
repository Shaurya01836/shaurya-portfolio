import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  RiArrowLeftLine,
  RiCalendarLine,
  RiPriceTag3Line,
  RiGithubLine,
  RiExternalLinkLine,
  RiFileCopyLine,
  RiCheckLine,
} from "@remixicon/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import BlueprintSection from "../components/ui/BlueprintSection";
import Footer from "../components/Footer";

const formatDate = (dateValue) => {
  if (!dateValue) return "";
  // Check for Firestore Timestamp
  if (dateValue && typeof dateValue.toDate === 'function') {
    return dateValue.toDate().toLocaleDateString();
  }
  // Check for Firestore Timestamp object with seconds
  if (dateValue && dateValue.seconds) {
    return new Date(dateValue.seconds * 1000).toLocaleDateString();
  }
  // Otherwise parse as Date
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-[#161616]/80 hover:bg-[#202020]/90 border border-gray-800 dark:border-white/5 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 z-10"
      title="Copy to clipboard"
    >
      {copied ? (
        <RiCheckLine size={16} className="text-emerald-400" />
      ) : (
        <RiFileCopyLine size={16} />
      )}
    </button>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

const MarkdownComponents = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");

    if (!inline && match) {
      return (
        <div className="relative group my-6 rounded-md overflow-hidden border border-gray-200 dark:border-[#1F1F1F]">
          <CopyButton text={codeString} />
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    // Inline code styling
    return (
      <code
        className="bg-gray-100 dark:bg-[#121212] px-1.5 py-0.5 rounded-md text-sm border border-gray-200 dark:border-white/5 font-semibold text-gray-800 dark:text-gray-200"
        {...props}
      >
        {children}
      </code>
    );
  },
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog({ id: blogSnap.id, ...blogSnap.data() });
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      } catch {
        setError("Unable to connect to Blog Database.");
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

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

  if (loading) {
    if (showSkeleton) {
      return (
        <div className="flex flex-col pt-8 pb-20 px-4 md:px-8 w-full max-w-4xl mx-auto gap-6 text-black dark:text-white transition-colors duration-300">
          {/* Back Button Skeleton */}
          <div className="w-32 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />

          {/* Hero Image Skeleton */}
          <div className="w-full h-64 md:h-96 rounded-md bg-gray-200 dark:bg-zinc-800 animate-pulse" />

          {/* Title & Metadata Skeleton */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="w-28 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
              <div className="w-20 h-5 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="w-3/4 h-9 md:h-11 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
          </div>

          <hr className="border-gray-200 dark:border-[#1F1F1F] my-2" />

          {/* Content Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="w-11/12 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="w-5/6 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="w-4/5 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="w-2/3 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* Grid cards placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] flex flex-col gap-3">
              <div className="w-24 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="w-1/2 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
            <div className="p-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] flex flex-col gap-3">
              <div className="w-24 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="w-1/3 h-5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      );
    }
    return <div className="min-h-screen bg-white dark:bg-[#0A0A0A]" />;
  }
  if (error && !blog) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!blog) return <div className="p-8 text-gray-600">Blog not found</div>;

  const formattedDate = formatDate(blog.createdAt);
  const mainContent = (blog.content && blog.content.trim()) || (blog.introduction && blog.introduction.trim()) || "";

  return (
    <div className="w-full flex flex-col">
      <BlueprintSection id="blog-post" noTopBorder={true}>
        <div className="flex flex-col py-8 px-6 sm:px-10 w-full max-w-4xl mx-auto gap-6 text-black dark:text-white animate-fade-in-up">
          {/* Back Button */}
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-wider text-gray-500 hover:text-black dark:hover:text-[#CDBDFF] transition-colors mb-2 w-fit"
          >
            <RiArrowLeftLine size={16} />
            <span>Back to Blogs</span>
          </Link>

          {/* Cover image (if provided) */}
          {blog.thumbnailUrl && blog.thumbnailUrl.trim() && (
            <div className="w-full h-64 md:h-96 overflow-hidden border border-[var(--line)] bg-black/[0.04] dark:bg-white/[0.02]">
              <img
                src={blog.thumbnailUrl}
                alt={blog.title || "Blog cover"}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Metadata */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-gray-900 dark:text-[#F4F4F5] leading-tight">
              {blog.title}
            </h1>

            {(Boolean(formattedDate) || Boolean(blog.category?.trim())) && (
              <div className="flex flex-wrap gap-4 font-tech text-xs text-gray-500 dark:text-[#71717A] items-center">
                {formattedDate && (
                  <span className="flex items-center gap-1.5">
                    <RiCalendarLine size={15} />
                    {formattedDate}
                  </span>
                )}
                {blog.category && blog.category.trim() && (
                  <span className="flex items-center gap-1.5 px-2 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-gray-700 dark:text-gray-300">
                    <RiPriceTag3Line size={13} />
                    {blog.category}
                  </span>
                )}
              </div>
            )}

            {/* Optional Links if present */}
            {(Boolean(blog.githubUrl?.trim()) || Boolean(blog.liveDemoUrl?.trim())) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {blog.githubUrl?.trim() && (
                  <a
                    href={blog.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-[var(--line)] bg-[var(--surface)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] px-3.5 py-1.5 font-tech text-xs tracking-wider uppercase text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <RiGithubLine size={15} />
                    GitHub
                  </a>
                )}
                {blog.liveDemoUrl?.trim() && (
                  <a
                    href={blog.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#CDBDFF] hover:bg-[#b8a2ff] text-black px-3.5 py-1.5 font-tech text-xs font-semibold tracking-wider uppercase transition-colors"
                  >
                    <RiExternalLinkLine size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>

          <hr className="border-[var(--line)]" />

          {/* Markdown Content */}
          {mainContent ? (
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={MarkdownComponents}
              >
                {mainContent}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="font-tech text-xs text-gray-500 italic">No content available for this post.</p>
          )}
        </div>
      </BlueprintSection>
      <Footer />
    </div>
  );
};

export default BlogDetail;
