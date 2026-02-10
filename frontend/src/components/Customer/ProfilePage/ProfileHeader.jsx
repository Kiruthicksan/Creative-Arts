import { motion } from "framer-motion";
import { User, Shield, Mail, Edit, LogOut } from "lucide-react";

const ProfileHeader = ({ user, logout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white shadow-xl shadow-purple-900/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 bg-clip-text text-transparent">
                {user.userName.charAt(0).toUpperCase() +
                  user.userName.slice(1) || "Guest User"}
              </span>
            </h1>
            <p className="text-gray-500 text-base md:text-lg flex items-center gap-2 mt-2 font-medium">
              <span className="p-1.5 bg-gray-100 rounded-full text-gray-600">
                <Mail size={14} />
              </span>{" "}
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm border border-gray-200 hover:shadow-md active:scale-95 cursor-pointer group hover:-translate-y-0.5">
            <Edit
              size={18}
              className="text-gray-400 group-hover:text-purple-600 transition-colors"
            />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={logout}
            className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-100 flex items-center justify-center gap-2 active:scale-95 cursor-pointer hover:shadow-sm hover:border-red-200"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
