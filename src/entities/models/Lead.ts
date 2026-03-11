export type LeadStatus = "NEW" | "QUALIFIED" | "DISQUALIFIED" | "PENDING";
export type LeadSource = "Facebook" | "Instagram" | "Google" | "LinkedIn";

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  status: LeadStatus;
  assignTo: string;
  dateAdded: string;
}

export interface CreateLeadDTO {
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  assignTo?: string;
}

export interface UpdateLeadDTO {
  status?: LeadStatus;
  assignTo?: string;
  source?: LeadSource;
}
