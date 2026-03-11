"use client";

/**
 * leadService
 * Thin async wrappers that call the DI container's LeadController
 * and update the Zustand store. Components call these instead of
 * touching the controller or repository directly.
 */
import { leadController } from "@/di/container";
import { CreateLeadDTO, UpdateLeadDTO } from "@/src/entities/models/Lead";
import { LeadFilters } from "@/src/application/repositories/ILeadRepository";
import { useAppStore } from "@/app/store/useAppStore";

export const leadService = {
  async fetchAll(filters?: LeadFilters) {
    const { setLeads, setLoading, setError } = useAppStore.getState();
    setLoading(true);
    try {
      const leads = await leadController.getLeads(filters);
      setLeads(leads);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  },

  async fetchStats() {
    const { setLeadStats, setError } = useAppStore.getState();
    try {
      const stats = await leadController.getStats();
      setLeadStats(stats);
    } catch (e: any) {
      setError(e.message);
    }
  },

  async create(data: CreateLeadDTO) {
    const { showToast, setError } = useAppStore.getState();
    try {
      await leadController.createLead(data);
      await leadService.fetchAll();
      await leadService.fetchStats();
      showToast("New lead added successfully");
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  },

  async update(id: number, data: UpdateLeadDTO) {
    const { showToast, setError } = useAppStore.getState();
    try {
      await leadController.updateLead(id, data);
      await leadService.fetchAll();
      showToast("Lead updated");
    } catch (e: any) {
      setError(e.message);
    }
  },

  async remove(id: number) {
    const { showToast, setError } = useAppStore.getState();
    try {
      await leadController.deleteLead(id);
      await leadService.fetchAll();
      await leadService.fetchStats();
      showToast("Lead removed");
    } catch (e: any) {
      setError(e.message);
    }
  },
};
