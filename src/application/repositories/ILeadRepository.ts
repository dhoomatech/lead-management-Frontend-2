import { Lead, CreateLeadDTO, UpdateLeadDTO, LeadStatus, LeadSource } from "@/src/entities/models/Lead";

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  assignTo?: string;
  search?: string;
}

export interface ILeadRepository {
  findAll(filters?: LeadFilters): Promise<Lead[]>;
  findById(id: number): Promise<Lead | null>;
  create(data: CreateLeadDTO): Promise<Lead>;
  update(id: number, data: UpdateLeadDTO): Promise<Lead>;
  delete(id: number): Promise<void>;
  count(): Promise<number>;
  countByStatus(): Promise<Record<LeadStatus, number>>;
}
