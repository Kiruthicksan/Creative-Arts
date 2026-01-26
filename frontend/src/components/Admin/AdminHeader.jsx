import { Bell, Search, Menu, ChevronDown, User } from "lucide-react";

const AdminHeader = ({ toggleSidebar }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-100 focus-within:border-indigo-200 focus-within:ring-2 focus-within:ring-indigo-50 transition-all w-96">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400 text-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell size={22} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

          <button className="flex items-center gap-3 group p-1.5 hover:bg-gray-50 rounded-xl transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md ring-2 ring-white group-hover:ring-indigo-100 transition-all">
              <User size={18} />
            </div>
            <div className="hidden sm:block text-left mr-1">
              <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                Admin User
              </p>
              <p className="text-xs text-gray-400">admin@creative.arts</p>
            </div>
            <ChevronDown
              size={16}
              className="text-gray-400 group-hover:text-gray-600 hidden sm:block transition-colors"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
