
// Business Rules Definition
export const businessRules = `
1. User Authentication
- Students must register using their official student number.
- Once logged in, user credentials are securely stored for seamless future access.

2. Module Selection
- Compulsory and elective subjects can be selected, in alignment with university requirements.
- Module options strictly reflect official university regulations.

3. Assessment Configuration
- Subjects include assessments such as tests, assignments, projects, and exams.
- Students may adjust the weighting of each assessment type, adhering to university grading policies.
- Assessment settings can be modified as necessary.

4. Term Weight Management
- Students input term weightings.
- The system validates that term weights follow university guidelines.
- All term weights combined must equal 100%.

5. Grade Entry
- Students record grades for each assessment type.
- Each grade entry is timestamped for tracking.
- Grades must be entered as percentages (0–100%).

6. Grade Calculation
- Final grades are automatically computed based on input weights and grades.
- Students receive live updates of their grades.
- All calculations conform to the university's official grading system.

7. Progress Tracking
- Progress indicators update after each assessment.
- Visual cues display student performance.
- Progress can be tracked for every enrolled subject.

8. Intervention and Support
- An alert is triggered if a student scores below 50% in the first or second terms.
- Early intervention via tutoring is recommended for students at risk.
- Tutoring becomes mandatory if a student scores below 50% in the third term.

9. Grade Projection
- The system estimates minimum required grades to pass based on remaining assessments and their weights.
- Projections are dynamically updated with each new grade entry.

10. Data Privacy & Storage
- All student data is stored locally on the device.
- No data is transmitted or saved to external servers.

11. Multi-Module Tracking
- Students can monitor progress across multiple subjects and years.
- Switching between subjects is intuitive and efficient.

12. Pass Mark
- The pass mark is 50% or more.

13. System Scope & Security
- This is a standalone platform, not linked to any university systems.
- Exclusively for Application Development students at CPUT.
- No external database is required.
- Student data is protected and kept confidential.
- Real-time feedback is provided on academic performance.
`;

