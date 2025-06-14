
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Decorative background elements - inspired by the floating orbs in the images */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse delay-100 shadow-lg"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse delay-200 shadow-lg"></div>
        <div className="absolute bottom-60 right-40 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300 shadow-lg"></div>
        <div className="absolute top-1/3 right-8 w-24 h-24 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-70 animate-pulse delay-500 shadow-xl"></div>
        <div className="absolute bottom-1/3 left-12 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full opacity-50 animate-pulse delay-700 shadow-2xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <GraduationCap className="w-8 h-8 text-yellow-400" />
          <span className="text-xl font-bold text-white">ModuleTracker</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-yellow-400 transition-colors">Home</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-colors">About</a>
          <a href="#" className="text-white hover:text-yellow-400 transition-colors">Contact</a>
          <Link to="/signup">
            <Button variant="outline" className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Academic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Success Hub
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Track progress, improve performance, and reach your academic goals with our modern 3D interface.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get started
              </Button>
            </Link>
          </div>
          
          {/* 3D Illustration Area - inspired by the workspace image */}
          <div className="relative">
            {/* Main card with 3D effect */}
            <div className="relative bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-3xl p-8 shadow-2xl transform perspective-1000 rotate-y-12 hover:rotate-y-6 transition-all duration-500">
              {/* Screen/Monitor effect */}
              <div className="bg-white rounded-2xl p-6 transform -rotate-2 shadow-inner">
                <div className="flex items-center justify-center h-64 relative">
                  {/* Workspace elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-orange-400 rounded-lg transform rotate-12"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 bg-purple-400 rounded-full"></div>
                  
                  {/* Central content */}
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-3 w-32 rounded-full mx-auto"></div>
                      <div className="bg-gray-200 h-3 w-24 rounded-full mx-auto"></div>
                    </div>
                    {/* Progress bars */}
                    <div className="space-y-2">
                      <div className="bg-blue-100 h-4 w-40 rounded-full mx-auto relative">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-4 w-28 rounded-full"></div>
                      </div>
                      <div className="bg-green-100 h-4 w-36 rounded-full mx-auto relative">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 w-20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute bottom-4 left-8 w-4 h-4 bg-yellow-400 rounded transform rotate-45"></div>
                  <div className="absolute bottom-8 right-6 w-3 h-3 bg-pink-400 rounded-full"></div>
                </div>
              </div>
              
              {/* 3D floating elements around the main card */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl transform rotate-12 animate-bounce shadow-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute top-1/2 -left-8 w-6 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full transform -rotate-12 shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
