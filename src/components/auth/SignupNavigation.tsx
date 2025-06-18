
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const SignupNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white p-3 sm:p-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
          <span className="text-base sm:text-lg md:text-xl font-bold">ModuleTracker</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">Home</Link>
          <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">About</Link>
          <Link to="/" className="hover:text-yellow-400 transition-colors text-sm lg:text-base">Contact</Link>
          <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm lg:text-base">Login</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm md:hidden z-50">
          <div className="flex flex-col space-y-3 p-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">Home</Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">About</Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-yellow-400 transition-colors text-sm">Contact</Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-blue-400 font-medium hover:text-blue-300 transition-colors text-sm">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SignupNavigation;
