import { ArrowUpRight, BookOpen, Lightbulb, TrendingUp } from "lucide-react";

const CreativeResources = () => {
  const resources = [
    {
      id: 1,
      category: "Design Tips",
      title: "The Ultimate Guide to Font Pairing in 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
      icon: Lightbulb,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      id: 2,
      category: "3D Mastery",
      title: "Beginner's Guide to Lighting Scenes in Blender",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      id: 3,
      category: "Business",
      title: "How to Price Your First Art Commission",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1558655146-a81d431d102e?auto=format&fit=crop&q=80&w=800",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Creative Insights
          </h2>
          <p className="text-gray-500 mt-1">
            Level up your skills with expert guides
          </p>
        </div>
        <button className="text-purple-600 font-semibold text-sm hover:text-purple-700 hover:underline">
          Visit Blog →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer flex flex-col gap-4"
          >
            {/* Image Container */}
            <div className="relative h-60 rounded-2xl overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold shadow-sm">
                <item.icon size={14} className={item.color} />
                <span className="text-gray-800">{item.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-2">
                <span>{item.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>Jan 18, 2026</span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors">
                {item.title}
              </h3>

              <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-gray-600 group-hover:text-purple-600 transition-colors">
                Read Article <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreativeResources;
