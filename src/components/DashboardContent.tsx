
import React from "react";
import ModuleOverview from "@/components/ModuleOverview";
import TermCard from "@/components/TermCard";
import GradeProjection from "@/components/GradeProjection";
import AcademicSupport from "@/components/AcademicSupport";
import { Assessment, Term } from "@/data/moduleData";

interface DashboardContentProps {
  selectedModule: string;
  overallGrade: number;
  currentTerms: Term[];
  editingAssessment: string | null;
  tempAssessment: Partial<Assessment>;
  showStudyTips: boolean;
  isStudentStruggling: boolean;
  getGradeColor: (grade: number) => string;
  getProgressColor: (grade: number) => string;
  calculateTermAverage: (term: Term) => number;
  onEditAssessment: (assessmentId: string, assessment: Assessment) => void;
  onSaveAssessment: () => void;
  onCancelEdit: () => void;
  onAddAssessment: (termName: string) => void;
  onCalculateRequiredMarks: () => void;
  setTempAssessment: (assessment: Partial<Assessment>) => void;
  setShowStudyTips: (show: boolean) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  selectedModule,
  overallGrade,
  currentTerms,
  editingAssessment,
  tempAssessment,
  showStudyTips,
  isStudentStruggling,
  getGradeColor,
  getProgressColor,
  calculateTermAverage,
  onEditAssessment,
  onSaveAssessment,
  onCancelEdit,
  onAddAssessment,
  onCalculateRequiredMarks,
  setTempAssessment,
  setShowStudyTips
}) => {
  return (
    <div className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 animate-fade-in max-w-full min-h-screen">
      <ModuleOverview
        selectedModule={selectedModule}
        overallGrade={overallGrade}
        getGradeColor={getGradeColor}
        getProgressColor={getProgressColor}
      />

      {/* Responsive Terms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {currentTerms.map((term, index) => (
          <TermCard
            key={term.name}
            term={term}
            index={index}
            calculateTermAverage={calculateTermAverage}
            getGradeColor={getGradeColor}
            editingAssessment={editingAssessment}
            tempAssessment={tempAssessment}
            onEditAssessment={onEditAssessment}
            onSaveAssessment={onSaveAssessment}
            onCancelEdit={onCancelEdit}
            onAddAssessment={onAddAssessment}
            setTempAssessment={setTempAssessment}
          />
        ))}
      </div>

      {/* Responsive Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <GradeProjection
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
          onCalculateRequiredMarks={onCalculateRequiredMarks}
        />
        <AcademicSupport
          overallGrade={overallGrade}
          isStudentStruggling={isStudentStruggling}
          showStudyTips={showStudyTips}
          setShowStudyTips={setShowStudyTips}
        />
      </div>
    </div>
  );
};

export default DashboardContent;
