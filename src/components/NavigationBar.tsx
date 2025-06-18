
import React from "react";
import { GraduationCap, Calculator, Menu, X, Home, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onLogout: () => void;
}

// This component is kept for backward compatibility but should be replaced with ScrollAdaptiveNav
const NavigationBar: React.FC<NavigationBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onLogout
}) => {
  console.warn('NavigationBar is deprecated. Use ScrollAdaptiveNav instead.');
  
  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 text-slate-800 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 animate-fade-in">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ModuleTracker</span>
            <div className="text-xs text-slate-500 hidden md:block">Academic Progress Dashboard</div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <div className="flex items-center space-x-2 text-blue-600 font-medium">
            <Calculator className="w-4 h-4" />
            <span>Dashboard</span>
          </div>
          <button 
            onClick={onLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
