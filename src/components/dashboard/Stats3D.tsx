
import React from "react";
import { BookOpen, Award, Clock, Target, TrendingUp, Users } from "lucide-react";
import { Term } from "@/data/moduleData";

interface Stats3DProps {
  currentTerms: Term[];
  calculateTermAverage: (term: Term) => number;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
}

const Stats3D: React.FC<Stats3DProps> = ({
  currentTerms,
  calculateTermAverage,
  overallGrade,
  getGradeColor
}) => {
  const totalAssessments = currentTerms.reduce((sum, term) => sum + term.assessments.length, 0);
  const completedAssessments = currentTerms.reduce((sum, term) => 
    sum + term.assessments.filter(a => a.status === 'completed').length, 0);
  const pendingAssessments = totalAssessments - completedAssessments;
  const completionRate = totalAssessments > 0 ? Math.round((completedAssessments / totalAssessments) * 100) : 0;
  const averageGrade = currentTerms.length > 0 ? Math.round(currentTerms.reduce((sum, term) => sum + calculateTermAverage(term), 0) / currentTerms.length) : 0;
  const highPerformingTerms = currentTerms.filter(term => calculateTermAverage(term) >= 70).length;

  const stats = [
    {
      icon: BookOpen,
      label: "Total",
      value: totalAssessments,
      color: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/25"
    },
    {
      icon: Award,
      label: "Completed",
      value: completedAssessments,
      color: "text-green-600",
      bg: "bg-gradient-to-br from-green-500 to-green-600",
      shadow: "shadow-green-500/25"
    },
    {
      icon: Clock,
      label: "Pending",
      value: pendingAssessments,
      color: "text-orange-600",
      bg: "bg-gradient-to-br from-orange-500 to-orange-600",
      shadow: "shadow-orange-500/25"
    },
    {
      icon: Target,
      label: "Progress",
      value: `${completionRate}%`,
      color: "text-purple-600",
      bg: "bg-gradient-to-br from-purple-500 to-purple-600",
      shadow: "shadow-purple-500/25"
    },
    {
      icon: TrendingUp,
      label: "Avg Grade",
      value: `${averageGrade}%`,
      color: "text-indigo-600",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      shadow: "shadow-indigo-500/25"
    },
    {
      icon: Users,
      label: "High Perf",
      value: highPerformingTerms,
      color: "text-emerald-600",
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/25"
    }
  ];

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group perspective-1000"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/50 p-3 lg:p-4 transition-all duration-300 hover:scale-105 hover:rotate-y-6 hover:shadow-xl transform-gpu animate-fade-in">
            {/* 3D Icon Container */}
            <div className={`w-8 h-8 lg:w-10 lg:h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-2 lg:mb-3 shadow-lg ${stat.shadow} transform-gpu transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
              <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            
            {/* Stats Display */}
            <div className="text-lg lg:text-xl font-bold text-slate-800 mb-1 transform-gpu transition-transform duration-300 group-hover:scale-105">
              {stat.value}
            </div>
            <div className="text-xs lg:text-sm text-slate-500 font-medium">
              {stat.label}
            </div>
            
            {/* 3D Depth Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats3D;
