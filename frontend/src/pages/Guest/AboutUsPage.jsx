import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Zap, Heart, Globe, ShieldCheck } from "lucide-react";

/**
 * AboutUsPage Component
 * A visually stunning page explaining the platform's mission to empower creators.
 */
const AboutUsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/10 to-transparent opacity-50" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-700" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">
              The CreativeArts Story
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50"
          >
            Fueling the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Next Generation
            </span>{" "}
            of Creators
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/60 leading-relaxed mb-16"
          >
            We are building the ultimate ecosystem for digital artists, game
            developers, and visionaries to share, discover, and collaborate on
            world-class assets.
          </motion.p>
        </motion.div>

        {/* Stats / Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 my-20"
        >
          {[
            { label: "Active Creators", value: "10K+", icon: Users },
            { label: "Assets Uploaded", value: "50K+", icon: Zap },
            { label: "Community Rating", value: "4.9/5", icon: Heart },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <stat.icon className="w-8 h-8 text-white/40 mb-4 group-hover:text-white transition-colors" />
              <h3 className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-white/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center my-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              More than just a <br />
              <span className="text-purple-400">Marketplace</span>
            </h2>
            <div className="space-y-6 text-lg text-white/60">
              <p>
                CreativeArts wasn't built just to sell files. It was born from a
                frustration with clunky, outdated platforms that didn't respect
                the artistry of the assets they hosted.
              </p>
              <p>
                We believe that the tools you use to build your dreams should be
                as inspiring as the dreams themselves. That's why we obsess over
                every pixel, every interaction, and every line of code.
              </p>
              <p>
                Whether you're an indie developer building your first game or a
                seasoned studio professional, we're here to provide the
                high-quality assets you need to ship faster and better.
              </p>
            </div>
          </motion.div>

          {/* Abstract Visual Representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full bg-gradient-to-tr from-purple-900/20 to-blue-900/20 rounded-[2rem] border border-white/10 overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
            {/* Animated Circles */}
            <div className="absolute w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute w-48 h-48 bg-blue-500/30 rounded-full blur-[60px] animate-pulse delay-700 translate-x-12 translate-y-12" />

            <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl max-w-xs transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500">
              <div className="h-40 w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
                <Globe className="w-12 h-12 text-white/50" />
              </div>
              <div className="h-4 w-3/4 bg-white/10 rounded-full mb-3" />
              <div className="h-3 w-1/2 bg-white/10 rounded-full" />
            </div>
            <div className="absolute z-0 right-10 bottom-10 bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl max-w-xs transform rotate-[6deg] hover:rotate-0 transition-transform duration-500">
              <div className="h-40 w-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-lg mb-4 flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-white/50" />
              </div>
              <div className="h-4 w-3/4 bg-white/10 rounded-full mb-3" />
              <div className="h-3 w-1/2 bg-white/10 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-32 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-16">
            Our Core <span className="text-blue-400">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality First",
                desc: "We curate every asset to ensure it meets high professional standards.",
              },
              {
                title: "Creator Centric",
                desc: "We build tools that empower creators to showcase their best work.",
              },
              {
                title: "Community Driven",
                desc: "We listen, adapt, and grow based on what our community needs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-xl font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
