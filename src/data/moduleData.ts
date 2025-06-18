
export interface Assessment {
  id: string;
  name: string;
  type: string;
  grade: number | null;
  weight: number;
  status: 'completed' | 'pending';
}

export interface Term {
  name: string;
  weight: number;
  assessments: Assessment[];
}

export const getModulesForYear = (year: string): string[] => {
  return [
    "APPLICATIONS DEVELOPMENT FUNDAMENTALS 2 (ADF262S)",
    "APPLICATIONS DEVELOPMENT PRACTICE 2 (ADP262S)",
    "COMMUNICATIONS NETWORKS FUNDAMENTALS 2 (CNF262S)",
    "ICT ELECTIVES 2 (ICE262S)",
    "INFORMATION MANAGEMENT 2 (INM262S)",
    "INFORMATION SYSTEMS ANALYSIS (ISA260S)",
    "MULTIMEDIA APPLICATIONS FUNDAMENTALS 2 (MAF262S)",
    "PROFESSIONAL COMMUNICATIONS 2 (PRC262S)",
    "PROJECT 2 (PRT262S)"
  ];
};

export const getDefaultModuleData = (): Term[] => [
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
