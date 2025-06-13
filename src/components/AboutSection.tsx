
import { BarChart3, Users, Target, BookOpen } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-20 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-blue-400 rounded-full animate-pulse delay-200"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <BarChart3 className="w-16 h-16 text-purple-600 mx-auto" />
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-3 w-20 rounded mx-auto"></div>
                      <div className="bg-gray-200 h-3 w-24 rounded mx-auto"></div>
                    </div>
                    <div className="flex space-x-2 justify-center">
                      <div className="w-4 h-8 bg-blue-400 rounded"></div>
                      <div className="w-4 h-12 bg-green-400 rounded"></div>
                      <div className="w-4 h-6 bg-yellow-400 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Character illustration */}
            <div className="absolute -bottom-8 -left-8 bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              About <span className="text-yellow-400">ModuleTracker</span>
            </h2>
            <div className="space-y-6 text-blue-100 leading-relaxed">
              <p>
                ModuleTracker Is A Standalone Platform Tailored For Application Development Students At Cape Peninsula University Of Technology. We Streamline The Academic Journey And Track Your Students Effectively. Simplifying Their Academic Progress.
              </p>
              <p>
                Our Platform Simplifies Academic Monitoring By Addressing The Challenges Students Face. We Support Both Students And Lecturers.
              </p>
              <p>
                Educator And User-Friendly Solution For Students To Monitor Grades And Gain Real-Time Insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
