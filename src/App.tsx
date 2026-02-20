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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">🎓</span>
          </div>
          <p className="text-muted-foreground text-sm">Loading EduNext…</p>
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