// Project Data Definition
export const projectData = {
  version: "1.0",
  training_data: {
    intents: [
      {
        name: "platform_overview",
        examples: [
          "What is ModuleTracker?",
          "Describe ModuleTracker",
          "Tell me about the grade tracking system"
        ]
      },
      {
        name: "development_details",
        examples: [
          "When was ModuleTracker made?",
          "What year was it developed?",
          "Who built this app?"
        ]
      },
      {
        name: "target_audience",
        examples: [
          "Who should use ModuleTracker?",
          "Is it for 2nd-year students?",
          "Which students is this for?"
        ]
      },
      {
        name: "feature_list",
        examples: [
          "What features does it offer?",
          "List ModuleTracker's features",
          "Does it handle grade calculations?"
        ]
      },
      {
        name: "technology_stack",
        examples: [
          "What technologies were used?",
          "Is this a Java app?",
          "What database powers it?"
        ]
      },
      {
        name: "frontend_stack",
        examples: [
          "Which CSS frameworks were used?",
          "Did you use Bootstrap or Tailwind?",
          "Frontend technologies?"
        ]
      }
    ],
    entities: {
      year: ["2025", "early 2025"],
      users: ["2nd-year CPUT Application Development students"],
      features: [
        "grade tracking",
        "tutoring alerts",
        "progress dashboards",
        "exam grade projections",
        "offline access"
      ],
      tech: [
        "Java",
        "Spring Boot",
        "H2 Database",
        "Thymeleaf"
      ],
      frontend_tech: [
        "Tailwind CSS",
        "Bootstrap",
        "HTML/CSS",
        "Thymeleaf"
      ]
    },
    responses: [
      {
        intent: "platform_overview",
        response: "ModuleTracker is a standalone Java application developed in early 2025 at CPUT. It enables 2nd-year Application Development students to track grades, get performance projections, and receive proactive tutoring alerts, all with a focus on privacy.",
        entities: {
          year: "2025",
          users: "2nd-year CPUT Application Development students"
        }
      },
      {
        intent: "development_details",
        response: "ModuleTracker was created in early 2025 by Group 2 (Tiyani, Hanyani, Yolanda, jaytee, and Matinisa) at CPUT, supervised by S. Tswane.",
        entities: {
          year: "2025",
          team: "Group 2 (Tiyani, Hanyani, Yolanda, jaytee, and Matinisa)"
        }
      },
      {
        intent: "target_audience",
        response: "The app is built specifically for 2nd-year Application Development students at CPUT, with modules like ADT262S and PRT262S included.",
        entities: {
          users: "2nd-year CPUT Application Development students"
        }
      },
      {
        intent: "feature_list",
        response: "Major features: 1) Real-time grade calculations, 2) Automated tutoring alerts, 3) Grade projections, 4) Progress dashboards, and 5) Offline access with local data storage.",
        entities: {
          features: [
            "grade tracking",
            "tutoring alerts",
            "progress dashboards",
            "exam grade projections",
            "offline access"
          ]
        }
      },
      {
        intent: "technology_stack",
        response: "Technology overview: Java (Spring Boot, Spring Data JPA) for backend, Thymeleaf for frontend templates, H2 Database for local data storage, with Tailwind CSS and Bootstrap for styling.",
        entities: {
          tech: [
            "Java",
            "Spring Boot",
            "H2 Database",
            "Thymeleaf"
          ],
          frontend_tech: [
            "Tailwind CSS",
            "Bootstrap"
          ]
        }
      },
      {
        intent: "frontend_stack",
        response: "Frontend uses Thymeleaf templates, Tailwind CSS for custom styles, and Bootstrap for responsive layouts, delivering a clean and flexible user experience.",
        entities: {
          frontend_tech: [
            "Tailwind CSS",
            "Bootstrap",
            "Thymeleaf"
          ]
        }
      }
    ],
    follow_up_questions: [
      {
        trigger_intent: "technology_stack",
        questions: [
          "Why use both Tailwind and Bootstrap?",
          "Is it mobile-friendly?",
          "What does Thymeleaf do?"
        ],
        responses: [
          "Bootstrap offers rapid UI development, while Tailwind allows fine-tuned design control.",
          "Yes, Bootstrap's grid system ensures mobile compatibility.",
          "Thymeleaf manages server-side rendering for dynamic HTML content."
        ]
      },
      {
        trigger_intent: "feature_list",
        questions: [
          "How does the tutoring alert system work?",
          "Can I see an example of grade projection?",
          "Is my data secure in offline mode?"
        ],
        responses: [
          "The tutoring alert system automatically flags students who score below 50% in assessments, with mandatory intervention after third term underperformance.",
          "Grade projection calculates the minimum scores needed on remaining assessments to achieve your target grade, updating in real-time as you enter new grades.",
          "Yes, all data is stored locally on your device using encryption, with no external transmission or storage, as outlined in our data privacy rules."
        ]
      },
      {
        trigger_intent: "platform_overview",
        questions: [
          "What year level is it designed for?",
          "Does it integrate with the university system?",
          "Who developed ModuleTracker?"
        ],
        responses: [
          "ModuleTracker is specifically designed for 2nd-year Application Development students at CPUT.",
          "No, ModuleTracker is a standalone platform that operates independently from university systems, with a focus on privacy and offline access.",
          "ModuleTracker was developed by Group 2 (Tiyani, Hanyani, Yolanda, Jaytee, and Matinisa) in early 2025, supervised by S. Tswane at CPUT."
        ]
      }
    ]
  },
  metadata: {
    project: "ModuleTracker",
    institution: "CPUT",
    development_year: "2025",
    team: "Group 2 (Tiyani, Hanyani, Yolanda, Jaytee, and Matinisa)"
  }
};

