/**
 * TeamMember DI Module
 * Binds TeamMember repository, use-cases, and controller.
 */
import { InMemoryTeamMemberRepository } from "@/src/infrastructure/repositories/InMemoryTeamMemberRepository";

import { GetTeamMembersUseCase }   from "@/src/application/use-cases/team-member/GetTeamMembersUseCase";
import { CreateTeamMemberUseCase } from "@/src/application/use-cases/team-member/CreateTeamMemberUseCase";
import { DeleteTeamMemberUseCase } from "@/src/application/use-cases/team-member/DeleteTeamMemberUseCase";
import { TeamMemberController }    from "@/src/interface-adapters/controllers/TeamMemberController";

// ── Repository ──────────────────────────────────────────────────────────────
export const teamMemberRepository = new InMemoryTeamMemberRepository();

// ── Use Cases ────────────────────────────────────────────────────────────────
export const getTeamMembersUseCase   = new GetTeamMembersUseCase(teamMemberRepository);
export const createTeamMemberUseCase = new CreateTeamMemberUseCase(teamMemberRepository);
export const deleteTeamMemberUseCase = new DeleteTeamMemberUseCase(teamMemberRepository);

// ── Controller ───────────────────────────────────────────────────────────────
export const teamMemberController = new TeamMemberController(
  getTeamMembersUseCase,
  createTeamMemberUseCase,
  deleteTeamMemberUseCase
);
