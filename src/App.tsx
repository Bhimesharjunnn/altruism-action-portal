
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CausesPage from "./pages/Causes";
import CauseDetailsPage from "./pages/CauseDetails";
import CauseDetail from "./pages/CauseDetail";
import SponsorFormPage from "./pages/SponsorForm";
import LoginPage from "./pages/Login";
import CreateCausePage from "./pages/CreateCause";

// Public Pages
import WhySponsorPage from "./pages/WhySponsor";
import WhyClaimPage from "./pages/WhyClaim";

// Claimer Journey Pages
import ClaimFormPage from "./pages/claimer/ClaimForm";
import OtpVerificationPage from "./pages/claimer/OtpVerification";
import ClaimConfirmedPage from "./pages/claimer/ClaimConfirmed";
import ClaimStatusPage from "./pages/claimer/ClaimStatus";
import JoinWaitlistPage from "./pages/claimer/JoinWaitlist";
import WaitlistConfirmationPage from "./pages/claimer/WaitlistConfirmation";
import MagicLinkClaimPage from "./pages/claimer/MagicLinkClaim";
import WaitlistEmailPreviewPage from "./pages/claimer/WaitlistEmailPreview";

// Dashboard Pages
import SponsorDashboard from "./pages/dashboard/SponsorDashboard";
import ClaimerDashboard from "./pages/dashboard/ClaimerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Admin Pages
import CausesManagement from "./pages/admin/CausesManagement";
import CampaignApprovals from "./pages/admin/CampaignApprovals";
import LogoReview from "./pages/admin/LogoReview";
import ClaimsManagement from "./pages/admin/ClaimsManagement";
import Shipping from "./pages/admin/Shipping";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import QrScanner from "./pages/admin/QrScanner";

// Create QueryClient once, outside of component
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
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
                <Route path="/cause/:id" element={<CauseDetail />} />
                <Route path="/create-cause" element={<CreateCausePage />} />
                <Route path="/sponsor/new" element={<SponsorFormPage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Public Information Pages */}
                <Route path="/why-sponsor" element={<WhySponsorPage />} />
                <Route path="/why-claim" element={<WhyClaimPage />} />
                
                {/* Claimer Journey Routes */}
                <Route path="/claim/:id" element={<ClaimFormPage />} />
                <Route path="/claim/verify" element={<OtpVerificationPage />} />
                <Route path="/claim/confirmed" element={<ClaimConfirmedPage />} />
                <Route path="/claim/status/:id" element={<ClaimStatusPage />} />
                <Route path="/waitlist/:id" element={<JoinWaitlistPage />} />
                <Route path="/waitlist/confirmed" element={<WaitlistConfirmationPage />} />
                <Route path="/claim/magic-link" element={<MagicLinkClaimPage />} />
                <Route path="/demo/waitlist-email" element={<WaitlistEmailPreviewPage />} />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
                <Route path="/dashboard/claimer" element={<ClaimerDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                
                {/* Redirect old visitor dashboard to appropriate dashboard */}
                <Route path="/dashboard/visitor" element={<Navigate to="/dashboard/claimer" replace />} />
                
                {/* Admin Routes */}
                <Route path="/admin/causes" element={<CausesManagement />} />
                <Route path="/admin/approvals" element={<CampaignApprovals />} />
                <Route path="/admin/logos" element={<LogoReview />} />
                <Route path="/admin/claims" element={<ClaimsManagement />} />
                <Route path="/admin/shipping" element={<Shipping />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/admin/qr-scanner" element={<QrScanner />} />
                
                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
