import { describe, it, expect, vi, beforeEach } from "vitest";
import { CreateLeadUseCase } from "@/src/application/use-cases/lead/CreateLeadUseCase";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";
import { Lead } from "@/src/entities/models/Lead";
import { ValidationError } from "@/src/entities/errors/DomainErrors";

const mockLead: Lead = {
  id: 1, name: "Test User", phone: "+91 9000000000",
  email: "test@example.com", source: "Facebook",
  status: "NEW", assignTo: "Sneha Patel", dateAdded: "01-01-2026",
};

function makeMockRepo(): ILeadRepository {
  return {
    findAll:       vi.fn().mockResolvedValue([]),
    findById:      vi.fn().mockResolvedValue(null),
    create:        vi.fn().mockResolvedValue(mockLead),
    update:        vi.fn(),
    delete:        vi.fn(),
    count:         vi.fn().mockResolvedValue(0),
    countByStatus: vi.fn().mockResolvedValue({ NEW: 0, QUALIFIED: 0, DISQUALIFIED: 0, PENDING: 0 }),
  };
}

describe("CreateLeadUseCase", () => {
  let useCase: CreateLeadUseCase;
  let repo: ILeadRepository;

  beforeEach(() => {
    repo = makeMockRepo();
    useCase = new CreateLeadUseCase(repo);
  });

  it("creates a lead with valid data", async () => {
    const result = await useCase.execute({
      name: "Test User", phone: "+91 9000000000",
      email: "test@example.com", source: "Facebook",
    });
    expect(result).toEqual(mockLead);
    expect(repo.create).toHaveBeenCalledOnce();
  });

  it("throws ValidationError when name is missing", async () => {
    await expect(
      useCase.execute({ name: "", phone: "+91 9000000000", email: "test@example.com", source: "Facebook" })
    ).rejects.toThrow(ValidationError);
  });

  it("throws ValidationError for invalid email", async () => {
    await expect(
      useCase.execute({ name: "Test", phone: "+91 9000000000", email: "not-an-email", source: "Facebook" })
    ).rejects.toThrow(ValidationError);
  });

  it("throws ValidationError when phone is missing", async () => {
    await expect(
      useCase.execute({ name: "Test", phone: "", email: "test@example.com", source: "Facebook" })
    ).rejects.toThrow(ValidationError);
  });

  it("uses default assignTo when not provided", async () => {
    await useCase.execute({ name: "Test", phone: "+91 9000000000", email: "test@example.com", source: "Facebook" });
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({ assignTo: "Unassigned" })
    );
  });
});
