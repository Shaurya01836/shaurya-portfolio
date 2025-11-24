import React from "react";

function Cards({
  title,
  description,
  techStack = [],
  liveDemo,
  image,
  className,
}) {
  return (
    <a
      href={liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className={`bg-white dark:bg-[#0A0A0A] text-black dark:text-gray-100 w-full rounded-md shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col hover:border-gray-300 dark:hover:border-gray-600 transition-all ${className}`}
    >
     
      <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-t-md overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={`${title} project screenshot`}
        />
      </div>

  
      <div className="flex flex-col flex-grow text-left p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm flex-grow leading-relaxed">{description}</p>
      </div>

    
      <div className="flex flex-wrap gap-2 p-4 pt-0">
        {techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-gray-200 dark:bg-gray-800 text-sm px-3 py-1 rounded-md text-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}

export default Cards;