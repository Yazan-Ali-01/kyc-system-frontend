import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { KycSubmissionDTO, UpdateKycStatusDTO } from "../types/kyc.types";
import { kycApi } from "./kycApi";

export const kycQueryKeys = {
  stats: ["kyc", "stats"] as const,
  pendingSubmissions: ["kyc", "pending"] as const,
  details: (id: string) => ["kyc", "details", id] as const,
};

export const useSubmitKyc = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: KycSubmissionDTO) => kycApi.submitKyc(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc"] });
    },
  });
};

export const useKycDetails = (kycId: string) => {
  return useQuery({
    queryKey: kycQueryKeys.details(kycId),
    queryFn: () => kycApi.getKycDetails(kycId),
    enabled: !!kycId,
  });
};

export const usePendingSubmissions = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [...kycQueryKeys.pendingSubmissions, page, limit],
    queryFn: () => kycApi.getPendingSubmissions(page, limit),
  });
};

export const useUpdateKycStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      kycId,
      data,
    }: {
      kycId: string;
      data: UpdateKycStatusDTO;
    }) => kycApi.updateKycStatus(kycId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc"] });
    },
  });
};

export const useKycStats = () => {
  return useQuery({
    queryKey: kycQueryKeys.stats,
    queryFn: () => kycApi.getKycStats(),
  });
};
