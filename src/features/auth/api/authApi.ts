import { environment } from "@/config/environment";
import { AppError, handleApiResponse } from "@/utils/error-utils";
import { LoginDTO, RegisterDTO, SessionInfo, User } from "../types";

const { baseUrl, endpoints } = environment.api;
const { auth: authEndpoints } = endpoints;

const defaultOptions: RequestInit = {
  headers: { "Content-Type": "application/json" },
  credentials: "include" as RequestCredentials,
};

export const authApi = {
  login: async (credentials: LoginDTO): Promise<User> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.login}`, {
        ...defaultOptions,
        method: "POST",
        body: JSON.stringify(credentials),
      });

      return handleApiResponse<User>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError((error as Error).message || "Login failed", 500);
    }
  },

  register: async (userData: RegisterDTO): Promise<User> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.register}`, {
        ...defaultOptions,
        method: "POST",
        body: JSON.stringify(userData),
      });

      return handleApiResponse<User>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        (error as Error).message || "Registration failed",
        500
      );
    }
  },

  logout: async (): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.logout}`, {
        ...defaultOptions,
        method: "POST",
      });

      return handleApiResponse<void>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError((error as Error).message || "Logout failed", 500);
    }
  },

  getSessions: async (): Promise<SessionInfo[]> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.sessions}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<SessionInfo[]>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        (error as Error).message || "Failed to fetch sessions",
        500
      );
    }
  },

  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.me}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<User>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        (error as Error).message || "Failed to fetch user",
        500
      );
    }
  },


  revokeSession: async (sessionId: string): Promise<void> => {
    try {
      const response = await fetch(
        `${baseUrl}${authEndpoints.sessions}/${sessionId}`,
        {
          ...defaultOptions,
          method: "DELETE",
        }
      );

      return handleApiResponse<void>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        (error as Error).message || "Failed to revoke session",
        500
      );
    }
  },

  refreshToken: async (): Promise<User> => {
    try {
      const response = await fetch(`${baseUrl}${authEndpoints.refresh}`, {
        ...defaultOptions,
        method: "POST",
      });

      return handleApiResponse<User>(response);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        (error as Error).message || "Token refresh failed",
        500
      );
    }
  },
};
