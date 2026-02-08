import { useNavigate } from "react-router-dom";
import { Clock, ArrowRight, ShoppingBag } from "lucide-react";
import useOrderStore from "../../../store/useOrderStore";
import { useEffect } from "react";

const JumpBackIn = () => {
  const navigate = useNavigate();
  const { orders: recentItems, getRecentPurchases, loading } = useOrderStore();

  useEffect(() => {
    getRecentPurchases();
  }, []);

  if (loading) return null;
  if (!recentItems || recentItems.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Jump Back In</h2>
        </div>
        <button
          onClick={() => navigate("/library")}
          className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
        >
          View all history
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentItems.slice(0, 3).map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/product/${item._id}`)}
            className="group relative bg-white border border-gray-100 p-3 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="flex items-center gap-4">
              {/* Thumbnail */}
              <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
                <img
                  src={item.previewImages?.[0]?.secure_url || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-bold text-purple-600 uppercase tracking-wide">
                    {item.category || "Asset"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                  <span>Purchased recently</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JumpBackIn;
