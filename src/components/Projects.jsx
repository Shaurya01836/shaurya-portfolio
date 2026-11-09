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
import BlueprintSection from "./ui/BlueprintSection";
import SectionHeader from "./ui/SectionHeader";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const lenis = useLenis();

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
        const projectData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .sort((a, b) => (b.order || 0) - (a.order || 0));
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
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const resolveFirstUrl = (project, keys) => {
    const value = keys
      .map((key) => project?.[key])
      .find((entry) => typeof entry === "string" && entry.trim());

    return value ? value.trim() : "";
  };

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <BlueprintSection id="projects" ariaLabel="Selected Projects">
      {/* 2-cell Section Header */}
      <SectionHeader
        number="01"
        label="PROJECTS"
        title="Featured"
        accentWord="Works"
        description="Interactive applications & scalable backend systems"
      />

      {/* Content Area */}
      <div className="p-6 sm:p-8 md:p-10">
        {loading ? (
          <div className="py-16 text-center text-xs font-tech text-gray-500 tracking-wider uppercase">
            Loading project blueprints...
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <Cards
                  key={project.id}
                  title={project.title}
                  description={project.shortDescription || project.description}
                  techStack={project.techStack || []}
                  liveDemo={resolveFirstUrl(project, ["liveDemo", "deployedUrl", "liveUrl", "demoUrl"])}
                  githubUrl={resolveFirstUrl(project, ["githubUrl", "github", "sourceCode", "repoUrl"])}
                  image={project.image || project.imageUrl || "https://via.placeholder.com/600x400"}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>

            {/* Toggle show all */}
            {projects.length > 3 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 py-2.5 rounded-none border border-[var(--line)] bg-[var(--surface)] text-xs font-tech tracking-wider uppercase text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#CDBDFF]"
                >
                  {showAll ? "Show Less" : `View All Projects (${projects.length})`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Dialog for Project Details (Square, Sharp UI) */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[var(--surface)] border border-[var(--line)] rounded-none shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-tech text-[10px] tracking-widest text-[#CDBDFF] uppercase">
                    [PROJECT SPEC]
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#F4F4F5]">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1 border border-[var(--line)] hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="Close dialog"
                >
                  <RiCloseLine size={18} />
                </button>
              </div>

              {/* Image Preview */}
              <div className="w-full h-56 sm:h-64 overflow-hidden border border-[var(--line)] bg-black/[0.05]">
                <img
                  src={selectedProject.image || selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{selectedProject.description || selectedProject.shortDescription}</p>
              </div>

              {/* Tech Stack */}
              {selectedProject.techStack && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="font-tech text-[11px] px-2.5 py-1 rounded-none bg-black/[0.02] dark:bg-white/[0.03] text-gray-600 dark:text-[#71717A] border border-[var(--line)] uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--line)]">
                {resolveFirstUrl(selectedProject, ["liveDemo", "deployedUrl", "liveUrl", "demoUrl"]) && (
                  <a
                    href={resolveFirstUrl(selectedProject, ["liveDemo", "deployedUrl", "liveUrl", "demoUrl"])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-gray-950 dark:bg-[#F4F4F5] text-white dark:text-[#07070A] font-medium text-xs font-tech tracking-wider uppercase transition-colors hover:bg-gray-800 dark:hover:bg-white"
                  >
                    <span>LIVE DEMO</span>
                    <RiExternalLinkLine size={14} />
                  </a>
                )}
                {resolveFirstUrl(selectedProject, ["githubUrl", "github", "sourceCode", "repoUrl"]) && (
                  <a
                    href={resolveFirstUrl(selectedProject, ["githubUrl", "github", "sourceCode", "repoUrl"])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none border border-[var(--line)] bg-[var(--surface)] text-gray-800 dark:text-gray-200 font-medium text-xs font-tech tracking-wider uppercase transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                  >
                    <RiGithubLine size={15} />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BlueprintSection>
  );
}

export default Projects;
