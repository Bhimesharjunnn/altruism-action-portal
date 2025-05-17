
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CausesPage from "./pages/Causes";
import CauseDetailsPage from "./pages/CauseDetails";
import SponsorFormPage from "./pages/SponsorForm";
import LoginPage from "./pages/Login";

// Dashboard Pages
import SponsorDashboard from "./pages/dashboard/SponsorDashboard";
import ClaimerDashboard from "./pages/dashboard/ClaimerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/causes" element={<CausesPage />} />
            <Route path="/cause/:id" element={<CauseDetailsPage />} />
            <Route path="/sponsor/new" element={<SponsorFormPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
            <Route path="/dashboard/claimer" element={<ClaimerDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
