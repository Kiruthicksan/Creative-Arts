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
    <div className="mb-20">
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/10 shadow-2xl">
        {/* Background Gradient & Effects */}
        <div className="absolute inset-0">
          <img
            src={spotlightProduct.previewImages?.[0]?.secure_url}
            alt="Background"
            className="w-full h-full object-cover opacity-40 blur-3xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-gray-900/80 to-purple-900/40" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 p-8 md:p-14">
          {/* Content (Left) */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-300 text-sm font-bold shadow-lg shadow-amber-900/20"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Daily Editor's Pick</span>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-4"
              >
                {spotlightProduct.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-300 max-w-xl leading-relaxed line-clamp-2"
              >
                {spotlightProduct.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <button
                onClick={() => navigate(`/product/${spotlightProduct._id}`)}
                className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center gap-3 overflow-hidden transition-all shadow-lg shadow-purple-500/30 active:scale-95"
              >
                <span className="relative z-10">Get This Asset</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-white font-semibold">
                  {spotlightProduct.rating}{" "}
                </span>
                <span>/ 5.0 Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Floating Card (Right) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.4,
            }}
            className="w-full md:w-[450px] aspect-[4/3] relative hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl transform translate-y-4" />
            <div
              className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group cursor-pointer"
              onClick={() => navigate(`/product/${spotlightProduct._id}`)}
            >
              <img
                src={spotlightProduct.previewImages?.[0]?.secure_url}
                alt={spotlightProduct.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay Content on Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-sm font-medium mb-1">
                      Created by
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      <span className="text-white font-bold">
                        {spotlightProduct.author}
                      </span>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    ₹{spotlightProduct.price}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DailySpotlight;
