
# EduNext – Smart Student Career Navigator (PWA)

## Vision & Theme

Based on the reference image, the app will use a vibrant colorful design with:
- Pastel-colored stat/info cards (orange, green, purple, teal, yellow gradients)
- Clean white card backgrounds with colored icon badges
- Bold typography with gradient text headings
- Bottom navigation bar (mobile-first)
- Glassmorphism effects on overlays and modals
- Blue + Purple primary gradient (EduNext brand)

---

## Phase 1 Build Plan (Complete Full App)

This is a large app. We will build all major screens in one go, using smart static data with Supabase auth integration.

---

## Technical Architecture

```text
src/
├── pages/
│   ├── Auth.tsx              (Login / OTP / Google)
│   ├── StudentType.tsx       (School vs College)
│   ├── SchoolMarks.tsx       (Class, Stream, Subjects)
│   ├── CollegeMarks.tsx      (Level, Course, Semesters, CGPA)
│   ├── Results.tsx           (Charts, Percentage, Grade)
│   ├── Recommendations.tsx   (Higher Studies + Jobs tabs)
│   ├── CollegeFinder.tsx     (State > District > Colleges)
│   ├── Jobs.tsx              (Govt + Private + Internships)
│   ├── Bookmarks.tsx         (Saved colleges/jobs)
│   ├── Profile.tsx           (User profile dashboard)
│   └── Index.tsx             (Redirect logic)
├── components/
│   ├── layout/
│   │   ├── BottomNav.tsx     (Mobile bottom navigation)
│   │   ├── AppHeader.tsx     (Top bar with back/menu)
│   │   └── PageWrapper.tsx   (Transitions + padding)
│   ├── cards/
│   │   ├── CourseCard.tsx
│   │   ├── CollegeCard.tsx
│   │   ├── JobCard.tsx
│   │   └── StatCard.tsx      (Colorful dashboard stat cards)
│   ├── marks/
│   │   ├── SchoolMarkEntry.tsx
│   │   ├── CollegeMarkEntry.tsx
│   │   └── SemesterForm.tsx
│   ├── charts/
│   │   ├── CircularProgress.tsx
│   │   └── GradeBarChart.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       └── ProfileSetup.tsx
├── data/
│   ├── courses.ts            (All Indian UG/PG/PhD courses)
│   ├── colleges.ts           (Tamil Nadu colleges by district)
│   ├── jobs.ts               (Govt + Private job data)
│   ├── districts.ts          (All TN districts)
│   ├── exams.ts              (Entrance exams data)
│   └── recommendations.ts   (Rule-based engine logic)
├── hooks/
│   ├── useAuth.ts
│   ├── useMarks.ts
│   └── useRecommendations.ts
└── lib/
    ├── calculations.ts       (CGPA, percentage, grade logic)
    └── pwa.ts                (PWA install prompt)
```

---

## Database Schema (Supabase)

SQL migrations to create the following tables:

**profiles** – User profile (linked to auth.users)
- id, full_name, phone, state, district, education_type, avatar_url, created_at

**marks** – Student marks entries
- id, user_id, student_type (school/college), class, stream, level, course, subjects (JSONB), cgpa, percentage, grade, semester_data (JSONB), created_at

**saved_items** – Bookmarks
- id, user_id, item_type (college/job/course), item_data (JSONB), created_at

All tables will have Row Level Security (RLS) enabled so users can only access their own data.

---

## Color Theme System

The colorful theme will use these pastel card colors:

| Card Type | Background | Icon Color |
|---|---|---|
| School Student | Orange gradient | #FF6B35 |
| College Student | Purple gradient | #7C3AED |
| Higher Studies | Blue gradient | #2563EB |
| Jobs | Green gradient | #16A34A |
| CGPA card | Teal gradient | #0891B2 |
| Exams card | Yellow gradient | #D97706 |

