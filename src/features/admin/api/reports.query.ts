// src/features/admin/api/reports.query.ts

import { useQuery } from "@tanstack/react-query";
import { reportsApi } from "./reportsApi";

export const reportsQueryKeys = {
  overview: ["reports", "overview"] as const,
  timeline: ["reports", "timeline"] as const,
  documents: ["reports", "documents"] as const,
  geography: ["reports", "geography"] as const,
  processingTime: ["reports", "processingTime"] as const,
};

export const useOverviewStats = () => {
  return useQuery({
    queryKey: reportsQueryKeys.overview,
    queryFn: () => reportsApi.getOverviewStats(),
  });
};

export const useTimelineData = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: [...reportsQueryKeys.timeline, startDate, endDate],
    queryFn: () => reportsApi.getTimelineData(startDate, endDate),
    enabled: !!startDate || !!endDate,
  });
};

export const useDocumentDistribution = () => {
  return useQuery({
    queryKey: reportsQueryKeys.documents,
    queryFn: () => reportsApi.getDocumentDistribution(),
  });
};

export const useGeographicalDistribution = () => {
  return useQuery({
    queryKey: reportsQueryKeys.geography,
    queryFn: () => reportsApi.getGeographicalDistribution(),
  });
};

export const useProcessingTimeAnalytics = (
  startDate?: string,
  endDate?: string
) => {
  return useQuery({
    queryKey: [...reportsQueryKeys.processingTime, startDate, endDate],
    queryFn: () => reportsApi.getProcessingTimeAnalytics(startDate, endDate),
    enabled: !!startDate || !!endDate,
  });
};
