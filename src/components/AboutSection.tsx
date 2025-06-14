
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
          {/* Left side - Student illustration */}
          <div className="relative flex justify-center items-center">
            <div className="relative transform hover:scale-105 transition-all duration-500">
              <img 
                src="/lovable-uploads/06461010-69d1-45fd-9277-b158e0890339.png" 
                alt="Student studying with books and lamp" 
                className="w-full max-w-md h-auto drop-shadow-2xl"
              />
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
