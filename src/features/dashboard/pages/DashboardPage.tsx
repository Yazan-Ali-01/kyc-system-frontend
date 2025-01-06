import { useAuth } from "@/features/auth/context/AuthContext";
import AdminDashboard from "../components/AdminDashboard";
import UserDashboard from "../components/UserDashboard";

const DashboardPage = () => {
  const { user } = useAuth();

  return <>{user?.role === "admin" ? <AdminDashboard /> : <UserDashboard />}</>;
};

export default DashboardPage;
