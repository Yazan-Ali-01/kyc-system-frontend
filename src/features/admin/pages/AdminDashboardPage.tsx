import KycStatsCards from "../components/Stats/KycStatsCards";
import KycStatsCharts from "../components/Stats/KycStatsCharts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useOverviewStats } from "@/features/admin/api/reports.query";
import LoadingSpinner from "@/components/ui/loading-spinner";

const AdminDashboardPage = () => {
  const { data: stats, isLoading, isError, error } = useOverviewStats();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load KYC statistics"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription>No KYC statistics available</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="space-y-6">
        <KycStatsCards stats={stats} />
        <KycStatsCharts stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