// IMPROVED INTENT RECOGNITION SYSTEM
function matchIntent(userMessage: string): { intent: string | null, confidence: number, entities: string[] } {
  const msg = userMessage.toLowerCase().trim();
  
  // Create scoring system for more accurate matching
  const scores = {
    platform_overview: 0,
    development_details: 0,
    target_audience: 0,
    feature_list: 0,
    technology_stack: 0,
    frontend_stack: 0
  };
  
  // Entity recognition for better context understanding
  const detectedEntities = [];
  
  // Platform overview keywords
  if (msg.includes('moduletracker')) {
    scores.platform_overview += 2;
    detectedEntities.push('system_name');
  }
  if (msg.includes('what is') && (msg.includes('platform') || msg.includes('app'))) {
    scores.platform_overview += 3;
    detectedEntities.push('definition_request');
  }
  if (msg.includes('about') && msg.includes('system')) {
    scores.platform_overview += 2;
  }
  if (msg.includes('tell me about') || msg.includes('describe')) {
    scores.platform_overview += 1;
    detectedEntities.push('description_request');
  }
  
  // Development details keywords
  if (msg.includes('when') && (msg.includes('made') || msg.includes('created'))) {
    scores.development_details += 3;
    detectedEntities.push('time_question');
  }
  if (msg.includes('year') && msg.includes('developed')) {
    scores.development_details += 3;
    detectedEntities.push('time_question');
  }
  if (msg.includes('who') && (msg.includes('built') || msg.includes('developed'))) {
    scores.development_details += 3;
    detectedEntities.push('creator_question');
  }
  if (msg.includes('group') || msg.includes('team')) {
    scores.development_details += 2;
    detectedEntities.push('team_reference');
  }
  
  // Target audience keywords
  if (msg.includes('who') && (msg.includes('for') || msg.includes('use'))) {
    scores.target_audience += 3;
    detectedEntities.push('user_question');
  }
  if (msg.includes('students') && msg.includes('which')) {
    scores.target_audience += 3;
    detectedEntities.push('student_reference');
  }
  if (msg.includes('target') && msg.includes('audience')) {
    scores.target_audience += 4;
    detectedEntities.push('audience_reference');
  }
  if (msg.includes('2nd-year') || msg.includes('second year')) {
    scores.target_audience += 2;
    detectedEntities.push('year_specification');
  }
  
  // Feature list keywords
  if (msg.includes('features')) {
    scores.feature_list += 3;
    detectedEntities.push('features_request');
  }
  if (msg.includes('what') && msg.includes('do')) {
    scores.feature_list += 2;
    detectedEntities.push('capability_question');
  }
  if (msg.includes('functions') || msg.includes('capabilities')) {
    scores.feature_list += 3;
    detectedEntities.push('capability_reference');
  }
  if (msg.includes('calculate') || msg.includes('track')) {
    scores.feature_list += 1;
    detectedEntities.push('feature_specific');
  }
  
  // Technology stack keywords
  if (msg.includes('technology') || msg.includes('tech stack')) {
    scores.technology_stack += 3;
    detectedEntities.push('technology_request');
  }
  if (msg.includes('built with') || msg.includes('developed with')) {
    scores.technology_stack += 2;
    detectedEntities.push('technology_reference');
  }
  if (msg.includes('java') || msg.includes('spring') || msg.includes('database')) {
    scores.technology_stack += 2;
    detectedEntities.push('specific_technology');
  }
  if (msg.includes('backend') && !msg.includes('frontend')) {
    scores.technology_stack += 2;
    detectedEntities.push('backend_reference');
  }
  
  // Frontend stack keywords
  if (msg.includes('frontend') || msg.includes('ui')) {
    scores.frontend_stack += 3;
    detectedEntities.push('frontend_reference');
  }
  if (msg.includes('css') || msg.includes('bootstrap') || msg.includes('tailwind')) {
    scores.frontend_stack += 3;
    detectedEntities.push('styling_technology');
  }
  if (msg.includes('interface') || msg.includes('design')) {
    scores.frontend_stack += 1;
    detectedEntities.push('design_reference');
  }
  if (msg.includes('thymeleaf') || msg.includes('html')) {
    scores.frontend_stack += 2;
    detectedEntities.push('template_technology');
  }
  
  // Business rules keywords - map to specific rule numbers
  const businessRulesKeywords = {
    'authentication': 1, 'login': 1, 'register': 1, 'student number': 1,
    'module': 2, 'subject': 2, 'elective': 2, 'compulsory': 2,
    'assessment': 3, 'tests': 3, 'assignments': 3, 'exams': 3, 
    'weight': 4, 'term weight': 4, '100%': 4,
    'grade entry': 5, 'percentages': 5, 'timestamp': 5,
    'calculation': 6, 'compute': 6, 'final grade': 6,
    'progress': 7, 'tracking': 7, 'indicators': 7,
    'intervention': 8, 'tutor': 8, 'support': 8, 'below 50%': 8,
    'projection': 9, 'estimate': 9, 'minimum required': 9,
    'privacy': 10, 'storage': 10, 'local': 10, 'data': 10,
    'multiple subjects': 11, 'multi-module': 11, 'across subjects': 11,
    'pass mark': 12, '50%': 12,
    'security': 13, 'standalone': 13, 'external database': 13
  };
  
  // Check for business rule related queries
  for (const [keyword, ruleNum] of Object.entries(businessRulesKeywords)) {
    if (msg.includes(keyword.toLowerCase())) {
      detectedEntities.push(`business_rule_${ruleNum}`);
    }
  }
  
  // Find the highest score
  const maxScore = Math.max(...Object.values(scores));
  const threshold = 1.5; // Threshold to avoid false positives
  
  if (maxScore > threshold) {
    const intent = Object.keys(scores).find(key => scores[key] === maxScore);
    return { 
      intent: intent || null, 
      confidence: maxScore / 4, // Normalize confidence score (0-1)
      entities: detectedEntities 
    };
  }
  
  return { intent: null, confidence: 0, entities: detectedEntities };
}

