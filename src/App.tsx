
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Login from './pages/Login';
import Causes from './pages/Causes';
import CauseDetails from './pages/CauseDetails';
import CreateCause from './pages/CreateCause';
import SponsorForm from './pages/SponsorForm';
import WhySponsor from './pages/WhySponsor';
import WhyClaim from './pages/WhyClaim';
import ClaimForm from './pages/claimer/ClaimForm';
import JoinWaitlist from './pages/claimer/JoinWaitlist';
import WaitlistConfirmation from './pages/claimer/WaitlistConfirmation';
import MagicLinkClaim from './pages/claimer/MagicLinkClaim';
import OtpVerification from './pages/claimer/OtpVerification';
import ClaimConfirmed from './pages/claimer/ClaimConfirmed';
import ClaimStatus from './pages/claimer/ClaimStatus';
import WaitlistEmailPreview from './pages/claimer/WaitlistEmailPreview';
import SubmitStory from './pages/SubmitStory';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import SponsorDashboard from './pages/dashboard/SponsorDashboard';
import ClaimerDashboard from './pages/dashboard/ClaimerDashboard';
import CausesManagement from './pages/admin/CausesManagement';
import CauseImageUpload from './pages/admin/CauseImageUpload';
import CampaignApprovals from './pages/admin/CampaignApprovals';
import LogoReview from './pages/admin/LogoReview';
import ClaimsManagement from './pages/admin/ClaimsManagement';
import Shipping from './pages/admin/Shipping';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import DistributionSettings from './pages/admin/DistributionSettings';
import QrScanner from './pages/admin/QrScanner';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/causes/:id" element={<CauseDetails />} />
          <Route path="/create-cause" element={<CreateCause />} />
          <Route path="/sponsor" element={<SponsorForm />} />
          <Route path="/why-sponsor" element={<WhySponsor />} />
          <Route path="/why-claim" element={<WhyClaim />} />
          <Route path="/claim/:id" element={<ClaimForm />} />
          <Route path="/waitlist/:id" element={<JoinWaitlist />} />
          <Route path="/waitlist-confirmation" element={<WaitlistConfirmation />} />
          <Route path="/magic-claim/:token" element={<MagicLinkClaim />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/claim-confirmed" element={<ClaimConfirmed />} />
          <Route path="/claim-status/:id" element={<ClaimStatus />} />
          <Route path="/waitlist-preview/:id" element={<WaitlistEmailPreview />} />
          <Route path="/submit-story" element={<SubmitStory />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/sponsor" element={<SponsorDashboard />} />
          <Route path="/dashboard/claimer" element={<ClaimerDashboard />} />
          <Route path="/admin/causes" element={<CausesManagement />} />
          <Route path="/admin/causes/:id/upload-image" element={<CauseImageUpload />} />
          <Route path="/admin/approvals" element={<CampaignApprovals />} />
          <Route path="/admin/logos" element={<LogoReview />} />
          <Route path="/admin/claims" element={<ClaimsManagement />} />
          <Route path="/admin/shipping" element={<Shipping />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/distribution-settings" element={<DistributionSettings />} />
          <Route path="/admin/qr-scanner" element={<QrScanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
