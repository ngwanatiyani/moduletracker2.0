
import React from "react";
import { Calculator, Lightbulb, BookOpen } from "lucide-react";
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
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calculator className="w-5 h-5 text-blue-600" />
            Grade Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-sm text-slate-600 mb-2">Current Overall Grade</div>
            <div className={`text-3xl font-bold ${getGradeColor(overallGrade)} mb-3`}>
              {overallGrade > 0 ? `${overallGrade}%` : '--'}
            </div>
          </div>
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            onClick={onCalculateRequiredMarks}
            disabled={overallGrade === 0}
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Required Marks
          </Button>
        </CardContent>
      </Card>

      {/* Academic Support */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <BookOpen className="w-5 h-5 text-orange-600" />
            Academic Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700 text-sm leading-relaxed">
            {getSupportMessage()}
          </p>
          <div className="space-y-2">
            <Dialog open={showStudyTips} onOpenChange={setShowStudyTips}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-orange-300 hover:bg-orange-100">
                  <Lightbulb className="w-4 h-4 mr-2" />
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
              <Button variant="outline" className="w-full" disabled>
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
