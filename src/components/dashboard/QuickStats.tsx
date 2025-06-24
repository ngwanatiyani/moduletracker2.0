
import React from "react";
import { BookOpen, Award, Clock, Target } from "lucide-react";
import { Term } from "@/data/moduleData";

interface QuickStatsProps {
  currentTerms: Term[];
  calculateTermAverage: (term: Term) => number;
  overallGrade: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  currentTerms,
  calculateTermAverage,
  overallGrade
}) => {
  const totalAssessments = currentTerms.reduce((sum, term) => sum + term.assessments.length, 0);
  const completedAssessments = currentTerms.reduce((sum, term) => 
    sum + term.assessments.filter(a => a.status === 'completed').length, 0);
  const pendingAssessments = totalAssessments - completedAssessments;
  const completionRate = totalAssessments > 0 ? Math.round((completedAssessments / totalAssessments) * 100) : 0;

  const stats = [
    {
      icon: BookOpen,
      label: "Total Assessments",
      value: totalAssessments,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Award,
      label: "Completed",
      value: completedAssessments,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Clock,
      label: "Pending",
      value: pendingAssessments,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      icon: Target,
      label: "Progress",
      value: `${completionRate}%`,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200/50 p-3 lg:p-4">
          <div className={`w-8 h-8 lg:w-10 lg:h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-2 lg:mb-3`}>
            <stat.icon className={`w-4 h-4 lg:w-5 lg:h-5 ${stat.color}`} />
          </div>
          <div className="text-xl lg:text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
          <div className="text-xs lg:text-sm text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
