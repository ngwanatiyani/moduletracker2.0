
import React from "react";
import { Calendar, Plus, Edit3, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Assessment, Term } from "@/data/moduleData";

interface ModernTermCardProps {
  term: Term;
  index: number;
  calculateTermAverage: (term: Term) => number;
  getGradeColor: (grade: number) => string;
  editingAssessment: string | null;
  tempAssessment: Partial<Assessment>;
  onEditAssessment: (assessmentId: string, assessment: Assessment) => void;
  onSaveAssessment: () => void;
  onCancelEdit: () => void;
  onAddAssessment: (termName: string) => void;
  setTempAssessment: (assessment: Partial<Assessment>) => void;
}

const ModernTermCard: React.FC<ModernTermCardProps> = ({
  term,
  index,
  calculateTermAverage,
  getGradeColor,
  editingAssessment,
  tempAssessment,
  onEditAssessment,
  onSaveAssessment,
  onCancelEdit,
  onAddAssessment,
  setTempAssessment
}) => {
  const termAverage = calculateTermAverage(term);
  const completedCount = term.assessments.filter(a => a.status === 'completed').length;
  const totalCount = term.assessments.length;

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            {term.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {completedCount}/{totalCount}
            </Badge>
            <div className={`text-lg font-bold ${getGradeColor(termAverage)}`}>
              {termAverage > 0 ? `${termAverage}%` : '--'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {term.assessments.map((assessment) => (
          <div key={assessment.id} className="bg-slate-50/50 rounded-lg p-3 border border-slate-200/30">
            {editingAssessment === assessment.id ? (
              <div className="space-y-2">
                <Input
                  value={tempAssessment.name || ''}
                  onChange={(e) => setTempAssessment({ ...tempAssessment, name: e.target.value })}
                  placeholder="Assessment name"
                  className="text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={tempAssessment.grade || ''}
                    onChange={(e) => setTempAssessment({ ...tempAssessment, grade: e.target.value ? Number(e.target.value) : null })}
                    placeholder="Grade"
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    value={tempAssessment.weight || ''}
                    onChange={(e) => setTempAssessment({ ...tempAssessment, weight: Number(e.target.value) })}
                    placeholder="Weight %"
                    className="text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={onSaveAssessment} className="flex-1">
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={onCancelEdit} className="flex-1">
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm text-slate-800">{assessment.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {assessment.type} • Weight: {assessment.weight}%
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`text-sm font-semibold ${getGradeColor(assessment.grade || 0)}`}>
                    {assessment.grade !== null ? `${assessment.grade}%` : 'Pending'}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditAssessment(assessment.id, assessment)}
                    className="w-8 h-8 p-0"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddAssessment(term.name)}
          className="w-full mt-3 border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModernTermCard;
