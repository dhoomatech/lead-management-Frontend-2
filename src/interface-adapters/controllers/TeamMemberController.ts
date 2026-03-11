import { GetTeamMembersUseCase } from "@/src/application/use-cases/team-member/GetTeamMembersUseCase";
import { CreateTeamMemberUseCase } from "@/src/application/use-cases/team-member/CreateTeamMemberUseCase";
import { DeleteTeamMemberUseCase } from "@/src/application/use-cases/team-member/DeleteTeamMemberUseCase";
import { TeamMember, CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";

export class TeamMemberController {
  constructor(
    private readonly getTeamMembersUseCase: GetTeamMembersUseCase,
    private readonly createTeamMemberUseCase: CreateTeamMemberUseCase,
    private readonly deleteTeamMemberUseCase: DeleteTeamMemberUseCase
  ) {}

  async getTeamMembers(): Promise<TeamMember[]> {
    return this.getTeamMembersUseCase.execute();
  }

  async createTeamMember(data: CreateTeamMemberDTO): Promise<TeamMember> {
    return this.createTeamMemberUseCase.execute(data);
  }

  async deleteTeamMember(id: number): Promise<void> {
    return this.deleteTeamMemberUseCase.execute(id);
  }
}
