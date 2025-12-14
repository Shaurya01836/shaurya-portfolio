import BentoCard from "./BentoCard";

const Header = () => {
 

  return (
    <div className="relative flex items-center text-black dark:text-white p-4 md:p-8 md:py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full items-center">
        <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
          STPI Internship
        </h1>
        <BentoCard className="col-span-4 h-44 p-0">
          <img
            src="https://i.ibb.co/PZt4m1GV/stpi.jpg"
            alt="Primary image"
            className="w-full h-full object-cover rounded-md"
          />
        </BentoCard>
      </div>
    </div>
  );
};

export default Header;