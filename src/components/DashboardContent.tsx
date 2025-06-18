
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
    <div className="flex-1 w-full max-w-full">
      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 animate-fade-in space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Module Overview with better spacing */}
        <div className="w-full">
          <ModuleOverview
            selectedModule={selectedModule}
            overallGrade={overallGrade}
            getGradeColor={getGradeColor}
            getProgressColor={getProgressColor}
          />
        </div>

        {/* Responsive Terms Grid with improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {currentTerms.map((term, index) => (
            <div key={term.name} className="w-full">
              <TermCard
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
            </div>
          ))}
        </div>

        {/* Bottom Section with improved responsive grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <div className="w-full">
            <GradeProjection
              overallGrade={overallGrade}
              getGradeColor={getGradeColor}
              onCalculateRequiredMarks={onCalculateRequiredMarks}
            />
          </div>
          <div className="w-full">
            <AcademicSupport
              overallGrade={overallGrade}
              isStudentStruggling={isStudentStruggling}
              showStudyTips={showStudyTips}
              setShowStudyTips={setShowStudyTips}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
