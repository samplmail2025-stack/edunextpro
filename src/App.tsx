import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { initPWA } from "@/lib/pwa";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { SplashScreen } from "@/components/layout/SplashScreen";

import Auth from "./pages/Auth";
import ProfileSetup from "./pages/ProfileSetup";
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

function AppRoutes() {
  const { user, profile, loading, isProfileComplete } = useAuth();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => { initPWA(); }, []);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || loading) {
    return <SplashScreen show={true} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/auth" element={!user ? <PageTransition><Auth /></PageTransition> : <Navigate to="/student-type" replace />} />

        {/* Protected */}
        <Route path="/" element={user ? <Navigate to="/student-type" replace /> : <Navigate to="/auth" replace />} />
        <Route path="/profile-setup" element={user ? <PageTransition><ProfileSetup /></PageTransition> : <Navigate to="/auth" replace />} />
        <Route path="/student-type" element={user ? <PageTransition><StudentType /></PageTransition> : <Navigate to="/auth" replace />} />
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
