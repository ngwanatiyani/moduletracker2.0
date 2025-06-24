
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { Term } from "@/data/moduleData";

interface PerformanceMetricsProps {
  currentTerms: Term[];
  calculateTermAverage: (term: Term) => number;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  currentTerms,
  calculateTermAverage,
  overallGrade,
  getGradeColor
}) => {
  const getPerformanceInsights = () => {
    const termGrades = currentTerms.map(term => calculateTermAverage(term)).filter(grade => grade > 0);
    if (termGrades.length < 2) return null;

    const trend = termGrades[termGrades.length - 1] - termGrades[termGrades.length - 2];
    const isImproving = trend > 5;
    const isDeclining = trend < -5;

    return {
      trend,
      isImproving,
      isDeclining,
      consistency: Math.max(0, 100 - (Math.max(...termGrades) - Math.min(...termGrades)))
    };
  };

  const insights = getPerformanceInsights();
  const targetGrade = 65;
  const progressToTarget = Math.min(100, (overallGrade / targetGrade) * 100);

  const getGradeStatus = (grade: number) => {
    if (grade >= 75) return { icon: Star, color: "text-green-600", bg: "bg-green-50", label: "Distinction" };
    if (grade >= 65) return { icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50", label: "Merit" };
    if (grade >= 50) return { icon: Minus, color: "text-yellow-600", bg: "bg-yellow-50", label: "Pass" };
    return { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50", label: "At Risk" };
  };

  const status = getGradeStatus(overallGrade);

  return (
    <div className="space-y-3">
      {/* Performance Status */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-slate-50/80 to-gray-50/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <status.icon className={`w-4 h-4 ${status.color}`} />
              Performance Status
            </span>
            <Badge variant="outline" className={`${status.bg} ${status.color} border-0`}>
              {status.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress to Target ({targetGrade}%)</span>
              <span className={getGradeColor(overallGrade)}>{overallGrade}%</span>
            </div>
            <Progress value={progressToTarget} className="h-2" />
          </div>
          
          {insights && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                {insights.isImproving ? (
                  <TrendingUp className="w-3 h-3 text-green-600" />
                ) : insights.isDeclining ? (
                  <TrendingDown className="w-3 h-3 text-red-600" />
                ) : (
                  <Minus className="w-3 h-3 text-gray-600" />
                )}
                <span className="text-slate-600">
                  {insights.isImproving ? 'Improving' : insights.isDeclining ? 'Declining' : 'Stable'}
                </span>
              </div>
              <div className="text-slate-600">
                Consistency: {Math.round(insights.consistency)}%
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Term Performance */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Term Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentTerms.map((term, index) => {
            const grade = calculateTermAverage(term);
            const completed = term.assessments.filter(a => a.status === 'completed').length;
            const total = term.assessments.length;
            const progress = total > 0 ? (completed / total) * 100 : 0;
            
            return (
              <div key={term.name} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-700">{term.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">{completed}/{total}</span>
                    <span className={`font-semibold ${getGradeColor(grade)}`}>
                      {grade > 0 ? `${grade}%` : '--'}
                    </span>
                  </div>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetrics;
