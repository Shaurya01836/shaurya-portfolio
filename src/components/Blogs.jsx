import { useEffect, useState } from "react";
import Cards from "./Cards";
import { RiArticleLine } from "@remixicon/react"; 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const LOCAL_API = import.meta.env.VITE_API_LOCAL;
  const PROD_API = import.meta.env.VITE_API_PROD;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
      
        console.log("Attempting Local Fetch...");
        const response = await fetch(`${LOCAL_API}/api/blogs`);
        
        if (!response.ok) throw new Error("Local fetch failed");
        
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
        console.log("Loaded from: Localhost");

      } catch (localErr) {
       
        console.warn("Switching to Production...", localErr);
        
        try {
          const prodResponse = await fetch(`${PROD_API}/api/blogs`);
          
          if (!prodResponse.ok) throw new Error("Production fetch failed");

          const data = await prodResponse.json();
          setBlogs(data);
          setLoading(false);
          console.log("Loaded from: Render");

        } catch (prodErr) {
          console.error(prodErr);
          setError("Unable to connect to Blog Server.");
          setLoading(false);
        }
      }
    };

    fetchBlogs();
  }, [LOCAL_API, PROD_API]);

  if (loading) {
    return (
      <div className="p-8 text-gray-600 dark:text-gray-400">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div
      id="blogs"
      className="flex flex-col py-24 w-full px-8 gap-2 text-black dark:text-white transition-colors duration-300"
    >
     
      {blogs.length === 0 ? (
        
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md bg-gray-50/50 dark:bg-[#161b22]/50 animate-fade-in-up">
          <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded-full mb-4">
            <RiArticleLine
              size={48}
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No Blogs Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            I haven't published any articles just yet. Check back soon for
            updates, tutorials, and technical deep dives!
          </p>
        </div>
      ) : (
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
             <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
        Latest Blogs
      </h1>
          {blogs.map((blog) => (
            <Cards
              key={blog.id}
              title={blog.title}
              description={
                blog.content.length > 100
                  ? blog.content.substring(0, 100) + "..."
                  : blog.content
              }
              techStack={[blog.category]}
              image={
                blog.thumbnailUrl ||
                "https://via.placeholder.com/600x400?text=No+Image"
              }
              to={`/blogs/${blog.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;