import { GetLeadsUseCase } from "@/src/application/use-cases/lead/GetLeadsUseCase";
import { GetLeadByIdUseCase } from "@/src/application/use-cases/lead/GetLeadByIdUseCase";
import { CreateLeadUseCase } from "@/src/application/use-cases/lead/CreateLeadUseCase";
import { UpdateLeadUseCase } from "@/src/application/use-cases/lead/UpdateLeadUseCase";
import { DeleteLeadUseCase } from "@/src/application/use-cases/lead/DeleteLeadUseCase";
import { GetLeadStatsUseCase } from "@/src/application/use-cases/lead/GetLeadStatsUseCase";
import { Lead, CreateLeadDTO, UpdateLeadDTO } from "@/src/entities/models/Lead";
import { LeadFilters } from "@/src/application/repositories/ILeadRepository";
import { LeadStats } from "@/src/application/use-cases/lead/GetLeadStatsUseCase";

export class LeadController {
  constructor(
    private readonly getLeadsUseCase: GetLeadsUseCase,
    private readonly getLeadByIdUseCase: GetLeadByIdUseCase,
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly updateLeadUseCase: UpdateLeadUseCase,
    private readonly deleteLeadUseCase: DeleteLeadUseCase,
    private readonly getLeadStatsUseCase: GetLeadStatsUseCase
  ) {}

  async getLeads(filters?: LeadFilters): Promise<Lead[]> {
    return this.getLeadsUseCase.execute(filters);
  }

  async getLeadById(id: number): Promise<Lead> {
    return this.getLeadByIdUseCase.execute(id);
  }

  async createLead(data: CreateLeadDTO): Promise<Lead> {
    return this.createLeadUseCase.execute(data);
  }

  async updateLead(id: number, data: UpdateLeadDTO): Promise<Lead> {
    return this.updateLeadUseCase.execute(id, data);
  }

  async deleteLead(id: number): Promise<void> {
    return this.deleteLeadUseCase.execute(id);
  }

  async getStats(): Promise<LeadStats> {
    return this.getLeadStatsUseCase.execute();
  }
}
