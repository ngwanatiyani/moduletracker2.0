
import React, { useState, useEffect } from "react";
import { GraduationCap, Menu, X, Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";

interface ScrollAdaptiveNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

const ScrollAdaptiveNav: React.FC<ScrollAdaptiveNavProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onLogout
}) => {
  const scrollY = useScrollPosition();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (scrollY > lastScrollY && scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(scrollY);
  }, [scrollY, lastScrollY]);

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
    "backdrop-blur-xl bg-white/70 dark:bg-slate-900/70",
    "border-b border-white/20 shadow-lg shadow-black/5",
    {
      "translate-y-0": isVisible,
      "-translate-y-full": !isVisible,
      "bg-white/90 backdrop-blur-2xl shadow-xl": scrollY > 50,
    }
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="relative">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <GraduationCap className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl blur-sm -z-10"></div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ModuleTracker
              </span>
              <div className="text-xs text-slate-500 hidden lg:block">
                Academic Progress Dashboard
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link 
              to="/" 
              className="group flex items-center space-x-2 px-3 py-2 rounded-lg text-slate-600 hover:text-blue-600 transition-all duration-200 hover:bg-white/50"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm lg:text-base">Home</span>
            </Link>
            <div className="flex items-center space-x-2 px-3 py-2 text-blue-600 font-medium bg-blue-50/50 rounded-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm lg:text-base">Dashboard</span>
            </div>
            <button 
              onClick={onLogout}
              className="group px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg backdrop-blur-sm text-sm lg:text-base"
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-all duration-200 backdrop-blur-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle mobile menu"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ScrollAdaptiveNav;
