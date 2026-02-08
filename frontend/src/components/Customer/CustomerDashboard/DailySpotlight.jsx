import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAssetsStore from "../../../store/useAssetsStore";
import { useEffect, useMemo } from "react";

const DailySpotlight = () => {
  const { assets } = useAssetsStore();
  const navigate = useNavigate();

  // Pick a random featured product or the first one
  const spotlightProduct = useMemo(() => {
    if (!assets.length) return null;
    const featured = assets.filter((a) => a.featured);
    if (featured.length) {
      return featured[Math.floor(Math.random() * featured.length)];
    }
    return assets[0];
  }, [assets]);

  if (!spotlightProduct) return null;

  return (
    <div className="mb-12">
      <div className="relative w-full rounded-3xl overflow-hidden bg-gray-900 border border-white/10 shadow-xl h-[350px] md:h-[400px]">
        {/* Background Gradient & Effects */}
        <div className="absolute inset-0">
          <img
            src={spotlightProduct.previewImages?.[0]?.secure_url}
            alt="Background"
            className="w-full h-full object-cover opacity-50 blur-xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center h-full px-8 md:px-12">
          {/* Content (Left) */}
          <div className="max-w-2xl space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-md border border-purple-500/30 text-purple-200 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Editor's Pick</span>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-3"
              >
                {spotlightProduct.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base text-gray-300 max-w-lg line-clamp-2"
              >
                {spotlightProduct.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => navigate(`/product/${spotlightProduct._id}`)}
                className="group px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-1.5 text-white/80 text-sm font-medium bg-black/20 px-4 py-3 rounded-xl backdrop-blur-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{spotlightProduct.rating}</span>
                <span className="text-white/40">|</span>
                <span>₹{spotlightProduct.price}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySpotlight;
