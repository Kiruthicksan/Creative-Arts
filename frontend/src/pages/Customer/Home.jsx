import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Sparkles, Rocket, Ghost, Coffee } from "lucide-react";
import useAssetsStore from "../../store/useAssetsStore";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";

import HeroSection from "../../components/Customer/HomePage/HeroSection";
import CategoryRow from "../../components/Customer/HomePage/CategoryRow";

/**
 * @component Home
 * @description The main landing page for authenticated customers.
 * It features a hero banner, category navigation, and scrollable rows of assets
 * organized by specific themes (Cozy, Sci-Fi, Fantasy, Horror).
 *
 * @returns {JSX.Element} The rendered Home page component.
 */
const Home = () => {
  // ---------------------------------------------------------------------------
  // State & Hooks
  // ---------------------------------------------------------------------------

  /** @type {{ user: object }} User authentication state */
  const { user } = useAuthStore();

  /**
   * @type {{ assets: Array, getAssets: Function }} Assets state management
   */
  const { assets, getAssets } = useAssetsStore();

  /**
   * @type {{ addToCart: Function, isInCart: Function }} Cart actions
   */
  const { addToCart, isInCart } = useCartStore();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  /**
   * Fetch assets on component mount.
   */
  useEffect(() => {
    getAssets();
  }, [getAssets]);

  // ---------------------------------------------------------------------------
  // Data Processing (Filtering)
  // ---------------------------------------------------------------------------

  /**
   * Helper function to filter assets by category or tags.
   * @param {string} category - The main category name to match.
   * @param {string[]} keywords - Array of keywords to search in tags or title.
   * @returns {Array} Filtered list of assets.
   */
  const filterAssets = (category, keywords) => {
    return assets.filter(
      (a) =>
        a.category === category ||
        keywords.some((kw) => a.tags?.includes(kw)) ||
        keywords.some((kw) => a.title.toLowerCase().includes(kw)),
    );
  };

  const cozyAssets = filterAssets("Cozy", ["relaxing", "cozy"]);
  const sciFiAssets = filterAssets("Sci-fi", ["cyberpunk", "sci"]);
  const fantasyAssets = filterAssets("Fantasy", ["magic", "fantasy"]);
  const horrorAssets = filterAssets("Horror", ["dark", "horror"]);

  /**
   * Determine the featured asset for the hero section.
   * Defaults to the first asset if no explicit 'featured' flag is found.
   */
  const featured = assets.find((a) => a.featured) || assets[0];

  // ---------------------------------------------------------------------------
  // Render Helpers
  // ---------------------------------------------------------------------------

  const categories = [
    { id: "cozy", label: "Cozy Corner", icon: Coffee },
    { id: "scifi", label: "Sci-Fi & Cyber", icon: Rocket },
    { id: "fantasy", label: "Fantasy Realms", icon: Sparkles },
    { id: "horror", label: "Horror & Dark", icon: Ghost },
  ];

  /**
   * Smooth scrolls to a specific section by ID.
   * @param {string} id - The HTML ID of the section to scroll to.
   */
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(id);
    }
  };

  /**
   * Handles search input keydown events.
   * @param {React.KeyboardEvent} e - The keyboard event.
   */
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/browse?search=${e.target.value}`);
    }
  };

  // Prevent render if critical data is missing (e.g., initial load pending)
  if (!featured && assets.length > 0) return null;

  // ---------------------------------------------------------------------------
  // Main Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* --- Header Section --- */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back, {user?.userName} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Ready to explore some new worlds today?
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative hidden md:block w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search 'low poly trees'..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* --- Sticky Category Navigation --- */}
        <div className="sticky top-20 z-30 bg-gray-50/95 backdrop-blur-sm py-4 mb-8 -mx-4 px-4 border-b border-gray-200 md:relative md:top-0 md:bg-transparent md:border-none md:p-0 md:m-0">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border
                      ${
                        activeTab === cat.id
                          ? "bg-gray-900 text-white border-gray-900 shadow-md"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50"
                      }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Hero Banner --- */}
        {featured && (
          <HeroSection
            featured={featured}
            navigate={navigate}
            addToCart={addToCart}
          />
        )}

        {/* --- Asset Category Sections --- */}
        <div className="space-y-4">
          {assets.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>Loading assets library...</p>
            </div>
          ) : (
            <>
              <CategoryRow
                id="cozy"
                title="The Cozy Corner 🌿"
                items={cozyAssets}
                icon={Coffee}
                color="bg-green-500"
                navigate={navigate}
                addToCart={addToCart}
                isInCart={isInCart}
              />

              <CategoryRow
                id="scifi"
                title="Sci-Fi & Cyberpunk 🚀"
                items={sciFiAssets}
                icon={Rocket}
                color="bg-cyan-500"
                navigate={navigate}
                addToCart={addToCart}
                isInCart={isInCart}
              />

              <CategoryRow
                id="fantasy"
                title="Fantasy Realms 🏰"
                items={fantasyAssets}
                icon={Sparkles}
                color="bg-purple-500"
                navigate={navigate}
                addToCart={addToCart}
                isInCart={isInCart}
              />

              <CategoryRow
                id="horror"
                title="Horror & Dark Arts 👻"
                items={horrorAssets}
                icon={Ghost}
                color="bg-rose-500"
                navigate={navigate}
                addToCart={addToCart}
                isInCart={isInCart}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
