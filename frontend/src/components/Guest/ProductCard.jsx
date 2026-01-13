import { Star, Download, ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";

const ProductCard = ({
  image ,
  title ,
  author ,
  description ,
  rating ,
  reviews ,
  downloads ,
  price ,
  originalPrice ,
  discount ,
  featured ,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl cursor-pointer overflow-hidden group flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Badges & Actions */}
        <div className="absolute inset-0 p-3 flex justify-between items-start pointer-events-none">
          {/* Left: Badges */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            {featured && (
              <span className="bg-white/90 backdrop-blur-md text-purple-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm border border-white/50">
                Featured
              </span>
            )}
            {discount > 0 && (
              <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full w-fit shadow-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Right: Wishlist Button */}
          <button className="bg-white/80 backdrop-blur-md hover:bg-white p-1.5 rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors pointer-events-auto group/heart">
            <Heart className="w-4 h-4 group-hover/heart:fill-red-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Author */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100 shadow-inner">
            <img
              src={`https://ui-avatars.com/api/?name=${author}&background=random`}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[11px] font-medium text-gray-500 hover:text-gray-900 transition-colors">
            by <span className="font-bold text-gray-700">{author}</span>
          </span>
        </div>

        {/* Title & Desc */}
        <div className="mb-3">
          <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed h-9">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 mt-auto bg-gray-50 rounded-lg p-2">
          <div className="flex items-center gap-1 min-w-[50px]">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-gray-900">{rating}</span>
            <span className="text-[10px] text-gray-400">({reviews})</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium">{downloads}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium">Price</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-gray-900">₹{price}</span>
              {originalPrice && (
                <span className="text-xs font-medium text-gray-400 line-through decoration-gray-300">
                  ₹{originalPrice}
                </span>
              )}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg flex items-center gap-1.5 text-xs font-bold shadow-lg shadow-purple-200 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
