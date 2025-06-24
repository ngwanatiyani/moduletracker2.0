import React from "react";

interface ModuleOverviewProps {
  selectedModule: string;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
  getProgressColor: (grade: number) => string;
}

const ModuleOverview: React.FC<ModuleOverviewProps> = () => {
  // Component functionality moved to DashboardHeader
  return null;
};

export default ModuleOverview;
