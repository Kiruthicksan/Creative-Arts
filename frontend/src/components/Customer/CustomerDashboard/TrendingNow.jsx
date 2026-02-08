import ProductCard from "../../Guest/ProductCard";
import useAssetsStore from "../../../store/useAssetsStore";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrendingNow = () => {
  const { assets, loading } = useAssetsStore();
  const trendingProducts = assets.slice(0, 4);
  const navigate = useNavigate();

  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Explore Products</h2>
          <p className="text-gray-500 mt-1">
            Customers are loving these right now
          </p>
        </div>
        <button
          className="text-purple-600 font-semibold text-sm hover:text-purple-700 hover:underline flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/browse")}
        >
          View All <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {trendingProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className="group cursor-pointer flex flex-col gap-3"
          >
            {/* Thumbnail */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
              <img
                src={product.previewImages?.[0]?.secure_url}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <button className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm text-gray-900 hover:text-purple-600">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight line-clamp-1 group-hover:text-purple-600 transition-colors">
                  {product.title}
                </h3>
                <span className="font-bold text-sm text-gray-900 ml-2">
                  ₹{product.price}
                </span>
              </div>
              <p className="text-xs text-gray-500">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNow;
