import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const ProductGallery = ({ product }) => {
  const scrollRef = useRef(null);
  const [activeImage, setActiveImage] = useState(
    product.previewImages?.[0]?.secure_url,
  );
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 120;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full lg:w-1/2 flex flex-col gap-6"
    >
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-purple-900/10 group border-4 border-white">
        <img
          src={activeImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-white/90 backdrop-blur text-pink-600 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-white/50">
              Featured
            </span>
          )}
        </div>
        {product.discount > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg ring-2 ring-white">
              -{product.discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="p-3 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-600"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex gap-4 overflow-x-auto pb-4 pt-2 px-1 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {product.previewImages?.map((image, index) => (
            <div
              key={index}
              className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer p-1 transition-all duration-300 ${
                activeImage === image?.secure_url
                  ? "border-purple-600 scale-105 shadow-lg shadow-purple-200"
                  : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              onClick={() => setActiveImage(image?.secure_url)}
            >
              <img
                src={image?.secure_url}
                alt={product.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="p-3 rounded-full border border-gray-100 bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-gray-600"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductGallery;
