import { GitHubCalendar } from "react-github-calendar";

const GithubGraph = ({ darkMode }) => {
  return (
    <div className="flex flex-col w-full gap-2 text-black dark:text-white p-4 md:p-8">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Github Activities
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="border-2 border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md p-4  w-full flex justify-center items-center overflow-hidden bg-white dark:bg-transparent">
        <div className="w-full overflow-x-auto flex justify-center">
          <GitHubCalendar
            username="Shaurya01836"
            blockSize={14}
            blockMargin={4}
            fontSize={15}
            colorScheme={darkMode ? "dark" : "light"}
            style={{
              color: darkMode ? "#e6edf3" : "#333",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GithubGraph;