CSS variables will be updated with:
- Primary: Blue-Purple gradient
- Accent colors: Orange, Green, Teal, Yellow
- Background: Soft white (#F8FAFC)
- Cards: White with pastel tinted backgrounds

---

## App Flow

```text
/ (Index)
  └─> Not logged in ──> /auth (Login)
        └─> After login ──> /profile-setup (First time)
              └─> /student-type (School / College)
                    ├─> /school-marks (Class + Stream + Subjects)
                    │     └─> /results (Charts + Grade)
                    │           └─> /recommendations (Higher Studies | Jobs)
                    │                 ├─> /college-finder (State > District > Colleges)
                    │                 └─> /jobs (Govt | Private | Internships)
                    └─> /college-marks (Level + Course + Semesters)
                          └─> /results
                                └─> /recommendations
```

Bottom Navigation (always visible after login):
- Home / Dashboard
- Calculator (Marks)
- Recommendations
- Bookmarks
- Profile

---

## Key Features Built

### 1. Authentication (Supabase Auth)
- Email/Password login + signup
- Google OAuth
- Profile setup form with TN districts dropdown
- Session persistence

### 2. School Marks Calculator
- Select Class: 10th / 11th / 12th
- Select Stream: Science / Commerce / Arts
- Subject-wise mark entry (dynamic by stream)
- Auto-calculate: Total, Percentage, Grade, Classification

### 3. College Marks Calculator
- Level: UG / PG / PhD
- Course dropdown (50+ Indian courses categorized)
- Semester-wise mark entry with subject + marks + credits
- Auto-calculate: CGPA, Percentage, Classification
- Analytics: Circular progress chart + Grade bar chart (Recharts)

### 4. Recommendation Engine (Rule-Based)
Higher Studies recommendations based on:
- Percentage thresholds
- Stream matching
- Level progression rules

Jobs recommendations based on:
- CGPA / Percentage
- Course match
- Government vs Private vs Internship categories

### 5. College Finder
- State selector (default: Tamil Nadu)
- District selector (all 38 TN districts)
- Static college database with 100+ TN colleges
- Search + filter by NAAC grade
- College cards with: Name, NAAC, Address, Phone, Website, Google Maps link

### 6. Jobs Section
- 4 tabs: Government / Private / Internships / Skill-based
- Job cards with: Title, Qualification, Skills, Salary, Apply link

### 7. Bookmarks
- Save any college or job card
- Stored in Supabase saved_items table
- View all saved items in one place

### 8. Profile Dashboard
- View/edit profile info
- View marks history
- Edit marks option

### 9. PWA Setup
- manifest.json with app icon, name, theme color
- Service worker for offline caching
- Install to home screen prompt

### 10. Dark/Light Mode
- Toggle in profile/header
- next-themes integration
- All cards and backgrounds adapt

---

## Files to Create / Modify

### New Files (30+ files):

**Pages:**
- src/pages/Auth.tsx
- src/pages/ProfileSetup.tsx
- src/pages/StudentType.tsx
- src/pages/SchoolMarks.tsx
- src/pages/CollegeMarks.tsx
- src/pages/Results.tsx
- src/pages/Recommendations.tsx
- src/pages/CollegeFinder.tsx
- src/pages/Jobs.tsx
- src/pages/Bookmarks.tsx
- src/pages/Profile.tsx

**Components:**
- src/components/layout/BottomNav.tsx
- src/components/layout/AppHeader.tsx
- src/components/layout/PageWrapper.tsx
- src/components/cards/CourseCard.tsx
- src/components/cards/CollegeCard.tsx
- src/components/cards/JobCard.tsx
- src/components/cards/StatCard.tsx
- src/components/charts/CircularProgress.tsx
- src/components/charts/GradeBarChart.tsx
- src/components/auth/LoginForm.tsx
- src/components/auth/ProfileSetup.tsx

**Data:**
- src/data/courses.ts
- src/data/colleges.ts
- src/data/jobs.ts
- src/data/districts.ts
- src/data/exams.ts
- src/data/recommendations.ts

**Hooks:**
- src/hooks/useAuth.ts
- src/hooks/useMarks.ts
- src/hooks/useRecommendations.ts
- src/hooks/useBookmarks.ts

**Utilities:**
- src/lib/calculations.ts

**PWA:**
- public/manifest.json
- public/sw.js (service worker)

### Modified Files:
- src/App.tsx (add all routes + auth guards)
- src/index.css (full colorful theme system)
- tailwind.config.ts (custom colors)
- index.html (PWA meta tags + manifest link)
- src/integrations/supabase/types.ts (updated with schema)

### Database Migration:
A SQL migration will create:
- profiles table
- marks table
- saved_items table
- All with RLS policies

---

## What Will NOT Be Included (Future Phases)
- Real Google Search API integration (will show curated static data with links)
- Real Push Notifications (PWA manifest + permission request only)
- PDF download (can be added later)
- Real AI (rule-based recommendations only)
- SMS/OTP login (Supabase email auth only)

These are noted as "Phase 2" features once the core app is verified working.
