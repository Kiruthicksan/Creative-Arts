import graphicDesign from "../../../assets/GraphicDesign.svg";
import illustrations from "../../../assets/Illustrations.svg";
import digitalArt from "../../../assets/Posters.svg";
import ebooks from "../../../assets/ShortNovels.svg";
import templates from "../../../assets/Templates.svg";
import uiKits from "../../../assets/ConceptArt.svg";
import useAssetsStore from "../../../store/useAssetsStore";
import BrowsCategoriesCard from "./BrowsCategoriesCard";
import {
  LayoutGrid,
  Coffee,
  Rocket,
  Wand2,
  Ghost,
  MoreHorizontal,
} from "lucide-react";

const BrowseCategories = () => {
  const { assets } = useAssetsStore();
  const categories = [
    {
      name: "All",
      count: assets.length + 1240,
      color: "#F3E8FF", // Light Purple
      iconColor: "#A855F7", // Purple
      icon: <LayoutGrid size={24} />,
      path: "/graphics",
    },
    {
      name: "Cozy",
      count: assets.filter((asset) => asset.category === "Cozy").length + 856,
      color: "#FCE7F3", // Light Pink
      iconColor: "#EC4899", // Pink
      icon: <Coffee size={24} />,
      path: "/cozy",
    },
    {
      name: "Sci-fi",
      count:
        assets.filter((asset) => asset.category === "Sci-fi").length + 2100,
      color: "#EFF6FF", // Light Blue
      iconColor: "#3B82F6", // Blue
      icon: <Rocket size={24} />,
      path: "/sci-fi",
    },
    {
      name: "Fantasy",
      count:
        assets.filter((asset) => asset.category === "Fantasy").length + 1890,
      color: "#FFF7ED", // Light Orange
      iconColor: "#F97316", // Orange
      icon: <Wand2 size={24} />,
      path: "/fantasy",
    },
    {
      name: "Horror",
      count: assets.filter((asset) => asset.category === "Horror").length + 720,
      color: "#ECFDF5", // Light Green
      iconColor: "#10B981", // Green
      icon: <Ghost size={24} />,
      path: "/horror",
    },
    {
      name: "Others",
      count:
        assets.filter((asset) => asset.category === "Others").length + 1450,
      color: "#EEF2FF", // Light Indigo
      iconColor: "#6366F1", // Indigo
      icon: <MoreHorizontal size={24} />,
      path: "/others",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20 mb-20 px-4">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">
        Browse Categories
      </h2>
      <p className="text-gray-600 mb-8">Find exactly what you need</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <BrowsCategoriesCard
            key={category.name}
            name={category.name}
            count={category.count}
            color={category.color}
            iconColor={category.iconColor}
            icon={category.icon}
            path={category.path}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
