import { LeadStatus } from "@/src/entities/models/Lead";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";

export interface LeadStats {
  total: number;
  byStatus: Record<LeadStatus, number>;
}

export class GetLeadStatsUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(): Promise<LeadStats> {
    const [total, byStatus] = await Promise.all([
      this.leadRepository.count(),
      this.leadRepository.countByStatus(),
    ]);
    return { total, byStatus };
  }
}
