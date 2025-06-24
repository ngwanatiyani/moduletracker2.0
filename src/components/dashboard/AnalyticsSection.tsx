
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, Target, Award } from "lucide-react";
import { Term } from "@/data/moduleData";

interface AnalyticsSectionProps {
  currentTerms: Term[];
  calculateTermAverage: (term: Term) => number;
  overallGrade: number;
  getGradeColor: (grade: number) => string;
}

const chartConfig = {
  grade: {
    label: "Grade",
    color: "hsl(var(--chart-1))",
  },
  progress: {
    label: "Progress",
    color: "hsl(var(--chart-2))",
  },
};

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  currentTerms,
  calculateTermAverage,
  overallGrade,
  getGradeColor
}) => {
  const termData = currentTerms.map(term => ({
    name: term.name.replace('Term ', 'T'),
    grade: calculateTermAverage(term),
    completed: term.assessments.filter(a => a.status === 'completed').length,
    total: term.assessments.length,
    progress: term.assessments.length > 0 ? Math.round((term.assessments.filter(a => a.status === 'completed').length / term.assessments.length) * 100) : 0
  }));

  const gradeDistribution = [
    { name: "Distinction (75-100%)", value: termData.filter(t => t.grade >= 75).length, color: "#10b981" },
    { name: "Merit (65-74%)", value: termData.filter(t => t.grade >= 65 && t.grade < 75).length, color: "#3b82f6" },
    { name: "Pass (50-64%)", value: termData.filter(t => t.grade >= 50 && t.grade < 65).length, color: "#f59e0b" },
    { name: "Fail (<50%)", value: termData.filter(t => t.grade > 0 && t.grade < 50).length, color: "#ef4444" },
  ].filter(item => item.value > 0);

  const progressData = currentTerms.map((term, index) => ({
    week: `Week ${index * 6 + 1}`,
    grade: calculateTermAverage(term),
    target: 65
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      {/* Performance Trend */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Performance Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig} className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="grade" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeDasharray="5 5" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Term Comparison */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Award className="w-4 h-4 text-green-600" />
            Term Comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig} className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={termData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="grade" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      {gradeDistribution.length > 0 && (
        <Card className="shadow-sm border-0 bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Target className="w-4 h-4 text-purple-600" />
              Grade Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <ChartContainer config={chartConfig} className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}

      {/* Progress Overview */}
      <Card className="shadow-sm border-0 bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Calendar className="w-4 h-4 text-orange-600" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <ChartContainer config={chartConfig} className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={termData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="progress" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
