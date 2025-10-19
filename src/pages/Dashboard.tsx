
import React from 'react';
import OptimizedLayout from '@/components/layout/OptimizedLayout';
import DashboardContent from "@/components/DashboardContent";
import ProfessionalFooter from "@/components/ProfessionalFooter";
import { useDashboardState } from "@/hooks/useDashboardState";

const Dashboard = () => {
  const dashboardState = useDashboardState();
  const {
    selectedYear,
    selectedModule,
    setSelectedModule,
    editingAssessment,
    tempAssessment,
    setTempAssessment,
    showStudyTips,
    setShowStudyTips,
    sidebarOpen,
    setSidebarOpen,
    modules,
    calculateTermAverage,
    calculateOverallGrade,
    handleEditAssessment,
    handleSaveAssessment,
    handleCancelEdit,
    handleAddAssessment,
    handleCalculateRequiredMarks,
    handleLogout,
    getGradeColor,
    getProgressColor
  } = dashboardState;

  const overallGrade = calculateOverallGrade();
  const currentTerms = dashboardState.moduleData[selectedModule] || [];
  const isStudentStruggling = overallGrade > 0 && overallGrade < 50;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-orange-50/20 to-blue-50/30">
      <OptimizedLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        showSidebar={false}
      >
        <DashboardContent
          selectedModule={selectedModule}
          overallGrade={overallGrade}
          currentTerms={currentTerms}
          editingAssessment={editingAssessment}
          tempAssessment={tempAssessment}
          showStudyTips={showStudyTips}
          isStudentStruggling={isStudentStruggling}
          modules={modules}
          getGradeColor={getGradeColor}
          calculateTermAverage={calculateTermAverage}
          onEditAssessment={handleEditAssessment}
          onSaveAssessment={handleSaveAssessment}
          onCancelEdit={handleCancelEdit}
          onAddAssessment={handleAddAssessment}
          onCalculateRequiredMarks={handleCalculateRequiredMarks}
          onModuleSelect={setSelectedModule}
          setTempAssessment={setTempAssessment}
          setShowStudyTips={setShowStudyTips}
        />
      </OptimizedLayout>
      <ProfessionalFooter />
    </div>
  );
};

export default Dashboard;
