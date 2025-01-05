export interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  errors?: ApiError[];
  timestamp: number;
  path?: string;
  stack?: string;
}

export interface ApiError {
  field?: string;
  message: string;
  code?: string;
}
