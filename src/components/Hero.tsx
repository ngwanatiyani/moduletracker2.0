
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, TrendingUp, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Decorative background elements - inspired by the floating orbs in the images */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-40 right-20 w-6 h-6 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse delay-100 shadow-lg"></div>
        <div className="absolute bottom-40 left-20 w-10 h-10 md:w-20 md:h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse delay-200 shadow-lg"></div>
        <div className="absolute bottom-60 right-40 w-4 h-4 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300 shadow-lg"></div>
        <div className="absolute top-1/3 right-8 w-12 h-12 md:w-24 md:h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-70 animate-pulse delay-500 shadow-xl"></div>
        <div className="absolute bottom-1/3 left-12 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-50 animate-pulse delay-700 shadow-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
          <span className="text-lg md:text-xl font-bold text-white">ModuleTracker</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('hero')} className="text-white hover:text-yellow-400 transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="text-white hover:text-yellow-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('contact')} className="text-white hover:text-yellow-400 transition-colors">Contact</button>
          <Link to="/signup">
            <Button variant="outline" className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-sm md:hidden">
            <div className="flex flex-col space-y-4 p-6">
              <button onClick={() => scrollToSection('hero')} className="text-white hover:text-yellow-400 transition-colors text-left">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-yellow-400 transition-colors text-left">About</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-yellow-400 transition-colors text-left">Contact</button>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700 w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div id="hero" className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Your Academic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Success Hub
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
              Track progress, improve performance, and reach your academic goals with our modern 3D interface designed for 2nd year AppDev students.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get started
              </Button>
            </Link>
          </div>
          
          {/* Modern illustration with uploaded image */}
          <div className="relative flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative transform hover:scale-105 transition-all duration-500">
              <img 
                src="/lovable-uploads/fbfb04af-b44a-4394-b37b-fe59e1bac153.png" 
                alt="Academic workspace with computer and development tools" 
                className="w-full max-w-sm md:max-w-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