// ADVANCED FEATURES IMPLEMENTATION
// Implement conversation context and memory
const conversationContext = {
  history: [],
  currentTopic: null,
  followUpQuestions: {},
  sessionStartTime: new Date(),
  userMetadata: {
    name: '',
    lastInteraction: null,
    preferredTopics: []
  },
  businessRuleInterest: {
    recentlyDiscussed: [],
    frequentlyAsked: {}
  }
};

function updateConversationContext(userMessage: string, botResponse: string, matchedIntent: string | null, entities: string[] = []) {
  const timestamp = new Date();
  
  // Add to history
  conversationContext.history.push({
    role: 'user',
    message: userMessage,
    timestamp: timestamp
  });
  
  conversationContext.history.push({
    role: 'assistant',
    message: botResponse,
    timestamp: timestamp,
    intent: matchedIntent,
    entities: entities
  });
  
  // Update current topic if we matched an intent
  if (matchedIntent) {
    conversationContext.currentTopic = matchedIntent;
    
    // Track user interests for personalization
    if (!conversationContext.userMetadata.preferredTopics.includes(matchedIntent)) {
      conversationContext.userMetadata.preferredTopics.push(matchedIntent);
    }
  }
  
  // Track business rule interests
  const businessRuleEntities = entities.filter(e => e.startsWith('business_rule_'));
  if (businessRuleEntities.length > 0) {
    businessRuleEntities.forEach(rule => {
      const ruleNum = rule.split('_')[2];
      
      // Add to recently discussed
      if (!conversationContext.businessRuleInterest.recentlyDiscussed.includes(ruleNum)) {
        conversationContext.businessRuleInterest.recentlyDiscussed.unshift(ruleNum);
        // Keep only last 3 discussed rules
        conversationContext.businessRuleInterest.recentlyDiscussed = 
          conversationContext.businessRuleInterest.recentlyDiscussed.slice(0, 3);
      }
      
      // Add to frequently asked
      conversationContext.businessRuleInterest.frequentlyAsked[ruleNum] = 
        (conversationContext.businessRuleInterest.frequentlyAsked[ruleNum] || 0) + 1;
    });
  }
  
  // Update last interaction time
  conversationContext.userMetadata.lastInteraction = timestamp;
  
  // Keep history manageable (last 10 exchanges)
  if (conversationContext.history.length > 20) {
    conversationContext.history = conversationContext.history.slice(-20);
  }
}

