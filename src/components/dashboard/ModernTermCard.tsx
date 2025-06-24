
import React from "react";
import { Calendar, Plus, Edit3, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="bg-white/95 backdrop-blur-sm border border-slate-200/50 hover:shadow-lg transition-all duration-300 h-fit">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-md flex items-center justify-center flex-shrink-0">
              <Calendar className="w-3 h-3 text-white" />
            </div>
            <span className="truncate">{term.name}</span>
          </CardTitle>
          <div className={`text-lg font-bold ${getGradeColor(termAverage)} flex-shrink-0`}>
            {termAverage > 0 ? `${termAverage}%` : '--'}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">Progress</span>
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              {completedCount}/{totalCount}
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-4 pb-4">
        {term.assessments.map((assessment) => (
          <div key={assessment.id} className="bg-slate-50/80 rounded-lg p-2.5 border border-slate-200/50">
            {editingAssessment === assessment.id ? (
              <div className="space-y-2">
                <Input
                  value={tempAssessment.name || ''}
                  onChange={(e) => setTempAssessment({ ...tempAssessment, name: e.target.value })}
                  placeholder="Assessment name"
                  className="text-xs h-8"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    value={tempAssessment.grade || ''}
                    onChange={(e) => setTempAssessment({ ...tempAssessment, grade: e.target.value ? Number(e.target.value) : null })}
                    placeholder="Grade"
                    className="text-xs h-8"
                  />
                  <Input
                    type="number"
                    value={tempAssessment.weight || ''}
                    onChange={(e) => setTempAssessment({ ...tempAssessment, weight: Number(e.target.value) })}
                    placeholder="Weight %"
                    className="text-xs h-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={onSaveAssessment} className="flex-1 h-7 text-xs">
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={onCancelEdit} className="flex-1 h-7 text-xs">
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="font-medium text-xs text-slate-900 truncate">{assessment.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 truncate">
                    {assessment.type} • {assessment.weight}%
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`text-xs font-semibold ${getGradeColor(assessment.grade || 0)}`}>
                    {assessment.grade !== null ? `${assessment.grade}%` : 'Pending'}
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEditAssessment(assessment.id, assessment)}
                    className="w-6 h-6 p-0 hover:bg-slate-200"
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
          className="w-full border-dashed border-slate-300 hover:border-orange-400 hover:bg-orange-50 text-slate-600 hover:text-orange-600 h-8 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModernTermCard;
