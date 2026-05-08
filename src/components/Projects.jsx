
import { useEffect, useState } from "react";
import { 
  RiExternalLinkLine, 
  RiGithubLine,
  RiStarLine,
  RiCodeSSlashLine,
  RiBarChartGroupedLine,
  RiUserStarLine,
  RiCloseLine
} from "@remixicon/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Cards from "./Cards";

const FeatureIllustration = () => (
  <div className="w-full h-full min-h-[140px] flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 rounded-lg border border-gray-100 dark:border-white/5 relative overflow-hidden group-hover:border-blue-500/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex flex-col gap-3 w-full max-w-[200px] z-10">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
        <div className="h-2 w-1/3 bg-gray-300 dark:bg-white/20 rounded-full" />
      </div>
      <div className="p-3 rounded-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm">
        <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full mb-2" />
        <div className="h-2 w-4/5 bg-gray-200 dark:bg-white/10 rounded-full" />
      </div>
    </div>
  </div>
);

const TechIllustration = () => (
  <div className="w-full h-full min-h-[140px] flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 relative overflow-hidden rounded-lg border border-gray-100 dark:border-white/5 group-hover:border-purple-500/30 transition-colors duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="w-full max-w-[200px] bg-white dark:bg-[#151515] rounded-md overflow-hidden shadow-xl border border-gray-200 dark:border-white/10 z-10 transform group-hover:scale-105 transition-transform duration-500">
      <div className="h-6 bg-gray-100 dark:bg-[#1F1F1F] border-b border-gray-200 dark:border-white/5 flex items-center px-2 gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400/80" />
        <div className="w-2 h-2 rounded-full bg-amber-400/80" />
        <div className="w-2 h-2 rounded-full bg-emerald-400/80" />
      </div>
      <div className="p-3 flex flex-col gap-2.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-2">
          <span className="text-purple-500 text-[10px] font-mono">import</span>
          <div className="h-1.5 w-12 bg-gray-300 dark:bg-white/20 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-500 text-[10px] font-mono">const</span>
          <div className="h-1.5 w-16 bg-gray-300 dark:bg-white/20 rounded" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-emerald-500 text-[10px] font-mono pl-3">return</span>
          <div className="h-1.5 w-10 bg-gray-300 dark:bg-white/20 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const ImpactIllustration = () => (
  <div className="w-full h-full min-h-[140px] flex items-end justify-center bg-gray-50 dark:bg-[#050505] p-4 rounded-lg border border-gray-100 dark:border-white/5 gap-1.5 group-hover:border-emerald-500/30 transition-colors duration-500 overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {[30, 50, 40, 70, 55, 90, 65, 80, 45].map((h, i) => (
      <div 
        key={i} 
        className="w-4 bg-gradient-to-t from-emerald-400 to-emerald-300 dark:from-emerald-600/50 dark:to-emerald-400 rounded-t-sm transform origin-bottom transition-transform duration-500 group-hover:scale-y-110 z-10" 
        style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }} 
      />
    ))}
  </div>
);

