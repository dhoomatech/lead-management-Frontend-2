"use client";

import { useState, useEffect, useCallback } from "react";
import { feedbackService } from "@/app/services/feedbackService";
import { Feedback, CreateFeedbackDTO } from "@/src/entities/models/Feedback";

/**
 * useFeedback
 * Local state hook for feedback scoped to a single lead.
 */
export function useFeedback(leadId: number) {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await feedbackService.getByLead(leadId);
      setFeedbackList(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addFeedback = async (data: CreateFeedbackDTO) => {
    const newFeedback = await feedbackService.add(data);
    setFeedbackList((prev) => [...prev, newFeedback]);
    return newFeedback;
  };

  return { feedbackList, isLoading, error, refresh, addFeedback };
}
