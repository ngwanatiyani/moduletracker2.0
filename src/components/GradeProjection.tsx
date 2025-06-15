
import React from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GradeProjectionProps {
  overallGrade: number;
  getGradeColor: (grade: number) => string;
  onCalculateRequiredMarks: () => void;
}

const GradeProjection: React.FC<GradeProjectionProps> = ({
  overallGrade,
  getGradeColor,
  onCalculateRequiredMarks
}) => {
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Grade Projection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Current Overall Grade:</span>
            <span className={`font-bold ${getGradeColor(overallGrade)}`}>
              {overallGrade > 0 ? `${overallGrade}%` : 'No Data'}
            </span>
          </div>
          {overallGrade > 0 ? (
            <>
              <div className="text-sm text-gray-600">
                Based on completed assessments
              </div>
              <div className="text-sm text-gray-600">
                Complete more assessments for accurate projections
              </div>
            </>
          ) : (
            <div className="text-sm text-gray-600">
              Enter assessment marks to see grade projections
            </div>
          )}
        </div>
        <Button 
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transition-all duration-200 transform hover:scale-105"
          onClick={onCalculateRequiredMarks}
          disabled={overallGrade === 0}
        >
          <Calculator className="w-4 h-4 mr-2" />
          Calculate Required Marks
        </Button>
      </CardContent>
    </Card>
  );
};

export default GradeProjection;
