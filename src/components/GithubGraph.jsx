import { GitHubCalendar } from "react-github-calendar"; 

const GithubGraph = () => {
  return (
    <div className="flex flex-col w-full gap-2 text-black p-4 md:p-8">
       <h1 className="text-lg text-gray-600 font-semibold">Github Activities</h1>
    
      <div className="border border-gray-200 rounded-md p-4 shadow-sm w-full flex justify-center items-center overflow-hidden">
        <div className="w-full overflow-x-auto flex justify-center">
          <GitHubCalendar 
            username="Shaurya01836" 
            blockSize={14} 
            blockMargin={4} 
            fontSize={15}
            colorScheme="light"
            style={{
              color: "#333",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GithubGraph;