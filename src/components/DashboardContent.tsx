
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Stats3D from "@/components/dashboard/Stats3D";
import AnalyticsSection from "@/components/dashboard/AnalyticsSection";
import ModernTermCard from "@/components/dashboard/ModernTermCard";
import ActionPanel from "@/components/dashboard/ActionPanel";
import PerformanceMetrics from "@/components/dashboard/PerformanceMetrics";
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
      <div className="p-2 lg:p-3 xl:p-4 animate-fade-in max-w-7xl mx-auto space-y-3">
        {/* Header Section */}
        <DashboardHeader
          selectedModule={selectedModule}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />

        {/* 3D Stats Cards */}
        <Stats3D
          currentTerms={currentTerms}
          calculateTermAverage={calculateTermAverage}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />

        {/* Analytics Section */}
        <AnalyticsSection
          currentTerms={currentTerms}
          calculateTermAverage={calculateTermAverage}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
          {/* Terms Section - Takes 2/4 of the space on xl screens */}
          <div className="xl:col-span-2">
            <h2 className="text-base font-semibold text-slate-800 mb-2">Term Assessments</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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

          {/* Performance Metrics - Takes 1/4 of the space */}
          <div className="xl:col-span-1">
            <h2 className="text-base font-semibold text-slate-800 mb-2">Performance</h2>
            <PerformanceMetrics
              currentTerms={currentTerms}
              calculateTermAverage={calculateTermAverage}
              overallGrade={overallGrade}
              getGradeColor={getGradeColor}
            />
          </div>

          {/* Action Panel - Takes 1/4 of the space */}
          <div className="xl:col-span-1">
            <h2 className="text-base font-semibold text-slate-800 mb-2">Tools & Support</h2>
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
