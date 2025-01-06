import { authQueryKeys } from "@/features/auth/api/auth.query";
import { User } from "@/features/auth/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { authApi } from "../api/authApi";
import { environment } from "@/config/environment";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    auth: { refreshTokenIntervalMs },
  } = environment;

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: authQueryKeys.user,
    queryFn: () => authApi.getCurrentUser(),
    retry: 1,
    staleTime: Infinity,
    refetchInterval: 1000 * 60 * 60,
    gcTime: Infinity,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      const refreshInterval = setInterval(async () => {
        try {
          const refreshedUser = await authApi.refreshToken();
          queryClient.setQueryData(authQueryKeys.user, refreshedUser);
        } catch (_error) {
          queryClient.setQueryData(authQueryKeys.user, null);
          navigate("/login", { replace: true });
        }
      }, refreshTokenIntervalMs);

      return () => clearInterval(refreshInterval);
    }
  }, [user, queryClient, refreshTokenIntervalMs, navigate]);

  useEffect(() => {
    if (error) {
      queryClient.setQueryData(authQueryKeys.user, null);
      navigate("/login", { replace: true });
    }
  }, [error, queryClient, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        user: user || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
