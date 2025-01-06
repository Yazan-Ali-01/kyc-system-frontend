import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KycStats, KycStatsCardProps } from "../../types/admin.types";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const StatsCard = ({
  title,
  value,
  description,
  trend,
  icon,
}: KycStatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {trend && (
        <div
          className={`text-xs ${
            trend.isPositive ? "text-green-500" : "text-red-500"
          } flex items-center gap-1`}
        >
          {trend.isPositive ? "↑" : "↓"} {trend.value}%
        </div>
      )}
    </CardContent>
  </Card>
);

interface KycStatsCardsProps {
  stats: KycStats;
}

const KycStatsCards = ({ stats }: KycStatsCardsProps) => {
  const cards: KycStatsCardProps[] = [
    {
      title: "Pending Review",
      value: stats.pending,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      description: "Awaiting verification",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      description: "Successfully verified",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      description: "Failed verification",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <StatsCard key={index} {...card} />
      ))}
    </div>
  );
};

export default KycStatsCards;
