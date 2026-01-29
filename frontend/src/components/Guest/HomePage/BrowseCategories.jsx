
import graphicDesign from "../../../assets/GraphicDesign.svg";
import illustrations from "../../../assets/Illustrations.svg";
import digitalArt from "../../../assets/Posters.svg";
import ebooks from "../../../assets/ShortNovels.svg";
import templates from "../../../assets/Templates.svg";
import uiKits from "../../../assets/ConceptArt.svg";
import useAssetsStore from "../../../store/useAssetsStore";
import BrowsCategoriesCard from "./BrowsCategoriesCard";

const BrowseCategories = () => {
  const { assets } = useAssetsStore();
  const categories = [
    {
      name: "Graphic Design",
      count: assets.filter((asset) => asset.category === "Graphic Design").length + 1240,
      color: "#F3E8FF", // Light Purple
      iconColor: "#A855F7", // Purple
      image: graphicDesign,
      path: "/graphics",
    },
    {
      name: "Concept Art",
      count: assets.filter((asset) => asset.category === "Concept Art").length + 856,
      color: "#FCE7F3", // Light Pink
      iconColor: "#EC4899", // Pink
      image: uiKits,
      path: "/concept-art",
    },
    {
      name: "Illustrations",
      count: assets.filter((asset) => asset.category === "Illustrations").length + 2100,
      color: "#EFF6FF", // Light Blue
      iconColor: "#3B82F6", // Blue
      image: illustrations,
      path: "/illustrations",
    },
    {
      name: "Posters",
      count: assets.filter((asset) => asset.category === "Posters").length + 1890,
      color: "#FFF7ED", // Light Orange
      iconColor: "#F97316", // Orange
      image: digitalArt,
      path: "/posters",
    },
    {
      name: "Short Novels",
      count: assets.filter((asset) => asset.category === "Short Novels").length + 720,
      color: "#ECFDF5", // Light Green
      iconColor: "#10B981", // Green
      image: ebooks,
      path: "/ebooks",
    },
    {
      name: "Others",
      count: assets.filter((asset) => asset.category === "Others").length + 1450,
      color: "#EEF2FF", // Light Indigo
      iconColor: "#6366F1", // Indigo
      image: templates,
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
            image={category.image}
            path={category.path}
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
