import { LeadNotFoundError } from "@/src/entities/errors/DomainErrors";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";

export class DeleteLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(id: number): Promise<void> {
    const existing = await this.leadRepository.findById(id);
    if (!existing) throw new LeadNotFoundError(id);
    await this.leadRepository.delete(id);
  }
}
