
import React from "react";
import { GraduationCap, TrendingUp } from "lucide-react";

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
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/50 p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-slate-800 mb-1">
              {selectedModule.split('(')[0].trim()}
            </h1>
            <p className="text-xs lg:text-sm text-slate-500">
              {selectedModule.match(/\(([^)]+)\)/)?.[1] || ''}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span className="text-xs lg:text-sm text-slate-500">Overall Grade</span>
          </div>
          <div className={`text-2xl lg:text-3xl font-bold ${getGradeColor(overallGrade)}`}>
            {overallGrade > 0 ? `${overallGrade}%` : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
