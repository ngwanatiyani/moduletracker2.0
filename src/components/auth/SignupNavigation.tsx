
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const SignupNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      {/* Glass container with glow effect */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        {/* Glowing border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-2xl blur-sm opacity-75"></div>
        
        {/* Main navigation content */}
        <div className="relative bg-white/20 backdrop-blur-2xl rounded-2xl border border-white/30 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ModuleTracker
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base relative group"
              >
                Home
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link 
                to="/" 
                className="text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base relative group"
              >
                About
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link 
                to="/" 
                className="text-white/90 hover:text-white transition-all duration-300 text-sm lg:text-base relative group"
              >
                Contact
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white font-medium hover:from-blue-600/90 hover:to-indigo-700/90 transition-all duration-300 text-sm lg:text-base rounded-lg border border-white/20 shadow-lg hover:shadow-blue-500/25"
              >
                Login
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-white/90 hover:text-white transition-all duration-300 text-sm py-2 px-3 rounded-lg hover:bg-white/10"
                >
                  Home
                </Link>
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-white/90 hover:text-white transition-all duration-300 text-sm py-2 px-3 rounded-lg hover:bg-white/10"
                >
                  About
                </Link>
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-white/90 hover:text-white transition-all duration-300 text-sm py-2 px-3 rounded-lg hover:bg-white/10"
                >
                  Contact
                </Link>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="px-3 py-2 bg-gradient-to-r from-blue-500/80 to-indigo-600/80 backdrop-blur-sm text-white font-medium hover:from-blue-600/90 hover:to-indigo-700/90 transition-all duration-300 text-sm rounded-lg border border-white/20 text-center"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SignupNavigation;
