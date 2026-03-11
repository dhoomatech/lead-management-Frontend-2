"use client";

/**
 * feedbackService
 * Thin async wrapper around the FeedbackController.
 * Keeps feedback state in component-local state (not global store)
 * since feedback is scoped to a single lead detail view.
 */
import { feedbackController } from "@/di/container";
import { CreateFeedbackDTO } from "@/src/entities/models/Feedback";
import { useAppStore } from "@/app/store/useAppStore";

export const feedbackService = {
  async getByLead(leadId: number) {
    return feedbackController.getFeedbackByLead(leadId);
  },

  async add(data: CreateFeedbackDTO) {
    const { showToast, setError } = useAppStore.getState();
    try {
      const feedback = await feedbackController.addFeedback(data);
      showToast("Feedback submitted successfully");
      return feedback;
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  },
};
