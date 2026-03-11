import { Lead } from "@/src/entities/models/Lead";
import { ILeadRepository, LeadFilters } from "@/src/application/repositories/ILeadRepository";

export class GetLeadsUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(filters?: LeadFilters): Promise<Lead[]> {
    return this.leadRepository.findAll(filters);
  }
}
