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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalContainer from "../Guest/ModalContainer";
import Register from "../Guest/Register";
import Login from "../Guest/Login";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";
import NavLinks from "./Navbar/NavLinks";
import MobileMenu from "./Navbar/MobileMenu";

const Navbar = () => {
  // local state for managing auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState("login");

  // local state for managing mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // local state for managing profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);

  // ref for profile dropdown
  const menuRef = useRef(null);

  const navigate = useNavigate(); // for navigation

  const { user } = useAuthStore(); // for user state

  // cart state
  const { cart } = useCartStore(); // for cart state

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

  // Todo - Add autoclose when clicking on the links

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
            <NavLinks />
          </div>

          {/* Right Side: Search, Icons, Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
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
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                        onClick={() => navigate("/library")}
                      >
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
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        openModal={openModal}
        user={user}
        navigate={navigate}
      />
    </>
  );
};

export default Navbar;
