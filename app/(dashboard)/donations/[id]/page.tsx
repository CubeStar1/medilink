"use client"

import * as React from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { MedicationWithRequests } from "@/lib/types/schema"
import DonationDetailsLoading from "./loading"
import { AlertTriangle } from "lucide-react"
import axios, { AxiosError } from "axios"
import { DonationHeader } from '@/components/donations/donation-header'
import { DonationDescription } from '@/components/donations/donation-description'
import { PendingRequests } from '@/components/donations/pending-requests'
import { DonationDetailsSidebar } from '@/components/donations/donation-details-sidebar'
import { use } from 'react'

async function fetchMedicationDetails(id: string): Promise<MedicationWithRequests> {
  try {
    const response = await axios.get(`/api/medications/list/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.details || 'Failed to fetch medication details');
    }
    throw error;
  }
}

async function handleRequestStatus(
  requestId: string, 
  action: 'approve' | 'reject', 
  data?: { note?: string; estimatedDeliveryDate?: string; reason?: string; }
) {
  try {
    const response = await axios.put('/api/requests/update', {
      requestId,
      status: action === 'approve' ? 'approved' : 'rejected',
      note: data?.note,
      estimatedDeliveryDate: data?.estimatedDeliveryDate,
      reason: data?.reason,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to update request status');
    }
    throw error;
  }
}

export default function DonationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const { data: donation, isLoading, error } = useQuery<MedicationWithRequests>({
    queryKey: ['medication', id],
    queryFn: () => fetchMedicationDetails(id),
  });

  const queryClient = useQueryClient();

  const requestMutation = useMutation({
    mutationFn: ({ 
      requestId, 
      action, 
      note, 
      estimatedDeliveryDate,
      reason 
    }: { 
      requestId: string; 
      action: 'approve' | 'reject';
      note?: string;
      estimatedDeliveryDate?: string;
      reason?: string;
    }) =>
      handleRequestStatus(requestId, action, { note, estimatedDeliveryDate, reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medication', id] });
      toast.success('Request status updated successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to update request status');
    },
  });

  if (isLoading) {
    return <DonationDetailsLoading />;
  }

  if (error || !donation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-6 w-6" />
          <p>Error loading donation details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-4 py-6">
      <div className="w-full max-w-5xl space-y-6">
        <DonationHeader
          name={donation.name}
          category={donation.category}
          status={donation.status}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <DonationDescription
              description={donation.description}
              composition={donation.composition}
              documents={donation.documents}
            />

            <PendingRequests
              requests={donation.requests}
              unit={donation.unit}
              onRequestAction={({ requestId, action, note, estimatedDeliveryDate, reason }) => {
                requestMutation.mutate({ requestId, action, note, estimatedDeliveryDate, reason });
              }}
              isSubmitting={requestMutation.isPending}
            />
          </div>

          <div className="space-y-6">
            <DonationDetailsSidebar
              quantity={donation.quantity}
              unit={donation.unit}
              expiryDate={donation.expiryDate}
              storageTemp={donation.storageTemp}
              createdAt={donation.createdAt}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 