const RoleIllustration = () => (
  <div className="w-full h-full min-h-[140px] flex items-center justify-center bg-gray-50 dark:bg-[#050505] p-4 rounded-lg border border-gray-100 dark:border-white/5 group-hover:border-amber-500/30 transition-colors duration-500 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="flex flex-col items-center gap-4 z-10">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute -inset-2 rounded-full border border-dashed border-gray-300 dark:border-amber-500/30 animate-[spin_4s_linear_infinite] group-hover:border-amber-400 dark:group-hover:border-amber-500/60 transition-colors duration-500" />
        {/* Inner solid ring */}
        <div className="absolute -inset-1 rounded-full border border-gray-200 dark:border-amber-500/20 group-hover:border-amber-300 dark:group-hover:border-amber-500/40 transition-colors duration-500" />
        {/* Core avatar */}
        <div className="w-12 h-12 rounded-full bg-white dark:bg-gradient-to-tr dark:from-amber-500/20 dark:to-orange-500/20 border border-gray-200 dark:border-amber-500/40 flex items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 bg-amber-50 dark:bg-gradient-to-t dark:from-amber-500/30 dark:to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <RiUserStarLine size={20} className="text-gray-500 dark:text-amber-500 z-10 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
        </div>
        {/* Online indicator */}
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#050505] shadow-sm" />
      </div>
      {/* Decorative lines below avatar */}
      <div className="flex flex-col items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-16 h-1.5 bg-gray-300 dark:bg-white/20 rounded-full" />
        <div className="w-10 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full" />
      </div>
    </div>
  </div>
);

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
    "github",
    "githubUrl",
    "repo",
    "repository",
    "features",
    "featureHighlights",
    "keyFeatures",
    "metrics",
    "impact",
    "results",
    "role",
    "category",
    "timeline",
    "duration",
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

  const buildProjectBentoItems = (project) => {
    if (!project) return [];

    const featuresList =
      project.featureHighlights || project.features || project.keyFeatures || [];
      
    let featuresNode;
    if (Array.isArray(featuresList) && featuresList.length > 0) {
      featuresNode = (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2">
          {featuresList.filter(f => typeof f === 'string' && f.trim()).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
              <span className="text-blue-500 mt-0.5 flex-shrink-0">✦</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      );
    } else if (typeof featuresList === "string") {
      featuresNode = <p className="text-gray-600 dark:text-gray-400 mt-1">{featuresList}</p>;
    } else {
      featuresNode = <p className="text-gray-600 dark:text-gray-400 mt-1">Personalized workflows and polished UI interactions.</p>;
    }

    const stack = Array.isArray(project.techStack)
      ? project.techStack.filter(Boolean)
      : typeof project.techStack === "string" ? project.techStack.split(",").map(s => s.trim()) : [];
      
    let stackNode;
    if (stack.length > 0) {
      stackNode = (
        <div className="flex flex-wrap gap-2 mt-2">
          {stack.map((t, i) => (
            <span key={i} className="px-2.5 py-1 bg-gray-100 dark:bg-[#151515] text-gray-800 dark:text-gray-200 rounded-md text-xs font-medium border border-gray-200 dark:border-white/5 shadow-sm">
              {t}
            </span>
          ))}
        </div>
      );
    } else {
      stackNode = <p className="text-gray-600 dark:text-gray-400 mt-1">React • Firebase • Tailwind</p>;
    }

    const metrics =
      (typeof project.metrics === "string" && project.metrics) ||
      (typeof project.impact === "string" && project.impact) ||
      (typeof project.results === "string" && project.results) ||
      "Stable performance and production-friendly architecture.";

    const role =
      (typeof project.role === "string" && project.role) ||
      (typeof project.category === "string" && project.category) ||
      "Full-stack development";

    const timeframe =
      (typeof project.duration === "string" && project.duration) ||
      (typeof project.timeline === "string" && project.timeline) ||
      "Ongoing iteration";

    return [
      {
        title: "Feature Highlights",
        value: featuresNode,
        illustration: <FeatureIllustration />,
        className: "sm:col-span-2"
      },
      {
        title: "Tech Stack",
        value: stackNode,
        illustration: <TechIllustration />,
        className: "sm:col-span-1"
      },
      {
        title: "Role & Scope",
        value: <p className="text-gray-600 dark:text-gray-400 mt-1">{role} • {timeframe}</p>,
        illustration: <RoleIllustration />,
        className: "sm:col-span-1"
      },
      {
        title: "Impact",
        value: <p className="text-gray-600 dark:text-gray-400 mt-1">{metrics}</p>,
        illustration: <ImpactIllustration />,
        className: "sm:col-span-2"
      },
    ];
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

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedProject(null)}
        >
          {(() => {
            const githubUrl = resolveFirstUrl(selectedProject, [
              "github",
              "githubUrl",
              "repo",
              "repository",
            ]);
            const liveDemoUrl = resolveFirstUrl(selectedProject, ["liveDemo"]);
            const bentoItems = buildProjectBentoItems(selectedProject);

            return (
          <div
            className="w-full max-w-5xl max-h-[75vh] flex flex-col relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-[#1F1F1F] dark:bg-[#0A0A0A]"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute z-50 right-4 top-4 rounded-full bg-white/80 p-2 text-gray-700 shadow-sm backdrop-blur-md transition hover:bg-white hover:text-gray-900 dark:bg-[#0A0A0A]/80 dark:text-gray-300 dark:hover:bg-[#111111] dark:hover:text-white border border-gray-200 dark:border-white/10"
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

                <div className="mt-6 border-t border-gray-200 pt-6 dark:border-[#1F1F1F]">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Project Feature Grid
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-200 dark:bg-[#2A2A2A] rounded-xl overflow-hidden border border-gray-200 dark:border-[#2A2A2A]">
                    {bentoItems.map((item) => (
                      <div
                        key={item.title}
                        className={`group flex flex-col bg-white dark:bg-[#070707] p-5 transition-all duration-300 hover:bg-gray-50/50 dark:hover:bg-[#0A0A0A] ${item.className || ""}`}
                      >
                        <div className="mb-5 overflow-hidden rounded-lg">
                          {item.illustration}
                        </div>
                        <div className="mt-auto">
                          <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                            {item.title}
                          </p>
                          <div className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default Projects;