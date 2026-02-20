import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { initPWA } from "@/lib/pwa";
import { useEffect } from "react";

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

  useEffect(() => { initPWA(); }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
        {/* Outer spinning ring */}
        <div className="relative w-24 h-24">
          {/* Gradient spinning arc */}
          <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="40" stroke="url(#grad1)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray="180 72" />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>
          {/* Inner slower ring */}
          <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)]" style={{animation:'spin 2s linear infinite reverse'}} viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="26" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round"
              strokeDasharray="80 82" />
            <defs>
              <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        </div>
        <div className="text-center">
          <p className="font-bold text-foreground text-base">EduNext</p>
          <p className="text-muted-foreground text-sm mt-0.5">Loading your future…</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/student-type" replace />} />

      {/* Protected */}
      <Route path="/" element={user ? <Navigate to="/student-type" replace /> : <Navigate to="/auth" replace />} />
      <Route path="/profile-setup" element={user ? <ProfileSetup /> : <Navigate to="/auth" replace />} />
      <Route path="/student-type" element={user ? <StudentType /> : <Navigate to="/auth" replace />} />
      <Route path="/school-marks" element={user ? <SchoolMarks /> : <Navigate to="/auth" replace />} />
      <Route path="/college-marks" element={user ? <CollegeMarks /> : <Navigate to="/auth" replace />} />
      <Route path="/results" element={user ? <Results /> : <Navigate to="/auth" replace />} />
      <Route path="/recommendations" element={user ? <Recommendations /> : <Navigate to="/auth" replace />} />
      <Route path="/college-finder" element={user ? <CollegeFinder /> : <Navigate to="/auth" replace />} />
      <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/auth" replace />} />
      <Route path="/bookmarks" element={user ? <Bookmarks /> : <Navigate to="/auth" replace />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
