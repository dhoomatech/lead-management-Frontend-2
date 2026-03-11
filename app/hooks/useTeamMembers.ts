"use client";

import { useEffect } from "react";
import { useAppStore } from "@/app/store/useAppStore";
import { teamMemberService } from "@/app/services/teamMemberService";
import { CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";

export function useTeamMembers() {
  const teamMembers = useAppStore((s) => s.teamMembers);

  useEffect(() => {
    teamMemberService.fetchAll();
  }, []);

  return {
    teamMembers,
    addMember:    (data: CreateTeamMemberDTO) => teamMemberService.create(data),
    removeMember: (id: number)               => teamMemberService.remove(id),
  };
}
