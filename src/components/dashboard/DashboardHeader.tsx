
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 mb-1">
              {selectedModule.split('(')[0].trim()}
            </h1>
            <p className="text-sm text-slate-500">
              {selectedModule.match(/\(([^)]+)\)/)?.[1] || ''}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">Overall Grade</span>
          </div>
          <div className={`text-3xl font-bold ${getGradeColor(overallGrade)}`}>
            {overallGrade > 0 ? `${overallGrade}%` : '--'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
