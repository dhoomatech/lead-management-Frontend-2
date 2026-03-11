import { Feedback, CreateFeedbackDTO } from "@/src/entities/models/Feedback";
import { ValidationError } from "@/src/entities/errors/DomainErrors";
import { IFeedbackRepository } from "@/src/application/repositories/IFeedbackRepository";

export class AddFeedbackUseCase {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {}

  async execute(data: CreateFeedbackDTO): Promise<Feedback> {
    const errors: Record<string, string> = {};
    if (!data.message?.trim()) errors.message = "Feedback message is required";
    if (!data.leadId) errors.leadId = "Lead ID is required";
    if (Object.keys(errors).length > 0) throw new ValidationError(errors);

    return this.feedbackRepository.create(data);
  }
}
