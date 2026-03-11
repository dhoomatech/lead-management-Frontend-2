import { TeamMember } from "@/src/entities/models/TeamMember";
import { ITeamMemberRepository } from "@/src/application/repositories/ITeamMemberRepository";

export class GetTeamMembersUseCase {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async execute(): Promise<TeamMember[]> {
    return this.teamMemberRepository.findAll();
  }
}
