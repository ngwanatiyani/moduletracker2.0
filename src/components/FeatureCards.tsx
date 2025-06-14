
import { Calculator, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureCards = () => {
  const features = [
    {
      icon: Calculator,
      title: "Grade Calculator",
      description: "Calculate potential final grades and set academic targets with our advanced algorithm",
      color: "from-green-400 to-emerald-600",
      shadowColor: "shadow-green-500/25"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracker", 
      description: "Track your progress across modules with beautiful 3D visualizations and insights",
      color: "from-blue-400 to-cyan-600",
      shadowColor: "shadow-blue-500/25"
    },
    {
      icon: BookOpen,
      title: "Grade Impactor",
      description: "Connect with tutors and get personalized recommendations to improve your grades",
      color: "from-yellow-400 to-orange-600",
      shadowColor: "shadow-yellow-500/25"
    },
    {
      icon: Users,
      title: "Module Manager",
      description: "Effortlessly manage modules with intuitive weightings and assessment configuration",
      color: "from-purple-400 to-pink-600",
      shadowColor: "shadow-purple-500/25"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-40 right-1/4 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful <span className="text-yellow-400">Features</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Experience the future of academic tracking with our innovative 3D interface and smart features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 ${feature.shadowColor} hover:shadow-2xl group perspective-1000`}
              >
                <CardHeader className="text-center pb-4">
                  {/* Enhanced 3D icon container */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl relative`}>
                    <Icon className="w-10 h-10 text-white relative z-10" />
                    {/* 3D depth effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl transform translate-x-1 translate-y-1 opacity-50 -z-10`}></div>
                  </div>
                  <CardTitle className="text-white text-lg group-hover:text-yellow-400 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-200 text-center leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                  
                  {/* Floating decorative elements */}
                  <div className="relative mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Hero illustration positioned at the bottom */}
        <div className="mt-16 flex justify-center">
          <div className="relative transform hover:scale-105 transition-all duration-500">
            <img 
              src="/lovable-uploads/32dd05c4-1048-4018-9ab9-63e62abb4d84.png" 
              alt="Student with academic progress chart and checklist" 
              className="w-full max-w-sm h-auto drop-shadow-2xl opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
