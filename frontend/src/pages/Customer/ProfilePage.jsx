import useAuthStore from "../../store/useAuthStore";
import ProfileHeader from "../../components/Customer/ProfilePage/ProfileHeader";
import ProfileLeftSidebar from "../../components/Customer/ProfilePage/ProfileLeftSidebar";
import ProfileRightColumn from "../../components/Customer/ProfilePage/ProfileRightColumn";
import useOrderStore from "../../store/useOrderStore";
import { useEffect } from "react";

// Helper to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const { recentPurchases, getRecentPurchases } = useOrderStore();

  useEffect(() => {
    getRecentPurchases();
  }, []);

  // Loading state handling could be improved, but relying on auth guard for now
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-900">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="text-gray-400 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-gray-900 pb-20 pt-8 font-sans relative overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white via-white/60 to-transparent"></div>

      {/* Animated Blobs */}
      <div className="absolute top-20 right-[5%] w-[600px] h-[600px] bg-purple-200/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
      <div
        className="absolute top-40 left-[5%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] animate-pulse mix-blend-multiply"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Header Section */}
        <ProfileHeader user={user} logout={logout} />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sidebar Details */}
          <ProfileLeftSidebar user={user} formatDate={formatDate} />

          {/* Right Column: Recent Activity */}
          <ProfileRightColumn
            recentPurchases={recentPurchases}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
