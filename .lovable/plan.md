

## Plan: Add More Sections to Home Page

### Current Sections
1. Hero Banner
2. Marks Carousel / No Marks prompt
3. Benefits Carousel ("Why EduNext?")
4. Career Tools (Scholarships, Interview Prep, Resume Builder)
5. Entrance Exams Guide
6. Info Cards grid (Courses, Colleges, Jobs, AI)

### New Sections to Add

**1. Quick Actions Grid** — A 2-column grid with large tappable cards for primary features: "Enter Marks", "Find Colleges", "Browse Courses", "Explore Jobs". Each with an icon, gradient background, and navigation.

**2. Popular Courses Section** — A horizontal scrollable row showing top 6 courses from the courses database with category images, duration, and level badges. Tapping navigates to College Finder filtered by that course.

**3. Upcoming Exam Deadlines** — A compact list showing the next 3-4 entrance exams with their important dates, styled as a timeline. Links to the Entrance Exams page.

**4. Daily Tip / Motivation Card** — A rotating motivational/study tip card with a gradient background that changes daily (based on day of year). Educational tips relevant to Tamil Nadu students.

**5. Top Scholarships Highlight** — A horizontal scroll showing 3-4 featured scholarships with amount, deadline, and "Apply" link. Links to full Scholarships page.

### Section Order (after changes)
1. Hero Banner
2. Marks Carousel / No Marks prompt
3. **Quick Actions Grid** (new)
4. Benefits Carousel
5. **Popular Courses** (new)
6. Career Tools
7. Entrance Exams Guide
8. **Upcoming Exam Deadlines** (new)
9. **Top Scholarships Highlight** (new)
10. **Daily Tip Card** (new)
11. Info Cards grid

### Technical Approach
- All new sections added directly in `src/pages/StudentType.tsx` within the existing `{!loading && ...}` block
- Uses existing data from `src/data/courses.ts`, `src/data/exams.ts`, `src/data/scholarships.ts`
- Framer Motion entry animations consistent with existing sections
- Horizontal scrolls use `overflow-x-auto` with `snap-x` for mobile UX
- All sections use existing Tailwind classes and design patterns (rounded-2xl cards, gradient icons, border-border)

