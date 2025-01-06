// src/features/dashboard/api/kycApi.ts

import { environment } from "@/config/environment";
import { AppError, handleApiResponse } from "@/utils/error-utils";
import {
  KycStats,
  KycSubmission,
  KycSubmissionDTO,
  UpdateKycStatusDTO,
} from "../types/kyc.types";

const { baseUrl, endpoints } = environment.api;
const { kyc: kycEndpoints } = endpoints;

const defaultOptions: RequestInit = {
  credentials: "include" as RequestCredentials,
};

export const kycApi = {
  submitKyc: async (data: KycSubmissionDTO): Promise<KycSubmission> => {
    try {
      const formData = new FormData();

      // Append file
      formData.append("idDocument", data.idDocument);

      // Type-safe way to append other fields
      const { idDocument: _, address, ...otherFields } = data;

      // Append all other fields except address and idDocument
      Object.entries(otherFields).forEach(([key, value]) => {
        // Convert all values to string before appending
        formData.append(key, String(value));
      });

      // Append address fields
      Object.entries(address).forEach(([key, value]) => {
        formData.append(`address[${key}]`, String(value));
      });

      const response = await fetch(`${baseUrl}${kycEndpoints.submit}`, {
        ...defaultOptions,
        method: "POST",
        body: formData,
      });

      return handleApiResponse<KycSubmission>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "KYC submission failed",
        500
      );
    }
  },

  getKycDetails: async (kycId: string): Promise<KycSubmission> => {
    try {
      const response = await fetch(
        `${baseUrl}${kycEndpoints.details}/${kycId}`,
        {
          ...defaultOptions,
          method: "GET",
        }
      );

      return handleApiResponse<KycSubmission>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch KYC details",
        500
      );
    }
  },

  getPendingSubmissions: async (
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: KycSubmission[]; total: number }> => {
    try {
      const response = await fetch(
        `${baseUrl}${kycEndpoints.pending}?page=${page}&limit=${limit}`,
        {
          ...defaultOptions,
          method: "GET",
        }
      );

      return handleApiResponse<{ data: KycSubmission[]; total: number }>(
        response
      );
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch pending submissions",
        500
      );
    }
  },

  updateKycStatus: async (
    kycId: string,
    data: UpdateKycStatusDTO
  ): Promise<KycSubmission> => {
    try {
      const response = await fetch(
        `${baseUrl}${kycEndpoints.status}/${kycId}`,
        {
          ...defaultOptions,
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      return handleApiResponse<KycSubmission>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to update KYC status",
        500
      );
    }
  },

  getKycStats: async (): Promise<KycStats> => {
    try {
      const response = await fetch(`${baseUrl}${kycEndpoints.stats}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<KycStats>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch KYC stats",
        500
      );
    }
  },
};
