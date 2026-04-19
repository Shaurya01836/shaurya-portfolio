
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Cards from "./Cards";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

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

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
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

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex min-h-[260px] items-center justify-center bg-gray-50 p-4 dark:bg-[#050505]">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} preview`}
                    className="max-h-[70vh] w-full rounded-xl border border-gray-200 object-cover dark:border-[#1F1F1F]"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    Project image not available
                  </div>
                )}
              </div>

              <div className="relative flex flex-col p-6 md:p-8">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-md px-2 py-1 text-sm text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-[#151515] dark:hover:text-white"
                  aria-label="Close project details"
                >
                  Close
                </button>

                <h3 className="pr-20 text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>

                <p className="mt-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {selectedProject.description}
                </p>

                {Array.isArray(selectedProject.techStack) && selectedProject.techStack.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                    {selectedProject.techStack.map((tech, index) => (
                      <span
                        key={`${tech}-${index}`}
                        className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-[#151515] dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-fit rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    Open Live Demo
                  </a>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;