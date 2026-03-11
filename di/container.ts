/**
 * DI Container — root composition root.
 * Imports from feature modules and re-exports for application use.
 * To swap an implementation (e.g., InMemory → Prisma), change
 * the relevant module file only — nothing else needs to change.
 */

// Lead domain
export {
  leadRepository,
  leadController,
  getLeadsUseCase,
  getLeadByIdUseCase,
  createLeadUseCase,
  updateLeadUseCase,
  deleteLeadUseCase,
  getLeadStatsUseCase,
} from "./modules/lead.module";

// TeamMember domain
export {
  teamMemberRepository,
  teamMemberController,
  getTeamMembersUseCase,
  createTeamMemberUseCase,
  deleteTeamMemberUseCase,
} from "./modules/team-member.module";

// Auth & Feedback
export {
  authService,
  feedbackRepository,
  feedbackController,
  addFeedbackUseCase,
  getFeedbackByLeadUseCase,
} from "./modules/auth.module";
