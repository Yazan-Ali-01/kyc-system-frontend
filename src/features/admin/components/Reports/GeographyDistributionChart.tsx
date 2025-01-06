

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGeographicalDistribution } from "../../api/reports.query";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GeographyDistributionChart = () => {
  const { data, isLoading } = useGeographicalDistribution();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }


  const sortedData = [...(data || [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Countries by KYC Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ left: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis 
                dataKey="country" 
                type="category"
                width={100}
              />
              <Tooltip 
                formatter={(value: number) => [value, "Submissions"]}
              />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeographyDistributionChart;