import { describe, it, expect, vi, beforeEach } from "vitest";
import { LeadController } from "@/src/interface-adapters/controllers/LeadController";
import { GetLeadsUseCase }     from "@/src/application/use-cases/lead/GetLeadsUseCase";
import { GetLeadByIdUseCase }  from "@/src/application/use-cases/lead/GetLeadByIdUseCase";
import { CreateLeadUseCase }   from "@/src/application/use-cases/lead/CreateLeadUseCase";
import { UpdateLeadUseCase }   from "@/src/application/use-cases/lead/UpdateLeadUseCase";
import { DeleteLeadUseCase }   from "@/src/application/use-cases/lead/DeleteLeadUseCase";
import { GetLeadStatsUseCase } from "@/src/application/use-cases/lead/GetLeadStatsUseCase";
import { Lead } from "@/src/entities/models/Lead";

const LEAD: Lead = { id: 1, name: "Test", phone: "111", email: "t@t.com", source: "Google", status: "NEW", assignTo: "SP", dateAdded: "01-01-2026" };

describe("LeadController", () => {
  let controller: LeadController;

  beforeEach(() => {
    controller = new LeadController(
      { execute: vi.fn().mockResolvedValue([LEAD]) } as unknown as GetLeadsUseCase,
      { execute: vi.fn().mockResolvedValue(LEAD)   } as unknown as GetLeadByIdUseCase,
      { execute: vi.fn().mockResolvedValue(LEAD)   } as unknown as CreateLeadUseCase,
      { execute: vi.fn().mockResolvedValue(LEAD)   } as unknown as UpdateLeadUseCase,
      { execute: vi.fn().mockResolvedValue(undefined) } as unknown as DeleteLeadUseCase,
      { execute: vi.fn().mockResolvedValue({ total: 1, byStatus: { NEW: 1, QUALIFIED: 0, DISQUALIFIED: 0, PENDING: 0 } }) } as unknown as GetLeadStatsUseCase,
    );
  });

  it("getLeads delegates to use case", async () => {
    const result = await controller.getLeads();
    expect(result).toHaveLength(1);
  });

  it("getLeadById returns a lead", async () => {
    const result = await controller.getLeadById(1);
    expect(result.id).toBe(1);
  });

  it("createLead calls use case", async () => {
    const result = await controller.createLead({ name: "Test", phone: "111", email: "t@t.com", source: "Google" });
    expect(result).toEqual(LEAD);
  });

  it("deleteLead calls use case", async () => {
    await expect(controller.deleteLead(1)).resolves.toBeUndefined();
  });

  it("getStats returns stats", async () => {
    const stats = await controller.getStats();
    expect(stats.total).toBe(1);
  });
});
