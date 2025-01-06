

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentDistribution } from "../../api/reports.query";
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

const DocumentDistributionChart = () => {
  const { data, isLoading } = useDocumentDistribution();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const formatDocumentType = (type: string) => {
    return type
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Type Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tickFormatter={formatDocumentType} />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [value, "Documents"]}
                labelFormatter={formatDocumentType}
              />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentDistributionChart;
