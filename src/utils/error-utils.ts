import { ApiError, ApiResponse } from "@/features/auth/types/api.types";

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: ApiError[],
    public path?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handleApiResponse = async <T>(response: Response): Promise<T> => {
  const apiResponse: ApiResponse<T> = await response.json();

  if (!apiResponse.success) {
    throw new AppError(
      apiResponse.message || "An error occurred",
      apiResponse.statusCode || response.status,
      apiResponse.errors,
      apiResponse.path
    );
  }

  return apiResponse.data as T;
};
