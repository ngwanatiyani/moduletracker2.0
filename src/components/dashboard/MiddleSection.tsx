
import React from "react";
import AnalyticsSection from "./AnalyticsSection";
import ModernTermCard from "./ModernTermCard";
import { Term, Assessment } from "@/data/moduleData";

interface MiddleSectionProps {
  currentTerms: Term[];
  editingAssessment: string | null;
  tempAssessment: Partial<Assessment>;
  calculateTermAverage: (term: Term) => number;
  getGradeColor: (grade: number) => string;
  overallGrade: number;
  onEditAssessment: (assessmentId: string, assessment: Assessment) => void;
  onSaveAssessment: () => void;
  onCancelEdit: () => void;
  onAddAssessment: (termName: string) => void;
  setTempAssessment: (assessment: Partial<Assessment>) => void;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({
  currentTerms,
  editingAssessment,
  tempAssessment,
  calculateTermAverage,
  getGradeColor,
  overallGrade,
  onEditAssessment,
  onSaveAssessment,
  onCancelEdit,
  onAddAssessment,
  setTempAssessment
}) => {
  return (
    <div className="space-y-4">
      {/* Analytics Charts */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Performance Analytics</h2>
        <AnalyticsSection
          currentTerms={currentTerms}
          calculateTermAverage={calculateTermAverage}
          overallGrade={overallGrade}
          getGradeColor={getGradeColor}
        />
      </div>

      {/* Term Progress Cards */}
      <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/50 p-4">
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
    </div>
  );
};

export default MiddleSection;
