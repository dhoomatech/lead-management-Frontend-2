import { Lead } from "@/src/entities/models/Lead";
import { LeadNotFoundError } from "@/src/entities/errors/DomainErrors";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";

export class GetLeadByIdUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(id: number): Promise<Lead> {
    const lead = await this.leadRepository.findById(id);
    if (!lead) throw new LeadNotFoundError(id);
    return lead;
  }
}
