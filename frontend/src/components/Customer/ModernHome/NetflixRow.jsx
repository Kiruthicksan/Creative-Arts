import React, { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NetflixRow = ({ title, products, isLarge = false }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const navigate = useNavigate();

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="h-full mb-10 pl-4 md:pl-12 group">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2">
        {title}
        <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Explore All &gt;
        </span>
      </h2>

      <div className="relative group/row">
        {/* Left Arrow */}
        <div
          className={`absolute top-0 bottom-0 left-0 bg-black/50 w-12 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </div>

        {/* The Scrolling Container */}
        <div
          ref={rowRef}
          className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide px-2 pb-4 scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className={`relative flex-shrink-0 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110 hover:z-50 group/card
                ${isLarge ? "h-[300px] w-[200px]" : "h-[160px] w-[280px]"}`}
            >
              <img
                src={product.previewImages?.[0]?.secure_url}
                alt={product.title}
                className="rounded-md object-cover w-full h-full"
              />

              {/* Card Hover Metadata */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity rounded-md flex flex-col justify-end p-4">
                <h3 className="text-white text-sm font-bold truncate">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                  <span className="flex items-center text-green-400 font-bold">
                    <Star className="w-3 h-3 fill-current mr-1" />{" "}
                    {product.rating || "New"}
                  </span>
                  <span>•</span>
                  <span>{product.category}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="bg-white text-black p-1.5 rounded-full hover:bg-gray-200">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                  <button className="border border-white/50 text-white p-1.5 rounded-full hover:border-white">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div
          className="absolute top-0 bottom-0 right-0 bg-black/50 w-12 z-40 flex items-center justify-center cursor-pointer opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          onClick={() => handleClick("right")}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default NetflixRow;
