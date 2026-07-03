import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import ProtectedRoute from "../components/auth/ProtectedRoute"
import MainLayout from "../components/layout/Layout"
import DashboardLayout from "../dashboard/components/DashboardLayout"
import HomePage from "../pages/1-home/HomePage"
import AboutPage from "../pages/2-about/AboutPage"
import OutreachPage from "../pages/3-schools-outreach/SchoolsOutreachPage"
import TalentsPagePublic from "../pages/4-talent-showcase/TalentPage"
import GalleryPagePublic from "../pages/5-gallery/GalleryPage"
import EventsPagePublic from "../pages/6-events-workshops/EventsPage"
import ProgrammesPagePublic from "../pages/8-programmes/ProgrammesPage"
import PrivacyPolicyPage from "../pages/9-privacy/PrivacyPolicyPage"
import ContactPage from "../pages/7-contact/ContactPage"
import AuthPage from "../pages/0-auth/AuthPage"
import ApplyPage from "../pages/10-apply/ApplyPage"
// Dashboard Pages
import AdminLoginPage from "../dashboard/pages/0-auth/AdminLoginPage"
import AdminForgotPassword from "../dashboard/pages/0-auth/AdminForgotPassword"
import OverviewPage from "../dashboard/pages/1-overview/OverviewPage"
import TalentsPage from "../dashboard/pages/3-talents/TalentsPage"
import GalleryPage from "../dashboard/pages/4-gallery/GalleryPage"
import EventsPage from "../dashboard/pages/6-events/EventsPage"
import ProgrammesPage from "../dashboard/pages/8-programmes/ProgrammesPage"
import VotingPage from "../dashboard/pages/9-voting/VotingPage"
import ApplicationsPage from "../dashboard/pages/10-applications/ApplicationsPage"
import SettingsPage from "../dashboard/pages/11-settings/SettingsPage"
import CastingRequestsPage from "../dashboard/pages/casting/CastingRequestsPage"


export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/schools-outreach" element={<OutreachPage />} />
        <Route path="/talents" element={<TalentsPagePublic />} />
        <Route path="/gallery" element={<GalleryPagePublic />} />
        <Route path="/events" element={<EventsPagePublic />} />
        <Route path="/programmes" element={<ProgrammesPagePublic />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Route>
      {/* Full-screen Auth routes (No Navbar/Footer) */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/login" element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <AuthPage />} />

      {/* Admin Auth routes (outside protected wrapper) */}
      <Route path="/dashboard/auth/login" element={<AdminLoginPage />} />
      <Route path="/dashboard/auth/forgot-password" element={<AdminForgotPassword />} />

      {/* Protected dashboard routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<OverviewPage />} />
        <Route path="/dashboard/talents" element={<TalentsPage />} />
        <Route path="/dashboard/gallery" element={<GalleryPage />} />
        <Route path="/dashboard/events" element={<EventsPage />} />
        <Route path="/dashboard/programmes" element={<ProgrammesPage />} />
        <Route path="/dashboard/voting" element={<VotingPage />} />
        <Route path="/dashboard/applications" element={<ApplicationsPage />} />
        <Route path="/dashboard/casting-requests" element={<CastingRequestsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="flex min-h-screen items-center justify-center bg-asa-background">
          <div className="text-center">
            <h1 className="font-headline text-6xl font-bold text-asa-primary">404</h1>
            <p className="mt-4 text-asa-muted">Page not found</p>
            <a href="/" className="mt-6 inline-block rounded-lg bg-asa-primary px-6 py-3 text-sm font-semibold text-asa-background">Go Home</a>
          </div>
        </div>
      } />
    </Routes>
  )
}
