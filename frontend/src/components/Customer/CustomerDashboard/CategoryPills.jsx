import { useNavigate } from "react-router-dom";
import { Box, Type, Image, Layout, Layers, Star } from "lucide-react";

const CategoryPills = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "All", icon: Star, path: "/browse" },
    { name: "Illustrations", icon: Box, path: "/illustrations" },
    { name: "Graphic Design", icon: Image, path: "/graphics" },
    { name: "Short Novels", icon: Type, path: "/ebooks" },
    { name: "Posters", icon: Layout, path: "/posters" },
    { name: "Concept Art", icon: Layers, path: "/concept-art" },
    { name: "Others", icon: Layers, path: "/others" },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => navigate(cat.path)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-all whitespace-nowrap active:scale-95 shadow-sm"
        >
          <cat.icon className="w-4 h-4" />
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
