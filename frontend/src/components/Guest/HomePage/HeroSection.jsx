import { ArrowRight, Zap, Star, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] overflow-hidden bg-gray-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center space-y-8 max-w-5xl px-4 pt-10 pb-20"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Zap className="w-3.5 h-3.5 fill-purple-600" />
            Over 10,000+ premium assets
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight text-gray-900 tracking-tight"
        >
          Discover Premium <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent relative">
            Digital Creations
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-purple-200 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="opacity-60"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          The ultimate marketplace for stunning graphics, UI kits,
          illustrations, eBooks, and digital art. Crafted by top-tier artists
          for your next masterpiece.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => navigate("/browse")}
            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl active:scale-95"
          >
            Explore Products
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow active:scale-95">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            View Top Rated
          </button>
        </motion.div>

        {/* Stats / Social Proof */}
        <motion.div
          variants={itemVariants}
          className="pt-12 flex items-center justify-center gap-8 md:gap-16 border-t border-gray-100 mt-12 max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-gray-900">50K+</span>
            <span className="text-sm text-gray-500 font-medium">
              Happy Customers
            </span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-gray-900">10K+</span>
            <span className="text-sm text-gray-500 font-medium">
              Curated Products
            </span>
          </div>
          <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-gray-900">4.9/5</span>
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">Ratings</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
