import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Layouts
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/AdminLayout";

// Public Pages
import HomePage from "./pages/public/HomePage";
import EventsPage from "./pages/public/EventsPage";
import AboutPage from "./pages/public/AboutPage";
import CommunityPage from "./pages/public/CommunityPage";
import AdvisoryBoardPage from "./pages/public/AdvisoryBoardPage";
// Portal Pages
import MemberLoginPage from "./pages/portal/MemberLoginPage";
// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MemberDashboard from "./pages/portal/MemberDashboard";
// CMS (NEW)
import AdminLogin from "./cms/pages/AdminLogin";
import Dashboard from "./cms/pages/Dashboard";
import ProtectedAdmin from "./cms/routes/ProtectedAdmin";
// ─── Protected Route ──────────────────────────────────────
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-royal-blue">
        Loading...
      </div>
    );

  if (!user)
    return (
      <Navigate to={requireAdmin ? "/admin/login" : "/portal/login"} replace />
    );

  if (
    requireAdmin &&
    !["super_admin", "admin", "content_manager", "finance"].includes(user.role)
  )
    return <Navigate to="/" replace />;

  return children;
};

// ─── Placeholder pages for stubs ─────────────────────────
const Placeholder = ({ title }) => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 className="section-title">{title}</h1>
    <p className="text-gray-500 mt-4"></p>
  </div>
);

function AppRoutes() {
  return (
    <Routes>
      {/* ── Public ──────────────────────────────── */}

      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      <Route
        path="/events"
        element={
          <Layout>
            <EventsPage />
          </Layout>
        }
      />

      <Route
        path="/events/:slug"
        element={
          <Layout>
            <Placeholder title="Event Details" />
          </Layout>
        }
      />

      {/* ABOUT PAGE */}
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />

      <Route
        path="/community"
        element={
          <Layout>
            <CommunityPage />
          </Layout>
        }
      />

      <Route
        path="/advisory-board"
        element={
          <Layout>
            <AdvisoryBoardPage />
          </Layout>
        }
      />

      <Route
        path="/sponsors"
        element={
          <Layout>
            <Placeholder title="Sponsors" />
          </Layout>
        }
      />

      <Route
        path="/partners"
        element={
          <Layout>
            <Placeholder title="Partners" />
          </Layout>
        }
      />

      <Route
        path="/insights"
        element={
          <Layout>
            <Placeholder title="Insights & Media" />
          </Layout>
        }
      />

      <Route
        path="/contact"
        element={
          <Layout>
            <Placeholder title="Contact Us" />
          </Layout>
        }
      />

      <Route
        path="/privacy"
        element={
          <Layout>
            <Placeholder title="Privacy Policy" />
          </Layout>
        }
      />

      <Route
        path="/terms"
        element={
          <Layout>
            <Placeholder title="Terms of Use" />
          </Layout>
        }
      />

      {/* ── Member Portal ────────────────────────── */}

      <Route
        path="/portal/login"
        element={
          <Layout>
            <MemberLoginPage />
          </Layout>
        }
      />

      {/* <Route
        path="/portal/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Placeholder title="Member Dashboard" />
            </Layout>
          </ProtectedRoute>
        }
      /> */}

      {/* ── Admin Panel ──────────────────────────── */}

      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/portal/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <MemberDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <Placeholder title="Event Management" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <Placeholder title="User Management" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/sponsors"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <Placeholder title="Sponsor Management" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cms"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <Placeholder title="CMS Pages" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/emails"
        element={
          <ProtectedRoute requireAdmin>
            <AdminLayout>
              <Placeholder title="Email Logs" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      {/* ── CMS (NEW ADMIN PANEL) ──────────────────────────── */}

      <Route path="/cms/login" element={<AdminLogin />} />

      <Route
        path="/cms/dashboard"
        element={
          <ProtectedAdmin>
            <Dashboard />
          </ProtectedAdmin>
        }
      />
      {/* 404 */}

      <Route
        path="*"
        element={
          <Layout>
            <Placeholder title="404 - Page Not Found" />
          </Layout>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <AppRoutes />
    </AuthProvider>
  );
}
