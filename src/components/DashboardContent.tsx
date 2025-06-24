
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickStats from "@/components/dashboard/QuickStats";
import ModernTermCard from "@/components/dashboard/ModernTermCard";
import ActionPanel from "@/components/dashboard/ActionPanel";
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
      <div className="p-4 lg:p-6 xl:p-8 animate-fade-in max-w-7xl mx-auto">
        {/* Header Section */}
        <DashboardHeader
          selectedModule={selectedModule}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />

        {/* Quick Stats */}
        <QuickStats
          currentTerms={currentTerms}
          calculateTermAverage={calculateTermAverage}
          overallGrade={overallGrade}
        />

        {/* Terms Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Term Assessments</h2>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            {currentTerms.map((term, index) => (
              <ModernTermCard
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
        </div>

        {/* Action Panel */}
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

export default DashboardContent;
