export interface Feedback {
  id: number;
  leadId: number;
  message: string;
  createdBy: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: number;
  leadId: number;
  title: string;
  description: string;
  performedBy: string;
  performedAt: string;
}

export interface CreateFeedbackDTO {
  leadId: number;
  message: string;
  createdBy: string;
}
