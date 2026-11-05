import { useEffect, useState } from "react";
import { 
  RiExternalLinkLine, 
  RiGithubLine,
  RiCloseLine
} from "@remixicon/react";
import { useLenis } from "lenis/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Cards from "./Cards";
import { motion, AnimatePresence } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const listener = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (selectedProject) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [selectedProject, lenis]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => (b.order || 0) - (a.order || 0));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        const activeEl = document.activeElement;
        const isInsideModal = activeEl && activeEl.closest("[role='dialog']");
        if (!isInsideModal) {
          event.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const [showAll, setShowAll] = useState(false);

  if (loading) return <div className="px-8 py-20">Loading Projects...</div>;

  const hiddenDetailKeys = new Set([
    "id",
    "title",
    "description",
    "image",
    "techStack",
    "liveDemo",
    "github",
    "githubUrl",
    "repo",
    "repository",
    "features",
    "featureHighlights",
    "keyFeatures",
    "role",
    "duration",
    "timeline",
    "metrics",
    "impact",
    "results",
    "category",
    "caseStudy",
    "order",
    "createdAt",
    "created_at",
    "updatedAt",
    "updated_at",
    "timestamp",
  ]);

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^./, (str) => str.toUpperCase());

  const extraDetails = selectedProject
    ? Object.entries(selectedProject).filter(
        ([key, value]) =>
          !hiddenDetailKeys.has(key) &&
          value !== undefined &&
          value !== null &&
          value !== "" &&
          (typeof value === "string" || typeof value === "number")
      )
    : [];

  const resolveFirstUrl = (project, keys) => {
    const value = keys
      .map((key) => project?.[key])
      .find((entry) => typeof entry === "string" && entry.trim());

    return value ? value.trim() : "";
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="flex flex-col py-10 w-full px-8 gap-4 text-black dark:text-white">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Recent Projects
        </h1>
        <div className="h-[1px] flex-grow bg-gray-200 dark:bg-[#1F1F1F] relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-16 tech-ruler-ticks-x opacity-40" />
        </div>
      </div>

      {/* Sub-bar with System Metadata */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-[#121212] border border-gray-200 dark:border-[#1F1F1F] rounded-md select-none">
        <div className="flex items-center gap-2">
          <h2 className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider font-tech">
            Selected Works
          </h2>
        </div>
        <span className="font-tech text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest px-2 py-0.5 rounded border border-gray-200 dark:border-[#1F1F1F] bg-white dark:bg-[#0A0A0A]">
          {displayedProjects.length} / {projects.length} Works
        </span>
      </div>

      {/* Grid of Projects with gap in between */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {displayedProjects.map((project, idx) => (
          <Cards
            key={project.id}
            index={idx}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            liveDemo={project.liveDemo}
            image={project.image}
            onClick={() => setSelectedProject(project)}
            ariaLabel={`Open details for ${project.title}`}
          />
        ))}
      </div>

      {projects.length > 4 && (
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-2 rounded border border-gray-200 dark:border-[#1F1F1F] bg-gray-50/90 dark:bg-[#121212] px-5 py-2 font-tech text-xs uppercase tracking-wider text-gray-700 dark:text-gray-300 shadow-xs transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#181818]"
          >
            <span>{showAll ? "Show Less" : `Show More (${projects.length - 4} more)`}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "opacity" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 md:bg-black/60 p-4 md:backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            data-lenis-prevent
          >
            {(() => {
              const githubUrl = resolveFirstUrl(selectedProject, [
                "github",
                "githubUrl",
                "repo",
                "repository",
              ]);
              const liveDemoUrl = resolveFirstUrl(selectedProject, ["liveDemo"]);
              
              const techStack = selectedProject.techStack;
              const featuresList =
                selectedProject.featureHighlights || selectedProject.features || selectedProject.keyFeatures || [];
              
              const stack = Array.isArray(techStack)
                ? techStack.filter(Boolean)
                : typeof techStack === "string" 
                  ? techStack.split(",").map(s => s.trim()) 
                  : [];

              return (
            <motion.div
              initial={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={isMobile ? { y: 8, opacity: 0 } : { scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: isMobile ? 0.2 : 0.3, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="w-full max-w-5xl max-h-[80vh] flex flex-col relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
              onClick={(event) => event.stopPropagation()}
            >
              {/* Modal Technical Header Strip */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/90 dark:bg-[#111111]/90 border-b border-gray-200 dark:border-[#1F1F1F] select-none">
                <span className="font-tech text-xs text-gray-400 dark:text-gray-500 font-medium">
                  SPECIFICATION : {selectedProject.title}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded border border-gray-200 dark:border-[#222222] bg-white dark:bg-[#0A0A0A] p-1 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Close project details"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden min-h-0">
                <div className="flex min-h-[260px] md:min-h-0 md:w-1/2 items-center justify-center bg-gray-50/60 p-4 dark:bg-[#080808] border-b md:border-b-0 md:border-r border-gray-200 dark:border-[#1F1F1F]">
                  {selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      className="max-h-[60vh] md:max-h-[68vh] w-full rounded border border-gray-200 object-cover dark:border-[#1F1F1F]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full rounded border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      Project image not available
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col p-6 md:p-8 md:w-1/2 md:overflow-y-auto min-h-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {selectedProject.description}
                  </p>

                  {(githubUrl || liveDemoUrl) && (
                    <div className="mt-6 flex flex-wrap gap-2.5 border-t border-gray-200 pt-5 dark:border-[#1F1F1F]">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded border border-gray-200 dark:border-[#222222] bg-white dark:bg-[#121212] px-3.5 py-1.5 font-tech text-xs uppercase tracking-wider text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#181818] transition-colors"
                        >
                          <RiGithubLine size={16} />
                          GitHub Repo
                        </a>
                      )}

                      {liveDemoUrl && (
                        <a
                          href={liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded bg-black dark:bg-white px-3.5 py-1.5 font-tech text-xs uppercase tracking-wider text-white dark:text-black hover:opacity-90 transition-opacity"
                        >
                          <RiExternalLinkLine size={16} />
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  )}

                  {stack.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-5 dark:border-[#1F1F1F]">
                      <h4 className="mb-2.5 font-tech text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {stack.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-[#141414] text-gray-700 dark:text-gray-300 rounded font-tech text-xs border border-gray-200 dark:border-[#222222]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {((Array.isArray(featuresList) && featuresList.length > 0) || (typeof featuresList === "string" && featuresList.trim())) && (
                    <div className="mt-6 border-t border-gray-200 pt-5 dark:border-[#1F1F1F]">
                      <h4 className="mb-2.5 font-tech text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Key Features
                      </h4>
                      {Array.isArray(featuresList) ? (
                        <ul className="space-y-2">
                          {featuresList.filter(f => typeof f === 'string' && f.trim()).map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                              <span className="text-gray-400 dark:text-gray-600 mt-0.5 flex-shrink-0 font-tech text-[10px]">+</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{featuresList}</p>
                      )}
                    </div>
                  )}

                  {extraDetails.length > 0 && (
                    <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                      {extraDetails.map(([key, value]) => (
                        <div key={key} className="flex flex-col gap-1">
                          <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            {formatLabel(key)}
                          </span>
                          <span className="text-sm text-gray-800 dark:text-gray-200">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;