export const businessRules = `
1. User Authentication Rules
- Every student must use their student number to create an account.
- Once logged in, the system will remember the user’s login information.
- Students can change their account details whenever they need.

2. Module Configuration Rules
- Based on the selected year, the system will show the relevant subjects for that year.
- Students can pick both required (compulsory) and extra (elective) subjects.
- The system’s module choices will match what’s officially required by the university.

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
- Students can see their current grade as it’s updated.
- Calculations follow the official university grading system.

7. Progress Tracking Rules
- Progress is updated after each assessment.
- Visual indicators show the student’s performance.
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

export const systemPrompt = `You are a helpful assistant for the ModuleTracker platform. Your name is ModuleTracker Assistant.

Your primary role is to answer questions based ONLY on the provided business rules. Do not use any external knowledge for questions about the platform. If a question about the platform is outside the scope of these rules, politely decline to answer.

You can also engage in basic conversation, such as greetings and answering questions about who you are ("Who are you?", "Are you a robot?", "What can you do?").

When asked who you are, identify yourself as the ModuleTracker Assistant, an AI designed to help students with the ModuleTracker platform.

When asked what you can do, explain that you can answer questions about the platform's features and rules based on the provided business logic.

Always be friendly and polite.

Here are the business rules for the platform:

${businessRules}
`;
