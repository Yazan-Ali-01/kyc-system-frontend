import { useAuth } from "@/features/auth/context/AuthContext";
import UserDashboard from "../components/UserDashboard";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";

const DashboardPage = () => {
  const { user } = useAuth();

  console.log("user?.role", user?.role);
  return (
    <>{user?.role === "admin" ? <AdminDashboardPage /> : <UserDashboard />}</>
  );
};

export default DashboardPage;
