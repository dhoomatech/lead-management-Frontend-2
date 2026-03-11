import { AddFeedbackUseCase }       from "@/src/application/use-cases/feedback/AddFeedbackUseCase";
import { GetFeedbackByLeadUseCase } from "@/src/application/use-cases/feedback/GetFeedbackByLeadUseCase";
import { Feedback, CreateFeedbackDTO } from "@/src/entities/models/Feedback";

export class FeedbackController {
  constructor(
    private readonly addFeedbackUseCase: AddFeedbackUseCase,
    private readonly getFeedbackByLeadUseCase: GetFeedbackByLeadUseCase
  ) {}

  async addFeedback(data: CreateFeedbackDTO): Promise<Feedback> {
    return this.addFeedbackUseCase.execute(data);
  }

  async getFeedbackByLead(leadId: number): Promise<Feedback[]> {
    return this.getFeedbackByLeadUseCase.execute(leadId);
  }
}
