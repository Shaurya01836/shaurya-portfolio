

const Header = () => {
 

  return (
    <div className="relative flex items-center text-black dark:text-white p-4 md:p-8 md:pt-20">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center gap-4">
          <h1 className="text-lg text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wider">
            STPI Internship
          </h1>
          <div className="h-[1px] flex-grow bg-gray-100 dark:bg-[#1F1F1F]"></div>
        </div>
      
          <img
            src="https://i.ibb.co/PZt4m1GV/stpi.jpg"
            alt="Primary image"
            loading="lazy"
            className="w-full h-44 object-cover rounded-md"
          />
   
      </div>
    </div>
  );
};

export default Header;