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
  RiCodeSSlashLine,
  RiTimeLine,
  RiUserStarLine,
  RiAlertLine,
  RiAwardLine,
  RiFileCopyLine,
  RiCheckLine,
} from "@remixicon/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";

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
        <div className="flex flex-col py-20 px-4 md:px-8 w-full max-w-4xl mx-auto gap-6 text-black dark:text-white transition-colors duration-300">
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

  const isProjectShowcase = blog.category === "Project Showcase";

  if (isProjectShowcase) {
    return (
      <div className="flex flex-col py-24 px-4 md:px-8 w-full max-w-5xl mx-auto gap-8 text-black dark:text-white transition-colors duration-300">
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors w-fit"
        >
          <RiArrowLeftLine size={20} />
          <span>Back to Blogs</span>
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] overflow-hidden p-6 md:p-8 shadow-sm">
          <div className="w-full h-60 md:h-96 rounded-md overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
            <img
              src={blog.thumbnailUrl || "https://via.placeholder.com/800x400?text=No+Image"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
                <RiAwardLine size={14} />
                {blog.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <RiCalendarLine size={16} />
                {formatDate(blog.createdAt)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {blog.title}
            </h1>

            <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>{blog.introduction}</ReactMarkdown>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 dark:border-white/5 pt-6 mt-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <RiUserStarLine size={14} /> Role & Responsibility
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{blog.role || "Lead Developer"}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                  <RiTimeLine size={14} /> Timeline
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{blog.timeline || "4 weeks"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {blog.githubUrl && (
                <a
                  href={blog.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-gray-300 dark:border-[#2A2A2A] px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 transition hover:bg-gray-50 dark:hover:bg-[#141414]"
                >
                  <RiGithubLine size={18} />
                  GitHub Repository
                </a>
              )}
              {blog.liveDemoUrl && (
                <a
                  href={blog.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-semibold transition hover:opacity-90"
                >
                  <RiExternalLinkLine size={18} />
                  Open Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack Badge Section */}
        {blog.techStack && (
          <div className="flex flex-col gap-4 p-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A]">
            <h2 className="text-xs uppercase tracking-widest text-gray-400 font-bold flex items-center gap-1.5">
              <RiCodeSSlashLine size={16} /> Tech Stack Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {blog.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-gray-300 rounded-md text-xs font-semibold border border-gray-200 dark:border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* System Architecture Section */}
        {blog.architecture && (
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              System Architecture & Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blog.architecture.map((arch, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 p-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] hover:border-blue-500/20 transition-all duration-300 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-md bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-blue-500">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mt-1">{arch.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{arch.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Two-Column split for Challenges & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenges & Solutions */}
          {blog.challenges && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Engineering Challenges
              </h2>
              <div className="flex flex-col gap-4">
                {blog.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] relative overflow-hidden"
                  >
                    <div className="absolute right-0 top-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
                    <h3 className="font-bold text-red-500 flex items-center gap-1.5">
                      <RiAlertLine size={18} />
                      {challenge.problem}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{challenge.detail}</p>
                    <div className="border-t border-gray-100 dark:border-white/5 pt-3 mt-1">
                      <span className="text-xs text-emerald-500 font-bold uppercase tracking-wide">Solution:</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1">{challenge.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline & Roadmap */}
          {blog.phases && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Development Phases
              </h2>
              <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100 dark:border-[#1F1F1F]">
                {blog.phases.map((phase, index) => (
                  <div key={index} className="relative pl-6 pb-6 last:pb-0">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white dark:bg-[#0A0A0A] border-4 border-blue-500 z-10" />
                    <h3 className="font-bold text-gray-900 dark:text-white">{phase.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1.5">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results & Metrics Section */}
        {blog.metrics && (
          <div className="flex flex-col gap-6 border border-gray-200 dark:border-[#1F1F1F] rounded-md bg-white dark:bg-[#0A0A0A] p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-center">
              Project Impact & Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-2">
              {blog.metrics.map((metric, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                  <span className="text-4xl font-extrabold text-blue-500">{metric.value}</span>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Fallback Standard Post layout
  return (
    <div className="flex flex-col pt-20 pb-24 px-8 w-full max-w-4xl mx-auto gap-6 text-black dark:text-white animate-fade-in-up">
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-4 w-fit"
      >
        <RiArrowLeftLine size={20} />
        <span>Back to Blogs</span>
      </Link>

      <div className="w-full h-64 md:h-96 rounded-md overflow-hidden shadow-sm border border-gray-200 dark:border-[#1F1F1F]">
        <img
          src={blog.thumbnailUrl || "https://via.placeholder.com/800x400?text=No+Image"}
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
            {formatDate(blog.createdAt)}
          </span>
          <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
            <RiPriceTag3Line size={14} />
            {blog.category}
          </span>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-[#1F1F1F]" />

      <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>{blog.content || "*No content found in the `content` field for this blog post in Firestore.*"}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;
