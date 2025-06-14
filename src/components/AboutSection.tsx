
import { BarChart3, Users, Target, BookOpen } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-gradient-to-b from-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background decoration with 3D floating orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute top-60 right-8 md:right-20 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse delay-100 shadow-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse delay-200 shadow-2xl"></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300 shadow-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left side - Student illustration */}
          <div className="relative flex justify-center items-center order-2 lg:order-1">
            <div className="relative transform hover:scale-105 transition-all duration-500">
              <img 
                src="/lovable-uploads/06461010-69d1-45fd-9277-b158e0890339.png" 
                alt="Student studying with books and lamp" 
                className="w-full max-w-xs md:max-w-md h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 text-center lg:text-left">
              About <span className="text-yellow-400">ModuleTracker</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-blue-100 leading-relaxed">
              <p className="text-base md:text-lg">
                ModuleTracker is a cutting-edge platform designed specifically for 2nd year Application Development students at Cape Peninsula University of Technology. We transform the academic journey with intuitive 3D interfaces and smart analytics.
              </p>
              <p className="text-base md:text-lg">
                Our modern platform addresses real student challenges with beautiful, functional design. We support students with tools that make academic monitoring engaging and effective.
              </p>
              <p className="text-base md:text-lg">
                Experience the future of academic tracking with our user-friendly solution that provides real-time insights and personalized recommendations for academic success.
              </p>
            </div>
            
            {/* Feature highlights with 3D styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 md:mt-8">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-blue-300/20 shadow-lg">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-2 flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h4 className="text-white font-semibold text-sm md:text-base">Smart Analytics</h4>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-green-300/20 shadow-lg">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-2 flex items-center justify-center">
                  <Target className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h4 className="text-white font-semibold text-sm md:text-base">Goal Tracking</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
