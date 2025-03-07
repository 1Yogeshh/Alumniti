import { motion } from "framer-motion";

export const Card = ({ title, description, illustration }) => {
  return (
    <div className="group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className=" bg-[#9792AB]/20
         shadow-md shadow-[#9792AB]/40 rounded-xl p-8 w-80 h-[460px] text-center transition-all duration-300 ease-in-out group-hover:shadow-xl absolute  pointer-events-none "
      >
        <img
          src={illustration}
          alt={title}
          className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
          {description}
        </p>
      </motion.div>
    </div>
  );
};
