import { TeamMember, CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";

export interface ITeamMemberRepository {
  findAll(): Promise<TeamMember[]>;
  findById(id: number): Promise<TeamMember | null>;
  create(data: CreateTeamMemberDTO): Promise<TeamMember>;
  delete(id: number): Promise<void>;
}
