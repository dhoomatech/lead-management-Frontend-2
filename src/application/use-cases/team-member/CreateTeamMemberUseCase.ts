import { TeamMember, CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";
import { ValidationError } from "@/src/entities/errors/DomainErrors";
import { ITeamMemberRepository } from "@/src/application/repositories/ITeamMemberRepository";

function buildInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export class CreateTeamMemberUseCase {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async execute(data: CreateTeamMemberDTO): Promise<TeamMember> {
    const errors: Record<string, string> = {};
    if (!data.name?.trim()) errors.name = "Name is required";
    if (!data.email?.trim()) errors.email = "Email is required";
    if (!data.role) errors.role = "Role is required";
    if (Object.keys(errors).length > 0) throw new ValidationError(errors);

    return this.teamMemberRepository.create({
      ...data,
      // initials computed in repo impl so we cast here
    } as CreateTeamMemberDTO);
  }
}
