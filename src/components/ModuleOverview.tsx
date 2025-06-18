
import React from "react";
import { BookOpen } from "lucide-react";
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
  return (
    <Card className="mb-4 md:mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
      <CardHeader className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle className="text-lg md:text-2xl flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="leading-tight">{selectedModule}</span>
          </CardTitle>
          <div className="text-center md:text-right">
            <div className={`text-2xl md:text-3xl font-bold ${getGradeColor(overallGrade)}`}>
              {overallGrade > 0 ? `${overallGrade}%` : 'No Data'}
            </div>
            <div className="text-sm text-gray-500">Overall</div>
          </div>
        </div>
        <CardDescription className="text-sm md:text-lg">
          Overall Progress: {overallGrade > 0 ? `${overallGrade}%` : 'No assessments completed yet'} | 
          Status: {overallGrade >= 50 ? 'Passing' : overallGrade > 0 ? 'At Risk' : 'Not Started'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        <div className="relative">
          <Progress value={overallGrade} className="h-6 md:h-8 bg-gray-200 overflow-hidden rounded-full shadow-inner" />
          {overallGrade > 0 && (
            <>
              <div 
                className={`absolute top-0 left-0 h-6 md:h-8 rounded-full transition-all duration-1000 ease-out ${getProgressColor(overallGrade)}`}
                style={{ width: `${overallGrade}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold text-xs md:text-sm drop-shadow">{overallGrade}%</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleOverview;
