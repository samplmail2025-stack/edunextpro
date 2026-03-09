

## Plan: Add New Sections to the Home Page

### Current Sections (in order)
1. Hero Banner
2. Marks Carousel (or No Marks CTA)
3. Quick Actions Grid
4. Benefits Carousel
5. Popular Courses (horizontal scroll)
6. Career Tools (Scholarship, Interview, Resume)
7. Entrance Exams card
8. Upcoming Exams list
9. Top Scholarships (horizontal scroll)
10. Daily Tip
11. Info Cards (stats grid)
12. Developer Credit Banner

### New Sections to Add (5 sections)

**1. Trending Jobs** (after Top Scholarships)
- Horizontal scrollable cards showing 4-5 jobs from `JOBS` data
- Each card: job title, organization, salary range, category badge, location
- Color-coded by category (Government=blue, Private=green, Internship=purple, Skill-based=amber)
- "View All" link to `/jobs`

**2. Study Streak / Progress Tracker** (after Marks Carousel, before Quick Actions)
- Motivational card showing how many marks entries user has saved
- Visual: icon grid of 7 dots representing days of the week with a "streak" feel
- Message like "You have X academic records tracked"
- Gradient card style matching existing design language

**3. Compare Colleges CTA** (after Popular Courses)
- Promotional banner card with gradient background
- "Compare Colleges Side by Side" with Building2 icon
- Short description + CTA button navigating to `/college-finder`
- Glass-morphism style matching Career Tools cards

**4. Interview Prep Quick Stats** (after Trending Jobs)
- Card showing count of interview questions available by category
- 4 mini stat pills: HR, Technical, GD, Gov Exam counts from `INTERVIEW_QUESTIONS`
- Tap navigates to `/interview-prep`

**5. "Explore by Stream" Section** (after Benefits Carousel, before Popular Courses)
- Horizontal scroll of stream/category pills with images: Science, Engineering, Medical, Commerce, Arts, Law, Education
- Each pill navigates to `/college-finder?course=<stream>`
- Uses existing `COURSE_CATEGORY_IMAGES` mapping
- Circular/rounded image thumbnails with labels

### Technical Details

**File changes**: Only `src/pages/StudentType.tsx`

**Data imports to add**:
- `JOBS` from `@/data/jobs`
- `INTERVIEW_QUESTIONS` from `@/data/interviewQuestions`

**Section insertion points** (within the `<>...</>` block after `{!loading && ...}`):
- Study Streak: line ~334, after no-marks CTA / marks carousel, before Quick Actions
- Explore by Stream: after BenefitsCarousel (line ~373)
- Compare Colleges CTA: after Popular Courses (line ~418)
- Trending Jobs: after Top Scholarships (line ~565)
- Interview Quick Stats: after Trending Jobs

All sections use existing animation patterns (`motion.div` with staggered delays), existing card styles, and existing color conventions.

