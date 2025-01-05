import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/routes/ProtectedRoute";
import { RoleBasedRoute } from "@/features/auth/routes/RoleBasedRoute";
import { GuestOnlyRoute } from "@/features/auth/routes/GuestOnlyRoute";
import { AppErrorBoundary } from "@/components/ErrorBoundary/AppErrorBoundary";
import LoginPage from "@/features/auth/pages/LoginPage";
import UnauthorizedPage from "@/features/auth/pages/UnauthorizedPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// Lazy load components
const Layout = lazy(() => import("@/components/Layout"));
const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage")
);
const ProfilePage = lazy(() => import("@/features/profile/pages/ProfilePage"));

const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<p>loading...</p>}>
    <AppErrorBoundary>{children}</AppErrorBoundary>
  </Suspense>
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route element={<GuestOnlyRoute />}>
        <Route
          path="/login"
          element={
            <LazyRoute>
              <LoginPage />
            </LazyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <LazyRoute>
              <RegisterPage />
            </LazyRoute>
          }
        />
      </Route>

      {/* Public route without any auth check */}
      <Route
        path="/unauthorized"
        element={
          <LazyRoute>
            <UnauthorizedPage />
          </LazyRoute>
        }
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          element={
            <LazyRoute>
              <Layout />
            </LazyRoute>
          }
        >
          {/* Regular user routes */}
          <Route
            path="/profile"
            element={
              <LazyRoute>
                <ProfilePage />
              </LazyRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <LazyRoute>
                <DashboardPage />
              </LazyRoute>
            }
          />

          {/* Admin-only routes */}
          <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/admin/*"
              element={
                <LazyRoute>
                  <DashboardPage />
                </LazyRoute>
              }
            />
            {/* Add other admin routes here */}
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
