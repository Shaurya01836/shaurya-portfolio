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
        }));
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

  return (
    <div className="flex flex-col py-20 w-full px-8 gap-2 text-black dark:text-white">
      <div className="flex items-center gap-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Recent Projects
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
        {projects.map((project) => (
          <Cards
            key={project.id}
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
              className="w-full max-w-5xl max-h-[75vh] flex flex-col relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.title} details`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute z-50 right-4 top-4 rounded-full bg-white md:bg-white/80 p-2 text-gray-700 shadow-sm md:backdrop-blur-md transition hover:bg-white hover:text-gray-900 dark:bg-[#0A0A0A] dark:md:bg-[#0A0A0A]/80 dark:text-gray-300 dark:hover:bg-[#111111] dark:hover:text-white border border-gray-200 dark:border-white/10"
                aria-label="Close project details"
              >
                <RiCloseLine size={24} />
              </button>

              <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden min-h-0">
                <div className="flex min-h-[260px] md:min-h-0 md:w-1/2 items-center justify-center bg-gray-50 p-4 dark:bg-[#050505]">
                  {selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      className="max-h-[60vh] md:max-h-[70vh] w-full rounded-xl border border-gray-200 object-cover dark:border-[#1F1F1F]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                      Project image not available
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col p-6 md:p-8 md:w-1/2 md:overflow-y-auto min-h-0">
                  <h3 className="pr-16 text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>

                  <p className="mt-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {selectedProject.description}
                  </p>

                  {(githubUrl || liveDemoUrl) && (
                    <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition hover:border-gray-400 hover:bg-gray-100 dark:border-[#2A2A2A] dark:text-gray-100 dark:hover:border-[#3A3A3A] dark:hover:bg-[#141414]"
                        >
                          <RiGithubLine size={18} />
                          GitHub Repo
                        </a>
                      )}

                      {liveDemoUrl && (
                        <a
                          href={liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                          <RiExternalLinkLine size={18} />
                          Open Live Demo
                        </a>
                      )}
                    </div>
                  )}

                  {stack.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {stack.map((t, i) => (
                          <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-[#151515] text-gray-800 dark:text-gray-200 rounded-md text-xs font-medium border border-gray-200 dark:border-white/5 shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {((Array.isArray(featuresList) && featuresList.length > 0) || (typeof featuresList === "string" && featuresList.trim())) && (
                    <div className="mt-6 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Key Features
                      </h4>
                      {Array.isArray(featuresList) ? (
                        <ul className="space-y-2.5">
                          {featuresList.filter(f => typeof f === 'string' && f.trim()).map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
                              <span className="text-blue-500 mt-1 flex-shrink-0 text-[10px]">✦</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{featuresList}</p>
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