import { describe, it, expect, vi } from "vitest";
import { GetLeadsUseCase } from "@/src/application/use-cases/lead/GetLeadsUseCase";
import { Lead } from "@/src/entities/models/Lead";

const LEADS: Lead[] = [
  { id: 1, name: "A", phone: "111", email: "a@x.com", source: "Facebook",  status: "NEW",       assignTo: "SP", dateAdded: "01-01-2026" },
  { id: 2, name: "B", phone: "222", email: "b@x.com", source: "Instagram", status: "QUALIFIED", assignTo: "MC", dateAdded: "02-01-2026" },
];

describe("GetLeadsUseCase", () => {
  it("returns all leads when no filter", async () => {
    const repo = { findAll: vi.fn().mockResolvedValue(LEADS) } as any;
    const result = await new GetLeadsUseCase(repo).execute();
    expect(result).toHaveLength(2);
    expect(repo.findAll).toHaveBeenCalledWith(undefined);
  });

  it("passes filters to repository", async () => {
    const repo = { findAll: vi.fn().mockResolvedValue([LEADS[1]]) } as any;
    const result = await new GetLeadsUseCase(repo).execute({ status: "QUALIFIED" });
    expect(result).toHaveLength(1);
    expect(repo.findAll).toHaveBeenCalledWith({ status: "QUALIFIED" });
  });
});
