import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  Sparkles,
  Rocket,
  Ghost,
  Coffee,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import useAssetsStore from "../../store/useAssetsStore";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import toast from "react-hot-toast";

const CustomerDashboard = () => {
  const { user } = useAuthStore();
  const { assets, getAssets } = useAssetsStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  // --- 1. FILTERING LOGIC ---
  const cozyAssets = assets.filter(
    (a) =>
      a.category === "Cozy" ||
      a.tags?.includes("relaxing") ||
      a.title.toLowerCase().includes("cozy"),
  );
  const sciFiAssets = assets.filter(
    (a) =>
      a.category === "Sci-fi" ||
      a.tags?.includes("cyberpunk") ||
      a.title.toLowerCase().includes("sci"),
  );
  const fantasyAssets = assets.filter(
    (a) =>
      a.category === "Fantasy" ||
      a.tags?.includes("magic") ||
      a.title.toLowerCase().includes("fantasy"),
  );
  const horrorAssets = assets.filter(
    (a) =>
      a.category === "Horror" ||
      a.tags?.includes("dark") ||
      a.title.toLowerCase().includes("horror"),
  );

  // --- 2. HERO COMPONENT ---
  const HeroSection = () => {
    // Pick a random featured asset for the hero
    const featured = assets.find((a) => a.featured) || assets[0];

    if (!featured) return null;

    return (
      <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-12 group">
        <img
          src={featured.previewImages?.[0]?.secure_url}
          alt={featured.title}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" /> Featured Drop
            </span>
            <span className="text-gray-300 text-sm font-medium tracking-wide border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              {featured.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {featured.title}
          </h1>

          <p className="text-gray-200 text-lg mb-8 line-clamp-2 max-w-xl drop-shadow-md">
            {featured.description}
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/product/${featured._id}`)}
              className="bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
            >
              View Asset
            </button>
            <button
              onClick={() => {
                addToCart(featured._id);
                toast.success("Added to cart!");
              }}
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors shadow-lg active:scale-95"
            >
              ₹{featured.price}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- 3. CATEGORY ROW COMPONENT ---
  const CategoryRow = ({ title, icon: Icon, items, color, id }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        const scrollAmount = direction === "left" ? -300 : 300;
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    };

    if (items.length === 0) return null;

    return (
      <div id={id} className="mb-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${color} bg-opacity-15`}>
              <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-500 text-sm">
                {items.length} Assets Available
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x px-2 -mx-2"
        >
          {items.map((asset) => (
            <div
              key={asset._id}
              onClick={() => navigate(`/product/${asset._id}`)}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer snap-start group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100 relative">
                <img
                  src={asset.previewImages?.[0]?.secure_url}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-rose-500">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                      {asset.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{asset.author}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs font-bold text-gray-700">
                      {asset.rating || "New"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{asset.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(asset._id);
                      toast.success("Added to cart!");
                    }}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- 4. SUB-NAVIGATION (Sticky) ---
  const categories = [
    { id: "cozy", label: "Cozy Corner", icon: Coffee },
    { id: "scifi", label: "Sci-Fi & Cyber", icon: Rocket },
    { id: "fantasy", label: "Fantasy Realms", icon: Sparkles },
    { id: "horror", label: "Horror & Dark", icon: Ghost },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back, {user?.userName} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Ready to explore some new worlds today?
            </p>
          </div>
          {/* Simple Search */}
          <div className="relative hidden md:block w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search 'low poly trees'..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              onKeyDown={(e) =>
                e.key === "Enter" &&
                navigate(`/browse?search=${e.target.value}`)
              }
            />
          </div>
        </div>

        {/* Sticky Category Nav */}
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

        {/* Hero Banner */}
        <HeroSection />

        {/* Sections */}
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
                color="bg-emerald-500"
              />

              <CategoryRow
                id="scifi"
                title="Sci-Fi & Cyberpunk 🚀"
                items={sciFiAssets}
                icon={Rocket}
                color="bg-cyan-500"
              />

              <CategoryRow
                id="fantasy"
                title="Fantasy Realms 🏰"
                items={fantasyAssets}
                icon={Sparkles}
                color="bg-purple-500"
              />

              <CategoryRow
                id="horror"
                title="Horror & Dark Arts 👻"
                items={horrorAssets}
                icon={Ghost}
                color="bg-rose-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
