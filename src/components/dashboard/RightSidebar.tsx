
import React from "react";
import PerformanceMetrics from "./PerformanceMetrics";
import ActionPanel from "./ActionPanel";
import { Term } from "@/data/moduleData";

interface RightSidebarProps {
  currentTerms: Term[];
  calculateTermAverage: (term: Term) => number;
  overallGrade: number;
  isStudentStruggling: boolean;
  showStudyTips: boolean;
  getGradeColor: (grade: number) => string;
  setShowStudyTips: (show: boolean) => void;
  onCalculateRequiredMarks: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  currentTerms,
  calculateTermAverage,
  overallGrade,
  isStudentStruggling,
  showStudyTips,
  getGradeColor,
  setShowStudyTips,
  onCalculateRequiredMarks
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Performance Insights</h2>
        <PerformanceMetrics
          currentTerms={currentTerms}
          calculateTermAverage={calculateTermAverage}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Academic Tools</h2>
        <ActionPanel
          overallGrade={overallGrade}
          isStudentStruggling={isStudentStruggling}
          showStudyTips={showStudyTips}
          setShowStudyTips={setShowStudyTips}
          onCalculateRequiredMarks={onCalculateRequiredMarks}
          getGradeColor={getGradeColor}
        />
      </div>
    </div>
  );
};

export default RightSidebar;
