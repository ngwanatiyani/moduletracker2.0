
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, TrendingUp } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-60 right-40 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
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
          <Button variant="outline" className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700">
            Sign Up
          </Button>
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
              Track progress, improve performance, and reach your academic goals.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get started
            </Button>
          </div>
          
          {/* Illustration Area */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <div className="bg-gray-200 h-4 w-24 rounded mx-auto mb-2"></div>
                    <div className="bg-gray-200 h-4 w-32 rounded mx-auto mb-2"></div>
                    <div className="bg-yellow-400 h-8 w-40 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-800">Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-lg transform rotate-12 animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
