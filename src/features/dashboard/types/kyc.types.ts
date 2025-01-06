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

interface IdDocumentFile {
  fileName: string;
  fileType: string;
  filePath: string;
  uploadDate: string;
}

export type KycSubmission = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: AddressDTO;
  idDocumentType: string;
  idDocumentNumber: string;
  idDocumentFile: IdDocumentFile;
  status: "approved" | "rejected" | "pending";
  rejectionReason: string;
  submissionDate: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
};

export type KycStats = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

export type UpdateKycStatusDTO = {
  status: "approved" | "rejected";
  rejectionReason?: string;
};
