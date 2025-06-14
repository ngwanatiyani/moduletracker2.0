
import { BarChart3, Users, Target, BookOpen } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background decoration with 3D floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-60 right-20 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse delay-100 shadow-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse delay-200 shadow-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300 shadow-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Enhanced 3D Illustration inspired by the student with laptop image */}
          <div className="relative">
            {/* Main illustration container */}
            <div className="relative bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-1 transition-all duration-500">
              <div className="bg-white rounded-2xl p-6 transform -rotate-3 shadow-inner">
                <div className="flex items-center justify-center h-64 relative">
                  {/* Student figure representation */}
                  <div className="relative">
                    {/* Student body */}
                    <div className="w-20 h-32 bg-gradient-to-b from-orange-400 to-red-500 rounded-t-full mx-auto relative">
                      {/* Head */}
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2 shadow-lg">
                        {/* Hair */}
                        <div className="w-10 h-8 bg-gray-800 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                      
                      {/* Arms */}
                      <div className="w-6 h-16 bg-gradient-to-b from-orange-400 to-red-500 rounded-full absolute top-4 -left-8 transform rotate-12"></div>
                      <div className="w-6 h-16 bg-gradient-to-b from-orange-400 to-red-500 rounded-full absolute top-4 -right-8 transform -rotate-12"></div>
                    </div>
                    
                    {/* Laptop/tablet representation */}
                    <div className="w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg absolute bottom-8 left-1/2 transform -translate-x-1/2 shadow-lg">
                      <div className="w-14 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded m-1 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating academic elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg transform rotate-12 shadow-lg">
                    <BookOpen className="w-4 h-4 text-white m-2" />
                  </div>
                  <div className="absolute top-8 right-6 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
                  <div className="absolute bottom-12 right-4 w-10 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full shadow-lg flex items-center justify-center">
                    <span className="text-xs text-white font-bold">A+</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional floating 3D elements */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-xl transform rotate-12 animate-bounce">
              <Users className="w-10 h-10 text-white" />
            </div>
            
            {/* Academic achievement badges */}
            <div className="absolute -top-4 right-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-6">
              About <span className="text-yellow-400">ModuleTracker</span>
            </h2>
            <div className="space-y-6 text-blue-100 leading-relaxed">
              <p className="text-lg">
                ModuleTracker is a cutting-edge platform designed specifically for Application Development students at Cape Peninsula University of Technology. We transform the academic journey with intuitive 3D interfaces and smart analytics.
              </p>
              <p className="text-lg">
                Our modern platform addresses real student challenges with beautiful, functional design. We support both students and educators with tools that make academic monitoring engaging and effective.
              </p>
              <p className="text-lg">
                Experience the future of academic tracking with our user-friendly solution that provides real-time insights and personalized recommendations for academic success.
              </p>
            </div>
            
            {/* Feature highlights with 3D styling */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-300/20 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-2 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white font-semibold">Smart Analytics</h4>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl p-4 border border-green-300/20 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-2 flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-white font-semibold">Goal Tracking</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
