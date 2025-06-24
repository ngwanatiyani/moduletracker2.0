
import React from "react";
import { Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StudyTips from "@/components/StudyTips";
import TutoringBooking from "@/components/TutoringBooking";

interface ActionPanelProps {
  overallGrade: number;
  isStudentStruggling: boolean;
  showStudyTips: boolean;
  setShowStudyTips: (show: boolean) => void;
  onCalculateRequiredMarks: () => void;
  getGradeColor: (grade: number) => string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({
  overallGrade,
  isStudentStruggling,
  showStudyTips,
  setShowStudyTips,
  onCalculateRequiredMarks,
  getGradeColor
}) => {
  const getSupportMessage = () => {
    if (overallGrade === 0) {
      return "Start entering your assessment marks to track your progress!";
    } else if (overallGrade >= 75) {
      return "Excellent work! You're on track for distinction!";
    } else if (overallGrade >= 65) {
      return "Great progress! Keep up the good work!";
    } else if (overallGrade >= 50) {
      return "You're on track. Consider reviewing study strategies.";
    } else {
      return "Consider seeking additional support to improve performance.";
    }
  };

  return (
    <div className="space-y-4">
      {/* Grade Calculator */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-4 h-4 text-blue-600" />
            Grade Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-xs text-slate-600 mb-1">Current Overall Grade</div>
            <div className={`text-3xl font-bold ${getGradeColor(overallGrade)} mb-3`}>
              {overallGrade > 0 ? `${overallGrade}%` : '--'}
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-sm"
            onClick={onCalculateRequiredMarks}
            disabled={overallGrade === 0}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Required Marks
          </Button>
        </CardContent>
      </Card>

      {/* Academic Support */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="w-4 h-4 text-green-600" />
            Academic Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-slate-600 text-xs leading-relaxed">
            {getSupportMessage()}
          </p>
          <div className="grid grid-cols-1 gap-2">
            <Dialog open={showStudyTips} onOpenChange={setShowStudyTips}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  Study Tips & Strategies
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Study Tips & Strategies</DialogTitle>
                </DialogHeader>
                <StudyTips />
              </DialogContent>
            </Dialog>
            {isStudentStruggling ? (
              <TutoringBooking />
            ) : (
              <Button variant="outline" size="sm" className="text-xs w-full" disabled>
                Book Tutoring Session
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPanel;
