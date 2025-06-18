
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
    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
    "backdrop-blur-xl bg-white/60 dark:bg-slate-900/60",
    "border-b border-white/20 shadow-lg shadow-black/5",
    "supports-[backdrop-filter]:bg-white/40 supports-[backdrop-filter]:dark:bg-slate-900/40",
    {
      "translate-y-0 opacity-100": isVisible,
      "-translate-y-full opacity-0": !isVisible,
      "bg-white/80 backdrop-blur-2xl shadow-xl border-slate-200/30": scrollY > 50,
      "bg-white/40 backdrop-blur-lg shadow-sm border-white/10": scrollY <= 50,
    }
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16 xl:h-18">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 lg:space-x-3 animate-fade-in">
            <div className="relative group">
              <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg xl:rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover:scale-105">
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg xl:rounded-xl blur-sm -z-10 group-hover:blur-md transition-all"></div>
            </div>
            <div className="hidden xs:block">
              <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ModuleTracker
              </span>
              <div className="text-xs text-slate-500 hidden lg:block xl:text-sm">
                Academic Progress Dashboard
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
            <Link 
              to="/" 
              className="group flex items-center space-x-1.5 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg text-slate-600 hover:text-blue-600 transition-all duration-300 hover:bg-white/60 backdrop-blur-sm"
            >
              <Home className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span className="text-xs lg:text-sm xl:text-base">Home</span>
            </Link>
            <div className="flex items-center space-x-1.5 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 text-blue-600 font-medium bg-blue-50/60 backdrop-blur-sm rounded-lg border border-blue-200/30">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-xs lg:text-sm xl:text-base">Dashboard</span>
            </div>
            <button 
              onClick={onLogout}
              className="group px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm text-xs lg:text-sm xl:text-base hover:scale-105"
            >
              <LogOut className="w-3 h-3 lg:w-4 lg:h-4 inline mr-1 lg:mr-2" />
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 lg:p-2 rounded-lg hover:bg-white/60 transition-all duration-300 backdrop-blur-sm group"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle mobile menu"
          >
            {sidebarOpen ? 
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-90" /> : 
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            }
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ScrollAdaptiveNav;
