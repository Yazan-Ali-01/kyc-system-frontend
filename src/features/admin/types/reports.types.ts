export interface KycStatusCount {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export interface KycStats extends KycStatusCount {
  todaySubmissions: number;
  averageProcessingTime: number;
  completionRate: number;
  weekOverWeek: {
    percentageChange: number;
    isPositive: boolean;
  };
}

export interface CountryDistribution {
  country: string;
  count: number;
}

export interface DocumentTypeDistribution {
  type: "passport" | "nationalId" | "drivingLicense";
  count: number;
}

export interface ProcessingTimeData {
  date: string;
  averageTime: number;
}

export interface TimelineData {
  date: string;
  submissions: number;
  approved: number;
  rejected: number;
}

export interface StatsCardData {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}
