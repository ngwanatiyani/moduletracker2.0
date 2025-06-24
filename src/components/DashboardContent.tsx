
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
    <div className="flex-1 w-full max-w-full min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/30">
      <div className="p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <DashboardHeader
          selectedModule={selectedModule}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />

        {/* Stats Cards */}
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
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Terms Section */}
          <div className="xl:col-span-8 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Term Progress</h2>
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

          {/* Sidebar */}
          <div className="xl:col-span-4 space-y-4">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
