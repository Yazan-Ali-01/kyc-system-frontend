// src/features/dashboard/types/kyc.types.ts

export type AddressDTO = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};

export type KycSubmissionDTO = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: AddressDTO;
  idDocumentType: string;
  idDocumentNumber: string;
  idDocument: File;
};

export type KycStatus = "pending" | "approved" | "rejected";

export type KycSubmission = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: AddressDTO;
  idDocumentType: "passport" | "nationalId" | "drivingLicense";
  idDocumentNumber: string;
  status: KycStatus;
  submittedAt: string;
  updatedAt: string;
  rejectionReason?: string;
};

export type KycStats = {
  totalUsers: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
};

export type UpdateKycStatusDTO = {
  status: "approved" | "rejected";
  rejectionReason?: string;
};
