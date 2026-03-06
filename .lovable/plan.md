

## Plan: Add Voorhees College Developer Credit Screen and Professional Study Icons

### What we'll do

1. **Add Voorhees College logo** — Copy the uploaded image into `src/assets/voorhees-logo.png` and create a new "Developer Credit" splash screen that appears **after** the main EduNext splash screen fades out (before the app loads). It will show the Voorhees College logo, "Developed by Voorhees College BCA Student" text, and fade out after ~2 seconds — matching the existing splash screen's gradient/animation style.

2. **Add professional study-related Lucide icons** to key pages — Replace plain emojis with real Lucide icons throughout the app for a more professional look:
   - **StudentType page**: Replace emoji-based info cards (📚, 🏛️, 💼, 🎯) with Lucide icons (`BookOpen`, `Building2`, `Briefcase`, `Target`) styled with colored icon containers
   - **StudentType cards**: Already use `School` and `GraduationCap` icons — keep those, enhance with additional decorative icons
   - **Auth page**: Already professional — no changes needed

3. **Add decorative study-themed illustration elements** — Add subtle SVG illustration icons (books, graduation cap, lightbulb, pencil) as background decorations on the StudentType header area to give a polished, education-app feel using Lucide icons with low opacity.

### Technical approach

**New file**: `src/components/layout/DeveloperSplash.tsx`
- Shows the Voorhees College logo in the same splash screen format (gradient background, centered logo card, animated text)
- Text: "Developed by" / "Voorhees College" / "BCA Department"
- Auto-dismisses after ~2 seconds

**Modified file**: `src/App.tsx`
- Add a two-phase splash: first show `SplashScreen` (2.2s), then show `DeveloperSplash` (2s), then load the app
- Use `splashPhase` state: `'app' → 'developer' → 'done'`

**Modified file**: `src/pages/StudentType.tsx`
- Replace emoji strings in info cards with styled Lucide icons (`BookOpen`, `Building2`, `Briefcase`, `Target`)
- Add floating study-related Lucide icons in the header background (low opacity decorations)

**Asset copy**: `user-uploads://image-15.png` → `src/assets/voorhees-logo.png`

