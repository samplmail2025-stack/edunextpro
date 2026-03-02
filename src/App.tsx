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
  const [showSplash, setShowSplash] = useState(true);
  const [isStandalone, setIsStandalone] = useState(true); // default true to avoid flash

  useEffect(() => { initPWA(); }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Check PWA after mount
    setIsStandalone(isPWA());
  }, []);

  if (showSplash || loading || profileLoading) {
    return <SplashScreen show={true} />;
  }

  // Show PWA install gate for non-PWA browser visitors
  // Disable in development to allow testing
  if (!isStandalone && import.meta.env.PROD) {
    return <PWAGate />;
  }

  // Determine where authenticated users should go
  const getAuthRedirect = () => {
    if (!isProfileComplete) return "/onboarding";
    return "/student-type";
  };

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/auth" element={!user ? <PageTransition><Auth /></PageTransition> : (authStep !== 'form' ? <PageTransition><Auth /></PageTransition> : <Navigate to={getAuthRedirect()} replace />)} />

        {/* Protected */}
        <Route path="/" element={user ? <Navigate to={getAuthRedirect()} replace /> : <Navigate to="/auth" replace />} />
        <Route path="/onboarding" element={user ? <PageTransition><Onboarding /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/student-type" element={user ? (isProfileComplete ? <PageTransition><StudentType /></PageTransition> : <Navigate to="/onboarding" replace />) : <Navigate to="/auth" replace />} />
        <Route path="/school-marks" element={user ? <PageTransition><SchoolMarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/college-marks" element={user ? <PageTransition><CollegeMarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/results" element={user ? <PageTransition><Results /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/recommendations" element={user ? <PageTransition><Recommendations /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/college-finder" element={user ? <PageTransition><CollegeFinder /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/jobs" element={user ? <PageTransition><Jobs /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/bookmarks" element={user ? <PageTransition><Bookmarks /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/profile" element={user ? <PageTransition><Profile /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
