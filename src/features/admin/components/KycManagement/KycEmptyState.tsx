import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { QueryObserverResult } from "@tanstack/react-query";

const EmptyState = ({
  onRefresh,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRefresh: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
      toast.success("Successfully refreshed KYC submissions");
    } catch (_error) {
      toast.error("Failed to refresh KYC submissions");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
        {/* Animated Icon */}
        <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 animate-pulse bg-primary/10 rounded-full" />
          <FileText className="w-16 h-16 text-primary/50" />
        </div>

        {/* Main Text with Shine Effect */}
        <div className="relative overflow-hidden">
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-primary/60 via-primary to-primary/60 bg-[length:200%] animate-shine bg-clip-text text-transparent">
            No KYC Submissions Yet
          </h3>
        </div>

        {/* Informative Text */}
        <p className="text-muted-foreground max-w-md">
          There are currently no pending KYC submissions to review. New
          submissions will appear here once customers begin the verification
          process.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="group"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 transition-all duration-1000 ${
                isRefreshing
                  ? "[animation:spin_2s_linear_infinite]"
                  : "group-hover:rotate-180"
              }`}
            />

            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-8">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          System is actively monitoring for new submissions (30 seconds
          interval)
        </div>
      </div>
    </Card>
  );
};

export default EmptyState;
