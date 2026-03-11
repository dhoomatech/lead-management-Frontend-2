export const TYPES = {
  // Repositories
  ILeadRepository:       Symbol.for("ILeadRepository"),
  ITeamMemberRepository: Symbol.for("ITeamMemberRepository"),
  IFeedbackRepository:   Symbol.for("IFeedbackRepository"),

  // Services
  IAuthService: Symbol.for("IAuthService"),

  // Use Cases — Lead
  GetLeadsUseCase:       Symbol.for("GetLeadsUseCase"),
  GetLeadByIdUseCase:    Symbol.for("GetLeadByIdUseCase"),
  CreateLeadUseCase:     Symbol.for("CreateLeadUseCase"),
  UpdateLeadUseCase:     Symbol.for("UpdateLeadUseCase"),
  DeleteLeadUseCase:     Symbol.for("DeleteLeadUseCase"),
  GetLeadStatsUseCase:   Symbol.for("GetLeadStatsUseCase"),

  // Use Cases — TeamMember
  GetTeamMembersUseCase:    Symbol.for("GetTeamMembersUseCase"),
  CreateTeamMemberUseCase:  Symbol.for("CreateTeamMemberUseCase"),
  DeleteTeamMemberUseCase:  Symbol.for("DeleteTeamMemberUseCase"),

  // Controllers
  LeadController:       Symbol.for("LeadController"),
  TeamMemberController: Symbol.for("TeamMemberController"),
} as const;
