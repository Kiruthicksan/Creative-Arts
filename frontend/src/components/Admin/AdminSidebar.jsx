import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/useAuthStore";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin-dashboard" },
    { icon: Users, label: "Users", path: "/admin-users" },
    { icon: ShoppingBag, label: "Products", path: "/admin-products" },
    { icon: Settings, label: "Settings", path: "/admin-settings" },
  ];

  const {logout} = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm">
      {/* Brand Logo */}
      <div className="h-20 flex items-center px-8 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-lg">
            C
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            CreativeArts
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Menu
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
              <item.icon
                size={22}
                className={`transition-colors ${
                  isActive
                    ? "text-indigo-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-50">
        <button className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors" onClick={handleLogout}>
          <LogOut size={22} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 bg-white z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 pointer-events-auto"
            >
              <SidebarContent />
              <button
                onClick={toggleSidebar}
                className="absolute top-6 right-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
