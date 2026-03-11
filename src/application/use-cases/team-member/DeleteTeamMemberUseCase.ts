import { TeamMemberNotFoundError } from "@/src/entities/errors/DomainErrors";
import { ITeamMemberRepository } from "@/src/application/repositories/ITeamMemberRepository";

export class DeleteTeamMemberUseCase {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async execute(id: number): Promise<void> {
    const existing = await this.teamMemberRepository.findById(id);
    if (!existing) throw new TeamMemberNotFoundError(id);
    await this.teamMemberRepository.delete(id);
  }
}
