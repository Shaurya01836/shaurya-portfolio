import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { RiTrophyLine, RiExternalLinkLine } from "@remixicon/react";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // Fetching and ordering by year descending
        const q = query(collection(db, "achievements"), orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const cardBaseClass =
    "flex items-start gap-6 p-6 border-b border-solid border-gray-200 dark:border-[#1F1F1F] shadow-sm transition-all duration-300 relative group bg-white dark:bg-[#0A0A0A] text-left w-full first:rounded-t-md last:rounded-b-md last:border-b-0";
  const cardInteractiveClass =
    "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#161b22]";

  if (loading) return <div className="px-8 pb-10">Loading Achievements...</div>;

  return (
    <div className="flex flex-col w-full px-8 pb-10 gap-2 text-black dark:text-white">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
          Achievements
        </h1>
        <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
      </div>

      <div className="w-full border-2 border-solid border-gray-200 dark:border-[#1F1F1F] rounded-md shadow-sm">
        {achievements.map((achievement) => {
          const CardTag = achievement.imageUrl ? "a" : "div";
          const cardProps = achievement.imageUrl
            ? { href: achievement.imageUrl, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <CardTag
              key={achievement.id}
              {...cardProps}
              className={`${cardBaseClass} ${achievement.imageUrl ? cardInteractiveClass : ""}`}
            >
              <div className="text-gray-800 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex-shrink-0 ">
                <RiTrophyLine />
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