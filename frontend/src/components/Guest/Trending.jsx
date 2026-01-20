import { TrendingUp } from "lucide-react";
import ProductCard from "./ProductCard";
import { productsData } from "../../data/mockData";

const Trending = () => {

  const trendingData = [...productsData].reverse();

  const trendingProducts = trendingData.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto mb-20 px-4">
      <p className="flex items-center gap-2 text-purple-600 mb-2">
        <TrendingUp className="w-5 h-5 text-purple-600 fill-purple-600 stroke-purple-600" />
        Hot Right Now
      </p>
      <h2 className="text-2xl font-bold mb-4">Trending This Week</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
