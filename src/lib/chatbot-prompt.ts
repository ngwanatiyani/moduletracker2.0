
export const businessRules = `
1. User Authentication Rules
- Every student must use their student number to create an account.
- Once logged in, the system will remember the user's login information.
- Students can change their account details whenever they need.

2. Module Configuration Rules
- Based on the selected year, the system will show the relevant subjects for that year.
- Students can pick both required (compulsory) and extra (elective) subjects.
- The system's module choices will match what's officially required by the university.

3. Assessment of Configuration Rules
- Each subject has different assessment types: tests, assignments, projects, and exams.
- Students can adjust how much each assessment type counts towards their final grade, according to university rules.
- The system allows changes to the assessment setup if needed.

4. Term Weighting Rules
- Students must enter the weights for each term.
- The system will check that the entered weights follow the university's rules.
- All term weights must add up to exactly 100%.

5. Grade Entry Rules
- Students must enter their grades for tests, assignments, etc.
- Each grade entered will have a timestamp.
- Grades are entered as percentages (0% to 100%).

6. Calculation Rules
- The system automatically calculates final grades based on entered weights and grades.
- Students can see their current grade as it's updated.
- Calculations follow the official university grading system.

7. Progress Tracking Rules
- Progress is updated after each assessment.
- Visual indicators show the student's performance.
- Students can track progress in every subject they are enrolled in.

8. Intervention System Rules
- If students score below 50% in the first or second terms, the system will alert them.
- Students struggling below 50% in the first two terms will be recommended for tutoring.
- If students score below 50% in the third term, tutoring is mandatory.

9. Grade Projection Rules
- The system calculates the minimum grades needed to pass the course.
- Projections consider all remaining assessments and their weights.
- Projections are updated every time new grades are entered.

10. Data Storage Rules
- All student data is saved locally on the student's device.
- No student data is sent to external servers or databases.
- Students can access their data without an internet connection.

11. Multiple Module Support Rules
- Students can track progress in multiple subjects at the same time.
- The system supports subjects from different years of study.
- Navigation between subjects is smooth and user-friendly.

12. General System Rules
- This is a standalone system, not connected to other university systems.
- It is exclusively for Application Development students at the university.
- The system does not need an external database.
- Student data is kept secure and private.
- Students get real-time feedback on their academic status.
`;

export const projectData = {
  "version": "1.0",
  "training_data": {
    "intents": [
      {
        "name": "ask_about_platform",
        "examples": [
          "What is ModuleTracker?",
          "Explain the ModuleTracker project",
          "Tell me about the CPUT grade tracking app"
        ]
      },
      {
        "name": "ask_development_year",
        "examples": [
          "When was this developed?",
          "What year was ModuleTracker built?",
          "Is this a new project?"
        ]
      },
      {
        "name": "ask_target_users",
        "examples": [
          "Who can use ModuleTracker?",
          "Is this for 3rd-year students?",
          "Which CPUT students is this for?"
        ]
      },
      {
        "name": "ask_features",
        "examples": [
          "What can ModuleTracker do?",
          "List the features",
          "Does it have grade calculations?"
        ]
      },
      {
        "name": "ask_technology",
        "examples": [
          "What tech stack was used?",
          "Is this built with Java?",
          "What database does it use?"
        ]
      },
      {
        "name": "ask_frontend_tech",
        "examples": [
          "Which CSS frameworks were used?",
          "Did you use Bootstrap?",
          "Is Tailwind in the frontend?"
        ]
      }
    ],
    "entities": {
      "year": ["2025", "early 2025"],
      "users": ["2nd-year CPUT Application Development students"],
      "features": [
        "grade tracking",
        "tutoring alerts", 
        "progress dashboards",
        "exam projections"
      ],
      "tech": [
        "Java", 
        "Spring Boot",
        "H2 Database",
        "Thymeleaf"
      ],
      "frontend_tech": [
        "Tailwind CSS",
        "Bootstrap",
        "HTML/CSS"
      ]
    },
    "responses": [
      {
        "intent": "ask_about_platform",
        "response": "ModuleTracker is a Java-based standalone app developed in early 2025 by CPUT students to help 2nd-year Application Development students track grades, predict outcomes, and receive tutoring alerts. It simplifies academic progress monitoring with automated calculations and intervention systems.",
        "entities": {
          "year": "2025",
          "users": "2nd-year CPUT Application Development students"
        }
      },
      {
        "intent": "ask_development_year",
        "response": "The project was developed in early 2025 by Group 2 at CPUT under supervisor S. Tswane.",
        "entities": {
          "year": "2025",
          "team": "Group 2"
        }
      },
      {
        "intent": "ask_target_users",
        "response": "ModuleTracker is designed exclusively for 2nd-year CPUT Application Development students, with pre-loaded modules like ADT262S and PGM262S.",
        "entities": {
          "users": "2nd-year CPUT Application Development students"
        }
      },
      {
        "intent": "ask_features",
        "response": "Key features include: 1) Real-time grade calculations, 2) Tutoring alerts for at-risk students, 3) Exam grade projections, and 4) Offline access with H2 database.",
        "entities": {
          "features": [
            "grade tracking",
            "tutoring alerts",
            "progress dashboards"
          ]
        }
      },
      {
        "intent": "ask_technology",
        "response": "The tech stack includes: Backend - Java (Spring Boot, Spring Data JPA), Frontend - Thymeleaf with Tailwind CSS and Bootstrap, Database - Embedded H2.",
        "entities": {
          "tech": [
            "Java",
            "Spring Boot",
            "H2 Database"
          ],
          "frontend_tech": [
            "Tailwind CSS",
            "Bootstrap",
            "Thymeleaf"
          ]
        }
      },
      {
        "intent": "ask_frontend_tech",
        "response": "The frontend combines Thymeleaf templates with Tailwind CSS (for custom utilities) and Bootstrap (for responsive components) to create a user-friendly interface.",
        "entities": {
          "frontend_tech": [
            "Tailwind CSS",
            "Bootstrap",
            "Thymeleaf"
          ]
        }
      }
    ],
    "follow_up_questions": [
      {
        "trigger_intent": "ask_technology",
        "questions": [
          "Why use both Tailwind and Bootstrap?",
          "Is the frontend mobile-friendly?",
          "What's Thymeleaf's role?"
        ],
        "responses": [
          "Bootstrap accelerated UI development while Tailwind allowed granular design control.",
          "Yes, Bootstrap's responsive grid ensures mobile compatibility.",
          "Thymeleaf handles server-side HTML rendering for dynamic content."
        ]
      }
    ]
  },
  "metadata": {
    "project": "ModuleTracker",
    "institution": "CPUT",
    "development_year": "2025",
    "team": "Group 2"
  }
};

