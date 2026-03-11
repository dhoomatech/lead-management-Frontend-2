import { Lead, CreateLeadDTO } from "@/src/entities/models/Lead";
import { ValidationError, InvalidEmailError } from "@/src/entities/errors/DomainErrors";
import { ILeadRepository } from "@/src/application/repositories/ILeadRepository";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export class CreateLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(data: CreateLeadDTO): Promise<Lead> {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) errors.name = "Name is required";
    if (!data.email?.trim()) errors.email = "Email is required";
    else if (!isValidEmail(data.email)) errors.email = "Invalid email address";
    if (!data.phone?.trim()) errors.phone = "Phone number is required";
    if (!data.source) errors.source = "Source is required";

    if (Object.keys(errors).length > 0) throw new ValidationError(errors);

    return this.leadRepository.create({
      ...data,
      assignTo: data.assignTo ?? "Unassigned",
    });
  }
}
