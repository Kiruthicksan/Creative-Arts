import { Sparkles } from "lucide-react";

const HeroSection = ({ featured, navigate, addToCart }) => {
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

export default HeroSection;
