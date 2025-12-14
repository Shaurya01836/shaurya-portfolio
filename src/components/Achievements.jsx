import { RiTrophyLine, RiExternalLinkLine } from "@remixicon/react";

const achievementsData = [
  {
    title: "Dual Award Winner: PayPact",
    event: "MetaMask × HackQuest DevCook Global Hackathon",
    year: "2025",
    description:
      "Secured two awards: 1st Prize in Chain For Good and 3rd Prize in Cross-Chain Interoperability & Asset Movement.",
    prize: "$833 Total",
    icon: <RiTrophyLine />,
    imageUrl: "https://via.placeholder.com/800x600.png?text=PayPact+Award",
  },
  {
    title: "6th Place, Earn Category",
    event: "EDU Chain Semester 3 Hackathon",
    year: "2025",
    description:
      "Cryptify secured 6th place among 9000+ participants and 150 shortlisted projects, recognized for innovation in decentralized finance.",
    prize: "$4000",
    icon: <RiTrophyLine />,
    imageUrl: "https://i.ibb.co/fGX7fKyf/1747907073510.jpg",
  },
  {
    title: "Top 4 Finalist",
    event: "Hack Quest 12-Hour Hackathon",
    year: "2025",
    description:
      "Recognized for the rapid development and presentation of the Cryptify platform.",
    prize: "2000rs",
    icon: <RiTrophyLine />,
    imageUrl: "https://i.ibb.co/FNymBKD/1740218222309.jpg",
  },
  {
    title: "Category Winner, Health Track",
    event: "Cosmo Cloud Hackathon",
    year: "2024",
    description:
      "Awarded for AyurHerb, a virtual herbal garden with chatbot support and MongoDB integration.",
    prize: "$50",
    icon: <RiTrophyLine />,
    imageUrl: "https://i.ibb.co/Kx00stvw/LOWCODE-ERS.png",
  },
  {
    title: "2nd Place",
    event: "TEK Connect",
    year: "2024",
    description:
      "Secured a top position among 50+ teams for the AyurHerb project.",
    icon: <RiTrophyLine />,
    imageUrl: "https://i.ibb.co/LXSWfXcJ/IMG20241025175647.jpg",
  },
];

const Achievements = () => {
  const cardBaseClass =
    "flex items-start gap-6 p-6 border-b border-dashed border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 relative group bg-white dark:bg-[#0A0A0A] text-left w-full first:rounded-t-md last:rounded-b-md last:border-b-0";
  const cardInteractiveClass =
    "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#161b22]";

  return (
    <div className="flex flex-col w-full px-8 pb-10 gap-2 text-black dark:text-white">
      <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">Achievements</h1>

      <div className="w-full border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-md shadow-sm">
        {achievementsData.map((achievement, index) => {
       
          const CardTag = achievement.imageUrl ? "a" : "div";
          const cardProps = achievement.imageUrl
            ? {
                href: achievement.imageUrl,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <CardTag
              key={index}
              {...cardProps}
              className={`${cardBaseClass} ${
                achievement.imageUrl ? cardInteractiveClass : ""
              }`}
            >
              <div className="text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex-shrink-0 ">
                {achievement.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white pr-2">
                    {achievement.title}
                  </h2>

                  <div className="flex items-center gap-3">
                    {achievement.prize && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {achievement.prize}
                      </span>
                    )}

                 
                    {achievement.imageUrl && (
                      <div className="text-gray-400">
                        <RiExternalLinkLine size={20} />
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-md font-semibold text-gray-500 dark:text-gray-400">
                  {achievement.event} ({achievement.year})
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </CardTag>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;