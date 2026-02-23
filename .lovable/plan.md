

# EduNext Redesign Plan

## Overview
This plan covers 6 major changes: OTP-style signup flow, blank page fix after login, navbar redesign, new app icon/splash screen, bottom-to-top page transitions, and renaming the plan file.

---

## 1. Fix Blank Page After Login (Critical Bug)

**Root Cause:** When a user logs in successfully, the `onAuthStateChange` listener fires and sets `user`, but the `fetchProfile` call happens in a `setTimeout(0)`. During this brief window, `user` is set but `profile` is still `null`, so `isProfileComplete` is `false`, and the app redirects to `/onboarding`. However, the route guard for `/auth` sees `user` exists and tries to `Navigate` away -- but the profile hasn't loaded yet, causing a timing race that can result in a blank page.

**Fix:**
- Add a `profileLoading` state to `useAuth.ts` that stays `true` until `fetchProfile` completes after login
- In `App.tsx`, keep showing the splash screen while `profileLoading` is true (not just `loading`)
- This ensures the redirect decision is only made once we know the profile status

---

## 2. OTP-Style Signup Flow

**How it works with Supabase:** Supabase email signup already sends a verification email. We will redesign the Auth page to add an OTP verification step in the UI flow after signup:

- **Step 1 - Sign Up Form:** User enters name, email, password, clicks "Create Account"
- **Step 2 - OTP Verification Screen:** After successful `signUp()`, show an OTP input UI (6-digit) styled like the reference image. The user enters the code from their email
- **Step 3 - Success Animation:** On successful verification, show a celebration animation with confetti-like effects and "Account Created Successfully!" message
- **Step 4 - Auto-redirect:** After 2 seconds, redirect to the onboarding/profile setup page

**Technical details:**
- Use Supabase's `signUp` with `emailRedirectTo` for email verification
- After signup, show OTP UI using the existing `input-otp` component
- Use `supabase.auth.verifyOtp({ email, token, type: 'signup' })` to verify the code
- On success, trigger a celebration animation using framer-motion (scale burst, confetti dots, checkmark)
- Login flow remains unchanged (no OTP needed)

**Files modified:** `src/pages/Auth.tsx`

---

## 3. Redesign Navigation Bar

Based on the reference image (image-9), the navbar should have:
- A larger, rounded-square icon background for the active tab (not a pill shape)
- The active icon floats slightly above the bar with a prominent purple/primary rounded square behind it
- Inactive icons remain in the bar with muted color
- Cleaner spacing and slightly larger icons

**Changes to `src/components/layout/BottomNav.tsx`:**
- Replace the current pill/bubble `layoutId` indicator with a rounded-square that extends upward
- Active icon gets a larger background (w-14 h-14 rounded-2xl) that lifts above the nav bar
- Spring animation for the active indicator transition

---

## 4. Update App Icon and Splash Screen

- Copy the uploaded logo (`Teal_and_Yellow_Illustrated_Education_Logo_2.png`) to `src/assets/edunext-logo.png` and `public/app-icon.png`
- Update `public/manifest.json` icons array
- Update `index.html` favicon and apple-touch-icon references
- Update `SplashScreen.tsx` to use the new logo

---

## 5. Bottom-to-Top Page Transition

Change the page transition animation in `PageTransition.tsx`:
- **Current:** Slides from right (`x: 60`) to center
- **New:** Slides from bottom (`y: 60`) to center with fade
- Exit animation: fade out upward (`y: -30, opacity: 0`)

**File modified:** `src/components/layout/PageTransition.tsx`

---

## 6. Rename Plan File

Rename `.lovable/plan.md` to `.lovable/planing.md` as requested.

---

## Technical Summary

| File | Action |
|---|---|
| `src/pages/Auth.tsx` | Major rewrite: add OTP step, verification UI, celebration animation |
| `src/hooks/useAuth.ts` | Add profileLoading guard to fix blank page race condition |
| `src/App.tsx` | Use profileLoading from useAuth to prevent premature redirects |
| `src/components/layout/BottomNav.tsx` | Redesign with floating rounded-square active indicator |
| `src/components/layout/PageTransition.tsx` | Change animation from horizontal slide to bottom-to-top |
| `src/components/layout/SplashScreen.tsx` | Update to use new logo |
| `src/assets/edunext-logo.png` | Replace with new uploaded logo |
| `public/app-icon.png` | Replace with new uploaded logo |
| `public/manifest.json` | Update icon references |
| `index.html` | Update favicon/apple-touch-icon |
| `.lovable/plan.md` | Rename to `.lovable/planing.md` |

