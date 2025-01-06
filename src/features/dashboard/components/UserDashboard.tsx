import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock, Plus, Loader2 } from "lucide-react";
import SubmitKycForm from "./SubmitKycForm";
import { useKycDetails } from "../api/kyc.query";
import { YazanCarousel } from "@/components/YazanCarousel";

const UserDashboard = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const {
    data: kycDetails,
    isLoading,
    isError,
    error,
  } = useKycDetails("latest");

  const getStatusAlert = () => {
    if (!kycDetails) return null;

    switch (kycDetails.status) {
      case "pending":
        return (
          <Alert>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4" />
              <AlertTitle>Verification In Progress</AlertTitle>
            </div>
            <AlertDescription>
              Your KYC submission from{" "}
              {new Date(kycDetails.submissionDate).toLocaleDateString()} is
              being reviewed. We'll notify you once the verification is
              complete.
            </AlertDescription>
          </Alert>
        );
      case "approved":
        return (
          <Alert>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle>Verification Complete</AlertTitle>
            </div>
            <AlertDescription>
              Your KYC was approved on{" "}
              {new Date(kycDetails.updatedAt).toLocaleDateString()}. Your
              account is now fully verified.
            </AlertDescription>
          </Alert>
        );
      case "rejected":
        return (
          <Alert variant="destructive">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
            </div>
            <AlertDescription>
              <p>
                Your KYC submission was rejected on{" "}
                {new Date(kycDetails.updatedAt).toLocaleDateString()}.
              </p>
              {kycDetails.rejectionReason && (
                <p className="mt-2">Reason: {kycDetails.rejectionReason}</p>
              )}
              <p className="mt-2">
                Please submit a new application with the corrected information.
              </p>
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
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
              : "Failed to load KYC details"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  console.log(" !kycDetails", !kycDetails);
  console.log(
    ' kycDetails.status === "rejected";',
    kycDetails?.status === "rejected"
  );
  const canSubmitNewKyc = !kycDetails || kycDetails.status === "rejected";

  return (
    <div className="container mx-auto p-6 space-y-6">
      <YazanCarousel />
      {/* New Submission Button */}
      {canSubmitNewKyc && (
        <div className="flex justify-end">
          <Button
            onClick={() => setShowSubmissionForm(!showSubmissionForm)}
            className="flex items-center gap-2"
          >
            {showSubmissionForm ? (
              "Cancel Submission"
            ) : (
              <>
                <Plus className="h-4 w-4" />
                {kycDetails ? "Submit New Application" : "Start Verification"}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Status Overview */}
      <Card className="bg-accent">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">KYC Status</CardTitle>
        </CardHeader>
        <CardContent>
          {kycDetails ? (
            getStatusAlert()
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                Please submit your KYC documentation to begin the verification
                process.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Submission Form */}
      {showSubmissionForm && canSubmitNewKyc && (
        <Card>
          <CardHeader>
            <CardTitle>Submit KYC Documentation</CardTitle>
            <p className="text-sm text-gray-500">
              Please provide your identification details and documentation for
              verification.
            </p>
          </CardHeader>
          <CardContent>
            <SubmitKycForm />
          </CardContent>
        </Card>
      )}

      {/* Current Submission Details */}
      {kycDetails && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Submission Details</CardTitle>
              <Badge
                variant={
                  kycDetails.status === "approved"
                    ? "success"
                    : kycDetails.status === "rejected"
                    ? "destructive"
                    : "default"
                }
              >
                {kycDetails.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Document Type</p>
                <p className="font-medium">{kycDetails.idDocumentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Document Number</p>
                <p className="font-medium">{kycDetails.idDocumentNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Submission Date</p>
                <p className="font-medium">
                  {new Date(kycDetails.submissionDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(kycDetails.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserDashboard;
