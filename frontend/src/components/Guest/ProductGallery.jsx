import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
        <img
          src={activeImage}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4">
          {product.featured && (
            <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
        </div>
        {product.discount > 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              -{product.discount}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}

      {/* Thumbnails */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-600"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex gap-4 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {product.previewImages?.map((image, index) => (
            <div
              key={index}
              className={`w-24 h-24 shrink-0 rounded-2xl overflow-hidden border-2 cursor-pointer p-0.5 snap-start transition-all duration-300 ${
                activeImage === image?.secure_url
                  ? "border-indigo-600 scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-100 hover:border-gray-200"
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
          className="p-2 rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-gray-600"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;
