import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { StatsCardData } from "../types/reports.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsOverview from "@/features/admin/components/Reports/StatsOverview";
import KycStatusTimeline from "@/features/admin/components/Reports/KycStatusTimeline";
import { useOverviewStats, useTimelineData } from "../api/reports.query";
import { format, subDays } from "date-fns";
import DocumentDistributionChart from "@/features/admin/components/Reports/DocumentTypeDistribution";
import GeographyDistributionChart from "@/features/admin/components/Reports/GeographyDistributionChart";

const formatProcessingTime = (hours: number) => {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes}m`;
  }

  return `${hours.toFixed(1)}h`;
};

const ReportsPage = () => {
  const [dateRange] = useState({
    startDate: format(subDays(new Date(), 360), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useOverviewStats();

  const {
    data: timelineData,
    isLoading: isTimelineLoading,
    isError: isTimelineError,
  } = useTimelineData(dateRange.startDate, dateRange.endDate);

  if (isStatsLoading || isTimelineLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isStatsError || isTimelineError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {statsError instanceof Error
              ? statsError.message
              : "Failed to load reports data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats) return null;

  const statsCards: StatsCardData[] = [
    {
      title: "Total Submissions",
      value: stats.total,
      description: `${stats.todaySubmissions} new today`,
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate.toFixed(1)}%`,
      trend: {
        value: stats.weekOverWeek.percentageChange,
        isPositive: stats.weekOverWeek.isPositive,
      },
      description: "vs last week",
    },
    {
      title: "Average Processing Time",
      value: formatProcessingTime(stats.averageProcessingTime),
      trend: {
        value: 8,
        isPositive: false,
      },
      description: "vs last week",
    },
    {
      title: "Pending Reviews",
      value: stats.pending,
      description: "Awaiting verification",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">KYC Reports & Analytics</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <StatsOverview stats={statsCards} />
            <KycStatusTimeline data={timelineData || []} />
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <KycStatusTimeline data={timelineData || []} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentDistributionChart />
        </TabsContent>

        <TabsContent value="geography">
          <GeographyDistributionChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
