
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
      label: "Assessments",
      value: totalAssessments,
      color: "text-blue-700",
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      icon: Award,
      label: "Completed",
      value: completedAssessments,
      color: "text-emerald-700",
      bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      border: "border-emerald-200"
    },
    {
      icon: Clock,
      label: "Pending",
      value: pendingAssessments,
      color: "text-amber-700",
      bg: "bg-gradient-to-br from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      border: "border-amber-200"
    },
    {
      icon: Target,
      label: "Progress",
      value: `${completionRate}%`,
      color: "text-purple-700",
      bg: "bg-gradient-to-br from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      border: "border-purple-200"
    },
    {
      icon: TrendingUp,
      label: "Average",
      value: `${averageGrade}%`,
      color: "text-indigo-700",
      bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      bgLight: "bg-indigo-50",
      border: "border-indigo-200"
    },
    {
      icon: Users,
      label: "High Perf",
      value: highPerformingTerms,
      color: "text-teal-700",
      bg: "bg-gradient-to-br from-teal-500 to-teal-600",
      bgLight: "bg-teal-50",
      border: "border-teal-200"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="group perspective-1000"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`relative ${stat.bgLight} ${stat.border} border rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg transform-gpu animate-fade-in`}>
            {/* Icon */}
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            
            {/* Value */}
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            
            {/* Label */}
            <div className="text-xs text-slate-600 font-medium">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats3D;