const getResponseForIntent = (userMessage: string): string | null => {
  const message = userMessage.toLowerCase();
  
  // Check for platform-related questions
  if (message.includes('moduletracker') || message.includes('platform') || message.includes('app') || message.includes('project')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_about_platform')?.response || null;
  }
  
  // Check for development year questions
  if (message.includes('when') || message.includes('year') || message.includes('developed') || message.includes('built')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_development_year')?.response || null;
  }
  
  // Check for target users questions
  if (message.includes('who') || message.includes('students') || message.includes('users') || message.includes('cput')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_target_users')?.response || null;
  }
  
  // Check for features questions
  if (message.includes('features') || message.includes('what can') || message.includes('do') || message.includes('calculations')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_features')?.response || null;
  }
  
  // Check for technology questions
  if (message.includes('tech') || message.includes('java') || message.includes('database') || message.includes('spring')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_technology')?.response || null;
  }
  
  // Check for frontend technology questions
  if (message.includes('css') || message.includes('bootstrap') || message.includes('tailwind') || message.includes('frontend')) {
    return projectData.training_data.responses.find(r => r.intent === 'ask_frontend_tech')?.response || null;
  }
  
  return null;
};

export const systemPrompt = `You are a helpful assistant for the ModuleTracker platform. Your name is ModuleTracker Assistant.

Your primary role is to answer questions based ONLY on the provided business rules and project training data. Do not use any external knowledge for questions about the platform. If a question about the platform is outside the scope of these rules, politely decline to answer.

You can also engage in basic conversation, such as greetings and answering questions about who you are ("Who are you?", "Are you a robot?", "What can you do?").

When asked who you are, identify yourself as the ModuleTracker Assistant, an AI designed to help students with the ModuleTracker platform.

When asked what you can do, explain that you can answer questions about the platform's features and rules based on the provided business logic.

For project-specific questions, use the training data provided. Here's how to respond to common questions:

1. About the Platform: ModuleTracker is a Java-based standalone app developed in early 2025 by CPUT students to help 2nd-year Application Development students track grades, predict outcomes, and receive tutoring alerts.

2. Development Year: The project was developed in early 2025 by Group 2 at CPUT under supervisor S. Tswane.

3. Target Users: ModuleTracker is designed exclusively for 2nd-year CPUT Application Development students, with pre-loaded modules like ADT262S and PGM262S.

4. Features: Key features include real-time grade calculations, tutoring alerts for at-risk students, exam grade projections, and offline access with H2 database.

5. Technology: The tech stack includes Backend - Java (Spring Boot, Spring Data JPA), Frontend - Thymeleaf with Tailwind CSS and Bootstrap, Database - Embedded H2.

6. Frontend Technology: The frontend combines Thymeleaf templates with Tailwind CSS (for custom utilities) and Bootstrap (for responsive components) to create a user-friendly interface.

Always be friendly and polite.

Here are the business rules for the platform:

${businessRules}

When responding to questions, first check if they match any of the project-specific intents, then fall back to the business rules if needed.
`;
