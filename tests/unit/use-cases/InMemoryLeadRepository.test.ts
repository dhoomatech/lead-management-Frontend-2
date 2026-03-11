import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryLeadRepository } from "@/src/infrastructure/repositories/InMemoryLeadRepository";

describe("InMemoryLeadRepository", () => {
  let repo: InMemoryLeadRepository;

  beforeEach(() => {
    // Each test gets fresh module-level state via module re-import is tricky;
    // we test the public API trusting store resets between test runs.
    repo = new InMemoryLeadRepository();
  });

  it("findAll returns seeded data", async () => {
    const leads = await repo.findAll();
    expect(leads.length).toBeGreaterThan(0);
  });

  it("findById returns null for unknown id", async () => {
    const result = await repo.findById(99999);
    expect(result).toBeNull();
  });

  it("create adds a lead and returns it", async () => {
    const lead = await repo.create({ name: "New", phone: "000", email: "n@n.com", source: "Google" });
    expect(lead.id).toBeDefined();
    expect(lead.status).toBe("NEW");
  });

  it("countByStatus returns correct shape", async () => {
    const counts = await repo.countByStatus();
    expect(counts).toHaveProperty("NEW");
    expect(counts).toHaveProperty("QUALIFIED");
    expect(counts).toHaveProperty("DISQUALIFIED");
    expect(counts).toHaveProperty("PENDING");
  });

  it("delete removes the lead", async () => {
    const all = await repo.findAll();
    const target = all[0];
    await repo.delete(target.id);
    const after = await repo.findAll();
    expect(after.find((l) => l.id === target.id)).toBeUndefined();
  });
});
