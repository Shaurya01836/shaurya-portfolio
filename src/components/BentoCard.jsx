const BentoCard = ({ children, className }) => {
  return (
    <div
      className={`rounded-md border border-gray-200 dark:border-[#1F1F1F] flex flex-col items-center justify-center text-center ${className}`}
    >
      {children}
    </div>
  );
};

export default BentoCard;