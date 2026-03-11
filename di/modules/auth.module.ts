/**
 * Auth & Feedback DI Module
 * Binds authentication service and feedback repository.
 */
import { MockAuthService }              from "@/src/infrastructure/services/MockAuthService";
import { InMemoryFeedbackRepository }   from "@/src/infrastructure/repositories/InMemoryFeedbackRepository";
import { FeedbackController }           from "@/src/interface-adapters/controllers/FeedbackController";
import { AddFeedbackUseCase }           from "@/src/application/use-cases/feedback/AddFeedbackUseCase";
import { GetFeedbackByLeadUseCase }     from "@/src/application/use-cases/feedback/GetFeedbackByLeadUseCase";

// ── Infrastructure ───────────────────────────────────────────────────────────
export const authService        = new MockAuthService();
export const feedbackRepository = new InMemoryFeedbackRepository();

// ── Use Cases ────────────────────────────────────────────────────────────────
export const addFeedbackUseCase        = new AddFeedbackUseCase(feedbackRepository);
export const getFeedbackByLeadUseCase  = new GetFeedbackByLeadUseCase(feedbackRepository);

// ── Controller ───────────────────────────────────────────────────────────────
export const feedbackController = new FeedbackController(
  addFeedbackUseCase,
  getFeedbackByLeadUseCase
);
