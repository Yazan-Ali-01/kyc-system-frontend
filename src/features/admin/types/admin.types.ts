// src/features/admin/types/admin.types.ts

import { KycSubmission } from "@/features/dashboard/types/kyc.types";

export interface KycStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export interface PaginatedKycSubmissions {
  data: KycSubmission[];
  total: number;
}

export interface KycStatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}
