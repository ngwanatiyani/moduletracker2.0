
import React from "react";
import { GraduationCap, TrendingUp, Award } from "lucide-react";

interface DashboardHeaderProps {
  selectedModule: string;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedModule,
  overallGrade,
  getGradeColor
}) => {
  const getGradeCategory = (grade: number) => {
    if (grade >= 75) return { label: "Distinction", icon: Award, color: "text-emerald-600" };
    if (grade >= 65) return { label: "Merit", icon: TrendingUp, color: "text-blue-600" };
    if (grade >= 50) return { label: "Pass", icon: TrendingUp, color: "text-amber-600" };
    return { label: "In Progress", icon: TrendingUp, color: "text-slate-500" };
  };

  const category = getGradeCategory(overallGrade);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 mb-1">
              {selectedModule.split('(')[0].trim()}
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              {selectedModule.match(/\(([^)]+)\)/)?.[1] || 'Module Code'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <category.icon className={`w-4 h-4 ${category.color}`} />
              <span className={`text-sm font-medium ${category.color}`}>
                {category.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center lg:text-right">
          <div className="text-sm text-slate-500 mb-1">Overall Performance</div>
          <div className={`text-3xl lg:text-4xl font-bold ${getGradeColor(overallGrade)} mb-1`}>
            {overallGrade > 0 ? `${overallGrade}%` : '--'}
          </div>
          <div className="text-xs text-slate-400">Current Average</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
