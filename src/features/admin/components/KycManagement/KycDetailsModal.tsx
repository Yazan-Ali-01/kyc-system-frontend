import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateKycStatus } from "@/features/dashboard/api/kyc.query";
import KycStatusBadge from "./KycStatusBadge";
import {
  CheckCircle,
  XCircle,
  Download,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import { KycSubmission } from "@/features/dashboard/types/kyc.types";
import { environment } from "@/config/environment";
import DocumentViewer from "@/features/admin/components/KycManagement/DocumentViewer";

interface KycDetailsModalProps {
  submission: KycSubmission;
  onClose: () => void;
}

const KycDetailsModal = ({ submission, onClose }: KycDetailsModalProps) => {
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [imageError, setImageError] = useState(false);
  const updateStatusMutation = useUpdateKycStatus();

  const handleApprove = async () => {
    await updateStatusMutation.mutateAsync({
      kycId: submission._id,
      data: { status: "approved" },
    });
    setShowApproveDialog(false);
    onClose();
  };

  const handleReject = async () => {
    await updateStatusMutation.mutateAsync({
      kycId: submission._id,
      data: { status: "rejected", rejectionReason },
    });
    setShowRejectDialog(false);
    onClose();
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${environment.api.baseUrl}/${submission.idDocumentFile.filePath}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = submission.idDocumentFile.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDocumentIcon = () => {
    switch (submission.idDocumentFile.fileType) {
      case "image/jpeg":
      case "image/png":
        return <ImageIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <>
      {/* Main Modal */}
      <AlertDialog open={true} onOpenChange={onClose}>
        <AlertDialogContent className="max-w-4xl h-[90%] overflow-auto">
          {/* Header content remains the same */}
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>KYC Submission Details</span>
              <KycStatusBadge status={submission.status} />
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Personal Details</TabsTrigger>
              <TabsTrigger value="document">Document</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={`${submission.firstName} ${submission.lastName}`}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <Input
                        value={new Date(
                          submission.dateOfBirth
                        ).toLocaleDateString()}
                        readOnly
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Address Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Street</Label>
                      <Input value={submission.address.street} readOnly />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>City</Label>
                        <Input value={submission.address.city} readOnly />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input value={submission.address.state} readOnly />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Country</Label>
                        <Input value={submission.address.country} readOnly />
                      </div>
                      <div>
                        <Label>Postal Code</Label>
                        <Input value={submission.address.postalCode} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Document Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Document Type</Label>
                        <Input
                          value={submission.idDocumentType
                            .replace(/([A-Z])/g, " $1")
                            .toLowerCase()}
                          readOnly
                        />
                      </div>
                      <div>
                        <Label>Document Number</Label>
                        <Input value={submission.idDocumentNumber} readOnly />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="document">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Document Preview</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Original
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Document Info */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      {getDocumentIcon()}
                      <span>{submission.idDocumentFile.fileName}</span>
                    </div>

                    <DocumentViewer
                      fileType={submission.idDocumentFile.fileType}
                      filePath={submission.idDocumentFile.filePath}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced History Tab */}
            <TabsContent value="history">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="border-l-2 border-muted pl-4 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Created</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {formatDate(submission.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Initial submission created
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Document Uploaded</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {formatDate(submission.idDocumentFile.uploadDate)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {submission.idDocumentFile.fileName}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Last Updated</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {formatDate(submission.updatedAt)}
                          </span>
                        </div>
                        {/* {submission.status !== "pending" && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Status changed to {submission.status}
                            {submission.rejectionReason && (
                              <span className="block mt-2 text-red-500">
                                Reason: {submission.rejectionReason}
                              </span>
                            )}
                          </p>
                        )} */}
                      </div>
                    </div>

                    {/* Additional submission details */}
                    <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                      <h4 className="text-sm font-medium">
                        Submission Details
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Document Type:
                          </span>
                          <span className="ml-2 capitalize">
                            {submission.idDocumentType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <AlertDialogFooter>
            <div className="flex justify-between w-full">
              <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
              <div className="flex gap-2">
                {submission.status === "pending" && (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRejectDialog(true)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button onClick={() => setShowApproveDialog(true)}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject KYC Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting this KYC submission.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowRejectDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
              className="bg-destructive hover:bg-destructive/90"
            >
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approve Confirmation Dialog */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve KYC Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this KYC submission? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowApproveDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove}>
              Confirm Approval
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default KycDetailsModal;
