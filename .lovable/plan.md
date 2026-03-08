

# Feature Improvement Plan for EduNext

## Analysis of Current State

The app currently has: mark calculators, recommendation engine, college finder with comparison, job listings, entrance exams guide, bookmarks, and profile. Here are high-impact features to add:

---

## Proposed New Features

### 1. Resume Builder for Students
A guided resume/CV builder tailored for freshers and students, pre-filled with their profile data (name, education, district) and marks.

- New page `/resume-builder` with step-by-step form: Personal Info (pre-filled from profile), Education (from marks data), Skills (from recommendations), Objective
- Generate a downloadable resume using HTML-to-canvas or a styled printable view
- Template selection (2-3 templates: Professional, Modern, Minimal)
- **Files**: Create `src/pages/ResumeBuilder.tsx`, add route to `App.tsx`, add nav link on StudentType page

### 2. Interview Preparation Helper
A curated interview tips and common questions page organized by job category.

- New page `/interview-prep` with tabs: HR Questions, Technical, Group Discussion, Government Exam Tips
- Each category shows 10-15 common questions with model answers and tips
- Filterable by job type (Government, Private, Internship)
- **Files**: Create `src/data/interviewQuestions.ts`, `src/pages/InterviewPrep.tsx`, add route

### 3. Scholarship Finder
A searchable database of scholarships available for Tamil Nadu students.

- New data file with 20+ scholarships (Government of TN, Central Govt, Private)
- Fields: name, eligibility, amount, deadline, apply link, category (Merit/Income/Community)
- Filterable by student type, income level, community
- Saveable to bookmarks
- **Files**: Create `src/data/scholarships.ts`, `src/pages/Scholarships.tsx`, add route

### 4. Study Planner / Daily Goal Tracker
Simple daily study planner where students can set subjects and track hours.

- Stored in Supabase `study_plans` table (user_id, date, subject, planned_hours, completed_hours)
- Calendar view showing study streaks
- Weekly summary with charts
- **Files**: Create `src/pages/StudyPlanner.tsx`, DB migration, add route

### 5. Enhanced Job Card Design
Redesign JobCard to match the professional CollegeCard/CourseCard style with gradient headers and better visual hierarchy.

- Category-specific gradient headers (blue for Govt, purple for Private, green for Internship, orange for Skill-based)
- Glassmorphic badges, salary highlight, skill chips
- Deadline countdown badge if deadline exists
- **Files**: Update `src/components/cards/JobCard.tsx`

### 6. Quick Access Dashboard on Home Page
Add quick-access cards on the StudentType (home) page for all new features.

- Add cards for: Resume Builder, Interview Prep, Scholarships, Study Planner
- Reorganize the bottom grid to show all features
- **Files**: Update `src/pages/StudentType.tsx`

---

## Implementation Priority

| Priority | Feature | Effort |
|----------|---------|--------|
| 1 | Scholarship Finder | Medium |
| 2 | Interview Prep Helper | Medium |
| 3 | Resume Builder | High |
| 4 | Enhanced JobCard Design | Low |
| 5 | Study Planner | High (needs DB) |
| 6 | Home Page Dashboard | Low |

---

## Technical Approach

- All new pages follow existing patterns: `PageWrapper` + `AppHeader` + `BottomNav` + `framer-motion` animations
- Static data files for scholarships and interview questions (no DB needed initially)
- Resume Builder uses browser print/CSS for PDF generation (no external libraries needed)
- Study Planner requires a new Supabase table with RLS policies
- All new pages added as protected routes in `App.tsx`
- New features linked from the StudentType home page as quick-access cards

