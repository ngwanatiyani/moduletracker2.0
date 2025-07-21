# ModuleTracker - Your Academic Success Hub

ModuleTracker is a academic progress tracking platform designed specifically for 2nd year AppDev students at the Cape Peninsula University of Technology (CPUT). This platform provides a modern 3D interface with smart analytics, progress monitoring, performance insights, and academic support tools to empower students in managing their modules, tracking their grades, and achieving their academic goals.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Core Components](#core-components)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)

---

## Overview

ModuleTracker is built to help students:
- Track progress across all modules and terms.
- Visualize analytics through beautiful charts and 3D stats.
- Get personalized study tips and academic support.
- Manage assessments, grades, and module requirements efficiently.
- Connect with tutoring resources and academic support.


This platform targets 2nd year Application Development students, but its design is extensible for all CPUT students.

---

## Key Features

- **Modern 3D Dashboard:** Interactive cards and charts for visualizing academic data.
- **Module & Term Management:** Switch between modules, view term breakdowns, and edit assessments.
- **Performance Analytics:** Real-time analytics of grades, completion rates, and progress trends.
- **Grade Calculator:** Calculate potential final grades and required marks for targets.
- **Study Tips & Strategies:** In-app dialog with actionable study techniques.
- **Academic Support:** Book tutoring sessions directly from the dashboard.
- **AI Chatbot:** Gemini-powered assistant for platform help and academic queries.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Professional Look:** Follows modern UI/UX conventions with glassmorphism and gradient backgrounds.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Java
- **State Management:** React Context, useState
- **UI Components:** Radix UI, Lucide Icons, Shadcn/UI
- **Charts:** Recharts
- **Forms & Validation:** React Hook Form
- **AI Integration:** Google Generative AI (Gemini)
- **Tooltips, Dialogs, Toasts:** Radix UI, Sonner
- **Persistence:** LocalStorage (demo), ready for backend integration

---

## Screenshots

> _Screenshots feature:_
- **Modern home page**
 <img width="1919" height="878" alt="Screenshot 2025-07-21 104423" src="https://github.com/user-attachments/assets/f1f3f174-1c4a-4bcb-9270-6e19085fd72a" />
 -
 <img width="1916" height="891" alt="Screenshot 2025-07-21 104441" src="https://github.com/user-attachments/assets/5ccbe1b2-7a89-451c-aac7-5b0f300e3c6c" />
 -
 <img width="1917" height="879" alt="Screenshot 2025-07-21 104459" src="https://github.com/user-attachments/assets/d2f8eb47-20fa-44f5-ace7-2a72f3fcb55f" />

- Term breakdown cards and assessment editing
- Performance metrics and grade calculator
- Study tips dialog and tutoring booking form

- Gemini-powered chatbot for help

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ngwanatiyani/moduletracker2.0.git
   cd moduletracker2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

> _Note: The platform uses localStorage for demo data persistence. Replace with real backend as needed._

---

## Project Structure

```
src/
 ├─ components/        # Reusable UI components (cards, buttons, forms, navigation)
 ├─ dashboard/         # Dashboard-specific components (header, stats, sidebar, analytics)
 ├─ contexts/          # React Context for authentication, state
 ├─ data/              # Module/assessment mock data
 ├─ hooks/             # Custom React hooks (toast, scroll position)
 ├─ lib/               # Utilities and configuration
 ├─ pages/             # Page-level components (Home, Dashboard, Signup, Login)
 ├─ App.tsx            # Main app entry
 └─ main.tsx           # ReactDOM entry
```

---

## Core Components

- **DashboardContent:** Main dashboard grid with header, stats, module dropdown, analytics, and sidebars.
- **ModuleDropdown & ModuleSelector:** Select current module to view/edit.
- **Stats3D & AnalyticsSection:** 3D stats and charts for grades, progress, and term comparison.
- **ModernTermCard:** Editable term cards for viewing and updating assessments.
- **PerformanceMetrics & ActionPanel:** Insights, grade calculator, and actions for academic support.
- **StudyTips & TutoringBooking:** Dialogs for study advice and tutoring session booking.
- **Chatbot:** Gemini-powered AI assistant for platform and academic queries.
- **Navigation (ScrollAdaptiveNav, HomeNavigation):** Responsive navigation adapting to scroll and device.
- **Footer & ProfessionalFooter:** Branded footer with contact info and CPUT attribution.

---

## Contributing

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new feature branch.
3. Commit your changes with clear messages.
4. Push to your fork and submit a PR.

Before submitting, please:
- Write clear, concise code and comments.
- Add/modify components in the `src/components` directory.
- Test your changes on both desktop and mobile.
- Ensure there are no lint or type errors.

---

## Contact

- **Support Email:** support@moduletracker.edu
- **Phone:** +27 21 460 3779
- **Location:** Cape Peninsula University of Technology

---

## License

© 2025 ModuleTracker - Group 2 CPUT  
Supervisor: S. Tswane  

---
