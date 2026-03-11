import { Feedback } from "@/src/entities/models/Feedback";
import { IFeedbackRepository } from "@/src/application/repositories/IFeedbackRepository";

export class GetFeedbackByLeadUseCase {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {}

  async execute(leadId: number): Promise<Feedback[]> {
    return this.feedbackRepository.findByLeadId(leadId);
  }
}
