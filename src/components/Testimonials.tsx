
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Melissa P.",
      role: "2nd Year Student",
      rating: 5,
      text: "Since Using This Application I Understand How Modules Correspond To My End Of Year. Now I Know Where To Apply My Efforts And What Is Expected For The Subject.",
      avatar: "M"
    },
    {
      name: "Baley E.",
      role: "3rd Year Student", 
      rating: 5,
      text: "This Grade Impactor Tool Has Been Invaluable For Planning My Studies. I Always Know Exactly How Much Work I Need To Do To Achieve My Goals.",
      avatar: "B"
    },
    {
      name: "Rebecca A.",
      role: "1st Year Student",
      rating: 5,
      text: "As A First-Year Student, I Was Struggling To Keep Track Of All My Modules And Assignments. This Tool Helps Me Prioritize Assessments.",
      avatar: "R"
    },
    {
      name: "William M.",
      role: "3rd Year Student",
      rating: 5,
      text: "ModuleTracker Was An Adventure Students, This Is A Web Application That Improved And Became Students As Well As Teaching Processes Progress.",
      avatar: "W"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="text-white">Testimonials</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <span className="text-blue-300 text-sm">{testimonial.role}</span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-blue-200 leading-relaxed">{testimonial.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
