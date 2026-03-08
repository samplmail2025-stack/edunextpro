

# Transform StudentType into a Smart Dashboard

## What the user wants
The current "Who are you?" page is a static selector. The user wants it to become a **dashboard** that:
1. Shows previously saved marks data (percentage, CGPA, classification, subjects) directly on the page
2. When data exists, clicking the student card shows their results inline instead of always navigating to the marks entry page
3. Professional dashboard layout with analytics cards

## Plan

### 1. Update StudentType.tsx → Dashboard Page
- Import `useMarks` hook to fetch `latestMarks` from Supabase
- **When no marks exist**: Show current School/College student cards with "Start →" (navigate to marks entry)
- **When marks exist**: Show an **Academic Performance section** with:
  - A prominent result card showing percentage/CGPA, grade, classification with gradient background
  - `CircularProgress` chart for visual score display
  - Subject-wise breakdown bars (if subjects data exists)
  - Quick stats row (Score, Classification, Grade/CGPA)
  - Two action buttons: "Get Recommendations" and "Edit Marks" (navigates to marks entry page)
  - A small "Switch Type" link to change between school/college

### 2. Dashboard Layout Structure
```text
┌─────────────────────────┐
│  Hero Banner (smaller)  │
│  "Welcome, {name}!"     │
│  "Your Dashboard"       │
├─────────────────────────┤
│  IF latestMarks exists: │
│  ┌─ Performance Card ─┐ │
│  │ 85.2% | Distinction│ │
│  │ CircularProgress    │ │
│  │ Subject bars        │ │
│  │ [Recommendations]   │ │
│  │ [Edit Marks]        │ │
│  └─────────────────────┘ │
│  ELSE:                   │
│  School/College cards    │
├─────────────────────────┤
│  Career Tools section   │
│  Info grid              │
└─────────────────────────┘
```

### 3. Files to modify
- **`src/pages/StudentType.tsx`** — Major rewrite: add `useMarks`, conditionally render dashboard analytics or student type selector. Import `CircularProgress`, `GradeBarChart`, and relevant UI components.

### 4. Key behaviors
- `useMarks()` provides `latestMarks` with `student_type`, `percentage`, `cgpa`, `grade`, `classification`, `subjects`, `class`, `stream`, `level`, `course`
- "Get Recommendations" navigates to `/recommendations` with the marks state
- "Edit Marks" navigates to `/school-marks` or `/college-marks` based on `student_type`
- Career Tools section and info grid remain unchanged at the bottom
- Hero banner text changes from "Who are you?" to "Your Dashboard" when marks exist

