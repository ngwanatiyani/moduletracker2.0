
import React from "react";
import { TrendingUp, Edit3, Save, X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Assessment {
  id: string;
  name: string;
  type: string;
  grade: number | null;
  weight: number;
  status: 'completed' | 'pending';
}

interface Term {
  name: string;
  weight: number;
  assessments: Assessment[];
}

interface TermCardProps {
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

const TermCard: React.FC<TermCardProps> = ({
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
  const hasCompleted = term.assessments.some(a => a.status === 'completed');

  return (
    <Card 
      className="shadow-lg transition-all duration-300 hover-scale border-0 animate-fade-in" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>{term.name}</span>
          <TrendingUp className="w-4 h-4 text-gray-400" />
        </CardTitle>
        <CardDescription>Weight: {term.weight}%</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {term.assessments.map((assessment, assessmentIndex) => (
          <div key={assessmentIndex} className="border rounded-lg p-3 bg-gray-50">
            {editingAssessment === assessment.id ? (
              <div className="space-y-2">
                <div>
                  <Label htmlFor="name" className="text-xs font-medium">Assessment Name</Label>
                  <Input
                    id="name"
                    value={tempAssessment.name || ''}
                    onChange={(e) => setTempAssessment(prev => ({ ...prev, name: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-xs font-medium">Type</Label>
                  <Input
                    id="type"
                    value={tempAssessment.type || ''}
                    onChange={(e) => setTempAssessment(prev => ({ ...prev, type: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="grade" className="text-xs font-medium">Grade (%)</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="100"
                      value={tempAssessment.grade || ''}
                      onChange={(e) => setTempAssessment(prev => ({ ...prev, grade: e.target.value ? Number(e.target.value) : null }))}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-xs font-medium">Weight (%)</Label>
                    <Input
                      id="weight"
                      type="number"
                      min="1"
                      max="100"
                      value={tempAssessment.weight || ''}
                      onChange={(e) => setTempAssessment(prev => ({ ...prev, weight: Number(e.target.value) }))}
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={onSaveAssessment} size="sm" className="flex-1">
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button onClick={onCancelEdit} variant="outline" size="sm" className="flex-1">
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium">{assessment.name}</div>
                    <div className="text-xs text-gray-500">{assessment.type}</div>
                  </div>
                  <Button
                    onClick={() => onEditAssessment(assessment.id, assessment)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Grade:</span>
                  <span className={`font-medium ${
                    assessment.status === 'pending' 
                      ? 'text-gray-500' 
                      : getGradeColor(assessment.grade || 0)
                  }`}>
                    {assessment.status === 'pending' || assessment.grade === null
                      ? 'Not Entered' 
                      : `${assessment.grade}%`
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Weight:</span>
                  <span className="font-medium">{assessment.weight}%</span>
                </div>
              </>
            )}
          </div>
        ))}
        <hr className="my-3" />
        <div className={`font-medium ${getGradeColor(termAverage)}`}>
          Term Average: {hasCompleted ? `${termAverage}%` : 'No Data'}
        </div>
        <div className="text-sm text-gray-600">
          Status: {hasCompleted ? (termAverage >= 50 ? 'Passing' : 'At Risk') : 'No Assessments Completed'}
        </div>
        <Button 
          variant="link" 
          className="text-blue-500 p-0 h-auto hover:text-blue-600 transition-colors"
          onClick={() => onAddAssessment(term.name)}
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default TermCard;
