
import { useState } from "react";
import { GraduationCap, User, Plus, Calculator, TrendingUp, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Assessment {
  name: string;
  grade: number;
  weight: number;
  status: 'completed' | 'pending';
}

interface Term {
  name: string;
  weight: number;
  assessments: Assessment[];
}

const Dashboard = () => {
  const [selectedYear] = useState("1st");
  const [selectedModule, setSelectedModule] = useState("Application Development 1");
  const navigate = useNavigate();
  
  const getModulesForYear = (year: string) => {
    const baseModules = [
      "Application Development",
      "Business Practice", 
      "Communications Networks",
      "ICT Fundamentals",
      "Multimedia Foundations",
      "Professional Communications",
      "Programming",
      "Project"
    ];
    
    return baseModules.map(module => `${module} ${year.charAt(0)}`);
  };

  const modules = getModulesForYear(selectedYear);

  const [moduleData] = useState<Record<string, Term[]>>({
    "Application Development 1": [
      {
        name: "Term 1",
        weight: 30,
        assessments: [
          { name: "Term Test 1", grade: 75, weight: 15, status: 'completed' },
          { name: "Assignment 1", grade: 68, weight: 10, status: 'completed' },
          { name: "Project", grade: 72, weight: 5, status: 'completed' }
        ]
      },
      {
        name: "Term 2", 
        weight: 30,
        assessments: [
          { name: "Term Test 2", grade: 65, weight: 15, status: 'completed' },
          { name: "Assignment 2", grade: 70, weight: 10, status: 'completed' },
          { name: "Quiz", grade: 58, weight: 5, status: 'completed' }
        ]
      },
      {
        name: "Term 3",
        weight: 40,
        assessments: [
          { name: "Term 3 Exam", grade: 0, weight: 25, status: 'pending' },
          { name: "Final Project", grade: 0, weight: 15, status: 'pending' }
        ]
      }
    ]
  });

  const calculateTermAverage = (term: Term) => {
    const completedAssessments = term.assessments.filter(a => a.status === 'completed');
    if (completedAssessments.length === 0) return 0;
    
    const totalWeight = completedAssessments.reduce((sum, a) => sum + a.weight, 0);
    const weightedSum = completedAssessments.reduce((sum, a) => sum + (a.grade * a.weight), 0);
    
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  const calculateOverallGrade = () => {
    const terms = moduleData[selectedModule] || [];
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    terms.forEach(term => {
      const completedAssessments = term.assessments.filter(a => a.status === 'completed');
      completedAssessments.forEach(assessment => {
        totalWeightedGrade += assessment.grade * assessment.weight;
        totalWeight += assessment.weight;
      });
    });

    return totalWeight > 0 ? Math.round(totalWeightedGrade / totalWeight) : 0;
  };

  const handleAddAssessment = (termName: string) => {
    toast({
      title: "Add Assessment",
      description: `Feature to add assessment to ${termName} coming soon!`,
    });
  };

  const handleCalculateRequiredMarks = () => {
    toast({
      title: "Grade Calculator",
      description: "Opening grade calculator...",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const overallGrade = calculateOverallGrade();
  const currentTerms = moduleData[selectedModule] || [];

  const getGradeColor = (grade: number) => {
    if (grade >= 75) return "text-green-600";
    if (grade >= 65) return "text-blue-600";
    if (grade >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (grade: number) => {
    if (grade >= 75) return "bg-gradient-to-r from-green-400 to-green-600";
    if (grade >= 65) return "bg-gradient-to-r from-blue-400 to-blue-600";
    if (grade >= 50) return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    return "bg-gradient-to-r from-red-400 to-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-slate-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">ModuleTracker</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors duration-200">Home</Link>
            <span className="text-blue-400 font-medium">Dashboard</span>
            <button 
              onClick={handleLogout}
              className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-[calc(100vh-80px)] p-4 animate-slide-in-right">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Academic Year: {selectedYear} Year
            </h3>
            <div className="space-y-2">
              {modules.map((module, index) => (
                <div 
                  key={module}
                  onClick={() => setSelectedModule(module)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover-scale ${
                    selectedModule === module 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{module}</div>
                  {selectedModule === module && (
                    <div className="text-xs mt-1 opacity-90">Currently Selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 mt-8 border border-blue-100">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Ngwana Tiyani</div>
                <div className="text-sm text-gray-600">Student No: 24839292</div>
              </div>
            </div>
            <div className="text-blue-600 text-sm font-medium flex items-center gap-1">
              <Award className="w-3 h-3" />
              {selectedModule}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 animate-fade-in">
          {/* Module Overview Card */}
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  {selectedModule}
                </CardTitle>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${getGradeColor(overallGrade)}`}>{overallGrade}%</div>
                  <div className="text-sm text-gray-500">Overall</div>
                </div>
              </div>
              <CardDescription className="text-lg">
                Overall Progress: {overallGrade}% | Status: {overallGrade >= 50 ? 'Passing' : 'At Risk'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Progress value={overallGrade} className="h-8 bg-gray-200 overflow-hidden rounded-full shadow-inner" />
                <div 
                  className={`absolute top-0 left-0 h-8 rounded-full transition-all duration-1000 ease-out ${getProgressColor(overallGrade)}`}
                  style={{ width: `${overallGrade}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm drop-shadow">{overallGrade}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {currentTerms.map((term, index) => {
              const termAverage = calculateTermAverage(term);
              const hasCompleted = term.assessments.some(a => a.status === 'completed');
              
              return (
                <Card key={term.name} className={`shadow-lg transition-all duration-300 hover-scale border-0 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <span>{term.name}</span>
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                    </CardTitle>
                    <CardDescription>Weight: {term.weight}%</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {term.assessments.map((assessment, assessmentIndex) => (
                      <div key={assessmentIndex} className="flex justify-between items-center p-2 rounded bg-gray-50">
                        <span className="text-sm">{assessment.name}:</span>
                        <span className={`text-sm font-medium ${
                          assessment.status === 'pending' 
                            ? 'text-gray-500' 
                            : getGradeColor(assessment.grade)
                        }`}>
                          {assessment.status === 'pending' 
                            ? 'Pending' 
                            : `${assessment.grade}%`
                          } (weight: {assessment.weight}%)
                        </span>
                      </div>
                    ))}
                    <hr className="my-3" />
                    <div className={`font-medium ${getGradeColor(termAverage)}`}>
                      Term Average: {hasCompleted ? `${termAverage}%` : 'Not Available'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Status: {hasCompleted ? (termAverage >= 50 ? 'Passing' : 'At Risk') : 'Upcoming'}
                    </div>
                    <Button 
                      variant="link" 
                      className="text-blue-500 p-0 h-auto hover:text-blue-600 transition-colors"
                      onClick={() => handleAddAssessment(term.name)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Assessment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Projection */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Grade Projection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Overall Grade:</span>
                    <span className={`font-bold ${getGradeColor(overallGrade)}`}>{overallGrade}%</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    To achieve final pass (50%): Need minimum 23% in remaining assessments
                  </div>
                  <div className="text-sm text-gray-600">
                    To achieve distinction (75%): Need minimum 85% in remaining assessments
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transition-all duration-200 transform hover:scale-105"
                  onClick={handleCalculateRequiredMarks}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Required Marks
                </Button>
              </CardContent>
            </Card>

            {/* Academic Support */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Academic Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-green-600 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Your progress is good!
                </div>
                <div className="text-gray-600">No intervention needed at this time</div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    Study Tips
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Tutoring
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-center py-4">
        <p className="text-gray-400">© 2025 ModuleTracker - Ngwana-Tiyani</p>
      </footer>
    </div>
  );
};

export default Dashboard;
