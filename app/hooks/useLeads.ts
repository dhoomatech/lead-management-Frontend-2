"use client";

import { useEffect, useCallback } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { leadService } from "@/app/services/leadService";
import { LeadFilters } from "@/src/application/repositories/ILeadRepository";
import { CreateLeadDTO, UpdateLeadDTO } from "@/src/entities/models/Lead";

export function useLeads(filters?: LeadFilters) {
  const leads     = useAppStore((s) => s.leads);
  const leadStats = useAppStore((s) => s.leadStats);
  const isLoading = useAppStore((s) => s.isLoading);
  const error     = useAppStore((s) => s.error);

  const refresh = useCallback(() => {
    leadService.fetchAll(filters);
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    leadService.fetchAll(filters);
    leadService.fetchStats();
  }, [JSON.stringify(filters)]);

  return {
    leads,
    leadStats,
    isLoading,
    error,
    refresh,
    createLead:  (data: CreateLeadDTO)             => leadService.create(data),
    updateLead:  (id: number, data: UpdateLeadDTO) => leadService.update(id, data),
    deleteLead:  (id: number)                      => leadService.remove(id),
  };
}
