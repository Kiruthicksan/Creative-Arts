import { AnimatePresence, motion } from "framer-motion";
import { X, Search, User, LayoutGrid, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  openModal,
  user,
  navigate,
}) => {
  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 lg:hidden flex flex-col border-l border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-serif font-bold text-xl text-gray-900">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
              {/* Search Mobile */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                />
              </div>

              {/* Navigation */}
              <div className="space-y-2 mb-8">
                <MobileNavLink
                  to="/browse"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse
                </MobileNavLink>
                <MobileNavLink
                  to="/sci-fi"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sci-Fi & Cyber
                </MobileNavLink>
                <MobileNavLink
                  to="/fantasy"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Fantasy
                </MobileNavLink>
                <MobileNavLink
                  to="/horror"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Horror
                </MobileNavLink>
              </div>

              {/* Auth Section for Mobile */}
              <div className="pt-6 border-t border-gray-100">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                        {user.userName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-gray-900 truncate">
                          {user.userName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          View Profile
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-between group transition-colors">
                        <span className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          Profile
                        </span>
                      </button>
                      <button
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-between group transition-colors"
                        onClick={() => navigate("/library")}
                      >
                        <span className="flex items-center gap-3">
                          <LayoutGrid className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          My Library
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500 mb-4 px-2">
                      Join our community to start downloading.
                    </p>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openModal();
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3.5 font-bold shadow-lg shadow-purple-200 active:scale-[0.98] transition-all"
                    >
                      Sign In / Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-600 font-medium hover:bg-purple-50 hover:text-purple-600 transition-all group"
  >
    <span>{children}</span>
    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
  </Link>
);

export default MobileMenu;
