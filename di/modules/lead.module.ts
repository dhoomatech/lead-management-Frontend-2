/**
 * Lead DI Module
 * Binds Lead repositories, use-cases, and controller.
 * Swap InMemory* for Prisma* implementations without touching any other layer.
 */
import { InMemoryLeadRepository } from "@/src/infrastructure/repositories/InMemoryLeadRepository";

import { GetLeadsUseCase }     from "@/src/application/use-cases/lead/GetLeadsUseCase";
import { GetLeadByIdUseCase }  from "@/src/application/use-cases/lead/GetLeadByIdUseCase";
import { CreateLeadUseCase }   from "@/src/application/use-cases/lead/CreateLeadUseCase";
import { UpdateLeadUseCase }   from "@/src/application/use-cases/lead/UpdateLeadUseCase";
import { DeleteLeadUseCase }   from "@/src/application/use-cases/lead/DeleteLeadUseCase";
import { GetLeadStatsUseCase } from "@/src/application/use-cases/lead/GetLeadStatsUseCase";
import { LeadController }      from "@/src/interface-adapters/controllers/LeadController";

// ── Repository ──────────────────────────────────────────────────────────────
export const leadRepository = new InMemoryLeadRepository();

// ── Use Cases ────────────────────────────────────────────────────────────────
export const getLeadsUseCase     = new GetLeadsUseCase(leadRepository);
export const getLeadByIdUseCase  = new GetLeadByIdUseCase(leadRepository);
export const createLeadUseCase   = new CreateLeadUseCase(leadRepository);
export const updateLeadUseCase   = new UpdateLeadUseCase(leadRepository);
export const deleteLeadUseCase   = new DeleteLeadUseCase(leadRepository);
export const getLeadStatsUseCase = new GetLeadStatsUseCase(leadRepository);

// ── Controller ───────────────────────────────────────────────────────────────
export const leadController = new LeadController(
  getLeadsUseCase,
  getLeadByIdUseCase,
  createLeadUseCase,
  updateLeadUseCase,
  deleteLeadUseCase,
  getLeadStatsUseCase
);
