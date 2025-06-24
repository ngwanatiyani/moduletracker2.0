
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Stats3D from "@/components/dashboard/Stats3D";
import ModuleDropdown from "@/components/dashboard/ModuleDropdown";
import MiddleSection from "@/components/dashboard/MiddleSection";
import RightSidebar from "@/components/dashboard/RightSidebar";
import { Assessment, Term } from "@/data/moduleData";

interface DashboardContentProps {
  selectedModule: string;
  overallGrade: number;
  currentTerms: Term[];
  editingAssessment: string | null;
  tempAssessment: Partial<Assessment>;
  showStudyTips: boolean;
  isStudentStruggling: boolean;
  modules: string[];
  getGradeColor: (grade: number) => string;
  calculateTermAverage: (term: Term) => number;
  onEditAssessment: (assessmentId: string, assessment: Assessment) => void;
  onSaveAssessment: () => void;
  onCancelEdit: () => void;
  onAddAssessment: (termName: string) => void;
  onCalculateRequiredMarks: () => void;
  onModuleSelect: (module: string) => void;
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
  modules,
  getGradeColor,
  calculateTermAverage,
  onEditAssessment,
  onSaveAssessment,
  onCancelEdit,
  onAddAssessment,
  onCalculateRequiredMarks,
  onModuleSelect,
  setTempAssessment,
  setShowStudyTips
}) => {
  return (
    <div className="flex-1 w-full max-w-full min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/30">
      <div className="p-3 lg:p-4 xl:p-6 max-w-7xl mx-auto space-y-4">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left Sidebar - Module Dropdown */}
          <div className="xl:col-span-3 space-y-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Select Module</h2>
              <ModuleDropdown
                modules={modules}
                selectedModule={selectedModule}
                onModuleSelect={onModuleSelect}
              />
            </div>
          </div>

          {/* Middle Section - Charts and Terms */}
          <div className="xl:col-span-6">
            <MiddleSection
              currentTerms={currentTerms}
              editingAssessment={editingAssessment}
              tempAssessment={tempAssessment}
              calculateTermAverage={calculateTermAverage}
              getGradeColor={getGradeColor}
              overallGrade={overallGrade}
              onEditAssessment={onEditAssessment}
              onSaveAssessment={onSaveAssessment}
              onCancelEdit={onCancelEdit}
              onAddAssessment={onAddAssessment}
              setTempAssessment={setTempAssessment}
            />
          </div>

          {/* Right Sidebar - Performance and Tools */}
          <div className="xl:col-span-3">
            <RightSidebar
              currentTerms={currentTerms}
              calculateTermAverage={calculateTermAverage}
              overallGrade={overallGrade}
              isStudentStruggling={isStudentStruggling}
              showStudyTips={showStudyTips}
              getGradeColor={getGradeColor}
              setShowStudyTips={setShowStudyTips}
              onCalculateRequiredMarks={onCalculateRequiredMarks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
