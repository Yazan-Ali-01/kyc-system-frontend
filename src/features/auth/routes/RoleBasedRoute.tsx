import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { UserRole } from "../types";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  console.log("user", user);
  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/unauthorized"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <Outlet />;
};
