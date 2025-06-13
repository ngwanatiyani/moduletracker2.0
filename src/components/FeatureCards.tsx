
import { Calculator, TrendingUp, BookOpen, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureCards = () => {
  const features = [
    {
      icon: Calculator,
      title: "Grade Calculator",
      description: "Calculate potential final grades and set academic targets",
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracker", 
      description: "Track your progress across modules and manage assessments",
      color: "bg-blue-500"
    },
    {
      icon: BookOpen,
      title: "Grade Impactor",
      description: "Connect with tutors to improve your grades",
      color: "bg-yellow-500"
    },
    {
      icon: Users,
      title: "Module Manager",
      description: "Effortlessly manage and configure assessment weightings",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${feature.color} rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-blue-200 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
