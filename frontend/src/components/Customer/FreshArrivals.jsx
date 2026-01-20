const FreshArrivals = () => {
  return (
    <div className="mb-20 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fresh Arrivals</h2>
          <p className="text-gray-500 mt-1">
            Explore our latest high-quality additions
          </p>
        </div>
        <button className="hidden md:block text-purple-600 font-semibold text-sm hover:text-purple-700 hover:underline">
          View All New Items →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Illustrations */}
        <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
            alt="Illustrations"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 border border-white/10">
              Art & Soul
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Illustrations
            </h3>
            <p className="text-gray-200 text-sm line-clamp-1 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Hand-crafted digital masterpieces
            </p>
            <div className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-xl">➔</span>
            </div>
          </div>
        </div>

        {/* Card 2: Posters */}
        <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1572099606223-6e29045d7de3?auto=format&fit=crop&q=80&w=800"
            alt="Posters"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-3 py-1 bg-indigo-500/20 backdrop-blur-md text-indigo-100 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 border border-indigo-400/30">
              Wall Decor
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">Posters</h3>
            <p className="text-gray-200 text-sm line-clamp-1 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Print-ready art for your space
            </p>
            <div className="w-10 h-10 rounded-full bg-white text-indigo-900 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-xl">➔</span>
            </div>
          </div>
        </div>

        {/* Card 3: Graphic Design */}
        <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1626785774573-4b7993125637?auto=format&fit=crop&q=80&w=800"
            alt="Graphic Design"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-pink-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-3 py-1 bg-rose-500/20 backdrop-blur-md text-rose-100 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 border border-rose-400/30">
              Agency Quality
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">
              Graphic Design
            </h3>
            <p className="text-gray-200 text-sm line-clamp-1 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Branding kits, logos, and ui
            </p>
            <div className="w-10 h-10 rounded-full bg-white text-rose-900 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-xl">➔</span>
            </div>
          </div>
        </div>

        {/* Card 4: Short Novels */}
        <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800"
            alt="Short Novels"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-teal-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 backdrop-blur-md text-emerald-100 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3 border border-emerald-400/30">
              Bestsellers
            </span>
            <h3 className="text-2xl font-bold text-white mb-1">Short Novels</h3>
            <p className="text-gray-200 text-sm line-clamp-1 mb-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              Captivating stories for your weekend
            </p>
            <div className="w-10 h-10 rounded-full bg-white text-emerald-900 flex items-center justify-center transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-xl">➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreshArrivals;
