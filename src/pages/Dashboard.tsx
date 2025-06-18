
import NavigationBar from "@/components/NavigationBar";
import MobileSidebar from "@/components/MobileSidebar";
import DashboardContent from "@/components/DashboardContent";
import DashboardFooter from "@/components/DashboardFooter";
import Chatbot from "@/components/Chatbot";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full overflow-x-hidden">
      <NavigationBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onLogout={handleLogout}
      />

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

      <Chatbot />
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
