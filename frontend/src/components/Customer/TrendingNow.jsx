
import ProductCard from "../Guest/ProductCard";
import useAssestsStore from "../../store/useAssestsStore";

const TrendingNow = () => {

  const { assests } = useAssestsStore();
  const trendingProducts = assests.slice(0, 4);



  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <p className="text-gray-500 mt-1">
            Customers are loving these right now
          </p>
        </div>
        <button className="text-purple-600 font-semibold text-sm hover:text-purple-700 hover:underline">
          View Best Sellers →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProducts.map((product) => (
          <ProductCard key={product._id} {...product} image={product.image?.[0]?.secure_url} />
        ))}

      </div>
    </div>
  );
};

export default TrendingNow;
