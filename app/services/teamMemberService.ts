"use client";

import { teamMemberController } from "@/di/container";
import { CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";
import { useAppStore } from "@/app/store/useAppStore";

export const teamMemberService = {
  async fetchAll() {
    const { setTeamMembers, setError } = useAppStore.getState();
    try {
      const members = await teamMemberController.getTeamMembers();
      setTeamMembers(members);
    } catch (e: any) {
      setError(e.message);
    }
  },

  async create(data: CreateTeamMemberDTO) {
    const { showToast, setError } = useAppStore.getState();
    try {
      await teamMemberController.createTeamMember(data);
      await teamMemberService.fetchAll();
      showToast("Team member added successfully");
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  },

  async remove(id: number) {
    const { showToast, setError } = useAppStore.getState();
    try {
      await teamMemberController.deleteTeamMember(id);
      await teamMemberService.fetchAll();
      showToast("Team member removed");
    } catch (e: any) {
      setError(e.message);
    }
  },
};
