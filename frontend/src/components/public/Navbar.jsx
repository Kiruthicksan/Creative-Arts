import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import ModalContainer from "../Guest/ModalContainer";
import Register from "../Guest/Register";
import Login from "../Guest/Login";


const Navbar = () => {

    // local state for managing auth modal
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const [authModalView, setAuthModalView] = useState("login")

    // local state for managing mobile menu
    const  [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // function to open auth modal
    const openModal = () => {
        setAuthModalView('login')
        setIsAuthModalOpen(true)
    }


  return (
    <div className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
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
            <button className="text-gray-600 hover:text-purple-600 transition-colors relative group">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-gray-600 hover:text-purple-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                0
              </span>
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="hidden md:block px-4 py-2 text-sm font-semibold text-gray-600 bg-[#7c3bed] hover:bg-[#7c3bed]/80   text-white transition-colors rounded-lg border-none" onClick={openModal}>
              Sign In
            </button>


            {isAuthModalOpen && (
                 <ModalContainer setIsAuthModalOpen={setIsAuthModalOpen} >
                    {authModalView === "login" ? <Login  onSwitchToRegister={() => setAuthModalView("register")} /> : <Register onSwitchToLogin={() => setAuthModalView("login")} />}
                 </ModalContainer>
            )}

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-1 text-gray-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="bg-white rounded-2xl w-[400px] relative overflow-hidden w-[450px]">
                        <div>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="absolute top-4 right-4"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
