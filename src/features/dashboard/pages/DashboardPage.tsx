import LoadingSpinner from "@/components/ui/loading-spinner";
import { useAuth } from "@/features/auth/context/AuthContext";
import { lazy, Suspense } from "react";

// Lazy load both components
const UserDashboard = lazy(() => import("../components/UserDashboard"));
const AdminDashboardPage = lazy(
  () => import("@/features/admin/pages/AdminDashboardPage")
);

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {user?.role === "admin" ? <AdminDashboardPage /> : <UserDashboard />}
    </Suspense>
  );
};

export default DashboardPage;
