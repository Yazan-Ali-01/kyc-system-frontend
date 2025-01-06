import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { LoginDTO, RegisterDTO, User } from "../types";
import { authApi } from "./authApi";

export const authQueryKeys = {
  sessions: ["sessions"] as const,
  user: ["user"] as const,
};

export const useUser = () => {
  return useQuery({
    queryKey: authQueryKeys.user,
    queryFn: () => authApi.getCurrentUser(),
    staleTime: Infinity,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginDTO) => authApi.login(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.user, user);
      navigate("/dashboard", { replace: true });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterDTO) => authApi.register(userData),
    onSuccess: (user) => {
      queryClient.setQueryData(authQueryKeys.user, user);
      navigate("/dashboard", { replace: true });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      queryClient.clear();
      queryClient.setQueryData(authQueryKeys.user, null);
      navigate("/login", { replace: true });
    },
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: authQueryKeys.sessions,
    queryFn: () => authApi.getSessions(),
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => authApi.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: {
      email?: string;
      firstName?: string;
      lastName?: string;
    }) => authApi.updateProfile(userData),
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: authQueryKeys.user });
      const previousUser = queryClient.getQueryData<User>(authQueryKeys.user);

      // Optimistically update the cache with proper typing
      queryClient.setQueryData<User | undefined>(
        authQueryKeys.user,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            ...updates,
          };
        }
      );

      return { previousUser };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(authQueryKeys.user, context.previousUser);
      }
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(authQueryKeys.user, updatedUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
    },
  });
};
