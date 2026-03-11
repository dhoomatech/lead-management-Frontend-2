export type UserRole = "Admin" | "Manager" | "Salesperson" | "Digital Marketer";

export interface TeamMember {
  id: number;
  name: string;
  role: UserRole;
  email: string;
  initials: string;
  phone?: string;
  workingLocation?: string;
}

export interface CreateTeamMemberDTO {
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  workingLocation?: string;
}
