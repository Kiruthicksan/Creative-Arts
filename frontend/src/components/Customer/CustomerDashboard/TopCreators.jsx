import { Plus, UserCheck } from "lucide-react";
import { useState } from "react";

const TopCreators = () => {
  const creators = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "3D Artist",
      followers: "12.5k",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      cover:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Typography Expert",
      followers: "8.2k",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      cover:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=600",
      isFollowing: true,
    },
    {
      id: 3,
      name: "Creative Labs",
      role: "Design Agency",
      followers: "45k",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
      cover:
       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
      isFollowing: false,
    },
    {
      id: 4,
      name: "Elena Fisher",
      role: "Novel Author",
      followers: "22k",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
      isFollowing: false,
    },
  ];

  return (
    <div className="mb-20">
      <div className="flex items-end justify-between mb-8 px-1">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Top Creators</h2>
          <p className="text-gray-500 mt-1">
            Follow the minds behind the masterpieces
          </p>
        </div>
        <button className="text-purple-600 font-semibold text-sm hover:text-purple-700 hover:underline">
          View All Artists →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
};

const CreatorCard = ({ creator }) => {
  const [following, setFollowing] = useState(creator.isFollowing);

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Cover Image */}
      <div className="h-24 bg-gray-100 relative overflow-hidden">
        <img
          src={creator.cover}
          alt="cover"
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="px-5 pb-5 relative">
        {/* Profile Image (Overlapping) */}
        <div className="-mt-10 mb-3 flex justify-between items-end">
          <div className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-md">
            <img
              src={creator.image}
              alt={creator.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setFollowing(!following)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border ${
              following
                ? "bg-green-50 text-green-600 border-green-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                : "bg-purple-600 text-white border-transparent hover:bg-purple-700 shadow-md hover:shadow-lg"
            }`}
          >
            {following ? <UserCheck size={18} /> : <Plus size={18} />}
          </button>
        </div>

        {/* Info */}
        <div>
          <h3 className="font-bold text-gray-900 text-lg leading-tight">
            {creator.name}
          </h3>
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-wider mt-1 mb-2">
            {creator.role}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium pt-3 border-t border-gray-100 mt-3">
            <span>{creator.followers} Followers</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span>48 Products</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCreators;
