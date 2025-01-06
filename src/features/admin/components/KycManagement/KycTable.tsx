import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { usePendingSubmissions } from "@/features/dashboard/api/kyc.query";
import { formatDistanceToNow } from "date-fns";
import KycStatusBadge from "./KycStatusBadge";
import { KycSubmission } from "@/features/dashboard/types/kyc.types";
import EmptyState from "@/features/admin/components/KycManagement/KycEmptyState";

interface KycTableProps {
  onViewDetails: (submission: KycSubmission) => void;
}

const KycTable = ({ onViewDetails }: KycTableProps) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error, refetch } = usePendingSubmissions(
    page,
    limit
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading submissions</div>;
  }

  const { submissions, pagination } = data;
  const { total, totalPages } = pagination;

  // Handle empty state
  if (!submissions || submissions.length === 0) {
    return <EmptyState onRefresh={() => refetch()} />;
  }

  const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(page * limit, total);

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-accent">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Document Type</th>
              <th className="p-4 text-left">Submission Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission._id}
                className="border-b border-accent hover:bg-muted/50"
              >
                <td className="p-4">
                  {submission.firstName} {submission.lastName}
                </td>
                <td className="p-4 capitalize">
                  {submission.idDocumentType.replace(/([A-Z])/g, " $1").trim()}
                </td>
                <td className="p-4">
                  {formatDistanceToNow(new Date(submission.submissionDate), {
                    addSuffix: true,
                  })}
                </td>
                <td className="p-4">
                  <KycStatusBadge status={submission.status} />
                </td>
                <td className="p-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(submission)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-accent flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {total > 0
            ? `Showing ${startEntry} to ${endEntry} of ${total} entries`
            : "No entries to show"}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || total === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default KycTable;
