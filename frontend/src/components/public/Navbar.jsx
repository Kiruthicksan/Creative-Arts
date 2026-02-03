import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  LogOut,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalContainer from "../Guest/ModalContainer";
import Register from "../Guest/Register";
import Login from "../Guest/Login";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";

const Navbar = () => {
  // local state for managing auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState("login");

  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  // local state for managing mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useAuthStore();

  // cart state
  const { cart } = useCartStore();

  // function to open auth modal
  const openModal = () => {
    setAuthModalView("login");
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 h-16 lg:h-20`}
      >
        <nav className="h-full flex justify-between items-center px-4 lg:px-8 max-w-7xl mx-auto">
          {/* Left Side: Logo & Navigation */}
          <div className="flex items-center gap-10">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Creative Arts
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/browse"
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Browse
              </Link>
              <Link
                to="/graphics"
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Graphics
              </Link>
              <Link
                to="/illustrations"
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Illustrations
              </Link>
              <Link
                to="/ebooks"
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                eBooks
              </Link>
            </div>
          </div>

          {/* Right Side: Search, Icons, Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <button className="text-gray-600 hover:text-purple-600 transition-colors relative group">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-purple-600 transition-colors relative">
                    <Link to="/cart">
                      <ShoppingCart className="w-5 h-5" />
                      <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                        {cart?.items?.length}
                      </span>
                    </Link>
                  </button>
                </>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    className="hidden md:flex items-center justify-center w-10 h-10 text-sm font-bold bg-[#7c3bed] hover:bg-[#7c3bed]/80 text-white transition-colors rounded-full border-none outline-none shadow-sm"
                    onClick={() => setProfileOpen((prev) => !prev)}
                  >
                    {user.userName.charAt(0).toUpperCase()}
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-gray-100 py-1 z-50">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors" onClick={() => navigate("/profile")}>
                        Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors" onClick={() => navigate("/library")}>
                        My Library
                      </button>
                      
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="hidden md:block px-4 py-2 text-sm font-semibold text-gray-600 bg-[#7c3bed] hover:bg-[#7c3bed]/80 text-white transition-colors rounded-lg border-none outline-none"
                  onClick={openModal}
                >
                  Sign In
                </button>
              )}

              {isAuthModalOpen && (
                <ModalContainer setIsAuthModalOpen={setIsAuthModalOpen}>
                  {authModalView === "login" ? (
                    <Login
                      onSwitchToRegister={() => setAuthModalView("register")}
                    />
                  ) : (
                    <Register
                      onSwitchToLogin={() => setAuthModalView("login")}
                    />
                  )}
                </ModalContainer>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
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
                    Browse Assets
                  </MobileNavLink>
                  <MobileNavLink
                    to="/graphics"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Graphics
                  </MobileNavLink>
                  <MobileNavLink
                    to="/illustrations"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Illustrations
                  </MobileNavLink>
                  <MobileNavLink
                    to="/ebooks"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    eBooks
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
                        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 font-medium flex items-center justify-between group transition-colors" onClick={() => navigate("/library")}>
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
    </>
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

export default Navbar;
