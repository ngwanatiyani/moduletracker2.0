import { useState } from "react";
import { GraduationCap, Calculator, Menu, X, Bell, Settings, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ModuleSelector from "@/components/ModuleSelector";
import UserProfile from "@/components/UserProfile";
import ModuleOverview from "@/components/ModuleOverview";
import TermCard from "@/components/TermCard";
import GradeProjection from "@/components/GradeProjection";
import AcademicSupport from "@/components/AcademicSupport";
import Chatbot from "@/components/Chatbot";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 w-full overflow-x-hidden">
      {/* Modern Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 text-slate-800 p-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ModuleTracker</span>
              <div className="text-xs text-slate-500 hidden md:block">Academic Progress Dashboard</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <div className="flex items-center space-x-2 text-blue-600 font-medium">
              <Calculator className="w-4 h-4" />
              <span>Dashboard</span>
            </div>
            <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200">
              <Bell className="w-4 h-4" />
              <span>Alerts</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Modern Sidebar */}
        <div className={`
          fixed md:sticky top-0 left-0 z-50 md:z-auto
          w-80 md:w-72 bg-white/90 backdrop-blur-lg shadow-xl md:shadow-lg border-r border-slate-200/50 min-h-screen p-6
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:min-h-[calc(100vh-80px)]
          overflow-y-auto
        `}>
          {/* Close button for mobile */}
          <button
            className="md:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
          
          <ModuleSelector
            selectedYear={selectedYear}
            modules={modules}
            selectedModule={selectedModule}
            onModuleSelect={(module) => {
              setSelectedModule(module);
              setSidebarOpen(false);
            }}
          />
          <UserProfile selectedModule={selectedModule} />
        </div>

        {/* Modern Main Content */}
        <div className="flex-1 p-4 md:p-8 animate-fade-in max-w-full">
          <ModuleOverview
            selectedModule={selectedModule}
            overallGrade={overallGrade}
            getGradeColor={getGradeColor}
            getProgressColor={getProgressColor}
          />

          {/* Modern Terms Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
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

          {/* Modern Bottom Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

      <Chatbot />
      
      {/* Modern Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-slate-200/50 text-center py-6">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-600 text-sm">© 2025 ModuleTracker - Group 2 CPUT | Supervisor: S. Tswane</p>
          <p className="text-slate-500 text-xs mt-1">Java-based Academic Progress Tracking System</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
