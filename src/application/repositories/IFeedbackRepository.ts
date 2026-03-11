import { Feedback, TimelineEvent, CreateFeedbackDTO } from "@/src/entities/models/Feedback";

export interface IFeedbackRepository {
  findByLeadId(leadId: number): Promise<Feedback[]>;
  create(data: CreateFeedbackDTO): Promise<Feedback>;
  getTimeline(leadId: number): Promise<TimelineEvent[]>;
}
