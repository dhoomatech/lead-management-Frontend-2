import { Feedback, TimelineEvent, CreateFeedbackDTO } from "@/src/entities/models/Feedback";
import { IFeedbackRepository } from "@/src/application/repositories/IFeedbackRepository";

const SEED_TIMELINE: TimelineEvent[] = [
  {
    id: 1, leadId: 1,
    title: "Lead Auto-Assigned",
    description: "Lead automatically assigned based on Facebook source rules",
    performedBy: "System",
    performedAt: "1/15/2024, 2:30:00 PM",
  },
  {
    id: 2, leadId: 1,
    title: "Lead Created",
    description: "Lead automatically assigned based on Facebook source rules",
    performedBy: "Raneesha Rahman, Digital Marketer",
    performedAt: "1/15/2024, 2:28:00 PM",
  },
];

const SEED_FEEDBACK: Feedback[] = [
  {
    id: 1, leadId: 1,
    message: "This is the message Lead automatically assigned based on Facebook source rules Lead autom assigned based on Facebook source rules lead automatically assigned based on Facebook so hdv vhhjh vvurce rules Lead automaticall...",
    createdBy: "Sneha Patel",
    createdAt: "1/16/2024, 10:00:00 AM",
  },
];

let feedbackStore: Feedback[] = [...SEED_FEEDBACK];
let timelineStore: TimelineEvent[] = [...SEED_TIMELINE];
let nextId = 2;

export class InMemoryFeedbackRepository implements IFeedbackRepository {
  async findByLeadId(leadId: number): Promise<Feedback[]> {
    return feedbackStore.filter((f) => f.leadId === leadId);
  }

  async create(data: CreateFeedbackDTO): Promise<Feedback> {
    const feedback: Feedback = {
      id: nextId++,
      leadId: data.leadId,
      message: data.message,
      createdBy: data.createdBy,
      createdAt: new Date().toLocaleString(),
    };
    feedbackStore = [...feedbackStore, feedback];

    // Also add to timeline
    timelineStore = [
      ...timelineStore,
      {
        id: nextId,
        leadId: data.leadId,
        title: "Feedback Added",
        description: data.message.slice(0, 80),
        performedBy: data.createdBy,
        performedAt: feedback.createdAt,
      },
    ];
    return feedback;
  }

  async getTimeline(leadId: number): Promise<TimelineEvent[]> {
    return timelineStore.filter((t) => t.leadId === leadId);
  }
}
