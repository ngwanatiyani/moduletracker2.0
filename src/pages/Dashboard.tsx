
import { useState } from "react";
import { GraduationCap, Calculator } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ModuleSelector from "@/components/ModuleSelector";
import UserProfile from "@/components/UserProfile";
import ModuleOverview from "@/components/ModuleOverview";
import TermCard from "@/components/TermCard";
import GradeProjection from "@/components/GradeProjection";
import AcademicSupport from "@/components/AcademicSupport";

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

const Dashboard = () => {
  const [selectedYear] = useState("2nd");
  const [selectedModule, setSelectedModule] = useState("Application Development 2");
  const [editingAssessment, setEditingAssessment] = useState<string | null>(null);
  const [tempAssessment, setTempAssessment] = useState<Partial<Assessment>>({});
  const [showStudyTips, setShowStudyTips] = useState(false);
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

  const getDefaultModuleData = () => [
    {
      name: "Term 1",
      weight: 30,
      assessments: [
        { id: "1", name: "Term Test 1", type: "Test", grade: null, weight: 15, status: 'pending' as const },
        { id: "2", name: "Assignment 1", type: "Assignment", grade: null, weight: 10, status: 'pending' as const },
        { id: "3", name: "Project", type: "Project", grade: null, weight: 5, status: 'pending' as const }
      ]
    },
    {
      name: "Term 2", 
      weight: 30,
      assessments: [
        { id: "4", name: "Term Test 2", type: "Test", grade: null, weight: 15, status: 'pending' as const },
        { id: "5", name: "Assignment 2", type: "Assignment", grade: null, weight: 10, status: 'pending' as const },
        { id: "6", name: "Quiz", type: "Quiz", grade: null, weight: 5, status: 'pending' as const }
      ]
    },
    {
      name: "Term 3",
      weight: 40,
      assessments: [
        { id: "7", name: "Term 3 Exam", type: "Exam", grade: null, weight: 25, status: 'pending' as const },
        { id: "8", name: "Final Project", type: "Project", grade: null, weight: 15, status: 'pending' as const }
      ]
    }
  ];

  const [moduleData, setModuleData] = useState<Record<string, Term[]>>(() => {
    const initialData: Record<string, Term[]> = {};
    modules.forEach(module => {
      initialData[module] = getDefaultModuleData();
    });
    return initialData;
  });

  const calculateTermAverage = (term: Term) => {
    const completedAssessments = term.assessments.filter(a => a.status === 'completed' && a.grade !== null);
    if (completedAssessments.length === 0) return 0;
    
    const totalWeight = completedAssessments.reduce((sum, a) => sum + a.weight, 0);
    const weightedSum = completedAssessments.reduce((sum, a) => sum + ((a.grade || 0) * a.weight), 0);
    
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  const calculateOverallGrade = () => {
    const terms = moduleData[selectedModule] || [];
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    terms.forEach(term => {
      const completedAssessments = term.assessments.filter(a => a.status === 'completed' && a.grade !== null);
      completedAssessments.forEach(assessment => {
        totalWeightedGrade += (assessment.grade || 0) * assessment.weight;
        totalWeight += assessment.weight;
      });
    });

    return totalWeight > 0 ? Math.round(totalWeightedGrade / totalWeight) : 0;
  };

  const handleEditAssessment = (assessmentId: string, assessment: Assessment) => {
    setEditingAssessment(assessmentId);
    setTempAssessment({ ...assessment });
  };

  const handleSaveAssessment = () => {
    if (!editingAssessment || !tempAssessment.name || tempAssessment.weight === undefined) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (tempAssessment.grade !== null && tempAssessment.grade !== undefined) {
      if (tempAssessment.grade < 0 || tempAssessment.grade > 100) {
        toast({
          title: "Invalid Grade",
          description: "Grade must be between 0 and 100.",
          variant: "destructive"
        });
        return;
      }
    }

    if (tempAssessment.weight < 1 || tempAssessment.weight > 100) {
      toast({
        title: "Invalid Weight",
        description: "Weight must be between 1 and 100.",
        variant: "destructive"
      });
      return;
    }

    setModuleData(prev => {
      const newData = { ...prev };
      const terms = newData[selectedModule];
      
      terms.forEach(term => {
        const assessmentIndex = term.assessments.findIndex(a => a.id === editingAssessment);
        if (assessmentIndex !== -1) {
          term.assessments[assessmentIndex] = {
            ...term.assessments[assessmentIndex],
            ...tempAssessment,
            status: tempAssessment.grade !== null && tempAssessment.grade !== undefined ? 'completed' : 'pending'
          } as Assessment;
        }
      });
      
      return newData;
    });

    setEditingAssessment(null);
    setTempAssessment({});
    
    toast({
      title: "Assessment Updated",
      description: "Assessment has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditingAssessment(null);
    setTempAssessment({});
  };

  const handleAddAssessment = (termName: string) => {
    const newAssessment: Assessment = {
      id: Date.now().toString(),
      name: "New Assessment",
      type: "Assignment",
      grade: null,
      weight: 5,
      status: 'pending'
    };

    setModuleData(prev => {
      const newData = { ...prev };
      const terms = newData[selectedModule];
      const termIndex = terms.findIndex(t => t.name === termName);
      
      if (termIndex !== -1) {
        terms[termIndex].assessments.push(newAssessment);
      }
      
      return newData;
    });

    toast({
      title: "Assessment Added",
      description: `New assessment added to ${termName}`,
    });
  };

  const handleCalculateRequiredMarks = () => {
    const overallGrade = calculateOverallGrade();
    const totalPossibleWeight = moduleData[selectedModule]?.reduce((sum, term) => 
      sum + term.assessments.reduce((termSum, assessment) => termSum + assessment.weight, 0), 0) || 0;
    
    const completedWeight = moduleData[selectedModule]?.reduce((sum, term) => 
      sum + term.assessments.filter(a => a.status === 'completed').reduce((termSum, assessment) => termSum + assessment.weight, 0), 0) || 0;
    
    const remainingWeight = totalPossibleWeight - completedWeight;
    const currentWeightedGrade = overallGrade * completedWeight / 100;
    
    const requiredForPass = Math.max(0, ((50 * totalPossibleWeight / 100) - currentWeightedGrade) / remainingWeight * 100);
    const requiredForDistinction = Math.max(0, ((75 * totalPossibleWeight / 100) - currentWeightedGrade) / remainingWeight * 100);

    toast({
      title: "Grade Calculator Results",
      description: `To pass (50%): Need ${Math.round(requiredForPass)}% in remaining assessments. For distinction (75%): Need ${Math.round(requiredForDistinction)}%`,
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
  const isStudentStruggling = overallGrade > 0 && overallGrade < 50;

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
          <ModuleSelector
            selectedYear={selectedYear}
            modules={modules}
            selectedModule={selectedModule}
            onModuleSelect={setSelectedModule}
          />
          <UserProfile selectedModule={selectedModule} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 animate-fade-in">
          <ModuleOverview
            selectedModule={selectedModule}
            overallGrade={overallGrade}
            getGradeColor={getGradeColor}
            getProgressColor={getProgressColor}
          />

          {/* Terms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {currentTerms.map((term, index) => (
              <TermCard
                key={term.name}
                term={term}
                index={index}
                calculateTermAverage={calculateTermAverage}
                getGradeColor={getGradeColor}
                editingAssessment={editingAssessment}
                tempAssessment={tempAssessment}
                onEditAssessment={handleEditAssessment}
                onSaveAssessment={handleSaveAssessment}
                onCancelEdit={handleCancelEdit}
                onAddAssessment={handleAddAssessment}
                setTempAssessment={setTempAssessment}
              />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GradeProjection
              overallGrade={overallGrade}
              getGradeColor={getGradeColor}
              onCalculateRequiredMarks={handleCalculateRequiredMarks}
            />
            <AcademicSupport
              overallGrade={overallGrade}
              isStudentStruggling={isStudentStruggling}
              showStudyTips={showStudyTips}
              setShowStudyTips={setShowStudyTips}
            />
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
