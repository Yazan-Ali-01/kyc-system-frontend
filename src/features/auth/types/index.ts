export type UserRole = 'admin' | 'user';


export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'admin';
}

export interface SessionInfo {
  tokenId: string;
  deviceInfo: string;
  ipAddress: string;
  lastUsed: string;
  expiryTime: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

