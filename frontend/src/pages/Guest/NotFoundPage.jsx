import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-sans selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] z-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Glitchy 404 Text */}
          <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] relative">
            <span className="relative inline-block">
              4
              <motion.span
                animate={{ opacity: [1, 0.5, 1, 1, 0.8, 1] }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 text-purple-500 mix-blend-screen translate-x-[2px]"
              >
                4
              </motion.span>
            </span>
            <span className="relative inline-block mx-4">
              0
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-xl rounded-full" />
            </span>
            <span className="relative inline-block">
              4
              <motion.span
                animate={{ opacity: [1, 0.5, 1, 1, 0.8, 1] }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "linear",
                }}
                className="absolute top-0 left-0 text-blue-500 mix-blend-screen -translate-x-[2px]"
              >
                4
              </motion.span>
            </span>
          </h1>

          <div className="space-y-6 mt-4">
            <h2 className="text-2xl md:text-4xl font-bold text-white/90 tracking-tight">
              Lost in the <span className="text-purple-400">Void</span>?
            </h2>
            <p className="text-white/50 max-w-lg mx-auto text-lg">
              The page you are looking for has drifted into deep space or never
              existed. Let's get you back to solid ground.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full overflow-hidden flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <Home size={18} />
                    Return Home
                  </span>
                </motion.button>
              </Link>

              <button
                onClick={() => navigate(-1)}
                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-colors flex items-center gap-2 backdrop-blur-md"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default NotFoundPage;
