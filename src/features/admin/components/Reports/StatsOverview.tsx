import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCardData } from "../../types/reports.types";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsOverviewProps {
  stats: StatsCardData[];
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.trend && (
              <div
                className={`flex items-center text-xs ${
                  stat.trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend.isPositive ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span>{stat.trend.value}%</span>
              </div>
            )}
            {stat.description && (
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
