
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import Cards from "./Cards";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="px-8 py-20">Loading Projects...</div>;

  return (
    <div className="flex flex-col py-20 w-full px-8 gap-2 text-black dark:text-white">
      <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
        Recent Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
        {projects.map((project) => (
          <Cards
            key={project.id}
            title={project.title}
            description={project.description}
            techStack={project.techStack}
            liveDemo={project.liveDemo}
            image={project.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;