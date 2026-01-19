import { productsData } from "../../data/mockData";
import { Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JumpBackIn = () => {
  const navigate = useNavigate();
  const recentItems = [
    {
      ...productsData[4],
      type: "Illustration",
      action: "Viewed 2h ago",
    },
    {
      ...productsData[5],
      type: "Poster",
      action: "Added to Cart",
    },
    {
      ...productsData[6],
      type: "Template",
      action: "You liked this",
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Jump Back In</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}
          >
            {/* Thumbnail */}
            <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-purple-600 font-medium mb-0.5">
                {item.type}
              </p>
              <h3 className="font-bold text-gray-900 text-sm truncate">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{item.action}</p>
            </div>

            {/* Action Arrow */}
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JumpBackIn;
