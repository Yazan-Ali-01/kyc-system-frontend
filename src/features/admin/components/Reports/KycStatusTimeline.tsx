

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelineData } from "../../types/reports.types";
import { Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface KycStatusTimelineProps {
  data: TimelineData[];
}

const KycStatusTimeline = ({ data }: KycStatusTimelineProps) => {
  if (!data.length) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Processing Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [value, "Count"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="submissions"
                stroke="#8884d8"
                name="Total Submissions"
              />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#82ca9d"
                name="Approved"
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#ff7c7c"
                name="Rejected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default KycStatusTimeline;
