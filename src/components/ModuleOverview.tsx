
import React from "react";
import { BookOpen, TrendingUp, Target, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ModuleOverviewProps {
  selectedModule: string;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
  getProgressColor: (grade: number) => string;
}

const ModuleOverview: React.FC<ModuleOverviewProps> = ({
  selectedModule,
  overallGrade,
  getGradeColor,
  getProgressColor
}) => {
  const getPerformanceLevel = (grade: number) => {
    if (grade >= 75) return { level: "Distinction", icon: Award, color: "text-green-600" };
    if (grade >= 65) return { level: "Credit", icon: TrendingUp, color: "text-blue-600" };
    if (grade >= 50) return { level: "Pass", icon: Target, color: "text-yellow-600" };
    return { level: "At Risk", icon: Target, color: "text-red-600" };
  };

  const performance = getPerformanceLevel(overallGrade);
  const PerformanceIcon = performance.icon;

  return (
    <Card className="mb-6 md:mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <CardTitle className="text-xl md:text-3xl flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <span className="leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {selectedModule}
              </span>
              <div className="text-sm md:text-base text-slate-500 font-normal mt-1">
                Academic Module Progress
              </div>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className={`text-3xl md:text-5xl font-bold ${getGradeColor(overallGrade)} flex items-center gap-2`}>
                {overallGrade > 0 ? `${overallGrade}%` : 'No Data'}
              </div>
              <div className="text-sm text-slate-500 mt-1">Overall Grade</div>
            </div>
            
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 ${performance.color}`}>
              <PerformanceIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">{performance.level}</span>
            </div>
          </div>
        </div>
        
        <CardDescription className="text-base md:text-lg mt-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          Progress: {overallGrade > 0 ? `${overallGrade}%` : 'No assessments completed yet'} | 
          Status: {overallGrade >= 50 ? 'Passing' : overallGrade > 0 ? 'At Risk' : 'Not Started'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        <div className="relative">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600">Progress</span>
            <span className="text-sm font-bold text-slate-800">{overallGrade}% Complete</span>
          </div>
          
          <div className="relative h-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full overflow-hidden shadow-inner">
            {overallGrade > 0 && (
              <>
                <div 
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${getProgressColor(overallGrade)}`}
                  style={{ width: `${overallGrade}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs drop-shadow-sm">
                    {overallGrade >= 15 ? `${overallGrade}%` : ''}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {/* Progress milestones */}
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>0%</span>
            <span className="text-yellow-600">50% (Pass)</span>
            <span className="text-blue-600">65% (Credit)</span>
            <span className="text-green-600">75% (Distinction)</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleOverview;
