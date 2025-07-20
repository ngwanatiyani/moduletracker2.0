// Import Fuse.js for fuzzy search
import Fuse from 'fuse.js';

// Type definitions for intent, response, follow-ups
type Intent = {
  name: string;
  examples: string[];
};

type Response = {
  intent: string;
  response: string;
  entities?: Record<string, string | string[]>;
};

type FollowUp = {
  trigger_intent: string;
  questions: string[];
  responses: string[];
};

type TrainingData = {
  intents: Intent[];
  entities: Record<string, string[]>;
  responses: Response[];
  follow_up_questions: FollowUp[];
};

type ProjectData = {
  version: string;
  training_data: TrainingData;
  metadata: Record<string, string>;
};

declare const projectData: ProjectData;
declare const businessRules: string;

// --- Input Preprocessing ---
function preprocessInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove punctuation
    .trim();
}

// --- Fuzzy Search Setup ---
const fuse = new Fuse(projectData.training_data.intents, {
  keys: ['examples'],
  threshold: 0.32, // Tweak for best results
});

// --- Regex Fallbacks ---
const keywordIntents: { intent: string; regex: RegExp }[] = [
  { intent: 'ask_about_platform', regex: /\b(moduletracker|platform|app|project)\b/ },
  { intent: 'ask_development_year', regex: /\b(when|year|developed|built)\b/ },
  { intent: 'ask_target_users', regex: /\b(who|students|users|cput)\b/ },
  { intent: 'ask_features', regex: /\b(features|what can|do|calculations)\b/ },
  { intent: 'ask_technology', regex: /\b(tech|java|database|spring)\b/ },
  { intent: 'ask_frontend_tech', regex: /\b(css|bootstrap|tailwind|frontend)\b/ },
];

// --- Context Tracking ---
let lastIntent: string | null = null;

// --- Main Response Function ---
export function getChatbotResponse(userMessage: string): { response: string; followUps?: string[] } {
  // 1. Preprocess input
  const cleanedMessage = preprocessInput(userMessage);

  // 2. Fuzzy intent match
  let intentName: string | null = null;
  const fuseRes = fuse.search(cleanedMessage);
  if (fuseRes.length > 0) {
    intentName = fuseRes[0].item.name;
  } else {
    // 3. Regex fallback
    for (const mapping of keywordIntents) {
      if (mapping.regex.test(cleanedMessage)) {
        intentName = mapping.intent;
        break;
      }
    }
  }

  lastIntent = intentName;

  // 4. Find response
  let response = '';
  let followUps: string[] | undefined;

  if (intentName) {
    const intentResp = projectData.training_data.responses.find(r => r.intent === intentName);
    if (intentResp) {
      response = intentResp.response;
      // 5. Follow-up suggestions
      const followUpObj = projectData.training_data.follow_up_questions.find(f => f.trigger_intent === intentName);
      if (followUpObj) {
        followUps = followUpObj.questions;
      }
    }
  }

  // 6. Fallback to business rules if nothing matched
  if (!response) {
    // If the question is about who the bot is
    if (cleanedMessage.includes('who are you') || cleanedMessage.includes('your name') || cleanedMessage.includes('are you a robot')) {
      response = "I am the ModuleTracker Assistant, an AI designed to help students with the ModuleTracker platform.";
    }
    // If the question is about what the bot can do
    else if (cleanedMessage.includes('what can you do')) {
      response = "I can answer questions about ModuleTracker's features and rules based on the provided business logic.";
    }
    else {
      // General fallback
      response = "Sorry, I couldn't find an answer for that. You can ask about platform features, technology, or rules. Here are some business rules:\n\n" +
        businessRules.split('\n').slice(0, 10).join('\n') + "\n...";
    }
  }

  return { response, followUps };
}

// --- Example Testing Suite ---
if (typeof require !== 'undefined' && require.main === module) {
  // Dummy data for testing: replace with your real data!
  // @ts-ignore
  global.projectData = {
    version: "1.0",
    training_data: {
      intents: [
        { name: "ask_about_platform", examples: ["What is ModuleTracker?", "Tell me about the app"] },
        { name: "ask_development_year", examples: ["When was this developed?"] },
        { name: "ask_target_users", examples: ["Who can use ModuleTracker?"] },
        { name: "ask_features", examples: ["List the features"] },
        { name: "ask_technology", examples: ["Is this built with Java?"] },
        { name: "ask_frontend_tech", examples: ["Did you use Bootstrap?"] },
      ],
      entities: {},
      responses: [
        { intent: "ask_about_platform", response: "ModuleTracker is a Java-based standalone app." },
        { intent: "ask_development_year", response: "Developed in early 2025." },
        { intent: "ask_target_users", response: "It's for 2nd-year CPUT students." },
        { intent: "ask_features", response: "Features: grade tracking, alerts, projections." },
        { intent: "ask_technology", response: "Tech stack: Java, Spring Boot, H2." },
        { intent: "ask_frontend_tech", response: "Frontend: Thymeleaf, Tailwind, Bootstrap." },
      ],
      follow_up_questions: [
        {
          trigger_intent: "ask_technology",
          questions: [
            "Why use both Tailwind and Bootstrap?",
            "Is the frontend mobile-friendly?",
            "What's Thymeleaf's role?"
          ],
          responses: [
            "Bootstrap accelerated UI development while Tailwind allowed granular design control.",
            "Yes, Bootstrap's responsive grid ensures mobile compatibility.",
            "Thymeleaf handles server-side HTML rendering for dynamic content."
          ]
        }
      ]
    },
    metadata: {
      project: "ModuleTracker",
      institution: "CPUT",
      development_year: "2025",
      team: "Group 2"
    }
  };
  // @ts-ignore
  global.businessRules = `
1. User Authentication Rules
- Every student must use their student number to create an account.
- Every student must confirm their password on the registration form when creating an account.
- Once logged in, the system will remember the user's login information.
2. Module Configuration Rules
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
`;

  const testInputs = [
    "What is ModuleTracker?",
    "When was this developed?",
    "Who can use ModuleTracker?",
    "List the features",
    "Is this built with Java?",
    "Did you use Bootstrap?",
    "How do grades work?",
    "Who are you?",
    "What can you do?",
    "Random unrelated question"
  ];

  for (const msg of testInputs) {
    const result = getChatbotResponse(msg);
    console.log(`User: ${msg}`);
    console.log(`Bot: ${result.response}`);
    if (result.followUps) {
      console.log("Follow-up Suggestions:");
      for (const q of result.followUps) {
        console.log(" -", q);
      }
    }
    console.log("-----\n");
  }
}
