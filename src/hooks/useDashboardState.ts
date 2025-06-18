
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Assessment, Term, getModulesForYear, getDefaultModuleData } from "@/data/moduleData";

export const useDashboardState = () => {
  const [selectedYear] = useState("2nd");
  const [selectedModule, setSelectedModule] = useState("APPLICATIONS DEVELOPMENT FUNDAMENTALS 2 (ADF262S)");
  const [editingAssessment, setEditingAssessment] = useState<string | null>(null);
  const [tempAssessment, setTempAssessment] = useState<Partial<Assessment>>({});
  const [showStudyTips, setShowStudyTips] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const modules = getModulesForYear(selectedYear);

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

  return {
    selectedYear,
    selectedModule,
    setSelectedModule,
    editingAssessment,
    tempAssessment,
    setTempAssessment,
    showStudyTips,
    setShowStudyTips,
    sidebarOpen,
    setSidebarOpen,
    modules,
    moduleData,
    calculateTermAverage,
    calculateOverallGrade,
    handleEditAssessment,
    handleSaveAssessment,
    handleCancelEdit,
    handleAddAssessment,
    handleCalculateRequiredMarks,
    handleLogout,
    getGradeColor,
    getProgressColor
  };
};
