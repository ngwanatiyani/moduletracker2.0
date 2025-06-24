
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
      <div className="p-3 lg:p-4 xl:p-6 animate-fade-in max-w-7xl mx-auto space-y-4">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-6">
          {/* Terms Section - Takes 2/3 of the space on xl screens */}
          <div className="xl:col-span-2">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Term Assessments</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

          {/* Action Panel - Takes 1/3 of the space on xl screens */}
          <div className="xl:col-span-1">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">Tools & Support</h2>
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
      </div>
    </div>
  );
};

export default DashboardContent;