function getContextualFollowUp(intent: string | null, entities: string[]): string | null {
  if (!intent) {
    // Check if we have business rule entities that we can use for follow-up
    const businessRuleEntities = entities.filter(e => e.startsWith('business_rule_'));
    if (businessRuleEntities.length > 0) {
      const ruleNum = businessRuleEntities[0].split('_')[2];
      
      // Suggest related rules based on the current rule
      const relatedRules = {
        '1': ['How do students change their account details?', 'Is there a password recovery system?'],
        '2': ['How does module selection work across different years?', 'Can students change module selections after term starts?'],
        '3': ['Can you explain how assessment configuration affects final grades?', 'Are there limits to how much each assessment can be weighted?'],
        '4': ['What happens if term weights don't add up to 100%?', 'Can term weights be adjusted mid-semester?'],
        '5': ['Can grades be edited after they're entered?', 'How is the grade history tracked?'],
        '6': ['How frequently are grades updated in the system?', 'Can you explain the university's grading system?'],
        '7': ['What visual indicators are used for progress tracking?', 'How do progress dashboards work?'],
        '8': ['What specific support is offered for struggling students?', 'How are tutoring interventions implemented?'],
        '9': ['How accurate are the grade projections?', 'Can projections account for dropped assignments?'],
        '10': ['How is student data protected on the device?', 'Is there any way to back up the data?'],
        '11': ['Can you compare performance across multiple modules?', 'How many subjects can be tracked at once?'],
        '12': ['Are distinction levels shown for grades above the pass mark?', 'What happens if a student is borderline passing?'],
        '13': ['What security measures protect student data?', 'Why was a standalone system chosen instead of integration?']
      };
      
      if (relatedRules[ruleNum]) {
        return `Would you like to know: ${relatedRules[ruleNum][Math.floor(Math.random() * relatedRules[ruleNum].length)]}`;
      }
    }
    
    return null;
  }
  
  // Find follow-up questions for the current intent
  const followUp = projectData.training_data.follow_up_questions.find(f => 
    f.trigger_intent === intent
  );
  
  if (followUp && followUp.questions.length > 0) {
    // Choose a follow-up question that hasn't been used recently if possible
    const recentFollowUps = conversationContext.followUpQuestions[intent] || [];
    const availableQuestions = followUp.questions.filter(q => !recentFollowUps.includes(q));
    
    if (availableQuestions.length > 0) {
      const selectedQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      
      // Remember we used this follow-up
      if (!conversationContext.followUpQuestions[intent]) {
        conversationContext.followUpQuestions[intent] = [];
      }
      conversationContext.followUpQuestions[intent].push(selectedQuestion);
      
      return selectedQuestion;
    } else if (followUp.questions.length > 0) {
      // If all have been used, reset and start over
      conversationContext.followUpQuestions[intent] = [];
      return followUp.questions[0];
    }
  }
  
  return null;
}

// FEATURE COMPLETION AND CORRECTIONS
function extractBusinessRule(ruleNumber: number): string {
  const rules = businessRules.split('\n');
  let ruleSection = "";
  let inRelevantSection = false;
  
  for (const line of rules) {
    if (line.startsWith(`${ruleNumber}.`)) {
      inRelevantSection = true;
      ruleSection += line + '\n';
    } else if (inRelevantSection && /^\d+\./.test(line)) {
      break;
    } else if (inRelevantSection) {
      ruleSection += line + '\n';
    }
  }
  
  return ruleSection.trim();
}

function getBusinessRuleSuggestions(entities: string[]): string | null {
  // Extract rule numbers from entities
  const ruleNumbers = entities
    .filter(e => e.startsWith('business_rule_'))
    .map(e => parseInt(e.split('_')[2]));
  
  if (ruleNumbers.length === 0) return null;
  
  // Get the most relevant rule
  const primaryRuleNum = ruleNumbers[0];
  
  // Find related rules that might be interesting based on this rule
  const relatedRules: Record<number, number[]> = {
    1: [2, 10, 13],   // Authentication relates to Module Selection, Privacy, Security
    2: [1, 3, 11],    // Module Selection relates to Authentication, Assessment, Multi-Module
    3: [4, 6, 9],     // Assessment relates to Term Weight, Grade Calculation, Projection
    4: [3, 5, 6],     // Term Weight relates to Assessment, Grade Entry, Calculation
    5: [4, 6, 7],     // Grade Entry relates to Term Weight, Calculation, Progress
    6: [4, 5, 9],     // Calculation relates to Term Weight, Grade Entry, Projection
    7: [5, 8, 9],     // Progress relates to Grade Entry, Intervention, Projection
    8: [7, 9, 12],    // Intervention relates to Progress, Projection, Pass Mark
    9: [6, 7, 8],     // Projection relates to Calculation, Progress, Intervention
    10: [1, 13],      // Privacy relates to Authentication, Security
    11: [2, 7],       // Multi-Module relates to Module Selection, Progress
    12: [6, 8, 9],    // Pass Mark relates to Calculation, Intervention, Projection
    13: [1, 10]       // Security relates to Authentication, Privacy
  };
  
  // If we have related rules, suggest one
  if (relatedRules[primaryRuleNum]) {
    const suggestedRuleNum = relatedRules[primaryRuleNum][Math.floor(Math.random() * relatedRules[primaryRuleNum].length)];
    const suggestedRuleTitle = extractBusinessRule(suggestedRuleNum).split('\n')[0].replace(/^\d+\.\s*/, '');
    return `You might also be interested in our "${suggestedRuleTitle}" rule.`;
  }
  
  return null;
}

// ENHANCED RESPONSE GENERATOR
export function getChatbotResponse(userMessage: string): string {
  // Get current time for personalized greetings
  const currentDate = new Date("2025-07-20T18:57:52.000Z"); // Using the provided timestamp
  const currentHour = currentDate.getHours();
  
  let timeGreeting = "";
  if (currentHour < 12) timeGreeting = "Good morning";
  else if (currentHour < 18) timeGreeting = "Good afternoon";
  else timeGreeting = "Good evening";
  
  // Check for basic greetings first
  if (
    userMessage.toLowerCase().includes('hello') ||
    userMessage.toLowerCase().includes('hi') ||
    userMessage.toLowerCase().match(/^(hey|greetings)/)
  ) {
    const userName = conversationContext.userMetadata.name;
    const greeting = userName ? 
      `${timeGreeting}, ${userName}! How can I help you with ModuleTracker today?` : 
      `${timeGreeting}! How can I assist you with ModuleTracker today?`;
    
    updateConversationContext(userMessage, greeting, null);
    return greeting;
  }
  
  // Look for name introduction
  const nameMatch = userMessage.match(/my name is ([A-Za-z]+)/i) || 
                    userMessage.match(/I'm ([A-Za-z]+)/i) ||
                    userMessage.match(/I am ([A-Za-z]+)/i);
  
  if (nameMatch && nameMatch[1]) {
    conversationContext.userMetadata.name = nameMatch[1];
    const response = `Nice to meet you, ${nameMatch[1]}! How can I help you with ModuleTracker today?`;
    updateConversationContext(userMessage, response, null);
    return response;
  }
  
  // Match intents using the improved intent matching system
  const { intent, confidence, entities } = matchIntent(userMessage);
  
  // Check for business rule specific questions
  const businessRuleEntities = entities.filter(e => e.startsWith('business_rule_'));
  if (businessRuleEntities.length > 0 && 
      (userMessage.toLowerCase().includes('rule') || 
       userMessage.toLowerCase().includes('how does') || 
       userMessage.toLowerCase().includes('explain'))) {
    
    // Get the rule number
    const ruleNum = parseInt(businessRuleEntities[0].split('_')[2]);
    const ruleSection = extractBusinessRule(ruleNum);
    
    if (ruleSection) {
      const ruleSuggestion = getBusinessRuleSuggestions(entities);
      let response = `Here's information about that specific business rule:\n\n${ruleSection}`;
      
      if (ruleSuggestion) {
        response += `\n\n${ruleSuggestion}`;
      }
      
      updateConversationContext(userMessage, response, null, entities);
      return response;
    }
  }
  
  if (intent) {
    const response = projectData.training_data.responses.find(r => r.intent === intent);
    if (response) {
      // Consider adding context-aware follow-up suggestions
      const followUpQuestion = getContextualFollowUp(intent, entities);
      let enhancedResponse = response.response;
      
      if (followUpQuestion) {
        enhancedResponse += `\n\nYou might also want to know: ${followUpQuestion}`;
      }
      
      // If we detected specific entities, we might want to tailor the response further
      if (entities.includes('specific_technology') && intent === 'technology_stack') {
        if (userMessage.toLowerCase().includes('java')) {
          enhancedResponse += `\n\nParticularly, ModuleTracker uses Java with Spring Boot for robust backend services and dependency injection.`;
        } else if (userMessage.toLowerCase().includes('database')) {
          enhancedResponse += `\n\nThe H2 Database was specifically chosen to enable offline functionality while maintaining SQL querying capabilities.`;
        }
      }
      
      updateConversationContext(userMessage, enhancedResponse, intent, entities);
      return enhancedResponse;
    }
  }
  
  // If intent not matched, check for business rule questions
  if (
    userMessage.toLowerCase().includes('rules') ||
    userMessage.toLowerCase().includes('how does it work')
  ) {
    // Try to identify specific rule interest
    const ruleKeywords = {
      'auth': 1, 'login': 1, 'register': 1,
      'module': 2, 'subject': 2, 'selection': 2,
      'assessment': 3, 'config': 3,
      'term': 4, 'weight': 4,
      'grade entry': 5, 'enter grade': 5,
      'calculation': 6, 'compute': 6, 'final grade': 6,
      'progress': 7, 'tracking': 7, 'monitor': 7,
      'intervention': 8, 'tutor': 8, 'support': 8,
      'projection': 9, 'predict': 9, 'estimate': 9,
      'privacy': 10, 'storage': 10, 'data': 10,
      'multi': 11, 'multiple': 11,
      'pass': 12, 'mark': 12,
      'security': 13, 'standalone': 13
    };
    
    // Find the most relevant rule section
    let relevantRuleNumber = 0;
    
    for (const [keyword, ruleNum] of Object.entries(ruleKeywords)) {
      if (userMessage.toLowerCase().includes(keyword)) {
        relevantRuleNumber = ruleNum;
        break;
      }
    }
    
    if (relevantRuleNumber > 0) {
      // Extract the specific rule section
      const ruleSection = extractBusinessRule(relevantRuleNumber);
      
      const businessRuleEntity = `business_rule_${relevantRuleNumber}`;
      const ruleSuggestion = getBusinessRuleSuggestions([businessRuleEntity]);
      
      let response = `Here's information about that specific business rule:\n\n${ruleSection}`;
      
      if (ruleSuggestion) {
        response += `\n\n${ruleSuggestion}`;
      }
      
      updateConversationContext(userMessage, response, null, [businessRuleEntity]);
      return response;
    }
    
    const response = `Here are the main business rules for ModuleTracker:\n${businessRules}`;
    updateConversationContext(userMessage, response, null);
    return response;
  }
  
  // Improved identity responses
  if (userMessage.toLowerCase().includes('who are you') || userMessage.toLowerCase().includes('your name')) {
    const response = "I am ModuleTracker Assistant, an AI designed to help CPUT students with the ModuleTracker platform. I can answer questions about features, requirements, and how to use the system effectively.";
    updateConversationContext(userMessage, response, null);
    return response;
  }
  
  if (
    userMessage.toLowerCase().includes('what can you do') ||
    userMessage.toLowerCase().includes('help me') ||
    userMessage.toLowerCase().includes('your purpose')
  ) {
    const response = "I can help you with:\n\n• Understanding ModuleTracker's features and capabilities\n• Explaining the business rules that govern the system\n• Providing information about grade calculations and projections\n• Describing how interventions and tutoring support work\n• Answering questions about the technology behind ModuleTracker\n\nWhat specific aspect would you like to learn more about?";
    updateConversationContext(userMessage, response, null);
    return response;
  }
  
  // Context-aware fallback response with suggestions based on conversation history
  const recentIntents = conversationContext.history
    .filter(item => item.role === 'assistant' && item.intent)
    .map(item => item.intent)
    .slice(-3);
  
  let suggestedTopic = "";
  
  // If user has shown interest in certain topics, suggest related questions
  if (recentIntents.includes('technology_stack')) {
    suggestedTopic = "You could ask about the frontend technologies used in ModuleTracker.";
  } else if (recentIntents.includes('feature_list')) {
    suggestedTopic = "You might want to ask about how grade projections work.";
  } else if (businessRuleEntities.length > 0) {
    // If they've been asking about business rules, suggest related rules
    const ruleNum = parseInt(businessRuleEntities[0].split('_')[2]);
    
    const relatedRules: Record<number, string> = {
      1: "authentication or login process",
      2: "module selection options",
      3: "assessment configuration options",
      4: "term weight management",
      5: "grade entry procedures",
      6: "grade calculation methods",
      7: "progress tracking features",
      8: "intervention and tutoring system",
      9: "grade projection functionality",
      10: "data privacy and storage",
      11: "tracking multiple modules",
      12: "pass mark requirements",
      13: "system security features"
    };
    
    if (relatedRules[ruleNum]) {
      suggestedTopic = `You might want to learn more about the ${relatedRules[ruleNum]}.`;
    }
  } else if (conversationContext.history.length < 3) {
    // For new conversations, suggest fundamental questions
    suggestedTopic = "You could start by asking what ModuleTracker is or what features it offers.";
  } else {
    // General suggestions
    const suggestions = [
      "what is ModuleTracker?",
      "how does grade calculation work?",
      "what technology is used in ModuleTracker?",
      "who is the target audience for ModuleTracker?"
    ];
    suggestedTopic = `You could ask about ${suggestions[Math.floor(Math.random() * suggestions.length)]}`;
  }
  
  const response = `I'm not sure I understand that question. I'm specialized in answering questions about the ModuleTracker platform. ${suggestedTopic}`;
  updateConversationContext(userMessage, response, null, entities);
  return response;
}

// Session analytics functionality
export function getSessionAnalytics() {
  if (conversationContext.history.length === 0) {
    return "No conversation data available yet.";
  }
  
  const totalMessages = conversationContext.history.length;
  const userMessages = conversationContext.history.filter(msg => msg.role === 'user').length;
  
  // Calculate most discussed topics
  const topicCounts: Record<string, number> = {};
  conversationContext.history
    .filter(msg => msg.role === 'assistant' && msg.intent)
    .forEach(msg => {
      topicCounts[msg.intent!] = (topicCounts[msg.intent!] || 0) + 1;
    });
  
  // Calculate most discussed business rules
  const ruleCounts: Record<string, number> = {};
  conversationContext.history
    .filter(msg => msg.role === 'assistant' && msg.entities)
    .forEach(msg => {
      const ruleEntities = msg.entities!.filter(e => e.startsWith('business_rule_'));
      ruleEntities.forEach(rule => {
        const ruleNum = rule.split('_')[2];
        ruleCounts[ruleNum] = (ruleCounts[ruleNum] || 0) + 1;
      });
    });
  
  // Format analytics
  const topicsSection = Object.keys(topicCounts).length > 0 ? 
    "Most discussed topics:\n" + Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => `- ${topic}: ${count} times`)
      .join('\n') :
    "No specific topics have been discussed yet.";
  
  const rulesSection = Object.keys(ruleCounts).length > 0 ?
    "\n\nMost discussed business rules:\n" + Object.entries(ruleCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([ruleNum, count]) => {
        const ruleName = extractBusinessRule(parseInt(ruleNum)).split('\n')[0].replace(/^\d+\.\s*/, '');
        return `- Rule ${ruleNum} (${ruleName}): ${count} times`;
      })
      .join('\n') :
    "\n\nNo specific business rules have been discussed yet.";
  
  const sessionDuration = Math.round((new Date().getTime() - conversationContext.sessionStartTime.getTime()) / 60000);
  
  return `Session Analytics:\n- Total messages: ${totalMessages}\n- User messages: ${userMessages}\n- Session duration: ${sessionDuration} minutes\n\n${topicsSection}${rulesSection}`;
}

// IMPROVED SYSTEM PROMPT
export const systemPrompt = `
You are ModuleTracker Assistant, an intelligent AI chatbot for the ModuleTracker platform developed by CPUT Group 2.

CORE CAPABILITIES:
- Use advanced intent recognition to understand user queries about ModuleTracker
- Provide context-aware responses that maintain conversational continuity
- Offer personalized interactions by remembering user preferences and conversation history
- Suggest relevant follow-up questions based on the current topic
- Extract and explain specific business rules when requested

RESPONSE FRAMEWORK:
1. For platform overview questions: Explain that ModuleTracker is a standalone Java application for CPUT Application Development students, focusing on grade tracking, projections, and tutoring alerts with privacy-focused offline access.

2. For development inquiries: Mention it was created in early 2025 by Group 2 (Tiyani, Hanyani, Yolanda, Jaytee, and Matinisa) under S. Tswane's supervision.

3. For target audience questions: Clarify that it's built for 2nd-year Application Development students at CPUT, with specific modules like ADT262S and PRT262S included.

4. For feature requests: Detail the five key features - real-time grade calculations, automated tutoring alerts, grade projections, progress dashboards, and offline functionality.

5. For technology questions: Explain the stack includes Java (Spring Boot), Thymeleaf templates, H2 Database, with Tailwind CSS and Bootstrap for styling.

6. For frontend inquiries: Describe how Thymeleaf templates combine with Tailwind CSS and Bootstrap to create a responsive, modern UI.

7. For business rule questions: Provide the specific rule requested, or summarize the relevant category. Always reference the official business rules.

CONVERSATION STYLE:
- Maintain a friendly, educational tone appropriate for university students
- Use concise language but provide comprehensive information
- Include bullet points for clarity when listing multiple items
- Recognize when users introduce themselves and personalize subsequent interactions
- Adapt your responses based on conversation context and user interests
- Timestamp: July 20, 2025, 18:57:52 UTC

BUSINESS RULES AWARENESS:
Always ensure your responses align with ModuleTracker's business rules, especially regarding:
- Authentication requirements (Rule 1)
- Module selection guidelines (Rule 2)
- Assessment configuration limitations (Rule 3)
- Term weight requirements (Rule 4)
- Grade entry specifications (Rule 5)
- Calculation methodology (Rule 6)
- Progress tracking features (Rule 7)
- Intervention thresholds (Rule 8 - 50% rule for tutoring)
- Grade projection capabilities (Rule 9)
- Data privacy guarantees (Rule 10)
- Multi-module functionality (Rule 11)
- Pass mark threshold (Rule 12 - 50%)
- System security constraints (Rule 13)

When in doubt, prioritize accuracy over conversational flow, as students rely on correct information about their academic tools.
`;

// Export necessary functions and variables
export { matchIntent, conversationContext, getContextualFollowUp, extractBusinessRule, getBusinessRuleSuggestions, getSessionAnalytics };
