import { useState } from "react";
import KycTable from "../components/KycManagement/KycTable";
import { KycSubmission } from "@/features/dashboard/types/kyc.types";
import KycDetailsModal from "@/features/admin/components/KycManagement/KycDetailsModal";
// import KycDetailsModal from "../components/KycManagement/KycDetailsModal";

const KycManagementPage = () => {
  const [selectedSubmission, setSelectedSubmission] =
    useState<KycSubmission | null>(null);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">KYC Management</h1>
      </div>

      <KycTable onViewDetails={setSelectedSubmission} />

      {selectedSubmission && (
        <KycDetailsModal  
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default KycManagementPage;
