import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStep } from "@/hooks/useAuthStep";
import { initPWA } from "@/lib/pwa";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { DeveloperSplash } from "@/components/layout/DeveloperSplash";
import { NavigationDirectionProvider } from "@/contexts/NavigationDirection";
import { CompareProvider } from "@/contexts/CompareContext";
import { ScrollRestoration } from "@/components/layout/ScrollRestoration";

// Preload splash images immediately
import edunextLogo from '@/assets/edunext-logo.png';
import voorheesLogo from '@/assets/voorhees-logo.png';
const preloadImages = [edunextLogo, voorheesLogo];
preloadImages.forEach(src => { const img = new Image(); img.src = src; });

import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import PWAGate from "./pages/PWAGate";
import StudentType from "./pages/StudentType";
import SchoolMarks from "./pages/SchoolMarks";
import CollegeMarks from "./pages/CollegeMarks";
import Results from "./pages/Results";
import Recommendations from "./pages/Recommendations";
import CollegeFinder from "./pages/CollegeFinder";
import Jobs from "./pages/Jobs";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import EntranceExams from "./pages/EntranceExams";
import CompareColleges from "./pages/CompareColleges";
import Scholarships from "./pages/Scholarships";
import InterviewPrep from "./pages/InterviewPrep";
import ResumeBuilder from "./pages/ResumeBuilder";
import MarksSelector from "./pages/MarksSelector";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function isPWA(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

function AppRoutes() {
  const { user, profile, loading, profileLoading, isProfileComplete } = useAuth();
  const { authStep } = useAuthStep();
  const location = useLocation();
  const [splashPhase, setSplashPhase] = useState<'app' | 'developer' | 'done'>('app');
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => { initPWA(); }, []);
  useEffect(() => {
    // Fast splash: 0.8s for EduNext, 0.8s for developer = 1.6s total
    const t1 = setTimeout(() => setSplashPhase('developer'), 800);
    const t2 = setTimeout(() => setSplashPhase('done'), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  useEffect(() => {
    setIsStandalone(isPWA());
  }, []);

  if (splashPhase === 'app' || loading || profileLoading) {
    return <SplashScreen show={true} />;
  }

  if (splashPhase === 'developer') {
    return <DeveloperSplash show={true} />;
  }

  if (!isStandalone && import.meta.env.PROD) {
    return <PWAGate />;
  }

  const getAuthRedirect = () => {
    if (!isProfileComplete) return "/onboarding";
    return "/student-type";
  };

  return (
      <>
      <ScrollRestoration />
      <Routes location={location}>
        <Route path="/auth" element={!user ? <PageTransition><Auth /></PageTransition> : (authStep !== 'form' ? <PageTransition><Auth /></PageTransition> : <Navigate to={getAuthRedirect()} replace />)} />
        <Route path="/" element={user ? <Navigate to={getAuthRedirect()} replace /> : <Navigate to="/auth" replace />} />
        <Route path="/onboarding" element={user ? <PageTransition><Onboarding /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/student-type" element={user ? (isProfileComplete ? <PageTransition><StudentType /></PageTransition> : <Navigate to="/onboarding" replace />) : <Navigate to="/auth" replace />} />
        <Route path="/marks" element={user ? <PageTransition><MarksSelector /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/school-marks" element={user ? <PageTransition><SchoolMarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/college-marks" element={user ? <PageTransition><CollegeMarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/results" element={user ? <PageTransition><Results /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/recommendations" element={user ? <PageTransition><Recommendations /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/college-finder" element={user ? <PageTransition><CollegeFinder /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/compare-colleges" element={user ? <PageTransition><CompareColleges /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/jobs" element={user ? <PageTransition><Jobs /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/entrance-exams" element={user ? <PageTransition><EntranceExams /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/bookmarks" element={user ? <PageTransition><Bookmarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/scholarships" element={user ? <PageTransition><Scholarships /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/interview-prep" element={user ? <PageTransition><InterviewPrep /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/resume-builder" element={user ? <PageTransition><ResumeBuilder /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/profile" element={user ? <PageTransition><Profile /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
      </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationDirectionProvider>
          <CompareProvider>
            <AppRoutes />
          </CompareProvider>
        </NavigationDirectionProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;