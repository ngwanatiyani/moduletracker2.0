
import React from "react";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import StudyTips from "@/components/StudyTips";
import TutoringBooking from "@/components/TutoringBooking";

interface AcademicSupportProps {
  overallGrade: number;
  isStudentStruggling: boolean;
  showStudyTips: boolean;
  setShowStudyTips: (show: boolean) => void;
}

const AcademicSupport: React.FC<AcademicSupportProps> = ({
  overallGrade,
  isStudentStruggling,
  showStudyTips,
  setShowStudyTips
}) => {
  const getSupportMessage = () => {
    if (overallGrade === 0) {
      return "Start entering your assessment marks to track your progress!";
    } else if (overallGrade >= 65) {
      return "Great progress! Keep up the excellent work!";
    } else if (overallGrade >= 50) {
      return "You're on track. Consider reviewing study strategies.";
    } else {
      return "Consider seeking additional support to improve performance.";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-green-600" />
          Academic Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-gray-600">
          {getSupportMessage()}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Dialog open={showStudyTips} onOpenChange={setShowStudyTips}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                Study Tips
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Study Tips & Strategies</DialogTitle>
              </DialogHeader>
              <StudyTips />
            </DialogContent>
          </Dialog>
          {isStudentStruggling && <TutoringBooking />}
          {!isStudentStruggling && (
            <Button variant="outline" size="sm" className="text-xs" disabled>
              Tutoring (Grade ≥50%)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicSupport;
