

import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface KycStatusBadgeProps {
  status: "pending" | "approved" | "rejected";
}

const KycStatusBadge = ({ status }: KycStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          variant: "default" as const,
          label: "Pending",
        };
      case "approved":
        return {
          icon: CheckCircle,
          variant: "success" as const,
          label: "Approved",
        };
      case "rejected":
        return {
          icon: XCircle,
          variant: "destructive" as const,
          label: "Rejected",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

export default KycStatusBadge;
