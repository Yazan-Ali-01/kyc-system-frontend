import { environment } from "@/config/environment";
import { AppError, handleApiResponse } from "@/utils/error-utils";
import type {
  CountryDistribution,
  DocumentTypeDistribution,
  KycStats,
  ProcessingTimeData,
  TimelineData,
} from "../types/reports.types";

const { baseUrl, endpoints } = environment.api;
const { reports: reportsEndpoints } = endpoints;

const defaultOptions: RequestInit = {
  credentials: "include" as RequestCredentials,
};

export const reportsApi = {
  getOverviewStats: async (): Promise<KycStats> => {
    try {
      const response = await fetch(`${baseUrl}${reportsEndpoints.overview}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<KycStats>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch overview statistics",
        500
      );
    }
  },

  getTimelineData: async (
    startDate?: string,
    endDate?: string
  ): Promise<TimelineData[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await fetch(
        `${baseUrl}${reportsEndpoints.timeline}?${queryParams.toString()}`,
        {
          ...defaultOptions,
          method: "GET",
        }
      );

      return handleApiResponse<TimelineData[]>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch timeline data",
        500
      );
    }
  },

  getDocumentDistribution: async (): Promise<DocumentTypeDistribution[]> => {
    try {
      const response = await fetch(`${baseUrl}${reportsEndpoints.documents}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<DocumentTypeDistribution[]>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch document distribution",
        500
      );
    }
  },

  getGeographicalDistribution: async (): Promise<CountryDistribution[]> => {
    try {
      const response = await fetch(`${baseUrl}${reportsEndpoints.geography}`, {
        ...defaultOptions,
        method: "GET",
      });

      return handleApiResponse<CountryDistribution[]>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch geographical distribution",
        500
      );
    }
  },

  getProcessingTimeAnalytics: async (
    startDate?: string,
    endDate?: string
  ): Promise<ProcessingTimeData[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (startDate) queryParams.append("startDate", startDate);
      if (endDate) queryParams.append("endDate", endDate);

      const response = await fetch(
        `${baseUrl}${
          reportsEndpoints.processingTime
        }?${queryParams.toString()}`,
        {
          ...defaultOptions,
          method: "GET",
        }
      );

      return handleApiResponse<ProcessingTimeData[]>(response);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        (error as Error).message || "Failed to fetch processing time analytics",
        500
      );
    }
  },
};
