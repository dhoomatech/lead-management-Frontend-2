import { TeamMember, CreateTeamMemberDTO } from "@/src/entities/models/TeamMember";
import { ITeamMemberRepository } from "@/src/application/repositories/ITeamMemberRepository";

const SEED: TeamMember[] = [
  { id: 1, name: "Mike Chen",   role: "Salesperson",      email: "mike@dhooma.com",  initials: "MC" },
  { id: 2, name: "Ravi Kumar",  role: "Salesperson",      email: "ravi@dhooma.com",  initials: "RK" },
  { id: 3, name: "Priya Singh", role: "Digital Marketer", email: "priya@dhooma.com", initials: "PS" },
  { id: 4, name: "Arjun Nair",  role: "Manager",          email: "arjun@dhooma.com", initials: "AN" },
  { id: 5, name: "Meera Das",   role: "Salesperson",      email: "meera@dhooma.com", initials: "MD" },
];

let store: TeamMember[] = [...SEED];
let nextId = 6;

function buildInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export class InMemoryTeamMemberRepository implements ITeamMemberRepository {
  async findAll(): Promise<TeamMember[]> {
    return [...store];
  }

  async findById(id: number): Promise<TeamMember | null> {
    return store.find((m) => m.id === id) ?? null;
  }

  async create(data: CreateTeamMemberDTO): Promise<TeamMember> {
    const member: TeamMember = {
      id: nextId++,
      name: data.name,
      role: data.role,
      email: data.email,
      initials: buildInitials(data.name),
    };
    store = [...store, member];
    return member;
  }

  async delete(id: number): Promise<void> {
    store = store.filter((m) => m.id !== id);
  }
}
