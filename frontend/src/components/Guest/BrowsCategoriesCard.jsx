import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BrowsCategoriesCard = ({ name, count, color, iconColor, image, path }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.05, backgroundColor: color }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-300 cursor-pointer flex flex-col items-start gap-4 h-full group"
      onClick={() => navigate(path)}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-2 shadow-sm"
        style={{ backgroundColor: iconColor }}
      >
        <img
          src={image}
          alt={name}
          className="w-8 h-8 object-contain brightness-0 invert"
        />
      </div>
      <div className="relative w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 text-sm">
          {count.toLocaleString()} products
        </p>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-white rounded-full p-2 shadow-sm">
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </motion.div>
  );
};

export default BrowsCategoriesCard;
