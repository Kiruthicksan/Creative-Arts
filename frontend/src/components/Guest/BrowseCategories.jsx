import BrowsCategoriesCard from "./BrowsCategoriesCard";
import graphicDesign from "../../assets/graphicDesign.svg";
import illustrations from "../../assets/Illustrator.svg";
import digitalArt from "../../assets/DigitalArt.svg";
import ebooks from "../../assets/ebook.svg";
import templates from "../../assets/templates.svg";
import uiKits from "../../assets/UiKits.svg";

const BrowseCategories = () => {
  const categories = [
    {
      name: "Graphic Design",
      count: 1240,
      color: "#F3E8FF", // Light Purple
      iconColor: "#A855F7", // Purple
      image: graphicDesign,
    },
    {
      name: "UI Kits",
      count: 856,
      color: "#FCE7F3", // Light Pink
      iconColor: "#EC4899", // Pink
      image: uiKits,
    },
    {
      name: "Illustrations",
      count: 2100,
      color: "#EFF6FF", // Light Blue
      iconColor: "#3B82F6", // Blue
      image: illustrations,
    },
    {
      name: "Digital Art",
      count: 1890,
      color: "#FFF7ED", // Light Orange
      iconColor: "#F97316", // Orange
      image: digitalArt,
    },
    {
      name: "eBooks & Stories",
      count: 720,
      color: "#ECFDF5", // Light Green
      iconColor: "#10B981", // Green
      image: ebooks,
    },
    {
      name: "Templates",
      count: 1450,
      color: "#EEF2FF", // Light Indigo
      iconColor: "#6366F1", // Indigo
      image: templates,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
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
          />
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
