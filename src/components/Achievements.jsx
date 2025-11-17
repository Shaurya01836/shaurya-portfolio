import  { useState } from "react";
import { RiTrophyLine } from "@remixicon/react";

const achievementsData = [
  {
    title: "Dual Award Winner: PayPact",
    event: "MetaMask × HackQuest DevCook Global Hackathon",
    year: "2025",
    description:
      "Secured two awards: 🥇 1st Prize in Chain For Good and 🥉 3rd Prize in Cross-Chain Interoperability & Asset Movement.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCardClick = (imageUrl) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const cardBaseClass =
    "flex items-start gap-6 p-6 border border-gray-200 rounded-3xl shadow-sm transition-all duration-300";
  const cardInteractiveClass =
    "hover:shadow-sm cursor-pointer";

  return (
    <div className="flex flex-col items-center w-full px-8 py-20 gap-10 text-black">
      <h1 className="font-bold text-xl">Achievements</h1>

      <div className="w-full space-y-8">
        {achievementsData.map((achievement, index) => (
          <div
            key={index}
            className={`${cardBaseClass} ${
              achievement.imageUrl ? cardInteractiveClass : ""
            }`}
            onClick={() => handleCardClick(achievement.imageUrl)}
          >
            <div className="text-blue-500 bg-blue-50 p-3 rounded-full flex-shrink-0">
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {achievement.title}
                </h2>
                {achievement.prize && (
                  <span className="ml-4 flex-shrink-0 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {achievement.prize}
                  </span>
                )}
              </div>

              <p className="text-md font-semibold text-gray-500">
                {achievement.event} ({achievement.year})
              </p>
              <p className="mt-2 text-gray-600">{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-xl max-w-4xl w-auto transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 bg-white text-gray-700 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Achievement Certificate"
              className="rounded-md max-h-[80vh] w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;