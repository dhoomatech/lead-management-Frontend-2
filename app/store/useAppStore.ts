"use client";

/**
 * App Store — thin UI state layer.
 * Business logic lives in controllers/use-cases; this only holds
 * rendered state and triggers side-effect calls to the DI container.
 */
import { create } from "zustand";
import { Lead, CreateLeadDTO, UpdateLeadDTO } from "@/src/entities/models/Lead";
import { TeamMember, CreateTeamMemberDTO }    from "@/src/entities/models/TeamMember";
import { User }                               from "@/src/entities/models/User";
import { LeadStats }                          from "@/src/application/use-cases/lead/GetLeadStatsUseCase";

interface AppState {
  // Auth
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;

  // Leads
  leads: Lead[];
  leadStats: LeadStats | null;
  setLeads: (leads: Lead[]) => void;
  setLeadStats: (stats: LeadStats) => void;

  // Team
  teamMembers: TeamMember[];
  setTeamMembers: (members: TeamMember[]) => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;

  // Loading / Error
  isLoading: boolean;
  error: string | null;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),

  leads: [],
  leadStats: null,
  setLeads: (leads) => set({ leads }),
  setLeadStats: (leadStats) => set({ leadStats }),

  teamMembers: [],
  setTeamMembers: (teamMembers) => set({ teamMembers }),

  toast: null,
  showToast: (toast) => {
    set({ toast });
    setTimeout(() => set({ toast: null }), 3000);
  },
  clearToast: () => set({ toast: null }),

  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
