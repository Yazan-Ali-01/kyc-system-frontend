// src/features/dashboard/components/AdminDashboard.tsx

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  usePendingSubmissions,
  useKycStats,
  useUpdateKycStatus,
} from "../api/kyc.query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [page, setPage] = useState(1);
  const { data: stats } = useKycStats();
  const { data: submissions, isLoading } = usePendingSubmissions(page);
  const updateStatus = useUpdateKycStatus();

  const handleStatusUpdate = async (
    kycId: string,
    status: "approved" | "rejected",
    rejectionReason?: string
  ) => {
    try {
      await updateStatus.mutateAsync({
        kycId,
        data: { status, rejectionReason },
      });
      toast.success(`KYC ${status} successfully`);
    } catch (_error) {
      toast.error("Failed to update KYC status");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending KYCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats?.pendingSubmissions || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approved KYCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats?.approvedSubmissions || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rejected KYCs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats?.rejectedSubmissions || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending KYC Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Document Type</th>
                    <th className="text-left p-4">Document Number</th>
                    <th className="text-left p-4">Submitted At</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions?.data.map((submission) => (
                    <tr key={submission.id} className="border-b">
                      <td className="p-4">
                        {submission.firstName} {submission.lastName}
                      </td>
                      <td className="p-4">{submission.idDocumentType}</td>
                      <td className="p-4">{submission.idDocumentNumber}</td>
                      <td className="p-4">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleStatusUpdate(submission.id, "approved")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleStatusUpdate(
                                submission.id,
                                "rejected",
                                "Invalid documentation"
                              )
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 flex justify-between">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!submissions?.data.length}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
