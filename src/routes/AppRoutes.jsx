import { Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import DashboardLayout from "../dashboard/components/DashboardLayout"

import HomePage from "../pages/1-home/HomePage"
import AboutPage from "../pages/2-about/AboutPage"
import SchoolsOutreachPage from "../pages/3-schools-outreach/SchoolsOutreachPage"
import TalentPage from "../pages/4-talent-showcase/TalentPage"
import DynamicTalentProfile from "../pages/4-talent-showcase/DynamicTalentProfile"
import GalleryPage from "../pages/5-gallery/GalleryPage"
import EventsPage from "../pages/6-events-workshops/EventsPage"
import ContactPage from "../pages/7-contact/ContactPage"
import ProgrammesPage from "../pages/8-programmes/ProgrammesPage"
import AuthPage from "../pages/0-auth/AuthPage"
import NotFoundPage from "../pages/9-not-found/NotFoundPage"

import OverviewPage from "../dashboard/pages/1-overview/OverviewPage"
import ProfilesManagerPage from "../dashboard/pages/2-profiles-manager/ProfilesManagerPage"
import MediaVaultPage from "../dashboard/pages/3-media-vault/MediaVaultPage"
import MonologueLabPage from "../dashboard/pages/4-monologue-lab/MonologueLabPage"
import SettingsPage from "../dashboard/pages/settings/SettingsPage"

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages with Navigation Header & Footer */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="schools-outreach" element={<SchoolsOutreachPage />} />
        <Route path="talents" element={<TalentPage />} />
        <Route path="talents/:id" element={<DynamicTalentProfile />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="programmes" element={<ProgrammesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Dashboard Subsystem with Sidebar Shell */}
      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<OverviewPage />} />
        <Route path="dashboard/profiles" element={<ProfilesManagerPage />} />
        <Route path="dashboard/media-vault" element={<MediaVaultPage />} />
        <Route path="dashboard/monologue-lab" element={<MonologueLabPage />} />
        <Route path="dashboard/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
