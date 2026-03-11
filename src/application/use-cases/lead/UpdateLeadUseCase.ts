import { Lead, UpdateLeadDTO } from "@/src/entities/models/Lead";
import { LeadNotFoundError } from "@/src/entities/errors/DomainErrors";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";

export class UpdateLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(id: number, data: UpdateLeadDTO): Promise<Lead> {
    const existing = await this.leadRepository.findById(id);
    if (!existing) throw new LeadNotFoundError(id);
    return this.leadRepository.update(id, data);
  }
}
