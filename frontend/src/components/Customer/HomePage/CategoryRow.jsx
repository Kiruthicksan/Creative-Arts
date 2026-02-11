import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";

const CategoryRow = ({
  title,
  icon: Icon,
  items,
  color,
  id,
  navigate,
  addToCart,
  isInCart,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <div id={id} className="mb-16 scroll-mt-24">
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${color} bg-opacity-15`}>
            <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-500 text-sm">
              {items.length} Assets Available
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-2 -mx-2"
      >
        {items.map((asset) => (
          <div
            key={asset._id}
            onClick={() => navigate(`/product/${asset._id}`)}
            className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer snap-start group"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100 relative">
              <img
                src={asset.previewImages?.[0]?.secure_url}
                alt={asset.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-rose-500">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                    {asset.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{asset.author}</p>
                </div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold text-gray-700">
                    {asset.rating || "New"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ₹{asset.price}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(asset._id);
                  }}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {isInCart(asset._id) ? "In Cart" : "Add"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
