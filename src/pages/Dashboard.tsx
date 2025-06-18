
import React from 'react';
import OptimizedLayout from '@/components/layout/OptimizedLayout';
import DashboardContent from "@/components/DashboardContent";
import MobileSidebar from "@/components/MobileSidebar";
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
    <div className="min-h-screen flex flex-col">
      <OptimizedLayout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
        showChatbot={true}
      >
        <div className="flex relative min-h-screen">
          <MobileSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            selectedYear={selectedYear}
            modules={modules}
            selectedModule={selectedModule}
            onModuleSelect={setSelectedModule}
          />

          <DashboardContent
            selectedModule={selectedModule}
            overallGrade={overallGrade}
            currentTerms={currentTerms}
            editingAssessment={editingAssessment}
            tempAssessment={tempAssessment}
            showStudyTips={showStudyTips}
            isStudentStruggling={isStudentStruggling}
            getGradeColor={getGradeColor}
            getProgressColor={getProgressColor}
            calculateTermAverage={calculateTermAverage}
            onEditAssessment={handleEditAssessment}
            onSaveAssessment={handleSaveAssessment}
            onCancelEdit={handleCancelEdit}
            onAddAssessment={handleAddAssessment}
            onCalculateRequiredMarks={handleCalculateRequiredMarks}
            setTempAssessment={setTempAssessment}
            setShowStudyTips={setShowStudyTips}
          />
        </div>
      </OptimizedLayout>
      <ProfessionalFooter />
    </div>
  );
};

export default Dashboard;
